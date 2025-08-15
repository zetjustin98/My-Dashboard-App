from fastapi import FastAPI

from .middleware.context import ContextMiddleware
from .routers.me import router as me_router

app = FastAPI(title="My Dashboard Backend")

# Middleware để inject ngữ cảnh cho mọi request
app.add_middleware(ContextMiddleware)

# Routers
app.include_router(me_router)


@app.get("/health")
async def health():
    return {"status": "ok"}
