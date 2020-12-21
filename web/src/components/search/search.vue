<template>
    <div>
        <button @click="search">Search!</button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'SearchComponent',

        data(){
          return {

          }
        },
        methods: {
            ...mapActions('Game', ['search']),
        }
    }
</script>
