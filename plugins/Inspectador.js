// Code adapted by https://github.com/GataNina-Li
// Code compatible with WhatsApp channels and communities 
// You will also find code for commands focused on WhatsApp channels

import { getUrlFromDirectPath } from "@whiskeysockets/baileys"
import _ from "lodash"
import axios from 'axios' 

let handler = async (m, { conn, command, usedPrefix, args, text, groupMetadata, isOwner, isROwner }) => {
const isCommand1 = /^(inspect|inspeccionar)\b$/i.test(command)
const isCommand2 = /^(seguircanal)\b$/i.test(command)
const isCommand3 = /^(noseguircanal)\b$/i.test(command)
const isCommand4 = /^(silenciarcanal)\b$/i.test(command)
const isCommand5 = /^(nosilenciarcanal)\b$/i.test(command)
const isCommand6 = /^(nuevafotochannel)\b$/i.test(command)
const isCommand7 = /^(eliminarfotochannel)\b$/i.test(command)
const isCommand8 = /^(avisoschannel|resiviravisos)\b$/i.test(command)
const isCommand9 = /^(reactioneschannel|reaccioneschannel)\b$/i.test(command)
const isCommand10 = /^(nuevonombrecanal)\b$/i.test(command)
const isCommand11 = /^(nuevadescchannel)\b$/i.test(command)

const channelUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:channel\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1]
let txtBotAdminCh = '\n\n> *Verify that the Bot is admin in the channel, otherwise the command will not work*'

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
async function reportError(e) {
await m.reply(`✨️ An error occurred.`)
console.log(e)
}
let thumb = icons
let pp, ch, q, mime, buffer, media, inviteUrlch, imageBuffer

