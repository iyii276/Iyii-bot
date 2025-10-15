import fetch from 'node-fetch'

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(
    m.chat, 
    `🚩 *Please enter a GitHub repository name to search for.*\n\nExample: ${usedPrefix + command} black-clover-MD`, 
    m, 
    global.rcanal
  )

  try {
    await m.react(global.rwait)

    const res = await fetch(global.API('https://api.github.com', '/search/repositories', { q: text }))
    const json = await res.json()

    if (res.status !== 200) throw json

    let str = json.items.map((repo, index) => {
      return `
📦 *Result:* ${index + 1}
🔗 *URL:* ${repo.html_url}
👤 *Owner:* ${repo.owner.login}
📁 *Repo Name:* ${repo.name}
🗓️ *Created:* ${formatDate(repo.created_at)}
🛠️ *Updated:* ${formatDate(repo.updated_at)}
👁️ *Watchers:* ${repo.watchers}
🍴 *Forks:* ${repo.forks}
⭐ *Stars:* ${repo.stargazers_count}
🐞 *Open Issues:* ${repo.open_issues}
📝 *Description:* ${repo.description ? repo.description : 'No description available.'}
🔧 *Clone URL:* ${repo.clone_url}
      `.trim()
    }).join('\n\n─────────────────\n\n')

    let img = await (await fetch(json.items[0].owner.avatar_url)).buffer()

    await conn.sendMini(
      m.chat, 
      '📦 GITHUB REPOSITORY SEARCH 📦', 
      global.dev, 
      str, 
      img, 
      img, 
      global.redes, 
      global.estilo
    )

    await m.react(global.done)
  } catch (err) {
    await m.react(global.error)
    conn.reply(
      m.chat, 
      `⚠️ No results found for: *${text}*`, 
      m, 
      global.fake
    )
  }
}

handler.help = ['githubsearch']
handler.tags = ['search']
handler.command = ['githubsearch']
handler.register = true

export default handler

function formatDate(dateString, locale = 'en') {
  const d = new Date(dateString)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}
