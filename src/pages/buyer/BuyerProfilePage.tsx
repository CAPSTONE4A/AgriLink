import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SectionHeading } from '../../components/SectionHeading'
import { BuyerNav } from '../../components/BuyerNav'
import { useAuth } from '../../context/AuthContext'
import { useNotify } from '../../context/NotificationContext'
import { getBuyerProfile, getProfile } from '../../services/api'

type BuyerTier = 'basic' | 'standard' | 'premium'

function getBuyerTier(profile: {
  business_type: string | null
  typical_order_volume: string | null
}): { tier: BuyerTier; label: string; benefits: string[] } {
  const businessType = (profile.business_type || '').toLowerCase()
  const volume = (profile.typical_order_volume || '').toLowerCase()

  if (businessType.includes('wholesale') || businessType.includes('cooperative') || volume.includes('1000') || volume.includes('2000')) {
    return {
      tier: 'premium',
      label: 'Premium Buyer',
      benefits: ['Bulk order discounts', 'Priority supplier matching', 'Dedicated account support', 'Advanced analytics'],
    }
  }
  if (businessType.includes('retail') || volume.includes('500') || volume.includes('100')) {
    return {
      tier: 'standard',
      label: 'Standard Buyer',
      benefits: ['Marketplace access', 'Order tracking', 'Supplier quotes', 'Community access'],
    }
  }
  return {
    tier: 'basic',
    label: 'Basic Buyer',
    benefits: ['Marketplace browsing', 'Saved listings', 'Price alerts'],
  }
}

export default function BuyerProfilePage() {
  const { user } = useAuth()
  const { notify } = useNotify()

  useEffect(() => {
    document.title = 'Buyer Profile | AgriLink'
  }, [])
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['buyer-profile', user?.id],
    queryFn: () => getBuyerProfile(user!.id),
    enabled: !!user?.id,
  })
  const { data: baseProfile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getProfile(user!.id),
    enabled: !!user?.id,
  })

  const tier = profile ? getBuyerTier(profile) : null
  const isLoading = profileLoading

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <BuyerNav />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-[2rem] bg-gradient-to-br from-emerald-800 to-emerald-900 p-8 text-white shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-semibold backdrop-blur-sm">
                {isLoading ? '...' : (baseProfile?.full_name || profile?.business_name || 'B').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">Buyer Profile</p>
                <h1 className="mt-2 text-3xl font-semibold text-white">
                  {isLoading ? 'Loading...' : baseProfile?.full_name || profile?.business_name || 'My Business Profile'}
                </h1>
                <p className="mt-2 text-sm text-emerald-100">
                  {isLoading ? 'Loading profile...' : 'Manage your personal information, business details, subscription plan, and procurement preferences.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => notify('Edit profile is under development.', 'info')}
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
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
          <SectionHeading title="Business Information" subtitle="Your business details and preferences." />
          {isLoading ? (
            <p className="mt-4 text-sm text-slate-500">Loading profile...</p>
          ) : profile ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Business Name</p>
                <p className="mt-4 text-xl font-semibold text-slate-950">{profile.business_name}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Business Type</p>
                <p className="mt-4 text-xl font-semibold text-slate-950">{profile.business_type || '—'}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Typical Order Volume</p>
                <p className="mt-4 text-xl font-semibold text-slate-950">{profile.typical_order_volume || '—'}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:col-span-2 lg:col-span-3">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Preferred Crops</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.preferred_crops && Array.isArray(profile.preferred_crops) && (profile.preferred_crops as string[]).length > 0 ? (
                    (profile.preferred_crops as string[]).map((crop) => (
                      <span key={crop} className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
                        {crop}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No preferred crops listed.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No business profile found. Complete your profile to see details here.</p>
          )}
        </section>
      </div>
    </main>
  )
}
