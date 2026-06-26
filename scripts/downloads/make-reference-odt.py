#!/usr/bin/env python3
"""Genereer scripts/reference.odt: het pandoc-stijlsjabloon voor ODF-downloads.

Afgeleid van pandocs standaard reference.odt, met deze aanpassingen:
- Lettertype Verdana, basisgrootte 10pt
- Koppen: H1 16pt, H2 13pt, H3 11,5pt (Verdana, vet)
- Note/citaat (Quotations): lichte achtergrond (#d9ebf7), cursief, accentrand links (#154273)
- Links (Internet link): rijksblauw (#154273), onderstreept

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

    # 4) Note/blockquote (Quotations): lichte achtergrond, cursief, accentrand links
    quote_new = (
        '<style:style style:name="Quotations" style:family="paragraph" '
        'style:parent-style-name="Standard" style:class="html">'
        '<style:paragraph-properties fo:margin-left="0in" fo:margin-right="0in" '
        'fo:margin-top="0.1in" fo:margin-bottom="0.1in" fo:padding-top="0.06in" '
        'fo:padding-bottom="0.06in" fo:padding-left="0.12in" fo:padding-right="0.12in" '
        'fo:background-color="#d9ebf7" fo:border-left="0.06in solid #154273" '
        'fo:border-top="none" fo:border-bottom="none" fo:border-right="none" '
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

    # 5) Links: rijksblauw, onderstreept
    styles = sub_in_block(styles, "Internet_20_link", [
        (r'fo:color="#000080"', 'fo:color="#154273"'),
    ])
    return styles


def main():
    tmp = DST + ".default"
    default_styles_zip(tmp)
    zin = zipfile.ZipFile(tmp)
    styles = patch_styles(zin.read("styles.xml").decode("utf-8"))
    with zipfile.ZipFile(DST, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = styles.encode("utf-8") if item.filename == "styles.xml" else zin.read(item.filename)
            if item.filename == "mimetype":
                zi = zipfile.ZipInfo("mimetype")
                zi.compress_type = zipfile.ZIP_STORED
                zout.writestr(zi, data)
            else:
                zout.writestr(item, data)
    zin.close()
    os.remove(tmp)
    print("Geschreven:", DST, os.path.getsize(DST), "bytes")


if __name__ == "__main__":
    sys.exit(main())
