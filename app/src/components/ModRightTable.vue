<template>
  <div class="col-sm-3 my-3 p-1">
    <ul class="list-group text-break">
      <li class="list-group-item">
        <router-link
          :to="{ name: 'mod', params: { id: mod.id } }"
          class="font-weight-bolder"
        >
          {{ mod.title }}
        </router-link>
      </li>
      <li class="list-group-item">
        <icon name="list-ul" />This is a
        <b class="text-capitalize">{{ mod.category }}</b> mod.
      </li>
      <li class="list-group-item">
        <icon name="hashtag" />
        Version {{ currentVersion.version }}<br />
        <small>
          <i class="fas fa-angle-right"></i>
          <router-link
            :to="
              preview
                ? '#preview'
                : { name: 'modVersions', params: { id: mod.id } }
            "
            >Versions and changelogs</router-link
          >
        </small>
      </li>
      <li class="list-group-item">
        <icon name="user-circle" />
        by
        <router-link
          :to="
            preview
              ? '#preview'
              : { name: 'user', params: { username: mod.author } }
          "
        >
          {{ mod.author }}
        </router-link>
      </li>
      <li v-if="mod.repositoryUrl" class="list-group-item">
        <icon name="code-branch" />
        Source code
        <a :href="mod.repositoryUrl" target="_blank">
          repository
          <small>
            <icon name="external-link-square-alt" class="mx-1" />
          </small>
        </a>
      </li>
      <template v-if="isAuthor || isAdmin">
        <li class="list-group-item">
          <icon name="pencil-alt" />
          <router-link
            :to="
              preview ? '#preview' : { name: 'editMod', params: { id: mod.id } }
            "
            >Edit this mod</router-link
          >
          <admin-usage-info v-if="isAdmin" />
        </li>
        <li v-if="isAuthor || isAdmin" class="list-group-item">
          <icon name="plus" />
          <router-link
            :to="
              preview
                ? '#preview'
                : { name: 'addModVersion', params: { id: mod.id } }
            "
            >Add a new version</router-link
          >
          <admin-usage-info v-if="isAdmin" />
        </li>
      </template>
      <li class="list-group-item">
        <icon name="arrow-alt-circle-down" class="mr-2" />
        <a
          :href="preview ? '#preview' : currentVersion.downloadUrl || '#'"
          :target="preview ? '_self' : '_blank'"
          class="download-link"
          >Download this mod<small class="float-right mx-1"
            ><span
              class="badge badge-pill badge-secondary"
              :title="`${currentVersionDownloads} downloads`"
            >
              {{ currentVersionDownloads }}
            </span>
          </small>
        </a>
      </li>
    </ul>
    <ul class="list-group my-4">
      <li class="list-group-item bg-success d-none d-sm-inline-block">
        <icon name="play-circle" type="r" size="lg" class="mr-2 text-white" />
        <b>
          <a
            :href="preview ? '#preview' : `rmllauncher://installmod/${mod.id}`"
            :target="preview ? '_self' : '_blank'"
            class="text-white stretched-link install-button"
            >Install mod</a
          >
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
        <b
          ><a
            :href="preview ? '#preview' : '#'"
            :target="preview ? '_self' : '_blank'"
            class="text-white stretched-link support-button"
            >Need support?</a
          ></b
        >
      </li>
    </ul>
  </div>
  <template v-if="!preview">
    <the-install-label-modal />
    <the-download-warning-modal
      v-if="currentVersion"
      :mod-version="currentVersion"
      @download="onDownload"
    />
    <the-download-thanks-modal />
    <the-support-label-modal />
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMod } from '../compositions';
import { modDetails } from '../_legacy';
import AdminUsageInfo from './AdminUsageInfo.vue';
import Icon from './Icon.vue';
import TheDownloadThanksModal from './modals/TheDownloadThanksModal.vue';
import TheDownloadWarningModal from './modals/TheDownloadWarningModal.vue';
import TheInstallLabelModal from './modals/TheInstallLabelModal.vue';
import TheSupportLabelModal from './modals/TheSupportLabelModal.vue';

export default defineComponent({
  name: 'ModRightTable',
  components: {
    Icon,
    TheInstallLabelModal,
    TheSupportLabelModal,
    TheDownloadThanksModal,
    TheDownloadWarningModal,
    AdminUsageInfo,
  },
  props: {
    mod: Object,
    preview: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return {
      ...props,
      ...useMod(props),
    };
  },
  async mounted() {
    await this.$nextTick();
    modDetails();
  },
  methods: {
    onDownload() {
      this.currentVersionDownloads = this.currentVersionDownloads + 1;
    },
  },
});
</script>

<style scoped lang="scss">
.list-group {
  .list-group-item {
    .icon {
      width: 20px;
    }
  }
}
</style>
