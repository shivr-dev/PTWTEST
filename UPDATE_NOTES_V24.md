# PTW 2027 Browser Secure v24

## Focus
Question type support and JSON import validation.

## Changed
- Restored and tightened JSON import validation.
- Added formal support for:
  - multiple_choice
  - multiple_select
  - true_false
  - yes_no_not_given
  - fill_blank
  - short_answer
  - matching
  - heading_matching
  - listening
  - reading
  - writing
  - speaking
- Unsupported advanced types are now rejected at import instead of being silently imported and breaking the exam page.
- Added answer UI for multiple select, true/false/not given, yes/no/not given, fill blank, short answer, matching, and heading matching.
- Reading questions with passages are rendered in split reading layout when appropriate.
- Listening questions with audio are rendered in listening layout.
- Export JSON now includes matching fields: leftItems, rightItems, matchingInstructions.
- Database question content now preserves matching fields.

## Checks
- npm run typecheck: passed
- npm run build: passed
- Database URL compiled into GitHub Pages package: checked
- Supabase anon key compiled into GitHub Pages package: checked
- exam_audio bucket compiled into GitHub Pages package: checked
- Placeholder anon key not found in dist: checked
- version.json updated to v24.0.0
- manifest/service worker updated to v24.0.0
