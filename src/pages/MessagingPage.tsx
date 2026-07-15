import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotify } from '../context/NotificationContext'
import { User, Headphones, Bot, Sparkles, Send, Plus, Search, MoreVertical, Check, CheckCheck, Image, Camera, FileText, X } from 'lucide-react'
import { getAIResponse, AI_NAME } from '../services/ai'
import { FarmerNav } from '../components/FarmerNav'
import { BuyerNav } from '../components/BuyerNav'

type Contact = {
  id: string
  name: string
  role: string
  icon: React.ElementType
  lastMessage: string
  time: string
  unread: boolean
  online: boolean
}

type Message = {
  id: string
  text: string
  sender: string
  isUser: boolean
  time: string
  status?: 'sent' | 'delivered' | 'read'
  attachment?: {
    name: string
    type: 'image' | 'file' | 'camera'
    url: string
  }
}

const initialContacts: Contact[] = [
  { id: 'ai', name: AI_NAME, role: 'AI Advisor', icon: Bot, lastMessage: 'Ask me about crops, weather, pests, or market prices.', time: 'Now', unread: true, online: true },
  { id: '1', name: 'Ate Linda', role: 'Buyer', icon: User, lastMessage: 'Perfect, see you at 8am!', time: '30m', unread: true, online: true },
  { id: '2', name: 'Mang Romy', role: 'Farmer', icon: User, lastMessage: 'Anong presyo ngayon ng palay?', time: '2h', unread: false, online: false },
  { id: '3', name: 'AgriLink Support', role: 'Support', icon: Headphones, lastMessage: 'Your order has been confirmed.', time: '1d', unread: false, online: true },
]

const initialMessages: Record<string, Message[]> = {
  'ai': [
    { id: '1', text: `Hello! I'm ${AI_NAME}, your AI farming assistant. I can help you with:\n\n🌾 Crop recommendations and planting schedules\n🌤️ Weather forecasts and rainfall alerts\n🐛 Pest and disease identification\n💰 Market prices and selling strategies\n📊 Farm productivity tips\n\nWhat would you like to know?`, sender: AI_NAME, isUser: false, time: 'Just now', status: 'read' },
  ],
  '1': [
    { id: '1', text: 'Can I reserve 50 kg of your pechay?', sender: 'Ate Linda', isUser: false, time: '2h ago', status: 'read' },
    { id: '2', text: 'Yes, I can reserve it for you. Pickup tomorrow?', sender: 'You', isUser: true, time: '1h ago', status: 'read' },
    { id: '3', text: 'Perfect, see you at 8am!', sender: 'Ate Linda', isUser: false, time: '30m ago', status: 'read' },
  ],
  '2': [
    { id: '1', text: 'Anong presyo ngayon ng palay?', sender: 'Mang Romy', isUser: false, time: '2h ago', status: 'read' },
  ],
  '3': [
    { id: '1', text: 'Your order has been confirmed.', sender: 'AgriLink Support', isUser: false, time: '1d ago', status: 'read' },
  ],
}

const AI_SUGGESTIONS: Record<string, string[]> = {
  ai: [
    'What crops grow best in Laguna?',
    'When should I plant rice this season?',
    'How do I control pests organically?',
    'What are current market prices?',
  ],
  '1': [
    'Can I get a discount for bulk orders?',
    'Do you deliver in Los Baños?',
    'What vegetables are in season?',
  ],
  '2': [
    'Anong presyo ng palay ngayon?',
    'Best time to harvest corn?',
    'Paano kontrolin ang pests?',
  ],
  '3': [
    'How do I track my order?',
    'I need help with payment',
    'How to update my profile?',
  ],
}

