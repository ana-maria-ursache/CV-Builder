import { NavLink } from 'react-router-dom';
import './Navbar.css';
import '../../helper/i18n';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <nav className="navbar">
        <p className="nav-title">KeyStroke</p>
        <div className="nav-options">
          <NavLink to="/" className="nav-button">
            {t('home')}
          </NavLink>
          <NavLink to="/builder/:id" className="nav-button">
            {t('cv-builder')}
          </NavLink>
          <NavLink to="/contact" className="nav-button">
            {t('contact')}
          </NavLink>
          <NavLink to="/auth" className="nav-button">
            {t('login')}
          </NavLink>
          <div className="change-lng">
            <button
              className={`lng-btn ${i18n.language === 'en' ? 'active' : ''}`}
              onClick={() => changeLanguage('en')}
            >
              EN
            </button>
            <span className="separator">/</span>
            <button
              className={`lng-btn ${i18n.language === 'ro' ? 'active' : ''}`}
              onClick={() => changeLanguage('ro')}
            >
              RO
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
