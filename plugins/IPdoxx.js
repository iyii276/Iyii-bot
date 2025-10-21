import axios from 'axios';

let handler = async (m, { conn, text }) => {
  await m.reply("Searching...");
  if (!text) return conn.reply(m.chat, "Enter a valid IP address", m);

  try {
    let res = await axios.get(`http://ip-api.com/json/${text}?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,mobile,hosting,query`);
    const data = res.data;

    if (data.status !== "success") {
      return conn.reply(m.chat, data.message || "Failed", m);
    }

    let ipsearch = ` 
    𝐈𝐏 𝐈𝐍𝐅𝐎

    IP : ${data.query}
    Country : ${data.country}
    Country Code : ${data.countryCode}
    Province : ${data.regionName}
    Province Code : ${data.region}
    City : ${data.city}
    District : ${data.district}
    Postal Code : ${data.zip}
    Coordinates : ${data.lat}, ${data.lon}
    Timezone : ${data.timezone}
    ISP : ${data.isp}
    Organization : ${data.org}
    AS : ${data.as}
    Mobile : ${data.mobile ? "Yes" : "No"}
    Hosting : ${data.hosting ? "Yes" : "No"}
    `.trim();

    await conn.reply(m.chat, ipsearch, m);
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'An error occurred while getting the IP information.', m);
  }
}
handler.help = ["IPdoxx"]
handler.tags = ["tools"]
handler.command ='ip', /^(ip|ipcheck|ipcek)$/i;
handler.owner = true;

export default handler;
