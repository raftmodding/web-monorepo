import vue from '@vitejs/plugin-vue';
import { config } from 'dotenv-flow';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  //load env vars from ../.env.* -> https://www.npmjs.com/package/dotenv-flow
  config({ path: `../` });

  return {
    publicDir:
      process.env.NODE_ENV === 'production' ? './public' : './public/_dev',
    plugins: [vue()],
  };
});
