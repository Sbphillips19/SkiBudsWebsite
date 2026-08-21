# SkiBuds product baseline — 2026-08-12

## Scope

This repository is the customer-owned static marketing site for SkiBuds. It is not the
mobile application source code. The live site at `https://skibudsapp.com/` has drifted
from this checkout and currently presents a newer product surface than the repository's
2019-era pages.

## Current product promise

The live surface describes finding people to ride with, carpooling and après, resort
stories, mountain conditions, and lift-status notifications. The repository additionally
describes skill-level matching, private/group chat, mountain check-ins, and app-store
downloads. These claims need one owner-approved source of truth before graph publication.

## Repository defects to address

- `index.html` and `affiliates.html` have empty descriptions, no canonical URL, no
  JSON-LD, and stale 2019/2020 copy.
- Several image references use `../images/...` from root pages and can resolve outside the
  site root; the app download navbar link is `#`.
- Root pages duplicate Bootstrap JavaScript and close `</html>` before `</body>`.
- Privacy/terms routes mix extensionless and `.html` links; a deployment must choose one
  canonical route policy.
- The current static site has no sitemap, robots policy, structured data, analytics event
  contract, or KGForge release artifact.
- Partner, app-store, social, and user-count claims require freshness/provenance before
  becoming governed graph facts.

## Safe KGForge pilot boundary

The first graph should cover only owner-approved SkiBuds facts: the app, supported
activities, skill levels, resort/mountain entities, lift-status/condition concepts,
community/safety purpose, partners, and app-store links. Dynamic user profiles, chat,
location, and safety-sensitive real-time data must not be inferred or published from this
static marketing repository.

SEO effectiveness must be measured through a preregistered, authorized pilot. KGForge can
guarantee graph governance, deterministic delivery, validation, provenance, and reporting;
it cannot honestly guarantee rankings, traffic, downloads, or revenue before evidence.
