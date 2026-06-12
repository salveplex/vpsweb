import { useState, useEffect } from 'react';
import { PhoneCall, CalendarCheck, Plane, BusFront, Package, Map } from 'lucide-react';

interface FrontpageData {
  title: string;
  description: string;
  phone: string;
}

export default function Home() {
  const [data, setData] = useState<FrontpageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_STRAPI_API_URL || 'http://85.190.102.196:1337';
    
    fetch(`${apiUrl}/api/frontpage?populate=*`)
      .then((res) => {
        if (!res.ok) throw new Error('CMS error');
        return res.json();
      })
      .then((json) => {
        const attributes = json.data?.attributes || json.data || {};
        setData({
          title: attributes.title || 'Din Lokale Taxi',
          description: attributes.description || 'Trygg, rask og pålitelig transport i Voss og omegn. Døgnåpen sentral for din trygghet.',
          phone: attributes.phone || '07000'
        });
        setLoading(false);
      })
      .catch(() => {
        setData({
          title: 'Din Lokale Taxi',
          description: 'Trygg, rask og pålitelig transport i Voss og omegn. Døgnåpen sentral for din trygghet.',
          phone: '07000'
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="layout-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      {/* Video Hero Section */}
      <section className="hero-video-wrapper">
        <video 
          className="hero-video" 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1624623277028-1b2c4c8d7f72?q=80&w=2070&auto=format&fit=crop"
        >
          <source src="https://cdn.pixabay.com/video/2020/05/26/40149-425114565_large.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">Døgnåpen Sentral</div>
          <h1 className="hero-title">
            VOSS <span>TAXI</span>
          </h1>
          <p className="hero-desc">{data?.description}</p>
          <div className="hero-actions">
            <a href={`tel:${data?.phone}`} className="btn-primary">
              <PhoneCall size={20} />
              Ring {data?.phone}
            </a>
            <a href="https://booking.taxilink.no" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <CalendarCheck size={20} />
              Bestill på nett
            </a>
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="services-section" id="tjenester">
        <div className="section-header">
          <h2 className="section-title">Våre tjenester</h2>
        </div>
        <div className="bento-grid">
          <div className="bento-card">
            <div className="bento-icon"><Plane size={32} /></div>
            <h3>Flyplasstransport</h3>
            <p>Direkte transport til og fra Bergen Lufthavn Flesland med faste priser. Bestill i god tid for garantert plass til ønsket tidspunkt.</p>
          </div>
          <div className="bento-card">
            <div className="bento-icon"><BusFront size={32} /></div>
            <h3>Maxi Taxi</h3>
            <p>Vi har lang erfaring med pasient og rullestoltransport. Våre store minibusser passer perfekt for idrettslag og større grupper.</p>
          </div>
          <div className="bento-card">
            <div className="bento-icon"><Package size={32} /></div>
            <h3>Pakkekjøring</h3>
            <p>Rask og sikker dør-til-dør levering av små og mellomstore pakker på Voss og i nærområdet. Vi er din lokale budbil.</p>
          </div>
          <div className="bento-card">
            <div className="bento-icon"><Map size={32} /></div>
            <h3>Sightseeing</h3>
            <p>Opplev Voss! Våre sjåfører kan vise deg de beste severdighetene som Tvindefossen, Skjervsfossen og Bordalsgjelet.</p>
          </div>
        </div>
      </section>
    </>
  );
}

