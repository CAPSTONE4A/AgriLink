interface TestimonialCardProps {
  name: string
  role: string
  quote: string
}

export function TestimonialCard({ name, role, quote }: TestimonialCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          {name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="text-sm text-slate-500">{role}</p>
        </div>
      </div>
      <p className="text-sm leading-7 text-slate-600">“{quote}”</p>
    </article>
  )
}
