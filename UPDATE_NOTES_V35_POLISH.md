# PTW 2027 Browser Secure — v35.1 Polish Update

Build: `v35.1.0`  
Date: 2026-06-28

## Purpose

This is a visual and experience polish pass on top of v35. It keeps the v35 exam logic intact and adds refined first-entry candidate guide details so the onboarding feels like part of a premium secure assessment system rather than a generic modal.

## Added premium details

- Cinematic first-entry guide entrance animation.
- Subtle aurora background, constellation particles, fine grain/noise texture, and non-intrusive scanline motion.
- Header status chips:
  - Guide layer active
  - Policy version v35
  - Database sync aware
- Step progress detail row with completion percentage.
- Keyboard navigation for the candidate guide:
  - Left arrow: previous step
  - Right arrow: next step
  - Enter: continue
- Assurance strip under the guide text:
  - No backend provider exposed
  - Candidate-only first entry
  - Rules match current build
- Right-side premium status stack:
  - Focus guard — 3 sec away risk
  - Attempt lock — 3 counted events
  - Recovery layer — Draft + sync
- Button sheen, focus-visible outline, step hover glint, progress shimmer, seal pulse, device scan, and dashboard-style micro-interactions.
- Reduced-motion compatibility is preserved for users who prefer less animation.
- Mobile layout remains simplified so the guide does not feel crowded on small screens.

## Logic preserved

No core exam behavior was intentionally changed. The following v35 behavior remains preserved:

- Candidate-only first-entry guide.
- Admin login bypasses candidate onboarding.
- Fullscreen expectation.
- Page switch / leave-page detection.
- Copy/paste, right click, and shortcut restriction behavior.
- Leaving the exam window for 3 seconds or more remains high risk.
- 3 counted security events can lock the exam for review.
- Draft recovery remains available.
- Database sync and cached-data fallback remain available.
- Speaking recordings and question audio storage behavior remains unchanged.

## Version/cache update

- `version.json` updated to `v35.1.0`.
- `service-worker.js` cache updated to `v35.1.0`.
- Production asset names changed to:
  - `assets/index-PTWv35-polished.js`
  - `assets/index-PTWv35-polished.css`
- `index.html` and `404.html` now reference the polished production assets.
- Candidate guide completion key is now versioned for the polish pass so the refreshed guide can appear once for this v35 polish layer.

## Database and storage configuration check

Checked in the production JavaScript bundle:

- Supabase URL is compiled into the GitHub Pages package:
  - `https://yexttnnhemdihitqxhha.supabase.co`
- Supabase anon key is compiled into the package and is not a placeholder.
- Storage bucket reference remains configured as:
  - `exam_audio`
- The UI still refers to this as database/system/storage behavior and does not display Supabase branding in the candidate guide.

## Validation

- JavaScript syntax check passed with `node --check`.
- Updated asset references are present in both `index.html` and `404.html`.
- Service worker pre-cache includes the polished JS and CSS asset names.
