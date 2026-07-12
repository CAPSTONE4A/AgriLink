import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../../components/SectionHeading'
import { FarmerNav } from '../../components/FarmerNav'
import { Skeleton, SkeletonText } from '../../components/Skeleton'
import { useAuth } from '../../context/AuthContext'
import { useNotify } from '../../context/NotificationContext'
import { getFarmerProfile, getListingsByFarmer, getOrdersByFarmer } from '../../services/api'

export default function FarmerDashboard() {
  const { user, loading } = useAuth()
  const { notify } = useNotify()
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['farmer-profile', user?.id],
    queryFn: () => getFarmerProfile(user!.id),
    enabled: !!user?.id,
  })
  const { data: listings = [], isLoading: listingsLoading, error: listingsError, refetch: refetchListings } = useQuery({
    queryKey: ['farmer-listings', user?.id],
    queryFn: () => getListingsByFarmer(user!.id),
    enabled: !!user?.id,
  })
  const { data: orders = [], isLoading: ordersLoading, error: ordersError, refetch: refetchOrders } = useQuery({
    queryKey: ['farmer-orders', user?.id],
    queryFn: () => getOrdersByFarmer(user!.id),
    enabled: !!user?.id,
  })

  const displayName = profile?.farm_name || user?.name || 'Farmer'
  const farmType = profile?.farm_type || 'General'
  const farmSize = profile?.farm_size_hectares ?? null
  const yearsExperience = profile?.years_farming ?? null
  const crops = profile?.crops_grown ?? null

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <FarmerNav loading={loading} />
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Farmer Dashboard</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950">
                {profileLoading ? 'Loading...' : `${displayName} Overview`}
              </h1>
              <p className="mt-4 max-w-2xl text-slate-600">
                {profileLoading
                  ? 'Loading your farm profile...'
                  : profile
                  ? `${farmType} farm${farmSize ? ` · ${farmSize} hectares` : ''}${yearsExperience ? ` · ${yearsExperience} years experience` : ''}`
                  : 'No farm profile yet. Complete your profile to see farm details here.'}
              </p>
              {crops && Array.isArray(crops) && crops.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {(crops as string[]).map((crop) => (
                    <span key={crop} className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
                      {crop}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <Link to="/marketplace" className="inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
              View Marketplace
            </Link>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Farm stats" subtitle="Your farm performance at a glance." />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="My listings" subtitle="Manage your harvest listings on the marketplace." />
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
              <p className="text-sm text-slate-500">No listings yet. Go to the marketplace to publish your first harvest.</p>
            ) : (
              listings.map((listing) => (
                <Link key={listing.id} to="/marketplace" className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 transition hover:shadow-md">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-200">
                    <img
                      src={listing.images ? String(listing.images) : 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80'}
                      alt={listing.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{listing.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{listing.category} · {listing.quantity_available} {listing.unit}s available</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-semibold text-slate-900">₱{Number(listing.price_per_unit).toFixed(2)}/{listing.unit}</p>
                    <p className="text-xs text-slate-500 capitalize">{listing.status}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Recent orders" subtitle="Track buyer requests and confirm pickup or delivery details." />
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
              <p className="text-sm text-slate-500">No orders yet. Publish harvest listings to start receiving orders.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3">
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
                        order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">{order.quantity} units · {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-semibold text-slate-900">₱{Number(order.total_amount).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading title="Quick actions" subtitle="Your farmer tools in one view." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Publish harvest', description: 'List available crops and update quantities and pricing.', to: '/marketplace', notify: false },
              { title: 'Manage orders', description: 'Track buyer requests and confirm pickup or delivery details.', to: '/buyer/orders', notify: false },
              { title: 'Farm reports', description: 'Review crop health, weather forecasts, and sales summaries.', to: '#', notify: true },
            ].map((card) => (
              <Link
                key={card.title}
                to={card.to}
                onClick={(e) => {
                  if (card.notify && card.to === '#') {
                    e.preventDefault()
                    notify('Farm reports are under development.', 'info')
                  }
                }}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-lg font-semibold text-slate-950">{card.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
