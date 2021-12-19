import { watch } from 'vue';
import { useActiveMeta } from 'vue-meta';
import { useRoute } from 'vue-router';

const { VITE_META_BASE_URL } = import.meta.env;

export default function () {
  const meta = useActiveMeta();
  const route = useRoute();

  watch(
    () => meta.title,
    (title) => {
      meta.og.title = meta.titleTemplate(title);
    },
    { immediate: true },
  );

  watch(
    () => meta.description,
    (description) => {
      meta.og.description = description;
    },
    { immediate: true },
  );

  watch(
    () => route.fullPath,
    (fullPath) => {
      meta.og.url = VITE_META_BASE_URL + fullPath;
    },
    { immediate: true },
  );
}
