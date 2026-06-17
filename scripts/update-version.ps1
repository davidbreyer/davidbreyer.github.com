$ErrorActionPreference = "Stop"

$stamp = Get-Date -Format "yyyyMMdd-HHmm"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$indexPath = Join-Path $root "index.html"
$versionPattern = '(<span class="version" data-version>)[^<]*(</span>)'
$stylesheetPattern = '((?:/assets/css/[^"?]+\.css)\?v=)[0-9]{8}-[0-9]{4}'

$content = Get-Content -Raw -LiteralPath $indexPath
if ($content -notmatch $versionPattern) {
  throw "Version marker not found in index.html"
}

$content = [regex]::Replace($content, $versionPattern, "`${1}$stamp`${2}", 1)
Set-Content -NoNewline -LiteralPath $indexPath -Value $content -Encoding utf8

$htmlFiles = @(
  "index.html",
  "404.html",
  "programming/2016/06/20/managing-sql-server-express-localdb-instances/index.html"
)

foreach ($file in $htmlFiles) {
  $path = Join-Path $root $file
  $content = Get-Content -Raw -LiteralPath $path
  if ($content -notmatch $stylesheetPattern) {
    throw "Stylesheet version marker not found in $file"
  }

  $content = [regex]::Replace($content, $stylesheetPattern, "`${1}$stamp")
  Set-Content -NoNewline -LiteralPath $path -Value $content -Encoding utf8
}
