<template>
  <component
    :is="component"
    :to="to"
    class="badge badge-pill mx-1"
    :class="{
      'badge-success': isUpToDate,
      'badge-warning': !isUpToDate && isUntested,
      'badge-danger': !isUpToDate && !isUntested,
    }"
    :title="vTitle"
  >
    {{ vLabel }}
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { state } from '../modules/stateManager';

export default defineComponent({
  name: 'RaftVersionMatchingBadge',
  props: {
    modVersion: Object,
    to: [Object, String],
  },
  computed: {
    component(): string {
      return this.to ? 'router-link' : 'span';
    },
    isUpToDate(): boolean {
      return this.modVersion.maxRaftVersionId === state.latestRaftVersion.id;
    },
    isUntested(): boolean {
      return !this.isUpToDate && !this.modVersion.definiteMaxRaftVersion;
    },
    vLabel(): string {
      if (this.isUpToDate) {
        return 'Up to Date';
      } else if (this.isUntested) {
        return 'Untested';
      } else {
        return 'Outdated';
      }
    },
    vTitle(): string {
      if (this.isUpToDate) {
        return 'The current version is up to date';
      } else if (this.isUntested) {
        return 'The current version is untested';
      } else {
        return 'The current version is outdated!';
      }
    },
  },
});
</script>
