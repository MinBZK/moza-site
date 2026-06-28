#!/usr/bin/env python3
"""Genereer scripts/reference.odt: het pandoc-stijlsjabloon voor ODF-downloads.

Afgeleid van pandocs standaard reference.odt, met deze aanpassingen:
- Lettertype Verdana, basisgrootte 10pt
- Koppen: H1 16pt, H2 13pt, H3 11,5pt (Verdana, vet)
- Note/citaat (Quotations): lichte gevulde achtergrond (#d9ebf7), cursief
- Links (Internet link): rijksblauw (#154273), onderstreept
- Rijksoverheid-logo als master-page header (op elke pagina), A4-formaat

Gebruik:  python3 scripts/make-reference-odt.py
Vereist:  pandoc in PATH.

scripts/render-downloads.js geeft dit bestand mee aan pandoc via --reference-doc.
"""
import os
import re
import subprocess
import sys
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
DST = os.path.join(HERE, "reference.odt")
LOGO = os.path.join(HERE, "..", "..", "static", "images", "logo-rijksoverheid.svg")


def default_styles_zip(tmp):
    """Schrijf pandocs standaard reference.odt naar tmp en geef het pad terug."""
    data = subprocess.run(
        ["pandoc", "--print-default-data-file", "reference.odt"],
        capture_output=True, check=True,
    ).stdout
    with open(tmp, "wb") as f:
        f.write(data)
    return tmp


def sub_in_block(xml, name, subs):
    m = re.search(
        r'<style:style[^>]*style:name="%s"[^>]*?>.*?</style:style>' % re.escape(name),
        xml, re.S,
    )
    if not m:
        m = re.search(
            r'<style:style[^>]*style:name="%s"[^>]*?/>' % re.escape(name), xml, re.S
        )
    assert m, "style niet gevonden: " + name
    block = m.group(0)
    for pat, rep in subs:
        block = re.sub(pat, rep, block, flags=re.S)
    return xml[: m.start()] + block + xml[m.end():]


def patch_manifest(manifest):
    """Voeg de manifest-entry voor het ingebedde logo toe."""
    entry = (
        ' <manifest:file-entry '
        'manifest:full-path="Pictures/logo-rijksoverheid.svg" '
        'manifest:media-type="image/svg+xml"/>\n'
    )
    return manifest.replace(
        "</manifest:manifest>", entry + "</manifest:manifest>", 1
    )


