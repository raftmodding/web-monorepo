import { computed, reactive, ref, Ref } from 'vue';

import { emptyToNull } from '../utils';

function useApiQuerying() {
  const sort: Ref<string> = ref(null);
  const search: Ref<string> = ref(null);
  const filter: any = reactive({});

  const query = computed({
    get() {
      return {
        sort: sort.value,
        q: search.value || null,
        ...emptyToNull(filter.value),
      };
    },
    set(query: any) {
      sort.value = query.sort;
      delete query.sort;
      search.value = query.search;
      delete query.search;
      filter.value = { ...query };
    },
  });

  return {
    search,
    sort,
    filter,
    query,
  };
}

export default useApiQuerying;
