#!/usr/bin/env node
// The one step that uses our release key (#4933). A release is built with no key (release.mjs --unsigned); the Release
// workflow of github.com/second-brain-factory/company-connector runs this, from its .release/ folder, in its protected
// `release` environment after an Approve. That copy must stay the same as this file: the build checks it.
//
//   node sign.mjs release --entry entry.json [--previous releases.txt] [--trusted release-keys.json] --out releases.txt
//     the list of releases, earlier ones first, with this release added at the end. A version already in the list is
//     refused.
//   node sign.mjs prepared --licence <licence id> --sha256 <base64url> --bytes <n> [--trusted release-keys.json] --out digest.txt
//     the signed fingerprint of a prepared Brain built where no key is (prepared-build.mjs build --unsigned).
//
// The key comes only from the environment: BRAIN_RELEASE_KEY (an Ed25519 private key, PEM) and BRAIN_RELEASE_KEY_ID.
// It is never printed or written. Before signing, the list before must verify with the public key of that private key,
// and, with --trusted, that public key must be the one the connector is built to trust, so a wrong key fails here.
//
// Only node:crypto and node:fs, so the job that holds the key runs nothing else. The format is envelope.mjs's: an Ed25519
// signature over "brain-envelope/1", the key id and the payload (base64url JSON), sent as keyId.payload.signature.
import crypto from 'node:crypto'
import fs from 'node:fs'

const RELEASES = 'company-connector-releases'
const DIGEST = 'company-brain-digest'
const KEY_ID = /^[a-z0-9][a-z0-9-]{2,40}$/
const VERSION = /^\d{1,4}\.\d{1,4}\.\d{1,4}$/
const DATE = /^\d{4}-\d{2}-\d{2}$/
const LICENCE_ID = /^[A-Za-z0-9_-]{6,80}$/
const SHA256 = /^[A-Za-z0-9_-]{43}$/
const MOST_BODY_BYTES = 256 * 1024
const signedText = (keyId, payload) => `brain-envelope/1\n${keyId}\n${payload}`

/** The release key from its PEM text and id: { keyId, privateKey, publicKey } (publicKey as 32 raw bytes in base64). */
export function releaseKey(pem, keyId) {
  if (!pem || !String(pem).includes('PRIVATE KEY')) throw new Error('BRAIN_RELEASE_KEY is not set to the release key (PEM)')
  if (!KEY_ID.test(String(keyId || ''))) throw new Error('BRAIN_RELEASE_KEY_ID is not set to the release key\'s id')
  let privateKey
  try { privateKey = crypto.createPrivateKey(pem) } catch { throw new Error('BRAIN_RELEASE_KEY can\'t be read as a private key') }
  if (privateKey.asymmetricKeyType !== 'ed25519') throw new Error('BRAIN_RELEASE_KEY is not an Ed25519 key')
  const publicKey = crypto.createPublicKey(privateKey).export({ type: 'spki', format: 'der' }).subarray(-32).toString('base64')
  return { keyId, privateKey, publicKey }
}

/** A value signed as an envelope's text, keyId.payload.signature. */
export function signValue(value, key) {
  const payload = Buffer.from(JSON.stringify(value)).toString('base64url')
  const signature = crypto.sign(null, Buffer.from(signedText(key.keyId, payload)), key.privateKey).toString('base64url')
  return `${key.keyId}.${payload}.${signature}`
}

/** The value of an envelope's text when `key` signed it, else null. */
export function openValue(text, key) {
  const parts = String(text || '').replace(/\s+/g, '').split('.')
  if (parts.length !== 3 || parts[0] !== key.keyId) return null
  const pub = crypto.createPublicKey({ key: Buffer.concat([Buffer.from('302a300506032b6570032100', 'hex'), Buffer.from(key.publicKey, 'base64')]), format: 'der', type: 'spki' })
  try {
    if (!crypto.verify(null, Buffer.from(signedText(parts[0], parts[1])), pub, Buffer.from(parts[2], 'base64url'))) return null
    return JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'))
  } catch { return null }
}

/** With the connector's trusted release keys (JSON text or a list), the key must be one of them, with its public key. */
function checkTrusted(key, trusted) {
  if (trusted === undefined || trusted === null) return
  let list = trusted
  if (typeof trusted === 'string') { try { list = JSON.parse(trusted) } catch { list = [] } }
  const hit = (Array.isArray(list) ? list : []).find((k) => k && k.keyId === key.keyId)
  if (!hit) throw new Error(`The connector is not built to trust ${key.keyId}: it is not in the trusted release keys`)
  if (Buffer.from(String(hit.publicKey), 'base64').toString('base64') !== key.publicKey) throw new Error(`BRAIN_RELEASE_KEY is not the key ${key.keyId} the connector trusts`)
}

