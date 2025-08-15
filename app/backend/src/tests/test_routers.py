from fastapi.testclient import TestClient

from app.backend.src.main import app


client = TestClient(app)


def _headers(role="user", username="alice", tenant="t1"):
    return {"x-role": role, "x-username": username, "x-tenant": tenant}


# Happy paths: 200 với payload demo

def test_runs_demo_200():
    res = client.get("/runs/demo", headers=_headers())
    assert res.status_code == 200
    assert res.json() == {"ok": True, "tenant": "t1"}


def test_prompts_demo_200():
    res = client.get("/prompts/demo", headers=_headers())
    assert res.status_code == 200
    assert res.json() == {"ok": True, "tenant": "t1"}


def test_feedback_demo_200():
    res = client.get("/feedback/demo", headers=_headers())
    assert res.status_code == 200
    assert res.json() == {"ok": True, "tenant": "t1"}


def test_tenants_demo_200():
    res = client.get("/tenants/demo", headers=_headers())
    assert res.status_code == 200
    assert res.json() == {"ok": True, "tenant": "t1"}


# RBAC admin: 200 khi role=admin, 403 khi role!=admin

def test_admin_demo_200_when_admin():
    res = client.get("/admin/demo", headers=_headers(role="admin"))
    assert res.status_code == 200
    assert res.json() == {"ok": True, "tenant": "t1", "admin": True}


def test_admin_demo_403_when_not_admin():
    res = client.get("/admin/demo", headers=_headers(role="user"))
    assert res.status_code == 403
    assert res.json().get("detail") == "admin role required"


# Thiếu tenant -> 400 từ dependency

def test_any_demo_400_when_missing_tenant():
    for path in [
        "/runs/demo",
        "/prompts/demo",
        "/feedback/demo",
        "/admin/demo",
        "/tenants/demo",
    ]:
        res = client.get(path, headers={"x-role": "user", "x-username": "alice"})
        assert res.status_code == 400
        assert res.json().get("detail") == "tenant is required"
