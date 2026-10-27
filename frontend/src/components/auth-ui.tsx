'use client'

import { useState, type ChangeEvent, type ReactNode, type RefObject } from 'react'

/**
 * Shared building blocks for the pre-auth screens. One implementation of
 * every field means labels, error wiring (aria-invalid / aria-describedby)
 * and the password reveal control behave identically on every auth page.
 */

export function TextField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  autoComplete,
  placeholder,
  inputRef,
  error,
  labelAction,
  optional = false,
  autoFocus = false,
}: {
  id: string
  label: string
  type?: 'text' | 'email'
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  autoComplete: string
  placeholder?: string
  inputRef?: RefObject<HTMLInputElement>
  error?: string
  labelAction?: ReactNode
  optional?: boolean
  autoFocus?: boolean
}) {
  return (
    <div className="auth-field">
      <div className="auth-label-row">
        <label className="auth-label" htmlFor={id}>
          {label}
          {optional && <span className="auth-optional"> (optional)</span>}
        </label>
        {labelAction}
      </div>
      <input
        ref={inputRef}
        id={id}
        className="auth-input"
        type={type}
        inputMode={type === 'email' ? 'email' : undefined}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p className="auth-field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

export function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  inputRef,
  error,
  hint,
  labelAction,
  autoFocus = false,
}: {
  id: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  autoComplete: string
  inputRef?: RefObject<HTMLInputElement>
  error?: string
  hint?: ReactNode
  labelAction?: ReactNode
  autoFocus?: boolean
}) {
  const [show, setShow] = useState(false)
  const describedBy =
    [error ? `${id}-error` : '', hint ? `${id}-hint` : ''].filter(Boolean).join(' ') ||
    undefined

  return (
    <div className="auth-field">
      <div className="auth-label-row">
        <label className="auth-label" htmlFor={id}>
          {label}
        </label>
        {labelAction}
      </div>
      <div className="auth-password">
        <input
          ref={inputRef}
          id={id}
          className="auth-input"
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
        <button
          type="button"
          className="auth-reveal"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          aria-pressed={show}
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {hint && (
        <div className="auth-rules" id={`${id}-hint`}>
          {hint}
        </div>
      )}
      {error && (
        <p className="auth-field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

/** Live checklist item -- neutral until met, then green. */
export function Rule({ met, children }: { met: boolean; children: ReactNode }) {
  return (
    <span className={`auth-rule ${met ? 'is-met' : ''}`}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </svg>
      {children}
    </span>
  )
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.6 12S6.2 5.6 12 5.6 21.4 12 21.4 12 17.8 18.4 12 18.4 2.6 12 2.6 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4l16 16" />
      <path d="M9.9 5.9A9.6 9.6 0 0 1 12 5.6c5.8 0 9.4 6.4 9.4 6.4a17.4 17.4 0 0 1-2.9 3.7" />
      <path d="M6.5 6.7A17 17 0 0 0 2.6 12S6.2 18.4 12 18.4c1 0 2-.2 2.8-.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  )
}
