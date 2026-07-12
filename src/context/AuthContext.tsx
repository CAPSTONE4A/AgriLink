import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export type AuthRole = 'farmer' | 'cooperative' | 'buyer' | 'extension' | 'lender' | 'admin' | 'guest'

export interface AuthUser {
  id: string
  name: string
  role: AuthRole
  email?: string
}

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<AuthUser>
  loginDemo: (user: AuthUser) => void
  loginGuest: () => void
  register: (email: string, password: string, userData: { full_name: string; role: AuthRole }) => Promise<AuthUser>
  logout: () => Promise<void>
}

export function getDashboardPath(role: AuthRole) {
  switch (role) {
    case 'farmer':
      return '/farmer/dashboard'
    case 'cooperative':
      return '/cooperative/dashboard'
    case 'buyer':
      return '/buyer/dashboard'
    case 'extension':
      return '/extension/dashboard'
    case 'lender':
      return '/lender/dashboard'
    case 'admin':
      return '/admin/dashboard'
    case 'guest':
      return '/guest/dashboard'
    default:
      return '/'
  }
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('agrilink_user')
      if (stored) {
        try {
          return JSON.parse(stored) as AuthUser
        } catch {
          localStorage.removeItem('agrilink_user')
        }
      }
    }
    return null
  })
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('agrilink_user')
      if (stored) {
        try {
          JSON.parse(stored)
          return false
        } catch {
          localStorage.removeItem('agrilink_user')
        }
      }
    }
    return true
  })

  useEffect(() => {
    if (user) {
      setLoading(false)
      return
    }

    const stored = localStorage.getItem('agrilink_user')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthUser
        if (parsed && parsed.id) {
          setUser(parsed)
        }
      } catch {
        localStorage.removeItem('agrilink_user')
      }
    }

    if (!supabase) {
      setLoading(false)
      return
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? undefined,
          name: session.user.user_metadata?.full_name ?? session.user.email ?? 'User',
          role: session.user.user_metadata?.role ?? 'farmer',
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      async login(email: string, password: string): Promise<AuthUser> {
        if (!supabase) {
          const demoUser: AuthUser = {
            id: 'demo-user',
            email,
            name: email.split('@')[0],
            role: email.includes('@') ? 'buyer' : 'farmer',
          }
          setUser(demoUser)
          localStorage.setItem('agrilink_user', JSON.stringify(demoUser))
          return demoUser
        }
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        const authUser: AuthUser = {
          id: data.user!.id,
          email: data.user!.email ?? undefined,
          name: data.user!.user_metadata?.full_name ?? data.user!.email ?? 'User',
          role: data.user!.user_metadata?.role ?? 'farmer',
        }
        setUser(authUser)
        return authUser
      },
      loginDemo(userData: AuthUser) {
        localStorage.setItem('agrilink_user', JSON.stringify(userData))
        setUser(userData)
      },
      loginGuest() {
        const guestUser: AuthUser = {
          id: 'guest-user',
          name: 'Guest',
          role: 'guest',
        }
        localStorage.setItem('agrilink_user', JSON.stringify(guestUser))
        setUser(guestUser)
      },
      async register(email: string, password: string, userData: { full_name: string; role: AuthRole }): Promise<AuthUser> {
        if (!supabase) {
          const demoUser: AuthUser = {
            id: 'demo-user-' + Date.now(),
            email,
            name: userData.full_name,
            role: userData.role,
          }
          setUser(demoUser)
          localStorage.setItem('agrilink_user', JSON.stringify(demoUser))
          return demoUser
        }
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: userData.full_name,
              role: userData.role,
            },
          },
        })
        if (error) {
          const message = error.message.toLowerCase()
          if (message.includes('already registered') || message.includes('duplicate') || message.includes('already exists')) {
            throw new Error('This email is already registered. Please use a different email or log in.')
          }
          throw new Error(error.message || 'Registration failed. Please try again.')
        }
        if (!data.user) {
          throw new Error('Registration failed. Please try again.')
        }
        const authUser: AuthUser = {
          id: data.user.id,
          email: data.user.email ?? undefined,
          name: userData.full_name,
          role: userData.role,
        }
        setUser(authUser)
        return authUser
      },
      async logout() {
        localStorage.removeItem('agrilink_user')
        if (supabase) {
          await supabase.auth.signOut()
        }
        setUser(null)
        window.location.href = '/'
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

interface ProtectedRouteProps {
  children: JSX.Element
  allowedRoles?: AuthRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardPath(user.role)} replace />
  }

  return children
}
