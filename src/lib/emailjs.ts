import emailjs from '@emailjs/browser';

// EmailJS configuration
// Get these values from your EmailJS dashboard: https://dashboard.emailjs.com/
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || '';
const APPOINTMENT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_APPOINTMENT_TEMPLATE_ID || '';

// Initialize EmailJS
if (PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY);
}

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
 * Send contact form email to owner
 */
export const sendContactEmail = async (data: ContactFormData): Promise<void> => {
  if (!SERVICE_ID || !PUBLIC_KEY || !CONTACT_TEMPLATE_ID) {
    throw new Error(
      'EmailJS is not configured. Please set up EmailJS in your .env file or use WhatsApp instead. ' +
      'Visit https://dashboard.emailjs.com/ to get your configuration keys.'
    );
  }

  const templateParams = {
    from_name: `${data.firstName} ${data.lastName}`,
    from_email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
    to_email: 'adithyaconstructionscbe@gmail.com', // Owner's email
  };

  try {
    await emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, templateParams);
  } catch (error: unknown) {
    console.error('EmailJS error:', error);

    const e = error as { status?: number; text?: string };
    if (e?.status === 400) {
      if (e?.text?.includes('Public Key')) {
        throw new Error('EmailJS Public Key is invalid. Please check your .env file configuration.');
      }
      throw new Error(`EmailJS error: ${e?.text || 'Invalid configuration. Please check your EmailJS setup.'}`);
    }

    throw new Error(e?.text || 'Failed to send email. Please try again later or use WhatsApp instead.');
  }
};

/**
 * Send appointment request email to owner
 */
export const sendAppointmentEmail = async (data: AppointmentFormData): Promise<void> => {
  if (!SERVICE_ID || !PUBLIC_KEY || !APPOINTMENT_TEMPLATE_ID) {
    throw new Error(
      'EmailJS is not configured. Please set up EmailJS in your .env file or use WhatsApp instead. ' +
      'Visit https://dashboard.emailjs.com/ to get your configuration keys.'
    );
  }

  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    phone: data.phone,
    location: data.location,
    service: data.service,
    date: data.date,
    time: data.time,
    description: data.description || 'No description provided',
    to_email: 'adithyaconstructionscbe@gmail.com', // Owner's email
  };

  try {
    await emailjs.send(SERVICE_ID, APPOINTMENT_TEMPLATE_ID, templateParams);
  } catch (error: unknown) {
    console.error('EmailJS error:', error);

    const e = error as { status?: number; text?: string };
    if (e?.status === 400) {
      if (e?.text?.includes('Public Key')) {
        throw new Error('EmailJS Public Key is invalid. Please check your .env file configuration.');
      }
      throw new Error(`EmailJS error: ${e?.text || 'Invalid configuration. Please check your EmailJS setup.'}`);
    }

    throw new Error(e?.text || 'Failed to send appointment request. Please try again later or use WhatsApp instead.');
  }
};

/**
 * Check if EmailJS is properly configured
 */
export const isEmailJSConfigured = (): boolean => {
  return !!(SERVICE_ID && PUBLIC_KEY && (CONTACT_TEMPLATE_ID || APPOINTMENT_TEMPLATE_ID));
};

