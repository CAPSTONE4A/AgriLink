export const AI_NAME = 'Ari'

const AI_SYSTEM_PROMPT = `You are ${AI_NAME}, a friendly and knowledgeable AI farming assistant for AgriLink, a Philippine farming platform. You help farmers and buyers with:

- Crop recommendations and planting schedules for Philippine agriculture
- Weather insights and rainfall alerts
- Pest and disease identification and solutions
- Market prices and selling strategies
- Farm productivity tips
- General agricultural advice

Be conversational, helpful, and use a mix of English and Tagalog/Filipino when appropriate. Keep responses concise but informative. Use emojis occasionally to be friendly.`

const CONTACT_PERSONAS: Record<string, { name: string; role: string; prompt: string }> = {
  ai: {
    name: AI_NAME,
    role: 'AI Advisor',
    prompt: AI_SYSTEM_PROMPT,
  },
  '1': {
    name: 'Ate Linda',
    role: 'Buyer',
    prompt: `You are Ate Linda, a friendly vegetable buyer from Los Baños, Laguna. You're a regular customer who buys fresh produce from farmers. You speak in a mix of Tagalog and English, very friendly and casual. You're interested in buying pechay, tomatoes, and other vegetables. You're currently online and ready to chat. Keep responses short and natural, like a real text message.`,
  },
  '2': {
    name: 'Mang Romy',
    role: 'Farmer',
    prompt: `You are Mang Romy, a rice farmer from Calauan, Laguna. You're a seasoned farmer with 15+ years of experience. You speak in Tagalog with some English terms. You're currently online and friendly. You like to ask about prices and share farming tips. Keep responses short and natural, like a real text message.`,
  },
  '3': {
    name: 'AgriLink Support',
    role: 'Support',
    prompt: `You are AgriLink Support, a professional customer service representative for the AgriLink platform. Your main responsibilities are:

- Order confirmations, tracking, and delivery issues
- Account verification, profile updates, and login problems
- Payment and billing questions
- Marketplace listing issues and disputes
- Technical platform bugs and feature guidance
- General platform navigation help

Be helpful, polite, and efficient. Keep responses professional but friendly. If you cannot resolve an issue directly, guide users to the right place or escalate appropriately.`,
  },
}

