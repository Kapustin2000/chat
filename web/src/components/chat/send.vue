<template>
    <div>
        <form @submit.prevent="sendMessage">
            <h1>Create</h1>
            <label>message</label>
            <input required v-model="message" type="text" placeholder="message"/>
            <button type="submit">create</button>
        </form>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'SendComponent',

        data(){
          return {
              message: "",
          }
        },
        methods: {
            ...mapActions('Chat', ['send']),
            sendMessage: function () {
                let message = this.message,
                    user    = this.user;

                this.send({
                    text: message,
                    user: user
                })
            }
        },
        computed: {
            ...mapGetters('Auth', ['user']),
        }
    }
</script>
