// import { useState, useEffect } from 'react';
// import supabase from '../../helper/supabaseClient';
import './LandingPage.css';
import '../../helper/i18n';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t } = useTranslation();

  // const [instruments, setInstruments] = useState([]);

  // async function getInstruments() {
  //   const { data } = await supabase.from('instruments').select();
  //   setInstruments(data);
  // }

  // useEffect(() => {
  //   getInstruments();
  // }, []);

  const navigateToCVBuilder = () => {
    window.location.href = '/builder/:id';
  };

  return (
    // <ul>
    //   {instruments.map((instrument) => (
    //     <li key={instrument.name}>{instrument.name}</li>
    //   ))}
    // </ul>
    <div className="landing-page-container">
      {/* Landing Page */}
      <div className="title">{t('landing-page-title')}</div>
      <div className="description">{t('landing-page-description')}</div>
      <button className="custom-btn" onClick={navigateToCVBuilder}>
        {t('landing-page-btn')}
      </button>
    </div>
  );
}
