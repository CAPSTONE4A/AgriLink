import { SectionHeading } from '../../components/SectionHeading'

export default function ExtensionDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Extension Worker</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950">Advisory workspace for your assigned region.</h1>
            <p className="mt-4 max-w-2xl text-slate-600">Access farmer advisory data, publish articles, and respond to expert Q&A without seeing private finance or transaction records.</p>
          </div>
        </section>
        <section className="mt-10 rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Regional knowledge tools" subtitle="Publish guidance and keep farmers connected." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Knowledge base', description: 'Create and share advisory content for your region.' },
              { title: 'Expert Q&A', description: 'Answer farmer questions with trusted recommendations.' },
              { title: 'Regional insights', description: 'See weather alerts, pest advisories, and crop recommendations.' },
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
