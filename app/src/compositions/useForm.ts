import { computed, Ref, ref } from 'vue';

export default function (emit) {
  const formLoading: Ref<boolean> = ref(false);
  const data: any = ref({});
  const errors: any = ref(null);
  const showErrors: Ref<boolean> = ref(false);
  const ready: Ref<boolean> = ref(false);

  const errorCount = computed(() => {
    return Object.keys(errors.value)?.length || 0;
  });

  function onFormChange(event) {
    const changed = JSON.stringify(event.data) !== JSON.stringify(data.value);
    data.value = event.data;
    errors.value = event.errors;
    emit('change', { ...event, changed });
  }

  return {
    data,
    errors,
    showErrors,
    ready,
    errorCount,
    formLoading,
    onFormChange,
  };
}
