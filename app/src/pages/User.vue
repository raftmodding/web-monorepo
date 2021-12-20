<template>
  <div class="container">
    <section class="my-5">
      <h1 class="my-3 mw-100 text-break">{{ username }}'s mods</h1>
      <mods-card-deck :mods="mods" group-cls="my-3" />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useActiveMeta } from 'vue-meta';
import { useRoute } from 'vue-router';
import ModsCardDeck from '../components/ModsCardDeck.vue';
import { useMods } from '../compositions';

export default defineComponent({
  name: 'UserPage',
  components: { ModsCardDeck },
  setup() {
    const meta = useActiveMeta();
    const route = useRoute();
    const username = ref(route.params.username);
    const defaultQuery = {
      author: username.value,
    };

    meta.title = username.value;

    return {
      username,
      defaultQuery,
      ...useMods(defaultQuery),
    };
  },
});
</script>
