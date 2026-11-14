//go:build tools

// Zonder deze import haalt go mod tidy (en dus Dependabot) het theme uit go.mod.
package tools

import _ "github.com/RijksICTGilde/hugo-theme-rijksoverheid"
