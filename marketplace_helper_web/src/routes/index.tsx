import { Route } from 'react-router-dom';

import MainLayout from '@/layouts/main-layout';
import AuthPage from '@/pages/auth-page';
import MainPage from '@/pages/main-page';
import SettingsPage from '@/pages/settings-page';

import { AppRoute, WILDBERRIES_TAB_ROUTES } from '@/constants';

const MAIN_ROUTES = [
  {
    path: AppRoute.WILDBERRIES_FEEDBACKS,
    component: MainPage,
    tabs: WILDBERRIES_TAB_ROUTES,
    title: 'Wildberries отзывы',
  },
  {
    path: AppRoute.WILDBERRIES_PRODUCTS,
    component: MainPage,
    tabs: WILDBERRIES_TAB_ROUTES,
    title: 'Wildberries товары',
  },
  {
    path: AppRoute.SETTINGS,
    component: SettingsPage,
    title: 'Настройки',
  },
];

const AUTH_ROUTES = [
  {
    path: AppRoute.LOGIN,
    component: AuthPage,
  },
  {
    path: AppRoute.REGISTER,
    component: AuthPage,
  },
];

export const MainRoutes = () => {
  return MAIN_ROUTES.map(({ path, component: Component, ...props }) => (
    <Route
      key={path}
      element={
        <MainLayout {...props}>
          <Component />
        </MainLayout>
      }
      path={path}
    />
  ));
};

export const AuthRoutes = () => {
  return AUTH_ROUTES.map(({ path, component: Component }) => (
    <Route key={path} element={<Component />} path={path} />
  ));
};
