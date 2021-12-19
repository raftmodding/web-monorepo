<template>
  <div v-if="mod" class="card mod-card">
    <img
      class="card-img-top"
      :src="mod.bannerImageUrl || defaultBanner"
      :alt="`${mod.title} banner`"
    />
    <div class="card-body">
      <h5 class="card-title">
        <b>
          {{ mod.title }}
          <small class="d-inline-block text-muted">
            by
            <a class="stretched-link-exception" :href="`/user/${mod.author}`">
              {{ mod.author }}
            </a>
          </small>
        </b>
      </h5>
      <p class="card-text">{{ mod.description }}</p>
    </div>
    <div class="pt-0 pb-3 card-footer border-0 d-flex justify-space-between">
      <div class="mr-auto">
        <router-link
          :to="{ name: 'mod', params: { id: mod.id } }"
          class="btn btn-primary mr-2 stretched-link"
        >
          View mod
        </router-link>
      </div>
      <span class="align-self-center">
        <raft-version-matching-badge
          :mod-version="currentVersion"
          :to="{ name: 'modVersions', params: { id: mod.id } }"
          class="stretched-link-exception"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ModVersion } from '../@types';
import defaultBanner from '../assets/images/banner-default.jpg';
import RaftVersionMatchingBadge from './RaftVersionMatchingBadge.vue';

export default defineComponent({
  name: 'ModCard',
  components: { RaftVersionMatchingBadge },
  props: {
    mod: Object,
  },
  setup() {
    return {
      defaultBanner,
    };
  },
  computed: {
    currentVersion(): ModVersion {
      return this.mod?.versions?.[0] || {};
    },
  },
});
</script>

<style scoped lang="scss">
.mod-card {
  &.deleted {
    opacity: 0.2 !important;
    pointer-events: none !important;
  }
}
</style>
