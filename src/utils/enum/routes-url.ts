export enum RoutesUrls {
  BASE_URL = '/',
  FIND_SPECIALIST = '/find-specialist',
}

export type RouteUrl =
  | RoutesUrls.BASE_URL
  | RoutesUrls.FIND_SPECIALIST;
  