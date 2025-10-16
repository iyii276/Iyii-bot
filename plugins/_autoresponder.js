import axios from 'axios'
import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = m => m
handler.all = async function (m, { conn }) {
  let user = global.db.data.users[m.sender]
  let chat = global.db.data.chats[m.chat]

  // Detect bot messages (ignore them)
  m.isBot =
    (m.id.startsWith('BAE5') && m.id.length === 16) ||
    (m.id.startsWith('3EB0') && (m.id.length === 12 || m.id.length === 20 || m.id.length === 22)) ||
    (m.id.startsWith('B24E') && m.id.length === 20)

  if (m.isBot) return

  // Detect prefix (command)
  let prefixRegex = new RegExp(
    '^[' +
      (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') +
      ']'
  )

  if (prefixRegex.test(m.text)) return true
  if (m.isBot || m.sender.includes('bot') || m.sender.includes('Bot')) return true

  // Respond if bot is mentioned or quoted
  if (
    m.mentionedJid.includes(this.user.jid) ||
    (m.quoted && m.quoted.sender === this.user.jid && !chat.isBanned)
  ) {
    // Ignore specific keywords
    if (
      m.text.includes('ROCK') ||
      m.text.includes('PAPER') ||
      m.text.includes('SCISSORS') ||
      m.text.includes('menu') ||
      m.text.includes('status') ||
      m.text.includes('bots') ||
      m.text.includes('becomeBot') ||
      m.text.includes('connectBot') ||
      m.text.includes('Video') ||
      m.text.includes('Audio') ||
      m.text.includes('audio')
    )
      return true

    // ChatEverywhere API helper
    async function chatEverywhereAPI(q, username, logic) {
      try {
        const response = await axios.post(
          'https://chateverywhere.app/api/chat/',
          {
            model: {
              id: 'gpt-4',
              name: 'GPT-4',
              maxLength: 32000,
              tokenLimit: 8000,
              completionTokenLimit: 5000,
              deploymentName: 'gpt-4',
            },
            messages: [{ pluginId: null, content: q, role: 'user' }],
            prompt: logic,
            temperature: 0.5,
          },
          {
            headers: {
              Accept: '*/*',
              'User-Agent':
                'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
            },
          }
        )
        return response.data
      } catch (error) {
        console.error('🚩 ChatEverywhere API Error:', error)
        return null
      }
    }

    // Default bot personality / prompt
    let txtDefault = `
You are Asta, the bot created by Iyiola Abifarin — a WhatsApp Bot. Your mission is to talk like Asta from Black Clover, while also being useful. Your main language is Spanish, but you can reply in other languages if the user prefers.

Roles:
- IYII: Shine with or without magic. Don’t take things too seriously here. 🙃🎉
- Programming Assistant: You can generate JavaScript code freely, always with a funny and relaxed touch. Help users learn while having fun. 👨‍💻😜💻
- ChatGPT with Humor: Be helpful and informative but never lose your energetic, determined, and joking tone like Asta. Make every response entertaining and fun for the user.
- If someone swears at you, swear back XD.
`.trim()

    let query = m.text
    let username = m.pushName
    let customPrompt = chat.sAutoresponder ? chat.sAutoresponder : txtDefault

    if (chat.autoresponder) {
      if (m.fromMe) return
      if (!user.registered) return

      await this.sendPresenceUpdate('composing', m.chat)

      let result = await chatEverywhereAPI(query, username, customPrompt)

      if (!result || result.trim().length === 0) {
        result = `Sorry, I couldn’t generate a response.`
      }

      if (result && result.trim().length > 0) {
        await this.reply(m.chat, result, m)
      }
    }
  }

  return true
}

export default handler
