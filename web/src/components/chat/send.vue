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
              users: []
          }
        },
        methods: {
            ...mapActions('Chat', ['send']),
            sendMessage: function () {
                let message = this.message,
                    user    = this.user;

                this.send({
                    text: message,
                    from_user: user,
                    to_user_id: "5fcdfb28a398f2007c93b673"
                });
            }
        },
        computed: {
            ...mapGetters('Auth', ['user']),
        }
    }
</script>
