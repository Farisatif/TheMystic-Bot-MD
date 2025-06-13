const handler = async (m, {conn, text, command, usedPrefix, args}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language || global.defaultLenguaje
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))
  const tradutor = _translate.plugins.game_ppt

  const pp = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg';

  // 60000 = 1 دقيقة // 30000 = 30 ثانية // 15000 = 15 ثانية // 10000 = 10 ثواني
  const time = global.db.data.users[m.sender].wait + 10000;
  if (new Date - global.db.data.users[m.sender].wait < 10000) throw `${tradutor.texto1} ${Math.floor((time - new Date()) / 1000)} ${tradutor.texto2}`;

  if (!args[0]) return conn.reply(m.chat, `${tradutor.texto3[0]} ${usedPrefix + command} حجر*\n*◉ ${usedPrefix + command} ورقة*\n*◉ ${usedPrefix + command} مقص*`, m);
  
  let astro = Math.random();
  if (astro < 0.34) {
    astro = 'حجر';
  } else if (astro > 0.34 && astro < 0.67) {
    astro = 'مقص';
  } else {
    astro = 'ورقة';
  }
  
  const textm = text.toLowerCase();
  if (textm == astro) {
    global.db.data.users[m.sender].exp += 500;
    m.reply(`${tradutor.texto4[0]} ${textm}*\n${tradutor.texto4[1]} ${astro}*\n${tradutor.texto4[2]}`);
  } else if (text == 'ورقة') {
    if (astro == 'حجر') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`${tradutor.texto5[0]} ${textm}*\n${tradutor.texto5[1]} ${astro}*\n${tradutor.texto5[2]}`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`${tradutor.texto6[0]} ${textm}*\n${tradutor.texto6[1]}  ${astro}*\n${tradutor.texto6[2]} `);
    }
  } else if (text == 'مقص') {
    if (astro == 'ورقة') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`${tradutor.texto7[0]} ${textm}*\n${tradutor.texto7[1]} ${astro}*\n${tradutor.texto7[2]}`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`${tradutor.texto8[0]} ${textm}*\n${tradutor.texto8[1]} ${astro}*\n${tradutor.texto8[2]}`);
    }
  } else if (textm == 'مقص') {
    if (astro == 'ورقة') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`${tradutor.texto9[0]} ${textm}*\n${tradutor.texto9[1]} ${astro}*\n${tradutor.texto9[2]}`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`${tradutor.texto10[0]} ${textm}*\n${tradutor.texto10[1]} ${astro}*\n${tradutor.texto10[2]}`);
    }
  } else if (textm == 'ورقة') {
    if (astro == 'حجر') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`${tradutor.texto11[0]} ${textm}*\n${tradutor.texto11[1]} ${astro}*\n${tradutor.texto11[2]}`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`${tradutor.texto12[0]} ${textm}*\n${tradutor.texto12[1]} ${astro}*\n${tradutor.texto12[2]}`);
    }
  } else if (textm == 'حجر') {
    if (astro == 'مقص') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`${tradutor.texto13[0]} ${textm}*\n${tradutor.texto13[1]} ${astro}*\n${tradutor.texto13[2]}`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`${tradutor.texto14[0]} ${textm}*\n${tradutor.texto14[1]} ${astro}*\n${tradutor.texto14[2]}`);
    }
  }
  global.db.data.users[m.sender].wait = new Date * 1;
};

handler.help = ['ppt'];
handler.tags = ['games'];
handler.command = /^(ppt|لعبة)$/i;
export default handler;