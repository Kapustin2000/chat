<template>
  <div class="home">
    <SearchComponent></SearchComponent>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchComponent from '@/components/search/search.vue'
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    SearchComponent
  },
  mounted() {
      this.initSocket();
  },
  methods: {
      ...mapActions('Game', ['initSocket']),
  },
  computed: {
  }
}
</script>
