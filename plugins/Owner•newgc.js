let handler = async (m, { conn, text }) => {
if (!text) return m.reply('🚩 Enter a name for the group.')
try{
m.reply('🚩 *Creating group*')
let group = await conn.groupCreate(text, [m.sender])
let link = await conn.groupInviteCode(group.gid)
m.reply('https://chat.whatsapp.com/' + url)
} catch (e) {
m.reply(`🚩 An error occurred.`)
}
}
handler.help = ['grupocrear <nombre>']
handler.tags = ['owner']
handler.command = ['creargc', 'newgc', 'creargrupo', 'grupocrear']
handler.rowner = true
handler.register = true
export default handler
