from fastapi import APIRouter, Depends

# Lấy Context và dependency lấy context
from ..deps import get_current_context, Context

# Router cho tenants
router = APIRouter(prefix="/tenants", tags=["tenants"])


@router.get("/demo")
def tenants_demo(ctx: Context = Depends(get_current_context)):
    """
    Trả về payload demo cho tenants, chỉ phản ánh tenant hiện tại từ ngữ cảnh.
    """
    return {"ok": True, "tenant": ctx["tenant"]}
