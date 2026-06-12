printf "import { mergeConfig, type UserConfig } from 'vite';\n\nexport default (config: UserConfig) => {\n  return mergeConfig(config, {\n    server: {\n      allowedHosts: ['cms.vosstaxi.no'],\n    },\n  });\n};\n" > ~/sites/vpsweb_cms/src/admin/vite.config.ts
pm2 restart vpsweb_cms
