import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="page-hero" style={{ backgroundColor: 'transparent', padding: '0', marginBottom: '2rem', border: 'none' }}>
        <img 
          src="https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240522_130220.jpg?etag=%2239d36c-6652016f%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1160%2B870&extract=0%2B198%2B1160%2B395&quality=85" 
          alt="Voss Taxi Bil" 
          style={{ width: '100%', height: 'auto', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        />
        <h2 style={{ marginTop: '2rem', fontSize: '2rem', textAlign: 'center' }}>Du køyrer trygt, med oss frå Voss!</h2>
        <p style={{ textAlign: 'center', fontSize: '1.25rem', color: '#666' }}>På vegen for deg, 24 timar i døgnet. 365 dagar i året.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center' }}>
          <img 
            src="https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180623_214943.jpg?etag=%22386370-5f083417%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1020%2B765&extract=0%2B0%2B1020%2B720&quality=85" 
            alt="Historia Vår"
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }}
          />
          <Link to="/om-oss" className="btn btn-outline">Historia vår</Link>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img 
            src="https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180627_120230.jpg?etag=%2254054c-5f083445%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1020%2B765&extract=0%2B0%2B1020%2B720&quality=85" 
            alt="Personvern"
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }}
          />
          <Link to="/kontakt" className="btn btn-outline">Personvern</Link>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img 
            src="https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180523_114429.jpg?etag=%2257aec7-5f08344c%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=960%2B720&extract=0%2B0%2B933%2B720&quality=85" 
            alt="Transportvilkår"
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }}
          />
          <Link to="/om-oss" className="btn btn-outline">Transportvilkår</Link>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Snappy Taxi</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <img 
            src="https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/1.png?etag=%222048b2-682cc693%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=145%2B181"
            alt="Snappy Taxi App"
            style={{ width: '145px', height: '181px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="https://apps.apple.com/no/app/snappy-taxi/id6479620974" target="_blank" rel="noreferrer">
              <img src="https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/App-Store-Icon-300x104.png?etag=%222c90-5f0836be%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=192%2B66" alt="Last ned i App Store" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=no.snappytaxi.passenger&hl=no" target="_blank" rel="noreferrer">
              <img src="https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/google-play-badge.png?etag=%2290f6-5f0836be%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=190%2B66" alt="Tilgjengelig på Google Play" />
            </a>
          </div>
        </div>
      </div>

      <div className="prose">
        <h2>Velkommen til Voss Taxi</h2>
        <p>
          Me tek på oss alle typar persontransport. Om de er eit stort reisefølgje har me Maxi Taxi med plass opp til 16 personar. Me har og minibuss som er tilpassa rullestolbrukarar med inntil 2 stolar på same tid. Av våre personbilar har vi både stasjonsvogner og 7/8 setarar med romsleg og god bagasjeplass.
        </p>
        <p>
          Du finn oss i Uttrågata 19, i sentrum av Voss.
        </p>
        <p>
          Me kan også ta på oss spesialtransport av pakkar og gods, dersom du har ei sending som hastar!
        </p>
      </div>
    </>
  );
}
