from fastapi import APIRouter, Depends

# Lấy Context và dependency lấy context
from ..deps import get_current_context, Context

# Router cho prompts
router = APIRouter(prefix="/prompts", tags=["prompts"])


@router.get("/demo")
def prompts_demo(ctx: Context = Depends(get_current_context)):
    """
    Trả về payload demo cho prompts, phản ánh tenant hiện tại từ ngữ cảnh.
    """
    return {"ok": True, "tenant": ctx["tenant"]}
