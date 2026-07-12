import { useQuery } from '@tanstack/react-query'
import { SectionHeading } from '../../components/SectionHeading'
import { getDashboardStats, getUsers, getListings, getLoanApplications } from '../../services/api'

export default function AdminDashboard() {
  const { data: stats } = useQuery({ queryKey: ['admin-stats'], queryFn: getDashboardStats })
  const { data: users = [] } = useQuery({ queryKey: ['admin-users'], queryFn: getUsers })
  const { data: listings = [] } = useQuery({ queryKey: ['admin-listings'], queryFn: getListings })
  const { data: loans = [] } = useQuery({ queryKey: ['admin-loans'], queryFn: getLoanApplications })

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">System Admin</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950">Governance, moderation, and compliance overview.</h1>
            <p className="mt-4 max-w-2xl text-slate-600">Review platform health, user base, marketplace activity, and pending verifications.</p>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Platform overview" subtitle="Key metrics at a glance." />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Users', value: String(stats?.totalUsers ?? 0) },
              { label: 'Farmers', value: String(stats?.totalFarmers ?? 0) },
              { label: 'Buyers', value: String(stats?.totalBuyers ?? 0) },
              { label: 'Cooperatives', value: String(stats?.totalCooperatives ?? 0) },
              { label: 'Extensions', value: String(stats?.totalExtensions ?? 0) },
              { label: 'Lenders', value: String(stats?.totalLenders ?? 0) },
              { label: 'Listings', value: String(stats?.totalListings ?? 0) },
              { label: 'Orders', value: String(stats?.totalOrders ?? 0) },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Revenue & pending actions" subtitle="Financials and items requiring attention." />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Total Revenue</p>
              <p className="mt-4 text-3xl font-semibold text-emerald-700">₱{(stats?.totalRevenue ?? 0).toLocaleString()}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Pending Loans</p>
              <p className="mt-4 text-3xl font-semibold text-amber-600">{stats?.pendingLoans ?? 0}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Open Questions</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">{stats?.openQuestions ?? 0}</p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Recent users" subtitle="Latest registered accounts." />
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
            <div className="grid grid-cols-4 gap-0 bg-slate-100 px-6 py-4 text-xs uppercase tracking-[0.24em] text-slate-500">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Joined</span>
            </div>
            <div className="divide-y divide-slate-200 bg-white">
              {users.slice(0, 10).map((u) => (
                <div key={u.id} className="grid grid-cols-4 gap-0 px-6 py-4 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">{u.full_name}</span>
                  <span>{u.email ?? '—'}</span>
                  <span className="capitalize">{u.role}</span>
                  <span>{new Date(u.created_at).toLocaleDateString()}</span>
                </div>
              ))}
              {users.length === 0 && (
                <div className="px-6 py-4 text-sm text-slate-500">No users yet.</div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Pending loan applications" subtitle="Applications awaiting review." />
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
            <div className="grid grid-cols-5 gap-0 bg-slate-100 px-6 py-4 text-xs uppercase tracking-[0.24em] text-slate-500">
              <span>Farmer</span>
              <span>Amount</span>
              <span>Purpose</span>
              <span>Term</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-slate-200 bg-white">
              {loans.slice(0, 10).map((loan) => (
                <div key={loan.id} className="grid grid-cols-5 gap-0 px-6 py-4 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">{loan.farmer_id.slice(0, 8)}</span>
                  <span>₱{Number(loan.amount).toLocaleString()}</span>
                  <span>{loan.purpose}</span>
                  <span>{loan.term_months} months</span>
                  <span className={`capitalize ${loan.status === 'pending' ? 'text-amber-600' : loan.status === 'approved' ? 'text-emerald-600' : 'text-rose-600'}`}>{loan.status}</span>
                </div>
              ))}
              {loans.length === 0 && (
                <div className="px-6 py-4 text-sm text-slate-500">No loan applications yet.</div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Recent marketplace listings" subtitle="Latest harvest listings across the platform." />
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
            <div className="grid grid-cols-5 gap-0 bg-slate-100 px-6 py-4 text-xs uppercase tracking-[0.24em] text-slate-500">
              <span>Title</span>
              <span>Category</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-slate-200 bg-white">
              {listings.slice(0, 10).map((listing) => (
                <div key={listing.id} className="grid grid-cols-5 gap-0 px-6 py-4 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">{listing.title}</span>
                  <span>{listing.category}</span>
                  <span>₱{Number(listing.price_per_unit).toFixed(2)}/{listing.unit}</span>
                  <span>{listing.quantity_available}</span>
                  <span className="capitalize">{listing.status}</span>
                </div>
              ))}
              {listings.length === 0 && (
                <div className="px-6 py-4 text-sm text-slate-500">No listings yet.</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
