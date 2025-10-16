// code created by Iyiola Abifarin
// don’t forget to leave credits
let handler = async (m, { conn, text, usedPrefix, command }) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  const user = global.db.data.users[m.sender]

  if (user.registered === true) {
    return conn.sendMessage(m.chat, { text: `⚠️ You are already registered, warrior of the Kingdom.\n\nUse *${usedPrefix}profile* to view your grimoire.` }, { quoted: m })
  }

  const regex = /^([a-zA-ZÀ-ÿñÑ\s]+)\.(\d{1,2})$/i
  if (!regex.test(text)) {
    return conn.sendMessage(m.chat, {
      text: `⚠️ Incorrect format. Use:\n*${usedPrefix + command} Name.Age*\n\nExample:\n*${usedPrefix + command} Asta.18*`
    }, { quoted: m })
  }

  let [_, name, age] = text.match(regex)
  age = parseInt(age)

  if (age < 5 || age > 100) {
    return conn.sendMessage(m.chat, { text: `⚠️ Invalid age. It must be between 5 and 100 years.` }, { quoted: m })
  }

  // Random data
  const generos = ['Male', 'Female']
  const paises = ['Clover', 'Diamond', 'Spade', 'Heart']
  const afinidades = ['🔥 Fire', '💧 Water', '🌪️ Wind', '🌱 Earth', '⚡ Lightning', '🌑 Darkness', '🌞 Light']
  const gender = generos[Math.floor(Math.random() * generos.length)]
  const country = paises[Math.floor(Math.random() * paises.length)]
  const afinidad = afinidades[Math.floor(Math.random() * afinidades.length)]
  const nivelMagico = Math.floor(Math.random() * 10) + 1
  const grimorioColor = gender === 'Male' ? '📕 Crimson Grimoire' : '📘 Indigo Grimoire'

  // Save data
  user.name = name.trim()
  user.age = age
  user.gender = gender
  user.country = country
  user.registered = true
  user.regTime = +new Date()
  user.afinidad = afinidad
  user.nivelMagico = nivelMagico

  // ANIMATION
  const frases = [
    `📡 *Synchronizing your mana with the ancient grimoire...*`,
    `🕯️ *Detecting magical affinity...*`,
    `⚔️ *Grimoire bond established successfully!*`,
    `🗿 *Registration complete, ${name.toUpperCase()} of the ${country} Kingdom.*\n\n${grimorioColor}\n🌌 Affinity: ${afinidad}\n💠 Magic Level: ${nivelMagico}`
  ]

  const { key } = await conn.sendMessage(m.chat, { text: '🔄 Starting magical registration...' }, { quoted: m })
  for (let i = 0; i < frases.length; i++) {
    await delay(1500)
    await conn.sendMessage(m.chat, { text: frases[i], edit: key })
  }
}

handler.command = ['registrarme', 'registrar', 'reg']
export default handler
