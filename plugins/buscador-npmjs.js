// - Código desarrollado por: GabrielVz <@glytglobal>

import fetch from 'node-fetch'

let handler = async (m, { text }) => {
if (!text) return m.reply(`〔 ❀ 〕يرجى إدخال *عنوان* لـ *موديول* أو *ملحق* من منصة *NPMJS*`)
let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
let { objects } = await res.json()
if (!objects.length) return m.reply(`〔 ❀ 〕لا توجد نتائج لبحثك في منصة *NPMJS*`)
let npmpp = 'https://unitedcamps.in/Images/IMG_1742157594.jpg';
let npmtext = objects.map(({ package: pkg }) => {
return `❀ العنوان: *${pkg.name}*\n❀ الإصدار: *${pkg.version || 'غير متوفر'}*\n❀ الوصف: *${pkg.description || 'غير متوفر'}*\n❀ الرابط: *${pkg.links.npm || 'غير متوفر'}*\n\n─────────────────`
}).join`\n\n`

conn.sendMessage(m.chat, { image: { url: npmpp }, caption: npmtext }, { quoted: m });
}
handler.help = ['npmjs']
handler.tags = ['search']
handler.command = /^npmjs?$/i

export default handler;