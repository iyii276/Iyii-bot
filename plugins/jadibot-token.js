import fs from 'fs'

async function handler(m, {usedPrefix}) {

const user = m.sender.split('@')[0]
if (fs.existsSync(`./${jadi}/` + user + '/creds.json')) {
let token = Buffer.from(fs.readFileSync(`./${jadi}/` + user + '/creds.json'), 'utf-8').toString('base64')    

await conn.reply(m.chat, `🍄 *The token allows you to log in to other bots, we recommend not sharing it with anyone*\n\nYour token is:`, m, rcanal)
await conn.reply(m.chat, token, m, fake)
} else {
await conn.reply(m.chat, `🚩 *You don't have any active token, use !jadibot to create one*`, m, fake)
}

}
handler.help = ['token', 'gettoken', 'serbottoken']
handler.command = ['token', 'gettoken', 'serbottoken']
handler.tags = ['jadibot']

handler.private = true
handler.register = true

export default handler
