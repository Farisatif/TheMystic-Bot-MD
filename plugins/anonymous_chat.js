async function handler(m, {usedPrefix, command}) {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language || global.defaultLenguaje
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))
  const tradutor = _translate.plugins.anonymous_chat

  command = command.toLowerCase();
  this.anonymous = this.anonymous ? this.anonymous : {};
  switch (command) {
    case 'next':
    case 'leave': {
      const room = Object.values(this.anonymous).find((room) => room.check(m.sender));
      if (!room) return this.sendMessage(other, {text: `${tradutor.texto1} ${usedPrefix}start`}, {quoted: m});
      // this.sendButton(m.chat, '*[❗معلومة❗] أنت لست في دردشة مجهولة*\n\n*هل تريد بدء دردشة مجهولة؟*\n_اضغط على الزر التالي_', author, null, [['بدء الدردشة المجهولة', `.start`]], m)
      m.reply(tradutor.texto2);
      const other = room.other(m.sender);
      if (other) await this.sendMessage(other, {text: `${tradutor.texto3} ${usedPrefix}start`}, {quoted: m});
      // this.sendButton(other, '*[❗معلومة❗] قام المستخدم الآخر بمغادرة الدردشة المجهولة*\n\n*هل تريد الذهاب إلى دردشة مجهولة أخرى؟*\n_اضغط على الزر التالي_', author, null, [['بدء دردشة مجهولة', `.start`]], m)
      delete this.anonymous[room.id];
      if (command === 'leave') break;
    }
    case 'start': {
      if (Object.values(this.anonymous).find((room) => room.check(m.sender))) return this.sendMessage(m.chat, {text: `${tradutor.texto4} ${usedPrefix}leave`}, {quoted: m});
      // this.sendButton(m.chat, '*[❗معلومة❗] أنت ما زلت في دردشة مجهولة أو تنتظر اتصال مستخدم آخر*\n\n*هل تريد الخروج من الدردشة المجهولة؟*\n_اضغط على الزر التالي_', author, null, [['الخروج من الدردشة', `.leave`]], m)
      const room = Object.values(this.anonymous).find((room) => room.state === 'WAITING' && !room.check(m.sender));
      if (room) {
        await this.sendMessage(room.a, {text: `${tradutor.texto5}`}, {quoted: m});
        // this.sendButton(room.a, '*[ ✔ ] تم الاتصال بشخص في الدردشة المجهولة، يمكنكم البدء بالدردشة*', author, null, [['الذهاب إلى دردشة أخرى', `.next`]], m)
        room.b = m.sender;
        room.state = 'CHATTING';
        await this.sendMessage(m.chat, {text: `${tradutor.texto6} ${usedPrefix}next`}, {quoted: m});
        // this.sendButton(m.chat, '*[ ✔ ] تم الاتصال بشخص في الدردشة المجهولة، يمكنكم البدء بالدردشة*', author, null, [['الذهاب إلى دردشة أخرى', `.next`]], m)
      } else {
        const id = + new Date;
        this.anonymous[id] = {
          id,
          a: m.sender,
          b: '',
          state: 'WAITING',
          check: function(who = '') {
            return [this.a, this.b].includes(who);
          },
          other: function(who = '') {
            return who === this.a ? this.b : who === this.b ? this.a : '';
          },
        };
        await this.sendMessage(m.chat, {text: `${tradutor.texto7} ${usedPrefix}leave`}, {quoted: m});
        // this.sendButton(m.chat, '*[❗معلومة❗] في انتظار مستخدم آخر لبدء الدردشة المجهولة*\n\n*هل تريد الخروج من الدردشة المجهولة؟*\n_اضغط على الزر التالي_', author, null, [['الخروج من الدردشة', `.leave`]], m)
      }
      break;
    }
  }
}
handler.help = ['start', 'leave', 'next'];
handler.tags = ['anonymous'];
handler.command = ['start', 'leave', 'next'];
handler.private = true;
export default handler;