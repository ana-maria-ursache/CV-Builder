import supabase from '../../helper/supabaseClient';
import './Contact.css';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import '../../helper/i18n';
import { useTranslation } from 'react-i18next';
import env from '../../../config';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const { t } = useTranslation();

  const sendEmail = async (value) => {
    var templateParams = {
      name: value.name,
      email: value.email,
      subject: value.subject,
      text: value.text,
    };

    emailjs.init({ publicKey: env.emailJsKey });

    try {
      const response = await emailjs.send(env.emailJsServiceID, 'template_pvluwwg', templateParams);
      console.log('SUCCESS!', response.status, response.text);
      return response;
    } catch (error) {
      console.error('EMAILJS FAILED:', error);
      throw new Error(t('email-failed'));
    }
  };

  const addToDatabase = async (value) => {
    const { data, error } = await supabase
      .from('responses-form')
      .insert([{ name: value.name, email: value.email, subject: value.subject, text: value.text }]);

    if (error) {
      console.error('SUPABASE FAILED:', error);
      throw error;
    }
    return data;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      text: '',
    },
    onSubmit: async (value, actions) => {
      try {
        await Promise.all([addToDatabase(value), sendEmail(value)]);
        toast.success(t('toast-success'), { position: 'bottom-right' });
        actions.resetForm();
      } catch (error) {
        toast.error(t('toast-error-generic') || t('submit-failed') + error, {
          position: 'bottom-right',
        });
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <div className="contact-container">
      <h1 className="contact-title">{t('contact-us')}</h1>
      <form className="contact-form" onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">{t('username')}</label>
          <input
            required
            id="name"
            name="name"
            type="text"
            placeholder={t('your-name')}
            onChange={formik.handleChange}
            value={formik.values.name}
            className="contact-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">{t('email')}</label>
          <input
            required
            id="email"
            name="email"
            type="email"
            placeholder={t('your-email')}
            onChange={formik.handleChange}
            value={formik.values.email}
            className="contact-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="subject">{t('subject')}</label>
          <input
            required
            id="subject"
            name="subject"
            type="text"
            placeholder={t('your-subject')}
            onChange={formik.handleChange}
            value={formik.values.subject}
            className="contact-input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="text">{t('message')}</label>
          <textarea
            required
            id="text"
            name="text"
            placeholder={t('your-message')}
            onChange={formik.handleChange}
            value={formik.values.text}
            className="contact-input contact-textarea"
          />
        </div>

        <button className="custom-btn" type="submit">
          {t('submit-btn')}
        </button>
      </form>
    </div>
  );
}
