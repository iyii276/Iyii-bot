// Respect credits xddddd (filthy rats)
import fetch from 'node-fetch';
import db from '../lib/database.js';

const img = 'https://files.catbox.moe/d3ynrg.jpg';

function obtenerRango(level) {
  if (level >= 100000) return '🌟 King Mage';
  if (level >= 70) return '👑 Royal Mage';
  if (level >= 50) return '⚔️ Squad Captain';
  if (level >= 40) return '🔮 High Mage';
  if (level >= 30) return '🥇 Golden Magic Knight';
  if (level >= 20) return '🥈 Silver Magic Knight';
  if (level >= 10) return '🥉 Bronze Magic Knight';
  if (level >= 5) return '🌱 Novice Mage';
  return '📘 Grimoire Apprentice';
}

let handler = async (m, { conn }) => {
  try {
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;

    if (who === conn.user.id) return m.react('✖️');

    if (!global.db.data.users[who]) {
      return m.reply(`📕 *This user's grimoire has not yet been registered in the Magic Kingdom.*`);
    }

    let user = global.db.data.users[who];
    let name = await conn.getName(who);
    let rangoMagico = obtenerRango(user.level || 0);

    let nombreParaMostrar = who === m.sender ? name : '@' + who.split('@')[0];

    let txt = `
𝙁𝙄𝙉𝘼𝙉𝘾𝙄𝘼𝙇 𝙂𝙍𝙄𝙈𝙊𝙄𝙍𝙀 👑
🧙‍♂️ ᴍᴀɢᴇ: ${nombreParaMostrar}
🪙 ᴄᴏɪɴs: *${(user.monedas || 0).toLocaleString()}*
📚 ᴀᴄᴄᴜᴍᴜʟᴀᴛᴇᴅ ᴇxᴘᴇʀɪᴇɴᴄᴇ: *${(user.exp || 0).toLocaleString()}*
📈 ᴍᴀɢɪᴄ ʟᴇᴠᴇʟ: *${(user.level || 0).toLocaleString()}*
🎖️ ᴍᴀɢɪᴄ ʀᴀɴᴋ: *${rangoMagico}*
🕰️ ᴅᴀᴛᴇ: *${new Date().toLocaleString('en-US')}*
📘━━━━━━━━━━━━━━━━📘`.trim();

    await conn.sendMessage(
      m.chat,
      {
        image: { url: img },
        caption: txt,
        mentions: [who]
      },
      { quoted: m }
    );
  } catch (e) {
    console.error(e);
    m.reply('❎ An error occurred while getting the grimoire.');
  }
};

handler.help = ['bank', 'banco'];
handler.tags = ['rpg'];
handler.command = ['bank', 'banco'];
handler.register = true;

export default handler;
