<template>
  <button
    class="btn btn-outline-secondary text-center"
    :title="`Turn ${!isLightTheme ? 'on' : 'off'} the lights`"
    @click="toggleTheme"
  >
    {{ isLightTheme ? '🌑' : '☀' }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { setTheme, state } from '../modules/stateManager';

export default defineComponent({
  name: 'ThemeSwitch',
  setup() {
    return {
      state,
    };
  },
  computed: {
    theme() {
      return state.theme;
    },
    isLightTheme() {
      return this.theme === 'light';
    },
  },
  methods: {
    toggleTheme(): void {
      setTheme(this.isLightTheme ? 'dark' : 'light');
    },
  },
});
</script>
