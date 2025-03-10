import { useState } from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos, loading, onAddTodo, onToggleTodo, onDeleteTodo }) {
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim())
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
          style={{ 
            padding: '10px', 
            fontSize: '16px', 
            width: '70%',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button 
          onClick={handleAddTodo}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          加载中...
        </div>
      ) : todos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>暂无待办事项，添加一个吧！</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
            />
          ))}
        </ul>
      )}
      
      <div style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
        Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}
      </div>
    </div>
  )
}

export default TodoList