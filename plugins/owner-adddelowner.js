const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const why = `${emoji} Please mention a user to add or remove as owner.`;
  const who = m.mentionedJid[0] 
    ? m.mentionedJid[0] 
    : m.quoted 
      ? m.quoted.sender 
      : text 
        ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' 
        : false;

  if (!who) return conn.reply(m.chat, why, m, { mentions: [m.sender] });

  switch (command) {
    case 'addowner':
      const nuevoNumero = who;
      global.owner.push([nuevoNumero]);
      await conn.reply(m.chat, `${emoji} Done! The user has been added to the owner list.`, m);
      break;
      
    case 'delowner':
      const numeroAEliminar = who;
      const index = global.owner.findIndex(owner => owner[0] === numeroAEliminar);
      if (index !== -1) {
        global.owner.splice(index, 1);
        await conn.reply(m.chat, `${emoji2} The number has been successfully removed from the owner list.`, m);
      } else {
        await conn.reply(m.chat, `${emoji2} The number is not in the owner list.`, m);
      }
      break;
  }
};

handler.command = ['addowner', 'delowner'];
handler.rowner = true;
export default handler;
