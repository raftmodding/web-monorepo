<template>
  <div class="container">
    <div class="row justify-content-center my-5 mx-1">
      <div class="card p-3 animate__animated" :class="animation">
        <div class="card-body">
          <h3 class="card-title text-center">Finish Account Setup</h3>
          <p class="p-2 my-3 text-secondary">
            You probably used a third-party login method. <br />
            Please take a minute to finish your Account
          </p>
          <form @submit.prevent="finish">
            <api-provided-form
              form-name="finishAccount"
              :data="data"
              :showErrors="showErrors"
              @change="onFormChange"
            />
            <button
              type="submit"
              :disabled="formLoading"
              class="btn btn-primary w-100"
            >
              <icon name="flag-checkered" /> Finish account
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useActiveMeta } from 'vue-meta';
import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import Icon from '../components/Icon.vue';
import { useForm } from '../compositions';
import {
  ROLE_UNFINISHED,
  TOAST_ACCOUNT_FINISHED,
  TOAST_GENERIC_SERVER_ERROR,
} from '../const';
import api from '../modules/api';
import { isSessionExpired, state } from '../modules/stateManager';
import toaster from '../modules/toaster';

export default defineComponent({
  name: 'FinishAccountPage',
  components: { ApiProvidedForm, Icon },
  setup(props, { emit }) {
    const meta = useActiveMeta();

    meta.title = 'Finish account setup';

    return {
      ...useForm(emit),
      animation: ref('animate__zoomInDown'),
    };
  },
  async beforeRouteEnter(to, from, next) {
    if (!isSessionExpired() && state.session.user.role !== ROLE_UNFINISHED) {
      await next({ name: 'home' });
      toaster.success('Your account is already complete');
    }

    next();
  },
  methods: {
    async finish() {
      this.formLoading = true;
      this.showErrors = true;

      if (this.errorCount <= 0) {
        const { username, email } = this.data;
        const user = await api.finishAccount(username, email);

        if (user && typeof user !== 'string') {
          this.animation = 'animate__hinge';
          toaster.success(TOAST_ACCOUNT_FINISHED);
          setTimeout(async () => {
            await this.$router.replace({ name: 'home' });
          }, 2000);
        } else if (typeof user === 'string') {
          toaster.error(user);
        } else {
          toaster.error(TOAST_GENERIC_SERVER_ERROR);
        }
      }

      this.formLoading = false;
    },
  },
});
</script>

<style scoped lang="scss">
@import '../assets/styles/variables';

.discord-login {
  background-color: $discord;
}
</style>
