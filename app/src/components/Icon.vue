<template>
  <i
    class="icon mx-1"
    :class="[`fa${type}`, `fa-${name}`, size ? `fa-${size}` : null]"
    :title="title"
  ></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export type IconOptions = {
  name: string;
  type?: 's' | 'r' | 'b';
  size?:
    | 'xs'
    | 'sm'
    | 'lg'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | '6x'
    | '7x'
    | '8x'
    | '9x'
    | '10x';
};

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 's',
      validator(type: string): boolean {
        return ['s', 'r', 'b'].includes(type);
      },
    },
    size: String,
    title: String,
  },
});
</script>
