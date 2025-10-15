import { join, dirname } from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile, existsSync, writeFileSync } from 'fs'
import cfonts from 'cfonts'
import { createInterface } from 'readline'
import yargs from 'yargs'
import chalk from 'chalk'

console.log(chalk.magentaBright('\nStarting....'))

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const { name, description, author, version } = require(join(__dirname, './package.json'))
const rl = createInterface(process.stdin, process.stdout)

async function animarTextoCyberpunk(texto, delay = 65, glitch = true) {
  const efectos = '░▒▓█▌▐|/<>~*⚡☠☢⌬'
  let resultado = ''
  for (let i = 0; i < texto.length; i++) {
    resultado += texto[i]
    let linea = resultado
    if (glitch) {
      const ruido = efectos[Math.floor(Math.random() * efectos.length)]
      linea += chalk.gray(ruido.repeat(Math.floor(Math.random() * 2)))
    }
    process.stdout.write('\r' + chalk.magentaBright(linea))
    await new Promise(res => setTimeout(res, delay))
  }
  console.log()
}

async function barraCargaCyberpunk() {
  const frames = [
    '[⏳] Summoning grimoires...',
    '[🔮] Gathering primal mana...',
    '[💾] Loading forbidden spells...',
    '[⚡] Synchronizing with demons...',
    '[🔥] Fusing dark magic...',
    '[🌌] Opening the Dark Realm...',
    '[✅] IYII bot 100% OPERATIONAL.'
  ]
  for (let frame of frames) {
    process.stdout.write('\r' + chalk.cyanBright(frame))
    await new Promise(res => setTimeout(res, 350))
  }
  console.log()
}

async function animacionRobot() {
  const frames = [
    `     🤖
    ╭───╮
   ( ⚙️_⚙️ )   ACTIVATING CORE
   /|╳╳|\\
    ███
   /   \\`,
    `     🤖
    ╭───╮
   ( ⚡_⚡ )   CONNECTING SOUL
   /|██|\\
    ███
   /   \\`,
    `     🤖
    ╭───╮
   ( 😈_😈 )   LOADING MAGIC MEMORY
   /|XX|\\
    ███
   /   \\`
  ]
  for (let i = 0; i < 4; i++) {
    console.clear()
    console.log(chalk.greenBright(frames[i % frames.length]))
    await new Promise(res => setTimeout(res, 400))
  }
}

async function iniciarBlackClover() {
  console.clear()
  console.log(chalk.bold.cyanBright('\n⟦ ⌬ ACCESS GRANTED | IYII bot V.777 ⟧'))
  console.log(chalk.gray('⌬ Channeling magical access...'))
  await new Promise(res => setTimeout(res, 600))

  await animarTextoCyberpunk('⌬ Initializing magical combat system...', 50, true)
  await new Promise(res => setTimeout(res, 400))

  await barraCargaCyberpunk()
  await new Promise(res => setTimeout(res, 500))

  console.log(chalk.redBright('\n☰✦☰═☰  B  L  A  C  K    C  L  O  V  E  R  ☰═☰✦☰'))
  await animarTextoCyberpunk('⚔ Welcome to the anti-magic core...', 60, true)
  console.log(chalk.redBright('☰✦☰════════════════════☰✦☰'))

  await new Promise(res => setTimeout(res, 300))
  await animarTextoCyberpunk('✞ Developed by: Iyiola Abifarin👑', 45, false)
  await new Promise(res => setTimeout(res, 600))

  console.log(chalk.yellowBright('\n⟦ ⌬ INITIALIZING ROBOTIC COMBAT INTERFACE ⟧'))
  await animacionRobot()

  await animarTextoCyberpunk('\n⌬ IYII bot has awakened. All spells are available.', 40, true)

  console.log(chalk.bold.redBright('\n⚠️  ✧ DEMON MODE READY TO ACTIVATE ✧ ⚠️'))
  await animarTextoCyberpunk('「💢💢I HAVE NO MAGIC, BUT I NEVER GIVE UP!💢💢」', 75, true)

  console.log(chalk.greenBright('\n⌬ IYII bot system fully operational.\n⌬ Awaiting orders, captain...\n'))

  await new Promise(res => setTimeout(res, 600))
  console.log(chalk.bold.gray('\n⌬═════════════════════════════════⌬'))
  await animarTextoCyberpunk('⌬ System created by:', 40, false)
  await animarTextoCyberpunk('⌬ ★ Iyiola Abifarin ✞', 80, true)
  console.log(chalk.bold.gray('⌬═════════════════════════════════⌬\n'))
}

