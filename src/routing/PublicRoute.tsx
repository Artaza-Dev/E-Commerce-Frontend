import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
  restricted?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  restricted = false,
}) => {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");
  const isExpired = expiry && Date.now() > Number(expiry);

  if (isExpired) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
  }
  if (restricted && token && !isExpired) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default PublicRoute;
