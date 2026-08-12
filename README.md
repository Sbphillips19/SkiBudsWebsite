# SkiBuds website

Static marketing site for [skibudsapp.com](https://skibudsapp.com).

## Stack

Plain HTML and one stylesheet. **No build step, no framework, no external
dependencies** — no Bootstrap, jQuery, icon CDN, or webfonts. Icons are inline
SVG and type uses system font stacks.

This is deliberate. The previous version pulled Bootstrap, jQuery, FontAwesome,
Linearicons, and the Apple badge image from five different CDNs; the Apple badge
host went dark and left a broken image on the live page. Nothing here can rot
that way.

```
index.html        Landing page
affiliates.html   Partners
terms.html        Terms of Service
privacy.html      Privacy Policy
css/custom.css    All styles (design tokens at the top)
images/           Photography, logos, partner marks
icons/            Favicons and touch icons
manifest.json     PWA manifest
```

## Local preview

Absolute paths (`/css/...`) mean `file://` will not work. Serve it:

```bash
python3 -m http.server 8899
# http://localhost:8899
```

## Deploying — read this first

**The live site is served by Vercel, not GitHub Pages.** The `CNAME` file in
this repo is a leftover from a GitHub Pages setup and does not control the live
domain. There is no `.vercel` project link checked in, so a deploy has to be
run against the Vercel project explicitly:

```bash
vercel --prod
```

As of 2026-08-12 the deployed site was an **older snapshot than this repo** —
it still showed the retired testimonials, merch, and "6800 users" copy. Anything
committed here is not live until someone deploys it.

## Design notes

Design tokens live at the top of `css/custom.css`. The brand blue is `#0144ee`.

Two conventions worth preserving:

- **The launch status board** in the hero replaces the app store badges. Both
  store listings currently 404, so the board states availability in the
  mountain's own vocabulary instead of linking to dead pages. Update the rows
  when the app actually ships.
- **Trail difficulty markers** (● ■ ◆ ◆◆) appear only in the ability-levels
  section, because that is the one place they describe the actual content. They
  are not a decorative motif — do not spread them to other sections.
