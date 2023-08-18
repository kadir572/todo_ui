import { useState } from 'react'
import { ITodo } from './types/todo'
import api from './api/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

type Props = {
  todo: ITodo
  setTodosList: React.Dispatch<React.SetStateAction<ITodo[] | []>>
}

const Todo = ({ todo, setTodosList }: Props) => {
  const [completed, setCompleted] = useState<boolean>(todo.completed)

  const handleEdit = async () => {
    setCompleted((state: boolean) => !state)
    await api.patch(`/todos/${todo._id}`, {
      name: todo.name,
      completed: !completed,
    })
  }

  const handleDelete = async () => {
    await api.delete(`/todos/${todo._id}`)
    const response = await api.get('/todos')
    setTodosList(response.data)
  }
  return (
    <div className='flex gap-6 items-center py-6 px-8 even:bg-slate-700 text-white odd:bg-slate-900'>
      <span className='text-xl font-medium mr-auto'>{todo.name}</span>
      <input
        className='h-6 w-6'
        type='checkbox'
        name='completed'
        id='completed'
        checked={completed}
        onChange={handleEdit}
      />
      <FontAwesomeIcon
        onClick={handleDelete}
        icon={faTrash}
        className='text-2xl'
      />
    </div>
  )
}

export default Todo
