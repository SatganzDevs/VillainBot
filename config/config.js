const fs = require('fs')
const chalk = require('chalk')
global.owner = ['6281316701742','6281268248904']
global.ownernomer = "6281316701742"
global.premium = ['0']
global.packname = '😝'
global.author = '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nKurniawan Satria'
global.sessionName = 'session'
global.prefa = ['','!','.','#','&']
global.namebotmu = '© Villain Bot'
global.sp = ''
global.mess = {
    success: 'Done',
    admin: 'Fitur Khusus Admin Group!',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
    premime: 'Fitur Khusus Premium Kalo Mau Daftar Ketik Sewa',
    verify: 'Daftar Dulu Kk, Cara Daftar nya Ketik .menu',
    owner: 'Fitur Khusus Owner Bot',
    api: 'Mungkin Api Nya Eror cok?',
    group: 'Fitur Digunakan Hanya Untuk Group!',
    private: 'Fitur Digunakan Hanya Untuk Private Chat!',
    bot: 'Fitur Khusus Pengguna Nomor Bot',
    wait: 'Sedang Di Proses',
    endLimit: 'Limit Harian Anda Telah Habis, Limit Akan Direset Setiap Jam 12',
}

    global.limitawal = {
    premium: "Infinity",
    free: 12,
    monayawal: 1000
}

global.limitAwal = {
 prem: 'Unlimited',
 free: 10
}
global.thumb = fs.readFileSync('./image/thumb.jpeg')
global.mygit = 'https://github.com/SatganzDevs'
global.myyt = 'https://bit.ly/SatganzDevs'
global.myytv = 'https://instagram.com/@satganzdevs.xyz'
global.botname = '© Villain Bot'

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})

