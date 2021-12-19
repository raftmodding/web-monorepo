<template>
  <div
    class="modal fade show"
    tabindex="-1"
    role="dialog"
    aria-labelledby="donate-modal-label"
    id="donate-modal"
    aria-modal="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header border-bottom-0">
          <h4 class="modal-title" id="donate-modal-label">
            Want to support us?
          </h4>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <p>
            You can donate to help us and contribute to our server fees, assets
            we might buy and services we rent each month in order to give you
            the best modding experience on Raft.
          </p>
        </div>
        <div
          class="modal-footer border-top-0 pt-0 d-flex justify-content-between align-items-center"
        >
          <a
            class="btn btn-success btn-lg mr-2 mb-2"
            :href="patreonLink"
            style="background-color: #f96854; border-color: #f96854"
            target="_blank"
          >
            <i class="fab fa-patreon mr-2"></i> Support us on Patreon
          </a>
          <form
            class="form-inline d-inline"
            action="https://www.paypal.com/cgi-bin/webscr"
            method="post"
            target="_blank"
          >
            <input type="hidden" name="cmd" value="_s-xclick" /><input
              type="hidden"
              name="hosted_button_id"
              :value="paypalToken"
            />
            <button
              class="btn btn-primary mr-2 mb-2"
              type="submit"
              style="background-color: #0079c1; border-color: #0079c1"
            >
              <i class="fab fa-paypal mr-2"></i> Tip us on PayPal
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { donationModal } from '../../_legacy';

export default defineComponent({
  name: 'TheDonationModal',
  setup() {
    return {
      patreonLink: import.meta.env.VITE_PATREON_LINK as string,
      paypalToken: import.meta.env.VITE_PAYPAL_TOKEN as string,
    };
  },
  mounted() {
    donationModal();
  },
});
</script>
