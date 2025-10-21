let handler = async (m, { isPrems, conn }) => {
  let img = 'https://files.catbox.moe/6u1gfe.jpg';
  let texto = `*☁️ _A U D I O S - M E N U_ ☁️*

° _Tunometecabrasaramambiche_.
° _Anonymous Is Looking For Me_.
° _They're Laughing At Me_.
° _This Is Going To Be Epic Bros_.
° _In Case Of An Investigation_.
° _Elmo Knows Where You Live_.
° _Diagnosed With Gay_.
° _This Is For You_.
° _Happy Birthday_.
° _Damn Teni_.
° _Do You Know Miguel_.
° _You Are Ugly_.
° _How Are You_.
° _Did I Trick You_.
° _Beautiful Black_.
° _Long Live The Newlyweds_.
° _You Are Under Arrest_.
° _Your Level Of Stupidity_.
° _Who Is Your Little Bot_.
° _Don't Say That Bros_.
° _Don't Make Me Use This_.
° _Don't Talk To Me_.
° _Don't Suck It_.
° _Nobody Asked You_.
° _Shitty Bot_.
° _You Faggot_.
° _Massive Mom_.
° _The Prayer_.
° _We Split It_.
° _Jesus Christ_.
° _Judicious_.
° _Chinese Homer_.
° _Sex Time_.
° _Moans_.
° _Gaspi And The Girl_.
° _Gaspi Phrase_.
° _Perverted Goku_.
° _Fine Gentlemen_.
° _Merry Christmas_.
° _The Pepe_.
° _The Toxic_.
° _Cut Cut_.
° _Switch To Movistar_.
° _Good Night_.
° _Well Yes_.
° _Good Morning_.
° _Welcome Dude_.
° _Well Thought Woody_.
° _Banned_.
° _Based_.
° _Ara Ara_.
° _Among Us_.
° _Nobody Cares_.
° _Hentai Audio_.
° _Hold On_.
° _OMG_.
° _Onichan_.
° _Orale_.
° _Send Pack_.
° _Pikachu_.
° _Pokemon_.
° _Potassium_.
° _Rawr_.
° _Siuuu_.
° _Takataka_.
° _Fool_.
° _I Love You_.
° _TKA_.
° _A Duck_.
° _WTF_.
° _Yamete_.
° _Whatever_.
° _Yoshi_.
° _ZZZZ_.
° _Baby_.
° _Shut Up BTS Fan_.
° _Joke_.
° _Context_.
° _You Screwed Up_.
° _Delivery_.
° _Where Is It_.
° _Angry_.
° _Entrance_.
° _It's Friday_.
° _I'm Sad_.
° _Holiday_.
° _Freefire_.
° _Talk To Me_.
° _Hey_.
° _In Your Area_.
° _Fuck_.
° _I Forgot_.
° _My Coconuts Itch_.
° _I'm Leaving_.
° _Mmmm_.
° _XDS Moment_.
° _Motivation_.
° _Nico Nico_.
° _Don't Be Mad_.
° _Don't Break Anymore_.
° _What's Up_.
° _It Broke_.
° _Awesome Song_.
° _I Have The Underwear_.
° _Bring Him A Skirt_.
° _A Question_.
° _Go To Hell_.
° _:V_.`;

  // Simulated contact
  const fkontak = {
    key: {
      participants: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'Halo',
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
    participant: '0@s.whatsapp.net',
  };

  await conn.sendMessage(m.chat, {
    image: { url: img },
    caption: texto,
    contextInfo: { mentionedJid: [m.sender] },
  }, { quoted: fkontak });

  global.db.data.users[m.sender].lastcofre = new Date() * 1;
};

handler.help = ['menu2'];
handler.tags = ['main'];
handler.command = ['menu2', 'menuaudios'];

export default handler;
