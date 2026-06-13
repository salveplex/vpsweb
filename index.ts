export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const fs = require('fs');
    const path = require('path');
    
    const pagesFile = path.join(__dirname, '../../pages_data.json');
    if (fs.existsSync(pagesFile)) {
      console.log('Found pages_data.json! Importing pages into Strapi...');
      try {
        const pages = JSON.parse(fs.readFileSync(pagesFile, 'utf8'));
        for (const page of pages) {
          try {
            await strapi.documents('api::page.page').create({
              data: page,
              status: 'published'
            });
            console.log('Imported:', page.title);
          } catch (createErr) {
            console.error('Error creating page:', page.title, createErr.message);
          }
        }
        console.log('Import complete. Deleting pages_data.json to prevent re-import.');
        fs.unlinkSync(pagesFile);
      } catch (err) {
        console.error('Error during import:', err);
      }
    }
  },
};
