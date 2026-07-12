import { useState, useEffect } from 'react'
import { FarmerNav } from '../components/FarmerNav'
import { BuyerNav } from '../components/BuyerNav'
import { SectionHeading } from '../components/SectionHeading'
import { useAuth } from '../context/AuthContext'
import { useNotify } from '../context/NotificationContext'

const aiSuggestions = [
  'Consider harvesting your palay this week for optimal grain quality.',
  'Weather alert: Rain expected in 2 days. Prepare drainage.',
  'Market tip: Tomato prices are rising in Los Baños.',
  'Reminder: Apply organic fertilizer before the dry season.',
]

const initialMessages = [
  { id: '1', sender: 'Ate Linda', text: 'Can I reserve 50 kg of your pechay?', time: '2h ago', isUser: true },
  { id: '2', sender: 'You', text: 'Yes, I can reserve it for you. Pickup tomorrow?', time: '1h ago', isUser: false },
  { id: '3', sender: 'Ate Linda', text: 'Perfect, see you at 8am!', time: '30m ago', isUser: true },
]

export default function MessagingPage() {
  const { user } = useAuth()
  const { notify } = useNotify()
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')

  const isBuyer = user?.role === 'buyer'
  const Nav = isBuyer ? BuyerNav : FarmerNav

  useEffect(() => {
    document.title = 'Messages | AgriLink'
  }, [])

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    const newMessage = {
      id: Date.now().toString(),
      sender: 'You',
      text: input.trim(),
      time: 'Just now',
      isUser: false,
    }
    setMessages((prev) => [...prev, newMessage])
    setInput('')
    notify('Message sent.', 'success')
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <Nav />
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Messages</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">Chat with sellers and buyers</h1>
          <p className="mt-4 max-w-2xl text-slate-600">AI suggestions appear at the top. Your conversation appears below.</p>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="AI Suggestions" subtitle="Smart tips based on your activity and market data." />
          <div className="mt-6 space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <span className="mt-0.5 text-emerald-600">✦</span>
                <p className="text-sm leading-7 text-emerald-900">{suggestion}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionHeading title="Conversation" subtitle="Your recent messages with other users." />
          <div className="mt-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                    msg.isUser
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{msg.sender}</p>
                    <span className="text-xs opacity-70">{msg.time}</span>
                  </div>
                  <p className="mt-1 text-sm leading-7">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="mt-6 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Send
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}
