# Video

Een video op de site moet voldoen aan WCAG 2.2 AA, net als de rest van de
site. Het voorbeeld is `content/documenten/presentaties/nieuwe-kern-nmc/`.

## Waar

- **Op een pagina:** in de page bundle, naast de ondertitels (`<naam>.nl.vtt`)
  en de dia's als de video die heeft.
- **In een presentatie (nldd-deck):** zie de skill `nieuwe-presentatie`.
- **Niet openbaar**, zoals video uit gebruikersonderzoek: in `lokaal/`, buiten
  git.
- Vraag de maker of de video openbaar mag. Geen namen in de pagina, de
  ondertitels of de bestandsnamen.

## Invoegen

```markdown
{{< video bestand="naam.mp4" ondertitels="naam.nl.vtt" titel="Titel" breedte="1920" hoogte="1080" >}}
```

De shortcode (`layouts/_shortcodes/video.html`) zet de speler neer met
bediening, zonder autoplay. De ondertitels staan standaard uit; zeg op de
pagina dat je ze aanzet met de knop in de videospeler.

## Toegankelijkheid

- **Ondertitels (1.2.2):** een VTT-bestand, nagelezen. Automatische
  transcriptie haalt vaktermen door elkaar ("NotifyNL" werd "Node.vnl").
  Corrigeer tegen de dia's en laat de spreker de ondertitels nalezen.
- **Uitgeschreven tekst (1.2.3):** de hele tekst op dezelfde pagina, met een
  kop per dia. Zet eronder wat alleen in beeld staat en niet wordt gezegd.
- **Audiodescriptie (1.2.5):** staat er belangrijke informatie alleen in beeld,
  dan moet die ook te horen zijn. Tekst op de pagina is voor niveau AA niet
  genoeg. Is dit nog niet opgelost, meld het dan in de PR.
- **Dia's als download:** toets de PDF op PDF/UA met `verapdf --flavour ua1`.
- **Het toegankelijkheidsonderzoek** telt bij 1.2.1 t/m 1.2.5 nul video's. De
  eerste video, of een nieuwe soort media, vraagt om een herziening van het
  onderzoek en de verklaring: zie `toegankelijkheidsrapport.md`.

## Bestandsgrootte

- Elke versie van een video blijft voor altijd in de git-historie. Comprimeer
  dus eerst, en commit een video zo min mogelijk opnieuw.
- Voor dia's met een stem erover:
  `ffmpeg -i in.mp4 -c:v libx264 -tune stillimage -crf 30 -preset slow -vf scale=1920:-2 -r 15 -c:a aac -ac 1 -b:a 64k -movflags +faststart uit.mp4`
  (26 naar 13,8 MB). `-tune stillimage` en `-r 15` passen bij stilstaand
  beeld, niet bij film. Kijk daarna of de tekst op de dia's leesbaar blijft.
- We gebruiken (nog) geen Git LFS. Video van een ander domein kan niet: de CSP
  staat alleen media van de site zelf toe.
