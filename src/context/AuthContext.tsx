import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export type AuthRole = 'farmer' | 'cooperative' | 'buyer' | 'extension' | 'lender' | 'admin'

interface AuthUser {
  name: string
  role: AuthRole
}

interface AuthContextValue {
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
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
    default:
      return '/'
  }
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === 'undefined') {
      return null
    }
    const stored = localStorage.getItem('agrilink_user')
    if (!stored) {
      return null
    }
    try {
      return JSON.parse(stored) as AuthUser
    } catch {
      localStorage.removeItem('agrilink_user')
      return null
    }
  })

  const value = useMemo(
    () => ({
      user,
      login(userData: AuthUser) {
        localStorage.setItem('agrilink_user', JSON.stringify(userData))
        setUser(userData)
      },
      logout() {
        localStorage.removeItem('agrilink_user')
        setUser(null)
      },
    }),
    [user],
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
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardPath(user.role)} replace />
  }

  return children
}
