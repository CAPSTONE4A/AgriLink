import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { useAuthStore } from '@/stores/auth.store';

const navItems = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Profile', href: '/profile' },
  { label: 'Settings', href: '/settings' },
];

const BuyerDashboardLayout = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-200 bg-white lg:w-72 lg:border-r lg:border-b-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:px-5">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-green-700">AgriLink</p>
              <h1 className="mt-2 text-2xl font-bold text-slate-900">Buyer Hub</h1>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Welcome back</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{user?.name ?? 'AgriLink Buyer'}</p>
              <p className="text-sm text-slate-500">{user?.barangay ?? 'Your barangay'}</p>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive ? 'bg-green-700 text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <Button variant="outline" className="w-full" onClick={logout}>
              Log Out
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboardLayout;

