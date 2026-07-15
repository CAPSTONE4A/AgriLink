import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { DarkModeToggle } from './DarkModeToggle'

export function GuestNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-700">Guest Portal</p>
          <h1 className="mt-2 text-xl font-semibold text-slate-950">Guest workspace</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/login" className="btn btn-secondary text-sm">Log in</Link>
          <Link to="/register" className="btn btn-primary text-sm">Create account</Link>
          <DarkModeToggle />
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn btn-secondary text-sm inline-flex items-center gap-1 text-slate-600 hover:bg-slate-100"
            >
              Menu
              <ChevronDown className={`h-4 w-4 transition ${menuOpen ? 'rotate-180' : ''}`} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
                <Link to="/login" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700">
                  <span>Log in</span>
                </Link>
                <Link to="/register" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700">
                  <span>Create account</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
