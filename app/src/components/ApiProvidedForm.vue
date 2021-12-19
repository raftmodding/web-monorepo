<template>
  <json-forms
    ref="form"
    class="api-provided-form"
    :schema="schema"
    :uischema="uischema"
    :renderers="renderers"
    :ajv="ajv"
    :config="{
      showUnfocusedDescription: true,
      hideRequiredAsterisk: true,
      showErrors,
    }"
  />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { JsonForms } from '@jsonforms/vue';

import { defaultStyles, mergeStyles, vanillaRenderers } from './renderers';
import api from '../modules/api';
import ajv from '../modules/ajv';

export default defineComponent({
  name: 'ApiProvidedForm',
  components: { JsonForms },
  props: {
    formName: {
      type: String,
      required: true,
    },
    initialData: {
      type: Object,
      required: false,
      default: {},
    },
    showErrors: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const errors: Ref<string[]> = ref(null);
    const schema: Ref<object> = ref(null);
    const uischema: Ref<object> = ref(null);
    const renderers = Object.freeze(vanillaRenderers);

    (async () => {
      const formResponse = await api.getForm(props.formName);
      schema.value = formResponse.schema;
      uischema.value = formResponse.uischema;
    })();

    return {
      errors,
      schema,
      uischema,
      renderers,
      ajv,
    };
  },
  provide() {
    const formControlStyles = 'form-control';
    const btnStyles =
      'focus:outline-none text-sm py-2.5 px-5 rounded-full border';
    const customStyles = {
      verticalLayout: {
        item: 'form-group',
        label: 'card-title',
      },
      horizontalLayout: {
        item: 'form-group',
        label: 'card-title',
      },
      control: {
        input: formControlStyles,
        select: formControlStyles + ' custom-select',
        textarea: formControlStyles,
        option: formControlStyles,
        label: '',
        error: 'validation-feedback',
        description: 'text-muted',
      },
      arrayList: {
        addButton: btnStyles,
        itemMoveUp: btnStyles,
        itemMoveDown: btnStyles,
        itemDelete: btnStyles,
      },
    };
    return { styles: mergeStyles(defaultStyles, customStyles) };
  },
});
</script>

<style scoped lang="scss">
@import '../assets/styles/variables';

.input-group-text {
  cursor: pointer;
  padding: 0.2rem;

  .icon {
    width: 20px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.5);
  }
}

.api-provided-form {
  &::v-deep(.validation-feedback) {
    display: block !important;
    transition: opacity 0.3s ease-in-out;
  }

  &::v-deep(.description) {
    font-size: 80%;
    font-weight: 400;
  }

  &::v-deep(.with-label-wrapper) {
    &.type-boolean {
      display: flex;
      flex-direction: row;

      .label {
        margin-right: 1rem;
        margin-bottom: 0;
      }
    }
  }
}
</style>
