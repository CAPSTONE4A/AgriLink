import { BuyerNav } from '../../components/BuyerNav'
import { useAuth } from '../../context/AuthContext'
import { useNotify } from '../../context/NotificationContext'
import { getOrders, updateOrderStatus } from '../../services/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function BuyerOrders() {
  const { user } = useAuth()
  const { notify } = useNotify()
  const queryClient = useQueryClient()
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => getOrders(user!.id),
    enabled: !!user?.id,
  })

  const cancelMutation = useMutation({
    mutationFn: (orderId: string) => updateOrderStatus(orderId, 'cancelled'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', user?.id] })
      notify('Order cancelled successfully.', 'success')
    },
    onError: () => {
      notify('Failed to cancel order. Please try again.', 'error')
    },
  })

  function handleCancel(orderId: string) {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelMutation.mutate(orderId)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <BuyerNav />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Your orders</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950">Recent buyer orders</h1>
            </div>
            <button
              type="button"
              onClick={() => notify('Create purchase request is under development.', 'info')}
              className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Create purchase request
            </button>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <div className="grid grid-cols-6 gap-0 bg-slate-100 px-6 py-4 text-xs uppercase tracking-[0.24em] text-slate-500">
              <span>Order</span>
              <span>Status</span>
              <span>Amount</span>
              <span>Quantity</span>
              <span>Expected</span>
              <span>Action</span>
            </div>
            <div className="divide-y divide-slate-200 bg-white">
              {isLoading ? (
                <div className="px-6 py-4 text-sm text-slate-500">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="px-6 py-4 text-sm text-slate-500">No orders yet.</div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="grid grid-cols-6 gap-0 px-6 py-4 text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">{order.id.slice(0, 8)}</span>
                    <span className={`font-semibold ${
                      order.status === 'Delivered' ? 'text-emerald-600' : order.status === 'Pending' ? 'text-amber-600' : order.status === 'cancelled' ? 'text-rose-600' : 'text-slate-500'
                    }`}>{order.status}</span>
                    <span>₱{Number(order.total_amount).toLocaleString()}</span>
                    <span>{order.quantity}</span>
                    <span className="text-slate-500">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span>
                      {(order.status === 'pending' || order.status === 'processing') && (
                        <button
                          type="button"
                          onClick={() => handleCancel(order.id)}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-800"
                        >
                          Cancel
                        </button>
                      )}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
