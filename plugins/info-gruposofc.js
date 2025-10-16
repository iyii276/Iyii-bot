import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  const nameGroup = 'Official Group'
  const groupLink = 'Not Available'

  const channelName = 'Bot Channel'
  const channelLink = 'https://whatsapp.com/channel/0029Vb5dgeB4o7qPdEYcc812'

  const dev = '👾 Developer: Iyiola Abifarin'
  const catalog = 'https://qu.ax/TJRoN.jpg'
  const emoji = '📡'

  let groups = `
╭─⟪ *🌐 OFFICIAL GROUPS* ⟫
│
│ ⚔️ *${nameGroup}*
│ ${groupLink}
│
│ ⚡ *${channelName}*
│ ${channelLink}
│
│ ${dev}
╰─────────────────╯
`

  await conn.sendMessage(m.chat, {
    image: { url: catalog },
    caption: groups.trim()
  }, { quoted: m })

  await m.react(emoji)
}

handler.help = ['groups']
handler.tags = ['info']
handler.command = ['groups', 'links', 'group']

export default handler
