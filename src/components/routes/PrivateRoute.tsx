import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '@/features/auth/authSelectors';

interface PrivateRouteProps {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <>{children}</> : <Navigate to='/auth' replace />;
};

export default PrivateRoute;
