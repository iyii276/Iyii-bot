import fs from "fs"
import path from "path"

let handler = async (m, { conn }) => {
  if (!global.owner.some(([number]) => number == m.sender.split('@')[0])) {
    return conn.reply(m.chat, '⚠️ This command can only be used by the *Owner*.', m)
  }

  const baseDir = path.join(__dirname, 'núcleo•clover', 'blackJadiBot')
  if (!fs.existsSync(baseDir)) {
    return conn.reply(m.chat, '📂 The *blackJadiBot* folder was not found.', m)
  }

  let deleted = []
  let skipped = []

  const folders = fs.readdirSync(baseDir)
  for (let folder of folders) {
    const fullPath = path.join(baseDir, folder)

    if (fs.statSync(fullPath).isDirectory()) {
      let stillActive = global.conns.some(sock => {
        let jid = sock.authState?.creds?.me?.jid || ""
        return jid.includes(folder)
      })

      if (!stillActive) {
        fs.rmSync(fullPath, { recursive: true, force: true })
        deleted.push(folder)
      } else {
        skipped.push(folder)
      }
    }
  }

  let msg = `🧹 *Sub-Bots Cleanup*\n\n`
  msg += `✅ Deleted: ${deleted.length ? deleted.join(', ') : 'None'}\n`
  msg += `⏳ Active: ${skipped.length ? skipped.join(', ') : 'None'}`

  await conn.reply(m.chat, msg, m)
}

handler.help = ['clearsubs']
handler.tags = ['owner']
handler.command = ['clearsubs']
handler.rowner = true  

export default handler
