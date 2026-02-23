import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

export default function Navbar() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-title">
        KeyStroke
      </NavLink>

      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`nav-options ${isOpen ? 'mobile-open' : ''}`}>
        <NavLink to="/" className="nav-button" onClick={() => setIsOpen(false)}>
          {t('home')}
        </NavLink>
        <NavLink to="/builder/:id" className="nav-button" onClick={() => setIsOpen(false)}>
          {t('cv-builder')}
        </NavLink>
        <NavLink to="/contact" className="nav-button" onClick={() => setIsOpen(false)}>
          {t('contact')}
        </NavLink>
        <NavLink to="/auth" className="nav-button" onClick={() => setIsOpen(false)}>
          {t('login')}
        </NavLink>

        <div className="change-lng">
          <button
            className={`lng-btn ${i18n.language === 'en' ? 'active' : ''}`}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </button>
          <span className="separator">/</span>
          <button
            className={`lng-btn ${i18n.language === 'ro' ? 'active' : ''}`}
            onClick={() => i18n.changeLanguage('ro')}
          >
            RO
          </button>
        </div>
      </div>
    </nav>
  );
}
