// import { useState, useEffect } from 'react';
import supabase from '../../helper/supabaseClient';
import './Contact.css';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import '../../helper/i18n';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  const addToDatabase = async (values) => {
    const { data, error } = await supabase
      .from('responses-to-form')
      .insert([{ text: values.text, email: values.email }]);

    if (error) throw error;
    return data;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      text: '',
    },
    onSubmit: (value) => {
      addToDatabase(value);
      toast.success(t('toast-success'), { position: 'bottom-right' });
      formik.resetForm();
    },
  });

  return (
    <div className="contact-container">
      <h1 className="contact-title">{t('contact-us')}</h1>
      <form className="contact-form" onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
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
