import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

const Protected = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default Protected;
