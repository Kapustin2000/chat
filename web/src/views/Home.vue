<template>
  <div class="home">
    <SearchComponent></SearchComponent>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchComponent from '@/components/search/search.vue'


export default {
  name: 'Home',
  components: {
    SearchComponent
  }
}
</script>
