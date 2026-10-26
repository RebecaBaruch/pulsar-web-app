export type EvaluationSpecialist = {
  notificationId?: string;
  name: string;
  role: string;
  credentialCode: string;
  photoUrl?: string;
};

export type EvaluationFormValues = {
  rating: number;
  comment: string;
};
