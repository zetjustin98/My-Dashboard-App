// Wrapper fetch để tự động đính kèm headers context cho mọi request
// Tuân thủ Coding Standards: gọi API qua service layer, không fetch trực tiếp trong component
import { API_BASE_URL } from '../config'
import { getCurrentContext } from '../context/UserContext'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type RequestOptions = {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: any
}

export async function apiRequest<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`

  const ctx = getCurrentContext()
  // Không gọi nếu thiếu tenant theo policy phía BE, để BE trả lỗi rõ ràng 400
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
    'x-role': ctx.role || '',
    'x-username': ctx.username || '',
    'x-tenant': ctx.tenant || '',
  }

  const init: RequestInit = {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  }

  const res = await fetch(url, init)
  const contentType = res.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const data = isJson ? await res.json() : (await res.text()) as unknown as T

  if (!res.ok) {
    const err: any = new Error('API Error')
    err.status = res.status
    err.data = data
    throw err
  }
  return data as T
}

export const apiClient = {
  get: <T = unknown>(path: string, headers?: Record<string, string>) => apiRequest<T>(path, { method: 'GET', headers }),
  post: <T = unknown>(path: string, body?: any, headers?: Record<string, string>) => apiRequest<T>(path, { method: 'POST', body, headers }),
  put: <T = unknown>(path: string, body?: any, headers?: Record<string, string>) => apiRequest<T>(path, { method: 'PUT', body, headers }),
  patch: <T = unknown>(path: string, body?: any, headers?: Record<string, string>) => apiRequest<T>(path, { method: 'PATCH', body, headers }),
  delete: <T = unknown>(path: string, headers?: Record<string, string>) => apiRequest<T>(path, { method: 'DELETE', headers }),
}
