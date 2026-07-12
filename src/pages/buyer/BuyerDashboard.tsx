import { Link } from 'react-router-dom'
import { MarketplaceCard } from '../../components/MarketplaceCard'
import { SectionHeading } from '../../components/SectionHeading'
import { BuyerNav } from '../../components/BuyerNav'
import { featureCards, marketplaceListings, buyerDashboardStats, buyerOrders } from '../../data/demoData'

export default function BuyerDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <BuyerNav />
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

        <section className="mt-10 rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          {buyerDashboardStats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{stat.label}</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">{stat.value}</p>
              <p className={`mt-3 text-sm ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.change > 0 ? `+${stat.change}%` : `${stat.change}%`} vs last month
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-emerald-700">Recent orders</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">Track supply deliveries and payment status.</h2>
            </div>
            <Link to="/buyer/orders" className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-900">View all orders →</Link>
          </div>
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
            <div className="grid grid-cols-4 gap-0 bg-slate-100 px-6 py-4 text-xs uppercase tracking-[0.24em] text-slate-500 sm:grid-cols-5">
              <span>Order</span>
              <span>Product</span>
              <span>Status</span>
              <span>Amount</span>
              <span className="hidden sm:inline">Expected</span>
            </div>
            <div className="divide-y divide-slate-200 bg-white">
              {buyerOrders.map((order) => (
                <div key={order.id} className="grid grid-cols-4 gap-0 px-6 py-4 text-sm text-slate-700 sm:grid-cols-5">
                  <span className="font-semibold text-slate-900">{order.id}</span>
                  <span>{order.product}</span>
                  <span className={`font-semibold ${order.status === 'Delivered' ? 'text-emerald-600' : order.status === 'Pending' ? 'text-amber-600' : 'text-slate-500'}`}>{order.status}</span>
                  <span>{order.amount}</span>
                  <span className="hidden sm:inline text-slate-500">{order.expected}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading title="Recommended from the marketplace" subtitle="Fresh supplies and produce curated for buyer demand." />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {marketplaceListings.map((listing) => (
              <MarketplaceCard key={listing.id} {...listing} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading title="Buyer tools" subtitle="Everything you need to stay ahead of market pricing and supply availability." />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.slice(0, 3).map((feature) => (
              <div key={feature.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <p className="text-lg font-semibold text-slate-950">{feature.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
