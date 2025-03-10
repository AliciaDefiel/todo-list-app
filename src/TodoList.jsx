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
    <div className="card">
      <h2 style={{ color: '#2d3748', marginBottom: '2rem', textAlign: 'center' }}>
        📝 我的待办事项
      </h2>
      
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="添加新的待办事项..."
          style={{ 
            flex: 1,
            minWidth: '250px',
            padding: '0.75rem 1rem', 
            fontSize: '16px', 
            border: '2px solid #e2e8f0',
            borderRadius: '25px',
            outline: 'none',
            transition: 'all 0.3s ease',
            background: 'rgba(255, 255, 255, 0.8)'
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />
        <button 
          onClick={handleAddTodo}
          disabled={!inputValue.trim()}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '16px',
            background: inputValue.trim() 
              ? 'linear-gradient(135deg, #4ade80, #22c55e)' 
              : '#94a3b8',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            boxShadow: inputValue.trim() 
              ? '0 4px 15px rgba(34, 197, 94, 0.4)' 
              : 'none',
            whiteSpace: 'nowrap'
          }}
          onMouseOver={(e) => {
            if (inputValue.trim()) {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.6)'
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = inputValue.trim() 
              ? '0 4px 15px rgba(34, 197, 94, 0.4)' 
              : 'none'
          }}
        >
          ➕ 添加
        </button>
      </div>
      
      {loading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          color: '#667eea',
          fontSize: '1.1rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>⏳</div>
          加载中...
        </div>
      ) : todos.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          color: '#94a3b8',
          fontSize: '1.1rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
          <p>暂无待办事项</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>在上方添加您的第一个任务吧！</p>
        </div>
      ) : (
        <div style={{ marginBottom: '2rem' }}>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
            />
          ))}
        </div>
      )}
      
      {todos.length > 0 && (
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(102, 126, 234, 0.1)',
          borderRadius: '15px',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          <div style={{ color: '#4a5568', fontWeight: '500' }}>
            📊 统计信息
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem' }}>
            <span style={{ color: '#667eea' }}>
              总计: <strong>{todos.length}</strong>
            </span>
            <span style={{ color: '#22c55e' }}>
              已完成: <strong>{todos.filter(t => t.completed).length}</strong>
            </span>
            <span style={{ color: '#f59e0b' }}>
              待完成: <strong>{todos.filter(t => !t.completed).length}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoList