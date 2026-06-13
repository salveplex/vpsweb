const strapiApp = require('@strapi/strapi');
const pages = require('./pages_data.json');

strapiApp().start().then(async strapi => {
  console.log('Strapi loaded, importing pages...');
  for (const page of pages) {
    try {
      await strapi.documents('api::page.page').create({
        data: page,
        status: 'published'
      });
      console.log('Imported:', page.title);
    } catch (err) {
      console.error('Error importing', page.title, err.message);
    }
  }
  console.log('All pages imported successfully!');
  process.exit(0);
}).catch(err => {
  console.error('Failed to start Strapi', err);
  process.exit(1);
});
