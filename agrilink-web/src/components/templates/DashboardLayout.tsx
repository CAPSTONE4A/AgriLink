import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FC = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <main className="p-6 lg:p-10">
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
