from typing import TypedDict, Optional

from fastapi import HTTPException, Request


class Context(TypedDict):
    role: Optional[str]
    username: Optional[str]
    tenant: str


def _get_first(values, fallback=None):
    return values[0] if values else fallback


def parse_context(request: Request) -> Context:
    """Parse role, username, tenant từ headers first, sau đó fallback to query params.
    Lỗi 400 nếu tenant thiếu theo chính sách.
    """
    headers = request.headers
    query = request.query_params

    role = headers.get("x-role") or query.get("role")
    username = headers.get("x-username") or query.get("username")
    tenant = headers.get("x-tenant") or query.get("tenant")

    if not tenant:
        raise HTTPException(status_code=400, detail="tenant is required")

    return {"role": role, "username": username, "tenant": str(tenant)}


def get_current_context(request: Request) -> Context:
    """FastAPI dependency để lấy và gắn ngữ cảnh vào request.state.ctx"""
    ctx = parse_context(request)
    request.state.ctx = ctx
    return ctx
