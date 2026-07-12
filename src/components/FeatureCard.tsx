interface FeatureCardProps {
  title: string
  description: string
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white/90 p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
        <span className="text-lg font-semibold">✓</span>
      </div>
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  )
}
