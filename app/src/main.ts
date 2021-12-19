import './assets/styles/global.scss';
import 'notyf/notyf.min.css';

import { createApp } from 'vue';
import MarkdownIt from 'vue3-markdown-it';
import {
  createMetaManager,
  plugin as metaPlugin,
  defaultConfig,
} from 'vue-meta';
import $ from 'jquery'; //TODO: get rid of it!
import { Modal, Tooltip } from 'bootstrap';

import router from './router';
import { initSession } from './modules/stateManager';

import App from './App.vue';

(async () => {
  const metaManager = createMetaManager(false, {
    ...defaultConfig,
    meta: { tag: 'meta', nameless: true },
  });

  $.extend(Modal);
  $.extend(Tooltip);
  await initSession();

  const app = createApp(App);

  app.use(router);
  app.use(metaManager);
  app.use(metaPlugin);
  app.use(MarkdownIt);

  app.mount('#app');
})();
