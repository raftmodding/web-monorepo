<template>
  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="confirmModalLabel"
    aria-hidden="true"
    id="confirmModal"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header border-bottom-0">
          <h5 class="modal-title" id="confirmModalLabel">Are you sure?</h5>
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
          <span id="confirmModalText"></span> Only press continue if you know
          what you are doing!
        </div>
        <div class="modal-footer border-top-0">
          <button
            class="btn btn-outline-danger btn-danger"
            type="button"
            id="confirmModalRedButton"
            data-dismiss="modal"
            @click="$emit('confirm')"
          >
            I know what I am doing, continue
          </button>
          <button
            class="btn btn-success"
            type="button"
            data-dismiss="modal"
            @click="$emit('cancel')"
          >
            I've changed my mind
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DangerZoneModal',
  emits: ['cancel', 'confirm'],
});
</script>
