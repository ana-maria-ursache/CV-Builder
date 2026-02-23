import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <p className="nav-title">KeyStroke</p>
        <div className="nav-options">
          <NavLink to="/" className="nav-button">
            Home
          </NavLink>
          <NavLink to="/watchlist" className="nav-button">
            CV Builder
          </NavLink>
          <NavLink to="/watchlist" className="nav-button">
            Contact
          </NavLink>
        </div>
      </nav>
    </>
  );
}
