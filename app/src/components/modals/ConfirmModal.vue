<template>
  <div
    ref="modal"
    class="modal fade show"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('confirm')"
          >
            {{ btnConfirm }}
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            data-dismiss="modal"
            @click="$emit('cancel')"
          >
            {{ btnCancel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConfirmModal',
  props: {
    title: String,
    message: String,
    btnConfirm: {
      type: String,
      default: 'OK',
    },
    btnCancel: {
      type: String,
      default: 'Cancel',
    },
  },
  emits: ['cancel', 'confirm'],
});
</script>

<style scoped lang="scss">
.modal {
  display: block !important;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>
