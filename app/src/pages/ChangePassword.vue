<template>
  <div class="container">
    <div class="row justify-content-center my-5 mx-1">
      <div>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="onSubmit">
              <api-provided-form
                form-name="changePassword"
                @change="onFormChange"
                :data="data"
              />
              <div class="form-group mb-0 d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">
                  <icon name="paper-plane" /> Submit password change
                </button>
              </div>
            </form>
          </div>
        </div>
        <ul class="mt-3">
          <li>
            Don't want to change your password?
            <router-link :to="{ name: 'account' }">Go back</router-link>
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
import Icon from '../components/Icon.vue';
import { useForm } from '../compositions';
import api from '../modules/api';
import { killSession } from '../modules/stateManager';
import toaster from '../modules/toaster';
import { passwordValidator } from '../_legacy';

export default defineComponent({
  name: 'ChangePasswordPage',
  components: { ApiProvidedForm, Icon },
  setup(props, { emit }) {
    const meta = useActiveMeta();

    meta.title = 'Change your password';

    return useForm(emit);
  },
  mounted() {
    passwordValidator();
  },
  methods: {
    async onSubmit() {
      const { currentPassword, password, passwordConfirm } = this.data;
      if (
        await api.changePassword(currentPassword, password, passwordConfirm)
      ) {
        toaster.success(`<b>Your password was updated!</b><br/>
                                 You have to login again!`);
        await killSession();
        await this.$router.push({ name: 'signIn' });
      }
    },
  },
});
</script>
