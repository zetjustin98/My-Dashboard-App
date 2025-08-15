from fastapi import APIRouter, Depends, HTTPException, status

# Lấy Context và dependency lấy context
from ..deps import get_current_context, Context

# Router cho admin
router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/demo")
def admin_demo(ctx: Context = Depends(get_current_context)):
    """
    Chỉ cho phép role=admin. Nếu không, trả về 403.
    """
    if (ctx.get("role") or "").lower() != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="admin role required")
    return {"ok": True, "tenant": ctx["tenant"], "admin": True}
