<template>
  <div class="container">
    <section class="my-3">
      <h1>Account</h1>
      <div class="card my-3 mx-1">
        <div class="card-body">
          <div class="card-text">
            <form>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="username"
                  >Username</label
                >
                <div class="col-sm-10">
                  <div class="w-100">
                    <label
                      class="btn btn-outline-secondary disabled"
                      aria-describedby="usernameHelp"
                      id="username"
                    >
                      {{ user.username }}
                    </label>
                  </div>
                  <small class="text-muted" id="usernameHelp">
                    This name will be used in URLs and is shown on your account
                    and mod pages.
                  </small>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="email"
                  >E-Mail</label
                >
                <div class="col-sm-10">
                  <div class="w-100">
                    <label
                      class="btn btn-outline-secondary disabled"
                      aria-describedby="emailHelp"
                      id="email"
                    >
                      {{ user.email }}
                    </label>
                  </div>
                  <small class="text-muted" id="emailHelp">
                    This address will be used to contact you. It's
                    <u>not</u> public!
                  </small>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="email"
                  >Password:</label
                >
                <div class="col-sm-10">
                  <router-link
                    :to="{ name: 'changePassword' }"
                    class="btn btn-warning stretched-link"
                  >
                    Change password
                  </router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ul>
        <li>
          Go to your
          <router-link
            :to="{ name: 'user', params: { username: user.username } }"
          >
            public profile
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'contact' }">Contact us</router-link>
          if you have any questions or want to have your account deleted
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Session, User } from '../@types';
import { tooltip } from '../_legacy';

import { state } from '../modules/stateManager';
import { useActiveMeta } from 'vue-meta';

export default defineComponent({
  name: 'AccountPage',
  setup() {
    const meta = useActiveMeta();

    meta.title = 'Account';
  },
  computed: {
    session(): Session {
      return state.session;
    },
    user(): User {
      return state.session?.user || ({} as User);
    },
  },
  mounted() {
    tooltip();
  },
});
</script>

<style scoped lang="scss">
@import '../assets/styles/variables';

body {
  label.btn.btn-outline-secondary {
    opacity: 1;
    color: #000;
    transition: color $dark-mode-transition-duration $dark-mode-transition-type;
  }

  &[data-theme='dark'] {
    label.btn.btn-outline-secondary {
      color: #fff;
    }
  }
}
</style>
