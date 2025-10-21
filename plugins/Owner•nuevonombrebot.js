let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `🚩 *What Name Do You Want To Give Me?*`, m, rcanal)
  try {
    await conn.updateProfileName(text)
    return conn.reply(m.chat, '✅️ *Name Changed Successfully*', m, rcanal)
   await m.react(done)
  } catch (e) {
    console.log(e)
    await m.react(error)
    return conn.reply(m.chat, `🚩 An Error Occurred!`, m, fake)
  }
}
handler.help = ['nuevonombrebot <teks>']
handler.tags = ['owner']
handler.command = ['nuevonombrebot', 'setbotname', 'namebot']

handler.owner = true
export default handler
