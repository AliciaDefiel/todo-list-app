import { Link } from 'react-router-dom'

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: '#f9f9f9',
      margin: '5px 0',
      borderRadius: '4px',
      border: '1px solid #e0e0e0'
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ marginRight: '10px' }}
      />
      <span
        style={{
          flex: 1,
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? '#666' : '#000',
          fontSize: '16px'
        }}
      >
        {todo.text}
      </span>
      <div style={{ display: 'flex', gap: '5px' }}>
        <Link
          to={`/todos/edit/${todo.id}`}
          style={{
            backgroundColor: '#ffc107',
            color: '#212529',
            border: 'none',
            borderRadius: '4px',
            padding: '5px 10px',
            textDecoration: 'none',
            fontSize: '14px',
            display: 'inline-block'
          }}
        >
          编辑
        </Link>
        <button
          onClick={() => onDelete(todo.id)}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          删除
        </button>
      </div>
    </li>
  )
}

export default TodoItem