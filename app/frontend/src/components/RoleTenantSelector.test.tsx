import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { UserProvider } from '../context/UserContext'
import RoleTenantSelector from './RoleTenantSelector'

const renderWithProvider = (ui: React.ReactElement) => render(<UserProvider>{ui}</UserProvider>)

describe('RoleTenantSelector', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('hiển thị và lưu role/username/tenant vào context + localStorage', () => {
    renderWithProvider(<RoleTenantSelector />)

    // chọn role
    const roleSelect = screen.getByLabelText(/role/i) as HTMLSelectElement
    fireEvent.change(roleSelect, { target: { value: 'org_user' } })

    // nhập username
    const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement
    fireEvent.change(usernameInput, { target: { value: 'alice' } })

    // nhập tenant
    const tenantInput = screen.getByLabelText(/tenant/i) as HTMLInputElement
    fireEvent.change(tenantInput, { target: { value: 't1' } })

    // submit
    fireEvent.click(screen.getByRole('button', { name: /lưu context/i }))

    // UI phản ánh state hiện tại
    const pre = screen.getByText(/Context hiện tại/i).nextSibling as HTMLElement
    expect(pre.textContent).toContain('org_user')
    expect(pre.textContent).toContain('alice')
    expect(pre.textContent).toContain('t1')

    // lưu localStorage
    const raw = localStorage.getItem('app.userCtx')
    expect(raw).toBeTruthy()
    expect(raw).toContain('org_user')
    expect(raw).toContain('alice')
    expect(raw).toContain('t1')
  })
})
