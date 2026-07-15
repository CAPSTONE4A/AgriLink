import { SectionHeading } from '../../components/SectionHeading'
import { BuyerNav } from '../../components/BuyerNav'

export default function BuyerAdvisorPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <BuyerNav />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Ari - AI Advisor</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">Procurement insights and supplier guidance.</h1>
          <p className="mt-4 max-w-2xl text-slate-600">Ask the AI advisor for crop recommendations, supplier matching, and market pricing insights based on your procurement needs.</p>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Ask your advisor" subtitle="Type a procurement question to get guidance." />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-200">
              Question
              <input
                type="text"
                placeholder="e.g., What crops are in season this month?"
                className="mt-3 input-field"
              />
            </label>
            <label className="block text-sm text-slate-200">
              Crop / Product
              <input
                type="text"
                placeholder="e.g., Rice, Corn, Tomato"
                className="mt-3 input-field"
              />
            </label>
          </div>
          <button className="btn btn-primary mt-6">Ask Advisor</button>
        </section>
      </div>
    </main>
  )
}
