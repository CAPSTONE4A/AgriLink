import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { FarmerNav } from '../../components/FarmerNav'
import { Skeleton, SkeletonText } from '../../components/Skeleton'
import { useAuth } from '../../context/AuthContext'
import { getListingsByFarmer } from '../../services/api'
import { Wheat, Apple, Leaf, Carrot, Fish, Banana, Cherry, Drumstick } from 'lucide-react'

function getListingIcon(title: string, category: string): React.ElementType {
  const lower = `${title} ${category}`.toLowerCase()
  if (lower.includes('rice') || lower.includes('palay') || lower.includes('corn')) return Wheat
  if (lower.includes('tomato')) return Apple
  if (lower.includes('pechay') || lower.includes('vegetable') || lower.includes('leaf')) return Leaf
  if (lower.includes('carrot')) return Carrot
  if (lower.includes('fish') || lower.includes('seafood')) return Fish
  if (lower.includes('banana')) return Banana
  if (lower.includes('cherry')) return Cherry
  if (lower.includes('chicken') || lower.includes('poultry') || lower.includes('meat')) return Drumstick
  return Leaf
}

export default function FarmerListingsPage() {
  const { user, loading } = useAuth()
  const { data: listings = [], isLoading: listingsLoading, error: listingsError, refetch: refetchListings } = useQuery({
    queryKey: ['farmer-listings', user?.id],
    queryFn: () => getListingsByFarmer(user!.id),
    enabled: !!user?.id,
  })

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <FarmerNav loading={loading} />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">My listings</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">Manage your harvest listings on the marketplace.</h1>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
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
              listings.map((listing) => {
                const Icon = getListingIcon(listing.title, listing.category)
                return (
                  <Link key={listing.id} to="/marketplace" className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 transition hover:shadow-md">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon className="h-8 w-8" strokeWidth={1.5} />
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
                )
              })
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
