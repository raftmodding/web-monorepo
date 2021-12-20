<template>
  <div class="container">
    <section class="my-5 mx-1 with-json-forms">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">
            Edit version {{ version.version }} of mod "{{ mod.title }}"
          </h5>
          <form class="form" @submit.prevent="onSubmit" novalidate>
            <api-provided-form
              v-if="version && ready"
              :data="version"
              form-name="editModVersion"
              :show-errors="showErrors"
              @change="onChange"
            />
            <hr />
            <div
              class="action-row row d-flex flex-md-row flex-column align-items-sm-strech"
            >
              <button
                type="submit"
                class="btn btn-success submit-button m-2"
                :disabled="loading"
                :class="{ disabled: loading }"
              >
                <icon v-if="!loading" name="paper-plane" />
                <div
                  v-else
                  class="spinner-grow spinner-grow-sm mx-1"
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
                Submit changes
              </button>
              <button
                type="button"
                class="btn btn-outline-primary m-2"
                :disabled="loading"
                :class="{ disabled: loading }"
                data-toggle="collapse"
                data-target="#preview"
                aria-expanded="false"
                aria-controls="preview"
              >
                <icon name="eye" />
                Preview version entry
              </button>
              <button
                type="button"
                class="btn btn-outline-danger m-2"
                :class="{ disabled: loading }"
                :disabled="loading"
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
          <router-link :to="{ name: 'mod', params: { id: mod.id } }"
            >Go back to the mod's page</router-link
          >
        </li>
      </ul>
    </section>
    <section class="collapse my-3 mx-1" id="preview">
      <mod-version-details :version="version" :preview="true" />
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
import { ModVersion } from '../@types';
import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import Icon from '../components/Icon.vue';
import ConfirmModal from '../components/modals/ConfirmModal.vue';
import ModVersionDetails from '../components/ModVersionDetails.vue';
import { useAddModVersion } from '../compositions';
import api from '../modules/api';
import toaster from '../modules/toaster';

export default defineComponent({
  name: 'EditModVersionPage',
  components: { ModVersionDetails, Icon, ApiProvidedForm, ConfirmModal },
  setup() {
    return {
      ...useAddModVersion(),
    };
  },
  methods: {
    async onSubmit(): Promise<void> {
      if (!this.loading) {
        this.loading = true;
        const {
          version,
          changelog,
          minRaftVersionId,
          maxRaftVersionId,
          definiteMaxRaftVersion,
        }: ModVersion = this.version;
        const modVersion = await api.updateModVersion(this.$route.params.id, {
          version,
          changelog,
          minRaftVersionId,
          maxRaftVersionId,
          definiteMaxRaftVersion,
        } as ModVersion);

        if (!!modVersion) {
          this.hasUnsavedChanges = false;
          await this.$router.push({
            name: 'modVersions',
            params: { id: modVersion.modId },
          });
          toaster.success(
            `Version <b>"${modVersion.version}"</b> was updated!`,
          );
        }
        this.loading = false;
      }
    },
  },
});
</script>
