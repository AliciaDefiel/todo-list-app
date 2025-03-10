import { Link } from 'react-router-dom'

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '1rem 1.25rem',
      background: todo.completed 
        ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.05))'
        : 'rgba(255, 255, 255, 0.8)',
      margin: '0.75rem 0',
      borderRadius: '15px',
      border: todo.completed 
        ? '2px solid rgba(34, 197, 94, 0.3)'
        : '2px solid rgba(226, 232, 240, 0.8)',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)'
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)'
    }}
    >
      {/* Progress bar for completed todos */}
      {todo.completed && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '4px',
          background: 'linear-gradient(180deg, #22c55e, #16a34a)',
          borderRadius: '15px 0 0 15px'
        }} />
      )}
      
      <div style={{ position: 'relative', marginRight: '1rem' }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          style={{ 
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            accentColor: '#22c55e'
          }}
        />
        {todo.completed && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#22c55e',
            fontSize: '14px',
            pointerEvents: 'none'
          }}>
            ✓
          </div>
        )}
      </div>
      
      <div style={{ flex: 1, marginRight: '1rem' }}>
        <span style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? '#6b7280' : '#1f2937',
          fontSize: '16px',
          fontWeight: todo.completed ? '400' : '500',
          opacity: todo.completed ? 0.7 : 1,
          transition: 'all 0.3s ease'
        }}>
          {todo.completed && '✅ '}
          {todo.text}
        </span>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link
          to={`/todos/edit/${todo.id}`}
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '0.5rem 1rem',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)'
            e.target.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.5)'
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = '0 2px 8px rgba(245, 158, 11, 0.3)'
          }}
        >
          ✏️ 编辑
        </Link>
        <button
          onClick={() => onDelete(todo.id)}
          style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)'
            e.target.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.5)'
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.3)'
          }}
        >
          🗑️ 删除
        </button>
      </div>
    </div>
  )
}

export default TodoItem