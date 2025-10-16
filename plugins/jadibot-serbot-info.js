// code created by Iyiola Abifarin
import fs from 'fs'
import path from 'path'

async function handler(m, { conn: stars, usedPrefix }) {
  const maxSubBots = 500
  const conns = Array.isArray(global.conns) ? global.conns : []

  const isConnOpen = (c) => {
    try {
      return c?.ws?.socket?.readyState === 1
    } catch {
      return !!c?.user?.id
    }
  }

  const unique = new Map()
  for (const c of conns) {
    if (!c || !c.user) continue
    if (!isConnOpen(c)) continue
    const jidRaw = c.user.jid || c.user.id || ''
    if (!jidRaw) continue
    unique.set(jidRaw, c)
  }

  const users = [...unique.values()]
  const totalUsers = users.length
  const availableSlots = Math.max(0, maxSubBots - totalUsers)

  let responseMessage = `˚₊·—̳͟͞͞✞ *Subbots Black-clover-MD 🥷🏻*\n\n`

  if (totalUsers === 0) {
    responseMessage += `✞ Status:\n> ⤿ There are *no subbots connected* at the moment.\n\n✞ Info:\n> ⤿ 🟢 Available slots: *${availableSlots}*`
  } else if (totalUsers <= 15) {
    const listado = users
      .map((v, i) => {
        const num = v.user.jid.replace(/[^0-9]/g, '')
        const name = v?.user?.name || v?.user?.pushName || '👤 Sub-Bot'
        const waLink = `https://wa.me/${num}?text=${usedPrefix}code`
        return `✞ Subbot #${i + 1}\n> ⤿ 👾 @${num}\n> ⤿ 🌐 ${waLink}\n> ⤿ 🧠 ${name}`
      })
      .join('\n\n')

    responseMessage += `✞ Status:\n> ⤿ 🔢 Total connected: *${totalUsers}*\n> ⤿ 🟢 Available slots: *${availableSlots}*\n\n${listado}`
  } else {
    responseMessage += `✞ Status:\n> ⤿ 🔢 Total connected: *${totalUsers}*\n> ⤿ 🟢 Available slots: *${availableSlots}*\n\nᥫ᭡ Note:\n> ⤿ Too many subbots are currently connected.\n> ⤿ _Detailed list not shown._`
  }

  responseMessage += `\n\n📂 *Bot Creator:* The Carlos 👑`

  const imgDir = path.resolve('./src/img')
  let images = []
  try {
    images = fs.readdirSync(imgDir).filter(file => /\.(jpe?g|png|webp)$/i.test(file))
  } catch {
    images = []
  }

  const randomImage = images.length > 0 ? path.join(imgDir, images[Math.floor(Math.random() * images.length)]) : null
  const thumbnailBuffer = randomImage ? fs.readFileSync(randomImage) : null

  try {
    await stars.sendMessage(
      m.chat,
      {
        text: responseMessage,
        mentions: [...new Set((responseMessage.match(/@(\d{5,16})/g) || []).map(v => v.replace('@', '') + '@s.whatsapp.net'))],
        contextInfo: {
          externalAdReply: {
            title: "˚₊·—̳͟͞͞✞ Active Subbots",
            body: "Subbots in real-time",
            mediaType: 1,
            renderLargerThumbnail: false, 
            sourceUrl: "https://www.instagram.com/_carlitos.zx",
            thumbnail: thumbnailBuffer
          }
        }
      },
      { quoted: m }
    )
  } catch (e) {
    console.error('❌ Error sending subbot list:', e)
    await stars.sendMessage(m.chat, { text: responseMessage }, { quoted: m })
  }
}

handler.command = ['listjadibot', 'bots']
handler.help = ['bots']
handler.tags = ['jadibot']
export default handler
