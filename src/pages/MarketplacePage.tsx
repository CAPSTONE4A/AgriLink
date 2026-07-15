import { useEffect } from 'react'
import { MarketplaceCard } from '../components/MarketplaceCard'
import { SectionHeading } from '../components/SectionHeading'
import { marketplaceListings } from '../data/demoData'
import { useNotify } from '../context/NotificationContext'
import { FarmerNav } from '../components/FarmerNav'
import { Plus } from 'lucide-react'

export default function MarketplacePage() {
  const { notify } = useNotify()

  useEffect(() => {
    document.title = 'Marketplace | AgriLink'
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <FarmerNav />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="card-panel">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Marketplace</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">Fresh farm produce and supplier offers.</h1>
              <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">Browse nearby listings from trusted cooperatives and farmers, with clear pricing and local delivery options.</p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Guests can explore public listings without logging in. Register to message sellers, place orders, or apply for loans.</p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading title="Available listings" subtitle="Buy fresh produce from nearby suppliers with confidence." />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {marketplaceListings.map((listing) => (
              <MarketplaceCard key={listing.id} {...listing} />
            ))}
          </div>
        </section>
      </div>

      <button
        type="button"
        onClick={() => notify('Post a listing is under development.', 'info')}
        className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-700/30 transition hover:bg-emerald-800 active:scale-95"
        title="Post a listing"
      >
        <Plus className="h-6 w-6" />
      </button>
    </main>
  )
}
