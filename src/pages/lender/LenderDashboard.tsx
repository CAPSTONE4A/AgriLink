import { SectionHeading } from '../../components/SectionHeading'

export default function LenderDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Lender Dashboard</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950">Manage loan applications and your partner portfolio.</h1>
            <p className="mt-4 max-w-2xl text-slate-600">Review, approve, or decline applications without access to farmers’ private crop or transaction details.</p>
          </div>
        </section>
        <section className="mt-10 rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Loan portfolio" subtitle="Your financial workflows in one secure view." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Applications', description: 'See pending loan requests and review supporting KYC documentation.' },
              { title: 'Approval workflow', description: 'Approve or decline applications and track institution decisions.' },
              { title: 'Portfolio health', description: 'Monitor active loans and repayment performance.' },
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
