interface MarketplaceCardProps {
  title: string
  location: string
  price: string
  quantity: string
  badge: string
  image: string
}

export function MarketplaceCard({ title, location, price, quantity, badge, image }: MarketplaceCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 overflow-hidden bg-slate-200">
        <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
          {badge}
        </span>
      </div>
      <div className="space-y-3 px-6 py-6">
        <div>
          <p className="text-lg font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-500">{location}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-semibold text-slate-900">{price}</span>
          <span className="text-sm text-slate-500">{quantity}</span>
        </div>
        <button className="w-full rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
          Browse Item
        </button>
      </div>
    </article>
  )
}
