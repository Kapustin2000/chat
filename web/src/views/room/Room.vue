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
import axios from 'axios';

export default {
  name: 'room',
  data() {
      return {
          chats: []
      }
  },
 components: {
     SendComponent
 },
  mounted() {
      this.initChat();

      axios.get('/rooms/init').then(data => {
          console.log(data);
      });


      axios.get('/rooms').then(data => {
          console.log(data);
      })
  },
  methods: {
      ...mapActions('Chat', ['initChat'])
  },
  computed: {
      ...mapGetters('Chat', ['socket', 'messages']),
  }
}
</script>
