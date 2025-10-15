import fetch from 'node-fetch'

var handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) 
    return conn.sendMessage(m.chat, { text: `🍟 *Enter the name of an anime*\n\nExample: ${usedPrefix + command} black clover` }, { quoted: m })

  let res = await fetch('https://api.jikan.moe/v4/manga?q=' + encodeURIComponent(text))
  if (!res.ok) 
    return conn.sendMessage(m.chat, { text: `🚩 *An error occurred*` }, { quoted: m })

  let json = await res.json()
  if (!json.data || !json.data[0]) 
    return conn.sendMessage(m.chat, { text: `🚩 *No information found for:* ${text}` }, { quoted: m })

  let manga = json.data[0]
  let author = manga.authors?.[0]?.name || 'Unknown'

  let animeInfo = `
🍟 Title: ${manga.title_japanese || manga.title}
🚩 Chapters: ${manga.chapters || 'N/A'}
💫 Type: ${manga.type || 'N/A'}
🗂 Status: ${manga.status || 'N/A'}
🗃 Volumes: ${manga.volumes || 'N/A'}
🌟 Favorites: ${manga.favorites || 'N/A'}
🧮 Score: ${manga.score || 'N/A'}
👥 Members: ${manga.members || 'N/A'}
🔗 URL: ${manga.url || 'N/A'}
👨‍🔬 Author: ${author}
📝 Background: ${manga.background || 'N/A'}
💬 Synopsis: ${manga.synopsis || 'N/A'}
  `.trim()

  await conn.sendMessage(m.chat, {
    image: { url: manga.images?.jpg?.image_url || manga.images?.jpg?.large_image_url },
    caption: '🚩 *A N I M E - I N F O* 🚩\n\n' + animeInfo
  }, { quoted: m })
}

handler.help = ['infoanime']
handler.tags = ['anime']
handler.command = ['infoanime', 'animeinfo']
handler.register = true
export default handler
