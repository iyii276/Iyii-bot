//code created by The Carlos 👑
//don't forget to leave credits 

import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

const imagen1 = 'https://files.catbox.moe/7sc3os.jpg'

var handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? conn.user.jid
    : m.sender

  let pp
  try {
    pp = await conn.profilePictureUrl(who, 'image')
  } catch {
    pp = imagen1
  }

  let user = global.db.data.users[m.sender]
  if (!user) {
    global.db.data.users[m.sender] = {
      premium: false,
      level: 0,
      cookies: 0,
      exp: 0,
      lastclaim: 0,
      registered: false,
      regTime: -1,
      age: 0,
      role: '⭑ Novice ⭑'
    }
    user = global.db.data.users[m.sender]
  }

  let { premium, level, exp, registered, role } = user
  let username = await conn.getName(who)

  let animacion = `
〘 *Magic System* 〙📖

🔒 Detecting magical energy...
⏳ Analyzing bearer's grimoire...
💠 Synchronizing with mana...

✨✨✨ 𝙰𝙲𝚃𝙸𝚅𝙰𝚃𝙸𝙾𝙽 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴 ✨✨✨

*The grimoire has opened...*
`.trim()

  await conn.sendMessage(m.chat, { text: animacion }, { quoted: m })

  let noprem = `
『 ＢＡＳＩＣ ＧＲＩＭＯＩＲＥ 』📕

⚔️ *Bearer:* ${username}
🆔 *Identifier:* @${who.replace(/@.+/, '')}
📜 *Registered:* ${registered ? '✅ Activated' : '❌ No'}

🧪 *Magic Status:*
⚡ *Level:* ${level}
✨ *Experience:* ${exp}
📈 *Rank:* ${role}
🔮 *Premium:* ❌ Not active

📔 *Grimoire:* Basic 1-page 📘
🔒 *Element:* Unknown

📌 Upgrade your grimoire to unlock more magic...

━━━━━━━━━━━━━━━━━━
`.trim()

  let prem = `
👹〘 𝐃𝐄𝐌𝐎𝐍 𝐌𝐎𝐃𝐄: *𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃* 〙👹

🌌 ＧＲＩＭＯＩＲＥ ５ＬＴ（Ａ』

🧛 *Elite Bearer:* ${username}
🧿 *ID:* @${who.replace(/@.+/, '')}
✅ *Registered:* ${registered ? 'Yes' : 'No'}
👑 *Rank:* 🟣 *Supreme Demonic*

🔮 *Dark Energy:*
⚡ *Level:* ${level}
🌟 *Experience:* ${exp}
🪄 *Magic Rank:* ${role}
💠 *Premium Status:* ✅ ACTIVATED

📕 *Grimoire:* ☯️ Anti-Magic 5-page
🔥 *Special Mode:* ✦ *Asta's Dark Awakening*
🧩 *Element:* Anti-Magic & Demon Sword

📜 *Unlocked Spell:* 
❖ 「Iyii inc ⚡」
   ↳ Massive damage to enemy bots.

📔 *Note:* This user has surpassed their limits... ☄️

🌌⟣══════════════⟢🌌
`.trim()

  await conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: premium ? prem : noprem,
    mentions: [who]
  }, { quoted: m })
}

handler.help = ['profile']
handler.register = true
handler.group = true
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler
