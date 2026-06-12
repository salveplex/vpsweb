import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface PageData {
  title: string;
  content: string;
}

export default function Page() {
  const { slug } = useParams();
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_STRAPI_API_URL || 'http://85.190.102.196:1337';
    
    // We will query Strapi for pages filtering by slug
    fetch(`${apiUrl}/api/pages?filters[slug][$eq]=${slug}&populate=*`)
      .then((res) => {
        if (!res.ok) throw new Error('CMS error');
        return res.json();
      })
      .then((json) => {
        if (json.data && json.data.length > 0) {
          const attributes = json.data[0].attributes || json.data[0];
          setData({
            title: attributes.title,
            // Simple rich text render for now (will need markdown parser or rich text renderer later if needed)
            content: attributes.content,
          });
        } else {
          setData(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setData(null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="layout-loading">
        <span>Laster inn innhold...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <section className="page-section">
        <h1 className="page-title">404 - Siden finnes ikke</h1>
        <p>Beklager, vi fant ikke siden du lette etter.</p>
      </section>
    );
  }

  return (
    <section className="page-section">
      <h1 className="page-title">{data.title}</h1>
      <div className="page-content" dangerouslySetInnerHTML={{ __html: data.content }} />
    </section>
  );
}
