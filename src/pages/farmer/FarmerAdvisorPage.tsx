import { useNotify } from '../../context/NotificationContext'
import { SectionHeading } from '../../components/SectionHeading'
import { FarmerNav } from '../../components/FarmerNav'

export default function FarmerAdvisorPage() {
  const { notify } = useNotify()

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <FarmerNav />
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">AI Farm Advisor</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">Personalized crop guidance and pest diagnosis.</h1>
          <p className="mt-4 max-w-2xl text-slate-600">Ask the AI advisor for crop recommendations, pest control, and yield forecasts based on your farm data.</p>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Ask your advisor" subtitle="Type a farming question to get guidance." />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-200">
              Question
              <input
                type="text"
                placeholder="e.g., How do I control brown planthopper in rice?"
                className="mt-3 input-field"
              />
            </label>
            <label className="block text-sm text-slate-200">
              Crop
              <input
                type="text"
                placeholder="e.g., Rice, Corn, Tomato"
                className="mt-3 input-field"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={() => notify('AI Advisor is under development.', 'info')}
            className="btn btn-primary mt-6"
          >
            Ask Advisor
          </button>
        </section>
      </div>
    </main>
  )
}
