import { useQuery } from '@tanstack/react-query'
import { FarmerNav } from '../../components/FarmerNav'
import { useAuth } from '../../context/AuthContext'
import { getFarmerProfile, getListingsByFarmer, getOrdersByFarmer } from '../../services/api'

export default function FarmStatsPage() {
  const { user, loading } = useAuth()
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['farmer-profile', user?.id],
    queryFn: () => getFarmerProfile(user!.id),
    enabled: !!user?.id,
  })
  const { data: listings = [], isLoading: listingsLoading } = useQuery({
    queryKey: ['farmer-listings', user?.id],
    queryFn: () => getListingsByFarmer(user!.id),
    enabled: !!user?.id,
  })
  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['farmer-orders', user?.id],
    queryFn: () => getOrdersByFarmer(user!.id),
    enabled: !!user?.id,
  })

  const farmSize = profile?.farm_size_hectares ?? null

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <FarmerNav loading={loading} />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Farm stats</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">Your farm performance at a glance.</h1>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Active Listings', value: listingsLoading ? '...' : String(listings.length) },
              { label: 'Total Orders', value: ordersLoading ? '...' : String(orders.length) },
              { label: 'Pending Orders', value: ordersLoading ? '...' : String(orders.filter((o) => o.status === 'pending').length) },
              { label: 'Farm Size', value: profileLoading ? '...' : farmSize ? `${farmSize} ha` : '—' },
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
