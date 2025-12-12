export type UserType = "client" | "specialist";

export interface AuthUser {
  id: string;
  name: string;
  type: UserType;
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}
