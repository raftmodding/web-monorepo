import { ref, Ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useModalAnswer } from './index';

export default function () {
  const { answer, waitForAnswer } = useModalAnswer();
  const hasUnsavedChanges: Ref<boolean> = ref(false);
  const show: Ref<boolean> = ref(false);

  onBeforeRouteLeave(async () => {
    if (!!hasUnsavedChanges.value) {
      show.value = true;
      return await waitForAnswer();
    }
  });

  function onRouteLeaveConfirm(): void {
    answer.confirm();
  }

  function onRouteLeaveCancel(): void {
    answer.cancel();
    show.value = false;
  }

  return {
    answer,
    showModal: show,
    hasUnsavedChanges,
    onRouteLeaveConfirm,
    onRouteLeaveCancel,
  };
}
