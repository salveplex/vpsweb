const fs = require('fs');

function fixFiles() {
    // 1. Fix fallback.ts
    let fallback = fs.readFileSync('src/content/fallback.ts', 'utf-8');
    
    // a) Remove the image resize params for Historia images
    fallback = fallback.replace(/&resize=.*?&extract=.*?(?=&|")/g, '');
    
    // b) Remove pages from top menu (Historia, Transportvilkar, Personvern)
    // We remove them from the layout nav.
    fallback = fallback.replace(/\{\s*id:\s*'[a-zA-Z0-9-]+',\s*locale:\s*'(no|en)',\s*label:\s*'(Historia vår|Our History|Transportvilkår|Terms & Conditions|Personvern|Privacy Policy)',\s*value:\s*'\/[a-z]+\/(historia-var|transportvilkar|personvern)',\s*sort:\s*\d+\s*\},?/g, '');
    
    // c) Inject Personvern
    const personvernText = fs.readFileSync('personvern_clean.txt', 'utf-8');
    const pRegex = /(slug:\s*'personvern',\s*title:\s*'Personvern',\s*summary:\s*'.*?',\s*blocks:\s*\[\s*\{\s*type:\s*'rich_text',\s*body:\s*`)([\s\S]*?)(`\s*\}\s*\]\s*\})/g;
    fallback = fallback.replace(pRegex, (match, p1, p2, p3) => p1 + personvernText + p3);
    
    // d) Inject Vilkar
    const vilkarText = fs.readFileSync('vilkar_fixed.txt', 'utf-8');
    const vRegex = /(slug:\s*'transportvilkar',\s*title:\s*'Transportvilkår',\s*summary:\s*'.*?',\s*blocks:\s*\[\s*\{\s*type:\s*'rich_text',\s*body:\s*`)([\s\S]*?)(`\s*\}\s*\]\s*\})/g;
    fallback = fallback.replace(vRegex, (match, p1, p2, p3) => p1 + vilkarText + p3);
    
    fs.writeFileSync('src/content/fallback.ts', fallback, 'utf-8');

    // 2. Fix App.tsx
    let app = fs.readFileSync('src/App.tsx', 'utf-8');
    
    // a) Remove unused imports
    app = app.replace(/DeviceMobile,\s*/g, '');
    
    // b) Image component override
    const imgReplacement = `img: ({ src, alt }) => {
                        const isBadge = src && (src.includes('app-store') || src.includes('google-play'));
                        if (isBadge) {
                           return (
                             <img 
                               src={src || ''} 
                               alt={alt} 
                               className="inline-block transition-transform hover:scale-[1.05]" 
                               style={{ height: '56px', width: 'auto', margin: '0 16px 16px 0', borderRadius: '8px' }} 
                             />
                           );
                        }
                        return (
                          <span className="my-12 block">
                            <img 
                              src={src || ''} 
                              alt={alt} 
                              onClick={() => src && openLightbox(src)} 
                              className="mx-auto cursor-pointer rounded-2xl border-[6px] object-cover shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.02]" 
                              style={{ 
                                borderColor: 'var(--surface)', 
                                backgroundColor: 'var(--surface)',
                                display: 'block',
                                width: '100%',
                                height: 'auto',
                                maxWidth: '90%'
                              }}
                            />
                            {alt ? <span className="mt-4 block text-center text-sm italic opacity-70">{alt}</span> : null}
                          </span>
                        );
                      }`;
    const oldImg = /img:\s*\(\{\s*src,\s*alt\s*\}\)\s*=>\s*\(\s*<span[\s\S]*?<\/span>\s*\)/;
    app = app.replace(oldImg, imgReplacement);
    
    // c) Remove Footer links
    const footerOld = /<div className="flex flex-wrap gap-3 text-sm" style={{ color: 'var\(--muted\)' }}>[\s\S]*?<Link className="hover:underline" to=\{locale === 'en' \? '\/en\/personvern' : '\/no\/personvern'\}>\{locale === 'en' \? 'Privacy Policy' : 'Personvern'\}<\/Link>\s*<\/div>\s*<\/div>/;
    app = app.replace(footerOld, '</div>');
    
    // d) Update Footer signature
    app = app.replace(/function Footer\(\{ data, locale \}: \{ data: SiteData; locale: Locale \}\) \{/, 'function Footer({ data }: { data: SiteData }) {');
    app = app.replace(/<Footer data=\{data\} locale=\{route\.locale\} \/>/, '<Footer data={data} />');
    app = app.replace(/<ContactPanel data=\{data\} locale=\{locale\} \/>/, '<ContactPanel data={data} locale={locale} />'); // Keep this
    
    // e) Remove mobile preview state and button
    app = app.replace(/const \[mobilePreview, setMobilePreview\] = useState\(false\)\n/, '');
    const buttonRegex = /<button[\s\S]*?<\/button>/;
    app = app.replace(buttonRegex, '');
    app = app.replace(/className=\{mobilePreview \? 'mobile-preview-stage' : undefined\}/, '');
    app = app.replace(/className=\{mobilePreview \? 'mobile-preview-device' : undefined\}/, '');
    
    fs.writeFileSync('src/App.tsx', app, 'utf-8');
    console.log('Done fixing files with UTF-8 encoding');
}
fixFiles();
