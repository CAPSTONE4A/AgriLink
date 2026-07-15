import { Link } from 'react-router-dom'
import { SectionHeading } from '../../components/SectionHeading'
import { GuestNav } from '../../components/GuestNav'

export default function GuestDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <GuestNav />
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Guest Portal</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950">Welcome to AgriLink</h1>
              <p className="mt-4 max-w-2xl text-slate-600">You are browsing as a guest. You can explore public content, but some features require registration.</p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="What you can do as a guest" subtitle="Limited read-only access to public content." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Browse Marketplace', description: 'View public harvest listings and prices.', to: '/marketplace' },
              { title: 'Weather Info', description: 'Check general weather updates and alerts.', to: '/farmer/weather' },
              { title: 'Community Feed', description: 'Read public posts and announcements.', to: '#' },
            ].map((card) => (
              <Link key={card.title} to={card.to} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <p className="text-lg font-semibold text-slate-950">{card.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Register to unlock more" subtitle="Create an account to access all features." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Place orders', description: 'Buy produce directly from farmers.' },
              { title: 'Message users', description: 'Chat with farmers, buyers, and advisors.' },
              { title: 'Apply for loans', description: 'Submit loan applications to lenders.' },
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
