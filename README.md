# Second Brain connector

The connector a company runs on its own account, so its people's Brains stay in its own GitHub. Each folder holds the
connector for one kind of host, with its owner's guide:

| Folder | Where it runs |
|---|---|
| [`cloudflare/`](cloudflare/README.md) | Cloudflare Workers, the free plan is enough |
| [`vercel/`](vercel/README.md) | Vercel, on a Pro team |
| [`node/`](node/README.md) | Your own server or any cloud that runs containers |

A connector runs only with a company licence from Second Brain, and installs only releases signed with our key. The
computer app is in each release, one zip for each kind of computer.

Each release is signed here, in this repository's [Release workflow](.github/workflows/release.yml), only after one of
our owners approves it. The signing code is in [`.release/`](.release/sign.mjs); our key never leaves that protected step.