switch (true) {     
case isCommand1:
let inviteCode
if (!text) return await conn.reply(m.chat, `🚩 Enter the group/community or channel link.`, m, rcanal)
const MetadataGroupInfo = async (res, isInviteInfo = false) => {
let nameCommunity = "does not belong to any Community"
let groupPicture = "Could not be obtained"

if (res.linkedParent) {
let linkedGroupMeta = await conn.groupMetadata(res.linkedParent).catch(e => { return null })
nameCommunity = linkedGroupMeta ? "\n" + ("`Name:` " + linkedGroupMeta.subject || "") : nameCommunity
}
pp = await conn.profilePictureUrl(res.id, 'image').catch(e => { return null })
inviteCode = await conn.groupInviteCode(m.chat).catch(e => { return null })
const formatParticipants = (participants) =>
participants && participants.length > 0
? participants.map((user, i) => `${i + 1}. @${user.id?.split("@")[0]}${user.admin === "superadmin" ? " (superadmin)" : user.admin === "admin" ? " (admin)" : ""}`).join("\n")
: "Not found"
let caption = `🆔 *Group Identifier:*\n${res.id || "Not found"}\n\n` +
`👑 *Created by:*\n${res.owner ? `@${res.owner?.split("@")[0]}` : "Not found"} ${res.creation ? `on ${formatDate(res.creation)}` : "(Date not found)"}\n\n` +
`🏷️ *Name:*\n${res.subject || "Not found"}\n\n` +
`✏️ *Name changed by:*\n${res.subjectOwner ? `@${res.subjectOwner?.split("@")[0]}` : "Not found"} ${res.subjectTime ? `on ${formatDate(res.subjectTime)}` : "(Date not found)"}\n\n` +
`📄 *Description:*\n${res.desc || "Not found"}\n\n` +
`📝 *Description changed by:*\n${res.descOwner ? `@${res.descOwner?.split("@")[0]}` : "Not found"}\n\n` +
`🗃️ *Description ID:*\n${res.descId || "Not found"}\n\n` +
`🖼️ *Group Image:*\n${pp ? pp : groupPicture}\n\n` +
`💫 *Author:*\n${res.author || "Not found"}\n\n` +
`🎫 *Invitation Code:*\n${res.inviteCode || inviteCode || "Not available"}\n\n` +
`⌛ *Duration:*\n${res.ephemeralDuration !== undefined ? `${res.ephemeralDuration} seconds` : "Unknown"}\n\n` +
`🛃 *Admins:*\n` + (res.participants && res.participants.length > 0 ? res.participants.filter(user => user.admin === "admin" || user.admin === "superadmin").map((user, i) => `${i + 1}. @${user.id?.split("@")[0]}${user.admin === "superadmin" ? " (superadmin)" : " (admin)"}`).join("\n") : "Not found") + `\n\n` +
`🔰 *Total Users:*\n${res.size || "Quantity not found"}\n\n` +
`✨ *Advanced Information* ✨\n\n🔎 *Community linked to the group:*\n${res.isCommunity ? "This group is an announcement chat" : `${res.linkedParent ? "`Id:` " + res.linkedParent : "This group"} ${nameCommunity}`}\n\n` +
`⚠️ *Restrictions:* ${res.restrict ? "✅" : "❌"}\n` +
`📢 *Announcements:* ${res.announce ? "✅" : "❌"}\n` +
`🏘️ *Is community?:* ${res.isCommunity ? "✅" : "❌"}\n` +
`📯 *Is community announcement?:* ${res.isCommunityAnnounce ? "✅" : "❌"}\n` +
`🤝 *Has member approval:* ${res.joinApprovalMode ? "✅" : "❌"}\n` +
`🆕 *Can Add future members:* ${res.memberAddMode ? "✅" : "❌"}\n\n` 
return caption.trim()
}

const inviteGroupInfo = async (groupData) => {
const { id, subject, subjectOwner, subjectTime, size, creation, owner, desc, descId, linkedParent, restrict, announce, isCommunity, isCommunityAnnounce, joinApprovalMode, memberAddMode, ephemeralDuration } = groupData
let nameCommunity = "does not belong to any Community"
let groupPicture = "Could not be obtained"
if (linkedParent) {
let linkedGroupMeta = await conn.groupMetadata(linkedParent).catch(e => { return null })
nameCommunity = linkedGroupMeta ? "\n" + ("`Name:` " + linkedGroupMeta.subject || "") : nameCommunity
}
pp = await conn.profilePictureUrl(id, 'image').catch(e => { return null })
const formatParticipants = (participants) =>
participants && participants.length > 0
? participants.map((user, i) => `${i + 1}. @${user.id?.split("@")[0]}${user.admin === "superadmin" ? " (superadmin)" : user.admin === "admin" ? " (admin)" : ""}`).join("\n")
: "Not found"

let caption = `🆔 *Group Identifier:*\n${id || "Not found"}\n\n` +
`👑 *Created by:*\n${owner ? `@${owner?.split("@")[0]}` : "Not found"} ${creation ? `on ${formatDate(creation)}` : "(Date not found)"}\n\n` +
`🏷️ *Name:*\n${subject || "Not found"}\n\n` +
`✏️ *Name changed by:*\n${subjectOwner ? `@${subjectOwner?.split("@")[0]}` : "Not found"} ${subjectTime ? `on ${formatDate(subjectTime)}` : "(Date not found)"}\n\n` +
`📄 *Description:*\n${desc || "Not found"}\n\n` +
`💠 *Description ID:*\n${descId || "Not found"}\n\n` +
`🖼️ *Group Image:*\n${pp ? pp : groupPicture}\n\n` +
`🏆 *Featured Members:*\n${formatParticipants(groupData.participants)}\n\n` +
`👥 *Total Featured:*\n${size || "Quantity not found"}\n\n` +
`✨ *Advanced Information* ✨\n\n🔎 *Community linked to the group:*\n${isCommunity ? "This group is an announcement chat" : `${linkedParent ? "`Id:` " + linkedParent : "This group"} ${nameCommunity}`}\n\n` +
`📢 *Announcements:* ${announce ? "✅ Yes" : "❌ No"}\n` +
`🏘️ *Is community?:* ${isCommunity ? "✅ Yes" : "❌ No"}\n` +
`📯 *Is community announcement?:* ${isCommunityAnnounce ? "✅" : "❌"}\n` +
`🤝 *Has member approval:* ${joinApprovalMode ? "✅" : "❌"}\n`
return caption.trim()
}

let info
try {
let res = text ? null : await conn.groupMetadata(m.chat)
info = await MetadataGroupInfo(res) // If the bot is in the group
console.log('Metadata method')
} catch {
const inviteUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:invite\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1]
//if (!inviteUrl &&) return await conn.reply(m.chat, "*Verify that it is a WhatsApp group or community link.*", m)
let inviteInfo
if (inviteUrl) {
try {
inviteInfo = await conn.groupGetInviteInfo(inviteUrl)
info = await inviteGroupInfo(inviteInfo) // For any group/community link
console.log(info)
console.log('🌸 Link method')    
} catch (e) {
m.reply('🌵 Group not found')
return
}}}
if (info) {
await conn.sendMessage(m.chat, { text: info, contextInfo: {
mentionedJid: conn.parseMention(info),
externalAdReply: {
title: "🐢 Group Inspector",
body: "🍃 Super Inspector!",
thumbnailUrl: pp ? pp : thumb,
sourceUrl: args[0] ? args[0] : inviteCode ? `https://chat.whatsapp.com/${inviteCode}` : md,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: fkontak })
} else {
// Handle channel links
let newsletterInfo
if (!channelUrl) return await conn.reply(m.chat, "🚩 Verify that it is a WhatsApp channel link.", m, rcanal)
if (channelUrl) {
try {
newsletterInfo = await conn.newsletterMetadata("invite", channelUrl).catch(e => { return null })
if (!newsletterInfo) return await conn.reply(m.chat, "🚩 No channel information found. Verify that the link is correct.", m, rcanal)       
let caption = "*Channel Link Inspector*\n\n" + processObject(newsletterInfo, "", newsletterInfo?.preview)
if (newsletterInfo?.preview) {
pp = getUrlFromDirectPath(newsletterInfo.preview)
} else {
pp = thumb
}
if (channelUrl && newsletterInfo) {
await conn.sendMessage(m.chat, { text: caption, contextInfo: {
mentionedJid: conn.parseMention(caption),
externalAdReply: {
title: "🐢 Channel Inspector",
body: "🍃 Super Inspector!",
thumbnailUrl: pp,
sourceUrl: args[0],
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: fkontak })}
newsletterInfo.id ? conn.sendMessage(m.chat, { text: newsletterInfo.id }, { quoted: null }) : ''
} catch (e) {
reportError(e)
}}}
break

// Follow a WhatsApp channel 
case isCommand2:
if (!isOwner || !isROwner) return await conn.reply(m.chat, `🚩 You do not have permission to use this command.`, m, fake)
ch
if (!text) return await conn.reply(m.chat, `🚩 Enter the ID or link of a WhatsApp channel you want the bot to follow.\n\nYou can get the ID using the command:\n${usedPrefix}superinspect link${txtBotAdminCh}`, m, rcanal)
if (text.includes("@newsletter")) {
ch = text
} else {
ch = await conn.newsletterMetadata("invite", channelUrl).then(data => data.id).catch(e => null)
}       
try {
const chtitle = await conn.newsletterMetadata(text.includes("@newsletter") ? "jid" : "invite", text.includes("@newsletter") ? ch : channelUrl).then(data => data.name).catch(e => null)
await conn.newsletterFollow(ch)
await conn.reply(m.chat, `🚩 The bot has started following the channel *${chtitle}*.`, m, rcanal) 
} catch (e) {
reportError(e)
}
break

// Unfollow a WhatsApp channel 
case isCommand3:
if (!isOwner || !isROwner) return await conn.reply(m.chat, `🚩 You do not have permission to use this command.`, m, fake)
ch
if (!text) return await conn.reply(m.chat, `🚩 Enter the ID or link of a WhatsApp channel you want the bot to unfollow.\n\nYou can get the ID using the command:\n${usedPrefix}superinspect link${txtBotAdminCh}`, m, rcanal)
if (text.includes("@newsletter")) {
ch = text
} else {
ch = await conn.newsletterMetadata("invite", channelUrl).then(data => data.id).catch(e => null)
}       
try {
const chtitle = await conn.newsletterMetadata(text.includes("@newsletter") ? "jid" : "invite", text.includes("@newsletter") ? ch : channelUrl).then(data => data.name).catch(e => null)
await conn.newsletterUnfollow(ch)
await conn.reply(m.chat, `🚩 The bot has stopped following the channel *${chtitle}*.`, m, rcanal) 
} catch (e) {
reportError(e)
}
break

// Mute a WhatsApp channel 
case isCommand4:
if (!isOwner || !isROwner) return await conn.reply(m.chat, `🚩 You do not have permission to use this command.`, m, rcanal)
ch
if (!text) return await conn.reply(m.chat, `🚩 Enter the ID or link of a WhatsApp channel you want the bot to mute updates for.\n\nYou can get the ID using the command:\n*${usedPrefix}superinspect link${txtBotAdminCh}`, m, rcanal)
if (text.includes("@newsletter")) {
ch = text
} else {
ch = await conn.newsletterMetadata("invite", channelUrl).then(data => data.id).catch(e => null)
}       
try {
const chtitle = await conn.newsletterMetadata(text.includes("@newsletter") ? "jid" : "invite", text.includes("@newsletter") ? ch : channelUrl).then(data => data.name).catch(e => null)
await conn.newsletterMute(ch)
await conn.reply(m.chat, `${packname} has successfully muted notifications for the channel *${chtitle}*.`, m, rcanal) 
} catch (e) {
reportError(e)
}
break

// Unmute a WhatsApp channel 
case isCommand5:
if (!isOwner || !isROwner) return await conn.reply(m.chat, `🚩 You do not have permission to use this command.`, m, rcanal)
ch
if (!text) return await conn.reply(m.chat, `🚩 Enter the ID or link of a WhatsApp channel you want the bot to activate updates for.\n\nYou can get the ID using the command:\n*${usedPrefix}superinspect* link${txtBotAdminCh}`, m, rcanal)
if (text.includes("@newsletter")) {
ch = text
} else {
ch = await conn.newsletterMetadata("invite", channelUrl).then(data => data.id).catch(e => null)
}       
try {
const chtitle = await conn.newsletterMetadata(text.includes("@newsletter") ? "jid" : "invite", text.includes("@newsletter") ? ch : channelUrl).then(data => data.name).catch(e => null)
await conn.newsletterUnmute(ch)
await conn.reply(m.chat, `${packname} has successfully unmuted notifications for the channel *${chtitle}*.`, m, rcanal) 
} catch (e) {
reportError(e)
}
break

// Modify channel image
case isCommand6:
if (!isOwner || !isROwner) return await conn.reply(m.chat, `🚩 You do not have permission to use this command.`, m, rcanal)
if (!text) return await conn.reply(m.chat, `🚩 Enter the ID or link of a WhatsApp channel by replying to a jpg/jpeg/png image or add an image link\n
Replying to an image
*${usedPrefix + command}* 12345@newsletter

*Adding image url*
*${usedPrefix + command}* 12345@newsletter https://example.com/image.jpg\n\nYou can get the ID using the command:\n*${usedPrefix}superinspect* link${txtBotAdminCh}`, m, rcanal)
const regex = /(\b\w+@newsletter\b)(?:.*?(https?:\/\/[^\s]+?\.(?:jpe?g|png)))?/i
const match = text.match(regex)
let match1 = match ? match[1] ? match[1] : null : null
let match2 = match ? match[2] ? match[2] : null : null
if (m.quoted) {
q = m.quoted ? m.quoted : m
mime = (q.msg || q).mimetype || q.mediaType || ''
if (/image/g.test(mime) && !/webp/g.test(mime)) {
media = await q.download()
} else {
return await conn.reply(m.chat, `*Reply to a jpg/png image.*`, m)
}} else { 
const imageUrlRegex = /(https?:\/\/[^\s]+?\.(?:jpe?g|png))/
if (!match2 && !text.match(imageUrlRegex)) return await conn.reply(m.chat, `*Add the jpg/png link after the channel ID.*`, m)
try {
const response = await axios.get(match2 ? match2 : text.match(imageUrlRegex), { responseType: 'arraybuffer' })
imageBuffer = Buffer.from(response.data, 'binary')
} catch (error) {
return await conn.reply(m.chat, `🐢 Error downloading the image from the provided URL.`, m, rcanal)
}
media = imageBuffer
}
if (text.includes("@newsletter")) {
if(!match1) return await conn.reply(m.chat, `🚩 Channel ID not found.`, m, rcanal)
ch = match1
} else {
ch = await conn.newsletterMetadata("invite", channelUrl).then(data => data.id).catch(e => null)
}       
try {
const chtitle = await conn.newsletterMetadata(text.includes("@newsletter") ? "jid" : "invite", text.includes("@newsletter") ? ch : channelUrl).then(data => data.name).catch(e => null)
await conn.newsletterUpdatePicture(ch, media)
// await conn.reply(m.chat, `🚩 The bot has successfully changed the image of the channel *${chtitle}*.`, m, rcanal) 
await conn.sendMessage(ch, { text: `🚩YaemoriBot has successfully changed the image of the channel *${chtitle}*.`, contextInfo: {
externalAdReply: {
title: "【 🔔 NOTIFICATION 🔔 】",
body: '✨️ New channel profile image.',
thumbnailUrl: pp,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
} catch (e) {
reportError(e)
}
break

// Delete channel image
case isCommand7:
if (!isOwner || !isROwner) return await conn.reply(m.chat, `🚩 You do not have permission to use this command.`, m, rcanal)
ch
if (!text) return await conn.reply(m.chat, `🚩 Enter the ID or link of a WhatsApp channel you want the bot to delete the image from.\n\nYou can get the ID using the command:\n${usedPrefix}superinspect link${txtBotAdminCh}`, m, rcanal)
if (text.includes("@newsletter")) {
ch = text
} else {
ch = await conn.newsletterMetadata("invite", channelUrl).then(data => data.id).catch(e => null)
}       
try {
const chtitle = await conn.newsletterMetadata(text.includes("@newsletter") ? "jid" : "invite", text.includes("@newsletter") ? ch : channelUrl).then(data => data.name).catch(e => null)
await conn.newsletterRemovePicture(ch)
//await conn.reply(m.chat, `🚩 The bot has successfully deleted the image of the channel *${chtitle}*.`, m, rcanal) 
await conn.sendMessage(ch, { text: `🚩 YaemoriBot has successfully deleted the image of the channel *${chtitle}*.`, contextInfo: {
externalAdReply: {
title: "【 🔔 NOTIFICATION 🔔 】",
body: '✨️ Image deleted.',
thumbnailUrl: pp,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
} catch (e) {
reportError(e)
}
break

// Receive real-time update notifications from the channel
case isCommand8:
if (!isOwner || !isROwner) return await conn.reply(m.chat, `🚩 You do not have permission to use this command.`, m, rcanal)
ch
if (!text) return await conn.reply(m.chat, `🚩 Enter the ID or link of a WhatsApp channel for the bot to receive real-time notifications.\n\nYou can get the ID using the command:\n*${usedPrefix}superinspect link${txtBotAdminCh}`, m, rcanal)
if (text.includes("@newsletter")) {
ch = text
} else {
ch = await conn.newsletterMetadata("invite", channelUrl).then(data => data.id).catch(e => null)
}       
try {
const chtitle = await conn.newsletterMetadata(text.includes("@newsletter") ? "jid" : "invite", text.includes("@newsletter") ? ch : channelUrl).then(data => data.name).catch(e => null)
await conn.subscribeNewsletterUpdates(ch)
await conn.reply(m.chat, `🚩 The bot will receive notifications from the channel *${chtitle}*`, m, rcanal) 
} catch (e) {
reportError(e)
}
break

// Set reaction mode in a WhatsApp channel 
case isCommand9:
if (!isOwner || !isROwner) return await conn.reply(m.chat, `🚩 You do not have permission to use this command.`, m, rcanal)
ch
if (!text) return await conn.reply(m.chat, `
🚩 Enter the ID or link of a WhatsApp channel followed by a space and the reaction mode option for the channel.

*Reaction Mode:*
> Use only the option number.

*Options:*
\`\`\`[1]\`\`\` Reaction with any emoji.
\`\`\`[2]\`\`\` Reaction with default emojis.
\`\`\`[3]\`\`\` No reaction.

*Usage Example:*
*${usedPrefix + command}* 12345@newsletter 1

You can get the ID using the command:\n*${usedPrefix}superinspect* link${txtBotAdminCh}`.trim(), m, rcanal)

const parts = text.split(' ')
const modeNumber = parseInt(parts.pop())
ch = parts.join(' ')

let mode
switch (modeNumber) {
case 1:
mode = 'ALL'
break
case 2:
mode = 'BASIC'
break
case 3:
mode = 'NONE'
break
default:
return await conn.reply(m.chat, `🚩 Invalid reaction mode.\n
*Reaction Mode:*
> Use only the option number.

*Options:*
\`\`\`[1]\`\`\` Reaction with any emoji.
\`\`\`[2]\`\`\` Reaction with default emojis.
\`\`\`[3]\`\`\` No reaction.

Usage Example:
*${usedPrefix + command}* 12345@newsletter 1`, m, rcanal)
}

if (ch.includes("@newsletter")) {
ch = ch.trim()
} else {
ch = await conn.newsletterMetadata("invite", ch).then(data => data.id).catch(e => null)
}

try {
const chtitle = await conn.newsletterMetadata(ch.includes("@newsletter") ? "jid" : "invite", ch.includes("@newsletter") ? ch : channelUrl).then(data => data.name).catch(e => null)
await conn.newsletterReactionMode(ch, mode)
//await conn.reply(m.chat, `🚩 The bot has set the reaction mode as \`"${mode}"\` for the channel *${chtitle}*`, m,  rcanal)
await conn.sendMessage(ch, { text: `🚩 YaemoriBot has set the reaction mode as \`"${mode}"\` for the channel *${chtitle}*`, contextInfo: {
externalAdReply: {
title: "【 🔔 NOTIFICATION 🔔 】",
body: '✨️ Reaction settings.',
thumbnailUrl: pp,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
} catch (e) {
reportError(e)
}
break

// Modify channel name
case isCommand10:
if (!isOwner || !isROwner) return await conn.reply(m.chat, `🚩 You do not have permission to use this command.`, m, rcanal)
if (!text) return await conn.reply(m.chat, `🚩 Enter the ID or link of a WhatsApp channel for the bot to modify the channel name.*\n\n
*Usage parameters:
*${usedPrefix + command}* \`id\` \`name\` 

Usage Example:
*${usedPrefix + command}* 12345@newsletter ChannelName\n\nYou can get the ID using the command:\n*${usedPrefix}superinspect* link${txtBotAdminCh}`, m, rcanal)
const [id, ...nameParts] = text.split(' ')
const name = nameParts.join(' ').trim()
if (name.length > 99) return await conn.reply(m.chat, `🚩 The channel name cannot have more than 99 characters.`, m, rcanal)
if (text.includes("@newsletter")) {
ch = id.trim()
} else {
ch = await conn.newsletterMetadata("invite", channelUrl).then(data => data.id).catch(e => null)
}       
try {
const chtitle = await conn.newsletterMetadata(text.includes("@newsletter") ? "jid" : "invite", text.includes("@newsletter") ? ch : channelUrl).then(data => data.name).catch(e => null)
await conn.newsletterUpdateName(ch, name)
//await conn.reply(m.chat, `🚩 The bot has changed the channel name to *${name}*\n\n*Previous name:* ${chtitle}\n*New name:* ${name}`, m, rcanal) 
await conn.sendMessage(ch, { text: `🚩 YaemoriBot has changed the channel name to *${name}*\n\n*Previous name:* ${chtitle}\n*New name:* ${name}`, contextInfo: {
externalAdReply: {
title: "【 🔔 NOTIFICATION 🔔 】",
body: '✨️ A new name for the channel.',
thumbnailUrl: pp,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
} catch (e) {
reportError(e)
}
break

// Modify channel description
case isCommand11:
if (!isOwner || !isROwner) return await conn.reply(m.chat, `🚩 You do not have permission to use this command.`, m, rcanal)
if (!text) return await conn.reply(m.chat, `🚩 Enter the ID or link of a WhatsApp channel for the bot to modify the channel description.\n\n
Usage parameters:
*${usedPrefix + command}* \`id\` \`description\` 

Usage Example:
*${usedPrefix + command}* 12345@newsletter ChannelDescription\n\n*You can get the ID using the command:*\n*${usedPrefix}superinspect* link${txtBotAdminCh}`, m, rcanal)
const [idch, ...descriptionParts] = text.split(' ')
const description = descriptionParts.join(' ').trim()
if (text.includes("@newsletter")) {
ch = idch.trim()
} else {
ch = await conn.newsletterMetadata("invite", channelUrl).then(data => data.id).catch(e => null)
}       
try {
const chtitle = await conn.newsletterMetadata(text.includes("@newsletter") ? "jid" : "invite", text.includes("@newsletter") ? ch : channelUrl).then(data => data.name).catch(e => null)
await conn.newsletterUpdateDescription(ch, description)
// await conn.reply(m.chat, `🚩 The bot has modified the description of the channel *${chtitle}*`, m, rcanal) 
await conn.sendMessage(ch, { text: `🚩 YaemoriBot has modified the description of the channel *${chtitle}*`, contextInfo: {
externalAdReply: {
title: "【 🔔 NOTIFICATION 🔔 】",
body: '✨️ A new description for the channel.',
thumbnailUrl: pp,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
} catch (e) {
reportError(e)
}
break

//const channels = _.values(conn.chats).filter(c => c.id && c.id.endsWith("@newsletter"))

}}
handler.tags = ['tools']
handler.help = ['nuevafotochannel', 'nosilenciarcanal', 'silenciarcanal', 'noseguircanal', 'seguircanal', 'avisoschannel', 'resiviravisos', 'inspect', 'inspeccionar', 'eliminarfotochannel', 'reactioneschannel', 'reaccioneschannel', 'nuevonombrecanal', 'nuevadescchannel']
handler.command = ['nuevafotochannel', 'nosilenciarcanal', 'silenciarcanal', 'noseguircanal', 'seguircanal', 'avisoschannel', 'resiviravisos', 'inspect', 'inspeccionar', 'eliminarfotochannel', 'reactioneschannel', 'reaccioneschannel', 'nuevonombrecanal', 'nuevadescchannel']
handler.register = true
export default handler 

function formatDate(n, locale = "es", includeTime = true) {
if (n > 1e12) {
n = Math.floor(n / 1000)  // Convert from milliseconds to seconds
} else if (n < 1e10) {
n = Math.floor(n * 1000)  // Convert from seconds to milliseconds
}
const date = new Date(n)
if (isNaN(date)) return "Invalid date"
// Date format: day/month/year
const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' }
const formattedDate = date.toLocaleDateString(locale, optionsDate)
if (!includeTime) return formattedDate
// hours, minutes and seconds
const hours = String(date.getHours()).padStart(2, '0')
const minutes = String(date.getMinutes()).padStart(2, '0')
const seconds = String(date.getSeconds()).padStart(2, '0')
const period = hours < 12 ? 'AM' : 'PM'
const formattedTime = `${hours}:${minutes}:${seconds} ${period}`
return `${formattedDate}, ${formattedTime}`
}

function formatValue(key, value, preview) {
switch (key) {
case "subscribers":
return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "No subscribers"
case "creation_time":
case "nameTime":
case "descriptionTime":
return formatDate(value)
case "description": 
case "name":
return value || "No information available"
case "state":
switch (value) {
case "ACTIVE": return "Active"
case "GEOSUSPENDED": return "Suspended by region"
case "SUSPENDED": return "Suspended"
default: return "Unknown"
}
case "reaction_codes":
switch (value) {
case "ALL": return "All reactions allowed"
case "BASIC": return "Basic reactions allowed"
case "NONE": return "No reactions allowed"
default: return "Unknown"
}
case "verification":
switch (value) {
case "VERIFIED": return "Verified"
case "UNVERIFIED": return "Not verified"
default: return "Unknown"
}
case "mute":
switch (value) {
case "ON": return "Muted"
case "OFF": return "Not muted"
case "UNDEFINED": return "Not defined"
default: return "Unknown"
}
case "view_role":
switch (value) {
case "ADMIN": return "Administrator"
case "OWNER": return "Owner"
case "SUBSCRIBER": return "Subscriber"
case "GUEST": return "Guest"
default: return "Unknown"
}
case "picture":
if (preview) {
return getUrlFromDirectPath(preview)
} else {
return "No image available"
}
default:
return value !== null && value !== undefined ? value.toString() : "No information available"
}}

function newsletterKey(key) {
return _.startCase(key.replace(/_/g, " "))
.replace("Id", "🆔 Identifier")
.replace("State", "📌 State")
.replace("Creation Time", "📅 Creation date")
.replace("Name Time", "✏️ Name modification date")
.replace("Name", "🏷️ Name")
.replace("Description Time", "📝 Description modification date")
.replace("Description", "📜 Description")
.replace("Invite", "📩 Invitation")
.replace("Handle", "👤 Alias")
.replace("Picture", "🖼️ Image")
.replace("Preview", "👀 Preview")
.replace("Reaction Codes", "😃 Reactions")
.replace("Subscribers", "👥 Subscribers")
.replace("Verification", "✅ Verification")
.replace("Viewer Metadata", "🔍 Advanced data")
}

function processObject(obj, prefix = "", preview) {
let caption = ""
Object.keys(obj).forEach(key => {
const value = obj[key]
if (typeof value === "object" && value !== null) {
if (Object.keys(value).length > 0) {
const sectionName = newsletterKey(prefix + key)
caption += `\n*\`${sectionName}\`*\n`
caption += processObject(value, `${prefix}${key}_`)
}} else {
const shortKey = prefix ? prefix.split("_").pop() + "_" + key : key
const displayValue = formatValue(shortKey, value, preview)
const translatedKey = newsletterKey(shortKey)
caption += `- *${translatedKey}:*\n${displayValue}\n\n`
}})
return caption.trim()
}
