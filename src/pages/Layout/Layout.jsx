import './Layout.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

export default function Layout() {
  return (
    <div className="main-container">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <footer>
        <p className="footer-text">&copy; 2026 KeyStroke. All rights reserved.</p>
      </footer>
    </div>
  );
}
