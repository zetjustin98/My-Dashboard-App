from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response
from fastapi import Request

from ..deps import parse_context


class ContextMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        # Cố gắng phân tích cú pháp và đính kèm ngữ cảnh cho mọi yêu cầu.
        # Nếu thiếu tenant, không raise ở đây. Cho phép route/dep raise để xử lý lỗi rõ ràng.
        try:
            ctx = parse_context(request)
            request.state.ctx = ctx
        except Exception:
            # Để cho request.state.ctx không được gắn giá trị; các route/deps sẽ đảm bảo tình trạng lỗi và trả về 400 khi cần thiết.
            pass
        response = await call_next(request)
        return response
