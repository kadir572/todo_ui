import axios from 'axios'

const api = axios.create({
  baseURL: 'https://kadir-todo-2b671e510570.herokuapp.com/',
})

export default api
