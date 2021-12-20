<template>
  <div class="container">
    <div class="row justify-content-center my-5 mx-1">
      <div class="col-md-7">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Sign up</h5>
            <form @submit.prevent="onSubmit">
              <api-provided-form
                form-name="signUp"
                :data="data"
                @change="onFormChange"
              />
              <button class="btn btn-primary" type="submit">Sign up</button>
            </form>
          </div>
        </div>
        <ul class="mt-2">
          <li>
            Already have an account?
            <router-link :to="{ name: 'signIn' }">Sign in</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useActiveMeta } from 'vue-meta';
import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import { useForm } from '../compositions';
import { TOAST_FORM_INVALID, TOAST_SIGNUP_MAIL_SENT } from '../const';
import api from '../modules/api';
import toaster from '../modules/toaster';

export default defineComponent({
  name: 'SignUpPage',
  components: { ApiProvidedForm },
  setup(props, { emit }) {
    const meta = useActiveMeta();

    meta.title = 'Sign up';

    return {
      ...useForm(emit),
    };
  },
  async beforeRouteEnter(to) {
    const { token } = to.query;

    if (token) {
      await api.deleteAccountCreation(token as string);
      toaster.success({
        message: `You account has been successfully created and confirmed.`,
        duration: 30 * 1000,
      });

      return { name: 'signIn' };
    }
  },
  methods: {
    async onSubmit() {
      if (this.errorCount <= 0) {
        const { username, email, password, recaptcha } = this.data;

        if (await api.signUp(username, email, password, recaptcha)) {
          await this.$router.push({ name: 'signIn' });
          toaster.success({
            message: TOAST_SIGNUP_MAIL_SENT,
            duration: 60 * 1000,
            icon: {
              className: 'fas fa-paper-plane text-white',
              tagName: 'i',
              text: null,
              color: null,
            },
          });
        }
      } else {
        toaster.error(TOAST_FORM_INVALID);
      }
    },
  },
});
</script>
