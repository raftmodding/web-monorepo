<template>
  <div class="container">
    <section class="my-5 mx-1 with-json-forms">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Add a Mod</h5>
          <form class="form" @submit.prevent="onSubmit" novalidate>
            <api-provided-form
              v-if="ready"
              :data="mod"
              form-name="addMod"
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
                Submit mod
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
              <router-link
                :to="{ name: 'home' }"
                class="btn btn-outline-danger m-2"
                :class="{ disabled: loading }"
                :disabled="loading"
              >
                <icon name="times" />
                Cancel
              </router-link>
            </div>
          </form>
        </div>
      </div>
      <ul>
        <li>
          Just want to find some existing mods?
          <router-link :to="{ name: 'mods' }">Browse the directory</router-link>
        </li>
      </ul>
    </section>
    <section class="collapse my-3 mx-1" id="preview">
      <mod-details :mod="mod" :preview="true" />
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
import Icon from '../components/Icon.vue';
import ConfirmModal from '../components/modals/ConfirmModal.vue';
import ModDetails from '../components/ModDetails.vue';
import { useModEditing } from '../compositions';
import { TOAST_FORM_INVALID } from '../const';
import api from '../modules/api';
import toaster from '../modules/toaster';

export default defineComponent({
  name: 'AddModPage',
  components: { Icon, ApiProvidedForm, ModDetails, ConfirmModal },
  setup() {
    const meta = useActiveMeta();

    meta.title = 'Add a mod';

    return {
      ...useModEditing(true),
    };
  },
  methods: {
    async onSubmit(): Promise<void> {
      console.log('submit');
      if (!this.loading) {
        this.showErrors = true;
        console.log('showErrors:', this.showErrors);

        if (this.errorCount <= 0) {
          this.loading = true;
          const newMod = await api.addMod(this.mod);
          if (!!newMod) {
            this.hasUnsavedChanges = false;
            await this.$router.push({ name: 'mod', params: { id: newMod.id } });
            toaster.success(
              `Your new mod <b>"${newMod.title}"</b> has been created!`,
            );
          }
          this.loading = false;
        }
      } else {
        if (this.errorCount > 0) {
          toaster.error(TOAST_FORM_INVALID);
        }
      }
    },
  },
});
</script>
