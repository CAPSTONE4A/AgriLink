import { useQuery } from '@tanstack/react-query'
import { User } from 'lucide-react'
import { FarmerNav } from '../../components/FarmerNav'
import { useAuth } from '../../context/AuthContext'
import { getFarmerProfile } from '../../services/api'

export default function FarmerDashboard() {
  const { user, loading } = useAuth()
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['farmer-profile', user?.id],
    queryFn: () => getFarmerProfile(user!.id),
    enabled: !!user?.id,
  })

  const displayName = profile?.farm_name || user?.name || 'Farmer'
  const farmType = profile?.farm_type || 'General'
  const farmSize = profile?.farm_size_hectares ?? null
  const yearsExperience = profile?.years_farming ?? null
  const crops = profile?.crops_grown ?? null

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <FarmerNav loading={loading} />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <User className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Farmer Dashboard</p>
                <h1 className="mt-4 text-4xl font-semibold text-slate-950">
                  {profileLoading ? 'Loading...' : `${displayName} Overview`}
                </h1>
                <p className="mt-4 max-w-2xl text-slate-600">
                  {profileLoading
                    ? 'Loading your farm profile...'
                    : profile
                    ? `${farmType} farm${farmSize ? ` · ${farmSize} hectares` : ''}${yearsExperience ? ` · ${yearsExperience} years experience` : ''}`
                    : 'No farm profile yet. Complete your profile to see farm details here.'}
                </p>
                {crops && Array.isArray(crops) && crops.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(crops as string[]).map((crop) => (
                      <span key={crop} className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
                        {crop}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
