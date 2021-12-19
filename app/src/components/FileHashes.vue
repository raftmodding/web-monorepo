<template>
  <div>
    <h6>
      File Hashes
      <template v-if="forVersion">
        for <span class="badge badge-info mx-1">Version {{ forVersion }}</span>
      </template>
    </h6>
    <template v-if="hashes">
      <div class="row" v-for="(hash, name) in hashes" :key="hash">
        <div class="col-sm-2">{{ name }}:</div>
        <div class="col-10">
          <span class="badge badge-secondary mx-1 text-wrap mw-100">
            {{ hash }}
          </span>
        </div>
      </div>
    </template>
    <div v-else class="row">
      <small class="col-sm-12 text-muted p-3"> - not available - </small>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FileHashes',
  props: {
    forVersion: [String, Number],
    hashes: Object,
  },
});
</script>
