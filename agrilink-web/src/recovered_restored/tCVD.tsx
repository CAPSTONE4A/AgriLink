import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FullPageSpinner } from '@/components/atoms/Spinner';
import ProtectedRoute from '@/components/ProtectedRoute';

const LandingPage = lazy(() => import('./pages/public/LandingPage'));
const LoginPage = lazy(() => import('./pages/public/LoginPage'));
const RegisterPage = lazy(() => import('./pages/public/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/farmer/DashboardPage'));
const FarmsPage = lazy(() => import('./pages/farmer/FarmsPage'));
const FarmDetailPage = lazy(() => import('./pages/farmer/FarmDetailPage'));
const AIAdvisorPage = lazy(() => import('./pages/farmer/AIAdvisorPage'));
const WeatherPage = lazy(() => import('./pages/farmer/WeatherPage'));
const MarketplacePage = lazy(() => import('./pages/farmer/MarketplacePage'));
const ListingDetailPage = lazy(() => import('./pages/farmer/ListingDetailPage'));
const CreateListingPage = lazy(() => import('./pages/farmer/CreateListingPage'));
const OrdersPage = lazy(() => import('./pages/farmer/OrdersPage'));
const CooperativePage = lazy(() => import('./pages/farmer/CooperativePage'));
const FinancePage = lazy(() => import('./pages/farmer/FinancePage'));
const LearningPage = lazy(() => import('./pages/farmer/LearningPage'));
const ProfilePage = lazy(() => import('./pages/farmer/ProfilePage'));
const SettingsPage = lazy(() => import('./pages/farmer/SettingsPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const DashboardLayout = lazy(() => import('./components/templates/DashboardLayout'));

function App() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute allowedRoles={["farmer"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/farms" element={<FarmsPage />} />
            <Route path="/farms/:id" element={<FarmDetailPage />} />
            <Route path="/ai-advisor" element={<AIAdvisorPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/:id" element={<ListingDetailPage />} />
            <Route path="/marketplace/sell" element={<CreateListingPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/cooperative" element={<CooperativePage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </Suspense>
  );
}

export default App;
