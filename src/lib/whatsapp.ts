// WhatsApp utility functions

const WHATSAPP_PHONE = "916374507535"; // Format: country code + number without +

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface AppointmentFormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  date: string;
  time: string;
  description: string;
}

/**
 * Format contact form data into WhatsApp message
 */
export const formatContactWhatsAppMessage = (data: ContactFormData): string => {
  return `*New Contact Inquiry*

*Name:* ${data.firstName} ${data.lastName}
*Email:* ${data.email}
*Phone:* ${data.phone}
*Subject:* ${data.subject}

*Message:*
${data.message}

---
Sent from Adithya Constructions website`;
};

/**
 * Format appointment form data into WhatsApp message
 */
export const formatAppointmentWhatsAppMessage = (data: AppointmentFormData): string => {
  const serviceNames: Record<string, string> = {
    turnkey: "Residential House Construction",
    commercial: "Commercial Construction",
    architectural: "Architectural Designing",
    structural: "Structural Designing",
    approval: "Building Plan Approval",
    other: "Other",
  };

  return `*New Appointment Request*

*Client Details:*
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Location: ${data.location}

*Appointment Details:*
Service: ${serviceNames[data.service] || data.service}
Preferred Date: ${data.date}
Preferred Time: ${data.time}

*Project Description:*
${data.description || "No description provided"}

---
Sent from Adithya Constructions website`;
};

/**
 * Open WhatsApp with formatted message
 */
export const sendToWhatsApp = (message: string): void => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};

/**
 * Send contact form via WhatsApp
 */
export const sendContactViaWhatsApp = (data: ContactFormData): void => {
  const message = formatContactWhatsAppMessage(data);
  sendToWhatsApp(message);
};

/**
 * Send appointment request via WhatsApp
 */
export const sendAppointmentViaWhatsApp = (data: AppointmentFormData): void => {
  const message = formatAppointmentWhatsAppMessage(data);
  sendToWhatsApp(message);
};

