import { NavLink } from 'react-router-dom'
import { Skeleton } from './Skeleton'
import { ChevronDown, LogOut, Crown } from 'lucide-react'
import { useState } from 'react'
import { DarkModeToggle } from './DarkModeToggle'
import { useAuth } from '../context/AuthContext'

const directItems = [
  { path: '/marketplace', label: 'Marketplace' },
]

const dropdownItems = [
  { path: '/cooperative/dashboard', label: 'Dashboard', icon: Crown },
]

export function CooperativeNav({ loading = false }: { loading?: boolean }) {
  const { logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-700">Cooperative Portal</p>
          <h1 className="mt-2 text-xl font-semibold text-slate-950">Cooperative workspace</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {loading ? (
            <>
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
            </>
          ) : (
            <>
              <NavLink
                to="/cooperative/dashboard"
                className={({ isActive }) =>
                  `btn btn-secondary text-sm ${isActive ? 'bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`
                }
              >
                Home
              </NavLink>
              {directItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `btn btn-secondary text-sm ${isActive ? 'bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
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
                    {dropdownItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700"
                      >
                        <item.icon className="h-4 w-4 text-slate-400" />
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false)
                        logout()
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-600 transition hover:bg-rose-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
