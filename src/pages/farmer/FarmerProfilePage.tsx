import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SectionHeading } from '../../components/SectionHeading'
import { FarmerNav } from '../../components/FarmerNav'
import { useAuth } from '../../context/AuthContext'
import { useNotify } from '../../context/NotificationContext'
import { getFarmerProfile, getProfile } from '../../services/api'

type FarmerTier = 'basic' | 'standard' | 'premium'

function getFarmerTier(profile: {
  farm_size_hectares: number | null
  years_farming: number | null
}): { tier: FarmerTier; label: string; benefits: string[] } {
  const size = profile.farm_size_hectares ?? 0
  const years = profile.years_farming ?? 0

  if (size >= 5 || years >= 10) {
    return {
      tier: 'premium',
      label: 'Premium Farmer',
      benefits: ['Priority marketplace placement', 'Advanced weather alerts', 'Bulk order management', 'Dedicated advisor access'],
    }
  }
  if (size >= 2 || years >= 3) {
    return {
      tier: 'standard',
      label: 'Standard Farmer',
      benefits: ['Marketplace listing', 'Standard weather alerts', 'Order tracking', 'Community access'],
    }
  }
  return {
    tier: 'basic',
    label: 'Basic Farmer',
    benefits: ['Marketplace browsing', 'Basic weather info', 'Community feed read-only'],
  }
}

export default function FarmerProfilePage() {
  const { user } = useAuth()
  const { notify } = useNotify()

  useEffect(() => {
    document.title = 'Farmer Profile | AgriLink'
  }, [])
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['farmer-profile', user?.id],
    queryFn: () => getFarmerProfile(user!.id),
    enabled: !!user?.id,
  })
  const { data: baseProfile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getProfile(user!.id),
    enabled: !!user?.id,
  })

  const tier = profile ? getFarmerTier(profile) : null
  const isLoading = profileLoading

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <FarmerNav />
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Farmer Profile</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950">
                {isLoading ? 'Loading...' : baseProfile?.full_name || profile?.farm_name || 'My Farm Profile'}
              </h1>
              <p className="mt-4 max-w-2xl text-slate-600">
                {isLoading ? 'Loading profile...' : 'Manage your personal information, farm details, subscription plan, and preferences.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => notify('Edit profile is under development.', 'info')}
              className="inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Edit Profile
            </button>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Your Plan" subtitle="Current subscription and benefits." />
          {tier ? (
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Current Plan</p>
                <p className="mt-4 text-3xl font-semibold text-emerald-700">{tier.label}</p>
                <p className="mt-2 text-sm text-slate-600 capitalize">{tier.tier} tier</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Benefits</p>
                <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-slate-700">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No plan information available.</p>
          )}
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Account Information" subtitle="Your personal and contact details." />
          {isLoading ? (
            <p className="mt-4 text-sm text-slate-500">Loading profile...</p>
          ) : baseProfile ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Full Name</p>
                <p className="mt-4 text-xl font-semibold text-slate-950">{baseProfile.full_name}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Email</p>
                <p className="mt-4 text-xl font-semibold text-slate-950">{baseProfile.email || '—'}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Phone</p>
                <p className="mt-4 text-xl font-semibold text-slate-950">{baseProfile.phone || '—'}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:col-span-2 lg:col-span-3">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Address</p>
                <p className="mt-4 text-xl font-semibold text-slate-950">
                  {[baseProfile.address, baseProfile.barangay, baseProfile.municipality, baseProfile.province].filter(Boolean).join(', ') || '—'}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Member Since</p>
                <p className="mt-4 text-xl font-semibold text-slate-950">
                  {baseProfile.created_at ? new Date(baseProfile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Account Type</p>
                <p className="mt-4 text-xl font-semibold text-slate-950 capitalize">{baseProfile.role}</p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No account information found.</p>
          )}
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Farm Information" subtitle="Your farm details and statistics." />
          {isLoading ? (
            <p className="mt-4 text-sm text-slate-500">Loading profile...</p>
          ) : profile ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Farm Name</p>
                <p className="mt-4 text-xl font-semibold text-slate-950">{profile.farm_name}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Farm Type</p>
                <p className="mt-4 text-xl font-semibold text-slate-950">{profile.farm_type || '—'}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Farm Size</p>
                <p className="mt-4 text-xl font-semibold text-slate-950">{profile.farm_size_hectares ? `${profile.farm_size_hectares} hectares` : '—'}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Years Farming</p>
                <p className="mt-4 text-xl font-semibold text-slate-950">{profile.years_farming ? `${profile.years_farming} years` : '—'}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:col-span-2 lg:col-span-3">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Primary Crops</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.crops_grown && Array.isArray(profile.crops_grown) && (profile.crops_grown as string[]).length > 0 ? (
                    (profile.crops_grown as string[]).map((crop) => (
                      <span key={crop} className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
                        {crop}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No crops listed.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No farm profile found. Complete your profile to see details here.</p>
          )}
        </section>
      </div>
    </main>
  )
}
