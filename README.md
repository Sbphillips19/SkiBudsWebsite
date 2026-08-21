# SkiBuds website

Static marketing site for [skibudsapp.com](https://skibudsapp.com).

## Stack

**Eleventy (11ty)** static site generator with:

- Zero client-side framework — pure HTML/CSS output
- Template inheritance (layouts/partials) for DRY navigation & footer
- Automatic image optimization (WebP/AVIF + responsive srcset) via `@11ty/eleventy-img`
- HTML minification in production
- No external CSS/JS dependencies — icons are inline SVG, type uses system font stacks

This is deliberate. The previous version pulled Bootstrap, jQuery, FontAwesome,
Linearicons, and the Apple badge image from five different CDNs; the Apple badge
host went dark and left a broken image on the live page. Nothing here can rot
that way.

```
src/
├── _data/site.json        # Site metadata (email, social, partners, waitlist)
├── _includes/
│   ├── layouts/base.njk   # Base HTML template (head, JSON-LD, scripts)
│   ├── partials/nav.njk   # Navigation with mobile hamburger menu
│   └── partials/footer.njk# Footer
├── _includes/svg/         # Inline SVG icons (if needed)
├── images/                # Source images (optimized at build time)
├── icons/                 # Favicons & PWA icons
├── css/custom.css         # All styles (design tokens at the top)
├── index.njk              # Landing page
├── affiliates.njk         # Partners page
├── privacy.njk            # Privacy Policy
├── terms.njk              # Terms of Service
├── 404.njk                # Custom 404 page
├── sitemap.njk            # Auto-generated sitemap.xml
├── manifest.json          # PWA manifest
├── robots.txt             # Robots policy
├── _headers               # Vercel headers (security, caching)
└── _redirects             # Vercel redirects (.html → extensionless)
```

## Local development

```bash
# Install dependencies
npm install

# Start dev server with live reload
npm run dev
# → http://localhost:8080

# Production build (minified, optimized images)
npm run build
# → output in _site/

# Preview production build locally
npm run preview
# → http://localhost:8899
```

## Deploying

**The live site is served by Vercel.** Connect the GitHub repository to Vercel for automatic deployments on push to main.

Required Vercel settings:

- Framework Preset: **Eleventy**
- Build Command: `npm run build`
- Output Directory: `_site`
- Install Command: `npm install`

The `vercel.json` is not needed — `_headers` and `_redirects` in `src/` are auto-detected.

### Custom domain

The `CNAME` file (`skibudsapp.com`) is deployed to `_site/CNAME` for Vercel custom domain configuration.

## Design notes

Design tokens live at the top of `src/css/custom.css`. The brand blue is `#0144ee`.

Two conventions worth preserving:

- **The launch status board** in the hero replaces the app store badges. Both store listings currently 404, so the board states availability in the mountain's own vocabulary instead of linking to dead pages. Update the rows in `src/_data/site.json` when the app actually ships.
- **Trail difficulty markers** (● ■ ◆ ◆◆) appear only in the ability-levels section, because that is the one place they describe the actual content. They are not a decorative motif — do not spread them to other sections.

## Content updates

All site metadata lives in `src/_data/site.json`:

- Company info, email, social links
- App launch status (iOS/Android)
- Partner list (name, URL, logo filename, description)
- Waitlist count

Edit this file and rebuild — no HTML changes needed for routine updates.

## Image optimization

Images in `src/images/` are automatically optimized at build:

- Converted to WebP & AVIF with JPEG fallback
- Responsive `srcset` generated at 320/640/960/1280/1920/2560w
- Used via `{% image "filename.png", "alt text", "sizes", "class", "loading" %}` shortcode

The hero background (`WhistlerPeakView.jpg`) is preloaded for LCP optimization.

## PWA / SEO

- Complete `manifest.json` with maskable icons, screenshots, shortcuts
- JSON-LD structured data (MobileApplication, Organization, WebSite, WebPage)
- Sitemap.xml auto-generated
- Canonical URLs (extensionless)
- Open Graph / Twitter cards
- Dark mode flash prevention script

## Analytics (placeholder)

Consent-aware analytics stub in `base.njk` — replace with Plausible, GA4, or Umami when ready:

```js
var consent = document.cookie.split('; ').find(row => row.startsWith('analytics_consent='));
if (consent && consent.split('=')[1] === 'true') {
  // Initialize analytics
}
```
