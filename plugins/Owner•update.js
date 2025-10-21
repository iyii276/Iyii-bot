import { execSync } from 'child_process'
let handler = async (m, { conn, text }) => {

try {
await m.react(rwait)
if (conn.user.jid == conn.user.jid) {
let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''))
await conn.reply(m.chat, stdout.toString(), m, rcanal)
await m.react(done)}
} catch (e) {
await m.react(error)
await m.reply('🚩 There are local changes that conflict with Repository Updates. To update, reinstall the Bot or perform updates manually.')
}}

handler.help = ['update', 'actualizar']
handler.tags = ['owner']
handler.command = ['update', 'actualizar']
handler.rowner = true

export default handler
