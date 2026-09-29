export enum RoutesUrls {
  BASE_URL = "/",
  FIND_SPECIALIST = "/find-specialist",
  SPECIALIST_DETAILS = "/specialist",
  USER_TYPE = "/login/user-type",
  LOGIN = "/login/form",
  CLIENT_REGISTER = "/client-register",
  RESET_PASSWORD = "/reset-password",
  CLIENT_HOME = "/client-user/home",
  CLIENT_SESSIONS = "/client-user/sessions",
  USER_PROFILE = "/client-user/profile",
  SPECIALIST_HOME = "/specialist-user/home",
  SPECIALIST_SCHEDULE = "/specialist-user/schedule",
  SPECIALIST_AVAILABILITY = "/specialist-user/availability",
  SPECIALIST_SETTINGS = "/specialist-user/settings",
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
  | RoutesUrls.RESET_PASSWORD
  | RoutesUrls.CLIENT_HOME
  | RoutesUrls.CLIENT_SESSIONS
  | RoutesUrls.SPECIALIST_HOME
  | RoutesUrls.SPECIALIST_SCHEDULE
  | RoutesUrls.SPECIALIST_AVAILABILITY
  | RoutesUrls.SPECIALIST_SETTINGS
  | RoutesUrls.AUTH_SIGNIN;
