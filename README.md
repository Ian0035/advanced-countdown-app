# Advanced Countdown App

## Task Timing
- Start time: 2026-03-17 10:00 (Europe/Brussels)
- End time: 2026-03-17 15:45 (Europe/Brussels)

## Initial Thoughts / Plan
After reading the instructions, I expected this to be a manageable challenge. I discussed the approach with multiple AI models to pressure‑test the plan and reduce blind spots. ChatGPT helped draft `SPEC.md` and `ARCHITECTURE.md`, while Gemini was used to critique and refine the approach. I used Codex 5.2 for implementation.

There are some requirements I need to hit:
- Set up a clean state container for countdowns (add/remove/tick).
- Build a config screen with date/time selection + async “start” flow.
- Mock the API to return `date + 2 minutes`.
- Keep a global ticker to update countdowns every second.
- Build a list view for active countdowns, auto-removing expired items.
- Add a global “closest to expiring” banner.
- Add unit tests around countdown utilities and store logic.

After all the functionalities are done, I would like to style the app just like the loofers website, so I'll make a `STYLEGUIDE.md` based on the website.
