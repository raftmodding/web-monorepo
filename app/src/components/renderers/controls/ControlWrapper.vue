<template>
  <div
    v-if="visible"
    :class="[styles.control.root, `type-${type}`, { disabled }]"
    :id="id"
  >
    <div :class="[styles.control.withLabelWrapper, `type-${type}`]">
      <label
        :for="id + '-input'"
        :class="styles.control.label"
        v-html="computedLabel"
      ></label>
      <div :class="styles.control.wrapper">
        <slot></slot>
      </div>
    </div>
    <div
      :class="[
        styles.control.error,
        errors ? 'invalid-feedback' : 'valid-feedback',
        { 'opacity-0': !showErrors },
      ]"
      v-html="errors ? errors : `Looks good ${checkMarkIcon}`"
    ></div>
    <div
      v-if="description"
      :class="styles.control.description"
      v-html="description"
    ></div>
  </div>
</template>

<script lang="ts">
import { computeLabel, isDescriptionHidden } from '@jsonforms/core';
import { CompType, defineComponent } from 'vue';
import { CHECK_MARK_SVG_DATA_URL } from '../../../const';
import { Styles } from '../styles';
import { Options } from '../util';

export default defineComponent({
  name: 'control-wrapper',
  props: {
    id: {
      required: true as true,
      type: String,
    },
    description: {
      required: false as false,
      type: String,
      default: undefined,
    },
    errors: {
      required: false as false,
      type: String,
      default: undefined,
    },
    label: {
      required: false as false,
      type: String,
      default: undefined,
    },
    appliedOptions: {
      required: false as false,
      type: Object as CompType<Options, ObjectConstructor>,
      default: undefined,
    },
    visible: {
      required: false as false,
      type: Boolean,
      default: true,
    },
    required: {
      required: false as false,
      type: Boolean,
      default: false,
    },
    isFocused: {
      required: false as false,
      type: Boolean,
      default: false,
    },
    styles: {
      required: true,
      type: Object as CompType<Styles, ObjectConstructor>,
    },
    showErrors: {
      type: Boolean,
    },
    type: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
  },
  setup() {
    return {
      checkMarkIcon: `<img src="${CHECK_MARK_SVG_DATA_URL}" alt="checkmark-svg"/>`,
    };
  },
  computed: {
    showDescription(): boolean {
      return !isDescriptionHidden(
        this.visible,
        this.description,
        this.isFocused,
        !!this.appliedOptions?.showUnfocusedDescription,
      );
    },
    computedLabel(): string {
      return computeLabel(
        this.label,
        this.required,
        !!this.appliedOptions?.hideRequiredAsterisk,
      );
    },
  },
});
</script>

<style scoped lang="scss">
.type-boolean {
  .wrapper {
    position: relative;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.type-string {
  &.multi-string {
    &.multi-string-markdown {
      position: relative;
      .validation-feedback {
        position: absolute;
        bottom: 10px;
        left: 5px;
      }
    }
  }
}
</style>
