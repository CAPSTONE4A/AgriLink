import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../../components/SectionHeading'
import { useAuth } from '../../context/AuthContext'
import { getCooperativeProfile, getLoanApplications } from '../../services/api'

export default function CooperativeDashboard() {
  const { user } = useAuth()
  const { data: profile } = useQuery({
    queryKey: ['cooperative-profile', user?.id],
    queryFn: () => getCooperativeProfile(user!.id),
    enabled: !!user?.id,
  })
  const { data: loans = [] } = useQuery({
    queryKey: ['cooperative-loans', user?.id],
    queryFn: () => getLoanApplications(),
  })

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Cooperative Dashboard</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950">
                {profile?.cooperative_name ? `${profile.cooperative_name} Overview` : 'Manage shared orders, land assets, and cooperative finance.'}
              </h1>
              <p className="mt-4 max-w-2xl text-slate-600">
                {profile?.member_count
                  ? `${profile.member_count} members${profile.total_shared_land_hectares ? ` · ${profile.total_shared_land_hectares} shared hectares` : ''}`
                  : 'Coordinate group purchasing, monitor shared land ownership, and manage cooperative loan applications in one place.'}
              </p>
            </div>
            <Link to="/marketplace" className="inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
              Visit Marketplace
            </Link>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Cooperative stats" subtitle="Your shared workflows and group finance dashboard." />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Members', value: String(profile?.member_count ?? 0) },
              { label: 'Shared Land', value: profile?.total_shared_land_hectares ? `${profile.total_shared_land_hectares} ha` : '—' },
              { label: 'Loan Applications', value: String(loans.length) },
              { label: 'Registration', value: profile?.registration_number ?? '—' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{stat.label}</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading title="Cooperative tools" subtitle="Group purchasing, land assets, and finance." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Shared orders', description: 'Create and approve group orders with your cooperative members.', to: '/marketplace' },
              { title: 'Land ownership', description: 'View cooperative-shared land status and stewardship assignments.', to: '#' },
              { title: 'Loan applications', description: 'Track shared finance applications and institutional approvals.', to: '#' },
            ].map((card) => (
              <Link key={card.title} to={card.to} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
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
