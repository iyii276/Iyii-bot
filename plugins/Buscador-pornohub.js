//Code credits DanielDiod 

import cheerio from 'cheerio';
import axios from 'axios';

let handler = async (m, { conn, args, command, usedPrefix }) => {
   if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('[❗] +18 commands are disabled in this group.\n> If you are an admin and wish to enable them, use .enable nsfw');
    }

  if (!args[0]) {
    return conn.reply(m.chat, `🍭 Please enter the search you want to perform on Pornhub.\nExample: ${usedPrefix + command} with my cousin`, m);
  }

  try {
    let searchResults = await searchPornhub(args[0]);
    let teks = searchResults.result.map((v, i) => 
      `『 *P O R N H U B  -  S E A R C H* 』
🎞️ *Title:* ${v.title}
🕒 *Duration:* ${v.duration}
👀 *Views:* ${v.views}
🔗 *Link:* ${v.url}
---------------------------------------------------\n`).join('\n\n');

    if (searchResults.result.length === 0) {
      teks = '🍭 No results found...';
    }

    conn.reply(m.chat, teks, m);
  } catch (e) {
    return conn.reply(m.chat, `⚠️ An error occurred: ${e.message}`, m);
  }
};

handler.tags = ['search']; 
handler.help = ['pornhubsearch']; 
handler.command = ['phsearch', 'pornhubsearch'];
export default handler;

async function searchPornhub(search) {
  try {
    const response = await axios.get(`https://www.pornhub.com/video/search?search=${search}`);
    const html = response.data;
    const $ = cheerio.load(html);
    const result = [];

    $('ul#videoSearchResult > li.pcVideoListItem').each(function(a, b) {
      const _title = $(b).find('a').attr('title');
      const _duration = $(b).find('var.duration').text().trim();
      const _views = $(b).find('var.views').text().trim();
      const _url = 'https://www.pornhub.com' + $(b).find('a').attr('href');
      const hasil = { title: _title, duration: _duration, views: _views, url: _url };
      result.push(hasil);
    });

    return { result };
  } catch (error) {
    console.error('⚠️ An error occurred while searching on Pornhub:', error);
    return { result: [] };
  }
}
