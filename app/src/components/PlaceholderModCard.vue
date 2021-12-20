<template>
  <div
    class="card"
    :class="{
      'mod-card': !transparent,
      'bg-transparent': transparent,
      'shadow-none': transparent,
    }"
  >
    <template v-if="!transparent">
      <img
        class="card-img-top"
        src="../assets/images/banner-default.jpg"
        alt="default banner image"
      />
      <div class="card-body">
        <h5 class="card-title">Your mod?</h5>
        <p class="card-text">You can add your own mods!</p>
        <router-link
          :to="{ name: 'addMod' }"
          class="btn btn-success stretched-link"
        >
          Add a mod
        </router-link>
      </div>
    </template>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PlaceholderModCard',
  props: {
    transparent: Boolean,
  },
});
</script>
