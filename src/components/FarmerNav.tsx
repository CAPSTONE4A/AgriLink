import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Skeleton } from './Skeleton'

const navItems = [
  { path: '/farmer/dashboard', label: 'Dashboard' },
  { path: '/farmer/profile', label: 'Profile' },
  { path: '/marketplace', label: 'Marketplace' },
  { path: '/farmer/weather', label: 'Weather' },
  { path: '/farmer/advisor', label: 'AI Advisor' },
  { path: '/messaging', label: 'Messages' },
]

export function FarmerNav({ loading = false }: { loading?: boolean }) {
  const { logout } = useAuth()

  return (
    <header className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-700">Farmer Portal</p>
          <h1 className="mt-2 text-xl font-semibold text-slate-950">Farmer workspace</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {loading ? (
            <>
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-28 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
            </>
          ) : (
            <>
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
              <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-amber-800">
                Starter Plan
              </span>
              <button
                type="button"
                onClick={logout}
                className="btn btn-secondary bg-slate-950 text-white hover:bg-slate-800"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
