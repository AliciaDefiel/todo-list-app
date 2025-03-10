const API_BASE_URL = 'http://localhost:3001/api'

class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(errorData.error || 'API request failed', response.status)
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return null
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError('Network error: Unable to connect to server', 0)
  }
}

export const todosApi = {
  // Get all todos
  getAll: () => apiRequest('/todos'),

  // Get single todo
  getById: (id) => apiRequest(`/todos/${id}`),

  // Create new todo
  create: (text) => apiRequest('/todos', {
    method: 'POST',
    body: JSON.stringify({ text }),
  }),

  // Update todo
  update: (id, updates) => apiRequest(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),

  // Delete todo
  delete: (id) => apiRequest(`/todos/${id}`, {
    method: 'DELETE',
  }),
}