<template>
    <div>
        <form @submit.prevent="createTodo">
            <h1>Create</h1>
            <label>Title</label>
            <input required v-model="title" type="text" placeholder="title"/>
            <button type="submit">create</button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'CreateComponent',

        data(){
          return {
              title: ""
          }
        },
        methods: {
            ...mapActions('Todo', ['create']),
            createTodo: function () {
                let title = this.title;

                this.create({
                    'title': title
                }).then(() => {
                    this.title = "";
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>
