import supabase from '../../utils/supabaseClient';
import './Contact.css';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import env from '../../../config';
import { sendEmail } from '../../utils/sendEmail';

export default function Contact() {
  const { t } = useTranslation();

  const handleContactSubmit = async (values) => {
    try {
      const params = {
        name: values.name,
        email: values.email,
        subject: values.subject,
        text: values.message,
      };

      await sendEmail(params, env.emailJsServiceID, 'template_pvluwwg', env.emailJsKey);

      toast.success(t('toast-success'));
    } catch (error) {
      toast.error(error + '; ' + t('email-failed'));
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
        await Promise.all([addToDatabase(value), handleContactSubmit(value)]);
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
    <div className="contract">
      <div className="contact-text">
        <h1 id="contact-us-text">{t('contact-us-text')}</h1>
        <p id="contact-description">{t('contact-description')}</p>
      </div>
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
    </div>
  );
}
