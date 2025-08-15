from starlette.requests import Request

from app.backend.src.deps import parse_context


def make_request(headers=None, query_string: bytes = b""):
    headers = headers or []
    scope = {
        "type": "http",
        "method": "GET",
        "path": "/",
        "headers": headers,
        "query_string": query_string,
    }
    return Request(scope)


def test_parse_context_header_priority():
    # Khi cả header và query đều có; ưu tiên header
    headers = [
        (b"x-tenant", b"t-header"),
        (b"x-role", b"admin"),
        (b"x-username", b"u-header"),
    ]
    req = make_request(headers=headers, query_string=b"tenant=t-query&role=user&username=u-query")
    ctx = parse_context(req)
    assert ctx["tenant"] == "t-header"
    assert ctx["role"] == "admin"
    assert ctx["username"] == "u-header"


def test_parse_context_missing_tenant_raises():
    req = make_request(headers=[(b"x-role", b"user")])
    try:
        parse_context(req)
        assert False, "Expected HTTPException for missing tenant"
    except Exception as e:
        # FastAPI ném ra HTTPException với status_code=400
        from fastapi import HTTPException

        assert isinstance(e, HTTPException)
        assert e.status_code == 400
        assert e.detail == "tenant is required"
