'use client'

import { useRef, useState } from 'react'
import '../auth.css'
import AuthShell from '../../components/AuthShell'
import { TextField } from '../../components/auth-ui'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sentTo, setSentTo] = useState('')
  const [devToken, setDevToken] = useState<string | null>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Enter a valid email address.')
      emailRef.current?.focus()
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setError(data?.detail || 'Could not send the reset link. Try again.')
        return
      }
      setDevToken(typeof data?.dev_reset_token === 'string' ? data.dev_reset_token : null)
      setSentTo(email.trim())
    } catch {
      setError('Could not reach the network. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell>
      {sentTo ? (
        <>
          <span className="auth-kicker">Check your inbox</span>
          <h1 className="auth-title">Reset link sent.</h1>
          <p className="auth-sub">
            If an account exists for <strong>{sentTo}</strong>, we&apos;ve sent a link to
            choose a new password. Use the newest link if you request more than one.
          </p>

          {devToken && (
            <div className="auth-dev">
              <p className="auth-dev-title">Development mode</p>
              <p className="auth-dev-text">
                No email provider is configured on this server, so the reset link is shown
                here directly.
              </p>
              <a
                className="auth-btn-secondary"
                href={`/reset-password?token=${encodeURIComponent(devToken)}`}
              >
                Open the reset page
              </a>
            </div>
          )}

          <div className="auth-links">
            <a href="/console">← Back to sign in</a>
          </div>
        </>
      ) : (
        <>
          <span className="auth-kicker">Sovereign access</span>
          <h1 className="auth-title">Reset your password.</h1>
          <p className="auth-sub">
            Enter the email on your account and we&apos;ll send a link to choose a new
            password.
          </p>

          <form className="auth-form" onSubmit={submit} noValidate>
            <TextField
              id="forgot-email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError('')
              }}
              autoComplete="email"
              placeholder="you@company.sn"
              inputRef={emailRef}
              autoFocus
            />

            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting && <span className="auth-spinner" aria-hidden="true" />}
              {submitting ? 'Sending…' : 'Send reset link'}
            </button>
          </form>

          <div className="auth-links">
            <a href="/console">← Back to sign in</a>
          </div>
        </>
      )}
    </AuthShell>
  )
}
