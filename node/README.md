# Your Second Brain connector on your own server or any cloud

The connector is where your people sign in to Second Brain and where their work is saved. Each person has their own
Brain (their notes, skills and results, kept as files), and everyone shares the company Brain. Both are kept in your
company's GitHub. Your people reach them through the connector, in Claude or ChatGPT or with the Second Brain app on
their computer. The connector runs on your company's own account, so your Brains never pass through Second Brain's
servers.

## Before you start

One person sets it up and becomes the connector's owner. Before starting, they need:

- **Your company licence.** It is in your purchase email: a long line of text. If someone else bought it, ask them to
  forward that email. Keep it private: whoever holds it can set up a connector.
- **A GitHub organisation used only for your Brains and the connector**, where you are an owner. A free organisation is enough. To make
  one: on github.com, press your picture, then **Your organizations**, then **New organization**, and pick the free
  plan. Keep it for the Brains and the connector alone: the connector's App reaches every repository in it, and
  every owner of the organisation can open every Brain. Your people need no GitHub account.
- **Someone in IT who runs containers**, on your own server or a cloud such as AWS, Azure or Google Cloud. Give them
  Step 1 and Step 2 of this page; they tell you when your address opens the Second Brain page, and you go on from
  Step 3. The connector is one small container with Node 22 inside.
- **Your connector's address**: a name under your company's domain, such as `setup.yourcompany.com`. Any first part
  works, and you use the same address throughout. You also need someone who can change your domain's DNS: your IT
  team, or your domain provider's website.
- **A [Resend](https://resend.com) account** (the free plan is enough), with your domain added and verified (Resend
  shows the DNS records to add), and an API key. Invitations and sign-in codes go by email, so the connector asks
  for it before anyone can set it up.

## Step 1: Put the connector online

1. Get the newest version from [the connector's repository](https://github.com/second-brain-factory/company-connector/tree/main/node): press **Code**, then **Download ZIP**, and
   use its `node` folder. In that folder, build the image, tagged with the version in its `version.json`:

   ```
   docker build -t second-brain-connector:1.0.0 .
   ```

2. Put the settings in a file only IT can read, such as `connector.env`:

   ```
   CONNECTOR_SECRET=<64 letters and numbers, from your password manager or openssl rand -hex 32>
   CONNECTOR_BASE=https://setup.yourcompany.com
   RESEND_API_KEY=<your Resend API key, for invitations and sign-in codes>
   EMAIL_FROM=Second Brain <brain@yourcompany.com>
   ```

   Keep `CONNECTOR_SECRET` in your company's password manager and never change it: it locks the connector's GitHub
   key, and every sign-in depends on it.
3. Start it, with a disk that lasts, so its records and updates survive a restart:

   ```
   docker run -d --name second-brain-connector --restart unless-stopped -p 127.0.0.1:8080:8080 \
     -v second-brain-data:/data --env-file connector.env second-brain-connector:1.0.0
   ```

   Run exactly one copy: stop the old one before starting a new one, never two at once on the same disk or database.
   It runs as the user `node`, logs one line per request to standard output, and `/health` answers
   `{"ok":true,…}`.
4. Put HTTPS in front of port 8080 with what your company already uses: a load balancer, Caddy or nginx. Your address
   must be reachable from the internet, because Claude, ChatGPT and your people's computers reach it from outside.
   Its requests and answers are plain HTTP, with no WebSockets or streaming; allow 30 seconds per request.
   If the proxy is on another machine, publish port 8080 to it rather than to `127.0.0.1`.
5. Allow it to reach `api.github.com`, `github.com`, `api.resend.com`, `second-brain-factory.com` (your licence and
   new versions only), your Postgres database if you use one, and its own address.

| Setting | What it is |
|---|---|
| `CONNECTOR_SECRET` | 64 letters and numbers, required |
| `CONNECTOR_BASE` | Your connector's address, required |
| `PORT` | The port it listens on, 8080 unless set |
| `DATA_DIR` | Where it keeps its records and updates, `/data` in the image |
| `DATABASE_URL` | A Postgres database for the records, instead of the disk. Add `?sslmode=require` if it needs SSL |
| `RESEND_API_KEY`, `EMAIL_FROM` | For invitations and sign-in codes |

**A cloud with no disk that lasts** (Google Cloud Run, Azure Container Apps without a volume, AWS App Runner): set
`DATABASE_URL`, and keep exactly one copy running all the time with its CPU always on (on Cloud Run: minimum and
maximum instances 1, CPU always allocated), so its daily licence check runs. With `DATABASE_URL`, IT installs each
update, as below.

**Without Docker:** on a server with Node 22.13 or newer, run `node start.mjs` in the `node` folder with the same
settings and `DATA_DIR` set to a folder that lasts. Nothing needs installing first. Keep it running with what your
company uses for services, such as systemd.

**Your server's backup:** back up the `second-brain-data` disk, or the Postgres database, as you back up other
services. **Download the workspace** (below) is a second copy.

## Step 2: Point your address at it

Add one record where your domain's DNS is managed: an `A` record whose name is the first part of your address (such as
`setup`) and whose value is your server's or load balancer's IP address. If your cloud gives a host name instead, add a
`CNAME` with that host name as its value.

