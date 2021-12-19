<template>
  <div class="container">
    <section class="my-5 mx-1 with-json-forms">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Edit mod "{{ mod.title }}"</h5>
          <form class="form" @submit.prevent="onSubmit" novalidate>
            <api-provided-form
              v-if="ready"
              :data="mod"
              form-name="editMod"
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
                show preview
              </button>
              <button
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
    </section>
    <section class="collapse my-3 mx-1" id="preview">
      <mod-details :mod="mod" :preview="true" />
    </section>
    <section class="my-5 mx-1">
      <mod-danger-zone :mod="mod" />
      <ul>
        <li>
          You can edit the changelogs of this mod on it's
          <router-link :to="{ name: 'modVersions', params: { id: mod.id } }">
            versions page
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'mod', params: { id: mod.id } }"
            >Go back to the mod's page
          </router-link>
        </li>
        <li>
          Want to publish an update for this mod?
          <router-link :to="{ name: 'addModVersion', params: { id: mod.id } }">
            Add a new version
          </router-link>
        </li>
      </ul>
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

import api from '../modules/api';
import toaster from '../modules/toaster';
import { useModEditing } from '../compositions';

import Icon from '../components/Icon.vue';
import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import ModDetails from '../components/ModDetails.vue';
import ConfirmModal from '../components/modals/ConfirmModal.vue';
import ModDangerZone from '../components/ModDangerZoner.vue';

export default defineComponent({
  name: 'EditModPage',
  components: {
    ModDangerZone,
    Icon,
    ApiProvidedForm,
    ModDetails,
    ConfirmModal,
  },
  setup() {
    return {
      ...useModEditing(),
    };
  },
  methods: {
    async onSubmit(): Promise<void> {
      if (!this.loading) {
        this.loading = true;
        this.showErrors = true;
        const updatedMod = await api.updateMod(this.mod);
        if (!!updatedMod) {
          this.hasUnsavedChanges = false;
          await this.$router.push({
            name: 'mod',
            params: { id: updatedMod.id },
          });
          toaster.success(
            `Your mod <b>"${updatedMod.title}"</b> has been updated!`,
          );
        }
        this.loading = false;
      }
    },
  },
});
</script>
