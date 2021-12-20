<template>
  <section class="my-3" ref="head">
    <div class="row">
      <div class="col-sm-9">
        <h1 class="text-break">{{ mod.title }}</h1>
        <p>{{ mod.description }}</p>
      </div>
      <div class="col-sm-3">
        <div class="row mt-5">
          <div class="col-6 text-center px-1">
            <icon
              name="heart"
              :type="isLiked ? 's' : 'r'"
              size="lg"
              class="like-button"
              :class="{ active: isLiked }"
              @click="toggleLike"
            />
            <br />
            <small class="d-inline-block">
              <span id="likes-counter">{{ mod.likeCount || 0 }}</span> Likes
            </small>
          </div>
          <div class="col-6 text-center px-1">
            <icon name="download" size="lg" /><br />
            <small class="d-inline-block">{{ totalDownloads }} Downloads</small>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useMod } from '../compositions';
import api from '../modules/api';
import { state } from '../modules/stateManager';
import toaster from '../modules/toaster';
import Icon from './Icon.vue';

export default defineComponent({
  name: 'ModHeader',
  components: {
    Icon,
  },
  props: {
    mod: Object,
    preview: Boolean,
  },
  emits: ['like'],
  setup(props) {
    const disabled: Ref<boolean> = ref(false);
    const timer: Ref<number> = ref(0);

    return {
      ...props,
      ...useMod(props),
      disabled,
    };
  },
  computed: {
    isLiked(): boolean {
      return state.likes.includes(this.mod.id);
    },
  },
  methods: {
    async toggleLike() {
      if (this.preview) {
        toaster.success(
          'Nice try 😁<br/><b>Finish creating your mod first.</b>',
        );
        return;
      }

      if (this.disabled) {
        toaster.error(
          `Please wait ${this.timer / 1000}s before using this feature again`,
        );
        return;
      }

      if (!this.isLiked) {
        this.$emit('like', true);
        await api.likeMod(this.mod.id);
        toaster.success(`You liked <b>${this.mod.title}</b>`);
      } else {
        this.$emit('like', false);
        await api.unlikeMod(this.mod.id);
        toaster.success(`You <u>no longer</u> like <b>${this.mod.title}</b>`);
      }

      this.disabled = true;
      this.timer = 5000;
      const interval = setInterval(() => (this.timer -= 1000), 1000);
      setTimeout(() => {
        this.disabled = false;
        this.timer = 0;
        clearInterval(interval);
      }, 5000);
    },
  },
});
</script>

<style scoped lang="scss">
.like-button {
  transition: transform 1s linear, color 1s linear;
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    color: #e74c3c;
    transform: scale(1.4, 1.4);
  }

  &.active {
    color: #e74c3c;
    animation-name: beating-heart;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
}
</style>
