# Mini Sprintbox Repo

Static multi-page prototype for a mini design sprint.

## Files
- `index.html` — dashboard / entry point
- `personas.html` — core room roles and archetypes
- `interviews.html` — pre-interview / signal capture
- `flow.html` — sprint flow board
- `summary.html` — synthesis / export-style summary

## Run locally
Open `index.html` in a browser.

For cleaner navigation in a local dev server, you can also run:
- `python -m http.server 8000`
- then open `http://localhost:8000`

## Notes
- Preserves the editorial / tactile design language from the Stitch-inspired source screens.
- Adapted to your mini design sprint context for tomorrow.
- Static only: no backend, no auth, no shared state across pages yet.
- Best next step after the pilot: connect pages with a small `app.js` + localStorage.
