import { SectionHeading } from '../../components/SectionHeading'
import { FarmerNav } from '../../components/FarmerNav'

export default function FarmerWeatherPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <FarmerNav />
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Weather</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">Hyper-local weather & rainfall alerts.</h1>
          <p className="mt-4 max-w-2xl text-slate-600">Weather updates tailored to your farm location. Connect this page to a weather API to show real forecasts.</p>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Current conditions" subtitle="Sample weather dashboard for your farm." />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Temperature', value: '32°C' },
              { label: 'Humidity', value: '78%' },
              { label: 'Rainfall', value: '12 mm' },
              { label: 'Wind', value: '14 km/h' },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
