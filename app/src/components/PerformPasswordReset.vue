<template>
  <div class="card-body">
    <h5 class="card-title">Forgot password</h5>
    <div class="alert alert-info mx-2 my-4" role="alert">
      You're almost done! You can now enter a new password for your account.
    </div>
    <form @submit.prevent="onSubmit">
      <api-provided-form
        form-name="setNewPassword"
        :data="data"
        @change="onFormChange"
      />
      <hr />
      <button class="btn btn-primary" type="submit">Save new password</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useForm } from '../compositions';
import {
  TOAST_FORM_INVALID,
  TOAST_PASSWORD_RESET_SET_FAILED,
  TOAST_PASSWORD_RESET_SET_SUCCESS,
} from '../const';
import api from '../modules/api';
import toaster from '../modules/toaster';
import ApiProvidedForm from './ApiProvidedForm.vue';

export default defineComponent({
  components: { ApiProvidedForm },
  name: 'RequestPasswordReset',
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  setup(props: any, { emit }) {
    return {
      ...useForm(emit),
    };
  },
  methods: {
    async onSubmit(): Promise<void> {
      const { password, passwordConfirm } = this.data;

      if (this.errorCount <= 0 && password === passwordConfirm) {
        const { token } = this;

        if (await api.setNewPassword(password, passwordConfirm, token)) {
          await this.$router.push({ name: 'signIn' });
          toaster.success({
            message: TOAST_PASSWORD_RESET_SET_SUCCESS,
            duration: 15 * 1000,
          });
        } else {
          toaster.error(TOAST_PASSWORD_RESET_SET_FAILED);
        }
      } else {
        toaster.error(TOAST_FORM_INVALID);
      }
    },
  },
});
</script>
