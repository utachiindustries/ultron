'use client'

import type { ReactNode } from 'react'
import { ThemeToggle, useTheme } from './theme'

/**
 * Shared shell for every pre-auth screen: sign in, sign up and the
 * forgot/reset password flow. Two panes -- brand context on the left, one
 * focused task on the right -- collapsing to a compact header plus a
 * full-width form on narrow screens. Keeping every auth screen on the same
 * shell means spacing, type and focus treatment can never drift apart.
 */
export default function AuthShell({ children }: { children: ReactNode }) {
  const { theme } = useTheme()

  return (
    <div className="auth-shell">
      <ThemeToggle className="auth-theme-toggle" />
      <aside className="auth-aside">
        <a href="/" className="auth-logo">
          <img
            src={theme === 'light' ? '/brand/utachi-logo.png' : '/brand/utachi-logo-white.png'}
            alt="Utachi Industries"
          />
          <span className="auth-logo-divider" />
          <span className="auth-logo-product">Ultorn</span>
        </a>
        <div className="auth-aside-body">
          <h2 className="auth-aside-title">Sovereign security operations, built in Dakar.</h2>
          <p className="auth-aside-lead">
            The operator console for teams that find, verify and prove fixes — with every
            byte staying exactly where it belongs.
          </p>
          <ul className="auth-points">
            <li>
              <CheckMark />
              <span>
                Your data never leaves the room: AI prompts are stripped before they reach
                any outside model.
              </span>
            </li>
            <li>
              <CheckMark />
              <span>Every action, scan and AI query lands in an immutable audit trail.</span>
            </li>
            <li>
              <CheckMark />
              <span>
                Critical findings need a named human attestation before they can be closed.
              </span>
            </li>
          </ul>
        </div>
        <p className="auth-aside-foot">A Utachi Industries Labs product · Dakar, Senegal</p>
      </aside>
      <main className="auth-main">
        <div className="auth-card">{children}</div>
      </main>
    </div>
  )
}

function CheckMark() {
  return (
    <svg
      className="auth-check"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" opacity="0.35" />
      <path d="m8.5 12.2 2.4 2.4 4.6-5" />
    </svg>
  )
}
