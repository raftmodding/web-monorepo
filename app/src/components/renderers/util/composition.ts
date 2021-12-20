import { useStyles } from '../styles';
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import {
  composePaths,
  findUISchema,
  getFirstPrimitiveProp,
  Resolve,
} from '@jsonforms/core';

/**
 * Adds styles, isFocused, appliedOptions and onChange
 */
export const useVanillaControl = <
  I extends { control: any; handleChange: any }
>(
  input: I,
  adaptTarget: (target: any) => any = (v) => v.value,
) => {
  const appliedOptions = computed(() =>
    merge(
      {},
      cloneDeep(input.control.value.config),
      cloneDeep(input.control.value.uischema.options),
    ),
  );

  const isFocused = ref(false);

  const onChange = (event: Event) => {
    function prepareValue(value: any) {
      const type = input.control?.value?.schema?.type;

      if (type === 'number') {
        value = Number(value);
      } else if (type === 'boolean') {
        value = Boolean(value);
      }

      if (!value && value !== 0) {
        return undefined;
      }

      return value;
    }

    input.handleChange(
      input.control.value.path,
      prepareValue(adaptTarget(event.target)),
    );
  };

  const controlWrapper = computed(() => {
    const {
      id,
      description,
      errors,
      label,
      visible,
      required,
      disabled,
      schema: { type },
    } = input.control.value;
    return {
      id,
      description,
      errors,
      label,
      visible,
      required,
      type,
      disabled,
    };
  });

  const showErrorsScoped = ref(false);

  watch(
    () => input.control.value.data,
    (data: string | number) => {
      if (data || data === 0) {
        showErrorsScoped.value = true;
      }
    },
  );

  const showErrors = computed(() => {
    return appliedOptions.value.showErrors || showErrorsScoped.value;
  });

  const showPassword = ref(false);

  const placeholder = computed(() => {
    if (appliedOptions.value.password && !showPassword.value) {
      return '*********';
    } else if (appliedOptions.value.placeholder) {
      return appliedOptions.value.placeholder;
    } else {
      return input.control.value.label;
    }
  });

  const validationCls = computed(() => {
    return input.control.value.errors ? 'is-invalid' : 'is-valid';
  });

  onMounted(async () => {
    const instance = getCurrentInstance();

    if (instance.refs.input && appliedOptions.value.focus) {
      await nextTick();
      (instance.refs.input as HTMLInputElement).focus();
    }
  });
  return {
    ...input,
    styles: useStyles(input.control.value.uischema),
    isFocused,
    appliedOptions,
    controlWrapper,
    validationCls,
    showErrors,
    showPassword,
    placeholder,
    onChange,
  };
};

/**
 * Adds styles and appliedOptions
 */
export const useVanillaLayout = <I extends { layout: any }>(input: I) => {
  const appliedOptions = computed(() =>
    merge(
      {},
      cloneDeep(input.layout.value.config),
      cloneDeep(input.layout.value.uischema.options),
    ),
  );
  const label = computed(() => {
    return input.layout?.value?.uischema?.label;
  });
  const elements = computed(() => {
    return input.layout.value?.uischema?.elements || [];
  });

  return {
    ...input,
    label,
    elements,
    styles: useStyles(input.layout.value.uischema),
    appliedOptions,
  };
};

/**
 * Adds styles, appliedOptions and childUiSchema
 */
export const useVanillaArrayControl = <I extends { control: any }>(
  input: I,
) => {
  const appliedOptions = computed(() =>
    merge(
      {},
      cloneDeep(input.control.value.config),
      cloneDeep(input.control.value.uischema.options),
    ),
  );

  const childUiSchema = computed(() =>
    findUISchema(
      input.control.value.uischemas,
      input.control.value.schema,
      input.control.value.uischema.scope,
      input.control.value.path,
    ),
  );

  const childLabelForIndex = (index: number) => {
    const childLabelProp =
      input.control.value.uischema.options?.childLabelProp ??
      getFirstPrimitiveProp(input.control.value.schema);
    if (!childLabelProp) {
      return `${index}`;
    }
    const labelValue = Resolve.data(
      input.control.value.data,
      composePaths(`${index}`, childLabelProp),
    );
    if (labelValue === undefined || labelValue === null || isNaN(labelValue)) {
      return '';
    }
    return `${labelValue}`;
  };
  return {
    ...input,
    styles: useStyles(input.control.value.uischema),
    appliedOptions,
    childUiSchema,
    childLabelForIndex,
  };
};
