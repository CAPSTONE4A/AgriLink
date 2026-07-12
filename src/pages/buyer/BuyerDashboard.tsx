import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { MarketplaceListItem } from '../../components/MarketplaceListItem'
import { SectionHeading } from '../../components/SectionHeading'
import { BuyerNav } from '../../components/BuyerNav'
import { Skeleton, SkeletonText } from '../../components/Skeleton'
import { useAuth } from '../../context/AuthContext'
import { getListings, getOrders } from '../../services/api'

export default function BuyerDashboard() {
  const { user, loading } = useAuth()
  const { data: listings = [], isLoading: listingsLoading, error: listingsError, refetch: refetchListings } = useQuery({
    queryKey: ['listings'],
    queryFn: getListings,
  })
  const { data: orders = [], isLoading: ordersLoading, error: ordersError, refetch: refetchOrders } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => getOrders(user!.id),
    enabled: !!user?.id,
  })

  const pendingCount = orders.filter((o) => o.status === 'pending').length
  const totalSpent = orders.reduce((sum, o) => sum + Number(o.total_amount), 0)

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <BuyerNav loading={loading} />
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Buyer Dashboard</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950">Manage purchases, supplier offers, and farm supplies.</h1>
              <p className="mt-4 max-w-2xl text-slate-600">Keep your buying decisions profitable with real-time offers, order tracking, and cooperative sourcing tools.</p>
            </div>
            <Link to="/marketplace" className="inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
              Explore Marketplace
            </Link>
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

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Recent orders</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Track supply deliveries and payment status.</h2>
            </div>
            <Link to="/buyer/orders" className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-900">View all orders →</Link>
          </div>
          <div className="mt-8 space-y-3">
            {ordersError ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
                <p className="text-sm text-rose-600">Failed to load orders.</p>
                <button
                  type="button"
                  onClick={() => refetchOrders()}
                  className="mt-3 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                >
                  Retry
                </button>
              </div>
            ) : ordersLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3">
                  <Skeleton className="h-16 w-16 rounded-xl" />
                  <div className="flex-1">
                    <SkeletonText lines={2} />
                  </div>
                </div>
              ))
            ) : orders.length === 0 ? (
              <p className="text-sm text-slate-500">No orders yet.</p>
            ) : (
              orders.slice(0, 5).map((order) => (
                <Link
                  key={order.id}
                  to={`/buyer/orders`}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 transition hover:shadow-md"
                >
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-slate-900">Order #{order.id.slice(0, 8)}</p>
                      <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">{order.quantity} units · {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-semibold text-slate-900">₱{Number(order.total_amount).toLocaleString()}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Recommended from the marketplace</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Fresh supplies and produce curated for buyer demand.</h2>
            </div>
            <Link to="/marketplace" className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-900">View all listings →</Link>
          </div>
          <div className="mt-8 space-y-3">
            {listingsError ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
                <p className="text-sm text-rose-600">Failed to load listings.</p>
                <button
                  type="button"
                  onClick={() => refetchListings()}
                  className="mt-3 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                >
                  Retry
                </button>
              </div>
            ) : listingsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3">
                  <Skeleton className="h-16 w-16 rounded-xl" />
                  <div className="flex-1">
                    <SkeletonText lines={2} />
                  </div>
                </div>
              ))
            ) : listings.length === 0 ? (
              <p className="text-sm text-slate-500">No listings available.</p>
            ) : (
              listings.slice(0, 5).map((listing) => (
                <Link key={listing.id} to="/marketplace" className="block">
                  <MarketplaceListItem
                    title={listing.title}
                    location={listing.location}
                    price={`₱${listing.price_per_unit.toFixed(2)}`}
                    quantity={`${listing.quantity_available} ${listing.unit}s`}
                    badge={listing.badge ?? 'New'}
                    image={listing.images ? String(listing.images) : 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80'}
                  />
                </Link>
              ))
            )}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading title="Buyer tools" subtitle="Everything you need to stay ahead of market pricing and supply availability." />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Bulk ordering', description: 'Place large orders directly from farmers with negotiated pricing.' },
              { title: 'Supplier management', description: 'Save preferred suppliers and track delivery performance.' },
              { title: 'Price tracking', description: 'Monitor market prices and get alerts when crops drop.' },
            ].map((tool) => (
              <div key={tool.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <p className="text-lg font-semibold text-slate-950">{tool.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{tool.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
