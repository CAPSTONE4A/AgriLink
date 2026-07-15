import { useQuery } from '@tanstack/react-query'
import { User } from 'lucide-react'
import { BuyerNav } from '../../components/BuyerNav'
import { useAuth } from '../../context/AuthContext'
import { getListings, getOrders } from '../../services/api'

export default function BuyerDashboard() {
  const { user, loading } = useAuth()
  const { data: listings = [] } = useQuery({
    queryKey: ['listings'],
    queryFn: getListings,
  })
  const { data: orders = [] } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => getOrders(user!.id),
    enabled: !!user?.id,
  })

  const pendingCount = orders.filter((o) => o.status === 'pending').length
  const totalSpent = orders.reduce((sum, o) => sum + Number(o.total_amount), 0)

  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <BuyerNav loading={loading} />
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <User className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Buyer Dashboard</p>
                <h1 className="mt-4 text-4xl font-semibold text-slate-950">Manage purchases and supplier offers.</h1>
                <p className="mt-4 max-w-2xl text-slate-600">Keep your buying decisions profitable with real-time offers, order tracking, and cooperative sourcing tools.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Pending Orders', value: String(pendingCount) },
              { label: 'Saved Listings', value: String(listings.length) },
              { label: 'Budget Saved', value: `₱${(totalSpent / 1000).toFixed(1)}K` },
              { label: 'Marketplace Items', value: String(listings.length) },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{stat.label}</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
