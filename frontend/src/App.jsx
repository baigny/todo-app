import { useEffect, useState } from 'react'
import { getTodos, addTodo, toggleTodo, deleteTodo } from './api'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    getTodos().then(setTodos)
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    const newTodo = await addTodo(trimmed)
    setTodos((prev) => [...prev, newTodo])
    setTitle('')
  }

  async function handleToggle(todo) {
    const updated = await toggleTodo(todo.id, !todo.completed)
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)))
  }

  async function handleDelete(id) {
    await deleteTodo(id)
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          To-Do List
        </h1>

        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3"
            >
              <label className="flex items-center gap-3 flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span
                  className={
                    todo.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-800'
                  }
                >
                  {todo.title}
                </span>
              </label>
              <button
                type="button"
                onClick={() => handleDelete(todo.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            No todos yet — add one above.
          </p>
        )}
      </div>
    </div>
  )
}

export default App
