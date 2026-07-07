# To-Do App — Product Requirements Doc

## Overview
A simple full-stack to-do list app: React (Vite + Tailwind) frontend, FastAPI backend, in-memory storage. Single user, no auth, data resets on backend restart.

## Current state (shipped)
- Backend: `GET/POST /todos`, `PATCH /todos/{id}` (title/completed), `DELETE /todos/{id}`. In-memory list, no persistence.
- Frontend: add a todo, list todos, toggle complete (checkbox + strikethrough), delete. No editing title, no filtering, no persistence across backend restarts.
- Tests: `backend/test_main.py` covers the API.
- Tooling: Vite dev server, Tailwind v4, oxlint removed (2026-07-07).

## Goals
- Keep the app simple and legible — this is a learning/reference project, not a production SaaS.
- Add features incrementally, each one small enough to ship and verify on its own.
- Prefer boring, well-understood tech over novelty.

## Non-goals (for now)
- Multi-user accounts / auth.
- Mobile app / offline support.
- Real-time sync across tabs/devices.

## Roadmap / Todos

### 1. Persistence
- [ ] Replace in-memory `todos` list with SQLite (via SQLModel or raw `sqlite3`).
- [ ] Add a migration/init step that creates the DB file if missing.
- [ ] Update `test_main.py` to use a temp/test DB instead of the shared in-memory list.

### 2. Core UX gaps
- [ ] Edit a todo's title in place (double-click or edit icon → input → save on blur/Enter).
- [ ] Confirm-before-delete or an undo toast (avoid accidental data loss).
- [ ] Loading state while `getTodos()` resolves on first mount.
- [ ] Error handling in the UI when a fetch fails (currently silent).

### 3. Organization
- [ ] Filter view: All / Active / Completed.
- [ ] Clear-completed button.
- [ ] Reorder todos (drag-and-drop or up/down controls).

### 4. Nice-to-haves
- [ ] Due dates + overdue highlighting.
- [ ] Simple tags/categories.
- [ ] Item count summary ("3 left").
- [ ] Keyboard shortcuts (e.g. `Enter` to add, already works via form submit).

### 5. Quality
- [ ] Frontend tests (Vitest + React Testing Library) for add/toggle/delete flows.
- [ ] Basic CI (GitHub Actions) running backend pytest + frontend build.

## Open questions
- Persistence choice: SQLite is the natural next step for a single-user local app — confirm before starting section 1.
- Is multi-list/multi-board support ever in scope, or strictly a single flat list?
