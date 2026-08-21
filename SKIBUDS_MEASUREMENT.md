# SkiBuds measurement contract

Analytics is Plausible (privacy-friendly, no cookies set by the provider), loaded from
`plausible.io/js/script.js` **only after** explicit consent (`analytics_consent=true`
cookie). All site events funnel through the `window.trackEvent(name, props)` helper
(defined in `src/_includes/layouts/base.njk`), which no-ops when Plausible has not been
loaded (consent declined or not yet granted) and forwards to `window.plausible` with
event properties as `props`.

## Consent gating

- Cookie: `analytics_consent`, values `true` / `false`, `SameSite=Lax`, `Secure`,
  1-year max-age. Banner renders on first visit; decline suppresses all loading.
- No events fire pre-consent; `trackEvent` guards make every call below safe either way.

## Events

| Event                | Trigger                                              | Properties                          | Defined in |
| -------------------- | ---------------------------------------------------- | ----------------------------------- | ---------- |
| `Waitlist Intent`    | Waitlist form submit attempt (homepage)              | `page`                              | `src/index.njk` |
| `Waitlist Signup`    | Waitlist POST returns ok                             | `page`                              | `src/index.njk` |
| `Waitlist Error`     | Waitlist POST fails (`stage: api_<status>` or `network`) | `stage`, `page`                 | `src/index.njk` |
| `App CTA Click`      | Any element with `data-track-cta="<label>"` clicked, once per element per pageview | `cta_label`, `page` | `src/_includes/layouts/base.njk` |
| `Contact Click`      | Any `mailto:` link clicked                           | `page`                              | `src/_includes/layouts/base.njk` |
| `Partner Outbound`   | Partner card link clicked on partners page           | `partner_name`, `page`              | `src/affiliates.njk` |
| `Resort Section View`| Resort section scrolled into view on homepage        | `section_id`, `page`                | `src/index.njk` |
| `Content Engaged`    | Blog article scrolled to 50% visibility              | `page`                              | `src/_includes/layouts/blog-post.njk` |

Plausible built-ins (not via `trackEvent`):

| Event          | Trigger                        | Properties            |
| -------------- | ------------------------------ | --------------------- |
| `pwa_install`  | `beforeinstallprompt` captured | none                  |
| `pwa_installed`| App installed                  | none                  |
| `web_vital`    | Core Web Vitals (once each)    | `metric`, `value`, `rating` |

Duplicate-event prevention: `App CTA Click` and `Partner Outbound` mark their element
(`data-cta-tracked` / outbound flag); `web_vital` sends each metric at most once.

## Contract events not yet implemented

- `legal_view`: privacy/terms page views are not instrumented. Add only if a reporting
  need exists; standard Plausible pageviews already count the visits.
- `app_store_click` / store links: N/A pre-launch — no store URLs exist yet. When stores
  go live, tag those links with `data-track-cta="ios-app-store"` /
  `data-track-cta="google-play"`; they will flow through `App CTA Click`.
- Social links are tagged with `data-track-cta` (e.g. `instagram-launch-updates`) and
  report as `App CTA Click` rather than a dedicated `social_click` event.

Do not collect names, email addresses, chat content, precise location, user profiles, or
device identifiers in these events. The production analytics owner must document consent,
retention, provider, and deletion behavior before enabling collection.

## SEO pilot boundary

Search Console page/query snapshots, graph release exposure, validation outcomes, and
conversion events are separate datasets. They must be joined only by canonical page key
and approved release/cohort identifiers. No ranking, traffic, download, or revenue claim
is causal until the preregistered SkiBuds pilot is approved and completed.
