<template>
  <footer class="mt-5">
    <div class="container">
      <small class="text-muted">
        <hr />
        <div class="row my-3">
          <div class="col-9 col-sm-7 text-left">
            © 2021 | Made by
            <a href="https://trax.am" target="_blank">traxam</a>,
            <a href="https://www.felix-puetz.com" target="_blank">zer0</a> and
            <a href="https://www.hytekgames.net" target="_blank">TeKGameR</a>
            Not affiliated with Raft, Redbeet Interactive or Axolot Games.
          </div>
          <div class="d-sm-none col-3 text-right">
            <theme-switch />
          </div>
          <div class="col-12 col-sm-4 text-md-right">
            <a
              href="https://github.com/raftmodding/web-monorepo/issues"
              target="_blank"
              class="whitespace-nowrap"
              >Submit an issue</a
            >
            &nbsp;|&nbsp;
            <router-link :to="{ name: 'contact' }" class="whitespace-nowrap">
              Contact and disclaimers
            </router-link>
            &nbsp;|&nbsp;
            <router-link :to="{ name: 'terms' }" class="whitespace-nowrap"
              >Terms of Service</router-link
            >
            &nbsp;|&nbsp;
            <router-link :to="{ name: 'privacy' }" class="whitespace-nowrap"
              >Privacy policy</router-link
            >
          </div>
          <div class="d-none d-sm-block col-1 text-right">
            <theme-switch />
          </div>
        </div>
      </small>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ThemeSwitch from './ThemeSwitch.vue';

export default defineComponent({
  name: 'TheMainFooter',
  components: { ThemeSwitch },
  computed: {
    fullYear() {
      return new Date().getFullYear();
    },
  },
});
</script>
