import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="app-container">
      <header className="site-header">
        <div className="header-inner">
          <div className="header-top">
            <Link to="/" className="logo">
              Voss Taxi SA
            </Link>
            <div className="header-actions">
              <a href="tel:+4756511340" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '14px' }}>
                Ring 56 51 13 40
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
        </div>
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
            <p>Tlf: +47 56 51 13 40</p>
            <p>Maxi-Taxi: +47 93 24 98 44</p>
            <p>post@vosstaxi.no</p>
          </div>
          <div className="footer-section">
            <h3>Snappy Taxi App</h3>
            <div className="app-badges">
              <a href="https://apps.apple.com/no/app/snappy-taxi/id6479620974" target="_blank" rel="noreferrer" className="app-badge">
                <img src="https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/App-Store-Icon-300x104.png?etag=%222c90-5f0836be%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=192%2B66" alt="App Store" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=no.snappytaxi.passenger&hl=no" target="_blank" rel="noreferrer" className="app-badge">
                <img src="https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/google-play-badge.png?etag=%2290f6-5f0836be%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=190%2B66" alt="Google Play" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
