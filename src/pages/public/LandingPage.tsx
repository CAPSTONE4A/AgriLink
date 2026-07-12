import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FeatureCard } from '../../components/FeatureCard'
import { MarketplaceCard } from '../../components/MarketplaceCard'
import { SectionHeading } from '../../components/SectionHeading'
import { TestimonialCard } from '../../components/TestimonialCard'
import { featureCards, landingStats, marketplaceListings, testimonials, trustPartners } from '../../data/demoData'
import { useAuth } from '../../context/AuthContext'
import { useNotify } from '../../context/NotificationContext'

export default function LandingPage() {
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Magandang araw! Paano kita matutulungan ngayon?' },
    { role: 'user', text: 'May mga sira sa palay ko. Ano ang dapat gawin?' },
    { role: 'ai', text: 'Base sa paglalarawan, maaaring ito ay Rice Blast. Iwasan ang sobrang pataba at panatilihing may mahusay na drainage.' },
  ])
  const { loginGuest } = useAuth()
  const { notify } = useNotify()

  useEffect(() => {
    document.title = 'AgriLink - Smart Farming Marketplace'
  }, [])

  function handleGuestLogin() {
    loginGuest()
    window.location.href = '/guest/dashboard'
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    setChatMessages((current) => [...current, { role: 'user', text: chatInput.trim() }])
    const userPrompt = chatInput.trim().toLowerCase()
    setChatInput('')

    setTimeout(() => {
      const reply = userPrompt.includes('puno')
        ? 'Kung problema sa puno, suriin ang patubig at tiyaking walang fungal infection. Maaari mong i-upload ang litrato sa susunod.'
        : userPrompt.includes('ulan')
        ? 'Magandang ideya ang gumamit ng panangga sa pag-ulan at i-monitor ang lupa. Ipagpatuloy ang weather alert sa app.'
        : 'Maaari mong subukan ang pagdaragdag ng compost at iwasan ang sobrang patubig. Para sa mas detalyadong payo, mag-upload ng larawan o detalye ng halaman.'

      setChatMessages((current) => [...current, { role: 'ai', text: reply }])
    }, 400)
  }

  return (
    <main className="relative overflow-hidden">
      <section className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3 text-emerald-800">
            <span className="text-2xl">🌾</span>
            <div>
              <p className="text-lg font-semibold">AgriLink</p>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Smart farming platform</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            <a href="#features" className="transition hover:text-slate-900">Features</a>
            <Link to="/marketplace" className="transition hover:text-slate-900">Marketplace</Link>
            <a href="#pricing" className="transition hover:text-slate-900">Pricing</a>
            <a href="#about" className="transition hover:text-slate-900">About</a>
          </nav>
          <div className="flex items-center gap-3">
            <button type="button" onClick={handleGuestLogin} className="rounded-full border border-emerald-700 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
              Guest
            </button>
            <Link to="/login" className="rounded-full border border-emerald-700 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
              Log In
            </Link>
            <Link to="/register" className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 px-6 pb-20 pt-16 text-white md:pb-32">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_38%)] opacity-80" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative z-10">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
              Trusted by 12,400+ Filipino Farmers
            </span>
            <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-6xl">
              Smart Farming. Stronger Harvests. Better Lives.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              AgriLink connects smallholder farmers with AI-powered insights, direct market access, cooperative tools, and financial services — all in one platform.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-emerald-900 shadow-lg shadow-emerald-900/10 transition hover:bg-slate-50">
                Get Started Free →
              </Link>
              <a href="#ai-advisor" className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                Watch Demo ▶
              </a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-2xl">
              {landingStats.map((stat) => (
                <div key={stat.label} className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.24em] text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative mx-auto w-full max-w-lg rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
              <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-inner shadow-slate-950/40">
                <p className="text-sm uppercase tracking-[0.28em] text-emerald-300">Farm Snapshot</p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-slate-900/80 p-4">
                    <p className="text-sm text-slate-300">Weather</p>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p className="text-4xl font-semibold">28°C</p>
                        <p className="text-sm text-slate-400">Clear skies • 72% humidity</p>
                      </div>
                      <span className="rounded-2xl bg-emerald-700/90 px-3 py-1 text-sm font-semibold text-white">Stable</span>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-900/80 p-4">
                      <p className="text-sm text-slate-400">Crop Health</p>
                      <p className="mt-3 text-xl font-semibold">Good</p>
                    </div>
                    <div className="rounded-3xl bg-slate-900/80 p-4">
                      <p className="text-sm text-slate-400">Market Rate</p>
                      <p className="mt-3 text-xl font-semibold">₱22.50 / kg</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-8 top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 left-8 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20" id="features">
        <SectionHeading title="Everything a Farmer Needs" subtitle="One platform for farm operations, market access, AI guidance, and financial health." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <FeatureCard key={feature.id} title={feature.title} description={feature.description} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20" id="pricing">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Simple pricing" subtitle="Flexible plans for farmers, buyers, and cooperative teams." />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              { name: 'Starter', price: 'Free', description: 'Basic farm tracking, marketplace browsing, and AI recommendations for smallholder farmers.', features: ['Marketplace access', 'Daily weather alerts', 'AI crop tips'] },
              { name: 'Pro', price: '₱499 / mo', description: 'Advanced sourcing, verified supplier quotes, and cooperative finance tools.', features: ['Priority marketplace listings', 'Cooperative management', 'Budget monitoring'] },
              { name: 'Enterprise', price: 'Contact us', description: 'Custom plans for cooperatives, buyers, and extension agencies with premium support.', features: ['Team onboarding', 'Workflow automation', 'Dedicated support'] },
            ].map((plan) => (
              <button
                key={plan.name}
                type="button"
                onClick={() => notify('Plans are currently unavailable.', 'info')}
                className="rounded-[2rem] bg-white p-8 text-left shadow-lg shadow-slate-200/60 hover:shadow-xl transition"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">{plan.name}</p>
                <p className="mt-5 text-4xl font-semibold text-slate-950">{plan.price}</p>
                <p className="mt-4 text-sm leading-7 text-slate-500">{plan.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20" id="pricing">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Buyer plans" subtitle="Flexible plans for buyers and procurement teams." />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/60">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Starter</p>
              <p className="mt-5 text-4xl font-semibold text-slate-950">Free</p>
              <p className="mt-4 text-sm leading-7 text-slate-500">Browse marketplace, save listings, and receive price alerts.</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li>Marketplace browsing</li>
                <li>Saved listings</li>
                <li>Price alerts</li>
              </ul>
            </div>
            <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/60 ring-1 ring-emerald-200">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Professional</p>
              <p className="mt-5 text-4xl font-semibold text-slate-950">₱499 / mo</p>
              <p className="mt-4 text-sm leading-7 text-slate-500">Advanced sourcing, verified supplier quotes, and cooperative finance tools.</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li>Priority marketplace listings</li>
                <li>Cooperative management</li>
                <li>Budget monitoring</li>
              </ul>
            </div>
            <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/60">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Enterprise</p>
              <p className="mt-5 text-4xl font-semibold text-slate-950">Contact us</p>
              <p className="mt-4 text-sm leading-7 text-slate-500">Custom plans for cooperatives, buyers, and extension agencies with premium support.</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li>Team onboarding</li>
                <li>Workflow automation</li>
                <li>Dedicated support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 rounded-[2rem] bg-white p-10 shadow-lg shadow-slate-200/60 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Trusted by leading agricultural organizations</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Supported by DA, PhilRice, DTI, DOST, and World Bank</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {trustPartners.map((partner) => (
                <div key={partner} className="flex h-14 items-center justify-center rounded-3xl border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-600">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20" id="marketplace">
        <SectionHeading title="Live Marketplace" subtitle="Fresh listings from nearby farms with transparent pricing and trusted quality." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {marketplaceListings.map((listing) => (
            <MarketplaceCard key={listing.id} {...listing} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/marketplace" className="inline-flex rounded-full bg-amber-500 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-600">
            Browse All Listings →
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 px-6 py-20 text-white" id="ai-advisor">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              AI-Powered
            </span>
            <h2 className="mt-8 text-4xl font-semibold">Meet Your AI Farm Advisor</h2>
            <p className="mt-5 max-w-xl text-slate-300">
              Diagnose crop issues, get weather alerts, and receive yield predictions tailored for your farm. The advisor is built to help you make smart decisions faster.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {['Photo Diagnosis', 'Voice Chat', 'Weather Alerts', 'Yield Prediction'].map((item) => (
                <div key={item} className="rounded-3xl bg-white/10 px-5 py-4 text-sm font-semibold text-white shadow-sm backdrop-blur-xl">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/40">
            <div className="mb-6 rounded-3xl bg-slate-950 p-4 text-slate-300">
              <p className="text-sm font-semibold text-white">AI Farm Advisor</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-800/90 p-5">
                <p className="text-sm text-slate-400">AI</p>
                <p className="mt-3 text-base leading-7 text-slate-100">Magandang araw! Ako ang iyong AI Farm Advisor. Paano kita matutulungan ngayon?</p>
              </div>
              <div className="rounded-3xl bg-slate-700/90 p-5">
                <p className="text-sm text-slate-400">User</p>
                <p className="mt-3 text-base leading-7 text-slate-100">May mga dawndawn sa dahon ng palay ko. Ano ito?</p>
              </div>
              <div className="rounded-3xl bg-slate-800/90 p-5">
                <p className="text-sm text-slate-400">AI</p>
                <p className="mt-3 text-base leading-7 text-slate-100">Base sa iyong deskripsyon, maaaring ito ay Rice Blast. I-upload ang litrato para sa kumpirmasyon. Samantala, iwasan ang sobrang pataba at siguraduhing may magandang drainage.</p>
              </div>
            </div>
            <div className="mt-6 rounded-3xl border border-slate-700 bg-slate-950 p-4">
              <div className="space-y-3">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`rounded-3xl px-4 py-3 ${message.role === 'ai' ? 'bg-slate-900 text-slate-100' : 'bg-emerald-500/10 text-slate-100'} ${message.role === 'ai' ? 'self-start' : 'self-end'}`}>
                    <p className="text-sm leading-7">{message.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-3 rounded-3xl border border-slate-700 bg-slate-900 p-3">
                <input
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Ask the AI advisor..."
                />
                <button
                  type="button"
                  onClick={handleSendMessage}
                  className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20" id="about">
        <SectionHeading title="Loved by Farmers Nationwide" subtitle="Hear from farmers and coop leaders who are already growing smarter." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </section>

      <section className="bg-emerald-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white/10 p-10 shadow-2xl shadow-emerald-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-100/80">Ready to grow smarter?</p>
              <h2 className="mt-3 text-4xl font-semibold">Join 12,400+ Filipino farmers already using AgriLink.</h2>
              <p className="mt-4 max-w-2xl text-slate-100/80">Free forever for smallholders. No credit card required. Setup takes less than 5 minutes.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-slate-100">
                Create Free Account →
              </Link>
              <a href="mailto:sales@agrilink.ph" className="inline-flex items-center justify-center rounded-full border border-white/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-14 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-4">
          <div>
            <p className="text-xl font-semibold text-white">AgriLink</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              A unified farming platform for AI insights, cooperative tools, marketplace access, and farm finance.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Platform</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li><a href="#features" className="transition hover:text-white">Features</a></li>
              <li><a href="#marketplace" className="transition hover:text-white">Marketplace</a></li>
              <li><a href="#ai-advisor" className="transition hover:text-white">AI Advisor</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Company</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li><a href="#about" className="transition hover:text-white">About</a></li>
              <li><a href="#pricing" className="transition hover:text-white">Pricing</a></li>
              <li><a href="mailto:support@agrilink.ph" className="transition hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Support</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li><a href="mailto:support@agrilink.ph" className="transition hover:text-white">Help Center</a></li>
              <li><Link to="/register" className="transition hover:text-white">Create Account</Link></li>
              <li><Link to="/login" className="transition hover:text-white">Log In</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-6 text-sm text-slate-500">
          © 2026 AgriLink. All rights reserved.
        </div>
      </footer>
    </main>
  )
}