const fileOk = (f) => f && typeof f === 'object' && typeof f.url === 'string' && /^https:\/\//.test(f.url) && typeof f.sha256 === 'string' && f.sha256.length >= 43 && Number.isInteger(f.size) && f.size > 0
/** Why a release entry can't be signed, or null. */
export function entryProblem(e) {
  if (!e || typeof e !== 'object') return 'The entry is not a release'
  if (!VERSION.test(String(e.version))) return 'The entry\'s version must look like 1.0.0'
  if (!DATE.test(String(e.released))) return 'The entry\'s released date must look like 2026-11-26'
  if (typeof e.notes !== 'string' || e.notes.length > 300) return 'The entry\'s notes must be text of at most 300 characters'
  if (!e.files || typeof e.files !== 'object' || !Object.keys(e.files).length) return 'The entry names no files'
  const bad = Object.entries(e.files).find(([, f]) => !fileOk(f))
  return bad ? `The entry's file ${bad[0]} has no address, fingerprint or size` : null
}

/**
 * The signed list of releases: the earlier ones from `previous` (signed with this same key), then `entry`. Throws when
 * the list before does not verify with this key, or already holds the version.
 */
export function signReleaseList({ key, entry, previous = null, trusted }) {
  checkTrusted(key, trusted)
  const wrong = entryProblem(entry)
  if (wrong) throw new Error(wrong)
  let earlier = []
  if (previous && String(previous).trim()) {
    const o = openValue(previous, key)
    if (!o) throw new Error(`The list before does not verify with the public key of BRAIN_RELEASE_KEY (${key.keyId}): wrong key, or a changed list`)
    if (o.kind !== RELEASES || o.v !== 1 || !Array.isArray(o.releases)) throw new Error('The list before is not a list of releases')
    earlier = o.releases
  }
  if (earlier.some((r) => r && r.version === entry.version)) throw new Error(`Version ${entry.version} is already in the list`)
  const release = { version: entry.version, released: entry.released, notes: entry.notes, files: entry.files }
  const text = signValue({ kind: RELEASES, v: 1, releases: [...earlier, release] }, key)
  if (!openValue(text, key)) throw new Error('The signed list does not verify')
  return text
}

/** The signed fingerprint of a prepared Brain: its licence id, the base64url SHA-256 of its JSON and that JSON's size. */
export function signPreparedFingerprint({ key, licence, sha256, bytes, trusted }) {
  checkTrusted(key, trusted)
  if (!LICENCE_ID.test(String(licence || ''))) throw new Error('--licence must be a licence id, such as lic_acme_0001')
  if (!SHA256.test(String(sha256 || ''))) throw new Error('--sha256 must be the base64url SHA-256 that prepared-build.mjs printed')
  const n = Number(bytes)
  if (!Number.isInteger(n) || n < 1 || n > MOST_BODY_BYTES || String(bytes).trim() !== String(n)) throw new Error(`--bytes must be the size prepared-build.mjs printed, at most ${MOST_BODY_BYTES}`)
  return signValue({ kind: DIGEST, v: 1, licence, sha256, bytes: n }, key)
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(new URL(import.meta.url).pathname)) {
  const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : undefined }
  const read = (n) => (arg(n) ? fs.readFileSync(arg(n), 'utf8') : undefined)
  try {
    const cmd = process.argv[2]
    if (!['release', 'prepared'].includes(cmd)) throw new Error('Use: sign.mjs release --entry entry.json [--previous releases.txt] --out releases.txt, or sign.mjs prepared --licence <id> --sha256 <b64url> --bytes <n> --out digest.txt')
    if (!arg('out')) throw new Error('Name --out')
    const key = releaseKey(process.env.BRAIN_RELEASE_KEY, process.env.BRAIN_RELEASE_KEY_ID)
    let text
    if (cmd === 'release') {
      if (!arg('entry')) throw new Error('Name --entry, the entry.json release.mjs --unsigned wrote')
      text = signReleaseList({ key, entry: JSON.parse(read('entry')), previous: read('previous') || null, trusted: read('trusted') })
    } else {
      text = signPreparedFingerprint({ key, licence: arg('licence'), sha256: arg('sha256'), bytes: arg('bytes'), trusted: read('trusted') })
    }
    fs.writeFileSync(arg('out'), `${text}\n`)
    console.log(`Signed with ${key.keyId}: ${arg('out')}`)
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}
