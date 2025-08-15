import React, { useState } from 'react'
import type { FormEvent } from 'react'
import { useUserContext } from '../context/UserContext'

// Component chọn role/username/tenant và lưu vào context + localStorage
// Lưu ý: Không gọi API ở đây, chỉ quản lý state người dùng
export const RoleTenantSelector: React.FC = () => {
  const { ctx, setCtx } = useUserContext()
  const [role, setRole] = useState(ctx.role)
  const [username, setUsername] = useState(ctx.username)
  const [tenant, setTenant] = useState(ctx.tenant)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setCtx({ role, username, tenant })
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
      <label>
        Role
        <select value={role} onChange={(e) => setRole(e.target.value as any)}>
          <option value="">-- chọn role --</option>
          <option value="guest">guest</option>
          <option value="org_user">org_user</option>
          <option value="admin">admin</option>
        </select>
      </label>

      <label>
        Username
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="vd: alice" />
      </label>

      <label>
        Tenant
        <input value={tenant} onChange={(e) => setTenant(e.target.value)} placeholder="vd: tenant-a" />
      </label>

      <button type="submit">Lưu context</button>

      <div style={{ fontSize: 12, opacity: 0.8 }}>
        <div>Context hiện tại:</div>
        <pre>{JSON.stringify({ role: ctx.role, username: ctx.username, tenant: ctx.tenant }, null, 2)}</pre>
      </div>
    </form>
  )
}

export default RoleTenantSelector
