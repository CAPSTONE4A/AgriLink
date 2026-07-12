import { useNavigate } from 'react-router-dom'
import { MarketplaceCard } from '../components/MarketplaceCard'
import { SectionHeading } from '../components/SectionHeading'
import { marketplaceListings } from '../data/demoData'

export default function MarketplacePage() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <section className="card-panel">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Marketplace</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950">Fresh farm produce and supplier offers.</h1>
              <p className="mt-4 max-w-2xl text-slate-600">Browse nearby listings from trusted cooperatives and farmers, with clear pricing and local delivery options.</p>
              <p className="mt-3 text-sm text-slate-500">Guests can explore public listings without logging in. Register to message sellers, place orders, or apply for loans.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
                ← Back
              </button>
              <button className="btn btn-primary">
                Post a listing
              </button>
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
    </main>
  )
}
