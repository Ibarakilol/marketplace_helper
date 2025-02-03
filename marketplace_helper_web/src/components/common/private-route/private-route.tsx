import { Navigate, Outlet } from 'react-router-dom';

import { AppRoute } from '@/constants';
import type { PrivateRouteProps } from './private-route.props';

const PrivateRoute = ({ isRedirect, redirectRoute = AppRoute.LOGIN }: PrivateRouteProps) => {
  return isRedirect ? <Navigate to={redirectRoute} /> : <Outlet />;
};

export default PrivateRoute;
