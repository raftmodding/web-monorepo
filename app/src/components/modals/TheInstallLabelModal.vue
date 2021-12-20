<template>
  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="install-modal-label"
    aria-hidden="true"
    id="install-modal"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header border-bottom-0">
          <h4 class="modal-title" id="install-modal-label">
            Installation will begin shortly!
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
          <p>
            The Raft Mod Loader Launcher should open shortly and ask you whether
            to install this mod. If the Launcher does not open, make sure to
            install the latest version from our
            <router-link
              :to="{ name: 'download' }"
              data-dismiss="modal"
              aria-label="Close"
              >downloads</router-link
            >
            page.
          </p>
        </div>
        <div
          class="modal-footer border-top-0 pt-0 d-flex justify-content-between align-items-center"
        >
          <router-link
            :to="{ name: 'contact' }"
            class="btn btn-sm btn-outline-secondary"
            data-dismiss="modal"
            aria-label="Close"
          >
            <i class="far fa-envelope mr-2"></i> Contact us
          </router-link>
          <a
            class="btn btn-primary border-0 px-3 py-2"
            href="/discord"
            target="_blank"
            style="background-color: #7289da"
            id="support-discord-link"
          >
            <i class="fab fa-discord mr-2"></i> Join our<b>Discord server</b>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheInstallLabelModal',
});
</script>
