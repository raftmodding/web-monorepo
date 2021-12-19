import dayjs from 'dayjs';
import { __metadata } from 'tslib';
import { Ref, ref, watch } from 'vue';
import { useActiveMeta } from 'vue-meta';
import { useRoute } from 'vue-router';
import { Mod, RaftVersion } from '../@types';
import { DATE_FORMAT } from '../const';
import api from '../modules/api';
import useForm from './useForm';
import useRouteLeaveConfirm from './useRouteLeaveConfirm';

export interface ExtendedMod extends Mod {
  minRaftVersionId: number;
  maxRaftVersionId: number;
}

export default function (emit) {
  const meta = useActiveMeta();
  const form = useForm(emit);
  const routeLeaveConfirm = useRouteLeaveConfirm();
  const route = useRoute();
  const ready: Ref<boolean> = ref(false);
  const loading: Ref<boolean> = ref(false);

  (async () => {
    const { id } = route.params;

    if (id) {
      form.data.value = await api.getRaftVersion(Number(id));
      form.data.value.releasedAt = dayjs(form.data.value.releasedAt).format(
        DATE_FORMAT,
      );
    }

    meta.title = `Edit Raft version v${form.data.value.version}`;
    ready.value = true;
  })();

  function onChange(event: { data: object; errors: any[] }) {
    if (JSON.stringify(event.data) !== JSON.stringify(form.data.value)) {
      routeLeaveConfirm.hasUnsavedChanges.value = true;
    }
    form.data.value = event.data as RaftVersion;
    form.errors.value = event.errors;
  }

  watch(
    () => form.data.value.version,
    (version) => {
      meta.title = `Edit Raft version ${version}`;
    },
  );

  return {
    ...routeLeaveConfirm,
    ...form,
    loading,
    ready,
    onChange,
  };
}
