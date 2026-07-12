interface MarketplaceListItemProps {
  title: string
  location: string
  price: string
  quantity: string
  badge: string
  image: string
}

export function MarketplaceListItem({ title, location, price, quantity, badge, image }: MarketplaceListItemProps) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-200">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-slate-900">{title}</p>
          <span className="flex-shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-emerald-800">
            {badge}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">{location}</p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-sm font-semibold text-slate-900">{price}</p>
        <p className="text-xs text-slate-500">{quantity}</p>
      </div>
    </article>
  )
}
