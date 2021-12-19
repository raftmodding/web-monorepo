<template>
  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="support-modal-label"
    aria-hidden="true"
    id="support-modal"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header border-bottom-0">
          <h4 class="modal-title" id="support-modal-label">Need support?</h4>
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
            Is anything not working as expected? Don't worry, we've got you
            covered! Please join our
            <a href="/discord" target="_blank">Discord server</a> to talk to the
            developers and the community.
          </p>
          <ul>
            <li><b>Get help</b> with installing mods, plugins and more</li>
            <li>
              <b>Suggest new ideas</b> for mods, plugins and other software
            </li>
            <li>
              <b>Report bugs</b> and problems and help the developers fix them
            </li>
            <li>Talk to the modding community</li>
          </ul>
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
            <icon name="envelope" class="mr-2" /> Contact us
          </router-link>
          <a
            class="btn btn-primary border-0 px-3 py-2"
            href="/discord"
            target="_blank"
            style="background-color: #7289da"
            id="support-discord-link"
          >
            <icon name="discord" type="b" class="mr-2" /> Join our
            <b>Discord server</b>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '../Icon.vue';

export default defineComponent({
  name: 'TheSupportLabelModal',
  components: { Icon },
});
</script>
