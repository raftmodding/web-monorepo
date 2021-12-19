<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    :showErrors="showErrors"
  >
    <!-- @update:modelValue as alternative -->
    <vue-multiselect
      :id="control.id + '-input'"
      :options="control.options"
      track-by="value"
      label="label"
      :close-on-select="true"
      :clear-on-select="false"
      :class="styles.control.select"
      v-model="renderedValue"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="isFocused ? `search…` : placeholder"
      deselect-label="✓"
      select-label=""
      selected-label="✓"
      @select="onChange({ target: $event })"
      @open="isFocused = true"
      @close="isFocused = false"
    >
      <template v-slot:noResult> No matches</template>
    </vue-multiselect>
  </control-wrapper>
</template>

<script lang="ts">
import {
  ControlElement,
  isOneOfEnumControl,
  JsonFormsRendererRegistryEntry,
  rankWith,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import { rendererProps, useJsonFormsOneOfEnumControl } from '@jsonforms/vue';
//@ts-ignore
import VueMultiselect from 'vue-multiselect';

import { default as ControlWrapper } from './ControlWrapper.vue';
import { useVanillaControl } from '../util';

const controlRenderer = defineComponent({
  name: 'enum-oneof-control-renderer',
  components: {
    ControlWrapper,
    VueMultiselect,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props) {
    return useVanillaControl(useJsonFormsOneOfEnumControl(props));
  },
  computed: {
    renderedValue: {
      get() {
        return this.control.options.find(
          (option) => option.value === this.control.data,
        );
      },
      set() {
        //nothing, this is done by jsonforms in the background. to prevent warnings this function must exist!
      },
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, isOneOfEnumControl),
};
</script>
