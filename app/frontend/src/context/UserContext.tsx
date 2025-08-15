import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

// Kiểu dữ liệu context người dùng FE
export type UserCtx = {
  role: 'guest' | 'org_user' | 'admin' | ''
  username: string
  tenant: string
}

const DEFAULT_CTX: UserCtx = { role: '', username: '', tenant: '' }
const LS_KEY = 'app.userCtx'

// Bộ nhớ module-level để apiClient có thể đọc tự động
let currentCtx: UserCtx = DEFAULT_CTX
export const getCurrentContext = () => currentCtx

// Tiện ích cho unit tests: cho phép thiết lập context trực tiếp
export const __setCurrentContextForTests = (ctx: UserCtx) => {
  currentCtx = ctx
}

const Ctx = createContext<{
  ctx: UserCtx
  setCtx: (val: UserCtx) => void
}>({ ctx: DEFAULT_CTX, setCtx: () => {} })

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // nạp từ localStorage nếu có
  const [ctx, setCtx] = useState<UserCtx>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) return JSON.parse(raw)
    } catch {}
    return DEFAULT_CTX
  })

  // đồng bộ module-level + localStorage khi thay đổi
  useEffect(() => {
    currentCtx = ctx
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(ctx))
    } catch {}
  }, [ctx])

  const value = useMemo(() => ({ ctx, setCtx }), [ctx])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useUserContext = () => useContext(Ctx)
