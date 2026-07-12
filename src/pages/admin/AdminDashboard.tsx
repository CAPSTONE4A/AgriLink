import { SectionHeading } from '../../components/SectionHeading'

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">System Admin</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950">Governance, moderation, and compliance overview.</h1>
            <p className="mt-4 max-w-2xl text-slate-600">Review KYC verifications, moderate community content, and audit compliance logs in a secure, view-only capacity for sensitive records.</p>
          </div>
        </section>
        <section className="mt-10 rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Admin controls" subtitle="Review platform health and user compliance without editing private records." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: 'KYC approvals', description: 'Approve or reject identity verification and business profile checks.' },
              { title: 'Moderation', description: 'Review community posts, marketplace disputes, and policy reports.' },
              { title: 'Compliance logs', description: 'Audit access and activity trails for transparency and safety.' },
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
