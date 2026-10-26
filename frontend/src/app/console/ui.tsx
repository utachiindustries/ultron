'use client'

/**
 * Shared console UI primitives.
 *
 * Every control pairs a visible <label> with its input (WCAG 3.3.2), exposes
 * busy/error state to assistive tech, and uses the same spacing and focus
 * treatment so the console behaves consistently (Jakob's Law).
 */

import React, { useEffect, useRef } from 'react'

const ACCENT = 'var(--c-accent)'
const TEXT = 'var(--c-text)'
const TEXT_DIM = 'var(--c-text-dim)'
const TEXT_FAINT = 'var(--c-text-faint)'
const BORDER = 'var(--c-border)'
const BORDER_STRONG = 'var(--c-border-strong)'
const SURFACE_RAISED = 'var(--c-surface-raised)'

// These primitives render on the console's single dark surface everywhere
// now (there is no more light-page variant), so "light"/"dark" `tone` props
// below are kept only for the depth difference between the page body and a
// glass Modal, not for a literal light/dark color scheme switch.
const S = {
  field: { display: 'flex', flexDirection: 'column' as const, gap: '0.35rem', marginBottom: '0.9rem' },
  label: { fontSize: '0.78rem', fontWeight: 600, color: TEXT_DIM, letterSpacing: '0.01em' },
  required: { color: 'var(--c-danger)', marginLeft: '0.15rem' },
  hint: { fontSize: '0.75rem', color: TEXT_FAINT },
  error: { fontSize: '0.75rem', color: 'var(--c-danger)' },
  control: {
    width: '100%',
    padding: '0.65rem 0.8rem',
    borderRadius: 0,
    border: `1px solid ${BORDER_STRONG}`,
    background: 'var(--c-field)',
    color: TEXT,
    fontSize: '0.9rem',
    minHeight: 44,
    outline: 'none',
  },
  controlError: { borderColor: 'var(--c-danger-strong)' },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.45rem',
    padding: '0.6rem 1rem',
    borderRadius: 0,
    border: '1px solid transparent',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    minHeight: 40,
    transition: 'background-color 120ms ease, border-color 120ms ease, opacity 120ms ease',
  },
  primary: { background: ACCENT, color: 'var(--c-on-accent)' },
  secondary: { background: 'var(--c-field)', color: TEXT, borderColor: BORDER_STRONG },
  secondaryDark: { background: 'var(--c-wash-strong)', color: TEXT, borderColor: 'var(--c-border-strong)' },
  ghost: { background: 'transparent', color: 'var(--c-accent-bright)', borderColor: 'var(--c-accent-border)' },
  danger: { background: 'var(--c-danger-solid)', color: 'var(--c-on-accent)' },
  disabled: { opacity: 0.5, cursor: 'not-allowed' },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.15rem 0.5rem',
    borderRadius: 0,
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.02em',
    textTransform: 'uppercase' as const,
    whiteSpace: 'nowrap' as const,
  },
  empty: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    gap: '0.4rem',
    padding: '2.5rem 1rem',
    color: TEXT_FAINT,
  },
  spinner: {
    width: 16,
    height: 16,
    borderRadius: '50%',
    border: '2px solid var(--c-border-strong)',
    borderTopColor: 'var(--c-on-accent)',
    animation: 'ultorn-spin 700ms linear infinite',
  },
}

const TONES: Record<string, React.CSSProperties> = {
  critical: { background: 'var(--c-danger-soft)', color: 'var(--c-danger)' },
  high: { background: 'var(--c-warn-soft)', color: 'var(--c-warn)' },
  medium: { background: 'var(--c-warn-soft)', color: 'var(--c-warn)' },
  low: { background: 'var(--c-success-soft)', color: 'var(--c-success)' },
  success: { background: 'var(--c-success-soft)', color: 'var(--c-success)' },
  warning: { background: 'var(--c-warn-soft)', color: 'var(--c-warn)' },
  danger: { background: 'var(--c-danger-soft)', color: 'var(--c-danger)' },
  neutral: { background: 'var(--c-wash)', color: TEXT_DIM },
  info: { background: 'var(--c-accent-soft)', color: 'var(--c-accent-violet)' },
}

