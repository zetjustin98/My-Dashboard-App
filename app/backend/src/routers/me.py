from fastapi import APIRouter, Request, Depends

from ..deps import get_current_context, Context

router = APIRouter()


@router.get("/me")
async def read_me(request: Request, ctx: Context = Depends(get_current_context)):
    return ctx
