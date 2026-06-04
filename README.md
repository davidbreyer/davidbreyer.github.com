# davidbreyer.com

Static GitHub Pages site for [www.davidbreyer.com](https://www.davidbreyer.com).

This used to be a Jekyll blog. It is now a small landing page with no build step, no analytics, no comments, and no social-media embeds.

## Structure

- `index.html` - the landing page.
- `404.html` - the fallback page for old blog URLs and missing pages.
- `lizard-formatter/` - published static JSON formatter app.
- `programming/2016/06/20/...` - preserved static article pages at old Jekyll-style URLs.
- `CNAME` - keeps GitHub Pages pointed at `www.davidbreyer.com`.
- `.nojekyll` - tells GitHub Pages to serve the files directly.
- `assets/images/logo.png` - restored lizard mark used in the page chrome.
- `assets/images/site-preview.png` - Open Graph/social preview image.
- `favicon*`, `apple-icon*`, `android-icon*`, `ms-icon*` - restored icon set from the old site.
- `manifest.json` and `browserconfig.xml` - browser/platform metadata.

## Local Preview

This site can be opened directly in a browser, but a local HTTP server is better because the page uses root-relative asset paths:

```powershell
python -m http.server 8123
```

Then open:

```text
http://127.0.0.1:8123/
```

## Deployment

Pushes to `master` deploy through GitHub Pages.

There is no package manager, framework, bundler, or generated `_site` directory. Keep it that way unless the site grows beyond a single static page.

## Version Stamp

The footer includes a version stamp in this format:

```text
yyyyMMdd-HHmm
```

Example:

```text
20260531-0942
```

The stamp is updated by a pre-commit hook:

- `.githooks/pre-commit` runs before each commit.
- `scripts/update-version.ps1` rewrites the marked footer version in `index.html`.
- The hook stages `index.html` again so the updated stamp is included in the commit.

Enable the tracked hooks in a fresh checkout with:

```powershell
git config core.hooksPath .githooks
```

## Maintenance Notes

- Keep copy short and plain.
- Keep the lizard mark.
- Do not reintroduce the old blog, comments, analytics, or social links.
- Add project links only when there is something real to point at.