Where to add it: in Cloudflare, **DNS** then **Records**; in GoDaddy, **My Products** then **DNS**; in Namecheap,
**Domain List**, **Manage**, then **Advanced DNS**; in Microsoft 365, the **Domains** page of the admin centre; in
Squarespace Domains (which took over Google Domains), **DNS settings**. If your IT team manages DNS, send them the
record. It can take up to an hour. Your address works when it opens the Second Brain page in a browser.

## Step 3: Become the owner

1. Open your address with `/admin` at the end, such as `https://setup.yourcompany.com/admin`.
2. Paste your company licence, type your name and work email, choose how you yourself will work (in your chat, or on
   your computer with the Second Brain app), and press **Continue**.

The first person to do this becomes the owner, so do it as soon as your address opens. If you ever lose your sign-in,
the same page lets you in again with the licence and your email.

## Step 4: Connect GitHub

1. Under **Connect GitHub**, type your organisation's name as it is in its github.com address
   (`github.com/<name>`), and press **Connect GitHub**, then **Continue to GitHub**.
2. GitHub shows the App it is about to make for your organisation. Press its green button to create it. The App
   belongs to your organisation, not to us.
3. Back on your connector's page, press **Install on GitHub**, choose **All repositories**, and press **Install**. The
   App makes a new private repository for each person, and GitHub lets an App reach new repositories only this way.

Your connector now makes the company Brain, and yours. Press **Your own way in** at the bottom of the page: it shows
the steps each person follows. Do them yourself first, as the check that everything works.

## Step 5: Add your prepared Brain

