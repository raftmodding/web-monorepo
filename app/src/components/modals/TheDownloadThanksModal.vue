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
          <b
            >VirusTotal has scanned this file and found no virus but there could
            still be a virus in it.</b
          ><br />We take no responsibility on what this file could do to your
          computer but you can
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
            class="btn btn-sm btn-outline-danger mr-auto"
            href="/mods/extra-settings-api/1.5.8/ExtraSettingsAPI.rmod?ignoreVirusScan=true"
            target="_blank"
            id="download-warning-download-button"
            >I understand, download anyways</a
          >
          <!--a
            class="btn btn-sm btn-outline-info mx-1"
            href="https://www.virustotal.com/gui/file/4b23074bf1e71ab6ae4b2bbf6ab3538a9c656325cd7eeac5f9fcf928b532e1d3/detection/f-4b23074bf1e71ab6ae4b2bbf6ab3538a9c656325cd7eeac5f9fcf928b532e1d3-1618886191"
            target="_blank"
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

export default defineComponent({
  name: 'TheDownloadThanksModal',
});
</script>
