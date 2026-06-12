import { Outlet, Link, useLocation } from 'react-router-dom';
import { Phone, FileText } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="app-container">
      <header className="site-header">
        <div className="header-top">
          <Link to="/" className="logo-container">
            <img src="https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/2.3___serialized1.png?etag=W%2F%22b9762-66313ecf%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=543%2B308" alt="Voss Taxi SA" />
          </Link>
          <div className="header-actions">
            <a href="tel:+4756511340" className="phone-number">
              <Phone size={24} /> Tlf: (+47) 56 51 13 40
            </a>
            <a href="https://web-page-voss-taxi.vercel.app/no" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Bestill / Order
            </a>
            <a href="http://voss-taxi-kalkulator.vercel.app" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
              Taxi Kalkulator
            </a>
          </div>
        </div>
        
        <nav className="main-nav">
          <ul className="nav-list">
            <li><Link to="/om-oss" className={`nav-link ${isActive('/om-oss')}`}>Om oss</Link></li>
            <li><Link to="/om-meg" className={`nav-link ${isActive('/om-meg')}`}>Tenester</Link></li>
            <li><Link to="/pakker" className={`nav-link ${isActive('/pakker')}`}>Turist</Link></li>
            <li><Link to="/trygt-heim" className={`nav-link ${isActive('/trygt-heim')}`}>Ungdom</Link></li>
            <li><Link to="/kontakt" className={`nav-link ${isActive('/kontakt')}`}>Kontakt</Link></li>
            <li><Link to="/galleri" className={`nav-link ${isActive('/galleri')}`}>Galleri</Link></li>
            <li><Link to="/nyheter-og-praktisk-informasjon" className={`nav-link ${isActive('/nyheter-og-praktisk-informasjon')}`}>Bli sjåfør</Link></li>
            <li><Link to="/maxi-taxi" className={`nav-link ${isActive('/maxi-taxi')}`}>Rullestol</Link></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Voss Taxi SA</h3>
            <p>Uttrågata 19</p>
            <p>5700 Voss</p>
          </div>
          <div className="footer-section">
            <h3>Kontakt</h3>
            <p>Telefon: +47 56 51 13 40</p>
            <p>Maxi-Taxi: +47 93 24 98 44</p>
            <p>E-post: post@vosstaxi.no</p>
          </div>
          <div className="footer-section">
            <h3>Last ned appen vår</h3>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <a href="https://apps.apple.com/no/app/snappy-taxi/id6479620974" target="_blank" rel="noreferrer">
                <img src="https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/App-Store-Icon-300x104.png?etag=%222c90-5f0836be%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=192%2B66" alt="App Store" style={{ height: '40px' }}/>
              </a>
              <a href="https://play.google.com/store/apps/details?id=no.snappytaxi.passenger&hl=no" target="_blank" rel="noreferrer">
                <img src="https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/google-play-badge.png?etag=%2290f6-5f0836be%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=190%2B66" alt="Google Play" style={{ height: '40px' }}/>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © Voss Taxi SA</p>
        </div>
      </footer>
    </div>
  );
}
