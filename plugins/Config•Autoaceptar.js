// Code created by The Carlos 👑 
// Do not remove credits 
let handler = m => m;

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
    if (!m.chat || !m.chat.endsWith('@g.us')) return false;

    let chat = global.db.data.chats[m.chat];
    if (!chat || !chat.autoAceptar) return false;

    if (isAdmin) return false;
    if (!isBotAdmin) return true;

    try {
        const pending = await conn.groupRequestParticipantsList(m.chat).catch(() => []);
        if (!Array.isArray(pending) || pending.length === 0) return false;

        const latinPrefix = '5'; // Country code prefix to filter (e.g., 5 = Mexico)

        const filtered = pending.filter(p =>
            p && typeof p.jid === 'string' &&
            p.jid.endsWith('@s.whatsapp.net') &&
            p.jid.split('@')[0].startsWith(latinPrefix)
        );

        for (const user of filtered) {
            await conn.groupRequestParticipantsUpdate(m.chat, [user.jid], 'approve');
            console.log(`Request approved: ${user.jid}`);
        }

        // Handles auto-approval when join requests trigger a specific event
        if (m.messageStubType === 172 && Array.isArray(m.messageStubParameters)) {
            for (const jid of m.messageStubParameters) {
                if (typeof jid === 'string' && jid.endsWith('@s.whatsapp.net') && jid.split('@')[0].startsWith(latinPrefix)) {
                    await conn.groupRequestParticipantsUpdate(m.chat, [jid], 'approve');
                    console.log(`Request approved by event: ${jid}`);
                }
            }
        }
    } catch (err) {
        console.error('Error approving requests:', err);
    }

    return false;
};

export default handler;
