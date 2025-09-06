import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated } from "@/features/auth/authSelectors";

interface PublicRouteProps {
  children: React.ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Navigate to='/dashboard' replace /> : <>{children}</>;
}

export default PublicRoute;
