<template>
  <icon
    name="shield-alt"
    class="text-danger"
    size="xs"
    title="Admin priviliges usage"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from './Icon.vue';

export default defineComponent({
  components: {
    Icon,
  },
});
</script>
