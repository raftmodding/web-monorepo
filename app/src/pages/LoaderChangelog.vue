<template>
  <changelog
    :version="loaderVersion.rmlVersion"
    :readme="loaderVersion.readme"
    :release-date="loaderVersion.timestamp"
    :last-update="loaderVersion.updatedAt"
    software-name="RML LOADER"
  />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

import { LoaderVersion } from '../@types';
import api from '../modules/api';

import Changelog from '../components/Changelog.vue';
import { useActiveMeta } from 'vue-meta';

export default defineComponent({
  name: 'LoaderChangelogPage',
  components: { Changelog },
  setup() {
    const meta = useActiveMeta();
    const loaderVersion: Ref<LoaderVersion> = ref({} as LoaderVersion);

    (async () => {
      const route: RouteLocationNormalizedLoaded = useRoute();
      loaderVersion.value = await api.getLoaderVersion(
        route.params.version as string,
      );

      meta.title = `RML v${loaderVersion.value.rmlVersion}`;
    })();

    return {
      loaderVersion,
    };
  },
});
</script>