export function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: string }) {
  return <span style={{ ...S.badge, ...(TONES[tone] || TONES.neutral) }}>{children}</span>
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  tone = 'light',
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  error?: string
  required?: boolean
  tone?: 'light' | 'dark'
  children: React.ReactNode
}) {
  const dark = tone === 'dark'
  const describedBy = [hint ? `${htmlFor}-hint` : null, error ? `${htmlFor}-error` : null]
    .filter(Boolean)
    .join(' ')
  return (
    <div style={S.field}>
      <label htmlFor={htmlFor} style={{ ...S.label, ...(dark ? { color: 'var(--c-text-soft)' } : {}) }}>
        {label}
        {required && (
          <span style={{ ...S.required, ...(dark ? { color: 'var(--c-danger)' } : {}) }} aria-hidden="true">
            *
          </span>
        )}
      </label>
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<any>, {
            id: htmlFor,
            tone,
            'aria-describedby': describedBy || undefined,
            'aria-invalid': error ? true : undefined,
            'aria-required': required || undefined,
          })
        : children}
      {hint && (
        <span id={`${htmlFor}-hint`} style={{ ...S.hint, ...(dark ? { color: 'var(--c-text-dim)' } : {}) }}>
          {hint}
        </span>
      )}
      {error && (
        <span id={`${htmlFor}-error`} style={{ ...S.error, ...(dark ? { color: 'var(--c-danger)' } : {}) }} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

const DARK_CONTROL: React.CSSProperties = {
  background: 'var(--c-field)',
  border: '1px solid var(--c-border-strong)',
  color: 'var(--c-text)',
}

function controlStyle(tone: 'light' | 'dark', invalid?: boolean, style?: React.CSSProperties): React.CSSProperties {
  return {
    ...S.control,
    ...(tone === 'dark' ? DARK_CONTROL : {}),
    ...(invalid ? S.controlError : {}),
    ...style,
  }
}

export function TextInput({
  invalid,
  tone = 'light',
  style,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean; tone?: 'light' | 'dark' }) {
  return <input {...props} style={controlStyle(tone, invalid, style)} />
}

export function Select({
  invalid,
  tone = 'light',
  style,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean; tone?: 'light' | 'dark' }) {
  return (
    <select {...props} style={controlStyle(tone, invalid, style)}>
      {children}
    </select>
  )
}

export function Textarea({
  invalid,
  tone = 'light',
  style,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean; tone?: 'light' | 'dark' }) {
  return <textarea {...props} style={controlStyle(tone, invalid, style)} />
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'secondaryDark' | 'ghost' | 'danger'
    loading?: boolean
  }
>(function Button(
  { variant = 'primary', loading = false, children, disabled, style, type = 'button', ...props },
  ref
) {
  const isDisabled = disabled || loading
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      style={{
        ...S.button,
        ...S[variant],
        ...(isDisabled ? S.disabled : {}),
        ...style,
      }}
    >
      {loading && <span style={S.spinner} aria-hidden="true" />}
      {loading ? 'Working…' : children}
    </button>
  )
})

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div style={S.empty}>
      <strong style={{ color: TEXT }}>{title}</strong>
      {description && <span style={{ fontSize: '0.85rem', maxWidth: 420 }}>{description}</span>}
      {action}
    </div>
  )
}

export function Spinner({ label = 'Loading' }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" style={{ ...S.empty, flexDirection: 'row', padding: '1.5rem' }}>
      <span style={{ ...S.spinner, borderColor: 'var(--c-accent-border)', borderTopColor: ACCENT }} />
      <span style={{ fontSize: '0.85rem' }}>{label}…</span>
    </div>
  )
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" style={{ ...S.empty, color: 'var(--c-danger)' }}>
      <strong>Something went wrong</strong>
      <span style={{ fontSize: '0.85rem', maxWidth: 480 }}>{message}</span>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}

export function Toast({
  message,
  tone = 'info',
  onDismiss,
}: {
  message: string
  tone?: 'info' | 'error' | 'success'
  onDismiss: () => void
}) {
  const bg =
    tone === 'error' ? 'var(--c-danger-bg)' : tone === 'success' ? 'var(--c-success-bg)' : 'var(--c-accent-soft)'
  const color = tone === 'error' ? 'var(--c-danger)' : tone === 'success' ? 'var(--c-success)' : 'var(--c-accent-violet)'
  const border =
    tone === 'error' ? 'var(--c-danger-border)' : tone === 'success' ? 'var(--c-success-border)' : 'var(--c-accent-border)'

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        background: bg,
        color,
        border: `1px solid ${border}`,
        borderRadius: 0,
        padding: '0.7rem 0.9rem',
        marginBottom: '1rem',
        fontSize: '0.87rem',
        fontWeight: 500,
      }}
    >
      <span>{message}</span>
      <button
        onClick={onDismiss}
        aria-label="Dismiss notification"
        style={{ background: 'none', border: 'none', color, cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}
      >
        ×
      </button>
    </div>
  )
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  tone = 'danger',
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  tone?: 'danger' | 'primary'
  onConfirm: () => void
  onCancel: () => void
}) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const onCancelRef = useRef(onCancel)
  onCancelRef.current = onCancel
  const titleId = React.useId()
  const descId = React.useId()

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    cancelRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCancelRef.current()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previous?.focus?.()
    }
  }, [open])

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'var(--c-overlay)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        style={{
          width: '100%',
          maxWidth: 420,
          background: SURFACE_RAISED,
          border: `1px solid ${BORDER}`,
          borderRadius: 0,
          padding: '1.5rem',
          boxShadow: '0 24px 80px var(--c-shadow-modal)',
        }}
      >
        <h2 id={titleId} style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: TEXT }}>
          {title}
        </h2>
        <p id={descId} style={{ fontSize: '0.9rem', color: TEXT_DIM, marginBottom: '1.25rem' }}>
          {description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <Button ref={cancelRef} variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant={tone} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
