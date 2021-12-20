<template>
  <div class="card-body">
    <h5 class="card-title">Forgot password</h5>
    <div class="alert alert-info mx-2 my-4" role="alert">
      Don't worry, we got this! Enter your email address and we will send you a
      link to reset your password.
    </div>
    <form @submit.prevent="onSubmit">
      <api-provided-form
        form-name="resetPassword"
        :data="data"
        @change="onFormChange"
      />
      <hr />
      <button class="btn btn-primary" type="submit">
        Send me the reset link
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useForm } from '../compositions';
import {
  TOAST_FORM_INVALID,
  TOAST_PASSWORD_RESET_ALREADY_EXISTS,
  TOAST_PASSWORD_RESET_SENT,
} from '../const';
import api from '../modules/api';
import toaster from '../modules/toaster';
import ApiProvidedForm from './ApiProvidedForm.vue';

export default defineComponent({
  components: { ApiProvidedForm },
  name: 'RequestPasswordReset',
  setup(props: any, { emit }) {
    return {
      ...useForm(emit),
    };
  },
  methods: {
    async onSubmit(): Promise<void> {
      if (this.errorCount <= 0) {
        const { email, recaptcha } = this.data;

        if (await api.addResetPassword(email, recaptcha)) {
          await this.$router.push({ name: 'signIn' });
          toaster.success({
            message: TOAST_PASSWORD_RESET_SENT,
            duration: 15 * 1000,
          });
        } else {
          toaster.error({
            message: TOAST_PASSWORD_RESET_ALREADY_EXISTS,
            duration: 15 * 1000,
          });
        }
      } else {
        toaster.error(TOAST_FORM_INVALID);
      }
    },
  },
});
</script>
