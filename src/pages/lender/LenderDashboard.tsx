import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { LenderNav } from '../../components/LenderNav'
import { SectionHeading } from '../../components/SectionHeading'
import { useAuth } from '../../context/AuthContext'
import { getLenderProfile, getLoanApplications } from '../../services/api'

export default function LenderDashboard() {
  const { user } = useAuth()
  const { data: profile } = useQuery({
    queryKey: ['lender-profile', user?.id],
    queryFn: () => getLenderProfile(user!.id),
    enabled: !!user?.id,
  })
  const { data: loans = [] } = useQuery({
    queryKey: ['lender-loans'],
    queryFn: getLoanApplications,
  })

  const pending = loans.filter((l) => l.status === 'pending')
  const approved = loans.filter((l) => l.status === 'approved')
  const totalAmount = loans.reduce((sum, l) => sum + Number(l.amount), 0)

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LenderNav />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <LenderNav />
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Lender Dashboard</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950">Manage loan applications and your partner portfolio.</h1>
              <p className="mt-4 max-w-2xl text-slate-600">
                {profile
                  ? `${profile.institution_name} · ${profile.institution_type} · ${profile.region}`
                   : 'Review, approve, or decline applications without access to farmers\' private crop or transaction details.'}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Portfolio overview" subtitle="Your financial workflows in one secure view." />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Pending', value: String(pending.length) },
              { label: 'Approved', value: String(approved.length) },
              { label: 'Total Applications', value: String(loans.length) },
              { label: 'Total Amount', value: `₱${totalAmount.toLocaleString()}` },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{stat.label}</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Loan applications" subtitle="Review, approve, or decline applications." />
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
            <div className="grid grid-cols-6 gap-0 bg-slate-100 px-6 py-4 text-xs uppercase tracking-[0.24em] text-slate-500">
              <span>Farmer</span>
              <span>Amount</span>
              <span>Purpose</span>
              <span>Term</span>
              <span>Rate</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-slate-200 bg-white">
              {loans.slice(0, 10).map((loan) => (
                <div key={loan.id} className="grid grid-cols-6 gap-0 px-6 py-4 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">{loan.farmer_id.slice(0, 8)}</span>
                  <span>₱{Number(loan.amount).toLocaleString()}</span>
                  <span>{loan.purpose}</span>
                  <span>{loan.term_months} months</span>
                  <span>{loan.interest_rate ? `${loan.interest_rate}%` : '—'}</span>
                  <span className={`capitalize ${loan.status === 'pending' ? 'text-amber-600' : loan.status === 'approved' ? 'text-emerald-600' : 'text-rose-600'}`}>{loan.status}</span>
                </div>
              ))}
              {loans.length === 0 && (
                <div className="px-6 py-4 text-sm text-slate-500">No loan applications yet.</div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading title="Loan portfolio" subtitle="Your financial workflows in one secure view." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Applications', description: 'See pending loan requests and review supporting KYC documentation.', to: '#' },
              { title: 'Approval workflow', description: 'Approve or decline applications and track institution decisions.', to: '#' },
              { title: 'Portfolio health', description: 'Monitor active loans and repayment performance.', to: '#' },
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
