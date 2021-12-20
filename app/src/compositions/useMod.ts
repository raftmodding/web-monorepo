import { state } from '../modules/stateManager';
import { ModVersion } from '../@types';
import { computed, Ref } from 'vue';
import useRandom from './useRandom';
import { ROLE_ADMIN } from '../const';

function useMod(props: any) {
  const { randomNumber } = useRandom();

  const isAuthor: Ref<boolean> = computed(() => {
    return state?.session?.user?.username === props.mod?.author;
  });

  const isAdmin = computed(() => {
    return state?.session?.user?.role === ROLE_ADMIN;
  });

  const versions: Ref<ModVersion[]> = computed(() => {
    return props.mod?.versions || [];
  });

  const currentVersion: Ref<ModVersion> = computed(() => {
    return (versions.value?.[0] || []) as ModVersion;
  });

  const currentVersionDownloads: Ref<number> = computed({
    get(): number {
      return currentVersion.value?.downloadCount || 0;
    },
    set(count: number): void {
      currentVersion.value.downloadCount = count;
    },
  });

  const totalDownloads: Ref<number> = computed(() => {
    if (props.preview) {
      return randomNumber();
    } else {
      return (
        versions.value
          ?.map((version) => version.downloadCount)
          .reduce((a, b) => a + b, 0) || 0
      );
    }
  });

  return {
    isAuthor,
    isAdmin,
    versions,
    currentVersion,
    currentVersionDownloads,
    totalDownloads,
  };
}

export default useMod;
