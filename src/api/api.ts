import axios from 'axios'

const api = axios.create({
  baseURL: 'https://kadir-todo-api-b4bb4553125e.herokuapp.com',
})

export default api
