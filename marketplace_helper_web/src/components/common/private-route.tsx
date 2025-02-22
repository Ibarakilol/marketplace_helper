import { Navigate, Outlet } from 'react-router-dom';

import { AppRoute } from '@/constants';

interface PrivateRouteProps {
  isRedirect: boolean;
  redirectRoute?: string;
}

const PrivateRoute = ({ isRedirect, redirectRoute = AppRoute.LOGIN }: PrivateRouteProps) => {
  return isRedirect ? <Navigate to={redirectRoute} /> : <Outlet />;
};

export default PrivateRoute;
