import { Wheat, Apple, Leaf, Carrot, Fish, Grape, Banana, Cherry, Drumstick } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Wheat,
  Apple,
  Leaf,
  Carrot,
  Fish,
  Grape,
  Banana,
  Cherry,
  Drumstick,
}

function getListingIcon(title: string, category: string): React.ElementType {
  const lower = `${title} ${category}`.toLowerCase()
  if (lower.includes('rice') || lower.includes('palay') || lower.includes('corn')) return Wheat
  if (lower.includes('tomato')) return Apple
  if (lower.includes('pechay') || lower.includes('vegetable') || lower.includes('leaf')) return Leaf
  if (lower.includes('carrot')) return Carrot
  if (lower.includes('fish') || lower.includes('seafood')) return Fish
  if (lower.includes('grape')) return Grape
  if (lower.includes('banana')) return Banana
  if (lower.includes('cherry')) return Cherry
  if (lower.includes('chicken') || lower.includes('poultry') || lower.includes('meat')) return Drumstick
  return Leaf
}

interface MarketplaceCardProps {
  title: string
  location: string
  price: string
  quantity: string
  badge: string
  category?: string
  icon?: string
}

export function MarketplaceCard({ title, location, price, quantity, badge, category, icon }: MarketplaceCardProps) {
  const Icon = icon ? iconMap[icon] : getListingIcon(title, category || '')

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
      <div className="relative flex h-36 items-center justify-center bg-emerald-50 dark:bg-emerald-900/30">
        <Icon className="h-12 w-12 text-emerald-500 dark:text-emerald-400" strokeWidth={1.5} />
        <span className="absolute left-3 top-3 rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
          {badge}
        </span>
      </div>
      <div className="space-y-2 p-4">
        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <span>📍</span>
            <span>{location}</span>
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">{price}</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">{quantity}</span>
        </div>
        <button className="w-full rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800">
          View Details
        </button>
      </div>
    </article>
  )
}
