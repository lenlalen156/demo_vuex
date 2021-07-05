import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const storeData = {
  state: {
    todos: [
      {id: 1, title:'viec 1', completed: true},
      {id: 2, title:'viec 2', completed: true},
      {id: 3, title:'viec 3', completed: false}
    ],
    auth:{
      isAuthenticated: false
    }
  },
  getters:{
    doneTodos: state => state.todos.filter(todo => todo.completed),
    progress: (state,getters) => {
      const doneTodos = getters.doneTodos
      return Math.round(doneTodos.length/ state.todos.length * 100)
    }
  },
  actions: {
    async deleteTodo({commit}, todoId){
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
        commit('DELETE_TODO', todoId)
      } catch (error) {
        console.log(error)
      }
    },
    async addTodo({commit}, newTodo) {
      try {
        await axios.post('https://jsonplaceholder.typicode.com/todos',newTodo)
        commit('ADD_TODO', newTodo)
      } catch (error) {
        console.log(error)
      }
    },
    async getTodo({commit}){
      try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
        commit('SET_TODOS',response.data)
      }catch(error){
        console.log(error)
      }
    }

  },
  mutations:{
    TOGGLE_AUTH(state) {
      state.auth.isAuthenticated = !state.auth.isAuthenticated
    },
    MARK_COMPLETE(state, todoId ) {
      state.todos.map(todo => {
        if(todo.id === todoId) todo.completed = !todo.completed
        return todo
      })
    },
    DELETE_TODO(state, todoId){
      state.todos = state.todos.filter(todo => todo.id !== todoId)
    },
    ADD_TODO(state, newTodo) {
      state.todos.unshift(newTodo)
    },
    SET_TODOS(state,todos) {
      state.todos = todos
    }
  }
}

const store = new Vuex.Store(storeData)
export default store