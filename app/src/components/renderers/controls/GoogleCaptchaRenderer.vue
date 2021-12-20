<template>
  <div class="form-group">
    <label :for="control.id">Google Captcha</label>
    <re-captcha
      :site-key="appliedOptions.siteKey"
      @verify="onVerify"
      @expire="resetToken"
      @fail="resetToken"
      :id="control.id"
      :theme="theme"
    />
  </div>
</template>

<script lang="ts">
import {
  and,
  ControlElement,
  isStringControl,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
} from '@jsonforms/core';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { defineComponent } from 'vue';
import { state } from '../../../modules/stateManager';
import ReCaptcha from '../../ReCaptcha.vue';
import { useVanillaControl } from '../util';
import { default as ControlWrapper } from './ControlWrapper.vue';

const controlRenderer = defineComponent({
  name: 'google-captcha-renderer',
  components: {
    ControlWrapper,
    ReCaptcha,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props) {
    return useVanillaControl(useJsonFormsControl(props));
  },
  computed: {
    theme(): string {
      return state.theme;
    },
  },
  methods: {
    onVerify(token: string) {
      this.onChange({ target: { value: token } });
    },
    resetToken() {
      this.onChange({ target: { value: undefined } });
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, and(isStringControl, optionIs('recaptcha', true))),
};
</script>
