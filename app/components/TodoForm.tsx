'use client'

interface TodoFormProps {
  title: string
  description: string
  onTitleChange: (title: string) => void
  onDescriptionChange: (description: string) => void
  onSubmit: () => void
  onCancel: () => void
  isEditing?: boolean
  compact?: boolean
}

export default function TodoForm({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  onCancel,
  isEditing = false,
  compact = false,
}: TodoFormProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    } else if (e.key === 'Escape') {
      onCancel()
    }
  }

  const containerClass = compact
    ? 'space-y-3'
    : 'mb-6 p-4 border border-gray-500 dark:border-dark-border-default rounded-lg bg-gray-900 dark:bg-dark-high'

  const buttonSizeClass = compact ? 'px-3 py-1 text-sm' : 'px-4 py-2'

  return (
    <div className={containerClass}>
      <div className={compact ? 'space-y-3' : 'space-y-4'}>
        <div>
          <input
            type="text"
            placeholder="Todo title..."
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-500 dark:border-dark-border-medium rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <textarea
            placeholder="Description (optional)..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={compact ? 2 : 3}
            className="w-full px-3 py-2 border border-gray-500 dark:border-dark-border-medium rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={onSubmit}
            className={`${buttonSizeClass} bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors`}
          >
            {isEditing ? 'Save' : 'Add'}
          </button>
          <button
            onClick={onCancel}
            className={`${buttonSizeClass} bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

