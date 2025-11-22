'use client'

import { useState, useEffect } from 'react'
import { PlusIcon, Trash2Icon, Edit2Icon, CheckIcon } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'
import TodoForm from './TodoForm'

export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'todos-app-data'

// Load todos from localStorage (lazy initialization)
function loadTodosFromStorage(): Todo[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error('Error loading todos:', error)
      return []
    }
  }
  return []
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(loadTodosFromStorage)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({ title: '', description: '' })

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const handleAdd = () => {
    if (!formData.title.trim()) return

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setTodos([newTodo, ...todos])
    setFormData({ title: '', description: '' })
    setIsAdding(false)
  }

  const handleUpdate = (id: string) => {
    if (!formData.title.trim()) return

    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: formData.title.trim(),
              description: formData.description.trim() || undefined,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    )
    setFormData({ title: '', description: '' })
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this todo?')) {
      setTodos(todos.filter((todo) => todo.id !== id))
    }
  }

  const handleToggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    )
  }

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id)
    setFormData({ title: todo.title, description: todo.description || '' })
    setIsAdding(false)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({ title: '', description: '' })
  }

  const startAdding = () => {
    setIsAdding(true)
    setEditingId(null)
    setFormData({ title: '', description: '' })
  }

  const completedCount = todos.filter((t) => t.completed).length
  const totalCount = todos.length

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-500">
            Todos
          </h1>
          {totalCount > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {completedCount} of {totalCount} completed
            </p>
          )}
        </div>
        <button
          onClick={startAdding}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          <PlusIcon size={18} />
          Add Todo
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <TodoForm
          title={formData.title}
          description={formData.description}
          onTitleChange={(title) =>
            setFormData({ ...formData, title })
          }
          onDescriptionChange={(description) =>
            setFormData({ ...formData, description })
          }
          onSubmit={handleAdd}
          onCancel={cancelEditing}
          isEditing={false}
        />
      )}

      {/* Todos List */}
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-high p-8">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
            No todos yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Get started by creating your first todo.
          </p>
          <button
            onClick={startAdding}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            <PlusIcon size={18} />
            Create Todo
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`p-4 border rounded-lg transition-colors ${
                todo.completed
                  ? 'bg-gray-900 dark:bg-dark-elevated border-gray-400 dark:border-dark-border-default opacity-75'
                  : 'bg-gray-900 dark:bg-dark-high border-gray-600 dark:border-dark-border-default hover:border-gray-300 dark:hover:border-dark-border-medium'
              }`}
            >
              {editingId === todo.id ? (
                <TodoForm
                  title={formData.title}
                  description={formData.description}
                  onTitleChange={(title) =>
                    setFormData({ ...formData, title })
                  }
                  onDescriptionChange={(description) =>
                    setFormData({ ...formData, description })
                  }
                  onSubmit={() => handleUpdate(todo.id)}
                  onCancel={cancelEditing}
                  isEditing={true}
                  compact={true}
                />
              ) : (
                <div className="bg-gray-900 dark:bg-dark-base flex items-start gap-3">
                  <button
                    onClick={() => handleToggleComplete(todo.id)}
                    className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      todo.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-500 dark:border-gray-500 hover:border-green-500'
                    }`}
                  >
                    {todo.completed && (
                      <CheckIcon size={14} className="text-white" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-medium text-gray-200 dark:text-gray-200 ${
                        todo.completed
                          ? 'line-through text-gray-300 dark:text-gray-300'
                          : ''
                      }`}
                    >
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p
                        className={`mt-1 text-sm text-gray-300 dark:text-gray-300 ${
                          todo.completed
                            ? 'line-through text-gray-400 dark:text-gray-400'
                            : ''
                        }`}
                      >
                        {todo.description}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-gray-400 dark:text-gray-400">
                      {formatRelativeTime(new Date(todo.createdAt))}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => startEditing(todo)}
                      className="p-2 text-gray-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                      title="Edit"
                    >
                      <Edit2Icon size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="p-2 text-gray-300 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2Icon size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

