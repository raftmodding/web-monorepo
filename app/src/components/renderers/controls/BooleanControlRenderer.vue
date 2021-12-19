<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    :showErrors="showErrors"
  >
    <input
      type="checkbox"
      :class="styles.control.checkbox"
      :id="control.id + '-input'"
      :checked="!!control.data"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </control-wrapper>
</template>

<script lang="ts">
import {
  ControlElement,
  isBooleanControl,
  JsonFormsRendererRegistryEntry,
  rankWith,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { default as ControlWrapper } from './ControlWrapper.vue';
import { useVanillaControl } from '../util';
import Icon from '../../Icon.vue';

const controlRenderer = defineComponent({
  name: 'boolean-control-renderer',
  components: {
    Icon,
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props) {
    return {
      ...useVanillaControl(
        useJsonFormsControl(props),
        (target) => target.checked,
      ),
    };
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isBooleanControl),
};
</script>
