import { useState, useEffect } from 'react';

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
          title: attributes.title || 'Voss Taxi SA',
          description: attributes.description || 'Trygg, rask og pålitelig transport i Voss og omegn.',
          phone: attributes.phone || '07000'
        });
        setLoading(false);
      })
      .catch(() => {
        setData({
          title: 'Voss Taxi SA',
          description: 'Trygg, rask og pålitelig transport i Voss og omegn. Døgnåpen sentral for din trygghet.',
          phone: '07000'
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="layout-loading">
        <span>Laster inn system...</span>
      </div>
    );
  }

  return (
    <>
      <header className="hero">
        <div className="hero-badge">Døgnåpen Sentral</div>
        <h1 className="hero-title">{data?.title}</h1>
        <p className="hero-desc">{data?.description}</p>
        <div className="hero-actions">
          <a href={`tel:${data?.phone}`} className="btn-primary">
            Ring {data?.phone}
          </a>
          <a href="https://booking.taxilink.no" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Bestill på nett
          </a>
        </div>
      </header>

      <section className="grid-section" id="tjenester">
        <h2 className="section-title">Våre tjenester</h2>
        <div className="bento-grid">
          <div className="bento-card bento-wide">
            <h3>Flyplasstransport</h3>
            <p>Direkte transport til og fra Bergen Lufthavn Flesland med faste priser. Bestill i god tid for garantert plass til ønsket tidspunkt.</p>
          </div>
          <div className="bento-card">
            <h3>Turkjøring</h3>
            <p>Sightseeing og persontransport i regionen for mindre grupper og bedrifter.</p>
          </div>
          <div className="bento-card">
            <h3>Pakkekjøring</h3>
            <p>Rask og sikker dør-til-dør levering av små og mellomstore pakker på Voss og nærområdet.</p>
          </div>
          <div className="bento-card" id="hittegods">
            <h3>Hittegods</h3>
            <p>Glemt noe i taxien? Kontakt oss så hjelper vi deg å finne det igjen. Vi tar vare på alt som blir funnet.</p>
          </div>
        </div>
      </section>
    </>
  );
}
