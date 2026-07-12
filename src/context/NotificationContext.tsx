import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface Notification {
  id: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
}

interface NotificationContextValue {
  notifications: Notification[]
  notify: (message: string, type?: Notification['type']) => void
  dismiss: (id: string) => void
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const notify = useCallback((message: string, type: Notification['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 7)
    setNotifications((current) => [...current, { id, message, type }])
    setTimeout(() => {
      setNotifications((current) => current.filter((n) => n.id !== id))
    }, 3000)
  }, [])

  const dismiss = useCallback((id: string) => {
    setNotifications((current) => current.filter((n) => n.id !== id))
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, notify, dismiss }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center justify-between rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition ${
              notification.type === 'error'
                ? 'bg-rose-600'
                : notification.type === 'success'
                ? 'bg-emerald-600'
                : notification.type === 'warning'
                ? 'bg-amber-500'
                : 'bg-slate-900'
            }`}
          >
            <span>{notification.message}</span>
            <button
              type="button"
              onClick={() => dismiss(notification.id)}
              className="ml-4 text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export function useNotify() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotify must be used within NotificationProvider')
  }
  return context
}
