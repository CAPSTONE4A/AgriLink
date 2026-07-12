import { BuyerNav } from '../../components/BuyerNav'

const orders = [
  { id: 'ORD-1024', product: 'Organic Tomatoes', status: 'Delivered', amount: '₱3,600', expected: '07/14' },
  { id: 'ORD-1026', product: 'Native Pechay', status: 'Pending', amount: '₱1,750', expected: '07/18' },
  { id: 'ORD-1031', product: 'Sweet Corn', status: 'Processing', amount: '₱2,160', expected: '07/20' },
]

export default function BuyerOrders() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <BuyerNav />

        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Your orders</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950">Recent buyer orders</h1>
            </div>
            <button className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
              Create purchase request
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <div className="grid grid-cols-5 gap-0 bg-slate-100 px-6 py-4 text-xs uppercase tracking-[0.24em] text-slate-500">
              <span>Order</span>
              <span>Product</span>
              <span>Status</span>
              <span>Amount</span>
              <span>Expected</span>
            </div>
            <div className="divide-y divide-slate-200 bg-white">
              {orders.map((order) => (
                <div key={order.id} className="grid grid-cols-5 gap-0 px-6 py-4 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">{order.id}</span>
                  <span>{order.product}</span>
                  <span className={`font-semibold ${
                    order.status === 'Delivered' ? 'text-emerald-600' : order.status === 'Pending' ? 'text-amber-600' : 'text-slate-500'
                  }`}>{order.status}</span>
                  <span>{order.amount}</span>
                  <span className="text-slate-500">{order.expected}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
