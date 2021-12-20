import { computed, Ref, ref } from 'vue';

const blank = ref(false);

export const useGlobalBlank = () => {
  return {
    blank,
  };
};

export const setGlobalBlank = (value) => {
  blank.value = value;
};
