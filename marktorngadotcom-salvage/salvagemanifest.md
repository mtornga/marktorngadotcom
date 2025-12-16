# marktornga.com salvage manifest

This snapshot captures the content and config you likely want for the rebuild. Paths are relative to `marktorngadotcom-salvage/`.

- `config/_config.yml` — Site metadata (title, URL, skin, search settings), GA UA tracking ID, author profile/social links, footer links, and default teaser image reference. Keep or map these into the new stack (consider GA4).
- `data/navigation.yml`, `data/ui-text.yml` — Navigation scaffolding and UI copy keys from Minimal Mistakes; reuse or translate to the new routing/menu system.
- `content/posts/` — Markdown posts with front matter: `2020-01-20-amaryllis.md`, `2020-07-05-skytimelapse.md`. Preserve dates, permalinks, and asset references.
- `assets/images/` — Hero/teaser and post imagery (e.g., `teaser.JPG`, `Lakeself.JPG`, `avatar.PNG`, `amaryllis.gif`, `camerasetup.jpg`, etc.). Use for avatars, OG images, and post media.
- `scripts/_main.js` — Custom frontend behavior from the current theme (sticky sidebar, search toggle, smooth scroll, lightbox, heading anchors). Reimplement equivalent interactions if switching frameworks.

Notes
- Repository metadata in `_config.yml` (`repository`, `url`) and search settings (`search_provider: lunr`) inform feeds/SEO; carry forward as needed.
- No secrets are included. Analytics key is UA-style; update if moving to GA4.
