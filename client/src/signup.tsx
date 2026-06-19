import React, { useState } from "react"

interface SignUpProps {
  onSwitch: () => void
  onSuccess?: (token: string) => void
}

const SignUp: React.FC<SignUpProps> = ({ onSwitch, onSuccess }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const passwordStrength = (p: string): { label: string; color: string; width: string } => {
    if (p.length === 0) return { label: "", color: "#334155", width: "0%" }
    if (p.length < 6) return { label: "Weak", color: "#ef4444", width: "33%" }
    if (p.length < 10 || !/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: "Fair", color: "#f59e0b", width: "66%" }
    return { label: "Strong", color: "#22c55e", width: "100%" }
  }

  const strength = passwordStrength(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (password !== confirm) { setError("Passwords do not match"); return }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return }
    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Registration failed")
      localStorage.setItem("token", data.token)
      onSuccess?.(data.token)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logoRow}>
          <div style={s.logoIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={s.logoText}>CourseFlow</span>
        </div>
        <h2 style={s.heading}>Create your account</h2>
        <p style={s.sub}>Start learning at your own pace, for free</p>
        {error && <div style={s.errorBox}>{error}</div>}
        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required style={s.input}
              onFocus={e => Object.assign(e.target.style, s.inputFocus)} onBlur={e => Object.assign(e.target.style, s.input)} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={s.input}
              onFocus={e => Object.assign(e.target.style, s.inputFocus)} onBlur={e => Object.assign(e.target.style, s.input)} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <div style={s.passwordWrap}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ ...s.input, paddingRight: 44 }}
                onFocus={e => Object.assign(e.target.style, { ...s.inputFocus, paddingRight: "44px" })}
                onBlur={e => Object.assign(e.target.style, { ...s.input, paddingRight: "44px" })}
              />
              <button type="button" onClick={() => setShowPassword(v => !v)} style={s.eyeBtn} tabIndex={-1}>
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"
                      stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#94a3b8" strokeWidth="2" />
                    <circle cx="12" cy="12" r="3" stroke="#94a3b8" strokeWidth="2" />
                  </svg>
                )}
              </button>
            </div>
            {password.length > 0 && (
              <div style={s.strengthWrap}>
                <div style={s.strengthTrack}>
                  <div style={{ ...s.strengthFill, width: strength.width, background: strength.color }} />
                </div>
                <span style={{ ...s.strengthLabel, color: strength.color }}>{strength.label}</span>
              </div>
            )}
          </div>
          <div style={s.field}>
            <label style={s.label}>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="••••••••"
              required
              style={confirm && confirm !== password ? { ...s.input, borderColor: "#ef4444" } : s.input}
              onFocus={e => Object.assign(e.target.style, s.inputFocus)}
              onBlur={e => Object.assign(e.target.style, s.input)}
            />
            {confirm && confirm !== password && <span style={s.matchError}>Passwords don't match</span>}
          </div>
          <button type="submit" style={loading ? { ...s.submitBtn, opacity: 0.7 } : s.submitBtn} disabled={loading}>
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>
        <p style={s.switchText}>
          Already have an account?{" "}
          <button onClick={onSwitch} style={s.switchLink}>Sign in</button>
        </p>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', 'Segoe UI', sans-serif", padding: "24px 16px" },
  card: { background: "#1e293b", border: "1px solid #334155", borderRadius: 16, padding: "40px 36px", width: "100%", maxWidth: 420, boxShadow: "0 25px 50px rgba(0,0,0,0.4)" },
  logoRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 28, justifyContent: "center" },
  logoIcon: { width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #2563eb, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" },
  logoText: { fontSize: 20, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.3px" },
  heading: { fontSize: 26, fontWeight: 700, color: "#f1f5f9", margin: "0 0 6px", textAlign: "center", letterSpacing: "-0.4px" },
  sub: { fontSize: 14, color: "#94a3b8", textAlign: "center", margin: "0 0 28px" },
  errorBox: { background: "#450a0a", border: "1px solid #991b1b", color: "#fca5a5", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 20 },
  form: { display: "flex", flexDirection: "column", gap: 18 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 500, color: "#cbd5e1" },
  input: { background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "11px 14px", color: "#f1f5f9", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" as const, transition: "border-color 0.15s" },
  inputFocus: { background: "#0f172a", border: "1px solid #2563eb", borderRadius: 8, padding: "11px 14px", color: "#f1f5f9", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" as const },
  passwordWrap: { position: "relative" },
  eyeBtn: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" },
  strengthWrap: { display: "flex", alignItems: "center", gap: 8, marginTop: 4 },
  strengthTrack: { flex: 1, height: 4, background: "#0f172a", borderRadius: 99, overflow: "hidden" },
  strengthFill: { height: "100%", borderRadius: 99, transition: "width 0.3s, background 0.3s" },
  strengthLabel: { fontSize: 11, fontWeight: 600, minWidth: 36 },
  matchError: { fontSize: 12, color: "#ef4444", marginTop: 2 },
  submitBtn: { marginTop: 6, background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff", border: "none", borderRadius: 8, padding: "13px", fontSize: 15, fontWeight: 600, cursor: "pointer", width: "100%", letterSpacing: "0.1px" },
  switchText: { marginTop: 22, textAlign: "center", fontSize: 13, color: "#94a3b8" },
  switchLink: { background: "none", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: 13, fontWeight: 500, padding: 0 },
}

export default SignUp