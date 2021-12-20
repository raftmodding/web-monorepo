import { reactive } from 'vue';

interface AnswerDefinition {
  confirm: Function;
  cancel: Function;
}

export default function () {
  const answer: AnswerDefinition = reactive({
    confirm: null,
    cancel: null,
  });

  async function waitForAnswer() {
    const promise = new Promise((resolve, reject) => {
      answer.confirm = resolve;
      answer.cancel = reject;
    });

    try {
      await promise;
      return true;
    } catch (e) {
      return false;
    }
  }

  return {
    answer,
    waitForAnswer,
  };
}
