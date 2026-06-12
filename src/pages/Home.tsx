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
        <div className="spinner"></div>
        <span>Laster inn system...</span>
      </div>
    );
  }

  return (
    <>
      <header className="hero">
        <div style={{ display: 'inline-block', background: 'rgba(250, 204, 21, 0.2)', color: 'var(--primary)', padding: '0.5rem 1.5rem', borderRadius: '999px', fontWeight: '800', marginBottom: '2rem', border: '1px solid rgba(250, 204, 21, 0.5)' }}>Døgnåpen Sentral</div>
        <h1 className="hero-title">{data?.title}</h1>
        <p className="hero-desc">{data?.description}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <a href={`tel:${data?.phone}`} className="hero-btn" style={{ background: 'var(--primary)', color: 'var(--bg-dark)' }}>
            📞 Ring {data?.phone}
          </a>
          <a href="https://booking.taxilink.no" target="_blank" rel="noopener noreferrer" className="hero-btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            💻 Bestill på nett
          </a>
        </div>
      </header>

      <section className="content-wrapper" style={{ marginTop: '-4rem' }}>
        <h2 className="page-title" style={{ fontSize: '2.5rem' }}>Våre tjenester</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--bg-dark)' }}>✈️ Flyplasstransport</h3>
            <p style={{ color: 'var(--text-muted)' }}>Direkte transport til og fra Bergen Lufthavn Flesland med faste priser. Bestill i god tid for garantert plass til ønsket tidspunkt.</p>
          </div>
          <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--bg-dark)' }}>🚐 Maxi Taxi</h3>
            <p style={{ color: 'var(--text-muted)' }}>Voss Taxi har lang erfaring med pasient og rullestoltransport, i tillegg til at våre minibusser tar større grupper.</p>
          </div>
          <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--bg-dark)' }}>📦 Pakkekjøring</h3>
            <p style={{ color: 'var(--text-muted)' }}>Rask og sikker dør-til-dør levering av små og mellomstore pakker på Voss og nærområdet.</p>
          </div>
          <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--bg-dark)' }}>🏔️ Sightseeing</h3>
            <p style={{ color: 'var(--text-muted)' }}>Våre sjåfører kan vise deg de beste severdighetene her på Voss. Du kan stoppe undervegs for å besøke destinasjonene.</p>
          </div>
        </div>
      </section>
    </>
  );
}

