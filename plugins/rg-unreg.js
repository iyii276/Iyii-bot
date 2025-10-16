let handler = async function (m, { conn }) {
  let user = global.db.data.users[m.sender]
  
  if (!user.registered) {
    return m.reply(`
⚠️ *SYSTEM ERROR*
🚫 You are not currently registered.
`)
  }

  user.registered = false
  m.reply(`
🗡️ *USER DELETED*
📁 Registration completely removed from the system...
⌛ Re-register using *.reg* if you wish.
`)
}

handler.help = ['unreg']
handler.tags = ['rg']
handler.command = ['unreg']
handler.register = true

export default handler
