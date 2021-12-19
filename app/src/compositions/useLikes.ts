import { Ref } from 'vue';
import { Mod } from '../@types';

const useLikes = (mod: Ref<Mod>) => {
  function onToggleLike(isLiked: boolean) {
    if (isLiked) {
      mod.value.likeCount++;
    } else {
      mod.value.likeCount--;
    }
  }

  return {
    onToggleLike,
  };
};

export default useLikes;
