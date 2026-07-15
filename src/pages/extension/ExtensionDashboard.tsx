import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ExtensionNav } from '../../components/ExtensionNav'
import { SectionHeading } from '../../components/SectionHeading'
import { useAuth } from '../../context/AuthContext'
import { getExtensionProfile, getQuestions, getKnowledgeArticles } from '../../services/api'

export default function ExtensionDashboard() {
  const { user } = useAuth()
  const { data: profile } = useQuery({
    queryKey: ['extension-profile', user?.id],
    queryFn: () => getExtensionProfile(user!.id),
    enabled: !!user?.id,
  })
  const { data: questions = [] } = useQuery({
    queryKey: ['extension-questions'],
    queryFn: getQuestions,
  })
  const { data: articles = [] } = useQuery({
    queryKey: ['extension-articles'],
    queryFn: getKnowledgeArticles,
  })

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <ExtensionNav />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <ExtensionNav />
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Extension Worker</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950">Advisory workspace for your assigned region.</h1>
              <p className="mt-4 max-w-2xl text-slate-600">
                {profile
                  ? `${profile.agency_name} · ${profile.region}, ${profile.municipality}, ${profile.province}${profile.specialization ? ` · ${profile.specialization}` : ''}`
                  : 'Access farmer advisory data, publish articles, and respond to expert Q&A without seeing private finance or transaction records.'}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Regional stats" subtitle="Your advisory workspace at a glance." />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Open Questions', value: String(questions.filter((q) => q.status === 'open').length) },
              { label: 'My Articles', value: String(articles.length) },
              { label: 'Published', value: String(articles.filter((a) => a.published).length) },
              { label: 'Experience', value: profile?.years_experience ? `${profile.years_experience} years` : '—' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{stat.label}</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Open questions" subtitle="Farmer questions awaiting your response." />
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
            <div className="grid grid-cols-4 gap-0 bg-slate-100 px-6 py-4 text-xs uppercase tracking-[0.24em] text-slate-500">
              <span>Title</span>
              <span>Category</span>
              <span>Region</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-slate-200 bg-white">
              {questions.slice(0, 10).map((q) => (
                <div key={q.id} className="grid grid-cols-4 gap-0 px-6 py-4 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">{q.title}</span>
                  <span className="capitalize">{q.category}</span>
                  <span>{q.region ?? '—'}</span>
                  <span className={`capitalize ${q.status === 'open' ? 'text-amber-600' : q.status === 'answered' ? 'text-emerald-600' : 'text-slate-500'}`}>{q.status}</span>
                </div>
              ))}
              {questions.length === 0 && (
                <div className="px-6 py-4 text-sm text-slate-500">No questions yet.</div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading title="Regional knowledge tools" subtitle="Publish guidance and keep farmers connected." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Knowledge base', description: 'Create and share advisory content for your region.', to: '#' },
              { title: 'Expert Q&A', description: 'Answer farmer questions with trusted recommendations.', to: '#' },
              { title: 'Regional insights', description: 'See weather alerts, pest advisories, and crop recommendations.', to: '#' },
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
