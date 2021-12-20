<template>
  <control-wrapper
    :class="[
      'multi-string',
      { 'multi-string-markdown': appliedOptions.markdown },
    ]"
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    :showErrors="showErrors"
  >
    <textarea
      ref="textarea"
      :id="control.id + '-input'"
      :class="styles.control.textarea"
      :value="control.data"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      @input="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </control-wrapper>
</template>

<script lang="ts">
import {
  and,
  ControlElement,
  isMultiLineControl,
  isStringControl,
  JsonFormsRendererRegistryEntry,
  rankWith,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { default as ControlWrapper } from './ControlWrapper.vue';
import { useVanillaControl } from '../util';
import SimpleMDE from 'simplemde';

const controlRenderer = defineComponent({
  name: 'multi-string-control-renderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props) {
    return useVanillaControl(useJsonFormsControl(props));
  },
  mounted() {
    if (this.appliedOptions.markdown) {
      const simpleMde = new SimpleMDE({
        element: this.$refs.textarea as HTMLElement,
        forceSync: true,
        placeholder: this.placeholder,
      });
      simpleMde.codemirror.on('change', () => {
        this.onChange({ target: { value: simpleMde.value() } } as any);
      });
    }
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, and(isStringControl, isMultiLineControl)),
};
</script>
