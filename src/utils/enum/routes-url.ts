export enum RoutesUrls {
  BASE_URL = '/',
  FIND_SPECIALIST = '/find-specialist',
  USER_TYPE = '/login/user-type',
  LOGIN = '/login/form',
  CLIENT_REGISTER = '/client-register',
  CLIENT_HOME = '/client-user/home',
  SPECIALIST_HOME = '/specialist-user/home',
}

export type RouteUrl =
  | RoutesUrls.BASE_URL
  | RoutesUrls.FIND_SPECIALIST
  | RoutesUrls.USER_TYPE
  | RoutesUrls.LOGIN
  | RoutesUrls.CLIENT_REGISTER
  | RoutesUrls.CLIENT_HOME
  | RoutesUrls.SPECIALIST_HOME;
  