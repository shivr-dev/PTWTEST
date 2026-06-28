# PTW 2027 Browser Secure v36.10

## Main correction
- Practice Session exam room now stays visually identical to the real exam room.
- The only Practice Session difference in the exam room is a small floating notice: local only, not uploaded, not graded.
- Removed any separate-looking practice exam room treatment from the expected candidate experience.

## Preserved behavior
- Practice Session remains local only.
- Practice Session does not appear in the candidate dashboard history.
- Practice Session does not upload to the server/database.
- Practice Session is not graded.
- The install-app prompt logic remains present: `beforeinstallprompt`, `appinstalled`, manual install fallback, and existing dismiss/install state handling.

## Build checks
- GitHub Pages bundle must continue to include the Supabase URL, anon key, and `exam_audio` bucket configuration.
