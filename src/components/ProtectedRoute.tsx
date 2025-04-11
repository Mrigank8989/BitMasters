import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const hasToken = !!localStorage.getItem('accessToken');

  return hasToken ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
