import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

type User = {
  id: string
  name: string
  email: string
}

type AuthResponse = {
  token: string
  user: User
  message?: string
}

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!email.trim() || !password.trim() || (isRegister && !name.trim())) {
      setError('Please complete all required fields.')
      return
    }

    setLoading(true)

    try {
      const payload: Record<string, string> = {
        email: email.trim(),
        password: password,
      }

      if (isRegister) {
        payload.name = name.trim()
      }

      const response = await fetch(`${API_URL}${isRegister ? '/api/auth/register' : '/api/auth/login'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = (await response.json()) as AuthResponse

      if (!response.ok) {
        throw new Error(data.message || 'Unable to sign in. Please try again.')
      }

      localStorage.setItem('courseflow_token', data.token)
      localStorage.setItem('courseflow_user', JSON.stringify(data.user))
      setSuccess(`Welcome, ${data.user.name}! Redirecting...`)

      setTimeout(() => {
        navigate('/', { replace: true })
      }, 700)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.header}>
          <h1 style={s.title}>{isRegister ? 'Create an account' : 'Sign in to CourseFlow'}</h1>
          <p style={s.description}>
            {isRegister
              ? 'Register to save your learning paths and return anytime.'
              : 'Enter your email and password to sign in.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={s.form}>
          {isRegister && (
            <label style={s.field}>
              <span style={s.label}>Full name</span>
              <input
                style={s.input}
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={loading}
                placeholder="Jane Doe"
              />
            </label>
          )}

          <label style={s.field}>
            <span style={s.label}>Email</span>
            <input
              style={s.input}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading}
              placeholder="you@example.com"
            />
          </label>

          <label style={s.field}>
            <span style={s.label}>Password</span>
            <input
              style={s.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={loading}
              placeholder="••••••••"
            />
          </label>

          {error && <div style={s.error}>{error}</div>}
          {success && <div style={s.success}>{success}</div>}

          <button type="submit" style={s.button} disabled={loading}>
            {loading ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <div style={s.switchRow}>
          <span>{isRegister ? 'Already have an account?' : 'New to CourseFlow?'}</span>
          <button
            type="button"
            style={s.switchButton}
            onClick={() => {
              setIsRegister(!isRegister)
              setError('')
              setSuccess('')
            }}
          >
            {isRegister ? 'Sign in' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
    color: '#f8fafc',
  },
  card: {
    width: '100%',
    maxWidth: 480,
    borderRadius: 24,
    padding: 36,
    background: 'rgba(15, 23, 42, 0.98)',
    boxShadow: '0 24px 80px rgba(15, 23, 42, 0.35)',
  },
  header: {
    marginBottom: 28,
  },
  title: {
    margin: 0,
    fontSize: 32,
    lineHeight: 1.1,
  },
  description: {
    marginTop: 12,
    color: '#cbd5e1',
    lineHeight: 1.6,
  },
  form: {
    display: 'grid',
    gap: 18,
  },
  field: {
    display: 'grid',
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#94a3b8',
  },
  input: {
    width: '100%',
    borderRadius: 14,
    border: '1px solid rgba(148, 163, 184, 0.18)',
    background: '#0f172a',
    color: '#f8fafc',
    padding: '14px 16px',
    fontSize: 16,
    outline: 'none',
  },
  button: {
    width: '100%',
    borderRadius: 14,
    border: 'none',
    padding: '14px 16px',
    fontSize: 16,
    fontWeight: 600,
    background: '#2563eb',
    color: '#ffffff',
    cursor: 'pointer',
  },
  switchRow: {
    marginTop: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    color: '#cbd5e1',
  },
  switchButton: {
    border: 'none',
    background: 'transparent',
    color: '#7c3aed',
    cursor: 'pointer',
    fontWeight: 600,
    padding: 0,
  },
  error: {
    color: '#f87171',
    background: 'rgba(248, 113, 113, 0.12)',
    borderRadius: 14,
    padding: '12px 14px',
    fontSize: 14,
  },
  success: {
    color: '#34d399',
    background: 'rgba(52, 211, 153, 0.12)',
    borderRadius: 14,
    padding: '12px 14px',
    fontSize: 14,
  },
}
