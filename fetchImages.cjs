const fs = require('fs');
fetch('https://vosstaxi.no/Hjem/om/prosjekter').then(r => r.text()).then(t => {
  const m = t.match(/<img[^>]+src=["']([^"']+)["']/gi);
  console.log(m ? m.join('\n') : 'no images');
});
