<template>
  <CreateComponent />
  <table>
    <tr>
      <th>Title</th>
    </tr>
    <tr v-for="(item, index) in todo" :key="index">
      <td>{{item.title}}</td>
    </tr>
  </table>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import CreateComponent from '@/components/todo/create.vue';
    export default {
      components: {
          CreateComponent
      },
      mounted() {
          this.fetchTodo();
          console.log(this.todo);
      },
      methods: {
          ...mapActions('Todo', ['fetchTodo']),
      },
      computed: {
          ...mapGetters('Todo', ['todo']),
      }
  }
</script>
