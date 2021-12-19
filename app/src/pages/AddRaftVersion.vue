<template>
  <div class="container">
    <section class="my-5 mx-1">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Add Raft version</h5>
          <form @submit.prevent="onSubmit">
            <api-provided-form
              v-if="ready"
              form-name="addRaftVersion"
              :data="data"
              @change="onChange"
            />
            <hr />
            <div
              class="action-row row d-flex flex-md-row flex-column align-items-sm-strech"
            >
              <button :disabled="loading" class="btn btn-success m-2">
                <icon v-if="!loading" name="paper-plane" />
                <div
                  v-else
                  class="spinner-grow spinner-grow-sm mx-1"
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
                Submit
              </button>
              <button
                type="button"
                class="btn btn-outline-danger m-2"
                @click="$router.go(-1)"
              >
                <icon name="times" />
                Go back
                <small class="text-muted">(discard)</small>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
  <confirm-modal
    v-if="showModal"
    title="Are you sure you want to leave?"
    message="You have unsaved Changes"
    btn-confirm="Yes"
    btn-cancel="No"
    @confirm="onRouteLeaveConfirm"
    @cancel="onRouteLeaveCancel"
  />
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent } from 'vue';
import { useActiveMeta } from 'vue-meta';
import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import Icon from '../components/Icon.vue';
import ConfirmModal from '../components/modals/ConfirmModal.vue';
import { useEditRaftVersion } from '../compositions';
import { DATE_FORMAT, TOAST_FORM_INVALID } from '../const';
import api from '../modules/api';
import toaster from '../modules/toaster';

export default defineComponent({
  name: 'AddRaftVersionPage',
  components: {
    ApiProvidedForm,
    Icon,
    ConfirmModal,
  },
  setup(props, { emit }) {
    const meta = useActiveMeta();

    meta.title = 'Add Raft version';

    return {
      ...useEditRaftVersion(emit),
    };
  },
  methods: {
    async onSubmit(): Promise<void> {
      if (!this.loadig) {
        this.showErrors = true;

        if (this.errorCount > 0) {
          toaster.error(TOAST_FORM_INVALID);
          return;
        }

        this.loading = true;
        this.data.releasedAt = dayjs(this.data.releasedAt).format(DATE_FORMAT);
        const raftVersion = await api.addRaftVersion(this.data);

        if (!!raftVersion) {
          this.hasUnsavedChanges = false;
          await this.$router.push({ name: 'raftVersionManagement' });
          toaster.success(
            `RaftVerison <b>"${raftVersion.version}"</b> was added!`,
          );
        }

        this.loading = false;
      }
    },
  },
});
</script>

<style scoped lang="scss">
.btn {
  &.btn-outline-danger {
    .text-muted {
      color: inherit !important;
    }
  }
}
</style>
