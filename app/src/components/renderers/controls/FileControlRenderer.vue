<template>
  <control-wrapper
    v-bind="controlWrapper"
    type="file"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    :show-errors="showErrors"
  >
    <div class="custom-file">
      <input
        type="file"
        :id="control.id + '-input'"
        :accept="appliedOptions.accept"
        class="custom-file-input"
        :class="[styles.control.file, { [validationCls]: showErrors }]"
        :disabled="!control.enabled"
        :autofocus="appliedOptions.focus"
        :placeholder="placeholder"
        @input="onFileChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <label
        class="custom-file-label"
        for="customFile"
        v-html="filename || placeholder"
      ></label>
    </div>
  </control-wrapper>
</template>

<script lang="ts">
import {
  and,
  ControlElement,
  isObjectControl,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
} from '@jsonforms/core';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { defineComponent, ref, Ref } from 'vue';
import Icon from '../../Icon.vue';
import { toBase64 } from '../styles';
import { useVanillaControl } from '../util';
import { default as ControlWrapper } from './ControlWrapper.vue';

const controlRenderer = defineComponent({
  name: 'file-control-renderer',
  components: {
    Icon,
    ControlWrapper,
  },
  inject: ['jsonforms'],
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props) {
    const filename = ref(null);
    return {
      ...useVanillaControl(useJsonFormsControl(props), (target) => ({
        name: target._$name,
        base64: target._$base64,
      })),
      filename,
    };
  },
  methods: {
    async onFileChange(event: Event) {
      let file: File;
      let value: any;
      const { files } = event.target as HTMLInputElement;

      if (files?.[0]) {
        file = files[0];
        this.filename = `&#8230;/${file.name}`;
        value = await toBase64(file);
      }
      return this.onChange({
        target: { _$base64: value, _$name: file.name || null, value },
      } as any);
    },
  },
});

export default controlRenderer;

export const isFileControl = and(isObjectControl, optionIs('file', true));

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, isFileControl),
};
</script>

<style scoped lang="scss">
.custom-file {
  .custom-file-label {
    color: #a3a3a3;
  }
}
</style>
