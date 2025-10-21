let handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender]
  const owners = global.owner.map(([id]) => id)
  const esReyMago = owners.includes(m.sender)
  const tituloEspecial = esReyMago ? '👑 *SUPREME MAGIC KING* 👑\n' : ''

  const texto = `
╭━━━[ 🧙‍♂️ *MAGIC RPG MENU* ]━━━╮
┃ 🎮 *Adventure Commands:*
┃ ⛏️ .minar → Mine minerals and earn coins
┃ 🎁 .daily → Claim your daily treasure
┃ ❓ .acertijo → Solve riddles and earn rewards
┃ 🗡️ .robar2 @user → Try to loot another mage
┃ 🛒 .comprar <name> → Buy a character for your collection
┃ 📜 .mispersonajes → Check your magical heroes
┃ 🔮 .pjs → List of available characters
┃ 💼 .banco → Check your magical savings
┃ 💸 .enviar @user <amount> → Send coins to an ally
┃ ⚔️ .duelo → Challenge another player in combat
┃ 🩸 .sacrificar → Sacrifice for dark power
┃ 🎲 .cajamisteriosa → Open a box with surprises
┃ 🏆 .toppersonajes → Top collectors ranking
┃ 🧟 .invasionzombie → Defend the kingdom from the undead
┃ 🏹 .cazar → Hunt beasts and earn rewards
┃ 👑 .reinado → Fight for the magical throne
┃ ⚡ .cambiarexp → Exchange your exp for coins
┃ 💰 .mismonedas → Check how many coins you have
┃ 🔨 .trabajar → Work and earn coins with effort
┃ 💀 .invocacion → Summon a mysterious character
┃ 🛡️ .antirobo → Protect your waifus from thieves
┃ ➕ .math <difficulty> → Challenge your mind with math
┃ 💘 .rw → Buy new waifus
┃ 🎁 .c → Claim your free waifu
┃ 💖 .miswaifus → Check your waifu collection
┃ 🔓 .desbloquear → Unlock your base for a few minutes
┃ 🫶 .robarwaifu → Try to steal waifus from others
┃ 📖 .listawaifus → Discover all available waifus
┃ 🥇 .topwaifus → See who has the most valuable waifus
╰━━━━━━━━━━━━━━━━━━━━⬯

╭━━━[ 📊 *YOUR STATUS* ]━━━╮
┃ 🧪 Magic Level: *${user.level || 0}*
┃ ✨ Experience: *${user.exp || 0}*
┃ 💰 Coins: *${(user.monedas || 0).toLocaleString()} 🪙*
╰━━━━━━━━━━━━━━━━━━━━⬯

${tituloEspecial}
🌟 *Keep growing, adventurer*. The magical world awaits your feats!
💡 Use the commands wisely and achieve supreme glory.
`.trim()

  const url = 'https://files.catbox.moe/mfkwj2.jpg'

  await conn.sendMessage(m.chat, {
    image: { url },
    caption: texto
  }, { quoted: m })
}

handler.help = ['menurpg']
handler.tags = ['rpg']
handler.command = ['menurpg', 'rpgmenu', 'menur']
handler.register = true

export default handler