def patch_styles(styles):
    # 1) Verdana registreren
    if 'style:name="Verdana"' not in styles:
        styles = styles.replace(
            "<office:font-face-decls>",
            '<office:font-face-decls><style:font-face style:name="Verdana" '
            'svg:font-family="Verdana" style:font-family-generic="swiss" '
            'style:font-pitch="variable" />', 1,
        )

    # 2) Basislettertype: Verdana 10pt
    m = re.search(
        r'<style:default-style style:family="paragraph">.*?</style:default-style>',
        styles, re.S,
    )
    blk = m.group(0)
    blk = blk.replace('style:font-name="Times New Roman"', 'style:font-name="Verdana"')
    blk = blk.replace(
        "<style:paragraph-properties ",
        '<style:paragraph-properties fo:orphans="2" fo:widows="2" ', 1,
    )
    blk = re.sub(r'fo:font-size="12pt"', 'fo:font-size="10pt"', blk)
    blk = re.sub(r'style:font-size-asian="[^"]*"', 'style:font-size-asian="10pt"', blk)
    blk = re.sub(r'style:font-size-complex="[^"]*"', 'style:font-size-complex="10pt"', blk)
    styles = styles[: m.start()] + blk + styles[m.end():]

    # 3) Koppen: Verdana + passende groottes
    styles = sub_in_block(styles, "Heading", [
        (r'style:font-name="Arial"', 'style:font-name="Verdana"'),
        (r'fo:font-size="14pt"', 'fo:font-size="13pt"'),
        (r'style:font-size-asian="14pt"', 'style:font-size-asian="13pt"'),
        (r'style:font-size-complex="14pt"', 'style:font-size-complex="13pt"'),
    ])
    styles = sub_in_block(styles, "Heading_20_1", [
        (r'fo:font-size="115%"', 'fo:font-size="16pt"'),
        (r'style:font-size-asian="115%"', 'style:font-size-asian="16pt"'),
        (r'style:font-size-complex="115%"', 'style:font-size-complex="16pt"'),
    ])
    styles = sub_in_block(styles, "Heading_20_2", [
        (r'fo:font-size="14pt"', 'fo:font-size="13pt"'),
        (r'style:font-size-asian="14pt"', 'style:font-size-asian="13pt"'),
        (r'style:font-size-complex="14pt"', 'style:font-size-complex="13pt"'),
        (r'\s*fo:font-style="italic"', ''),
        (r'\s*style:font-style-asian="italic"', ''),
        (r'\s*style:font-style-complex="italic"', ''),
    ])
    styles = sub_in_block(styles, "Heading_20_3", [
        (r'fo:font-size="14pt"', 'fo:font-size="11.5pt"'),
        (r'style:font-size-asian="14pt"', 'style:font-size-asian="11.5pt"'),
        (r'style:font-size-complex="14pt"', 'style:font-size-complex="11.5pt"'),
    ])
    styles = sub_in_block(styles, "Title", [
        (r'fo:font-size="28pt"', 'fo:font-size="18pt"'),
        (r'style:font-size-asian="28pt"', 'style:font-size-asian="18pt"'),
        (r'style:font-size-complex="28pt"', 'style:font-size-complex="18pt"'),
    ])

    # 4) Note/blockquote (Quotations): lichte gevulde box, cursief
    quote_new = (
        '<style:style style:name="Quotations" style:family="paragraph" '
        'style:parent-style-name="Standard" style:class="html">'
        '<style:paragraph-properties fo:margin-left="0in" fo:margin-right="0in" '
        'fo:margin-top="0.1in" fo:margin-bottom="0.1in" fo:padding-top="0.07in" '
        'fo:padding-bottom="0.07in" fo:padding-left="0.12in" fo:padding-right="0.12in" '
        'fo:background-color="#d9ebf7" '
        'style:contextual-spacing="false" fo:text-indent="0in" '
        'style:auto-text-indent="false" />'
        '<style:text-properties fo:font-style="italic" '
        'style:font-style-asian="italic" style:font-style-complex="italic" />'
        '</style:style>'
    )
    styles = re.sub(
        r'<style:style[^>]*style:name="Quotations"[^>]*?>.*?</style:style>',
        quote_new, styles, flags=re.S,
    )

    # 5) Links: rijksblauw, onderstreept.
    styles = sub_in_block(styles, "Internet_20_link", [
        (r'fo:color="#000080"', 'fo:color="#154273"'),
    ])
    definition_new = (
        '<style:style style:name="Definition" style:family="text">'
        '<style:text-properties fo:color="#154273" '
        'style:text-underline-style="solid" style:text-underline-width="auto" '
        'style:text-underline-color="font-color" />'
        '</style:style>'
    )
    styles = re.sub(
        r'<style:style style:name="Definition" style:family="text"\s*/>',
        definition_new, styles,
    )

    # 6) Master-page header met gecentreerd Rijksoverheid-logo op ELKE pagina.
    #    Het logo zit als ingebedde afbeelding in een <style:header> op de
    #    "Standard" master-page; die geldt voor alle pagina's. pandoc kopieert
    #    deze header, het Pictures-bestand en de manifest-entry naar de output.
    header_style = (
        '<style:header-style>'
        '<style:header-footer-properties fo:min-height="3.0cm" '
        'fo:margin-bottom="0.2cm" style:dynamic-spacing="false" />'
        '</style:header-style>'
    )
    styles = styles.replace('<style:header-style />', header_style, 1)

    hdr_para_style = (
        '<style:style style:name="HdrLogo" style:family="paragraph" '
        'style:parent-style-name="Header">'
        '<style:paragraph-properties fo:text-align="center" '
        'style:justify-single-word="false" /></style:style>'
    )
    styles = styles.replace(
        "</office:automatic-styles>", hdr_para_style + "</office:automatic-styles>", 1
    )
    logo_frame_style = (
        '<style:style style:name="LogoFrame" style:family="graphic" '
        'style:parent-style-name="Graphics">'
        '<style:graphic-properties style:vertical-pos="bottom" '
        'style:vertical-rel="baseline" style:horizontal-pos="center" '
        'style:horizontal-rel="paragraph" style:wrap="none" '
        'style:mirror="none" draw:color-mode="standard" /></style:style>'
    )
    styles = styles.replace("</office:styles>", logo_frame_style + "</office:styles>", 1)

    header = (
        '<style:header>'
        '<text:p text:style-name="HdrLogo">'
        '<draw:frame draw:style-name="LogoFrame" draw:name="Logo1" '
        'text:anchor-type="as-char" svg:width="1.1cm" svg:height="2.2cm" '
        'draw:z-index="0">'
        '<draw:image xlink:href="Pictures/logo-rijksoverheid.svg" '
        'xlink:type="simple" xlink:show="embed" xlink:actuate="onLoad" '
        'draw:mime-type="image/svg+xml" /></draw:frame>'
        '</text:p>'
        '</style:header>'
    )
    styles = re.sub(
        r'(<style:master-page style:name="Standard"\s*'
        r'style:page-layout-name="Mpm1">)',
        lambda m: m.group(1) + header, styles, count=1,
    )

    # 7) A4 i.p.v. Letter, plus een kleine bovenmarge zodat de header met het
    #    logo dicht bij de bovenrand staat.
    styles = styles.replace('fo:page-width="8.5in"', 'fo:page-width="8.2677in"')
    styles = styles.replace('fo:page-height="11in"', 'fo:page-height="11.6929in"')
    styles = styles.replace('fo:margin-top="1in"', 'fo:margin-top="0cm"')
    return styles


def main():
    tmp = DST + ".default"
    default_styles_zip(tmp)
    zin = zipfile.ZipFile(tmp)
    styles = patch_styles(zin.read("styles.xml").decode("utf-8"))
    manifest = patch_manifest(zin.read("META-INF/manifest.xml").decode("utf-8"))
    with open(LOGO, "rb") as f:
        logo_bytes = f.read()
    with zipfile.ZipFile(DST, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if item.filename == "styles.xml":
                data = styles.encode("utf-8")
            elif item.filename == "META-INF/manifest.xml":
                data = manifest.encode("utf-8")
            else:
                data = zin.read(item.filename)
            if item.filename == "mimetype":
                zi = zipfile.ZipInfo("mimetype")
                zi.compress_type = zipfile.ZIP_STORED
                zout.writestr(zi, data)
            else:
                zout.writestr(item, data)
        zout.writestr("Pictures/logo-rijksoverheid.svg", logo_bytes)
    zin.close()
    os.remove(tmp)
    print("Geschreven:", DST, os.path.getsize(DST), "bytes")


if __name__ == "__main__":
    sys.exit(main())
