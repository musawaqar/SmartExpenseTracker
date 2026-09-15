import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');
  
  // If a token exists, render the child component; otherwise, redirect to login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}