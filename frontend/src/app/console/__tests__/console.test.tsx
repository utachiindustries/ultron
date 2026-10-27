import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Page from '../page'

function mockFetchSequence(impl: (url: string, opts?: RequestInit) => Promise<any>) {
  global.fetch = jest.fn(impl) as unknown as typeof fetch
}

function jsonResponse(body: any, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as Response
}

describe('Console auth gate (smoke)', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.restoreAllMocks()
  })

  it('renders the login screen when no token is in localStorage', () => {
    render(<Page />)

    expect(screen.getByText(/sign in to the operator console/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()

    // Authenticated-only content must not be present.
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    expect(screen.queryByRole('navigation', { name: /overview navigation/i })).not.toBeInTheDocument()
  })

  it('shows email and password inputs on the login form', () => {
    render(<Page />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    // The password reveal toggle also carries "password" in its aria-label,
    // so scope the query to the input itself.
    expect(screen.getByLabelText(/password/i, { selector: 'input' })).toBeInTheDocument()
  })

  it('validates empty fields locally before spending a rate-limited login attempt', async () => {
    mockFetchSequence(async () => jsonResponse({ detail: 'Invalid credentials' }, false, 401))

    const user = userEvent.setup()
    render(<Page />)

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(global.fetch).not.toHaveBeenCalled()
    expect(screen.getByText('Enter your email address.')).toBeInTheDocument()
    expect(screen.getByText('Enter your password.')).toBeInTheDocument()
    expect(screen.getByText(/sign in to the operator console/i)).toBeInTheDocument()
  })

  it('surfaces the backend error when credentials are rejected', async () => {
    mockFetchSequence(async () => jsonResponse({ detail: 'Incorrect email or password' }, false, 401))

    const user = userEvent.setup()
    render(<Page />)

    await user.type(screen.getByLabelText(/email/i), 'nobody@example.com')
    await user.type(screen.getByLabelText(/password/i, { selector: 'input' }), 'wrong-password')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText('Incorrect email or password')).toBeInTheDocument()
    })

    // Still on the login screen, no crash.
    expect(screen.getByText(/sign in to the operator console/i)).toBeInTheDocument()
  })

  it('renders the authenticated console shell after a successful login', async () => {
    mockFetchSequence(async (url: any) => {
      const u = String(url)
      if (u.includes('/auth/token')) {
        return jsonResponse({ access_token: 'fake-token' })
      }
      if (u.includes('/auth/me')) {
        return jsonResponse({ id: 1, email: 'operator@example.com', role: 'analyst' })
      }
      // Dashboard data loads (scans, clients, audit, alerts, monitors, code-scans).
      return jsonResponse([])
    })

    const user = userEvent.setup()
    render(<Page />)

    await user.type(screen.getByLabelText(/email/i), 'operator@example.com')
    await user.type(screen.getByLabelText(/password/i, { selector: 'input' }), 'supersecret')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText('operator@example.com')).toBeInTheDocument()
    })

    // The sidebar nav and dashboard heading confirm the authenticated shell rendered.
    expect(screen.getByRole('navigation', { name: /overview navigation/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /operations overview/i })).toBeInTheDocument()
    expect(screen.queryByText(/sign in to the operator console/i)).not.toBeInTheDocument()

    expect(localStorage.getItem('token')).toBe('fake-token')
  })
})
