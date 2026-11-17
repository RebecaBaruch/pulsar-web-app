import { AuthUser } from "@/auth/authTypes";

export type LocalUser = Partial<AuthUser> & {
  cpf?: string;
  birthDate?: string;
  phone?: string;
  emergencyName?: string;
  emergencyRelation?: string;
  emergencyPhone?: string;
  cep?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  uf?: string;
  billingPhone?: string;
};