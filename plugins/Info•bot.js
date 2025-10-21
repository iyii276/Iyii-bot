import fs from 'fs';

const handler = (m) => m;

handler.all = async function(m) {

    const chat = global.db.data.chats[m.chat];
    if (chat.isBaneed) return;

    const text = m.text.toLowerCase(); // simplifies comparisons

    // Keyword and response mapping
    const respuestas = {
        "bot": `🚩 Hello! I'm asta, how can I help you today?\n\n✰ Use *!menu* to see my commands.`,
        //"corin": `🚀 CorinPlus Hosting The plus you need!\n🚩 *Dash:* https://dash.corinplus.com\n🌱 *Panel:* https://ctrl.corinplus.com`, // commented as in your code
        "sexo": "*pervert* 🫣",
        "teta": "*you're so hot* 🥵",
        "tetas": "*you're so hot* 🥵",
        "bug": "*your mom we* 😹",
        "pene": "*you eat* 😹",
        "hola": "Hello! 😎",
        "adios": "See you later 👋",
        "amor": "How romantic! ❤️",
        "odio": "Calm down, breathe 😅",
        "jaja": "😂 glad you're laughing",
        "xd": "😆",
        "gato": "I love cats! 🐱",
        "perro": "Dogs are great! 🐶",
        "pizza": "Pizza time! 🍕",
        "hamburguesa": "🍔 delicious",
        "café": "☕ now I want some",
        "té": "🍵 healthy",
        "dinero": "💸 we all want it",
        "trabajo": "😓 cheer up, you can do it",
        "fiesta": "🎉 let's celebrate",
        "música": "🎵 what are you listening to?",
        "amor platónico": "💌 interesting...",
        "amor verdadero": "💖 good luck with that",
        "broma": "😂 I love to laugh",
        "chiste": "😆 tell me another one",
        "frío": "🥶 bundle up",
        "calor": "🥵 drink water",
        "lluvia": "🌧 I like the rain",
        "sol": "☀️ perfect for going out",
        "noche": "🌙 rest well",
        "día": "🌞 good day",
        "comida": "🍽 delicious",
        "videojuego": "🎮 let's play!",
        "película": "🍿 let's go to the movies",
        "serie": "📺 binge time!",
        "libro": "📚 good reading",
        "viaje": "✈️ where are we going?",
        "playa": "🏖 I love it",
        "montaña": "⛰ total adventure",
        "deporte": "⚽ let's move",
        "fútbol": "⚽ goal!",
        "basquet": "🏀 I score!",
        "amor secreto": "🤫 shh...",
        "amigo": "🤝 greetings!",
        "enemigo": "😬 careful...",
        "familia": "👨‍👩‍👧‍👦 very important",
        "fiesta loca": "🥳 careful!",
        "dinámico": "⚡ what energy",
        "relajado": "😌 that's fine",
        "trabajador": "💪 keep it up",
        "perezoso": "😴 haha"
    };

    // Search for matches
    for (let key in respuestas) {
        const regex = new RegExp(`^${key}$`, "i");
        if (regex.test(m.text)) {
            conn.reply(m.chat, respuestas[key], m, rcanal);
            return !0;
        }
    }

    return !0;
};

export default handler;
