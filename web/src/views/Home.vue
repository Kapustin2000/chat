<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';

export default {
  name: 'Home',
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
