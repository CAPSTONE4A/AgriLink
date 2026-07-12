import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { path: '/buyer/dashboard', label: 'Dashboard' },
  { path: '/buyer/orders', label: 'Orders' },
  { path: '/marketplace', label: 'Marketplace' },
]

export function BuyerNav() {
  const { logout } = useAuth()

  return (
    <header className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-700">Buyer Portal</p>
          <h1 className="mt-2 text-xl font-semibold text-slate-950">Buyer workspace</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {navItems.map((item) => (
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
          <button
            type="button"
            onClick={logout}
            className="btn btn-secondary bg-slate-950 text-white hover:bg-slate-800"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}
