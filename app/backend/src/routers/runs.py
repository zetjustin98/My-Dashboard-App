from fastapi import APIRouter, Depends

# lấy Context và dependency lấy context
from ..deps import get_current_context, Context

# Router cho runs
router = APIRouter(prefix="/runs", tags=["runs"])


@router.get("/demo")
def runs_demo(ctx: Context = Depends(get_current_context)):
    """
    Trả về payload demo cho runs, phản ánh tenant hiện tại từ ngữ cảnh.
    """
    return {"ok": True, "tenant": ctx["tenant"]}
