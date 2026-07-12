import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
    <Outlet />
  </div>
);

export default AuthLayout;