export default function MessagingPage() {
  const { user } = useAuth()
  const { notify } = useNotify()
  const [activeContact, setActiveContact] = useState<string>('ai')
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages)
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [attachments, setAttachments] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [showCameraModal, setShowCameraModal] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

  const isBuyer = user?.role === 'buyer'
  const Nav = isBuyer ? BuyerNav : FarmerNav

  useEffect(() => {
    document.title = 'Messages | AgriLink'
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, activeContact, isTyping])

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [cameraStream])

  const contactMessages = messages[activeContact] || []
  const active = contacts.find((c) => c.id === activeContact)
  const suggestions = AI_SUGGESTIONS[activeContact] || AI_SUGGESTIONS['ai']

  function handleFileSelect(files: FileList | null) {
    if (!files) return
    const newFiles = Array.from(files)
    setAttachments((prev) => [...prev, ...newFiles])
    const urls = newFiles.map((file) => URL.createObjectURL(file))
    setPreviewUrls((prev) => [...prev, ...urls])
    setShowAttachmentMenu(false)
  }

  function handleCameraCapture(event: React.ChangeEvent<HTMLInputElement>) {
    handleFileSelect(event.target.files)
  }

  function openCamera() {
    setShowCameraModal(true)
    setCameraError(null)

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          setCameraStream(stream)
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => {
          console.error('Camera error:', err)
          setCameraError('Camera access denied or not available. Please allow camera permissions or use the file upload instead.')
          setShowCameraModal(false)
        })
    } else {
      setCameraError('Camera not supported on this device. Please use the file upload instead.')
      setShowCameraModal(false)
    }
  }

  function capturePhoto() {
    if (!videoRef.current || !cameraStream) return

    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' })
          setAttachments((prev) => [...prev, file])
          setPreviewUrls((prev) => [...prev, URL.createObjectURL(blob)])
        }
      }, 'image/jpeg', 0.9)
    }

    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop())
      setCameraStream(null)
    }
    setShowCameraModal(false)
  }

  function closeCamera() {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop())
      setCameraStream(null)
    }
    setShowCameraModal(false)
    setCameraError(null)
  }

  function removeAttachment(index: number) {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
    setPreviewUrls((prev) => {
      const url = prev[index]
      if (url) URL.revokeObjectURL(url)
      return prev.filter((_, i) => i !== index)
    })
  }

  function showTypingAndReply(contactId: string, replyText: string) {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const newMessage: Message = {
        id: Date.now().toString(),
        text: replyText,
        sender: active?.name || 'User',
        isUser: false,
        time: 'Just now',
        status: 'read',
      }
      setMessages((prev) => ({
        ...prev,
        [contactId]: [...(prev[contactId] || []), newMessage],
      }))
      setContacts((prev) =>
        prev.map((c) =>
          c.id === contactId
            ? { ...c, lastMessage: replyText.slice(0, 40) + (replyText.length > 40 ? '...' : ''), time: 'Now' }
            : c,
        ),
      )
    }, 1200)
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() && attachments.length === 0) return

    const isAI = activeContact === 'ai'

    if (!isAI && !active?.online) {
      notify(`${active?.name || 'This user'} is offline. You can still send a message, but they will see it when they come online.`, 'info')
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'You',
      isUser: true,
      time: 'Just now',
      status: 'sent',
      ...(attachments.length > 0 && {
        attachment: {
          name: attachments[0].name,
          type: attachments[0].type.startsWith('image/') ? 'image' : 'file',
          url: previewUrls[0] || '',
        },
      }),
    }

    setMessages((prev) => ({
      ...prev,
      [activeContact]: [...(prev[activeContact] || []), newMessage],
    }))
    setInput('')
    setAttachments([])
    setPreviewUrls([])
    setShowSuggestions(false)

    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContact
          ? { ...c, lastMessage: input.trim().slice(0, 40) + (input.trim().length > 40 ? '...' : ''), time: 'Now', unread: false }
          : c,
      ),
    )

    const history = contactMessages.map((msg) => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text,
    }))

    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [activeContact]: prev[activeContact].map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg,
        ),
      }))
    }, 600)

    if (active?.online || activeContact === 'ai') {
      getAIResponse(input.trim(), activeContact, history).then((replyText) => {
        showTypingAndReply(activeContact, replyText)
        setTimeout(() => {
          setMessages((prev) => ({
            ...prev,
            [activeContact]: prev[activeContact].map((msg) =>
              msg.sender === 'You' && msg.status === 'delivered' ? { ...msg, status: 'read' } : msg,
            ),
          }))
        }, 1800)
      })
    }

    notify('Message sent.', 'success')
    inputRef.current?.focus()
  }

  const filteredContacts = contacts.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <Nav />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex h-[calc(100vh-8rem)] gap-6">
          <aside className={`flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-0 overflow-hidden'}`}>
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="text-lg font-semibold text-slate-900">AgriLink</span>
              </div>
            </div>

            <div className="px-3 py-3">
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pl-10 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => {
                    setActiveContact(contact.id)
                    if (!sidebarOpen) setSidebarOpen(true)
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50 ${
                    activeContact === contact.id ? 'bg-emerald-50' : ''
                  }`}
                >
                  <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <contact.icon className="h-5 w-5" strokeWidth={1.5} />
                    {contact.online && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-semibold text-slate-900">{contact.name}</p>
                      <span className="text-xs text-slate-400">{contact.time}</span>
                    </div>
                    <p className="truncate text-xs text-slate-500">{contact.lastMessage}</p>
                  </div>
                  {contact.unread && <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-500" />}
                </button>
              ))}
              {filteredContacts.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-slate-500">No conversations found.</p>
              )}
            </div>
          </aside>

          <div className="flex h-full flex-1 flex-col">
            {active ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
                  <div className="flex items-center gap-3">
                    {!sidebarOpen && (
                      <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                      >
                        <Search className="h-4 w-4" />
                      </button>
                    )}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <active.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{active.name}</p>
                      <p className="text-xs text-slate-500">{active.online ? 'Online' : 'Offline'}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-6">
                  <div className="mx-auto max-w-3xl space-y-6">
                    {contactMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-end gap-3 ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            {msg.isUser ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <active.icon className="h-4 w-4" strokeWidth={1.5} />
                            )}
                          </div>
                          <div className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
                            <div
                              className={`rounded-2xl px-4 py-2.5 ${
                                msg.isUser
                                  ? 'bg-emerald-700 text-white rounded-br-md'
                                  : 'bg-white text-slate-900 border border-slate-200 rounded-bl-md'
                              }`}
                            >
                              {msg.attachment && msg.attachment.type === 'image' && (
                                <img src={msg.attachment.url} alt="Attachment" className="mb-2 rounded-lg max-h-48 w-auto" />
                              )}
                              {msg.attachment && msg.attachment.type === 'file' && (
                                <div className="mb-2 flex items-center gap-2 rounded-lg bg-slate-100 p-2">
                                  <FileText className="h-5 w-5 text-slate-500" />
                                  <span className="text-xs text-slate-600">{msg.attachment.name}</span>
                                </div>
                              )}
                              {msg.attachment && msg.attachment.type === 'camera' && (
                                <img src={msg.attachment.url} alt="Camera capture" className="mb-2 rounded-lg max-h-48 w-auto" />
                              )}
                              {msg.text && <p className="text-sm leading-7 whitespace-pre-line">{msg.text}</p>}
                            </div>
                            <div className="mt-1 flex items-center gap-1.5 px-1">
                              <span className="text-xs text-slate-400">{msg.time}</span>
                              {msg.isUser && (
                                <span className="text-slate-400">
                                  {msg.status === 'sent' && <Check className="h-3 w-3" />}
                                  {msg.status === 'delivered' && <CheckCheck className="h-3 w-3" />}
                                  {msg.status === 'read' && <CheckCheck className="h-3 w-3 text-emerald-600" />}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className={`flex items-end gap-3`}>
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <active.icon className="h-4 w-4" strokeWidth={1.5} />
                          </div>
                          <div className={`flex flex-col items-start max-w-[75%]`}>
                            <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3">
                              <div className="flex gap-1">
                                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0ms' }} />
                                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '150ms' }} />
                                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '300ms' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="border-t border-slate-200 bg-white px-6 py-4">
                  <form onSubmit={handleSend} className="mx-auto max-w-3xl">
                    {showSuggestions && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Suggestions</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                setInput(suggestion)
                                setShowSuggestions(false)
                                inputRef.current?.focus()
                              }}
                              className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800 transition hover:bg-emerald-100"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {previewUrls.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative inline-block">
                            <img src={url} alt="Preview" className="h-16 w-16 rounded-lg object-cover" />
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="absolute -right-2 -top-2 rounded-full bg-slate-900 p-1 text-white transition hover:bg-slate-800"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                          className="mb-0.5 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                        {showAttachmentMenu && (
                          <div className="absolute bottom-full left-0 mb-2 rounded-xl border border-slate-200 bg-white shadow-lg">
                            <button
                              type="button"
                              onClick={() => {
                                fileInputRef.current?.click()
                                setShowAttachmentMenu(false)
                              }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                            >
                              <FileText className="h-4 w-4 text-slate-400" />
                              <span>File</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                openCamera()
                                setShowAttachmentMenu(false)
                              }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                            >
                              <Camera className="h-4 w-4 text-slate-400" />
                              <span>Camera</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const input = document.createElement('input')
                                input.type = 'file'
                                input.accept = 'image/*'
                                input.multiple = true
                                input.onchange = (e) => handleFileSelect((e.target as HTMLInputElement).files)
                                input.click()
                                setShowAttachmentMenu(false)
                              }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                            >
                              <Image className="h-4 w-4 text-slate-400" />
                              <span>Photo</span>
                            </button>
                          </div>
                        )}
                      </div>
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Message..."
                        className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
                      />
                      <button
                        type="submit"
                        disabled={!input.trim() && attachments.length === 0}
                        className="mb-0.5 rounded-lg bg-emerald-700 p-2 text-white transition hover:bg-emerald-800 disabled:opacity-50 disabled:hover:bg-emerald-700"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileSelect(e.target.files)}
                    />
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handleCameraCapture}
                    />
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center bg-slate-50">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-slate-900">Welcome to AgriLink Messages</h2>
                  <p className="mt-2 text-sm text-slate-500">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCameraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Camera</h3>
              <button
                type="button"
                onClick={closeCamera}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {cameraError ? (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-6 text-center">
                <Camera className="mx-auto h-12 w-12 text-rose-400 mb-3" />
                <p className="text-sm text-rose-200">{cameraError}</p>
                <button
                  type="button"
                  onClick={closeCamera}
                  className="mt-4 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-600"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-xl bg-black"
                  style={{ maxHeight: '60vh' }}
                />
                <div className="mt-4 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={closeCamera}
                    className="rounded-lg bg-slate-700 px-6 py-2 text-sm font-medium text-white transition hover:bg-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="rounded-lg bg-emerald-700 px-6 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
                  >
                    Capture Photo
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
