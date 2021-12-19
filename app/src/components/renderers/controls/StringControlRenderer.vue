<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    :show-errors="showErrors"
  >
    <div class="input-group">
      <input
        ref="input"
        :type="inputType"
        :id="control.id + '-input'"
        :class="[styles.control.input, { [validationCls]: showErrors }]"
        :value="control.data"
        :disabled="!control.enabled"
        :autofocus="appliedOptions.focus"
        :placeholder="placeholder"
        @input="onChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <div v-if="appliedOptions.password" class="input-group-append">
        <span
          class="input-group-text show-password"
          :title="`${showPassword ? 'Hide' : 'Show'} password!`"
          @click="showPassword = !showPassword"
        >
          <icon :name="showPassword ? 'eye-slash' : 'eye'" />
        </span>
      </div>
    </div>
  </control-wrapper>
</template>

<script lang="ts">
import {
  ControlElement,
  isStringControl,
  JsonFormsRendererRegistryEntry,
  rankWith,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { default as ControlWrapper } from './ControlWrapper.vue';
import { useVanillaControl } from '../util';
import Icon from '../../Icon.vue';

const controlRenderer = defineComponent({
  name: 'string-control-renderer',
  components: {
    Icon,
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props) {
    return useVanillaControl(useJsonFormsControl(props));
  },
  computed: {
    inputType() {
      if (this.appliedOptions.password && !this.showPassword) {
        return 'password';
      } else {
        return 'text';
      }
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isStringControl),
};
</script>

<style scoped lang="scss">
.show-password {
  padding: 0.25rem;
  cursor: pointer;

  .icon {
    width: 20px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.3);
  }
}
</style>
