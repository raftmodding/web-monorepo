<template>
  <div class="container">
    <div class="row justify-content-center my-5 mx-1">
      <div>
        <div class="card">
          <request-password-reset v-if="!token" />
          <perform-password-reset v-else :token="token" />
        </div>
        <ul class="mt-2">
          <li>
            Need an account?
            <router-link :to="{ name: 'register' }">Sign up</router-link>
          </li>
          <li>
            Remembered your password?
            <router-link :to="{ name: 'signIn' }">Sign in</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useActiveMeta } from 'vue-meta';
import { useRoute } from 'vue-router';
import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import PerformPasswordReset from '../components/PerformPasswordReset.vue';
import RequestPasswordReset from '../components/RequestPasswordReset.vue';
import { TOAST_PASSWORD_RESET_INVALID_TOKEN } from '../const';
import api from '../modules/api';
import toaster from '../modules/toaster';

export default defineComponent({
  components: { ApiProvidedForm, RequestPasswordReset, PerformPasswordReset },
  setup(props: any, { emit }) {
    const route = useRoute();
    const token: Ref<string> = ref((route.query.token as string) || null);
    const meta = useActiveMeta();

    meta.title = 'Forgot password';

    return {
      token,
    };
  },
  async beforeRouteEnter(to) {
    const { token } = to.query;

    if (token) {
      const passwordReset = await api.getPasswordReset(token as string);

      if (!passwordReset) {
        toaster.error({
          message: TOAST_PASSWORD_RESET_INVALID_TOKEN,
          duration: 30 * 1000,
        });
        return { name: 'signIn' };
      }
    }

    return true;
  },
});
</script>
