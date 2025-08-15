from fastapi import APIRouter, Depends

# Lấy Context và dependency lấy context
from ..deps import get_current_context, Context

# Router cho feedback
router = APIRouter(prefix="/feedback", tags=["feedback"])


@router.get("/demo")
def feedback_demo(ctx: Context = Depends(get_current_context)):
    """
    Trả về payload demo cho feedback, phản ánh tenant hiện tại từ ngữ cảnh.
    """
    return {"ok": True, "tenant": ctx["tenant"]}
