import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Skeleton } from './Skeleton'
import { Home, Store, MessageCircle, User, ShoppingCart, Crown, LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import { DarkModeToggle } from './DarkModeToggle'

const directItems = [
  { path: '/marketplace', label: 'Marketplace', icon: Store },
  { path: '/messaging', label: 'Messages', icon: MessageCircle },
]

const dropdownItems = [
  { path: '/buyer/profile', label: 'Profile', icon: User },
  { path: '/buyer/plans', label: 'Upgrade', icon: Crown },
  { path: '/buyer/orders', label: 'Orders', icon: ShoppingCart },
]

export function BuyerNav({ loading = false }: { loading?: boolean }) {
  const { logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-md border-b border-slate-200">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-white">
            <Store className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-700">AgriLink</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {loading ? (
            <>
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </>
          ) : (
            <>
              <NavLink
                to="/buyer/dashboard"
                className={({ isActive }) =>
                  `btn btn-secondary flex items-center gap-2 px-3 py-2 text-sm ${isActive ? 'bg-emerald-700 text-white border-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`
                }
              >
                <Home className="h-4 w-4" />
                <span className="hidden md:inline">Home</span>
              </NavLink>
              {directItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `btn btn-secondary flex items-center gap-2 px-3 py-2 text-sm ${isActive ? 'bg-emerald-700 text-white border-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </NavLink>
              ))}
              <DarkModeToggle />
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="btn btn-secondary flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
                >
                  <Menu className="h-4 w-4" />
                  <span className="hidden md:inline">Menu</span>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700 active:scale-95"
                      >
                        <item.icon className="h-4 w-4 text-slate-400" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false)
                        logout()
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-600 transition hover:bg-rose-50 active:scale-95"
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
