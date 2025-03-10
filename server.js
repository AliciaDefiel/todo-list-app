import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 3001

// Initialize SQLite database
const db = new Database(join(__dirname, 'todos.db'))

// Create todos table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Middleware
app.use(cors())
app.use(express.json())

// API Routes

// Get all todos
app.get('/api/todos', (req, res) => {
  try {
    const todos = db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all()
    res.json(todos.map(todo => ({
      ...todo,
      completed: Boolean(todo.completed)
    })))
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' })
  }
})

// Get single todo
app.get('/api/todos/:id', (req, res) => {
  try {
    const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(req.params.id)
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    res.json({
      ...todo,
      completed: Boolean(todo.completed)
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo' })
  }
})

// Create new todo
app.post('/api/todos', (req, res) => {
  try {
    const { text } = req.body
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' })
    }
    
    const insert = db.prepare('INSERT INTO todos (text) VALUES (?)')
    const result = insert.run(text.trim())
    
    const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(result.lastInsertRowid)
    res.status(201).json({
      ...todo,
      completed: Boolean(todo.completed)
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' })
  }
})

// Update todo
app.put('/api/todos/:id', (req, res) => {
  try {
    const { text, completed } = req.body
    const id = req.params.id
    
    // Check if todo exists
    const existingTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id)
    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    
    const update = db.prepare(`
      UPDATE todos 
      SET text = COALESCE(?, text), 
          completed = COALESCE(?, completed),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)
    
    update.run(text || null, completed !== undefined ? completed : null, id)
    
    const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id)
    res.json({
      ...todo,
      completed: Boolean(todo.completed)
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' })
  }
})

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
  try {
    const id = req.params.id
    const deleteStmt = db.prepare('DELETE FROM todos WHERE id = ?')
    const result = deleteStmt.run(id)
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' })
  }
})

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

// Graceful shutdown
process.on('SIGINT', () => {
  db.close()
  process.exit(0)
})