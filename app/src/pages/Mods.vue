<template>
  <div
    class="container"
    :class="{ 'mt-0': !loading && (!mods || mods.length <= 0) }"
  >
    <section class="my-3">
      <h1>Raft mods directory</h1>
      <p>
        Here is a list of all raft mods that have been published on our site. If
        you are missing something or have a great new idea, feel free to contact
        us on our <a href="/discord" target="_blank">Discord server</a>.
      </p>
    </section>
    <section class="my-3">
      <mod-searcher :default-query="defaultQuery" @search="onSearch" />
    </section>
    <template v-if="!loading">
      <mods-card-deck
        v-if="mods && mods.length > 0"
        :mods="mods"
        v-show="!loading"
        group-cls="my-3"
        class="search-result"
      />

      <div v-else class="mx-auto w-100 search-results-empty">
        <div class="card-deck">
          <placeholder-mod-card
            transparent
            class="d-flex justify-content-center align-items-center"
          >
            <div class="">No results</div>
          </placeholder-mod-card>
          <placeholder-mod-card transparent />
          <placeholder-mod-card />
        </div>
      </div>
    </template>
    <loading-spinner v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useActiveMeta } from 'vue-meta';
import Icon from '../components/Icon.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import ModsCardDeck from '../components/ModsCardDeck.vue';
import ModSearcher from '../components/ModSearcher.vue';
import PlaceholderModCard from '../components/PlaceholderModCard.vue';
import { useMods } from '../compositions';

export default defineComponent({
  name: 'ModsPage',
  components: {
    ModSearcher,
    LoadingSpinner,
    Icon,
    ModsCardDeck,
    PlaceholderModCard,
  },
  setup() {
    const meta = useActiveMeta();
    const defaultQuery = {
      sort: '-createdAt',
    };

    meta.title = 'Mods';
    meta.ogTitle = meta.titleTemplate('Mods');

    return {
      defaultQuery,
      ...useMods(defaultQuery),
    };
  },
});
</script>

<style scoped lang="scss">
.serarch-result {
  min-height: 50vh;
}
</style>
