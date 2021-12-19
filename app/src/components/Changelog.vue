<template>
  <div class="container">
    <section class="my-3">
      <h1>{{ softwareName }} v{{ version }}</h1>
      <div class="row">
        <div class="col-sm-8 my-3">
          <div class="card">
            <div class="card-body">
              <div class="card-text mod-readme">
                <vue-markdown-it :source="readme" />
              </div>
              <p class="card-text">
                <small class="text-muted" :title="fullLastUpdateDateStr"
                  ><i class="far fa-clock mr-1"></i> Changelog last updated on
                  {{ lastUpdateDateStr }}</small
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-4 my-3">
          <ul class="list-group">
            <li class="list-group-item">
              <i class="fas fa-hashtag"></i> Version <b>{{ version }}</b>
            </li>
            <li class="list-group-item" :title="fullReleaseDateStr">
              <i class="fas fa-clock"></i> Released on
              <b>{{ releaseDateStr }}</b>
            </li>
            <li v-if="downloadUrl" class="list-group-item download">
              <i class="fas fa-arrow-alt-circle-down mr-2"></i>
              <b>
                <a :href="preview ? '#preview' : downloadUrl">Download</a>
              </b>
            </li>
          </ul>
          <ul class="list-group my-4">
            <li class="list-group-item bg-success">
              <icon
                name="download"
                type="s"
                size="lg"
                class="mr-2 text-white"
              />
              <b>
                <router-link
                  :to="{ name: 'download' }"
                  class="text-white stretched-link"
                  >Download launcher
                </router-link>
              </b>
            </li>
          </ul>
          <ul class="list-group my-4">
            <li class="list-group-item bg-primary">
              <icon
                name="question-circle"
                type="r"
                size="lg"
                class="mr-2 text-white"
              />
              <b>
                <a
                  :href="preview ? '#preview' : '/discord'"
                  class="text-white stretched-link"
                  :class="{ 'support-button': !preview }"
                  :target="preview ? '_self' : '_blank'"
                  >Need support?</a
                >
              </b>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <the-support-label-modal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dayjs from 'dayjs';

// noinspection TypeScriptCheckImport
import VueMarkdownIt from 'vue3-markdown-it';

import { DATE_FORMAT, DATETIME_FORMAT } from '../const';
import { changelog } from '../_legacy';
import TheSupportLabelModal from './modals/TheSupportLabelModal.vue';
import Icon from './Icon.vue';

export default defineComponent({
  name: 'Changelog',
  components: { TheSupportLabelModal, VueMarkdownIt, Icon },
  props: {
    version: String,
    readme: String,
    releaseDate: [Date, String],
    softwareName: String,
    downloadUrl: String,
    lastUpdate: [Date, String],
    preview: Boolean,
  },
  computed: {
    vReleaseDate(): Date | string {
      return this.preview ? new Date() : this.releaseDate;
    },
    vLastUpdate(): Date | string {
      return this.preview ? new Date() : this.lastUpdate;
    },
    fullReleaseDateStr(): string {
      return dayjs(this.vReleaseDate).format(DATETIME_FORMAT);
    },
    releaseDateStr(): string {
      return dayjs(this.vReleaseDate).format(DATE_FORMAT);
    },
    fullLastUpdateDateStr(): string {
      return dayjs(this.vLastUpdate).format(DATETIME_FORMAT);
    },
    lastUpdateDateStr(): string {
      return dayjs(this.vLastUpdate).format(DATE_FORMAT);
    },
  },
  mounted() {
    changelog();
  },
});
</script>
