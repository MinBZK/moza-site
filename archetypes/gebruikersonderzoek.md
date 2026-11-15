---
title: "{{ .File.ContentBaseName | humanize }}"
# Vul de laatste dag van het onderzoek in, niet de dag van vandaag. Op deze
# datum staat het nieuwste onderzoek bovenaan.
date: {{ now.Format "2006-01-02" }}
uitgevoerd: ""
rapport: ""
# Optioneel.
prototype: ""
# Paden onder /onderwerpen/ waar het onderzoek ook verschijnt.
onderwerpen: []
---

**Wat we onderzochten:** ...

**Hoe:** ...

Samenvatting in een paar zinnen.

**Belangrijkste conclusies:**

- ...
