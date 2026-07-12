import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const formVariant = {
  hidden: (direction: number) => ({ opacity: 0, x: direction > 0 ? 80 : -80 }),
  visible: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction < 0 ? 80 : -80 }),
}

const roleOptions = [
  { value: 'farmer', label: 'Farmer' },
  { value: 'buyer', label: 'Buyer/Supplier' },
] as const

const getRoleLabel = (role: typeof roleOptions[number]['value']) => roleOptions.find((option) => option.value === role)?.label ?? 'User'

const roleDescription = (role: typeof roleOptions[number]['value']) => {
  switch (role) {
    case 'farmer':
      return 'Farmers can list harvests, track farm operations, and connect directly with buyers.'
    case 'buyer':
      return 'Buyers and suppliers get a business procurement profile for marketplace orders and messaging.'
    default:
      return 'Create a specialized account for your role in AgriLink.'
  }
}

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<typeof roleOptions[number]['value']>('buyer')
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    farmName: '',
    farmSize: '',
    crops: '',
    companyName: '',
    purchaseVolume: '',
    buyerType: 'Retail',
    coopName: '',
    memberCount: '',
    sharedLandArea: '',
    agencyName: '',
    region: '',
    advisoryFocus: '',
    institutionName: '',
    bankType: '',
    adminUnit: '',
  })

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleFieldChange = (field: string, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const handleStepChange = (nextStep: number) => {
    setDirection(nextStep > step ? 1 : -1)
    setStep(nextStep)
  }

  const handleBack = () => {
    if (step === 1) {
      navigate(-1)
      return
    }
    handleStepChange(step - 1)
  }

  const validateStep = () => {
    const validationErrors: string[] = []

    if (step === 1) {
      if (!formData.username.trim()) validationErrors.push('Username is required.')
      if (!formData.email.trim()) validationErrors.push('Email is required.')
      if (!formData.phone.trim()) validationErrors.push('Phone number is required.')
      if (!formData.password.trim()) validationErrors.push('Password is required.')
    }

    if (step === 2) {
      if (!formData.fullName.trim()) validationErrors.push('Full name is required.')
      if (!formData.address.trim()) validationErrors.push('Address is required.')
    }

    if (step === 3) {
      if (accountType === 'farmer') {
        if (!formData.farmName.trim()) validationErrors.push('Farm name is required for farmers.')
        if (!formData.farmSize.trim()) validationErrors.push('Farm size is required for farmers.')
        if (!formData.crops.trim()) validationErrors.push('Primary crops are required for farmers.')
      }

      if (accountType === 'buyer') {
        if (!formData.companyName.trim()) validationErrors.push('Company or buyer name is required for buyers.')
        if (!formData.purchaseVolume.trim()) validationErrors.push('Purchase volume is required for buyers.')
      }
    }

    return validationErrors
  }

  const handleNext = () => {
    const nextErrors = validateStep()
    if (nextErrors.length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors([])

    if (step < 4) {
      handleStepChange(step + 1)
      return
    }

    login({ name: formData.fullName || formData.username || 'New User', role: accountType })
    navigate(`/${accountType}/dashboard`, { replace: true })
  }

  const currentLabel = ['Account', 'Contact', 'Profile', 'Finish'][step - 1]

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_28%),linear-gradient(180deg,_#021112_0%,_#081821_100%)] px-4 sm:px-6 py-24 text-white">
      <div className="mx-auto w-full max-w-3xl rounded-[2.5rem] border border-slate-800/80 bg-slate-950/95 p-8 sm:p-10 text-white shadow-[0_35px_90px_rgba(10,20,30,0.45)]">
        <div className="mb-8 rounded-[2.5rem] bg-slate-900/90 px-10 py-12 text-center shadow-sm shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.28em] text-emerald-400">Create your account</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-100">Register with AgriLink</h1>
          <p className="mt-3 text-sm text-slate-300">Choose your role and complete the registration steps with a fast, friendly, and calmer interface.</p>
        </div>

        <div className="rounded-[2rem] bg-slate-900/90 p-10 text-white shadow-xl shadow-slate-950/40">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">Choose your role</p>
              <p className="text-sm text-slate-400">Select the account type that matches your access needs on AgriLink.</p>
            </div>
            <div className="rounded-full bg-slate-900/90 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
              Step {step} of 4 · {currentLabel}
            </div>
          </div>
          <div className="mb-6 overflow-x-auto rounded-full border border-slate-800 bg-slate-900/80 p-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-950">
            <div className="flex min-w-max gap-2">
              {roleOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAccountType(option.value)}
                  className={`min-w-[130px] rounded-full px-5 py-3 text-sm font-semibold transition ${
                    accountType === option.value ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={accountType}
              custom={direction}
              variants={formVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.28 }}
              className="mt-6 rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-8"
            >
              <p className="text-sm text-slate-300">{roleDescription(accountType)}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Role</p>
                  <p className="mt-3 text-lg font-semibold">{getRoleLabel(accountType)}</p>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Experience</p>
                  <p className="mt-3 text-lg font-semibold">{roleDescription(accountType)}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {errors.length > 0 && (
          <div className="mt-6 rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
            <p className="font-semibold text-rose-200">Please fix the following before continuing:</p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 space-y-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`step-${accountType}-${step}`}
              custom={direction}
              variants={formVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.28 }}
              className="rounded-[2rem] bg-slate-950/95 p-8"
            >
              {step === 1 && (
                <section>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Step 1: Account details</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-slate-200">
                      Username
                      <input
                        value={formData.username}
                        onChange={(event) => handleFieldChange('username', event.target.value)}
                        className="mt-3 input-field"
                        placeholder="Choose a username"
                      />
                    </label>
                    <label className="block text-sm text-slate-200">
                      Email
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(event) => handleFieldChange('email', event.target.value)}
                        className="mt-3 input-field"
                        placeholder="name@example.com"
                      />
                    </label>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-slate-200">
                      Password
                      <div className="relative mt-3">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(event) => handleFieldChange('password', event.target.value)}
                          className="w-full input-field"
                          placeholder="Create a secure password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((value) => !value)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:bg-slate-700"
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </label>
                    <label className="block text-sm text-slate-200">
                      Phone Number
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(event) => handleFieldChange('phone', event.target.value)}
                        className="mt-3 input-field"
                        placeholder="0917 123 4567"
                      />
                    </label>
                  </div>
                </section>
              )}

              {step === 2 && (
                <section>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Step 2: Contact information</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-slate-200">
                      Full name
                      <input
                        value={formData.fullName}
                        onChange={(event) => handleFieldChange('fullName', event.target.value)}
                        className="mt-3 input-field"
                        placeholder="Juan Dela Cruz"
                      />
                    </label>
                    <label className="block text-sm text-slate-200">
                      Address
                      <input
                        value={formData.address}
                        onChange={(event) => handleFieldChange('address', event.target.value)}
                        className="mt-3 input-field"
                        placeholder="Barangay, City, Province"
                      />
                    </label>
                  </div>
                  <p className="mt-4 text-sm text-slate-400">We use this information to personalize your farm or procurement dashboard.</p>
                </section>
              )}

              {step === 3 && (
                <section>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
                    Step 3: {getRoleLabel(accountType)} profile
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {accountType === 'farmer' && (
                      <>
                        <label className="block text-sm text-slate-200">
                          Farm name
                          <input
                            value={formData.farmName}
                            onChange={(event) => handleFieldChange('farmName', event.target.value)}
                            className="mt-3 input-field"
                            placeholder="San Roque Farm"
                          />
                        </label>
                        <label className="block text-sm text-slate-200">
                          Farm size
                          <input
                            value={formData.farmSize}
                            onChange={(event) => handleFieldChange('farmSize', event.target.value)}
                            className="mt-3 input-field"
                            placeholder="5 hectares"
                          />
                        </label>
                        <label className="block text-sm text-slate-200 sm:col-span-2">
                          Primary crops
                          <input
                            value={formData.crops}
                            onChange={(event) => handleFieldChange('crops', event.target.value)}
                            className="mt-3 input-field"
                            placeholder="Rice, Corn, Vegetables"
                          />
                        </label>
                      </>
                    )}
                    {accountType === 'buyer' && (
                      <>
                        <label className="block text-sm text-slate-200">
                          Company / Buyer name
                          <input
                            value={formData.companyName}
                            onChange={(event) => handleFieldChange('companyName', event.target.value)}
                            className="mt-3 input-field"
                            placeholder="Harvest Traders Inc."
                          />
                        </label>
                        <label className="block text-sm text-slate-200">
                          Purchase volume
                          <input
                            value={formData.purchaseVolume}
                            onChange={(event) => handleFieldChange('purchaseVolume', event.target.value)}
                            className="mt-3 input-field"
                            placeholder="2000 kg / month"
                          />
                        </label>
                        <label className="block text-sm text-slate-200 sm:col-span-2">
                          Buyer type
                          <select
                            value={formData.buyerType}
                            onChange={(event) => handleFieldChange('buyerType', event.target.value)}
                            className="mt-3 w-full input-field bg-white"
                          >
                            <option value="Retail">Retail</option>
                            <option value="Wholesale">Wholesale</option>
                            <option value="Cooperative">Cooperative</option>
                          </select>
                        </label>
                      </>
                    )}
                    {accountType === 'farmer' && (
                      <>
                        <label className="block text-sm text-slate-200">
                          Farm name
                          <input
                            value={formData.farmName}
                            onChange={(event) => handleFieldChange('farmName', event.target.value)}
                            className="mt-3 input-field"
                            placeholder="San Roque Farm"
                          />
                        </label>
                        <label className="block text-sm text-slate-200">
                          Farm size
                          <input
                            value={formData.farmSize}
                            onChange={(event) => handleFieldChange('farmSize', event.target.value)}
                            className="mt-3 input-field"
                            placeholder="5 hectares"
                          />
                        </label>
                        <label className="block text-sm text-slate-200 sm:col-span-2">
                          Primary crops
                          <input
                            value={formData.crops}
                            onChange={(event) => handleFieldChange('crops', event.target.value)}
                            className="mt-3 input-field"
                            placeholder="Rice, Corn, Vegetables"
                          />
                        </label>
                      </>
                    )}
                    {accountType === 'buyer' && (
                      <>
                        <label className="block text-sm text-slate-200">
                          Company / Buyer name
                          <input
                            value={formData.companyName}
                            onChange={(event) => handleFieldChange('companyName', event.target.value)}
                            className="mt-3 input-field"
                            placeholder="Harvest Traders Inc."
                          />
                        </label>
                        <label className="block text-sm text-slate-200">
                          Purchase volume
                          <input
                            value={formData.purchaseVolume}
                            onChange={(event) => handleFieldChange('purchaseVolume', event.target.value)}
                            className="mt-3 input-field"
                            placeholder="2000 kg / month"
                          />
                        </label>
                        <label className="block text-sm text-slate-200 sm:col-span-2">
                          Buyer type
                          <select
                            value={formData.buyerType}
                            onChange={(event) => handleFieldChange('buyerType', event.target.value)}
                            className="mt-3 w-full input-field bg-white"
                          >
                            <option value="Retail">Retail</option>
                            <option value="Wholesale">Wholesale</option>
                            <option value="Cooperative">Cooperative</option>
                          </select>
                        </label>
                      </>
                    )}
                  </div>
                  <p className="mt-4 text-sm text-slate-400">This helps us deliver the right experience for your role in AgriLink.</p>
                </section>
              )}

              {step === 4 && (
                <section>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Review & submit</p>
                  <div className="mt-6 space-y-4 rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-300">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <span className="font-semibold text-slate-100">Role</span>
                      <span>{getRoleLabel(accountType)}</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <span className="font-semibold text-slate-100">Username</span>
                      <span>{formData.username || 'n/a'}</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <span className="font-semibold text-slate-100">Full name</span>
                      <span>{formData.fullName || 'n/a'}</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <span className="font-semibold text-slate-100">Email</span>
                      <span>{formData.email || 'n/a'}</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <span className="font-semibold text-slate-100">Phone</span>
                      <span>{formData.phone || 'n/a'}</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <span className="font-semibold text-slate-100">Address</span>
                      <span>{formData.address || 'n/a'}</span>
                    </div>
                    {accountType === 'farmer' && (
                      <>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <span className="font-semibold text-slate-100">Farm name</span>
                          <span>{formData.farmName || 'n/a'}</span>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <span className="font-semibold text-slate-100">Farm size</span>
                          <span>{formData.farmSize || 'n/a'}</span>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <span className="font-semibold text-slate-100">Primary crops</span>
                          <span>{formData.crops || 'n/a'}</span>
                        </div>
                      </>
                    )}
                    {accountType === 'buyer' && (
                      <>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <span className="font-semibold text-slate-100">Buyer name</span>
                          <span>{formData.companyName || 'n/a'}</span>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <span className="font-semibold text-slate-100">Purchase volume</span>
                          <span>{formData.purchaseVolume || 'n/a'}</span>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <span className="font-semibold text-slate-100">Buyer type</span>
                          <span>{formData.buyerType}</span>
                        </div>
                      </>
                    )}
                  </div>
                </section>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-secondary w-full sm:w-auto"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary w-full sm:w-auto"
            >
              {step === 4 ? 'Create account' : 'Continue'}
            </button>
          </div>
          <div className="mt-4 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-semibold text-emerald-400 transition hover:text-emerald-200"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
