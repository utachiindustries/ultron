'use client'

import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../content/site'

export default function MarketingNav({ current }: { current?: string }) {
  const [open, setOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      burgerRef.current?.focus()
    }
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node
      if (menuRef.current?.contains(target) || burgerRef.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
    }
  }, [open])

  return (
    <>
      <nav className="mnav">
        <a href="/" className="mlogo">
          <img src="/brand/utachi-logo.png" alt="Utachi Industries" />
          <span className="mlogo-divider" />
          <span className="mlogo-product">Ultorn</span>
        </a>

        <div className="mnav-links" aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} aria-current={current === l.href ? 'page' : undefined}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="mnav-actions">
          <a href="/console" className="mbtn mbtn-login">Sign in</a>
        </div>

        <button
          ref={burgerRef}
          className="mburger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </nav>

      <div ref={menuRef} id="mobile-menu" className={`mmenu${open ? ' open' : ''}`} aria-label="Mobile">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <div className="mdivider" />
        <a href="/console" onClick={() => setOpen(false)}>Sign in</a>
      </div>
    </>
  )
}
