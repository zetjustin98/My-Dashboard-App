# Backend (FastAPI) Quickstart

## Run
```
uvicorn app.backend.src.main:app --reload --port 8000
```

## Test
```
pytest -q
```

## Endpoints
- GET /health
- GET /me (requires x-tenant; optional x-role, x-username)
