import { computed, Ref, ref, watch } from 'vue';
import { useActiveMeta } from 'vue-meta';
import { useRoute } from 'vue-router';
import { Mod } from '../@types';
import api from '../modules/api';
import { state } from '../modules/stateManager';
import { nullToUndefined, slugify } from '../utils';
import useRouteLeaveConfirm from './useRouteLeaveConfirm';

export interface ExtendedMod extends Mod {
  minRaftVersionId: number;
  maxRaftVersionId: number;
}

export default function (create = false) {
  const meta = useActiveMeta();
  const routeLeaveConfirm = useRouteLeaveConfirm();
  const route = useRoute();
  const ready: Ref<boolean> = ref(false);
  const loading: Ref<boolean> = ref(false);
  const showErrors: Ref<boolean> = ref(false);
  const mod: Ref<ExtendedMod> = ref({} as ExtendedMod);
  const errors = ref(null);

  (async () => {
    if (route.params.id) {
      const found = await api.getMod(route.params.id as string);
      mod.value = nullToUndefined(found) as ExtendedMod;
    }

    const { category, minRaftVersionId, maxRaftVersionId, author } = mod.value;

    if (!category) {
      const categories = await api.getModCategories();
      mod.value.category = categories[0];
    }

    if (!minRaftVersionId || !maxRaftVersionId) {
      const raftVersions = await api.getRaftVersions();

      if (!minRaftVersionId) {
        mod.value.minRaftVersionId = raftVersions[raftVersions.length - 1].id;
      }

      if (!maxRaftVersionId) {
        mod.value.maxRaftVersionId = raftVersions[0].id;
      }

      if (!author) {
        mod.value.author = state.session.user.username;
      }
    }

    if (create) {
      meta.title = `Create new mod`;
    } else {
      meta.title = `Edit ${mod.value.title || 'MISSING_TITLE'}"`;
    }

    ready.value = true;
  })();

  if (create) {
    watch(
      () => mod.value.title,
      (title: string) => {
        if (!ready.value) return;

        mod.value.id = title ? slugify(title) : undefined;
        meta.title = `Edit ${mod.value.title || ''}`;
      },
    );
  }

  const errorCount = computed(() => Object.keys(errors.value));

  function onChange(event: { data: object; errors: any[] }) {
    if (JSON.stringify(event.data) !== JSON.stringify(mod.value)) {
      routeLeaveConfirm.hasUnsavedChanges.value = true;
    }

    mod.value = event.data as ExtendedMod;
    errors.value = event.errors;
  }

  return {
    ...routeLeaveConfirm,
    loading,
    ready,
    showErrors,
    mod,
    errors,
    errorCount,
    onChange,
  };
}
