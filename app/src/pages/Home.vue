<template>
  <div class="wrapper">
    <div class="container">
      <section class="my-5">
        <div class="jumbotron my-5 mx-1 bg-transparent">
          <div>
            <h1 class="display-4">Welcome to RaftModding!</h1>
            <p class="lead">
              The largest community for mods, scripts and utilities for Raft!
            </p>
          </div>
        </div>
      </section>
      <section class="my-5">
        <div class="row my-5">
          <div class="col-sm-3 text-center">
            <img
              src="../assets/images/mod-loader.png"
              alt="mod-loader"
              class="w-100 d-none d-lg-block"
              draggable="false"
            />
          </div>
          <div class="col-sm-8">
            <h2>Modding your game</h2>
            <p class="text-left">
              To get started with modding, you will first need to install
              <router-link :to="{ name: 'download' }"
                >our ModLoader</router-link
              >
              . The ModLoader is a program that allows you to load 'mods', small
              programs that add new items, blocks or useful tools, into the
              game. You can find mods in our
              <router-link :to="{ name: 'mods' }">mods directory</router-link>
              .
            </p>
            <router-link
              :to="{ name: 'download' }"
              class="btn btn-success btn-lg mr-2 mt-2"
            >
              <i class="fas fa-download mr-2"></i> Download ModLoader
            </router-link>
            <router-link
              :to="{ name: 'mods' }"
              class="btn btn-primary btn-lg mr-2 mt-2"
            >
              <i class="fas fa-plug mr-2"></i> Browse mods
            </router-link>
          </div>
          <div class="col-sm-1"></div>
        </div>
        <div class="row mb-5">
          <h2 class="my-3">Popular mods</h2>
          <mods-card-deck :mods="mods.mostDownloaded" />
        </div>
        <div class="row mb-5">
          <h2 class="my-3">Most liked mods</h2>
          <mods-card-deck :mods="mods.mostLiked" />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import { Mod } from '../@types';
import api from '../modules/api';

import ModsCardDeck from '../components/ModsCardDeck.vue';
import { useActiveMeta } from 'vue-meta';

interface ModCollection {
  mostDownloaded: Mod[];
  mostLiked: Mod[];
}

//@ts-ignore
const { VITE_TITLE_DEFAULT } = import.meta.env;

export default defineComponent({
  name: 'HomePage',
  components: { ModsCardDeck },
  setup() {
    const meta = useActiveMeta();
    const mods: ModCollection = reactive({
      mostDownloaded: [],
      mostLiked: [],
    });

    meta.title = VITE_TITLE_DEFAULT;

    (async () => {
      mods.mostDownloaded = await api.getMostDownloadedMods();
      mods.mostLiked = await api.getMostLikedMods();
    })();

    return {
      mods,
    };
  },
});
</script>

<style lang="scss">
body {
  &[data-route='home'] {
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    background-image: url('../assets/images/home-background-light.png');

    &[data-theme='dark'] {
      background-image: url('../assets/images/home-background-dark.png');
    }
  }
}
</style>
