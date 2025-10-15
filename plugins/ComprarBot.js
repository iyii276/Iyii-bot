const handler = async (m, {conn}) => {
  m.reply(global.ComprarBot);
};
handler.command ='comprarbot',/^(ComprarBot|Comprar|comprar|ComprarBot)$/i;
export default handler;

global.ComprarBot = `
〔 *IYII bot* 〕

*BOT PARA GRUPO* :
> wa.me/2347078226362

*BOT PERZONALIZADO* :
> wa.me/2347078226362
`;
