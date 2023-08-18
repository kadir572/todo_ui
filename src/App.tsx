import { useState, useEffect } from 'react'
import { ITodo } from './types/todo'
import Todo from './Todo'
import api from './api/api'

const App = () => {
  const [addMenuToggle, setAddMenuToggle] = useState<boolean>(false)
  const [todosList, setTodosList] = useState<ITodo[] | []>([])
  const [name, setName] = useState<string>('')

  useEffect(() => {
    const getTodos = async () => {
      const response = await api.get('/todos')
      setTodosList(response.data)
    }

    getTodos()
  }, [todosList])

  const handleAdd = async () => {
    if (!name) return

    await api.post('/todos', {
      name,
    })
    const response = await api.get('/todos')
    setTodosList(response.data)
    setAddMenuToggle(false)
  }
  return (
    <div className='h-screen bg-slate-400 py-8 px-6 max-w-full w-[768px] mx-auto'>
      <div className='flex justify-between items-center'>
        <h1 className='text-slate-800 text-4xl font-semibold'>Todo App</h1>
        <button
          className='py-2 px-6 bg-slate-600 text-white text-xl'
          onClick={() => setAddMenuToggle((state: boolean) => !state)}
        >
          Add Todo
        </button>
      </div>
      <div>
        <div
          className={`grid overflow-hidden transition-all duration-200 mt-4 ${
            !addMenuToggle ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'
          }`}
        >
          <div className='min-h-0'>
            <div className='flex flex-col gap-6 py-6 px-6 bg-slate-900'>
              <div className='flex gap-4'>
                <label className='text-white text-xl' htmlFor='name'>
                  Name
                </label>
                <input
                  className='py-1 px-2 text-xl'
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className='flex justify-start'>
                <button
                  className='bg-slate-600 py-2 px-6 text-white text-xl'
                  onClick={handleAdd}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='py-4 grid grid-cols-1'>
          {todosList.map(todo => (
            <Todo key={todo._id} todo={todo} setTodosList={setTodosList} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
