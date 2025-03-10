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
    <div className="app-main">
      <div className="card">
        <div className="home-logos">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h2 style={{ color: '#2d3748', marginBottom: '1.5rem' }}>欢迎使用待办事项应用</h2>
        <div style={{ marginBottom: '2rem' }}>
          <button 
            onClick={() => setCount((count) => count + 1)}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '25px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            点击次数: {count}
          </button>
        </div>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          编辑 <code style={{ background: '#f1f1f1', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>src/App.jsx</code> 来测试热重载
        </p>
        <p className="read-the-docs">
          点击上方的 Vite 和 React 图标了解更多信息
        </p>
      </div>
    </div>
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
      <header className="app-header">
        <h1>✅ Todo List</h1>
        <nav className="app-nav">
          <Link to="/">首页</Link>
          <Link to="/todos">待办事项</Link>
          <Link to="/about">关于</Link>
        </nav>
      </header>
      
      {error && (
        <div className="error-message">
          <span>错误: {error}</span>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={
          <div className="app-main">
            <TodoList 
              todos={todos}
              loading={loading}
              onAddTodo={addTodo}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
            />
          </div>
        } />
        <Route path="/todos/edit/:id" element={
          <div className="app-main">
            <TodoEdit 
              todos={todos}
              onUpdateTodo={updateTodo}
            />
          </div>
        } />
        <Route path="/about" element={
          <div className="app-main">
            <About />
          </div>
        } />
      </Routes>

      <footer className="app-footer">
        <p>&copy; 2025 Todo List App</p>
        <div>
          <a href="https://twitter.com" target="_blank">Twitter</a>
          <a href="https://github.com" target="_blank">GitHub</a>
        </div>
      </footer>
    </Router>
  )
}

export default App
