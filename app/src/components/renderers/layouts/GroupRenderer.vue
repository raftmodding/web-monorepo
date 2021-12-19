<template>
  <fieldset v-if="layout.visible" :class="styles.group.root">
    <legend v-if="label" :class="styles.group.label">
      {{ label }}
    </legend>
    <div
      v-for="(element, index) in elements"
      :key="`${layout.path}-${index}`"
      :class="styles.group.item"
    >
      <dispatch-renderer
        :schema="layout.schema"
        :uischema="element"
        :path="layout.path"
        :enabled="layout.enabled"
        :renderers="layout.renderers"
        :cells="layout.cells"
      />
    </div>
  </fieldset>
</template>

<script lang="ts">
import {
  and,
  isLayout,
  JsonFormsRendererRegistryEntry,
  Layout,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsLayout,
} from '@jsonforms/vue';
import { useVanillaLayout } from '../util';

const layoutRenderer = defineComponent({
  name: 'group-renderer',
  components: {
    DispatchRenderer,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props) {
    return useVanillaLayout(useJsonFormsLayout(props));
  },
});

export default layoutRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: layoutRenderer,
  tester: rankWith(2, and(isLayout, uiTypeIs('Group'))),
};
</script>
