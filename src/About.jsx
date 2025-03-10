function About() {
  return (
    <div className="card">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>
          ℹ️ 关于应用
        </h2>
        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
          一个现代化的待办事项管理应用
        </p>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#374151', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🚀 技术栈
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ 
            padding: '1rem', 
            background: 'rgba(102, 126, 234, 0.1)', 
            borderRadius: '10px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            <strong style={{ color: '#667eea' }}>前端:</strong> React + Vite
          </div>
          <div style={{ 
            padding: '1rem', 
            background: 'rgba(34, 197, 94, 0.1)', 
            borderRadius: '10px',
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }}>
            <strong style={{ color: '#22c55e' }}>后端:</strong> Node.js + Express
          </div>
          <div style={{ 
            padding: '1rem', 
            background: 'rgba(245, 158, 11, 0.1)', 
            borderRadius: '10px',
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}>
            <strong style={{ color: '#f59e0b' }}>数据库:</strong> SQLite
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#374151', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          ✨ 功能特性
        </h3>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {[
            { icon: '➕', text: '添加和管理待办事项' },
            { icon: '✏️', text: '编辑任务内容和状态' },
            { icon: '🗑️', text: '删除不需要的任务' },
            { icon: '💾', text: '数据持久化存储' },
            { icon: '📱', text: '响应式设计，支持移动端' },
            { icon: '🎨', text: '现代化的用户界面' }
          ].map((feature, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              border: '1px solid rgba(226, 232, 240, 0.8)'
            }}>
              <span style={{ fontSize: '1.2rem' }}>{feature.icon}</span>
              <span style={{ color: '#374151' }}>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        textAlign: 'center',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
        borderRadius: '15px',
        border: '1px solid rgba(102, 126, 234, 0.2)'
      }}>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          使用 React、Express 和 SQLite 构建的全栈应用
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ 
            padding: '0.5rem 1rem',
            background: 'rgba(102, 126, 234, 0.2)',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: '#667eea',
            fontWeight: '500'
          }}>
            v1.0.0
          </span>
          <span style={{ 
            padding: '0.5rem 1rem',
            background: 'rgba(34, 197, 94, 0.2)',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: '#22c55e',
            fontWeight: '500'
          }}>
            开源项目
          </span>
        </div>
      </div>
    </div>
  )
}

export default About