If we prepared your company Brain for you (your own skills, your company's name, look and rules, and what we already
know of each person's work, so nobody sets up from nothing), we sent it as a file of text. If we did not, set your
company up yourself under **Company setup** on the same page: your Brain's name, your colour, what most of the work is
and what never goes into an AI. An owner who works on a computer is asked the same once, while setting up, and it
reaches everyone from there.

1. Under **Prepared Brain**, paste all of the file's text and press **Check it**. Your connector takes it only if we
   signed it, for your licence.
2. The page lists its skills and every file, and which ones replace a file already in the company Brain. Press
   **Add to the company Brain**.

It goes into the company Brain in one change, in your GitHub, with its history. Its live skills and your company's
setup then reach everyone: in Claude and ChatGPT at once, and on each computer at its next update. What we prepared
for one person reaches only that person. A newer prepared
Brain is added the same way, and you can change the fields under **Company setup** whenever you like.

## Step 6: Invite your people

1. Under **Invite someone**, type their name and work email, and choose how they work:
   - **In their chat (Claude or ChatGPT):** on a paid Claude or ChatGPT plan. Each vendor's own page says which
     plans can add a connector: [Claude: custom connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)
     and [ChatGPT: plans](https://chatgpt.com/pricing). In a company Claude or ChatGPT workspace, its owner or admin
     adds the connector first; their page says how.
   - **On their computer (the Second Brain app):** on a Mac or a Windows computer.
2. Choose **Member**, or **Admin** for someone who may also invite and remove people.
3. Press **Invite**. The invitation goes to their work email and works once, for 14 days. When every seat is taken,
   the page says so.

They open it, press **Continue** and follow their own page: it shows how to add the connector to Claude or ChatGPT,
or the one message to send their own AI, which sets up the Second Brain app on their computer. Through the connector,
each person sees only their own Brain and the company Brain.

Each person in their chat then asks their AI to *check that my Second Brain can save*. It saves one small file to
their Brain and reads it back, and your page shows the result next to their name, for each app they connected:

- "saved and read back": their AI saves to their Brain directly.
- "saves go through the save link": their app did not let the AI save. The AI writes the text and gives them a
  link to a page of your connector, where they sign in, read it and press **Save**. The link works once, for 30
  minutes, only for them. They need no GitHub account. In a company Claude or ChatGPT workspace, its admin can allow
  saving for the connector; the AI tries again every week and goes back to saving directly when it can.
- "saving not checked yet": they connected and have not asked yet.

On a personal ChatGPT plan, OpenAI may use what ChatGPT reads through a connector to train its models, unless
**Improve the model for everyone** is off in the person's ChatGPT settings.

## Every day

- **Suggestions:** your people suggest changes to the company Brain from their AI. Each one shows on your page:
  **Approve** puts it in the company Brain for everyone, **Decline** drops it. Admins can do this too.
- **Seats:** the **Licence** line on your page shows how many seats your licence has, how many are taken, and whether
  you take one. For more seats, contact us.
- **Someone leaves:** press **Remove** next to their name. Every app they connected stops at once, and their seat is
  free. Their Brain stays in your organisation.
- **A lost laptop:** press **Sign out everywhere** next to their name. Every browser and app they connected stops.
  They keep their seat and their Brain, and sign in again with a code sent to their email.
- **Someone changes how they work:** choose **In their chat** or **On their computer** next to their name and press
  **Save**. Their Brain stays as it is, and an email tells them how to start. Admins can do this for members.
- **You hand over:** press **Make owner** next to the person and confirm. They then manage the workspace, its
  updates and its backup, and you stay as an admin. Tick **I am leaving** to be removed at the same time. The person
  must have signed in once with a code or a link sent to their email: if they haven't, press **Email a sign-in link**
  next to their name first.

## Updates

Your page shows when a new version is ready. It starts on **Install when I approve**: you press **Install now**. With
**Install by themselves**, the connector installs each new version in its daily check.

Without `DATABASE_URL`, the connector downloads a new version, checks that it carries our release signature with the
keys built into the image, keeps it on the disk and restarts into it. The version before stays on the disk for going
back.

With `DATABASE_URL`, your page still shows each new version, but its **Install now** and **Go back** buttons point
here:

- **Update by hand:** IT builds the new version as in step 1, with its own tag, stops the running copy and starts the
  new image as in step 3. Your records stay in Postgres.
- **Go back by hand:** IT stops it and starts the image tagged with the version before.

- After an update that changes the connector's tools, each person refreshes them once in their app: in Claude, open
  the connector and press **Refresh tools list**; in ChatGPT, open it and press **Refresh**.
- Before it installs, the connector keeps a copy of your workspace's records. If the new version does not start,
  your connector keeps the version that ran, and your page says so. Nothing is lost.
- **Go back to version …** returns to the version before, with one press.
- The **Licence** line shows until when you get updates. After that date your connector keeps working on the version
  you have; to get newer ones, renew with us.

## Backup

Your people's Brains are in your GitHub organisation, with every earlier version. The workspace itself (people, roles,
settings) is on your connector: press **Download the workspace** now and then, and keep the file as private as the
licence. To move to a new connector: stop the old one, set up the new one with the same `CONNECTOR_SECRET` and
address (Steps 1 to 3), paste the file's text under **Restore from a download**, and press **Restore**. GitHub stays
connected, so Step 4 is not needed. Everyone signs in again afterwards.

## If something goes wrong

| What you see | What to do |
|---|---|
| Your address does not open the Second Brain page | Check the DNS record in Step 2. Give it up to an hour. |
| The **Address** line on your page is red: reaches another server | The DNS record points somewhere else. Change it to the value in Step 2. |
| Your organisation is not in GitHub's list, or GitHub says you can't create an App | You need to be an owner of the organisation. Ask its owner to make you one. |
| "This is not a licence signed by Second Brain" | Copy the whole licence again from your purchase email, with nothing added. |
| "The App was made under another account" | Make the App inside your organisation: type the organisation's name, not your own user name. |
| A person's invitation "has been used or has ended" | Press **Email a new invitation** next to their name. |
| Someone can't sign in again | Check they use the work email they were invited with, and look in their spam folder for the code. Or press **Email a sign-in link** next to their name. |
| Claude or ChatGPT can't add or reach the connector, and your address opens in your browser | The address must open from the internet with no sign-in of your host in front of it. On Vercel, open **Settings**, then **Deployment Protection**, and check that **Vercel Authentication** does not cover your address. |
| A person's AI can't find a tool your connector has | They refresh the connector's tools in their app, as under **Updates**. |
| An update "did not start" | Nothing is needed: you are still on the version that ran. Try again later, or ask us. |
| The **Licence** line says "Withdrawn" | Your licence has ended, so your connector has stopped answering. Your Brains and your workspace are kept. Contact us: once your licence is active again, your connector works again within 12 hours, with nothing to set up again. |

When something here does not help, paste this page into Claude or ChatGPT and ask, or contact us as your purchase
email says.
