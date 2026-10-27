export type SessionStatus =
  | "SCHEDULING"
  | "AWAITING_PAYMENT"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export type BackendSession = {
  sessionId: string;
  specialistId: string;
  clientId: string;
  startTime: string;
  endTime: string;
  status?: SessionStatus;
};

export type SpecialistType =
  | "PSICOLOGO"
  | "PSIQUIATRA"
  | "TERAPEUTA"
  | "EDUCADOR_FISICO"
  | "NUTRICIONISTA"
  | "ASSESSOR_FINANCEIRO";

export type BackendSpecialistDetails = {
  id: string;
  name: string;
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

export type BackendClientProfile = {
  name?: string;
  email?: string;
  telephone?: string;
  cpf?: string;
  birthday?: string;
  emergencyContact?: {
    name?: string;
    phoneNumber?: string;
    relationshipDegree?: string;
  };
  addressResponse?: {
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    neighbourhood?: string;
  };
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
