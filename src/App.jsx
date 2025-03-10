import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import About from './About'
import TodoList from './TodoList'
import TodoEdit from './TodoEdit'
import { todosApi } from './api'
import './App.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load todos on app start
  useEffect(() => {
    loadTodos()
  }, [])

  const loadTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      const todosData = await todosApi.getAll()
      setTodos(todosData)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load todos:', err)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (text) => {
    try {
      setError(null)
      const newTodo = await todosApi.create(text)
      setTodos(prev => [newTodo, ...prev])
    } catch (err) {
      setError(err.message)
      console.error('Failed to add todo:', err)
    }
  }

  const updateTodo = async (id, updates) => {
    try {
      setError(null)
      const updatedTodo = await todosApi.update(id, updates)
      setTodos(prev => prev.map(todo =>
        todo.id === id ? updatedTodo : todo
      ))
    } catch (err) {
      setError(err.message)
      console.error('Failed to update todo:', err)
    }
  }

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id)
    if (todo) {
      await updateTodo(id, { completed: !todo.completed })
    }
  }

  const deleteTodo = async (id) => {
    try {
      setError(null)
      await todosApi.delete(id)
      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (err) {
      setError(err.message)
      console.error('Failed to delete todo:', err)
    }
  }

  return (
    <Router>
      <header>
        <h1>Todo List</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/todos">Todos</Link> | <Link to="/about">About</Link>
        </nav>
      </header>
      
      {error && (
        <div style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          padding: '10px', 
          margin: '10px',
          borderRadius: '4px',
          border: '1px solid #f5c6cb'
        }}>
          错误: {error}
          <button 
            onClick={() => setError(null)}
            style={{ marginLeft: '10px', background: 'none', border: 'none', color: '#721c24', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={
          <TodoList 
            todos={todos}
            loading={loading}
            onAddTodo={addTodo}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
          />
        } />
        <Route path="/todos/edit/:id" element={
          <TodoEdit 
            todos={todos}
            onUpdateTodo={updateTodo}
          />
        } />
        <Route path="/about" element={<About />} />
      </Routes>

      <footer>
        <p>&copy; 2025 Todo List App</p>
        <div>
          <a href="https://twitter.com" target="_blank">Twitter</a> | 
          <a href="https://github.com" target="_blank">GitHub</a>
        </div>
      </footer>
    </Router>
  )
}

export default App
