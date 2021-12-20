<template>
  <div class="mx-auto w-100">
    <div
      v-for="(modGroup, i) in modGroups"
      :key="`mod-group-${i}`"
      class="card-deck"
      :class="groupCls"
    >
      <mod-card
        v-for="(mod, ii) in modGroup"
        :key="`mod-${mod.id}`"
        :mod="mod"
      />
      <placeholder-mod-card v-if="modGroup.length <= 2" />
      <placeholder-mod-card v-if="modGroup.length <= 1" transparent />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModCard from './ModCard.vue';
import PlaceholderModCard from './PlaceholderModCard.vue';

export default defineComponent({
  name: 'ModsCardDeck',
  components: { ModCard, PlaceholderModCard },
  props: {
    mods: {
      type: Array,
      required: true,
    },
    groupCls: [String, Array, Object],
  },
  computed: {
    modGroups(): any[] {
      const mods = [...this.mods];
      const groups = [];
      let group = [];

      while (mods.length > 0) {
        group.push(mods.shift());
        if (group.length >= 3) {
          groups.push([...group]);
          group = [];
        }
      }

      if (group.length > 0) {
        groups.push([...group]);
      }
      return groups;
    },
  },
});
</script>
