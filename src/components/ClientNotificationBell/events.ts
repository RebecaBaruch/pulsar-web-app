export const SESSION_REVIEW_SUBMITTED_EVENT = "pulsar:session-review-submitted";

export type SessionReviewSubmittedDetail = {
  notificationId: string;
};

export function notifySessionReviewSubmitted(notificationId: string) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<SessionReviewSubmittedDetail>(SESSION_REVIEW_SUBMITTED_EVENT, {
      detail: { notificationId },
    }),
  );
}
