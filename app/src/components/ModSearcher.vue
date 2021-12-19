<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="row">
      <div class="col-0 col-md-6"></div>
      <div class="col-12 col-md-6">
        <div class="card w-100">
          <div class="input-group">
            <input
              v-model="search"
              aria-describedby="addon1"
              aria-label="test"
              class="form-control form-control-lg border-top-0 border-right-0 border-left-0 border-bottom-0"
              name="q"
              placeholder="Search..."
              type="search"
            />
            <div class="input-group-append">
              <!-- button
                aria-controls="search-filters"
                class="btn btn-outline-primary border-0"
                data-target="#search-filters"
                data-toggle="collapse"
                type="button"
              >
                <icon name="filter" />
              </button -->
              <button class="btn btn-primary" type="submit">
                <icon name="search" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- div id="search-filters" class="collapse w-100">
      <div class="card card-body mt-3">
        <fieldset class="form-group mb-0"></fieldset>
      </div>
    </div -->
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import useApiQuerying from '../compositions/useApiQuerying';
import Icon from './Icon.vue';

export default defineComponent({
  name: 'ModSearcher',
  components: { Icon },
  props: {
    defaultQuery: Object,
  },
  emits: ['search'],
  setup(props: any) {
    const { filter, search, sort, query } = useApiQuerying();

    query.value = props.defaultQuery;

    return {
      sort,
      search,
      filter,
      query,
    };
  },
  watch: {
    search(search) {
      if (!search) {
        this.$emit('search', this.query);
      }
    },
  },
  methods: {
    onSubmit() {
      this.$emit('search', this.query);
    },
  },
});
</script>
