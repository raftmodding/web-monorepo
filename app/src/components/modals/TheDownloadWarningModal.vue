<template>
  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="download-warning-modal-label"
    aria-hidden="true"
    id="download-warning-modal"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header border-bottom-0">
          <h4 class="modal-title" id="download-warning-modal-label">
            This might be dangerous
          </h4>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <b>
            VirusTotal has scanned this file and found no virus but there could
            still be a virus in it.
          </b>
          <br />
          We take no responsibility on what this file could do to your computer
          but you can
          <router-link
            :to="{ name: 'contact' }"
            data-dismiss="modal"
            aria-label="Close"
            >contact us</router-link
          >
          if you find anything suspicious. We will take down everything from our
          website that does not comply with
          <router-link
            :to="{ name: 'terms' }"
            data-dismiss="modal"
            aria-label="Close"
            >our terms</router-link
          >.
          <hr class="mb-0" />
        </div>
        <div
          class="modal-footer border-top-0 pt-0 d-flex justify-content-between align-items-center"
        >
          <a
            :href="modVersion.downloadUrl"
            target="_blank"
            class="btn btn-sm btn-outline-danger mr-auto"
            id="download-warning-download-button"
            @click="$emit('download')"
          >
            I understand, download anyways
          </a>
          <!--a href="#" class="btn btn-sm btn-outline-info mx-1 disabled"
            >View scan report</a
          -->
          <button class="btn btn-success" data-dismiss="modal">Go back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '../../modules/api';

export default defineComponent({
  name: 'TheDownloadWarningModal',
  props: {
    modVersion: {
      type: Object,
      required: true,
    },
  },
  computed: {
    downloadUrl(): string {
      return `${api.getBaseUrl()}/modVersions/download/${this.modVersion.id}`;
    },
  },
});
</script>
