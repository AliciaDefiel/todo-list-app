import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import About from './About'
import TodoList from './TodoList'
import TodoEdit from './TodoEdit'
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

  const updateTodo = (id, updates) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const addTodo = (text) => {
    setTodos([...todos, {
      id: Date.now(),
      text: text.trim(),
      completed: false
    }])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <Router>
      <header>
        <h1>Todo List</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/todos">Todos</Link> | <Link to="/about">About</Link>
        </nav>
      </header>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={
          <TodoList 
            todos={todos}
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
