import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function TodoEdit({ todos, onUpdateTodo }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const todo = todos.find(t => t.id === parseInt(id))
    if (todo) {
      setText(todo.text)
      setCompleted(todo.completed)
      setLoading(false)
    } else {
      navigate('/todos')
    }
  }, [id, todos, navigate])

  const handleSave = () => {
    if (text.trim()) {
      onUpdateTodo(parseInt(id), { text: text.trim(), completed })
      navigate('/todos')
    }
  }

  const handleCancel = () => {
    navigate('/todos')
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>编辑待办事项</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          内容:
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入待办事项内容..."
          rows="3"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          已完成
        </label>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleSave}
          disabled={!text.trim()}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: text.trim() ? '#28a745' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: text.trim() ? 'pointer' : 'not-allowed'
          }}
        >
          保存
        </button>
        <button
          onClick={handleCancel}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          取消
        </button>
      </div>
    </div>
  )
}

export default TodoEdit