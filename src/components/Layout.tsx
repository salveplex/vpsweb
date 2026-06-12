import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <div className="app-container">
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="logo">
            VOSS <span>TAXI</span>
          </Link>
          <div className="nav-links">
            <Link to="/om-oss" className={`nav-link ${isActive('/om-oss')}`}>Om Oss</Link>
            <Link to="/maxi-taxi" className={`nav-link ${isActive('/maxi-taxi')}`}>Maxi Taxi</Link>
            <Link to="/tjenester" className={`nav-link ${isActive('/tjenester')}`}>Tjenester</Link>
            <Link to="/galleri" className={`nav-link ${isActive('/galleri')}`}>Galleri</Link>
            <Link to="/kontakt" className={`nav-link ${isActive('/kontakt')}`}>Kontakt</Link>
            <a href="tel:07000" className="book-btn">Bestill Nå</a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">VOSS <span>TAXI</span></div>
            <p className="footer-text">Døgnåpen sentral for trygg, rask og pålitelig transport i Voss og omegn.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-col">
              <h4>Kontakt</h4>
              <p className="footer-text">Tlf: (+47) 56 51 13 40</p>
              <p className="footer-text">post@vosstaxi.no</p>
              <p className="footer-text">Uttrågata 19, 5700 Voss</p>
            </div>
            <div className="footer-col">
              <h4>Lenker</h4>
              <Link to="/om-oss">Om Voss Taxi</Link>
              <Link to="/maxi-taxi">Maxi Taxi</Link>
              <a href="https://booking.taxilink.no">Bestill på nett</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} Voss Taxi SA. Alle rettigheter reservert.
        </div>
      </footer>
    </div>
  );
}

