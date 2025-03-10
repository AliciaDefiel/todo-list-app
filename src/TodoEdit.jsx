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
    <div className="card">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>
          ✏️ 编辑待办事项
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
          修改您的待办事项内容和状态
        </p>
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '0.75rem', 
          fontWeight: '600',
          color: '#374151',
          fontSize: '1rem'
        }}>
          📝 内容
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入待办事项内容..."
          rows="4"
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '16px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            resize: 'vertical',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'all 0.3s ease',
            background: 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'inherit'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#667eea'
            e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e5e7eb'
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      <div style={{ 
        marginBottom: '2rem',
        padding: '1rem',
        background: 'rgba(102, 126, 234, 0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(102, 126, 234, 0.2)'
      }}>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center', 
          fontSize: '16px',
          fontWeight: '500',
          color: '#374151',
          cursor: 'pointer'
        }}>
          <div style={{ position: 'relative', marginRight: '0.75rem' }}>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              style={{ 
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                accentColor: '#22c55e'
              }}
            />
            {completed && (
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
          <span>
            {completed ? '✅ 已完成' : '⏳ 待完成'}
          </span>
        </label>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={handleSave}
          disabled={!text.trim()}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '16px',
            fontWeight: '600',
            background: text.trim() 
              ? 'linear-gradient(135deg, #22c55e, #16a34a)' 
              : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: text.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            boxShadow: text.trim() 
              ? '0 4px 15px rgba(34, 197, 94, 0.4)' 
              : 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseOver={(e) => {
            if (text.trim()) {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.6)'
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = text.trim() 
              ? '0 4px 15px rgba(34, 197, 94, 0.4)' 
              : 'none'
          }}
        >
          💾 保存更改
        </button>
        <button
          onClick={handleCancel}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '16px',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #6b7280, #4b5563)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(107, 114, 128, 0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 6px 20px rgba(107, 114, 128, 0.6)'
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 4px 15px rgba(107, 114, 128, 0.4)'
          }}
        >
          ❌ 取消
        </button>
      </div>
    </div>
  )
}

export default TodoEdit