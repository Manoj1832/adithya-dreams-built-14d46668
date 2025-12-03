import { sendToWhatsApp } from "@/lib/whatsapp";

export interface CareerApplicationData {
  position: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  resumeLink: string;
  message: string;
}

export const formatCareerApplicationMessage = (data: CareerApplicationData): string => {
  return `*New Career Application*

*Position:* ${data.position || "-"}
*Name:* ${data.name || "-"}
*Email:* ${data.email || "-"}
*Phone:* ${data.phone || "-"}
*Location:* ${data.location || "-"}
*Experience:* ${data.experience || "-"}
*Resume/Portfolio:* ${data.resumeLink || "-"}

*Message:*
${data.message || "-"}

---
Sent from Adithya Constructions website`;
};

export const sendCareerApplicationViaWhatsApp = (data: CareerApplicationData): void => {
  const message = formatCareerApplicationMessage(data);
  sendToWhatsApp(message);
};

