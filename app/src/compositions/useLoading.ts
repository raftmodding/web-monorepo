import { Ref, ref } from 'vue';

export default function () {
  const loading: Ref<boolean> = ref(false);

  return {
    loading,
  };
}
