<template>
  <div class="container">
    <section class="my-3">
      <h1 class="my-3">Terms of Service</h1>
      <div class="card">
        <div class="card-body">
          <div class="card-text">
            <p>
              This website is a service provided free of charge and without any
              liability. This policy applies to every use of the site and
              service. We reserve the right to change these policies at any
              time.
            </p>
            <h3>Reponsibility and intellectual property</h3>
            <p>
              Mods published on this site remain the property of their original
              creator or owner. Uploaded files are stored on our servers but are
              the uploaders' responsibility. We are not responsible for the
              policing of data uploaded to our service.
            </p>
            <h3>Copyright issues</h3>
            <p>
              If uploads fall under a current, legal copyright, owners of that
              copyright may submit proof of their ownership to us in order to
              request a takedown of their property. Please refer to the
              <router-link :to="{ name: 'contact' }">contact page </router-link>
              to get in touch.
            </p>
            <h3>Abuse</h3>
            <p>
              Any attempts to harm, damage or otherwise harm this service will
              result in immediate termination upon recognition. We may take
              action without warning and file a lawsuit when discovering such
              abuse. Please report any bugs or indications of abuse of our
              service to us by using our
              <router-link :to="{ name: 'contact' }">contact page</router-link>.
            </p>
            <h3>Termination of user accounts and content removal</h3>
            <p>
              We withhold the right to remove any content and terminate any
              account that are not in accordance with our policies. Such
              decisions are made by us and are not contestable.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useActiveMeta } from 'vue-meta';

export default defineComponent({
  setup() {
    const meta = useActiveMeta();

    meta.title = `Terms of Service`;
  },
});
</script>
