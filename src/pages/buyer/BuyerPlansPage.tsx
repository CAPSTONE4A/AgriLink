import { SectionHeading } from '../../components/SectionHeading'
import { BuyerNav } from '../../components/BuyerNav'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'For small buyers exploring the marketplace.',
    cta: 'Current Plan',
    highlight: false,
    farmerFeatures: {
      'Marketplace browsing': true,
      'Basic weather alerts': true,
      'AI crop tips': true,
      'Community feed read-only': true,
      'Priority marketplace listings': false,
      'Advanced weather alerts': false,
      'Bulk order management': false,
      'Dedicated advisor access': false,
      'Order tracking': false,
      'Farm reports': false,
      'Team accounts': false,
      'Custom integrations': false,
      'Workflow automation': false,
      'API access': false,
    },
    buyerFeatures: {
      'Marketplace browsing': true,
      'Saved listings': true,
      'Price alerts': true,
      'Community feed read-only': true,
      'Order tracking': false,
      'Supplier quotes': false,
      'Priority matching': false,
      'Advanced analytics': false,
      'Bulk discounts': false,
      'Team accounts': false,
      'Custom integrations': false,
      'Workflow automation': false,
      'API access': false,
    },
  },
  {
    name: 'Professional',
    price: '₱499 / month',
    description: 'For regular buyers who want better sourcing and analytics.',
    cta: 'Upgrade to Pro',
    highlight: true,
    farmerFeatures: {
      'Marketplace browsing': true,
      'Basic weather alerts': true,
      'AI crop tips': true,
      'Community feed read-only': true,
      'Priority marketplace listings': true,
      'Advanced weather alerts': true,
      'Bulk order management': true,
      'Dedicated advisor access': true,
      'Order tracking': true,
      'Farm reports': true,
      'Team accounts': false,
      'Custom integrations': false,
      'Workflow automation': false,
      'API access': false,
    },
    buyerFeatures: {
      'Marketplace browsing': true,
      'Saved listings': true,
      'Price alerts': true,
      'Community feed read-only': true,
      'Order tracking': true,
      'Supplier quotes': true,
      'Priority matching': true,
      'Advanced analytics': true,
      'Bulk discounts': true,
      'Team accounts': false,
      'Custom integrations': false,
      'Workflow automation': false,
      'API access': false,
    },
  },
  {
    name: 'Enterprise',
    price: 'Contact us',
    description: 'For cooperatives, large farms, and wholesale buyers. Premium support included.',
    cta: 'Contact Sales',
    highlight: false,
    farmerFeatures: {
      'Marketplace browsing': true,
      'Basic weather alerts': true,
      'AI crop tips': true,
      'Community feed read-only': true,
      'Priority marketplace listings': true,
      'Advanced weather alerts': true,
      'Bulk order management': true,
      'Dedicated advisor access': true,
      'Order tracking': true,
      'Farm reports': true,
      'Team accounts': true,
      'Custom integrations': true,
      'Workflow automation': true,
      'API access': true,
    },
    buyerFeatures: {
      'Marketplace browsing': true,
      'Saved listings': true,
      'Price alerts': true,
      'Community feed read-only': true,
      'Order tracking': true,
      'Supplier quotes': true,
      'Priority matching': true,
      'Advanced analytics': true,
      'Bulk discounts': true,
      'Team accounts': true,
      'Custom integrations': true,
      'Workflow automation': true,
      'API access': true,
    },
  },
]

const allFeatures = [
  'Marketplace browsing',
  'Basic weather alerts',
  'AI crop tips',
  'Community feed read-only',
  'Priority marketplace listings',
  'Advanced weather alerts',
  'Bulk order management',
  'Dedicated advisor access',
  'Order tracking',
  'Farm reports',
  'Supplier quotes',
  'Priority matching',
  'Advanced analytics',
  'Bulk discounts',
  'Team accounts',
  'Custom integrations',
  'Workflow automation',
  'API access',
]

export default function BuyerPlansPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <BuyerNav />
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

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Feature comparison" subtitle="See exactly what's included in each plan for farmers and buyers." />
          <div className="mt-8 overflow-x-auto">
            <table className="mt-4 w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-4 pr-4 font-semibold text-slate-900">Feature</th>
                  <th className="pb-4 px-4 text-center font-semibold text-emerald-700">Starter</th>
                  <th className="pb-4 px-4 text-center font-semibold text-emerald-700">Professional</th>
                  <th className="pb-4 pl-4 text-center font-semibold text-emerald-700">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {allFeatures.map((feature) => (
                  <tr key={feature} className="hover:bg-slate-50">
                    <td className="py-3 pr-4 text-slate-700">{feature}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-500">Farmer</span>
                        {plans[0].farmerFeatures[feature] ? (
                          <span className="text-emerald-600">✓</span>
                        ) : (
                          <span className="text-rose-500">✕</span>
                        )}
                        <span className="text-xs text-slate-500">Buyer</span>
                        {plans[0].buyerFeatures[feature] ? (
                          <span className="text-emerald-600">✓</span>
                        ) : (
                          <span className="text-rose-500">✕</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-500">Farmer</span>
                        {plans[1].farmerFeatures[feature] ? (
                          <span className="text-emerald-600">✓</span>
                        ) : (
                          <span className="text-rose-500">✕</span>
                        )}
                        <span className="text-xs text-slate-500">Buyer</span>
                        {plans[1].buyerFeatures[feature] ? (
                          <span className="text-emerald-600">✓</span>
                        ) : (
                          <span className="text-rose-500">✕</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 pl-4 text-center">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-500">Farmer</span>
                        {plans[2].farmerFeatures[feature] ? (
                          <span className="text-emerald-600">✓</span>
                        ) : (
                          <span className="text-rose-500">✕</span>
                        )}
                        <span className="text-xs text-slate-500">Buyer</span>
                        {plans[2].buyerFeatures[feature] ? (
                          <span className="text-emerald-600">✓</span>
                        ) : (
                          <span className="text-rose-500">✕</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}
