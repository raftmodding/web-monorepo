<template>
  <div class="container" v-if="mod">
    <mod-header :mod="mod" @toggle-like="onToggleLike" />
    <section class="my-3">
      <div class="row">
        <div class="col-sm-9 my-3">
          <mod-version-details
            v-for="(version, i) in mod.versions"
            :key="version.version"
            :version="version"
            :installable="i === 0"
          />
        </div>
        <mod-right-table v-if="mod" :mod="mod" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useActiveMeta } from 'vue-meta';
import { useRoute } from 'vue-router';
import { Mod } from '../@types';
import ModDetails from '../components/ModDetails.vue';
import ModHeader from '../components/ModHeader.vue';
import ModRightTable from '../components/ModRightTable.vue';
import ModVersionDetails from '../components/ModVersionDetails.vue';
import api from '../modules/api';

export default defineComponent({
  name: 'ModVersionsPage',
  components: {
    ModVersionDetails,
    ModHeader,
    ModRightTable,
    ModDetails,
  },
  setup() {
    const meta = useActiveMeta();
    const mod: Ref<Mod> = ref(null);

    (async () => {
      const route = useRoute();
      mod.value = await api.getMod(route.params.id as string);
      meta.title = `${mod.value.title} versions`;
    })();

    return {
      mod,
    };
  },
});
</script>
