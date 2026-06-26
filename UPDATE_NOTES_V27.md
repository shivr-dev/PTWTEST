# PTW 2027 Browser Secure v27

Professional Exam Experience update.

## Added
- Professional Exam Lobby with admission ticket, identity confirmation, readiness desk, and exam composition cards.
- Audio output check redesigned as a formal sample-audio verification step.
- Microphone check redesigned for speaking readiness.
- 3-second secure exam room countdown before entering fullscreen exam mode.
- Listening playback policy support per question:
  - `once` / `one_play`
  - `one_replay` / `two_plays`
  - `unlimited`
- Listening audio player now shows loading, unavailable, play limit, replay status, and disabled states.
- Formal Section Transition screen shown when entering a new section.
- Professional submission receipt page after exam submission.
- Copy Submission ID and Download Receipt actions.

## Kept
- Secure exam guard, auto-save, submission loading overlay, Supabase configuration, audio recording upload, question/exam binding, JSON import, and admin editable candidate instructions.

## Validation
- `npm run typecheck` passed.
- `npm run build` passed.
- GitHub Pages dist includes Supabase URL, anon key, and `exam_audio` bucket.
- `version.json`, `manifest.webmanifest`, and `service-worker.js` are updated to v27.0.0.
