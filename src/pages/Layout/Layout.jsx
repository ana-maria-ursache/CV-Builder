import './Layout.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import '../../helper/i18n';
import { useTranslation } from 'react-i18next';

export default function Layout() {
  const { t } = useTranslation();
  
  return (
    <div className="main-container">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <footer>
        <p className="footer-text">&copy; 2026 KeyStroke. {t('footer')}</p>
      </footer>
    </div>
  );
}
