import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const dropdownItemClasses = `
  block rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700
`

export function DropdownNavItem({ label, items, loading = false }: { label: string; items: { path: string; label: string }[]; loading?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="btn btn-secondary text-sm inline-flex items-center gap-1 text-slate-600 hover:bg-slate-100"
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-44 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
          {loading ? (
            <>
              <div className="h-8 w-full animate-pulse rounded-lg bg-slate-100" />
              <div className="h-8 w-full animate-pulse rounded-lg bg-slate-100" />
              <div className="h-8 w-full animate-pulse rounded-lg bg-slate-100" />
            </>
          ) : (
            items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={dropdownItemClasses}
              >
                {item.label}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}
