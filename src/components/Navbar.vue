<template>
  <div class="navbar">
    <h1>My Vuex App Todos</h1>
    <ul>
      <li>Home</li>
      <li>About</li>
      <li v-if="auth.isAuthenticated">Total todos: {{ todos.length}}
      <button @click="loginOrLogout">Logout</button>
      </li>
      <li v-else> <button @click="loginOrLogout">Login</button></li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name:'Navbar',
  computed: mapState(['todos','auth']),
  // {
  //   totalTodos() {
  //     return this.$store.state.todos.length
  //   }
  // }
  methods: {
    loginOrLogout(){
      this.$store.commit('TOGGLE_AUTH')
    }
  }
}
</script>

<style>
  .navbar {
    padding: 5px;
    text-align: center;
    background: rgb(240,240,240);
    color: black;
  }

.navbar ul {
  display: flex;
  justify-content: space-around;
  list-style: none;
  align-items: center;
  padding: 0;
}

</style>