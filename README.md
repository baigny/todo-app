# To-Do App (React + FastAPI)

A simple full-stack to-do list: a React (Vite + Tailwind CSS) frontend talking to a FastAPI backend with in-memory storage (data resets when the backend restarts).

## Prerequisites

- Node.js (tested with v24.17.0) and npm
- Python (tested with 3.14.6) and pip

## Backend setup

```bash
cd backend
python -m venv venv
source venv/Scripts/activate   # Windows Git Bash; use venv\Scripts\activate on cmd/PowerShell
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

The API will be available at `http://localhost:8001`. (Port 8000 is blocked/reserved on some Windows setups — use 8001 or another free port, and update `frontend/src/api.js`'s `BASE_URL` to match.)

- Swagger UI: http://localhost:8001/docs
- ReDoc: http://localhost:8001/redoc

### Run backend tests

```bash
cd backend
source venv/Scripts/activate
pytest
```

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Reference

| Method | Path          | Description                        |
|--------|---------------|-------------------------------------|
| GET    | `/todos`      | List all todos                     |
| POST   | `/todos`      | Create a todo (`{ "title": str }`) |
| PATCH  | `/todos/{id}` | Update `title` and/or `completed`  |
| DELETE | `/todos/{id}` | Delete a todo                      |

See `/docs` for the full interactive schema.
