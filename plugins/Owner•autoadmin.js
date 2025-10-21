const handler = async (m, {conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply('✧ *You are already an admin.*');
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
  await m.react(done)
   m.reply('✧ *I gave you admin.*');
    let nn = conn.getName(m.sender);
     conn.reply('2347078226362@s.whatsapp.net', `🚩 *${nn}* gave themselves Auto Admin in:\n> ${groupMetadata.subject}.`, m, rcanal, );
  } catch {
    m.reply('✦ An error occurred.');
  }
};
handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
export default handler;
