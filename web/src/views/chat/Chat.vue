<template>
  <div class="home">
    <SendComponent />
    <table>
      <tr>
        <th>Title</th>
      </tr>
      <tr v-for="(message, index) in messages" :key="index">
        <td>{{message.text}}</td>
      </tr>
    </table>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import SendComponent from '@/components/chat/send.vue';

export default {
  name: 'chat',
  data() {
      return {
      }
  },
 components: {
     SendComponent
 },
  mounted() {
      this.initChat();
  },
  methods: {
      ...mapActions('Chat', ['initChat'])
  },
  computed: {
      ...mapGetters('Chat', ['socket', 'messages']),
  }
}
</script>
