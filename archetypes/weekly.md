{{- $basename := .File.ContentBaseName -}}
{{- $date := now -}}
{{- if findRE `^\d{4}-\d{2}-\d{2}$` $basename -}}
  {{- $date = time.AsTime $basename -}}
{{- end -}}
{{- $months := slice "januari" "februari" "maart" "april" "mei" "juni" "juli" "augustus" "september" "oktober" "november" "december" -}}
{{- $month := index $months (sub ($date.Month | int) 1) -}}
---
title: MOZa Weekly {{ $date.Day }} {{ $month }} {{ $date.Year }}
date: {{ $date.Format "2006-01-02" }}
---

## Algemeen

- ...

---

## Agenda

Wist je dat we (bijna) elke maandag samenwerken op het Beatrixpark in Den Haag? Wil je een keer aanhaken, dan ben je van harte welkom.

- ...
