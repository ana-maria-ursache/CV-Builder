import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import supabase from '../../utils/supabaseClient';
import { clearUser } from '../../store/userSlice';
import { getInitialTheme, applyTheme } from '../../utils/themes';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(getInitialTheme() === 'dark-theme');

  const { i18n, t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, isAdmin } = useSelector((state) => state.user);

  useEffect(() => {
    const theme = isDark ? 'dark-theme' : 'light-theme';
    applyTheme(theme);
  }, [isDark]);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  console.log('isLoggedIn:', isLoggedIn, 'isAdmin:', isAdmin);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Eroare la deconectare: ' + error.message);
    } else {
      dispatch(clearUser());
      setIsOpen(false);
      navigate('/');
    }
  };

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
        <NavLink to="/builder" className="nav-button" onClick={() => setIsOpen(false)}>
          {t('cv-builder')}
        </NavLink>
        {isLoggedIn ? (
          <NavLink to="/mycvs" className="nav-button" onClick={() => setIsOpen(false)}>
            {t('my-cvs')}
          </NavLink>
        ) : null}
        {!isAdmin ? (
          <NavLink to="/contact" className="nav-button" onClick={() => setIsOpen(false)}>
            {t('contact')}
          </NavLink>
        ) : (
          <NavLink to="/dashboard" className="nav-button" onClick={() => setIsOpen(false)}>
            {t('dashboard')}
          </NavLink>
        )}
        {isLoggedIn ? (
          <button className="nav-button logout-btn" onClick={handleLogout}>
            {t('logout') || 'Logout'}
          </button>
        ) : (
          <NavLink to="/auth" className="nav-button" onClick={() => setIsOpen(false)}>
            {t('login')}
          </NavLink>
        )}

        <div className="change-lng">
          <div>
            <button
              className={`lng-btn ${i18n.language === 'en' ? 'active' : ''}`}
              onClick={() => i18n.changeLanguage('en')}
            >
              EN
            </button>
            <span className="separator"> / </span>
            <button
              className={`lng-btn ${i18n.language === 'ro' ? 'active' : ''}`}
              onClick={() => i18n.changeLanguage('ro')}
            >
              RO
            </button>
          </div>
          <input type="checkbox" onChange={handleThemeToggle} class="theme-checkbox" />
        </div>
      </div>
    </nav>
  );
}
