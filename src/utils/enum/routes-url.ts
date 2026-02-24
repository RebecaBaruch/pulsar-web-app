export enum RoutesUrls {
  BASE_URL = "/",
  FIND_SPECIALIST = "/find-specialist",
  SPECIALIST_DETAILS = "/specialist",
  USER_TYPE = "/login/user-type",
  LOGIN = "/login/form",
  CLIENT_REGISTER = "/client-register",
  CLIENT_HOME = "/client-user/home",
  CLIENT_SESSIONS = "/client-user/sessions",
  USER_PROFILE = "/client-user/profile",
  SPECIALIST_HOME = "/specialist-user/home",
  AUTH_SIGNIN = "/api/auth/signin",
}

export type RouteUrl =
  | RoutesUrls.BASE_URL
  | RoutesUrls.FIND_SPECIALIST
  | RoutesUrls.SPECIALIST_DETAILS
  | RoutesUrls.USER_PROFILE
  | RoutesUrls.USER_TYPE
  | RoutesUrls.LOGIN
  | RoutesUrls.CLIENT_REGISTER
  | RoutesUrls.CLIENT_HOME
  | RoutesUrls.CLIENT_SESSIONS
  | RoutesUrls.SPECIALIST_HOME
  | RoutesUrls.AUTH_SIGNIN;
