<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>
<script lang="ts">

// import { Vue } from 'vue-class-component'
// import { getPosts, Post } from '@/api/index'

// export default class App extends Vue {
//   posts: Post[] = []

//   async created () {
//     const posts = await getPosts()
//     this.posts = posts
//     console.log(posts)
//   }
// }

// OptionApis
import { defineComponent } from 'vue'
import { getPosts, Post } from '@/api/index'
export default defineComponent({
  data (): {
    posts: Post[];
    } {
    return {
      posts: []
    }
  },
  async created () {
    const posts = await getPosts()
    this.posts = posts
    console.log(posts)
  }
})
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
