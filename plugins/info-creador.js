import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  let ownerNumber = '2347078226362' // Owner
  let bio = (await conn.fetchStatus(ownerNumber + '@s.whatsapp.net').catch(_ => {}))?.status || 'Owner of the Black Clover system'
  let biobot = (await conn.fetchStatus(conn.user.jid).catch(_ => {}))?.status || 'Official *IYII* Bot'

  await sendContactArray(conn, m.chat, [
    [`${ownerNumber}`, `🥷🏻 Owner`, `*IYIOLA ABIFARIN*`, 'Developer', 'greysmoke217@gmail.com', `CDMX`, `${global.yt}`, bio],
    [`${conn.user.jid.split('@')[0]}`, `*IYII* Bot 🤖`, `${packname}`, `📵 No Spamming`, 'support@email.com', `CDMX`, md, biobot],
    [`2347078226362`, `Clover Assistant`, `Bot Helper`, 'Support', 'greysmoke217@gmail.com', `CDMX`, md, biobot]
  ], m)

  throw false
}

handler.help = ["creator", "owner"]
handler.tags = ["info"]
handler.command = ['owner', 'creator']
export default handler

async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
  let contacts = []

  for (let [number, name, org, label, email, region, url, note] of data) {
    number = number.replace(/[^0-9]/g, '')
    
    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:${name.replace(/\n/g, '\\n')};;;;
FN:${name.replace(/\n/g, '\\n')}
ORG:${org}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
EMAIL;type=INTERNET:${email}
ADR:;;${region};;;;
URL:${url}
NOTE:${note}
END:VCARD`.trim()
    
    contacts.push({ vcard, displayName: name })
  }

  return await conn.sendMessage(
    jid,
    {
      contacts: {
        displayName: (contacts.length > 1 ? `${contacts.length} contacts` : contacts[0].displayName) || null,
        contacts,
      }
    },
    {
      quoted,
      ...options
    }
  )
}
