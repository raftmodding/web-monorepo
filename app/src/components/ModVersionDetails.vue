<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="card-title">
        <div class="row">
          <h5 class="col-md-6">
            Version {{ version.version }}
            <small class="text-muted mx-1">
              <span
                v-if="installable"
                class="badge badge-pill badge-success mx-1"
                >Latest</span
              >
              <raft-version-matching-badge :mod-version="version" />
            </small>
          </h5>
          <div
            class="col-md-6 d-flex justify-content-end my-3 my-md-0 action-buttons"
          >
            <router-link
              :to="
                preview
                  ? '#preview'
                  : {
                      name: 'editModVersion',
                      params: {
                        id: $route.params.id,
                        version: version.version,
                      },
                    }
              "
              class="btn btn-sm btn-outline-primary mx-1"
            >
              Edit
            </router-link>
            <a
              v-if="installable"
              :href="`rmllauncher://installmod/${$route.params.id}`"
              target="_blank"
              class="btn btn-sm btn-success install-button mx-1 d-none d-sm-inline-block"
            >
              Install mod
            </a>
            <a
              :href="preview ? '#preview' : version.downloadUrl"
              :target="preview ? '_self' : '_blank'"
              class="btn btn-sm btn-primary mx-1 download-link"
            >
              Download
              <span
                class="ml-2 badge badge-pill badge-light text-primary"
                :title="`${version.downloadCount} downloads`"
              >
                {{ version.downloadCount }}
              </span>
            </a>
          </div>
        </div>
      </div>
      <div class="card-text mod-readme">
        <vue-markdown-it :source="version.changelog" />
      </div>
      <p class="card-text">
        <small class="text-muted" :title="fullReleaseDateStr">
          <icon name="clock" class="mr-1" />
          Released on {{ releaseDateStr }}
        </small>
      </p>
    </div>
    <file-hashes :hashes="version.fileHashes" class="card-footer" />
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent } from 'vue';
// noinspection TypeScriptCheckImport
import VueMarkdownIt from 'vue3-markdown-it';
import { DATETIME_FORMAT, DATE_FORMAT } from '../const';
import { modDetails } from '../_legacy';
import FileHashes from './FileHashes.vue';
import Icon from './Icon.vue';
import RaftVersionMatchingBadge from './RaftVersionMatchingBadge.vue';

export default defineComponent({
  name: 'ModVersionDetails',
  components: { Icon, VueMarkdownIt, FileHashes, RaftVersionMatchingBadge },
  props: {
    version: Object,
    installable: {
      type: Boolean,
      default: false,
    },
    preview: Boolean,
  },
  computed: {
    vReleaseDate(): Date | string {
      return this.preview ? new Date() : this.version.createdAt;
    },
    fullReleaseDateStr(): string {
      return dayjs(this.vReleaseDate).format(DATETIME_FORMAT);
    },
    releaseDateStr(): string {
      return dayjs(this.vReleaseDate).format(DATE_FORMAT);
    },
  },
  async mounted() {
    await this.$nextTick();
    modDetails();
  },
});
</script>

<style lang="scss" scoped>
.action-buttons {
  max-height: 32px;
}
</style>
