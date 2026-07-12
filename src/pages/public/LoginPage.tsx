import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const roleOptions = [
  { value: 'farmer', label: 'Farmer' },
  { value: 'buyer', label: 'Buyer/Supplier' },
] as const

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [identity, setIdentity] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<typeof roleOptions[number]['value']>('buyer')
  const navigate = useNavigate()
  const { login } = useAuth()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const selectedRole = roleOptions.find((option) => option.value === role)
    login({ name: `${selectedRole?.label || 'User'} Account`, role })
    navigate(`/${role}/dashboard`, { replace: true })
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_28%),linear-gradient(180deg,_#021112_0%,_#081821_100%)] px-4 py-24 text-white">
      <div className="mx-auto w-full max-w-lg sm:max-w-xl rounded-[2.5rem] border border-slate-800/80 bg-slate-950/95 p-6 sm:p-8 text-white shadow-[0_35px_90px_rgba(10,20,30,0.45)]">
        <div className="rounded-[2.5rem] bg-slate-900/90 p-10 text-white shadow-sm shadow-slate-950/20">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              ← Back
            </button>
            <div className="text-center sm:text-right">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">AgriLink Login</p>
              <h1 className="mt-3 text-3xl font-semibold text-white">Welcome back</h1>
            </div>
          </div>
          <p className="text-center text-sm text-slate-400">Log in to manage your farm, view marketplace updates, and chat with your AI advisor.</p>
          <div className="mt-6 flex flex-col gap-3 rounded-[1.5rem] border border-slate-800/80 bg-slate-950/90 p-4 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-semibold text-slate-200">Login as:</span>
            <div className="flex gap-3">
              {roleOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setRole(option.value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    role === option.value
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <form className="mt-6 space-y-6 rounded-[1.5rem] border border-slate-800/80 bg-slate-950/90 p-8" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-slate-200">
            Phone or Email
            <input
              type="text"
              value={identity}
              onChange={(event) => setIdentity(event.target.value)}
              className="mt-3 input-field"
              placeholder="0917 123 4567 or name@example.com"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-200">
            Password
            <div className="relative mt-3">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 pr-24 text-white outline-none transition focus:border-emerald-400"
                placeholder="Enter your password"
              />
              <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:bg-slate-700">
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>
          <div className="flex items-center justify-between text-sm text-slate-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-emerald-500" />
              Remember me
            </label>
            <a href="#" className="font-semibold text-emerald-400 hover:text-emerald-200">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Log In
          </button>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <span>or continue with</span>
          </div>
          <div className="grid gap-3">
            <button type="button" className="btn btn-secondary w-full">Continue with Google</button>
            <button type="button" className="btn btn-secondary w-full">Continue with Facebook</button>
          </div>
          <p className="text-center text-sm text-slate-400">
            Don't have an account? <Link to="/register" className="font-semibold text-emerald-400 hover:text-emerald-200">Sign up</Link>
          </p>
        </form>
      </div>
    </main>
  )
}
