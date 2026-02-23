import './Contact.css';
import { useFormik } from 'formik';
import { toast } from 'sonner';

export default function Contact() {
  const formik = useFormik({
    initialValues: {
      email: '',
      text: '',
    },
    onSubmit: () => {
      toast.success('Mesaj trimis cu succes!', { position: 'bottom-right' });
      formik.resetForm();
    },
  });

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contactează-ne</h1>
      <form className="contact-form" onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="EMAIL-UL TAU..."
            onChange={formik.handleChange}
            value={formik.values.email}
            className="contact-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="text">Mesaj</label>
          <textarea
            id="text"
            name="text"
            placeholder="SCRIE MESAJUL DORIT..."
            onChange={formik.handleChange}
            value={formik.values.text}
            className="contact-input contact-textarea"
          />
        </div>

        <button className="custom-btn" type="submit">
          Trimite
        </button>
      </form>
    </div>
  );
}
