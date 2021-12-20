<template>
  <div class="card mb-3 border-danger">
    <div class="card-body">
      <h5 class="card-title">
        Danger zone
        <button
          class="btn btn-sm float-right btn-outline-danger"
          type="button"
          data-toggle="collapse"
          data-target="#danger-zone"
          aria-expanded="false"
          aria-controls="danger-zone"
        >
          Click to expand
        </button>
      </h5>
      <div class="collapse" id="danger-zone">
        <div class="big-form" id="transferForm">
          <div class="form-group">
            <label for="changeOwner">
              Transfer this mod to another owner
            </label>
            <input
              v-model="transferTo"
              id="changeOwner"
              type="text"
              class="form-control"
              :class="transferToCls"
              placeholder="username"
              aria-describedby="changeOwnerHelp"
              @focus="transferToCls = ''"
            />
            <small class="text-muted" id="changeOwnerHelp">
              Enter the username of the new owner.
            </small>
          </div>
          <button
            class="btn btn-danger"
            data-toggle="modal"
            data-target="#confirmModal"
            data-action="transfer"
            @click="onTransfer"
          >
            Transfer mod
          </button>
        </div>
        <hr />
        <div class="big-form" id="deleteForm">
          <div class="form-group">
            <label for="deleteMod"> Delete this mod </label>
            <input
              v-model="deleteConfirm"
              id="deleteMod"
              type="text"
              class="form-control"
              :class="deleteConfirmCls"
              :placeholder="mod.id"
              aria-describedby="deleteModHelp"
              @focus="deleteConfirmCls = ''"
            />
            <small class="text-muted" id="deleteModHelp">
              Enter the id of this mod to begin the deletion process. The mod
              will be deleted after 10 days, unless you cancel the deletion.
              Mods can not be restored once the deletion is complete.
            </small>
          </div>
          <button
            class="btn btn-danger"
            data-toggle="modal"
            data-target="#confirmModal"
            data-action="delete"
            @click="onDelete"
          >
            Delete mod
          </button>
        </div>
      </div>
    </div>
  </div>
  <danger-zone-modal @confirm="answer.confirm()" @cancel="answer.cancel()" />
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

import toaster from '../modules/toaster';
import { useModalAnswer } from '../compositions';
import api from '../modules/api';
import { DATETIME_FORMAT } from '../const';
import dayjs from 'dayjs';
import { Mod } from '../@types';

import DangerZoneModal from './modals/DangerZoneModal.vue';

export default defineComponent({
  name: 'ModDangerZone',
  components: { DangerZoneModal },
  props: {
    mod: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const transferTo: Ref<string> = ref();
    const transferToCls: Ref<string> = ref('');

    const deleteConfirm: Ref<string> = ref();
    const deleteConfirmCls: Ref<string> = ref('');

    return {
      transferTo,
      transferToCls,
      deleteConfirm,
      deleteConfirmCls,
      ...useModalAnswer(),
    };
  },
  methods: {
    async onTransfer(event: Event): Promise<void> {
      if (this.transferTo && (await this.waitForAnswer())) {
        const { id } = this.mod;
        const mod = await api.updateMod({ id, author: this.transferTo } as Mod);

        if (mod) {
          await this.$router.push({ name: 'mods' });
          toaster.success({
            message: `<b>${mod.id}</b> was transferred to "<b>${mod.author}</b>"`,
            duration: 15 * 1000,
          });
        }
      } else {
        event.stopPropagation(); //Stop modal from showing!
        toaster.error('Please provide a username!');
        this.transferToCls = 'is-invalid';
      }
    },

    async onDelete(event: Event): Promise<void> {
      if (this.deleteConfirm === this.mod.id && (await this.waitForAnswer())) {
        const { id } = this.mod;
        const scheduledModDeletion = await api.addScheduledModDeletion(id);

        if (scheduledModDeletion) {
          const dateTime = dayjs(scheduledModDeletion.deletionTime).format(
            DATETIME_FORMAT,
          );
          await this.$router.push({ name: 'home' });
          toaster.success({
            message: `<b>${this.mod.id}</b> was scheduled for deletion:  <b>${dateTime}</b>`,
            duration: 15 * 1000,
          });
        } else {
          toaster.error('mod is already scheduled for deletion');
        }
      } else {
        event.stopPropagation(); //Stop modal from showing!
        toaster.error('id does not match the mod-id!');
        this.deleteConfirmCls = 'is-invalid';
      }
    },
  },
});
</script>

<style scoped lang="scss">
input[type='text'].form-control {
  transition: box-shadow 0.1s linear;

  &.is-invalid {
    box-shadow: 0 0 0 0.2rem rgb(220 53 69 / 25%);
  }
}
</style>
