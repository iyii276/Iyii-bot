const handler = async (m, { conn }) => {
  const texto = `
 _*IYII Bot *_ 🥷

\`\`\`Official Artist profile\`\`\`
https://audiomack.com/Iyii217

> 🌟 Leave your star it would help a lot :D

🔗 *Official Iyii website:* https://iyii.onrender.com
  `.trim()

  await conn.reply(m.chat, texto, m)
}

handler.help = ['script']
handler.tags = ['info']
handler.command = ['script']

export default handler