const frases = [
  '\n✠ IYII bot restarted. ⚙️ Loading systems...\n',
  '\n✠ Restart complete. ⚡ Black Clover ready.\n',
  '\n✠ IYII system: ⚙️ Online.\n',
  '\n✠ IYII revived from the shadows. ⛓️\n',
  '\n✠ Reboot: IYII ⚔️\n'
]

function fraseAleatoria() {
  return frases[Math.floor(Math.random() * frases.length)]
}

let isRunning = false

function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [join(__dirname, 'núcleo•clover', file), ...process.argv.slice(2)]
  setupMaster({
    exec: args[0],
    args: args.slice(1)
  })
  let p = fork()
  p.on('message', data => {
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start(file)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  p.on('exit', (_, code) => {
    isRunning = false
    console.error(chalk.redBright('🚩 Error:\n'), code)
    process.exit()
    if (code === 0) return
    watchFile(args[0], () => {
      unwatchFile(args[0])
      start(file)
    })
  })
}

process.on('warning', warning => {
  if (warning.name === 'MaxListenersExceededWarning') {
    console.warn(chalk.yellow('🚩 Listener limit exceeded in:'))
    console.warn(warning.stack)
  }
})

const archivoArranque = './.arranque-ok'

if (!existsSync(archivoArranque)) {
  await iniciarBlackClover()

  console.log(chalk.cyanBright(`
  
⣿⣿⣿⣿⣿⣿⣿⡇⡌⡰⢃⡿⡡⠟⣠⢹⡏⣦⢸⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡿⢰⠋⡿⢋⣐⡈⣽⠟⢀⢻⢸⡂⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣋⠴⢋⡘⢰⣄⣀⣅⣡⠌⠛⠆⣿⡄⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣶⣁⣐⠄⠹⣟⠯⢿⣷⠾⠁⠥⠃⣹⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠟⠋⡍⢴⣶⣶⣶⣤⣭⡐⢶⣾⣿⣶⡆⢨⠛⠻⣿⣿⣿
⣿⣿⣿⢏⣘⣚⣣⣾⣿⣿⣿⣿⣿⣿⢈⣿⣿⣿⣧⣘⠶⢂⠹⣿⣿
⣿⣿⠃⣾⣿⣿⣿⣿⣿⣿⡿⠿⠿⠿⡀⢿⣿⣿⣿⣿⣿⣿⡇⣿⣿
⣿⣿⡄⣿⣿⣿⣿⣿⣿⡯⠄⠄⠾⠿⠿⢦⣝⠻⣿⣿⣿⣿⠇⣿⣿
⣿⣿⣷⣜⠿⢿⣿⡿⠟⣴⣾⣿⡇⢰⣾⣦⡹⣷⣮⡙⢟⣩⣾⣿⣿
⣿⣿⣿⣿⣿⣆⢶⣶⣦⢻⣿⣿⣷⢸⣿⣿⣷⣌⠻⡷⣺⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡜⢿⣿⡎⢿⣿⣿⡬⣿⣿⣿⡏⢦⣔⠻⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⠎⠻⣷⡈⢿⣿⡇⢛⣻⣿⣿⢸⣿⣷⠌⡛⢿⣿
⣿⣿⣿⣿⣿⣿⡏⢰⣷⡙⢷⣌⢻⣿⣿⣿⣿⣿⢸⡿⢡⣾⣿⡶⠻
⣿⣿⣿⣿⣿⡟⣰⣶⣭⣙⠊⣿⣷⣬⣛⠻⣿⣿⠈⣴⣿⣿⣿⠃⠄
⣿⣿⣿⣿⡟⠄⠹⢿⣿⣿⣿⣤⠻⠟⠋⠡⠘⠋⢸⣿⣿⡿⠁⠄⠄
⣿⣿⣿⣿⠁⠄⠄⠄⠙⢻⣿⣿⣇⠄⠄⠄⠄⠄⣺⡿⠛⠄⠄⠄⠄
⣿⣿⣿⡏⠄⠄⠄⠄⠄⠄⠄⠉⠻⠷⠄⢠⣄⠄⠋⠄⠄⠄⠄⠄⠄
⣿⣿⣿⣿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠸⣿⠄⠄⠄⠄⠄⠄⠄⠄
  `))

  writeFileSync(archivoArranque, 'STARTUP COMPLETED')
} else {
  console.log(chalk.greenBright(fraseAleatoria()))
}

start('start.js')
