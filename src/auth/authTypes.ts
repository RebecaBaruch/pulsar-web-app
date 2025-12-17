// authTypes.ts
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "CLIENT" | "SPECIALIST";
}
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  subject: string;
  issuedAt: string;
  expiresIn: number;
  user: AuthUser;
}

// authTypes.ts
export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>; // ← adicionado
}
