from fastapi import FastAPI

from .middleware.context import ContextMiddleware
from .routers.me import router as me_router
from .routers.runs import router as runs_router
from .routers.prompts import router as prompts_router
from .routers.feedback import router as feedback_router
from .routers.admin import router as admin_router
from .routers.tenants import router as tenants_router

app = FastAPI(title="My Dashboard Backend")

# Middleware để inject ngữ cảnh cho mọi request
app.add_middleware(ContextMiddleware)

# Routers
app.include_router(me_router)
app.include_router(runs_router)
app.include_router(prompts_router)
app.include_router(feedback_router)
app.include_router(admin_router)
app.include_router(tenants_router)


@app.get("/health")
async def health():
    return {"status": "ok"}
