import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <div className="app-container">
      {/* Navigation - Glassmorphism */}
      <header className="site-header">
        <div className="nav-container">
          <Link to="/" className="logo">
            🚕 VOSS TAXI
          </Link>
          <div className="nav-links">
            <Link to="/om-oss" className={`nav-link ${isActive('/om-oss')}`}>Om Oss</Link>
            <Link to="/maxi-taxi" className={`nav-link ${isActive('/maxi-taxi')}`}>Maxi Taxi</Link>
            <Link to="/pakker" className={`nav-link ${isActive('/pakker')}`}>Pakker</Link>
            <Link to="/galleri" className={`nav-link ${isActive('/galleri')}`}>Galleri</Link>
            <Link to="/kontakt" className={`nav-link ${isActive('/kontakt')}`}>Kontakt</Link>
            <a href="tel:07000" className="book-btn">Bestill nå</a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-logo">VOSS TAXI SA</div>
          <div className="footer-text">
            <p>Stasjonsovergangen 1, 5700 Voss</p>
            <p>Tlf: (+47) 56 51 13 40 | post@vosstaxi.no</p>
          </div>
          <div className="footer-text">
            <p>© {new Date().getFullYear()} Voss Taxi SA. Alle rettigheter reservert.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

