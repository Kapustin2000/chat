<template>
  <div>
    <form class="login" @submit.prevent="singIn">
      <h1>Sign in</h1>
      <label>Email</label>
      <input required v-model="email" type="email" placeholder="Name"/>
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>
      <hr/>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        data(){
            return {
                email : "kapustinomm@gmail.com",
                password : "12345678"
            }
        },
        methods: {
            ...mapActions('Auth', ['login']),

            singIn: function () {
                let email = this.email,
                    password = this.password;

                this.login({
                    'email': email,
                    'password': password
                });
            }
        }
    }
</script>
