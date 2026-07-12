import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/public/LandingPage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import BuyerDashboard from './pages/buyer/BuyerDashboard'
import BuyerOrders from './pages/buyer/BuyerOrders'
import FarmerDashboard from './pages/farmer/FarmerDashboard'
import CooperativeDashboard from './pages/cooperative/CooperativeDashboard'
import ExtensionDashboard from './pages/extension/ExtensionDashboard'
import LenderDashboard from './pages/lender/LenderDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import MarketplacePage from './pages/MarketplacePage'
import { AuthProvider, ProtectedRoute } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/buyer/dashboard"
            element={
              <ProtectedRoute allowedRoles={['buyer']}>
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buyer/orders"
            element={
              <ProtectedRoute allowedRoles={['buyer', 'cooperative']}>
                <BuyerOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/dashboard"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cooperative/dashboard"
            element={
              <ProtectedRoute allowedRoles={['cooperative']}>
                <CooperativeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/extension/dashboard"
            element={
              <ProtectedRoute allowedRoles={['extension']}>
                <ExtensionDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lender/dashboard"
            element={
              <ProtectedRoute allowedRoles={['lender']}>
                <LenderDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
