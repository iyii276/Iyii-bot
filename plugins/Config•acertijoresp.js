import similarity from 'similarity';
const threshold = 0.72;
const RIDDLE_PREFIX = 'ⷮ';

const handler = (m) => m;

handler.before = async function(m) {
  const id = m.chat;
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !new RegExp(`^${RIDDLE_PREFIX}`, 'i').test(m.quoted.text)) return !0;

  this.tekateki = this.tekateki || {};
  if (!(id in this.tekateki)) return m.reply('⚠️ *System:* The riddle has already expired or was solved.');

  if (m.quoted.id == this.tekateki[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.tekateki[id][1]));

    // Ensure the user exists in the database
    global.db.data.users[m.sender] = global.db.data.users[m.sender] || { monedas: 0 };

    if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
      global.db.data.users[m.sender].monedas += this.tekateki[id][2];
      m.reply(`🧠✅ *Correct answer, executor!* +${this.tekateki[id][2]} 🪙 *System Coins*`);
      clearTimeout(this.tekateki[id][3]);
      delete this.tekateki[id];
    } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) {
      m.reply(`🤏 *Almost there, hacker... you're close to the core!*`);
    } else {
      m.reply('❌ *Wrong answer. Try again, don’t give up.*');
    }
  }

  return !0;
};

handler.exp = 0;
export default handler;
