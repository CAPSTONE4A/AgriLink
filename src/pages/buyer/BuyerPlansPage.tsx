import { SectionHeading } from '../../components/SectionHeading'
import { BuyerNav } from '../../components/BuyerNav'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'For small buyers exploring the marketplace.',
    cta: 'Current Plan',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '₱499 / month',
    description: 'For regular buyers who want better sourcing and analytics.',
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact us',
    description: 'For cooperatives, large farms, and wholesale buyers. Premium support included.',
    cta: 'Contact Sales',
    highlight: false,
  },
]

export default function BuyerPlansPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <BuyerNav />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Plans</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">Choose the right plan for your procurement.</h1>
          <p className="mt-4 max-w-2xl text-slate-600">From casual buyers to wholesale operations, find the plan that fits your sourcing needs.</p>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Available plans" subtitle="All plans include core marketplace access." />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/60 ${
                  plan.highlight ? 'ring-1 ring-emerald-200' : ''
                }`}
              >
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">{plan.name}</p>
                <p className="mt-5 text-4xl font-semibold text-slate-950">{plan.price}</p>
                <p className="mt-4 text-sm leading-7 text-slate-500">{plan.description}</p>
                <button
                  type="button"
                  onClick={() => alert(`${plan.name} plan selected. This will connect to your subscription provider.`)}
                  className={`mt-8 w-full rounded-full px-6 py-3 text-sm font-semibold transition ${
                    plan.highlight
                      ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                      : 'border border-slate-200 text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
