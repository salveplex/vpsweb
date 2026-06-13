export default function Home() {
  return (
    <section className="hero-section">
      <p className="hero-subtitle">Voss Taxi SA</p>
      <h1 className="hero-title">Taxi på Voss</h1>
      <p className="hero-text">
        Me tek på oss alle typar persontransport. Om de er eit stort reisefølgje har me Maxi Taxi med plass opp til 16 personar. Me har og minibuss som er tilpassa rullestolbrukarar med inntil 2 stolar på same tid. Av våre personbilar har vi både stasjonsvogner og 7/8 setarar med romsleg og god bagasjeplass.
      </p>
      
      <div className="hero-actions">
        <a href="tel:+4756511340" className="btn">
          Ring 56 51 13 40
        </a>
        <a href="https://web-page-voss-taxi.vercel.app/no" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
          Bestill online
        </a>
        <a href="http://voss-taxi-kalkulator.vercel.app" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
          Taxi Kalkulator
        </a>
      </div>
    </section>
  );
}
