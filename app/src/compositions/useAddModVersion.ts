import { Ref, ref } from 'vue';
import { useActiveMeta } from 'vue-meta';
import { useRoute } from 'vue-router';
import { Mod, ModVersion } from '../@types';
import api from '../modules/api';
import useRouteLeaveConfirm from './useRouteLeaveConfirm';

export default function () {
  const meta = useActiveMeta();
  const routeLeaveConfirm = useRouteLeaveConfirm();
  const route = useRoute();
  const ready: Ref<boolean> = ref(false);
  const loading: Ref<boolean> = ref(false);
  const showErrors: Ref<boolean> = ref(false);
  const modVersion: Ref<ModVersion> = ref({} as ModVersion);
  const mod: Ref<Mod> = ref({} as Mod);

  meta.title = 'Add mod Version';

  (async () => {
    const { version } = route.params;

    mod.value = await api.getMod(route.params.id as string);

    if (version) {
      modVersion.value = mod.value.versions.find(
        (mv: ModVersion) => mv.version === version,
      );
    }

    const raftVersions = await api.getRaftVersions();
    const { minRaftVersionId, maxRaftVersionId } = modVersion.value;

    if (!minRaftVersionId) {
      modVersion.value.minRaftVersionId =
        raftVersions[raftVersions.length - 1].id;
    }
    if (!maxRaftVersionId) {
      modVersion.value.maxRaftVersionId = raftVersions[0].id;
    }

    ready.value = true;
  })();

  function onChange(event: { data: object; error: any[] }) {
    if (
      ready.value &&
      JSON.stringify(event.data) !== JSON.stringify(modVersion.value)
    ) {
      routeLeaveConfirm.hasUnsavedChanges.value = true;
    }
    modVersion.value = event.data as ModVersion;
  }

  return {
    ...routeLeaveConfirm,
    loading,
    ready,
    showErrors,
    mod,
    version: modVersion,
    onChange,
  };
}
