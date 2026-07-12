interface SectionHeadingProps {
  title: string
  subtitle: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-700">
        {title}
      </p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {subtitle}
      </p>
    </div>
  )
}
