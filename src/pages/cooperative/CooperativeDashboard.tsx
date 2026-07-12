import { Link } from 'react-router-dom'
import { SectionHeading } from '../../components/SectionHeading'

export default function CooperativeDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Cooperative Dashboard</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950">Manage shared orders, land assets, and cooperative finance.</h1>
              <p className="mt-4 max-w-2xl text-slate-600">Coordinate group purchasing, monitor shared land ownership, and manage cooperative loan applications in one place.</p>
            </div>
            <Link to="/marketplace" className="inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
              Visit Marketplace
            </Link>
          </div>
        </section>
        <section className="mt-10 rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Cooperative tools" subtitle="Your shared workflows and group finance dashboard." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Shared orders', description: 'Create and approve group orders with your cooperative members.' },
              { title: 'Land ownership', description: 'View cooperative-shared land status and stewardship assignments.' },
              { title: 'Loan applications', description: 'Track shared finance applications and institutional approvals.' },
            ].map((card) => (
              <div key={card.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-lg font-semibold text-slate-950">{card.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
