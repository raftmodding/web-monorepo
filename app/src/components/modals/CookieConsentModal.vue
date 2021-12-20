<template>
  <!--googleoff: all-->
  <div
    v-if="show"
    role="dialog"
    aria-live="polite"
    aria-label="cookieconsent"
    aria-describedby="cookieconsent:desc"
    class="cc-window cc-floating cc-type-info cc-theme-classic cc-bottom cc-right cc-color-override--1762072787"
    style=""
  >
    <span id="cookieconsent:desc" class="cc-message">
      We use cookies and other technologies to analyse traffic and enhance your
      experience.
      <a
        aria-label="learn more about cookies"
        role="button"
        tabindex="0"
        class="cc-link"
        href="/privacy"
        rel="noopener noreferrer nofollow"
        target="_blank"
        >Learn more</a
      >
    </span>
    <div class="cc-compliance">
      <button
        aria-label="dismiss cookie message"
        role="button"
        tabindex="0"
        class="btn btn-outline-primary w-50"
        @click="acceptCookieConsent"
      >
        Got it!
      </button>
    </div>
  </div>
  <!--googleon: all-->
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

import { LOCAL_STORAGE_COOKIE_CONSENT } from '../../const';

export default defineComponent({
  name: 'CookieConsentModal',
  setup() {
    const show: Ref<boolean> = ref(true);
    const cookieConsent: string = localStorage.getItem(
      LOCAL_STORAGE_COOKIE_CONSENT,
    );

    if (cookieConsent && cookieConsent === 'accepted') {
      show.value = false;
    }

    return {
      show,
    };
  },
  methods: {
    acceptCookieConsent(): void {
      localStorage.setItem(LOCAL_STORAGE_COOKIE_CONSENT, 'accepted');
      this.show = false;
    },
  },
});
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables';

.cc-window {
  position: fixed;
  overflow: hidden;
  box-sizing: border-box;
  font-family: Helvetica, Calibri, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5em;
  display: flex;
  flex-wrap: nowrap;
  z-index: $z-index-cookie-consent;
  background-color: #edeff5;
  color: #838391;
}

.cc-revoke {
  position: fixed;
  overflow: hidden;
  box-sizing: border-box;
  font-family: Helvetica, Calibri, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5em;
  display: flex;
  flex-wrap: nowrap;
  z-index: 9999;
  padding: 0.5em;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.cc-window.cc-static {
  position: static;
}

.cc-window.cc-floating {
  padding: 2em;
  max-width: 24em;
  flex-direction: column;

  .cc-compliance {
    flex: 1 0 auto;
  }
}

.cc-window.cc-banner {
  padding: 1em 1.8em;
  width: 100%;
  flex-direction: row;
  align-items: center;
}

.cc-header {
  font-size: 18px;
  font-weight: bold;
}

.cc-link {
  cursor: pointer;
  opacity: 0.8;
  display: inline-block;
  padding: 0.2em;
  text-decoration: underline;
  color: #838391;

  &:hover {
    opacity: 1;
  }

  &:active {
    color: initial;
  }

  &:visited {
    color: initial;
  }
}

.cc-close {
  cursor: pointer;
  display: block;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  font-size: 1.6em;
  opacity: 0.9;
  line-height: 0.75;

  &:hover {
    opacity: 1;
  }

  &:focus {
    opacity: 1;
  }
}

.cc-floating.cc-theme-classic {
  padding: 1.2em;
  border-radius: 5px;
}

.cc-floating.cc-type-info.cc-theme-classic {
  .cc-compliance {
    text-align: center;
    display: inline;
    flex: none;
  }

  .cc-btn {
    display: inline-block;
  }
}

.cc-revoke.cc-top {
  top: 0;
  left: 3em;
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
}

.cc-revoke.cc-bottom {
  bottom: 0;
  left: 3em;
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
}

.cc-revoke.cc-left {
  left: 3em;
  right: unset;
}

.cc-revoke.cc-right {
  right: 3em;
  left: unset;
}

.cc-top {
  top: 1em;
}

.cc-left {
  left: 1em;
}

.cc-right {
  right: 1em;
}

.cc-bottom {
  bottom: 1em;
}

.cc-floating {
  > .cc-link {
    margin-bottom: 1em;
  }

  .cc-message {
    display: block;
    margin-bottom: 1em;
  }
}

.cc-banner.cc-top {
  left: 0;
  right: 0;
  top: 0;
}

.cc-banner.cc-bottom {
  left: 0;
  right: 0;
  bottom: 0;
}

.cc-banner {
  .cc-message {
    display: block;
    flex: 1 1 auto;
    max-width: 100%;
    margin-right: 1em;
  }
}

.cc-compliance {
  display: flex;
  align-items: center;
  align-content: space-between;
}
</style>
