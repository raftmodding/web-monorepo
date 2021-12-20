// Highly specified renderer, not suitable for general usage!

<template>
  <div v-if="layout.visible" class="form-group custom-range-selection">
    <label v-if="label">{{ label }}</label>
    <div class="input-group">
      <template
        v-for="(element, index) in elements"
        :key="`${layout.path}-${index}`"
      >
        <dispatch-renderer
          :schema="layout.schema"
          :uischema="element"
          :path="layout.path"
          :enabled="layout.enabled"
          :renderers="layout.renderers"
          :cells="layout.cells"
        />
        <div
          v-if="index !== elements.length - 1"
          class="input-group-prepend input-group-append d-none d-sm-flex flex-column"
        >
          <span class="input-group-text">-</span>
          <div class="error validation-feedback valid-feedback opacity-0">
            &nbsp;
          </div>
        </div>
      </template>
    </div>
  </div>
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

const rangeSelectionRenderer = defineComponent({
  name: 'custom-range-selection-renderer',
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

export default rangeSelectionRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: rangeSelectionRenderer,
  tester: rankWith(2, and(isLayout, uiTypeIs('CustomRangeSelection'))),
};
</script>

<style scoped lang="scss">
@import '../../../assets/styles/variables';

.custom-range-selection {
  .input-group-prepend {
    width: 33px;

    .input-group-text {
      height: 100%;
    }

    .feedback-placeholder {
      height: 20px;
    }
  }

  ::v-deep(.control) {
    width: 100%;

    &:first-child {
      .multiselect {
        .multiselect__tags {
          border-top-left-radius: 0.25rem;
          border-bottom-left-radius: 0.25rem;
        }
      }
    }

    &:last-child {
      .multiselect {
        .multiselect__tags {
          border-top-right-radius: 0.25rem;
          border-bottom-right-radius: 0.25rem;
        }
      }
    }

    .label {
      font-size: 90%;
      color: #aaa;
    }
  }
}

@media (min-width: 576px) {
  .custom-range-selection {
    ::v-deep(.control) {
      width: calc(50% - 33px / 2);

      .label {
        display: none;
      }
    }
  }
}
</style>
