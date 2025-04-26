import emailjs from '@emailjs/browser';

interface EmailData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
}

export const emailService = {
  async sendOrder(data: EmailData) {
    try {
      const result = await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_name: 'Admin',
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          phone: data.phone,
          company: data.company,
        },
        'YOUR_PUBLIC_KEY'
      );

      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to send email:', error);
      return { success: false, error };
    }
  },
}; 