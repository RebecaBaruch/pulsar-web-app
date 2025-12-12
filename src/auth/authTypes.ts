export type LoginUserType = "client" | "specialist";

export interface AuthCredentials {
  username: string;
  password: string;
  userType: LoginUserType;
}

export interface AuthSession {
  token: string;
  type: LoginUserType;
  user: {
    id: string;
    name: string;
    email: string;
    type: LoginUserType;
  };
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  type: LoginUserType;

  user?: {
    id: string;
    name: string;
    email: string;
    type: LoginUserType;
  };
}
