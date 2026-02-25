import emailjs from '@emailjs/browser';

export const sendEmail = async (templateParams, serviceId, templateId, publicKey) => {
  emailjs.init({ publicKey: publicKey });

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams);
    console.log('SUCCESS!', response.status, response.text);
    return response;
  } catch (error) {
    console.error('EMAILJS FAILED:', error);
    throw error;
  }
};
