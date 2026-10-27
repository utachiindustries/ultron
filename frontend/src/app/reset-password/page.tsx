'use client'

import { useEffect, useState } from 'react'
import '../auth.css'
import AuthShell from '../../components/AuthShell'
import { PasswordField, Rule } from '../../components/auth-ui'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function ResetPasswordPage() {
  const [token, setToken] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Read the token from the URL after mount (avoids a Suspense boundary
    // requirement for useSearchParams on a fully static page).
    setToken(new URLSearchParams(window.location.search).get('token') || '')
    setLoaded(true)
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: newPassword }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(
          typeof data?.detail === 'string'
            ? data.detail
            : 'Could not reset the password. Request a new link and try again.'
        )
        return
      }
      setDone(true)
    } catch {
      setError('Could not reach the network. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!loaded) {
    return (
      <AuthShell>
        <span className="auth-kicker">Sovereign access</span>
        <h1 className="auth-title">Choose a new password.</h1>
        <p className="auth-sub">Checking your reset link…</p>
      </AuthShell>
    )
  }

  if (!token) {
    return (
      <AuthShell>
        <span className="auth-kicker">Link problem</span>
        <h1 className="auth-title">This link is incomplete.</h1>
        <p className="auth-sub">
          The reset link is missing its token. Request a new link and use the newest one
          you receive.
        </p>
        <div className="auth-links">
          <a className="auth-link-strong" href="/forgot-password">
            Request a new link
          </a>
          <a href="/console">← Back to sign in</a>
        </div>
      </AuthShell>
    )
  }

  if (done) {
    return (
      <AuthShell>
        <span className="auth-kicker">All set</span>
        <h1 className="auth-title">Password updated.</h1>
        <p className="auth-sub">
          Sign in with your new password to pick up where you left off.
        </p>
        <div className="auth-form">
          <a className="auth-submit" href="/console" style={{ textDecoration: 'none' }}>
            Sign in
          </a>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell>
      <span className="auth-kicker">Sovereign access</span>
      <h1 className="auth-title">Choose a new password.</h1>
      <p className="auth-sub">Set a new password for your account.</p>

      <form className="auth-form" onSubmit={submit} noValidate>
        <PasswordField
          id="reset-password"
          label="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
          hint={<Rule met={newPassword.length >= 8}>At least 8 characters</Rule>}
          autoFocus
        />
        <PasswordField
          id="reset-confirm-password"
          label="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          hint={
            confirmPassword !== '' ? (
              <Rule met={newPassword === confirmPassword}>Passwords match</Rule>
            ) : undefined
          }
        />

        {error && (
          <div className="login-error" role="alert">
            {error}
          </div>
        )}

        <button type="submit" className="auth-submit" disabled={submitting} aria-busy={submitting}>
          {submitting && <span className="auth-spinner" aria-hidden="true" />}
          {submitting ? 'Updating…' : 'Update password'}
        </button>
      </form>

      <div className="auth-links">
        <a href="/console">← Back to sign in</a>
      </div>
    </AuthShell>
  )
}
