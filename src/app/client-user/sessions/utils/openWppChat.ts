export function openWhatsAppChat(
  specialistPhone: string,
  specialistName: string,
  sessionDate: string,
  sessionTime: string,
) {
  if (!specialistPhone) return;
  const message = `Olá ${specialistName}, tudo bem? 
Gostaria de falar sobre nossa sessão agendada para ${sessionDate} às ${sessionTime}.`;

  const sanitizedPhone = specialistPhone.replace(/\D/g, "");

  const encodedMessage = encodeURIComponent(message);

  const url = `https://wa.me/${sanitizedPhone}?text=${encodedMessage}`;

  window.open(url, "_blank");
}
