mkdir -p ~/sites/vpsweb_cms/src/api/page/content-types/page
mkdir -p ~/sites/vpsweb_cms/src/api/page/controllers
mkdir -p ~/sites/vpsweb_cms/src/api/page/routes
mkdir -p ~/sites/vpsweb_cms/src/api/page/services

cat << 'EOF' > ~/sites/vpsweb_cms/src/api/page/content-types/page/schema.json
{
  "kind": "collectionType",
  "collectionName": "pages",
  "info": {
    "singularName": "page",
    "pluralName": "pages",
    "displayName": "Page",
    "description": ""
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "content": {
      "type": "richtext"
    }
  }
}
EOF

cat << 'EOF' > ~/sites/vpsweb_cms/src/api/page/controllers/page.ts
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::page.page');
EOF

cat << 'EOF' > ~/sites/vpsweb_cms/src/api/page/routes/page.ts
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::page.page');
EOF

cat << 'EOF' > ~/sites/vpsweb_cms/src/api/page/services/page.ts
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::page.page');
EOF

pm2 restart vpsweb_cms
