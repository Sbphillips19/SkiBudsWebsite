# SkiBuds measurement contract

The site has no analytics provider configured in this repository. This contract defines
privacy-safe events before an owner connects a provider under `powwowllc1@gmail.com`.

## Events

| Event                   | Trigger                         | Required properties        |
| ----------------------- | ------------------------------- | -------------------------- |
| `app_store_click`       | App Store or Google Play link   | `store`, `page`, `release` |
| `partner_contact_click` | Partner/contact email link      | `partner_context`, `page`  |
| `social_click`          | Facebook/Instagram/YouTube link | `network`, `page`          |
| `legal_view`            | Privacy or terms page view      | `document`, `page`         |

Do not collect names, email addresses, chat content, precise location, user profiles, or
device identifiers in these events. The production analytics owner must document consent,
retention, provider, and deletion behavior before enabling collection.

## SEO pilot boundary

Search Console page/query snapshots, graph release exposure, validation outcomes, and
conversion events are separate datasets. They must be joined only by canonical page key
and approved release/cohort identifiers. No ranking, traffic, download, or revenue claim
is causal until the preregistered SkiBuds pilot is approved and completed.
