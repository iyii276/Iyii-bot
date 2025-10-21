let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('⚠️ *Enter the @tag of a user.*')

    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) return m.reply('⚠️ *Enter the @tag of a user.*')

    let users = global.db.data.users
    if (!users[who]) users[who] = {}

    users[who].banned = true

    await conn.sendMessage(
        m.chat,
        {
            text: `⚠️ *User @${who.split('@')[0]} was successfully banned.*`,
            contextInfo: {
                forwardingScore: 200,
                isForwarded: false,
                mentionedJid: [who],
                externalAdReply: {
                    showAdAttribution: false,
                    title: `IYII Bot ☘︎`,
                    body: `✡︎ Dev • Iyiola Abifarin`,
                    mediaType: 2,
                    sourceUrl: global.redes || '',
                    thumbnail: global.icons || null
                }
            }
        },
        { quoted: m }
    )
}

handler.help = ['banuser <@tag>']
handler.command = ['banuser']
handler.tags = ['owner']
handler.rowner = true

export default handler
