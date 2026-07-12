import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC<{ allowedRoles?: string[] }> = ({ allowedRoles }) => {
  // Very permissive placeholder: allow through
  return <Outlet />;
};

export default ProtectedRoute;
