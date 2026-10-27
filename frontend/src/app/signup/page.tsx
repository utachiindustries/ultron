'use client'

import { useState } from 'react'
import '../auth.css'
import AuthShell from '../../components/AuthShell'
import { PasswordField, Rule, TextField } from '../../components/auth-ui'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setEmailError('')

    if (!EMAIL_PATTERN.test(email.trim())) {
      setEmailError('Enter a valid email address.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
          full_name: fullName.trim() || undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        const detail = data?.detail
        const message =
          typeof detail === 'string'
            ? detail
            : Array.isArray(detail)
              ? detail.map((d: any) => d.msg || String(d)).join(', ')
              : 'Could not create your account.'
        setError(message)
        setSubmitting(false)
        return
      }

      // Registration succeeded — log the new user in immediately.
      const loginRes = await fetch(`${API_URL}/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      })
      const loginData = await loginRes.json().catch(() => null)

      if (loginData?.access_token) {
        localStorage.setItem('token', loginData.access_token)
        window.location.href = '/console'
      } else {
        // Account was created but auto-login failed; send them to sign in manually.
        window.location.href = '/console'
      }
    } catch {
      setError('Could not reach the network. Try again.')
      setSubmitting(false)
    }
  }

  return (
    <AuthShell>
      <span className="auth-kicker">Sovereign access</span>
      <h1 className="auth-title">Create your account.</h1>
      <p className="auth-sub">Set up client access to the Ultorn console.</p>

      <form className="auth-form" onSubmit={submit} noValidate>
        <TextField
          id="signup-name"
          label="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
          placeholder="Your name"
          optional
          autoFocus
        />
        <TextField
          id="signup-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (emailError) setEmailError('')
          }}
          autoComplete="email"
          placeholder="you@company.sn"
          error={emailError}
        />
        <PasswordField
          id="signup-password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          hint={<Rule met={password.length >= 8}>At least 8 characters</Rule>}
        />
        <PasswordField
          id="signup-confirm-password"
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          hint={
            confirmPassword !== '' ? (
              <Rule met={password === confirmPassword}>Passwords match</Rule>
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
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="auth-legal">
        By continuing you agree to the <a href="/service-agreement">service agreement</a> and{' '}
        <a href="/privacy-notice">privacy notice</a>.
      </p>

      <div className="auth-links">
        <span>Already have an account?</span>
        <a className="auth-link-strong" href="/console">
          Sign in
        </a>
      </div>
    </AuthShell>
  )
}
