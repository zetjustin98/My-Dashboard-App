# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project adheres to Semantic Versioning where applicable.

## [Unreleased]

## [0.1.0] - 2025-08-15
### Added
- FE scaffold: Vite + React + TypeScript tại `app/frontend/` theo PRD Monorepo (`app/backend/`, `app/frontend/`).
- `RoleTenantSelector` component: chọn `role`, `username`, `tenant`; lưu vào Context + `localStorage` và hiển thị trạng thái hiện tại.
- `apiClient` tự động đính kèm headers `x-role`, `x-username`, `x-tenant` cho mọi request.
- Demo gọi API `/me` (phụ thuộc BE FastAPI) để xác thực headers đúng.
- Thiết lập React Query (`queryClient`), cấu hình `vite.config.ts`, `vitest.config.ts`, và `.env` (`VITE_API_BASE_URL`).
- Unit tests (Vitest + React Testing Library):
  - `app/frontend/src/components/RoleTenantSelector.test.tsx`
  - `app/frontend/src/services/apiClient.test.ts`

### Changed
- Di chuyển frontend từ `apps/web/` → `app/frontend/` để tuân theo PRD repository structure.
- Cập nhật tài liệu story: `docs/stories/1.2.story.md` (File Locations, File List, Status → Ready for Review).

### Notes
- Story: `docs/stories/1.2.story.md` — Status: Ready for Review.
- Dev server: `npm run dev` tại `app/frontend/` (port ví dụ: 5174).
- Yêu cầu backend đang chạy tại `http://localhost:8000` để demo `/me` hoạt động.
