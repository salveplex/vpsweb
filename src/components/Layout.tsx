import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="hallmark-layout">
      {/* N1 Utility Nav */}
      <nav className="nav-bar">
        <Link to="/" className="nav-brand">VOSS TAXI</Link>
        <div className="nav-links">
          <Link to="/om-oss">Om Oss</Link>
          <Link to="/tjenester">Tjenester</Link>
          <Link to="/galleri">Galleri</Link>
          <Link to="/kontakt">Kontakt</Link>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      {/* Ft1 Utility Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <strong>Voss Taxi SA</strong>
            <p>Stasjonsovergangen 1<br/>5700 Voss</p>
          </div>
          <div className="footer-col">
            <strong>Kontakt</strong>
            <p>Tlf: 07000<br/>post@vosstaxi.no</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Voss Taxi SA. Alle rettigheter reservert.</p>
        </div>
      </footer>
    </div>
  );
}
