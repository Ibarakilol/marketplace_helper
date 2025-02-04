export enum AppRoute {
  LOGIN = '/login',
  REGISTER = '/register',
  SETTINGS = '/settings',
  WILDBERRIES = '/wildberries',
  WILDBERRIES_FEEDBACKS = '/wildberries/feedbacks',
  WILDBERRIES_PRODUCTS = '/wildberries/products',
}

export const WILDBERRIES_TAB_ROUTES = [
  { link: AppRoute.WILDBERRIES_FEEDBACKS, title: 'Отзывы' },
  { link: AppRoute.WILDBERRIES_PRODUCTS, title: 'Товары' },
];
