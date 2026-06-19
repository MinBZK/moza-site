---
canonical_url: {{ with .OutputFormats.Get "html" }}{{ .Permalink }}{{ end }}
last_updated: {{ .Lastmod.Format "2006-01-02T15:04:05Z07:00" }}
{{- with .Section }}
section: {{ . }}
{{- end }}
---

# {{ .Title }}
{{- with .Description }}

> {{ . }}
{{- end }}

{{ partial "clean-markdown" .RawContent }}
