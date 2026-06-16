const fs = require('fs');

// Restore App.tsx from backup
fs.copyFileSync('App.tsx.bak', 'src/App.tsx');
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

// e) Remove mobile preview state and button specifically!
app = app.replace(/const \[mobilePreview, setMobilePreview\] = useState\(false\)\n/, '');
// Use a more specific regex for the Simuler mobil button
const buttonRegex = /<button\s*type="button"\s*className="preview-toggle"[\s\S]*?Simuler mobil'\}\s*<\/button>/;
app = app.replace(buttonRegex, '');
app = app.replace(/className=\{mobilePreview \? 'mobile-preview-stage' : undefined\}/g, '');
app = app.replace(/className=\{mobilePreview \? 'mobile-preview-device' : undefined\}/g, '');

fs.writeFileSync('src/App.tsx', app, 'utf-8');
console.log('App.tsx restored and fixed');
