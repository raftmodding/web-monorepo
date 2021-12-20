<template>
  <div class="container">
    <div class="row justify-content-center my-5">
      <div class="card m-auto">
        <div class="card-body">
          <h3 class="card-title mb-4">404</h3>
          <p class="card-text">Not Found</p>
        </div>
        <div
          class="card-footer border-0 mt-0 pt-0 d-flex justify-content-between align-items-center"
        >
          <router-link
            :to="{ name: 'contact' }"
            class="btn btn-sm btn-outline-secondary"
          >
            <i class="far fa-envelope mr-2"></i> Contact us
          </router-link>
          <button class="btn btn-success" @click="$router.go(-1)">
            Go back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useActiveMeta } from 'vue-meta';

export default defineComponent({
  setup() {
    const meta = useActiveMeta();

    meta.title = 'Page not found';
  },
});
</script>

<style scoped lang="scss">
.card {
  min-width: 300px;
}
</style>
