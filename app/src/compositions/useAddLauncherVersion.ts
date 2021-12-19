import { Ref, ref } from 'vue';
import { LoaderVersion } from '../@types';
import useForm from './useForm';
import useRouteLeaveConfirm from './useRouteLeaveConfirm';

export default function (emit) {
  const form = useForm(emit);
  const routeLeaveConfirm = useRouteLeaveConfirm();
  const ready: Ref<boolean> = ref(false);
  const loading: Ref<boolean> = ref(false);

  (async () => {
    ready.value = true;
  })();

  function onChange(event: { data: object; errors: any[] }) {
    if (JSON.stringify(event.data) !== JSON.stringify(form.data.value)) {
      routeLeaveConfirm.hasUnsavedChanges.value = true;
    }
    form.data.value = event.data as LoaderVersion;
    form.errors.value = event.errors;
  }

  return {
    ...routeLeaveConfirm,
    ...form,
    loading,
    ready,
    onChange,
  };
}
