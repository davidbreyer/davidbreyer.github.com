$ErrorActionPreference = "Stop"

$stamp = Get-Date -Format "yyyyMMdd-HHmm"
$indexPath = Join-Path $PSScriptRoot "..\index.html"
$content = Get-Content -Raw -LiteralPath $indexPath
$pattern = '(<span class="version" data-version>)[^<]*(</span>)'

if ($content -notmatch $pattern) {
  throw "Version marker not found in index.html"
}

$content = [regex]::Replace($content, $pattern, "`${1}$stamp`${2}", 1)
Set-Content -NoNewline -LiteralPath $indexPath -Value $content -Encoding utf8
