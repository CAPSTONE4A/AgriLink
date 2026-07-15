import { useQuery } from '@tanstack/react-query'
import { FarmerNav } from '../../components/FarmerNav'
import { Skeleton, SkeletonText } from '../../components/Skeleton'
import { useAuth } from '../../context/AuthContext'
import { getOrdersByFarmer } from '../../services/api'
import { Package } from 'lucide-react'

export default function FarmerOrdersPage() {
  const { user, loading } = useAuth()
  const { data: orders = [], isLoading: ordersLoading, error: ordersError, refetch: refetchOrders } = useQuery({
    queryKey: ['farmer-orders', user?.id],
    queryFn: () => getOrdersByFarmer(user!.id),
    enabled: !!user?.id,
  })

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <FarmerNav loading={loading} />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Recent orders</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">Track buyer requests and confirm pickup or delivery details.</h1>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <div className="mt-8 space-y-3">
            {ordersError ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
                <p className="text-sm text-rose-600">Failed to load orders.</p>
                <button
                  type="button"
                  onClick={() => refetchOrders()}
                  className="mt-3 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                >
                  Retry
                </button>
              </div>
            ) : ordersLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3">
                  <Skeleton className="h-16 w-16 rounded-xl" />
                  <div className="flex-1">
                    <SkeletonText lines={2} />
                  </div>
                </div>
              ))
            ) : orders.length === 0 ? (
              <p className="text-sm text-slate-500">No orders yet. Publish harvest listings to start receiving orders.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <Package className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-slate-900">Order #{order.id.slice(0, 8)}</p>
                      <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                        order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">{order.quantity} units · {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-semibold text-slate-900">₱{Number(order.total_amount).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
