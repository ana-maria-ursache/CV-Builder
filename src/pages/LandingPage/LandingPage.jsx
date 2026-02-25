import './LandingPage.css';
import '../../utils/i18n';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t } = useTranslation();

  const navigateToCVBuilder = () => {
    window.location.href = '/builder/:id';
  };

  return (
    <div className="landing-page-container">
      <div className="title">{t('landing-page-title')}</div>
      <div className="mission">{t('landing-page-mission')}</div>
      <div className="description">{t('landing-page-description')}</div>
      <button className="custom-btn" onClick={navigateToCVBuilder}>
        {t('landing-page-btn')}
      </button>
    </div>
  );
}
