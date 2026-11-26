export type SessionStatus =
  | "SCHEDULING"
  | "AWAITING_PAYMENT"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export type SpecialistType =
  | "PSICOLOGO"
  | "PSIQUIATRA"
  | "TERAPEUTA"
  | "EDUCADOR_FISICO"
  | "NUTRICIONISTA"
  | "ASSESSOR_FINANCEIRO";

export type BackendSession = {
  sessionId: string;
  specialistId: string;
  clientId: string;
  startTime: string;
  endTime: string;
  status?: SessionStatus;
  specialistName?: string;
  registrationNumber?: string;
  specialistType?: SpecialistType;
};

/** `GET /api/clients/me/sessions` — `ClientSessionResponse`. */
export type BackendClientSession = {
  sessionId: string;
  startsAt: string;
  endsAt: string;
  status?: SessionStatus;
  specialistId: string;
  specialistName?: string;
  registrationNumber?: string;
  specialistType?: SpecialistType;
};

/** `GET /api/clients/me/sessions` — `ClientSessionsResponse`. */
export type BackendClientSessionsResponse = {
  futureSessions?: BackendClientSession[];
  history?: BackendClientSession[];
};

export type BackendSpecialistDetails = {
  id: string;
  name: string;
  telephone?: string;
  phone?: string;
  registrationNumber?: string;
  city?: string;
  state?: string;
  specialistType?: SpecialistType;
  price?: number;
  sessionsCompleted?: number;
  presentation?: {
    about?: string;
    personalDescription?: string;
    presentationVideoUrl?: string;
    base64Image?: string;
    academicHistory?: string[];
    specializations?: string[];
    therapeuticApproaches?: string[];
  };
};

export type BackendAddressResponse = {
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  neighbourhood?: string;
};

export type BackendEmergencyContact = {
  name?: string;
  phoneNumber?: string;
  relationshipDegree?: string;
};

/**
 * Contrato de leitura `GET /api/users/me` (Java).
 * O CPF não vem nesse endpoint; o BFF complementa via `GET /api/users/{userId}`.
 */
export type BackendClientProfile = {
  name?: string;
  email?: string;
  telephone?: string;
  cpf?: string;
  birthday?: string;
  emergencyContact?: BackendEmergencyContact;
  addressResponse?: BackendAddressResponse;
};

/** Contrato de escrita `PATCH /api/users/me` — mesmos nomes do backend. */
export type BackendClientProfilePatch = {
  name?: string;
  email?: string;
  telephone?: string;
  cpf?: string;
  birthday?: string;
  emergencyContact?: BackendEmergencyContact;
  addressResponse?: BackendAddressResponse;
};

export type PaymentMethodBackend =
  | "CREDIT_CARD"
  | "BOLETO"
  | "PIX"
  | "DEBIT_CARD";

export type CreatePaymentRequest = {
  sessionId: string;
  specialistId: string;
  clientId: string;
  price: number;
  discount: number;
  paymentMethod: PaymentMethodBackend;
};

export type PaymentProcessedResponse = {
  paymentId: string;
  paymentUrl: string;
};

export type ScheduleSessionRequest = {
  clientId: string;
  specialistId: string;
  startTime: string;
  endTime: string;
};

export type ScheduleSessionResponse = {
  sessionId: string;
  specialistId: string;
  clientId: string;
  startTime: string;
  endTime: string;
};

/** `POST /api/auth/register` — cadastro de cliente (Java). */
export type BackendRegistrationAddress = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  neighbourhood: string;
};

export type BackendRegistrationEmergencyContact = {
  name: string;
  phoneNumber: string;
  relationshipDegree?: string;
};

export type BackendClientRegistrationRequest = {
  name: string;
  cpf: string;
  telephone: string;
  email: string;
  password: string;
  role: "CLIENT";
  dateOfBirth: string;
  address: BackendRegistrationAddress;
  emergencyContact: BackendRegistrationEmergencyContact;
};

export type BackendClientRegistrationResponse = {
  userId: string;
};

/** `POST /api/auth/reset-password/request` — dispara o e-mail de recuperação. */
export type BackendResetPasswordEmailRequest = {
  email: string;
};

/** `POST /api/auth/reset-password/confirm` — define a nova senha com o token do e-mail. */
export type BackendResetPasswordRequest = {
  token: string;
  newPassword: string;
};
