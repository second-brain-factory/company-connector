#!/usr/bin/env node
// Checks a release candidate before it is signed (release workflow, #4933). The build in the private repository pushes
// it to the branch candidate/v<version> as the folder .candidate/, with no key:
//   templates/<host>/     the host folders for main     files/<version>/<host>   each host's update file
//   apps/v<version>/*.zip the computer app's zips       entry.json               this release's entry, unsigned
//   previous.txt          the published list the build added to
// It stops when the entry's version is not <version>, a file the entry names is missing or has another fingerprint or
// size, or previous.txt is not the list published now. Only node:crypto and node:fs.
//
//   node check-candidate.mjs <candidate folder> <version> <published releases.txt>
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const HOST_FILES = { cloudflare: 'connector.js', node: 'server.mjs', vercel: path.join('api', 'connector.js') }
const [dir, version, published] = process.argv.slice(2)
const fail = (why) => { console.error(why); process.exit(1) }
if (!dir || !version || !published) fail('Use: check-candidate.mjs <candidate folder> <version> <published releases.txt>')
if (!/^\d{1,4}\.\d{1,4}\.\d{1,4}$/.test(version)) fail('The version must look like 1.0.2')

const entry = JSON.parse(fs.readFileSync(path.join(dir, 'entry.json'), 'utf8'))
if (entry.version !== version) fail(`The candidate is version ${entry.version}, not ${version}`)
const now = fs.readFileSync(published, 'utf8')
if (fs.readFileSync(path.join(dir, 'previous.txt'), 'utf8') !== now) fail('The published list changed since the build: build the release again')

for (const [kind, f] of Object.entries(entry.files || {})) {
  const host = Object.hasOwn(HOST_FILES, kind)
  const file = host ? path.join(dir, 'files', version, kind) : path.join(dir, 'apps', `v${version}`, `Second-Brain-${kind}.zip`)
  if (!fs.existsSync(file)) fail(`${kind}: ${path.relative(dir, file)} is missing`)
  const bytes = fs.readFileSync(file)
  const sum = crypto.createHash('sha256').update(bytes).digest(host ? 'base64url' : 'hex')
  if (sum !== f.sha256 || bytes.length !== f.size) fail(`${kind}: ${path.relative(dir, file)} is not the file the entry names`)
  if (host) {
    const template = path.join(dir, 'templates', kind, HOST_FILES[kind])
    if (!fs.existsSync(template) || !fs.readFileSync(template).equals(bytes)) fail(`${kind}: the template's ${HOST_FILES[kind]} is not this release's update file`)
  }
}
console.log(`Candidate ${version} checked: ${Object.keys(entry.files).length} files`)