async function callHuggingFaceAPI(message: string, history: { role: string; content: string }[], personaPrompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY
  if (!apiKey) {
    throw new Error('No API key configured')
  }

  const model = import.meta.env.VITE_AI_MODEL || 'google/flan-t5-base'

  const context = history.slice(-6).map((h) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`).join('\n')
  const prompt = `${personaPrompt}\n\n${context}\nUser: ${message}\nAssistant:`

  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 256,
        temperature: 0.7,
        do_sample: true,
        return_full_text: false,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Hugging Face API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text.trim()
  }
  if (typeof data === 'string') {
    return data.trim()
  }
  throw new Error('Unexpected API response format')
}

function getMockResponse(contactId: string, message: string): string {
  const lower = message.toLowerCase()

  if (contactId === 'ai') {
    if (lower.includes('how are you') || lower.includes("how's it going") || lower.includes('what\'s up') || lower.includes('good morning') || lower.includes('good afternoon') || lower.includes('good evening')) {
      return `I'm doing great, thanks for asking! I'm ${AI_NAME}, your farming assistant. How can I help you with your farm today?`
    }
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return `Hey there! I'm ${AI_NAME}, your AI farming assistant. I can help you with crops, weather, pests, market prices, and more. What's on your mind?`
    }
    if (lower.includes('what can you do') || lower.includes('function') || lower.includes('help') || lower.includes('abilities')) {
      return `I'm ${AI_NAME}, your AI Advisor! Here's what I can do:\n\n🌾 Crop recommendations and planting schedules\n🌤️ Weather forecasts and rainfall alerts\n🐛 Pest and disease identification\n💰 Market prices and selling strategies\n📊 Farm productivity tips\n\nJust ask me anything about farming!`
    }
    if (lower.includes('rice') || lower.includes('palay')) {
      return `For rice farming:\n\n• Plant during the wet season (May-June)\n• Use 100-120 kg/ha of complete fertilizer\n• Watch for rice blast in humid conditions\n• Harvest when 85-90% of grains are golden\n\nCurrent market price: ₱22-24/kg in your area.`
    }
    if (lower.includes('tomato')) {
      return `Tomato growing tips:\n\n• Start seeds indoors 6-8 weeks before last frost\n• Plant in well-drained soil with pH 6.0-6.8\n• Stake plants early to support fruit\n• Water deeply but infrequently\n\nGood news: Tomato prices are rising in Los Baños right now (₱45/kg).`
    }
    if (lower.includes('weather') || lower.includes('rain') || lower.includes('forecast')) {
      return `Weather update for your area:\n\n🌤️ Today: 32°C, Clear skies, 72% humidity\n🌧️ Tomorrow: Rain expected (85% chance)\n\nRecommendation: Harvest early crops today if possible. Ensure proper drainage for fields.`
    }
    if (lower.includes('pest') || lower.includes('disease') || lower.includes('bug') || lower.includes('insect')) {
      return `Common pest solutions:\n\n🐛 Aphids: Introduce ladybugs or use neem oil spray\n🐛 Fruit flies: Use traps and remove infected fruits\n🐛 Stem borers: Apply Bacillus thuringiensis (Bt)\n\nTip: Always identify the pest first before treating. You can describe symptoms or upload a photo.`
    }
    if (lower.includes('price') || lower.includes('market') || lower.includes('sell')) {
      return `Current market trends:\n\n🌾 Rice: ₱22-24/kg (stable)\n🌽 Corn: ₱18-20/kg (slight increase)\n🍅 Tomatoes: ₱45/kg (rising!)\n🥬 Pechay: ₱35/kg (steady)\n\nBest time to sell: Early morning at wholesale markets.`
    }
    if (lower.includes('fertilizer') || lower.includes('compost') || lower.includes('soil')) {
      return `Soil health tips:\n\n• Test soil pH every 6 months\n• Use compost for organic matter (2-3 inches top layer)\n• Rotate crops to prevent nutrient depletion\n• Consider legumes (beans, peanuts) to fix nitrogen\n• Apply fertilizer based on soil test results\n\nOver-fertilizing can harm crops more than under-fertilizing.`
    }
    return `Thanks for your message! While I specialize in farming advice, I'm happy to chat. Feel free to ask me about crops, weather, pests, market prices, or any agriculture-related questions!`
  }

  if (contactId === '1') {
    if (lower.includes('price') || lower.includes('presyo') || lower.includes('cost')) {
      return 'Our pechay is ₱35/kg. We offer discounts for bulk orders (50kg+).'
    }
    if (lower.includes('reserve') || lower.includes('book') || lower.includes('order')) {
      return 'I can reserve it for you! When would you like to pick up?'
    }
    if (lower.includes('hello') || lower.includes('hi')) {
      return 'Hi! Interested in our fresh pechay?'
    }
    return 'Thanks for your message! Let me check availability and get back to you.'
  }

  if (contactId === '2') {
    if (lower.includes('price') || lower.includes('presyo') || lower.includes('palay')) {
      return 'Current palay price is around ₱22-24/kg depending on quality.'
    }
    if (lower.includes('harvest') || lower.includes('ani')) {
      return 'Best to harvest when 85-90% of grains are golden yellow.'
    }
    return 'Sige, I\'ll check and let you know. Salamat!'
  }

  if (contactId === '3') {
    if (lower.includes('order') || lower.includes('track') || lower.includes('delivery')) {
      return 'I can help you track your order! Please provide your order ID, and I\'ll check the current status for you.'
    }
    if (lower.includes('payment') || lower.includes('billing') || lower.includes('refund')) {
      return 'For payment issues, please check your payment method in Settings > Billing. If the problem persists, I can escalate this to our finance team.'
    }
    if (lower.includes('account') || lower.includes('profile') || lower.includes('login')) {
      return 'I can help with account issues. Are you having trouble logging in, or do you need to update your profile information?'
    }
    if (lower.includes('listing') || lower.includes('marketplace') || lower.includes('post')) {
      return 'For marketplace listing issues, please check our Seller Guidelines. If your listing was removed or you\'re having trouble posting, I can look into it.'
    }
    if (lower.includes('bug') || lower.includes('error') || lower.includes('technical')) {
      return 'I\'m sorry about the technical issue. Could you describe what happened? This helps our tech team investigate faster.'
    }
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('help')) {
      return 'Hello! I\'m AgriLink Support. I can help with orders, payments, account issues, listings, and platform questions. What do you need assistance with?'
    }
    return 'Thank you for contacting AgriLink Support. Could you provide more details so I can assist you better?'
  }

  return 'Got your message! I\'ll respond shortly.'
}

export async function getAIResponse(message: string, contactId: string, history: { role: string; content: string }[] = []): Promise<string> {
  const persona = CONTACT_PERSONAS[contactId] || CONTACT_PERSONAS['ai']

  try {
    return await callHuggingFaceAPI(message, history, persona.prompt)
  } catch {
    return getMockResponse(contactId, message)
  }
}
