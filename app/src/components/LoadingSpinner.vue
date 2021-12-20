<template>
  <div
    class="loading-spinner container d-flex justify-content-center align-items-center p-5"
  >
    <div class="spinner-grow spinner-grow-lg mx-1" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingSpinner',
});
</script>

<style scoped lang="scss">
.loading-spinner {
  min-height: 60vh;
}
</style>
