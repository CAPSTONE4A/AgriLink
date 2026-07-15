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

interface MarketplaceListItemProps {
  title: string
  location: string
  price: string
  quantity: string
  badge: string
  category?: string
  icon?: string
}

export function MarketplaceListItem({ title, location, price, quantity, badge, category, icon }: MarketplaceListItemProps) {
  const Icon = icon ? iconMap[icon] : getListingIcon(title, category || '')

  return (
    <article className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-xs font-semibold text-slate-900 dark:text-slate-100">{title}</p>
          <span className="flex-shrink-0 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            {badge}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{location}</p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{price}</p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{quantity}</p>
      </div>
    </article>
  )
}
