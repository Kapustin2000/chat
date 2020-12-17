<template>
    <div>
        <button @click="search">Search!</button>
    </div>
</template>

<script>
    export default {
        name: 'SearchComponent',

        data(){
          return {

          }
        },
        methods: {
            search() {
                console.log(123);
            }
        }
    }
</script>
