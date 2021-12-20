<template>
  <mod-header
    v-if="mod"
    :mod="mod"
    :preview="preview"
    @like="$emit('like', $event)"
  />
  <section class="my-3" ref="body">
    <div class="row">
      <div class="col-sm-9 my-3">
        <div class="card">
          <div
            class="mod-banner"
            :style="{
              backgroundImage: `url('${mod.bannerImageUrl || defaultBanner}')`,
            }"
          />
          <div class="card-body">
            <div class="card-text mod-readme">
              <vue-markdown-it :source="mod.readme" />
            </div>
            <p class="card-text">
              <small class="text-muted">
                <i class="far fa-clock mr-1"></i>
                Description last changed on 2021-03-22
              </small>
            </p>
          </div>
          <file-hashes
            :for-version="currentVersion.version"
            :hashes="currentVersion.fileHashes"
            class="card-footer"
          />
        </div>
      </div>
      <mod-right-table v-if="mod" :mod="mod" :preview="preview" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
// noinspection TypeScriptCheckImport
import VueMarkdownIt from 'vue3-markdown-it';
import defaultBanner from '../assets/images/banner-default.jpg';
import { useMod } from '../compositions';
import { modDetails } from '../_legacy';
import FileHashes from './FileHashes.vue';
import Icon from './Icon.vue';
import ModHeader from './ModHeader.vue';
import ModRightTable from './ModRightTable.vue';

export default defineComponent({
  name: 'ModDetails',
  components: {
    ModHeader,
    ModRightTable,
    Icon,
    FileHashes,
    VueMarkdownIt,
  },
  props: {
    mod: Object,
    preview: Boolean,
  },
  emits: ['like'],
  setup(props) {
    return {
      ...useMod(props),
      defaultBanner,
    };
  },
  async mounted() {
    await this.$nextTick();
    modDetails();
  },
});
</script>

<style scoped lang="scss">
.mod-banner {
  width: 100%;
  height: 220px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.download-link {
  cursor: pointer;
}
</style>
