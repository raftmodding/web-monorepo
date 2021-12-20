import { ref, Ref } from 'vue';

import { Mod } from '../@types';
import api from '../modules/api';
import { MIN_LOADING_DURATION } from '../const';

function useMods(defaultQuery = null) {
  const loading: Ref<boolean> = ref(false);
  const mods: Ref<Mod[]> = ref([]);

  async function loadMods(params) {
    mods.value = await api.getMods(params);
  }

  async function onSearch(query: any): Promise<void> {
    if (loading.value) return;

    loading.value = true;
    await loadMods(query);

    setTimeout(() => {
      loading.value = false;
    }, MIN_LOADING_DURATION);
  }

  onSearch(defaultQuery);

  return {
    loading,
    mods,
    loadMods,
    onSearch,
  };
}

export default useMods;
