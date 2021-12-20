import { setGlobalBlank } from '../compositions';

export default [
  {
    path: '/discord',
    beforeEnter() {
      setGlobalBlank(true);
      location.replace(import.meta.env.VITE_DISCORD_INVITE_LINK as string);
    },
  },
  {
    path: '/docs',
    beforeEnter() {
      setGlobalBlank(true);
      return location.replace(import.meta.env.VITE_API_DOCS_URL as string);
    },
  },
  {
    path: '/docs/multiple-files',
    beforeEnter() {
      setGlobalBlank(true);
      location.replace(
        import.meta.env.VITE_API_DOCS_MULTIPLE_FILES_URL as string,
      );
    },
  },
  {
    path: '/docs/slugs',
    beforeEnter() {
      setGlobalBlank(true);
      location.replace(import.meta.env.VITE_API_DOCS_SLUGS_URL as string);
    },
  },
];
