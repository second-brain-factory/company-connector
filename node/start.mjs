// The Node package starts here: the release named in DATA_DIR/versions/current when it is newer than the one built into
// the image (a new image wins over an older download), otherwise the built-in one. A release that fails to start sends
// the server back to the built-in one, and says so; the owner sees the update as failed and nothing is lost.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const versions = path.join(process.env.DATA_DIR || '/data', 'versions')
const current = path.join(versions, 'current')
const builtIn = JSON.parse(fs.readFileSync(path.join(HERE, 'version.json'), 'utf8')).version
const chosen = fs.existsSync(current) ? fs.readFileSync(current, 'utf8').trim() : ''
const num = (v) => v.split('.').map(Number)
const newer = (a, b) => { const x = num(a), y = num(b); for (let i = 0; i < 3; i += 1) if (x[i] !== y[i]) return x[i] > y[i]; return false }

const run = async (file) => (await import(pathToFileURL(file).href)).start()
if (/^\d{1,4}\.\d{1,4}\.\d{1,4}$/.test(chosen) && newer(chosen, builtIn)) {
  try {
    await run(path.join(versions, chosen, 'server.mjs'))
  } catch {
    console.log(JSON.stringify({ event: 'update did not start', version: chosen }))
    fs.writeFileSync(current, '')
    await run(path.join(HERE, 'server.mjs'))
  }
} else {
  await run(path.join(HERE, 'server.mjs'))
}
