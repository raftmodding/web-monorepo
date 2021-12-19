<template>
  <div class="container">
    <section class="my-5 mx-1">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Add launcher version</h5>
          <form @submit.prevent="onSubmit">
            <api-provided-form
              v-if="ready"
              form-name="addLauncherVersion"
              :data="data"
              @change="onChange"
            />
            <hr />
            <div
              class="action-row row d-flex flex-md-row flex-column align-items-sm-strech"
            >
              <button class="btn btn-success m-2" type="submit">
                <icon v-if="!loading" name="paper-plane" />
                <div
                  v-else
                  class="spinner-grow spinner-grow-sm mx-1"
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
                Submit mod loader version
              </button>
              <button
                class="btn btn-outline-primary m-2"
                type="button"
                data-toggle="collapse"
                data-target="#preview"
                aria-expanded="false"
                aria-controls="preview"
              >
                <icon name="eye" />
                Preview mod page
              </button>
              <button
                type="button"
                class="btn btn-outline-danger m-2"
                @click.prevent="$router.go(-1)"
              >
                <icon name="times" />
                Discard changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <ul>
        <li>
          <router-link :to="{ name: 'download' }">
            Go back to the downloads overview
          </router-link>
        </li>
      </ul>
    </section>
    <section class="collapse my-3 mx-1" id="preview">
      <changelog
        :version="data.version"
        :readme="data.changelog"
        software-name="RML LAUNCHER"
        :preview="true"
      />
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
import { defineComponent } from 'vue';
import { useActiveMeta } from 'vue-meta';
import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import Changelog from '../components/Changelog.vue';
import Icon from '../components/Icon.vue';
import ConfirmModal from '../components/modals/ConfirmModal.vue';
import { useAddLauncherVersion } from '../compositions';
import { TOAST_FORM_INVALID, TOAST_GENERIC_SERVER_ERROR } from '../const';
import api from '../modules/api';
import toaster from '../modules/toaster';

export default defineComponent({
  name: 'AddLoaderVersionPage',
  components: {
    ApiProvidedForm,
    Icon,
    ConfirmModal,
    Changelog,
  },
  setup(props, { emit }) {
    const meta = useActiveMeta();

    meta.title = 'Add launcher version';

    return {
      ...useAddLauncherVersion(emit),
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
        const launcherVersion = await api.addLauncherVersion(this.data);

        if (!!launcherVersion) {
          this.hasUnsavedChanges = false;
          await this.$router.push({ name: 'home' });
          toaster.success(
            `LauncherVersion <b>"${launcherVersion.version}"</b> was added!`,
          );
        } else {
          toaster.error(TOAST_GENERIC_SERVER_ERROR);
        }

        this.loading = false;
      }
    },
  },
});
</script>
