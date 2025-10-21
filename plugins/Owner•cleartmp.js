import { tmpdir } from 'os'
import path, { join } from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync
} from 'fs'

let handler = async (m, { conn, __dirname }) => {
  try {
    const tmpDirs = [tmpdir(), join(__dirname, '../tmp')]
    let deletedFiles = []

    for (let dir of tmpDirs) {
      if (!existsSync(dir)) continue

      let files = readdirSync(dir)
      for (let file of files) {
        let filePath = join(dir, file)
        try {
          let stats = statSync(filePath)
          if (stats.isFile()) {
            unlinkSync(filePath)
            deletedFiles.push(filePath)
          }
        } catch (err) {
          console.error(`Could not delete: ${filePath}`, err)
        }
      }
    }

    await conn.reply(
      m.chat,
      `🚩 Cleanup completed.\nFiles deleted: ${deletedFiles.length}`,
      m
    )
  } catch (err) {
    console.error(err)
    await conn.reply(m.chat, '❌ An error occurred while cleaning the tmp folder.', m)
  }
}

handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = ['cleartmp', 'borrartmp', 'borrarcarpetatmp', 'vaciartmp']
handler.exp = 500
handler.rowner = true

export default handler
