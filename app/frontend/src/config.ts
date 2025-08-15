// Cấu hình đọc biến môi trường cho FE
// Lưu ý: Vite sử dụng import.meta.env để truy cập biến môi trường bắt đầu bằng VITE_
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8000';
