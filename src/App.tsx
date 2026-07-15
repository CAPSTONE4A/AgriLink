import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/public/LandingPage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import BuyerDashboard from './pages/buyer/BuyerDashboard'
import BuyerOrders from './pages/buyer/BuyerOrders'
import BuyerProfilePage from './pages/buyer/BuyerProfilePage'
import FarmerDashboard from './pages/farmer/FarmerDashboard'
import FarmerProfilePage from './pages/farmer/FarmerProfilePage'
import FarmerWeatherPage from './pages/farmer/FarmerWeatherPage'
import FarmStatsPage from './pages/farmer/FarmStatsPage'
import FarmerListingsPage from './pages/farmer/FarmerListingsPage'
import FarmerOrdersPage from './pages/farmer/FarmerOrdersPage'
import FarmerPlansPage from './pages/farmer/FarmerPlansPage'
import FarmerAdvisorPage from './pages/farmer/FarmerAdvisorPage'
import MessagingPage from './pages/MessagingPage'
import CooperativeDashboard from './pages/cooperative/CooperativeDashboard'
import ExtensionDashboard from './pages/extension/ExtensionDashboard'
import LenderDashboard from './pages/lender/LenderDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import MarketplacePage from './pages/MarketplacePage'
import GuestDashboard from './pages/guest/GuestDashboard'
import { AuthProvider, ProtectedRoute } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'

function App() {
  return (
    <NotificationProvider>
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
            path="/buyer/profile"
            element={
              <ProtectedRoute allowedRoles={['buyer']}>
                <BuyerProfilePage />
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
            path="/farmer/profile"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/weather"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerWeatherPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/farm-stats"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmStatsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/listings"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerListingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/orders"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerOrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/plans"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerPlansPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/advisor"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerAdvisorPage />
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
          <Route
            path="/guest/dashboard"
            element={
              <ProtectedRoute allowedRoles={['guest']}>
                <GuestDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messaging"
            element={
              <ProtectedRoute allowedRoles={['farmer', 'buyer', 'cooperative']}>
                <MessagingPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </NotificationProvider>
  )
}

export default App
