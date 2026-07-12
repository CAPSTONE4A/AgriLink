interface StatCardProps {
  label: string
  value: string
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-3xl bg-slate-950/90 p-6 text-white shadow-xl shadow-slate-950/10">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{label}</p>
      <p className="mt-4 text-3xl font-semibold">{value}</p>
    </div>
  )
}
