<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-blue sticky-top">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="navbar-brand mr-2 logo">
        <img src="../assets/images/raftmodding.png" alt="logo" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li
            class="mx-2 nav-item"
            :class="{
              active:
                $route.path.startsWith('/download') ||
                $route.path.startsWith('/loader'),
            }"
          >
            <router-link :to="{ name: 'download' }" class="nav-link">
              <i class="fas fa-bolt mx-1"></i> Mod loader
            </router-link>
          </li>
          <li
            class="mx-2 nav-item"
            :class="{ active: $route.path.startsWith('/mods') }"
          >
            <router-link :to="{ name: 'mods' }" class="nav-link">
              <i class="fas fa-plug mx-1"></i> Mods
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="mx-1 nav-item">
            <a
              class="nav-link"
              href="/discord"
              data-toggle="tooltip"
              title=""
              target="_blank"
              data-original-title="Discord server"
            >
              <i class="fab fa-discord mx-2"></i>
              <span class="d-inline d-lg-none">Discord server</span>
            </a>
          </li>
          <li class="mx-1 nav-item">
            <a
              class="nav-link"
              href="/docs"
              target="_blank"
              data-toggle="tooltip"
              title=""
              data-original-title="Documentation"
            >
              <i class="fas fa-book mx-2"></i
              ><span class="d-inline d-lg-none">Documentation</span>
            </a>
          </li>
          <li class="mx-1 nav-item">
            <a
              class="nav-link donate-button"
              href="#"
              data-toggle="tooltip"
              title=""
              data-original-title="Donate"
            >
              <i class="fas fa-donate mx-2"></i
              ><span class="d-inline d-lg-none">Support us</span>
            </a>
          </li>
          <li v-if="isSessionExpired" class="nav-item">
            <router-link
              :to="{ name: 'signIn', query: { redirect: $route.name } }"
              class="nav-link"
              :class="{ active: $route.path.startsWith('/signin') }"
            >
              <icon name="sign-in-alt" /> Login
            </router-link>
          </li>
          <template v-else>
            <li class="nav-item dropdown mx-1">
              <a
                class="nav-link d-lg-flex justify-content-between align-items-center"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                id="navbarDropdownMenuLink"
                :title="user.username"
              >
                <i class="fas fa-user mx-2"></i>
                {{ vUsername }}
                <icon name="caret-down" class="float-right ml-md-1" />
              </a>
              <div
                class="dropdown-menu mb-2"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <router-link
                  :to="{ name: 'user', params: { username: user.username } }"
                  class="dropdown-item"
                >
                  <i class="fas fa-user-circle mr-1"></i>
                  {{ user.username }} profile
                </router-link>
                <router-link :to="{ name: 'account' }" class="dropdown-item">
                  <i class="fas fa-cog mr-1"></i> Account settings
                </router-link>
                <button class="dropdown-item" @click="logout">
                  <i class="fas fa-sign-out-alt mr-1"></i> Sign out
                </button>
              </div>
            </li>
            <li class="mx-1 nav-item dropdown active">
              <a
                class="nav-link"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
                id="navbarAddDropdown"
              >
                <span class="d-none d-lg-inline">
                  <i
                    class="fas fa-plus-circle ml-3"
                    style="transform: scale(2)"
                  ></i>
                </span>
                <span class="d-inline d-lg-none">
                  <i class="fas fa-plus mx-2"></i>
                  Add
                  <icon name="caret-down" class="float-right" />
                </span>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right mb-2"
                aria-labelledby="navbarAddDropdown"
              >
                <router-link :to="{ name: 'addMod' }" class="dropdown-item">
                  <i class="fas fa-plug mr-1" style="width: 20px"></i>
                  Add a mod
                </router-link>
                <template v-if="isAdmin">
                  <hr class="mt-2 mb-1" />
                  <small class="text-muted ml-4">ADMIN TOOLS</small>
                  <router-link
                    :to="{ name: 'addLoaderVersion' }"
                    class="dropdown-item"
                  >
                    <i class="fas fa-bolt mr-1" style="width: 20px"></i>
                    Add a loader version
                  </router-link>
                  <router-link
                    :to="{ name: 'addLauncherVersion' }"
                    class="dropdown-item"
                  >
                    <i class="fas fa-desktop mr-1" style="width: 20px"></i>
                    Add a launcher version
                  </router-link>
                  <router-link
                    :to="{ name: 'addRaftVersion' }"
                    class="dropdown-item"
                  >
                    <i class="fas fa-anchor mr-1" style="width: 20px"></i>
                    Add a Raft version
                  </router-link>
                </template>
              </div>
            </li>
            <li v-if="isAdmin" class="mx-1 nav-item dropdown">
              <a
                class="nav-link"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                id="navbarAdminDropdown"
              >
                <span class="d-none d-lg-inline">
                  <i class="fas fa-cogs ml-3"></i>
                </span>
                <span class="d-inline d-lg-none">
                  <i class="fas fa-cogs mx-2"></i> Admin options
                </span>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right mb-2"
                aria-labelledby="navbarAdminDropdown"
              >
                <router-link
                  :to="{ name: 'raftVersionManagement' }"
                  class="dropdown-item"
                >
                  <i class="fas fa-anchor mr-1" style="width: 20px"></i> Raft
                  version management
                </router-link>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
  <the-donation-modal />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Session, User } from '../@types';
import { ROLE_ADMIN } from '../const';
import { isSessionExpired, killSession, state } from '../modules/stateManager';
import toaster from '../modules/toaster';
import Icon from './Icon.vue';
import TheDonationModal from './modals/TheDonationModal.vue';

export default defineComponent({
  name: 'TheMainNav',
  components: { Icon, TheDonationModal },
  computed: {
    session(): Session {
      return state.session;
    },
    user(): User {
      return (state.session?.user || {}) as User;
    },
    isAdmin(): boolean {
      return this.user?.role === ROLE_ADMIN;
    },
    theme(): string {
      return state.theme;
    },
    isSessionExpired(): boolean {
      return isSessionExpired();
    },
    vUsername(): string {
      if (this.user.username.length <= 10) {
        return this.user.username;
      } else {
        return `${this.user.username?.substr(0, 10)}…`;
      }
    },
  },
  methods: {
    async logout(): Promise<void> {
      await killSession();
      await this.$router.push({ name: 'signIn' });
      toaster.success('Logout successful');
    },
  },
});
</script>

<style scoped lang="scss">
@import '../assets/styles/variables';

.navbar {
  transition: background-color $dark-mode-transition-duration
    $dark-mode-transition-type;

  .nav-link {
    transition: color 0.25s ease-in-out;
  }
}
</style>
