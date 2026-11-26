# Your Second Brain connector on Cloudflare

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
- **A Cloudflare account where your domain's DNS is managed.** Your domain shows as **Active** in Cloudflare's dashboard,
  or whoever manages your domain can tell you. The free plan is enough. If your DNS is somewhere else, use the
  [Vercel](https://github.com/second-brain-factory/company-connector/tree/main/vercel) or [own server](https://github.com/second-brain-factory/company-connector/tree/main/node) guide instead.
- **Your connector's address**: a name under your company's domain, such as `setup.yourcompany.com`. Any first part
  works, and you use the same address throughout. You also need someone who can change your domain's DNS: your IT
  team, or your domain provider's website.
- **A [Resend](https://resend.com) account** (the free plan is enough), with your domain added and verified (Resend
  shows the DNS records to add), and an API key. Invitations and sign-in codes go by email, so the connector asks
  for it before anyone can set it up.

## Step 1: Put the connector online

1. Press the button: [![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/second-brain-factory/company-connector/tree/main/cloudflare)
2. Sign in to the Cloudflare account that has your domain. When it asks to connect GitHub, sign in to GitHub as an
   owner of your Brains organisation and allow it there. Cloudflare copies the connector into a new repository:
   choose that organisation for it, make it private if asked (it holds no secrets either way), and keep the name
   `second-brain-connector`.
3. Fill in the settings:

   | Setting | What to type |
   |---|---|
   | `CONNECTOR_SECRET` | 64 letters and numbers, no symbols. Make them with your password manager, or ask IT to run `openssl rand -hex 32`. |
   | `CONNECTOR_BASE` | Your connector's address with `https://` in front, such as `https://setup.yourcompany.com` |
   | `DEPLOY_REPO` | `second-brain-connector`, the repository's name |
   | `RESEND_API_KEY` | Your Resend API key, for invitations and sign-in codes |
   | `EMAIL_FROM` | The sender of those emails, at your Resend domain, such as `Second Brain <brain@yourcompany.com>` |

   Keep `CONNECTOR_SECRET` in your company's password manager and never change it: it locks the connector's GitHub
   key, and every sign-in depends on it.
4. Press **Deploy**. It takes a few minutes and ends with the Worker deployed. If it stops with an error, press
   **Deploy** again; if it stops again, send us the error.
5. Open **Workers & Pages**, then `second-brain-connector`, then **Settings**, then **Domains & Routes**, and press
   **Add**, then **Custom domain**. Type your address without `https://`, such as `setup.yourcompany.com`.

## Step 2: Point your address at it

Cloudflare added the record when you added the custom domain. Your address works when it opens the Second Brain
page in a browser, which can take a few minutes. If it still does not open after an hour, check under **Domains &
Routes** that the custom domain is there, with your address exactly as in `CONNECTOR_BASE`.

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

A new version goes into your `second-brain-connector` repository as a commit from your company's own GitHub App, and
Cloudflare deploys it from there.

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
