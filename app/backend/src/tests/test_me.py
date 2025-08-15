from fastapi.testclient import TestClient

from app.backend.src.main import app


client = TestClient(app)


def test_me_echoes_context_from_headers():
    res = client.get("/me", headers={"x-tenant": "t1", "x-role": "admin", "x-username": "alice"})
    assert res.status_code == 200
    body = res.json()
    assert body == {"tenant": "t1", "role": "admin", "username": "alice"}


def test_me_missing_tenant_returns_400():
    res = client.get("/me", headers={"x-role": "user"})
    assert res.status_code == 400
    assert res.json().get("detail") == "tenant is required"


def test_me_header_overrides_query():
    res = client.get(
        "/me?tenant=t-query&role=user&username=bob",
        headers={"x-tenant": "t-header", "x-role": "admin", "x-username": "alice"},
    )
    assert res.status_code == 200
    body = res.json()
    assert body == {"tenant": "t-header", "role": "admin", "username": "alice"}
