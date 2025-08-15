import './App.css'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from './services/apiClient'
import RoleTenantSelector from './components/RoleTenantSelector'
import { useUserContext } from './context/UserContext'

function App() {
  // đọc context để gắn vào queryKey, khi context đổi sẽ refetch dữ liệu /me theo state mới
  const { ctx } = useUserContext()

  const query = useQuery({
    queryKey: ['me', ctx],
    queryFn: () => apiClient.get('/me'),
    enabled: Boolean(ctx.tenant), // chỉ fetch khi người dùng đã chọn tenant
    retry: false,
  })

  return (
    <div style={{ padding: 16, display: 'grid', gap: 16 }}>
      <h1>Demo Context + API /me</h1>
      <RoleTenantSelector />

      <div style={{ display: 'grid', gap: 8 }}>
        <button onClick={() => query.refetch()}>Gọi /me</button>
        {!ctx.tenant && (
          <small style={{ color: 'orange' }}>Vui lòng chọn tenant trước khi gọi API</small>
        )}
        {query.isLoading && <div>Đang tải...</div>}
        {query.error && (
          <div style={{ color: 'crimson' }}>
            Lỗi API: {(query.error as any)?.status} {(query.error as any)?.data ? JSON.stringify((query.error as any)?.data) : ''}
          </div>
        )}
        {query.data ? (
          <pre style={{ background: '#111', color: '#0f0', padding: 12, borderRadius: 6 }}>
            {JSON.stringify(query.data as unknown, null, 2)}
          </pre>
        ) : null}
      </div>
    </div>
  )
}

export default App
