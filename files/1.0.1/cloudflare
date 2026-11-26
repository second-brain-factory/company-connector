var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../connector/chat.cjs
var require_chat = __commonJS({
  "../connector/chat.cjs"(exports, module) {
    function makeChat2({ SKILLS, BRAIN_RULES, PRODUCT, DASHBOARD, names, openFeatures, hmac: hmac2, readWith }) {
      const READ_WITH = readWith || "with the chat app's own GitHub connector (ChatGPT's GitHub app, Claude's GitHub connector); this connector has no GitHub tools";
      const SKILL_NAMES = Object.keys(SKILLS).sort();
      const allowedSkills = (plan) => plan ? SKILL_NAMES : [];
      const hasSkill = (name) => typeof name === "string" && Object.hasOwn(SKILLS, name);
      const skillText = (name) => {
        const s = SKILLS[name];
        return s.computer ? `This skill needs a computer: ${s.computer}` : `${BRAIN_RULES}

---

${s.text}`;
      };
      const NO_SKILL = "No skill of that name.";
      const PLAN = { starter: "starter", accelerator: "accelerator", nobody: null };
      const UI = "ui://second-brain/dashboard.html", UI_MIME = "text/html;profile=mcp-app";
      const UI_META = { ui: { resourceUri: UI }, "openai/outputTemplate": UI, "openai/widgetAccessible": true };
      const COUNTS = { email_threads_24h: "Email threads in the last 24 hours", calendar_events_7d: "Calendar events in the next 7 days", github_open_issues: "Open GitHub issues", github_open_prs: "Open GitHub pull requests" };
      const APPS2 = ["gmail", "calendar", "drive", "github", "slack", "notion", "linkedin", "microsoft-365"];
      const SCHEDULED_STATES = ["active", "paused", "ended", "unknown"];
      const RUN_RESULTS = ["succeeded", "failed", "running"];
      const SCHEDULED = { type: "array", maxItems: 30, description: "The person's scheduled tasks in this app (some apps call them routines, triggers or automations), read with the app's own scheduler: name, schedule and state only, never a scheduled task's instructions. Pass an empty list when there are none. Leave it out when you could not read them, and name scheduled under unavailable.", items: { type: "object", properties: { id: { type: "string", maxLength: 80, description: "The scheduler's own id for it. Always pass it when the scheduler has one: the dashboard gives it back when the person pauses, runs or deletes it, and without it they can do none of that there." }, title: { type: "string", maxLength: 80 }, schedule: { type: "string", maxLength: 200, description: 'When it runs, in plain words with its time zone, exactly as the scheduler holds it and never the time that was asked for (a time moved a few minutes to spread load shows as moved), such as "Weekdays at 08:00, Asia/Beirut".' }, state: { type: "string", enum: SCHEDULED_STATES }, next_run: { type: "string", description: "The next run as an ISO 8601 time, when the app gives one." }, last_run: { type: "string", description: "The last run as an ISO 8601 time, when the app gives one." }, last_result: { type: "string", enum: RUN_RESULTS, description: "How the last run ended, when the app says." } }, required: ["title"] } };
      const clean3 = (v, keep) => typeof v === "string" ? (v.toWellFormed ? v.toWellFormed() : v).replace(/\r\n?/g, keep ? "\n" : " ").replace(keep ? /[\u0000-\u0009\u000b-\u001f\u007f-\u009f\u{2028}\u{2029}]/gu : /[\u0000-\u001f\u007f-\u009f\u{2028}\u{2029}]/gu, " ").trim() : "";
      const tidy = (v, n, keep) => [...clean3(v, keep)].slice(0, n).join("").trim();
      const clip = (v, n) => tidy(v, n, false);
      const short = (v, n) => {
        const c = [...clean3(v, false)];
        return c.length > n ? c.slice(0, n - 1).join("").trim() + "…" : c.join("");
      };
      const instant = (v) => {
        const m = typeof v === "string" && /^(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}(:\d{2}(\.\d{1,9})?)?(Z|[+-]\d{2}:\d{2})$/.exec(v);
        return m && Number.isFinite(Date.parse(v)) && new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).getUTCDate() === +m[3] ? new Date(v).toISOString() : null;
      };
      const SHOWN = 30;
      const taskId = (v) => typeof v === "string" && /^[\w.:-]{1,80}$/.test(v) && v.split(/[_.:-]+/).filter((p) => /^[A-Za-z]{3,}$/.test(p)).length <= 2 ? v : null;
      const scheduledOf = (a) => {
        if (!Array.isArray(a.scheduled)) return null;
        const all = a.scheduled.filter((r) => r && clean3(r.title)), read = all.slice(0, SHOWN).map((r) => ({ id: taskId(r.id), title: short(r.title, 80), schedule: short(r.schedule, 200), state: SCHEDULED_STATES.includes(r.state) ? r.state : "unknown", next_run: instant(r.next_run), last_run: instant(r.last_run), last_result: RUN_RESULTS.includes(r.last_result) ? r.last_result : null }));
        return a.scheduled.length && !read.length ? null : { read, more: all.length > SHOWN || all.length < a.scheduled.length };
      };
      const TASK_STATES = ["working", "question", "done", "failed"], STEP_STATES = ["done", "doing", "todo", "failed"];
      const WORK_RULES = "Before you ask the person anything, look for the answer in their connected apps, and ask only what those can't tell you. Mark a step done only when it worked. When it could not be done (no access, nothing found, an error), mark it failed with a short note and list it under gaps: a skill or file you could not read was not used, so say so. An app that is not connected fails only the steps that need it: do the rest. Say only what a source confirms, and call a date, number or decision proposed or unconfirmed when that is all the source says. When two sources disagree, ask one narrow question instead of choosing. Say done only when every step is done or failed, and never stop with the task still shown as working. What you write yourself, such as a draft, a summary or a plan, is the result: give it in full, whether or not it could be saved anywhere. Say something was saved, sent, created or changed in one of the person's apps only when a tool confirmed it, and give the link or id it returned. Otherwise say it was not done and list it under gaps. Never drop a rule, gap or check to make the result shorter.";
      const NOTES = (what) => ({ type: "array", maxItems: 8, description: what, items: { type: "string", maxLength: 200 } });
      const TASK = { task: { type: "string", description: "The task id from the dashboard's message, such as T1a2b3c." }, title: { type: "string", maxLength: 80, description: "The task in a few words." }, state: { type: "string", enum: TASK_STATES, description: "working while you work, question when you need the person's answer, done when every step is done or failed, failed when the task could not be done." }, whole: { type: "boolean", description: "True when the dashboard's latest message for this task ended with its end mark, (end of task …) or (end of answer …). False when the message stopped before it: then do not act on it. For a cut answer, pass whole false with your open question again, then stop." }, steps: { type: "array", maxItems: 12, description: "Every step of the task, each with its state now. done only when it worked; failed when it could not be done, with a note saying why.", items: { type: "object", properties: { label: { type: "string", maxLength: 80 }, state: { type: "string", enum: STEP_STATES }, note: { type: "string", maxLength: 140, description: "With state failed: why it could not be done." } }, required: ["label", "state"] } }, question: { type: "object", description: "One question for the person, with state question, only for what their connected apps can't tell you. Then stop: their answer comes from the dashboard.", properties: { text: { type: "string", maxLength: 300 }, options: { type: "array", maxItems: 4, items: { type: "string", maxLength: 100 } }, shows: { type: "string", maxLength: 4e3, description: "What the person is asked to approve or choose from, whole and exactly as it would be sent or saved, such as an email draft or an event. Never a summary of it. Line breaks are kept. Over the limit it is refused, never cut." } }, required: ["text"] }, result: { type: "string", maxLength: 4e3, description: "With state done, what you did, saying only what a source confirms. With state failed, what went wrong and what the person can do. Keep it to at most 450 words: a result over the limit is refused, never cut." }, gaps: NOTES("Everything this task needed that you could not read or do, one item each, such as a file you had no access to. Never leave one out to save room."), checks: NOTES("Every rule the person gave for using the result, and everything they must check before relying on it, such as a date that is only proposed or that a person must review it first. Never leave one out to save room."), links: { type: "array", maxItems: 3, description: "What you made, for the person to open: https links only, and only links a tool returned, never one you composed, except a Brain file's github.com page as the Brain rules give it.", items: { type: "object", properties: { label: { type: "string", maxLength: 60 }, url: { type: "string", maxLength: 300 } }, required: ["label", "url"] } } };
      const linkOf = (l) => {
        try {
          const u = new URL(l.url);
          return typeof l.url === "string" && u.href.length <= 300 && u.protocol === "https:" && !u.username && !u.password && short(l.label, 60) ? { label: short(l.label, 60), url: u.href } : null;
        } catch {
          return null;
        }
      };
      const taskOf = (a) => {
        const id = typeof a.task === "string" && /^T[0-9a-z]{1,12}$/.test(a.task) ? a.task : null, title = short(a.title, 80);
        if (!id || !title) return null;
        if (typeof a.whole !== "boolean") return { problem: "Not shown. Pass whole: true when the dashboard's latest message for this task ended with its end mark, (end of task …) or (end of answer …), and false when it stopped before it. Then call show_task again." };
        const asked = a.question && typeof a.question === "object" && clean3(a.question.text) ? a.question : null;
        if (!a.whole && !asked) return { cut: true, task: { id, title, state: "failed", steps: [], question: null, result: "Your request did not arrive whole, so nothing was started. Send it again.", gaps: [], checks: [], links: [], cut: true } };
        let problem = null;
        const no = (said, fix) => {
          if (!problem) problem = `Not shown: ${said}${fix ? " " + fix : ""} Then call show_task again.`;
        };
        const SHORTER = "Shorten the background. Keep every rule, gap and check.", FEWER = "Merge them into fewer and leave none out.", WORDS = "Say it in fewer words.";
        const whole = (v, n, field, keep, fix = SHORTER) => {
          const c = clean3(v, keep), len2 = [...c].length;
          if (len2 > n) no(`${field} is ${len2} characters long and its limit is ${n}. Aim for ${Math.floor(n * 0.75)} or fewer, because a count by eye runs short.`, fix);
          return c;
        };
        const text2 = (v, n, field, keep, fix) => {
          const c = whole(v, n, field, keep, fix);
          if (!c) no(`${field} is not text.`);
          return c;
        };
        const list = (v, field, most, what, fix) => {
          if (v === void 0 || v === null) return [];
          if (!Array.isArray(v)) {
            no(`${field} must be ${what}.`);
            return [];
          }
          if (v.length > most) no(`${field} has ${v.length} items and its limit is ${most}.`, fix);
          return v;
        };
        const state = asked && (!a.whole || !["done", "failed"].includes(a.state)) ? "question" : TASK_STATES.includes(a.state) && a.state !== "question" ? a.state : "working", over = state === "done" || state === "failed";
        const steps = list(a.steps, "steps", 12, "a list", FEWER).map((s, i) => {
          if (!s || typeof s !== "object" || !clean3(s.label)) return no(`steps[${i}] has no label.`);
          const st = STEP_STATES.includes(s.state) ? s.state : "todo", note = st === "failed" ? whole(s.note, 140, `steps[${i}].note`) : "";
          return { label: short(s.label, 80), state: st, ...note ? { note } : {} };
        }).filter(Boolean);
        const shows = state === "question" && asked.shows !== void 0 ? whole(asked.shows, 4e3, "question.shows", true, "Show one item at a time, each whole, never a summary of it.") : "";
        const question = state === "question" ? { text: whole(asked.text, 300, "question.text", true, WORDS), options: list(asked.options, "question.options", 4, "a list", FEWER).map((o, i) => text2(o, 100, `question.options[${i}]`, false, WORDS)), ...shows ? { shows } : {} } : null;
        const notes = (v, field) => list(v, field, 8, "a list of short texts", SHORTER).map((x, i) => text2(x, 200, `${field}[${i}]`));
        const result = over ? whole(a.result, 4e3, "result", true) : "", gaps = over ? notes(a.gaps, "gaps") : [], checks = over ? notes(a.checks, "checks") : [];
        const links = over ? list(a.links, "links", 3, "a list", FEWER).map((l, i) => linkOf(l) || no(`links[${i}] is not an https link with a label.`)) : [];
        if (problem) return { problem };
        const partial = state === "done" && (gaps.length > 0 || steps.some((s) => s.state !== "done"));
        const early = !over && !!clean3(a.result, true);
        return { cut: !a.whole, ...early ? { early } : {}, task: { id, title, state, steps, question, result, gaps, checks, links, ...partial ? { partial: true } : {}, ...a.whole ? {} : { cut: true } } };
      };
      const BRAIN_FOLDERS = ["me", "knowledge", "decisions", "outputs", "projects"], BRAIN_PARTS = ["files", "projects", "decisions", "changes", "tasks", "relationships", "skills", "company"], PROJECT_STATES = ["active", "paused", "done", "unknown"], FILES_SHOWN = 300;
      const inBrain = (v) => typeof v === "string" && new RegExp(`^(${BRAIN_FOLDERS.join("|")})/`).test(v);
      const brainPath2 = (v) => inBrain(v) && [...v].length <= 160 && !v.endsWith("/") && !v.includes("..") && !v.split("/").some((p) => p === "" || p === ".") && !v.includes("\\") && !/[\u0000-\u001f\u007f-\u009f\u{2028}\u{2029}]/u.test(v) && (!v.isWellFormed || v.isWellFormed()) ? v : null;
      const dateOnly2 = (v) => {
        const m = typeof v === "string" && /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
        return m && +m[2] >= 1 && +m[2] <= 12 && new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).getUTCDate() === +m[3] ? v : null;
      };
      const upTo = (v) => Number.isInteger(v) && v >= 0 && v <= 999 ? v : null;
      const more = (v) => Number.isInteger(v) && v >= 0 && v <= 99999 ? v : null;
      const listOf = (v, most, each) => Array.isArray(v) ? v.slice(0, most).map((x) => x && typeof x === "object" ? each(x) : null).filter(Boolean) : null;
      const recId = (v) => typeof v === "string" && /^[A-Za-z0-9][A-Za-z0-9_-]{2,39}$/.test(v) ? v : null;
      const repoOf = (v) => typeof v === "string" && /^[A-Za-z0-9_.-]{1,39}\/[A-Za-z0-9_.-]{1,100}$/.test(v) && !v.split("/").some((p) => /^\.+$/.test(p)) ? v : null;
      const TODO_STATES = PRODUCT.states.map((s) => s.id), PRIORITIES = PRODUCT.priorities.map((p) => p.id), RECORDS_SHOWN = 50;
      const todoOf = (t) => {
        const id = recId(t.id), title = short(t.title, 120);
        return id && title ? { id, title, due: dateOnly2(t.due), priority: PRIORITIES.includes(t.priority) ? t.priority : null, status: TODO_STATES.includes(t.status) ? t.status : "open" } : null;
      };
      const relationOf = (r) => {
        const id = recId(r.id), org = short(r.org, 80);
        return id && org ? { id, org, person: short(r.person, 40) || null, role: short(r.role, 80) || null, stage: typeof r.stage === "string" && /^[a-z0-9-]{1,30}$/.test(r.stage) ? r.stage : null, last: dateOnly2(r.last), next: short(r.next, 140) || null, next_at: dateOnly2(r.next_at) } : null;
      };
      const ownSkillOf = (s) => {
        const name = typeof s.name === "string" && /^[a-z0-9-]{1,60}$/.test(s.name) && !hasSkill(s.name) ? s.name : null;
        return name ? { name, title: short(s.title, 80) || name, tagline: short(s.tagline, 140) || null, ok: s.ok !== false } : null;
      };
      const companyOf = (c) => {
        const repo = c && typeof c === "object" ? repoOf(c.repo) : null;
        return repo ? { repo, name: short(c.name, 80) || null, people: listOf(c.people, 30, (p) => {
          const name = short(p.name, 60);
          return name ? { name, role: short(p.role, 80) || null } : null;
        }), suggestions: listOf(c.suggestions, 20, (x) => Number.isInteger(x.number) && x.number > 0 && x.number < 1e7 && short(x.title, 120) ? { number: x.number, title: short(x.title, 120) } : null) } : null;
      };
      const BRAIN_REPO = "Not shown: pass repo as owner/name, the Brain's repository on GitHub, such as ann/second-brain. Then call show_brain again.";
      const brainOf = (a) => {
        if (typeof a.found !== "boolean") return { problem: "Not shown: pass found true when you read the Brain, or false with the reason when there is no GitHub connector or no Brain. Then call show_brain again." };
        if (!a.found) return { brain: { found: false, reason: short(a.reason, 200) || null, repo: null, branch: null, private: null, files: null, files_complete: null, projects: null, decisions: null, changes: null, tasks: null, tasks_done: null, tasks_more: null, relationships: null, relationships_more: null, own_skills: null, company: null, part: null, unavailable: [] } };
        const repo = repoOf(a.repo);
        if (!repo) return { problem: BRAIN_REPO };
        const branch = typeof a.branch === "string" && a.branch.length <= 100 && /^[^\s~^:?*[\\\u0000-\u001f\u007f]+$/.test(a.branch) && !a.branch.includes("..") && !a.branch.split("/").some((p) => p === "" || p.startsWith(".")) ? a.branch : null;
        const given = Array.isArray(a.files) ? a.files : null, paths = given && [...new Set(given.map(brainPath2).filter(Boolean))], lost = given && given.some((p) => inBrain(p) && !brainPath2(p));
        const files = paths && paths.slice(0, FILES_SHOWN);
        const projects = listOf(a.projects, 20, (p) => {
          const name = typeof p.name === "string" && /^[a-z0-9-]{1,60}$/.test(p.name) ? p.name : null;
          if (!name) return null;
          let done = upTo(p.done), total = upTo(p.total);
          if (done !== null && total !== null && done > total) done = total = null;
          return { name, title: short(p.title, 80) || name, status: PROJECT_STATES.includes(p.status) ? p.status : "unknown", done, total, blocked: upTo(p.blocked), next: short(p.next, 140) || null, listed: p.listed === true };
        });
        const decisions = listOf(a.decisions, 10, (d) => {
          const path = brainPath2(d.path);
          if (!path || !path.startsWith("decisions/")) return null;
          return { path, title: short(d.title, 80) || null, decided: dateOnly2(d.decided), review: dateOnly2(d.review), proposed: d.proposed === true };
        });
        const changes = listOf(a.changes, 10, (c) => {
          const text2 = short(c.text, 140);
          return text2 ? { date: dateOnly2(c.date), text: text2 } : null;
        });
        const unavailable = (Array.isArray(a.unavailable) ? a.unavailable : []).filter((u) => u && BRAIN_PARTS.includes(u.what)).slice(0, BRAIN_PARTS.length).map((u) => ({ what: u.what, reason: short(u.reason, 140) }));
        return { brain: { found: true, reason: null, repo, branch, private: typeof a.private === "boolean" ? a.private : null, files, files_complete: !files ? null : lost || paths.length > FILES_SHOWN ? false : typeof a.files_complete === "boolean" ? a.files_complete : null, projects, decisions, changes, tasks: listOf(a.tasks, RECORDS_SHOWN, todoOf), tasks_done: upTo(a.tasks_done), tasks_more: more(a.tasks_more), relationships: listOf(a.relationships, RECORDS_SHOWN, relationOf), relationships_more: more(a.relationships_more), own_skills: listOf(a.own_skills, 30, ownSkillOf), company: companyOf(a.company), part: a.part === "records" ? "records" : null, unavailable } };
      };
      const BRAIN_SCHEMA = { request: { type: "string", description: "The request id from the dashboard's message, such as B1a2b3c." }, found: { type: "boolean", description: "False when this chat has no GitHub connector or the person has no Brain repository." }, reason: { type: "string", maxLength: 200, description: `With found false, why, in the person's words, such as "GitHub is not connected in this app".` }, repo: { type: "string", description: "The Brain repository as owner/name." }, branch: { type: "string", maxLength: 100, description: "Its default branch." }, private: { type: "boolean" }, files: { type: "array", maxItems: FILES_SHOWN, description: "Every file path under me/, knowledge/, decisions/, outputs/ and projects/: files, never a folder on its own. Paths only.", items: { type: "string", maxLength: 160 } }, files_complete: { type: "boolean", description: "False when you could not list every file." }, projects: { type: "array", maxItems: 20, description: "One per projects/<short-name>/plan.md, as that plan says, and one per project in .second-brain/records/projects.json whose short name has no plan.md.", items: { type: "object", properties: { name: { type: "string", maxLength: 60, description: "The folder's short name." }, title: { type: "string", maxLength: 80 }, status: { type: "string", enum: PROJECT_STATES }, done: { type: "integer", minimum: 0, maximum: 999 }, total: { type: "integer", minimum: 0, maximum: 999 }, blocked: { type: "integer", minimum: 0, maximum: 999 }, next: { type: "string", maxLength: 140, description: 'The first step whose state is "to do".' }, listed: { type: "boolean", description: "True for a project only my computer lists, with no plan.md." } }, required: ["name"] } }, decisions: { type: "array", maxItems: 10, description: "The newest files in decisions/.", items: { type: "object", properties: { path: { type: "string", maxLength: 160 }, title: { type: "string", maxLength: 80 }, decided: { type: "string", description: "YYYY-MM-DD." }, review: { type: "string", description: 'The date under "## When we review it", YYYY-MM-DD.' }, proposed: { type: "boolean", description: "True when that date is marked proposed." } }, required: ["path"] } }, changes: { type: "array", maxItems: 10, description: "The repository's commits from the last 7 days, newest first.", items: { type: "object", properties: { date: { type: "string", description: "YYYY-MM-DD." }, text: { type: "string", maxLength: 140 } }, required: ["text"] } }, part: { type: "string", enum: ["records"], description: 'Pass "records" when the dashboard asked only for the to-do list and the relationships: the rest of what it shows then stays as it was.' }, tasks: { type: "array", maxItems: RECORDS_SHOWN, description: 'The to-dos in .second-brain/records/tasks.json under "mine" that are not done, sorted by due date, earliest first, then those with none, so every to-do that is due is among them. An empty list when there are none or the file is not there yet.', items: { type: "object", properties: { id: { type: "string", maxLength: 40 }, title: { type: "string", maxLength: 120 }, due: { type: "string", description: "YYYY-MM-DD." }, priority: { type: "string", enum: PRIORITIES }, status: { type: "string", enum: TODO_STATES } }, required: ["id", "title"] } }, tasks_done: { type: "integer", minimum: 0, maximum: 999, description: "How many to-dos in that file are done." }, tasks_more: { type: "integer", minimum: 0, maximum: 99999, description: "How many to-dos that are not done the file holds beyond the ones in tasks. 0 when tasks holds them all." }, relationships: { type: "array", maxItems: RECORDS_SHOWN, description: `The relationships in .second-brain/records/crm.json, one per item under "added": its stage now (the newest under "stage", otherwise its own), the day of the last contact, and the next step with its day. Sorted by the next step's day, earliest first, then those with none, so every next step that is due is among them.`, items: { type: "object", properties: { id: { type: "string", maxLength: 40 }, org: { type: "string", maxLength: 80 }, person: { type: "string", maxLength: 40, description: "A first name." }, role: { type: "string", maxLength: 80 }, stage: { type: "string", maxLength: 30 }, last: { type: "string", description: "YYYY-MM-DD." }, next: { type: "string", maxLength: 140 }, next_at: { type: "string", description: "YYYY-MM-DD." } }, required: ["id", "org"] } }, relationships_more: { type: "integer", minimum: 0, maximum: 99999, description: "How many relationships the file holds beyond the ones in relationships. 0 when relationships holds them all." }, own_skills: { type: "array", maxItems: 30, description: 'The skills the person made: one per .claude/skills/<short-name>/SKILL.md in the Brain. ok false when its file has no heading or no "## Steps".', items: { type: "object", properties: { name: { type: "string", maxLength: 60, description: "The folder's short name." }, title: { type: "string", maxLength: 80 }, tagline: { type: "string", maxLength: 140, description: "Its one line on what it gives." }, ok: { type: "boolean" } }, required: ["name"] } }, company: { type: "object", description: "The company Brain, when the person has one: the second repository the Brain rules name. Leave it out when they have none.", properties: { repo: { type: "string", description: "owner/name." }, name: { type: "string", maxLength: 80, description: "Its name, from shared-brain.json." }, people: { type: "array", maxItems: 30, description: "Who looks after it (the curator in shared-brain.json) and who changed it in the last 30 days: a name and a role each, nothing else.", items: { type: "object", properties: { name: { type: "string", maxLength: 60 }, role: { type: "string", maxLength: 80 } }, required: ["name"] } }, suggestions: { type: "array", maxItems: 20, description: "Its open pull requests: number and title.", items: { type: "object", properties: { number: { type: "integer", minimum: 1 }, title: { type: "string", maxLength: 120 } }, required: ["number", "title"] } } }, required: ["repo"] }, unavailable: { type: "array", maxItems: BRAIN_PARTS.length, items: { type: "object", properties: { what: { type: "string", enum: BRAIN_PARTS }, reason: { type: "string", maxLength: 140 } }, required: ["what"] } } };
      const DETAILS = { type: "boolean", description: "True only when the person asks for test details, or the dashboard's refresh message says to pass it." };
      const MOST = 999999999;
      const DASHBOARD_TOOLS = [
        { name: "open_dashboard", title: "Open dashboard", description: "Shows the person's dashboard inside the chat: their brain, plan and skills, with Refresh to read their counts and what is scheduled.", inputSchema: { type: "object", properties: { details: DETAILS } }, annotations: { readOnlyHint: true }, _meta: UI_META },
        { name: "show_counts", title: "Show counts", description: "Shows counts and scheduled tasks on the person's dashboard. Read each count first with the person's own connected apps: numbers only, never any content. Read the scheduled tasks with this app's own scheduler. Pass the request id the dashboard gave, and list every source you could not reach under unavailable.", inputSchema: { type: "object", properties: { request: { type: "string", description: "The request id from the dashboard's message, such as R1a2b3c." }, ...Object.fromEntries(Object.entries(COUNTS).map(([k, d]) => [k, { type: "integer", minimum: 0, maximum: MOST, description: d }])), unavailable: { type: "array", items: { type: "object", properties: { source: { type: "string", enum: [...Object.keys(COUNTS), "scheduled"] }, reason: { type: "string", maxLength: 140 } }, required: ["source"] } }, apps: { type: "array", maxItems: APPS2.length, description: "Which of these apps this chat has a connector for right now, one entry for each you can tell: connected true or false. Names only.", items: { type: "object", properties: { app: { type: "string", enum: APPS2 }, connected: { type: "boolean" } }, required: ["app", "connected"] } }, scheduled: SCHEDULED, scheduled_complete: { type: "boolean", description: "True when scheduled holds every scheduled task this app shows, false when some may be missing." }, details: DETAILS } }, annotations: { readOnlyHint: true }, _meta: UI_META },
        { name: "show_task", title: "Show task", description: "Shows a task the person started on their dashboard: its steps, one question at a time with anything it asks a yes for whole in question.shows, and its result. Call it with the task id before you start, after each step, when you need the person's answer, and at the end. The person follows the task here, not in the chat. " + WORK_RULES, inputSchema: { type: "object", properties: { ...TASK, details: DETAILS }, required: ["task", "title", "state", "whole"] }, annotations: { readOnlyHint: true }, _meta: UI_META },
        { name: "show_brain", title: "Show Brain", description: "Shows what is in the person's Brain on their dashboard, after you read it " + READ_WITH + ": file names and short lines only, never a file's text. Their to-do list, relationships and own skills are read from the Brain too, and shown, never kept. Say only what you read, and list what you could not read under unavailable. Always pass the request id the dashboard gave, with found false too. With no GitHub connector or no Brain, pass found false and why.", inputSchema: { type: "object", properties: { ...BRAIN_SCHEMA, details: DETAILS }, required: ["found"] }, annotations: { readOnlyHint: true }, _meta: UI_META }
      ];
      const BRAIN_RULES_TOOL = { name: "brain_rules", description: "Call this before any work that needs what the person knows, decided or wants remembered, when no skill was read in this chat.", inputSchema: { type: "object", properties: {} }, annotations: { readOnlyHint: true } };
      const dashboardData = (plan, product, a = {}, who = null) => {
        const counts = Object.fromEntries(Object.keys(COUNTS).filter((k) => Number.isInteger(a[k]) && a[k] >= 0 && a[k] <= MOST).map((k) => [k, a[k]]));
        const unavailable = (Array.isArray(a.unavailable) ? a.unavailable : []).filter((u) => u && (Object.hasOwn(COUNTS, u.source) || u.source === "scheduled")).slice(0, 5).map((u) => ({ source: u.source, reason: tidy(u.reason, 140) }));
        const request = typeof a.request === "string" && /^[RA][0-9a-z]{1,12}$/.test(a.request) ? a.request : null;
        const found = scheduledOf(a), scheduled = found && found.read;
        const apps = Array.isArray(a.apps) ? APPS2.map((app) => a.apps.find((x) => x && x.app === app && typeof x.connected === "boolean")).filter(Boolean).map((x) => ({ app: x.app, connected: x.connected })) : null;
        return { product: (names || {})[product] || product, plan, plan_name: who && who.planName || null, skills: plan ? allowedSkills(plan) : [], counts: Object.keys(counts).length ? counts : null, scheduled, scheduled_complete: !found ? null : found.more ? false : typeof a.scheduled_complete === "boolean" ? a.scheduled_complete : null, unavailable, request, apps: apps && apps.length ? apps : null, features: plan ? openFeatures(who) : [], company: !!(who && who.co), reads: readWith ? "connector" : "github", version: PRODUCT.changes[0].date, task: null, brain: null, details: a.details === true, at: Date.now() };
      };
      const SKILL_TOOL = (plan) => ({ name: "get_skill", description: "Read one of this person's skills, then follow the Brain rules it returns and the skill.", inputSchema: { type: "object", properties: { name: { type: "string", enum: allowedSkills(plan) } }, required: ["name"] }, annotations: { readOnlyHint: true } });
      const chatTools = (plan, cloud) => cloud ? [...allowedSkills(plan).length ? [SKILL_TOOL(plan)] : [], ...plan ? [BRAIN_RULES_TOOL] : [], ...DASHBOARD_TOOLS.filter((t) => plan || t.name !== "show_brain")] : [];
      const answer = (m, who, plan, product, cloud, sign2 = hmac2) => {
        const ok = (result) => ({ result });
        if (m.method === "resources/list") return ok({ resources: cloud ? [{ uri: UI, name: "Dashboard", mimeType: UI_MIME }] : [] });
        if (m.method === "resources/templates/list") return ok({ resourceTemplates: [] });
        if (m.method === "resources/read") return cloud && m.params && m.params.uri === UI ? ok({ contents: [{ uri: UI, mimeType: UI_MIME, text: DASHBOARD, _meta: { ui: { prefersBorder: false, csp: { connectDomains: [], resourceDomains: [] } }, "openai/widgetPrefersBorder": false, "openai/widgetDescription": "The person's dashboard, with their counts." } }] }) : { error: { code: -32002, message: "Resource not found" } };
        if (m.method === "prompts/list") return ok({ prompts: cloud ? allowedSkills(plan).filter((n) => !SKILLS[n].computer).map((n) => ({ name: n, title: SKILLS[n].title, description: SKILLS[n].tagline })) : [] });
        if (m.method === "prompts/get") return cloud && hasSkill(m.params.name) && allowedSkills(plan).includes(m.params.name) && !SKILLS[m.params.name].computer ? ok({ description: SKILLS[m.params.name].tagline, messages: [{ role: "user", content: { type: "text", text: skillText(m.params.name) } }] }) : { error: { code: -32602, message: NO_SKILL } };
        if (m.method !== "tools/call") return null;
        const shown = (x) => ({ ...dashboardData(plan, product, x, who), mine: sign2(`mine ${who.u}`).slice(0, 22) });
        const a = m.params.arguments && typeof m.params.arguments === "object" ? m.params.arguments : {}, text2 = (t, e) => ok({ isError: !!e, content: [{ type: "text", text: typeof t === "string" ? t : JSON.stringify(t) }] });
        if (cloud && (m.params.name === "open_dashboard" || m.params.name === "show_counts")) {
          const d = shown(m.params.name === "show_counts" ? a : { details: a.details });
          const said = (d.counts ? Object.entries(d.counts).map(([k, v]) => `${COUNTS[k]}: ${v}`).join(". ") : "No counts yet.") + (d.scheduled ? ` Scheduled: ${d.scheduled.length}.` : "");
          return ok({ content: [{ type: "text", text: m.params.name === "show_counts" ? `Shown on the dashboard. ${said}` : `Dashboard for ${d.product}. ${said}` }], structuredContent: d, _meta: UI_META });
        }
        if (cloud && m.params.name === "show_task") {
          const r = taskOf(a);
          if (!r) return text2("Pass the task id from the dashboard's message, such as T1a2b3c, and a title.", true);
          if (r.problem) return text2(r.problem, true);
          const task = r.task;
          return ok({ content: [{ type: "text", text: r.cut ? task.state === "question" ? "Shown on the dashboard. Stop here: do not act on the cut answer. The person answers again on the dashboard." : "Shown on the dashboard. Stop here: do not act on the cut message." : (task.state === "question" ? "Shown on the dashboard. Stop here: the person answers on the dashboard." : "Shown on the dashboard.") + (r.early ? " The result you passed was not shown and is not kept: a result is shown only with state done or failed. Pass it whole again then." : "") }], structuredContent: { ...shown({ details: a.details }), task: { ...task, fold: sign2(`fold ${who.u} ${task.id}`).slice(0, 22) } }, _meta: UI_META });
        }
        if (cloud && plan && m.params.name === "show_brain") {
          const r = brainOf(a);
          if (r.problem) return text2(r.problem, true);
          const b = r.brain;
          return ok({ content: [{ type: "text", text: b.found ? b.part ? `Shown on the dashboard. ${b.repo}: ${b.tasks ? b.tasks.length : 0} to-dos, ${b.relationships ? b.relationships.length : 0} relationships.` : `Shown on the dashboard. ${b.repo}: ${b.files ? b.files.length : 0} files, ${b.projects ? b.projects.length : 0} projects, ${b.decisions ? b.decisions.length : 0} decisions.` : "Shown on the dashboard: no Brain to show." }], structuredContent: { ...shown({ details: a.details }), brain: b, request: typeof a.request === "string" && /^[BKCO][0-9a-z]{1,12}$/.test(a.request) ? a.request : null }, _meta: UI_META });
        }
        if (cloud && m.params.name === "get_skill") return hasSkill(a.name) && allowedSkills(plan).includes(a.name) ? text2(skillText(a.name)) : text2(NO_SKILL, true);
        if (cloud && plan && m.params.name === "brain_rules") return text2(BRAIN_RULES);
        return null;
      };
      return { SKILL_NAMES, allowedSkills, hasSkill, skillText, NO_SKILL, PLAN, UI, UI_MIME, UI_META, COUNTS, WORK_RULES, BRAIN_RULES_TOOL, DASHBOARD_TOOLS, dashboardData, taskOf, brainOf, chatTools, answer };
    }
    module.exports = { makeChat: makeChat2 };
  }
});

// sb:sb-build
var sb_build_default = { "version": "1.0.1", "licenceKeys": [{ "keyId": "factory-online-2026-11", "publicKey": "hm+64as0SdXVxH9zaLciubV0iEBMJDJV31DsSJpExU4=" }], "releaseKeys": [{ "keyId": "release-2026-11", "publicKey": "rz/A4DpoSKqziuzMY6qmUR7GgCSsXjsiJUfCA1SuicE=" }], "factoryUrl": "https://second-brain-factory.com", "updatesUrl": "https://second-brain-factory.com/api/brain/connector-releases", "content": { "DASHBOARD": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Dashboard</title>
<style>
:root{--ink:#141414;--muted:#5b554b;--paper:#fff;--beige:#f3f0ed;--accent:#1f63b8;--accent-ink:#fff;--warn:#fbe8df;--warn-ink:#7a2e12;--mono:'Space Mono',ui-monospace,Menlo,Consolas,monospace;--sans:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color-scheme:light}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--ink:#f2efea;--muted:#b3ab9e;--paper:#161514;--beige:#24221f;--accent:#7fb0ef;--accent-ink:#0d1b2c;--warn:#3a2219;--warn-ink:#f3c1a8;color-scheme:dark}}
:root[data-theme="dark"]{--ink:#f2efea;--muted:#b3ab9e;--paper:#161514;--beige:#24221f;--accent:#7fb0ef;--accent-ink:#0d1b2c;--warn:#3a2219;--warn-ink:#f3c1a8;color-scheme:dark}
*{box-sizing:border-box;border-radius:0}
[hidden]{display:none!important}
html,body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.5 var(--sans);-webkit-font-smoothing:antialiased}
main{padding:20px 16px 22px;max-width:760px;margin:0 auto}
header{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px}
h1{margin:0;font-size:24px;line-height:1.15;letter-spacing:-.01em}
.plan{font:12px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
@media (min-width:560px){.grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
.tile{background:var(--beige);padding:14px 14px 12px;min-width:0}
.num{display:block;font:700 30px/1.1 var(--mono);font-variant-numeric:tabular-nums;overflow-wrap:anywhere}
.label{display:block;margin-top:4px;font-size:14px;color:var(--muted)}
.off .num{color:var(--muted)}
.when{margin:12px 0 0;font-size:14px;color:var(--muted)}
.missing{margin:12px 0 0;padding:10px 12px;background:var(--warn);color:var(--warn-ink);font-size:14px}
.actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
button{display:inline-flex;align-items:center;gap:8px;min-height:44px;max-width:100%;padding:12px 16px;border:0;text-align:left;overflow-wrap:anywhere;background:var(--ink);color:var(--paper);font:700 15px var(--sans);cursor:pointer}
button.second{background:var(--beige);color:var(--ink)}
button:disabled{opacity:.55;cursor:default}
button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.status{margin:10px 0 0;font-size:14px;color:var(--muted);min-height:1.5em}
details{margin-top:18px;font-size:13px;color:var(--muted)}
summary{cursor:pointer}
dl{display:grid;grid-template-columns:max-content 1fr;gap:2px 12px;margin:8px 0 0}
dt{font-weight:700}
dd{margin:0;overflow-wrap:anywhere}
.tabs{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:12px}
.tabs button{padding:8px 14px;background:none;color:var(--muted)}
.tabs button[aria-selected="true"]{background:var(--beige);color:var(--ink)}
.list{display:grid;gap:8px;margin:0 0 16px;padding:0;list-style:none}
.list li{padding:12px 14px;background:var(--beige);overflow-wrap:anywhere}
.r-title{display:block;font-weight:700}
.r-meta{display:block;font-size:14px;color:var(--muted)}
label{display:block;margin:10px 0 4px;font-size:14px;font-weight:700}
input,textarea{display:block;width:100%;padding:12px;border:0;background:var(--beige);color:var(--ink);font:inherit;resize:vertical}
input:focus-visible,textarea:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
#add button,#start button,#t-send,#todo-add,#rel-add,#co-ask-go,#co-suggest-go{margin-top:12px}
.row{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
.row button{padding:8px 14px;background:var(--paper);color:var(--ink);font-size:14px}
.steps{display:grid;gap:6px;margin:0 0 4px;padding:0;list-style:none}
.steps li{display:grid;grid-template-columns:22px 1fr;gap:6px;padding:10px 14px;background:var(--beige);overflow-wrap:anywhere}
.steps .todo{color:var(--muted)}
.steps .doing{font-weight:700}
.mark{font-family:var(--mono)}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
#t-q-text{margin:14px 0 0;font-weight:700;white-space:pre-wrap;overflow-wrap:anywhere}
#t-result{margin:14px 0 0;white-space:pre-wrap;overflow-wrap:anywhere}
#t-result.bad{padding:10px 12px;background:var(--warn);color:var(--warn-ink)}
.count{display:block;margin-top:4px;font:12px var(--mono);font-variant-numeric:tabular-nums;color:var(--muted);text-align:right}
.count.over{color:var(--warn-ink);background:var(--warn);padding:2px 6px}
.steps .failed{color:var(--warn-ink);background:var(--warn)}
.note{display:block;font-size:14px;font-weight:400}
#task h2{margin:14px 0 6px;font-size:15px;line-height:1.3}
.notes{display:grid;gap:4px;margin:0;padding:10px 14px 10px 32px;background:var(--beige);overflow-wrap:anywhere}
#t-gaps .notes{background:var(--warn);color:var(--warn-ink)}
h1{overflow-wrap:anywhere}
:root{--hover:rgba(20,20,20,.06);--hover-ink:rgba(255,255,255,.16)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--hover:rgba(255,255,255,.08);--hover-ink:rgba(0,0,0,.16)}}
:root[data-theme="dark"]{--hover:rgba(255,255,255,.08);--hover-ink:rgba(0,0,0,.16)}
button:not(:disabled):active{background-image:linear-gradient(var(--hover-ink),var(--hover-ink))}
button.second:not(:disabled):active,.tabs button:not(:disabled):active,.row button:not(:disabled):active,button.skill:not(:disabled):active,button.fold:not(:disabled):active{background-image:linear-gradient(var(--hover),var(--hover))}
@media (hover:hover){button:not(:disabled):hover{background-image:linear-gradient(var(--hover-ink),var(--hover-ink))}button.second:not(:disabled):hover,.tabs button:not(:disabled):hover,.row button:not(:disabled):hover,button.skill:not(:disabled):hover,button.fold:not(:disabled):hover{background-image:linear-gradient(var(--hover),var(--hover))}}
@media (max-width:420px){.tabs{gap:2px}.tabs button{flex:1 1 auto;justify-content:center;padding:8px 6px}}
input,textarea,select{-webkit-appearance:none;appearance:none}
::placeholder{color:var(--muted);opacity:1}
input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-cancel-button{-webkit-appearance:none}
input[type=date]{min-height:48px;line-height:24px}
input[type=date]::-webkit-date-and-time-value{text-align:left}
select{display:block;width:100%;min-height:48px;padding:12px 40px 12px 12px;border:0;background:var(--beige);color:var(--ink);font:inherit;text-overflow:ellipsis;cursor:pointer}
select:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.pick{position:relative;display:block}
.pick::after{content:'';position:absolute;right:16px;top:50%;width:7px;height:7px;border:solid var(--ink);border-width:0 2px 2px 0;transform:translateY(-70%) rotate(45deg);pointer-events:none}
/* A long placeholder wraps instead of being cut: it is drawn under the field, which takes its height. */
.line{display:grid}
.line>*{grid-area:1/1}
.line input::placeholder{color:transparent}
.ph{padding:12px;color:var(--muted);overflow-wrap:anywhere;pointer-events:none}
.line input:not(:placeholder-shown)+.ph{visibility:hidden}
.req{font-weight:400;color:var(--muted)}
.err{display:block;margin-top:4px;padding:2px 6px;background:var(--warn);color:var(--warn-ink);font-size:14px}
.group h2{margin:18px 0 6px;font:12px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.group.folds h2{margin:4px 0 0}
button.fold{position:relative;display:flex;align-items:center;min-height:44px;justify-content:space-between;gap:12px;width:100%;padding:14px 38px 14px 14px;background-color:var(--beige);color:var(--ink);font:12px var(--mono);letter-spacing:.08em;text-transform:uppercase;text-align:left}
button.fold::after{content:'';position:absolute;right:16px;top:50%;width:7px;height:7px;border:solid var(--ink);border-width:0 2px 2px 0;transform:translateY(-70%) rotate(45deg)}
button.fold[aria-expanded=true]::after{transform:translateY(-30%) rotate(225deg)}
.fold .n{color:var(--muted)}
.group.folds .picks{margin:4px 0 14px}
.picks{gap:4px;margin:0}
.picks li{padding:0;background:none}
button.skill{display:block;width:100%;padding:12px 14px;background-color:var(--beige);color:var(--ink);font-weight:400}
.skill b{display:block;font-size:16px}
.skill span{display:block;font-size:14px;color:var(--muted)}
.skill .needs{margin-top:4px;font:12px var(--mono);letter-spacing:.08em;text-transform:uppercase}
#s-none{margin:16px 0 0}
#s-title{margin:16px 0 0;font-size:20px;line-height:1.2;overflow-wrap:anywhere}
#s-title:focus{outline:none}
#s-does{margin:6px 0 0;overflow-wrap:anywhere}
#s-facts,#s-why{margin:8px 0 0;font-size:14px;color:var(--muted)}
#s-run{margin-top:16px}
#t-shows{margin:14px 0 0;padding:12px 14px;background:var(--beige);white-space:pre-wrap;overflow-wrap:anywhere}
@media (max-width:380px){.tabs button{padding:8px 4px;font-size:14px}}
.b-h{margin:20px 0 6px;font:12px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.b-head{display:flex;align-items:center;gap:8px 12px;flex-wrap:wrap}
.b-head .meta{font-size:14px;color:var(--muted)}
.flag{padding:2px 6px;background:var(--warn);color:var(--warn-ink)}
.picks li.card{padding:0;background:var(--beige)}
.card .row{margin:0;padding:0 14px 12px}
.card button.skill{min-height:44px}
.skill .due{display:inline-block;margin-top:4px;padding:2px 6px;background:var(--warn);color:var(--warn-ink)}
button.file{display:block;width:100%;min-height:44px;padding:11px 14px;background-color:var(--beige);color:var(--ink);font-weight:400}
button.more{margin:0 0 14px}
.week li{display:grid;grid-template-columns:max-content 1fr;gap:4px 12px}
.week .r-meta{font-family:var(--mono);font-size:13px;line-height:1.6}
#b-why{margin:0 0 12px}
#b-find{margin-bottom:8px}
#needs .b-h{margin-top:0}
#needs-list{margin-bottom:16px}
div.skill{padding:12px 14px}
.card .in{padding:0 14px 12px}
.card .in input{background:var(--paper)}
.card .in .row{padding:0}
.plain li b{display:block}
.plain li span{display:block;font-size:14px;color:var(--muted)}
#system dl{margin:0;font-size:14px}
#first{margin-top:16px}
button.file:not(:disabled):active,.card .row button:not(:disabled):active{background-image:linear-gradient(var(--hover),var(--hover))}
@media (hover:hover){button.file:not(:disabled):hover{background-image:linear-gradient(var(--hover),var(--hover))}}
</style>
</head>
<body>
<main>
  <header><h1 id="product">Your brain</h1><span class="plan" id="plan"></span></header>
  <div class="tabs" role="tablist">
    <button type="button" role="tab" id="tab-today" aria-controls="today" aria-selected="true">Today</button>
    <button type="button" role="tab" id="tab-scheduled" aria-controls="scheduled" aria-selected="false">Scheduled</button>
    <button type="button" role="tab" id="tab-tasks" aria-controls="tasks" aria-selected="false">Tasks</button>
    <button type="button" role="tab" id="tab-relationships" aria-controls="relationships" aria-selected="false" hidden>Relationships</button>
    <button type="button" role="tab" id="tab-skills" aria-controls="skills" aria-selected="false" hidden>Skills</button>
    <button type="button" role="tab" id="tab-brain" aria-controls="brain" aria-selected="false">Brain</button>
    <button type="button" role="tab" id="tab-company" aria-controls="company" aria-selected="false" hidden>Company</button>
  </div>
  <section id="today" role="tabpanel" aria-labelledby="tab-today">
    <div id="needs" hidden><h2 class="b-h">Needs you</h2><ul class="list picks" id="needs-list"></ul></div>
    <div class="grid" id="counts"></div>
    <div class="actions" id="first" hidden><button id="first-go" type="button">Make my first result</button></div>
    <div id="system" hidden><h2 class="b-h">Your system</h2><dl id="system-facts"></dl></div>
    <div class="group folds" id="news"><h2><button type="button" class="fold" id="news-fold" aria-expanded="false" aria-controls="news-list"><span>What’s new</span></button></h2><ul class="list week" id="news-list" hidden></ul></div>
    <div class="group folds" id="full" hidden><h2><button type="button" class="fold" id="full-fold" aria-expanded="false" aria-controls="full-list"><span>Full plan</span><span class="n" id="full-n"></span></button></h2><ul class="list plain" id="full-list" hidden></ul></div>
  </section>
  <section id="scheduled" role="tabpanel" aria-labelledby="tab-scheduled" hidden>
    <ul class="list" id="list"></ul>
    <p class="when" id="partial" hidden>Your AI could not read the full list.</p>
    <div id="suggest" hidden><h2 class="b-h">Suggested</h2><ul class="list" id="suggest-list"></ul></div>
    <div id="add">
      <label for="r-title">Name</label><input id="r-title" autocomplete="off" aria-describedby="r-title-n"><span class="count" id="r-title-n" hidden></span>
      <label for="r-when">When</label><input id="r-when" autocomplete="off" aria-describedby="r-when-n"><span class="count" id="r-when-n" hidden></span>
      <label for="r-what">What it does</label><textarea id="r-what" rows="3" aria-describedby="r-what-n"></textarea><span class="count" id="r-what-n" hidden></span>
      <button id="add-go" type="button">Schedule it</button>
    </div>
  </section>
  <section id="tasks" role="tabpanel" aria-labelledby="tab-tasks" hidden>
    <div id="start">
      <label for="t-what">Task</label><textarea id="t-what" rows="3" aria-describedby="t-what-n"></textarea><span class="count" id="t-what-n" hidden></span>
      <button id="t-go" type="button">Start task</button>
    </div>
    <div class="actions" id="goal" hidden><button id="goal-go" type="button" class="second">New goal</button></div>
    <div id="todo" hidden>
      <h2 class="b-h">To do</h2>
      <div class="actions" id="todo-off" hidden><button id="todo-read" type="button" class="second">Read my to-do list</button></div>
      <div id="todo-on" hidden>
        <ul class="list picks" id="todo-list"></ul>
        <p class="when" id="todo-done" hidden></p>
        <div class="actions" id="todo-more" hidden><button id="todo-more-go" type="button" class="second"></button></div>
        <label for="todo-title">New to-do</label><input id="todo-title" autocomplete="off" aria-describedby="todo-title-n"><span class="count" id="todo-title-n" hidden></span>
        <label for="todo-due">Due</label><input id="todo-due" type="date">
        <button id="todo-add" type="button">Add</button>
        <div class="actions"><button id="todo-again" type="button" class="second">Read again</button></div>
      </div>
    </div>
  </section>
  <section id="relationships" role="tabpanel" aria-labelledby="tab-relationships" hidden>
    <button id="rel-read" type="button">Read my relationships</button>
    <div id="rel-on" hidden>
      <div id="rel-groups"></div>
      <div class="actions" id="rel-more" hidden><button id="rel-more-go" type="button" class="second"></button></div>
      <h2 class="b-h">New relationship</h2>
      <label for="rel-org">Organisation</label><input id="rel-org" autocomplete="off" aria-describedby="rel-org-n"><span class="count" id="rel-org-n" hidden></span>
      <label for="rel-person">First name</label><input id="rel-person" autocomplete="off" aria-describedby="rel-person-n"><span class="count" id="rel-person-n" hidden></span>
      <label for="rel-role">Role</label><input id="rel-role" autocomplete="off" aria-describedby="rel-role-n"><span class="count" id="rel-role-n" hidden></span>
      <button id="rel-add" type="button">Add</button>
      <div class="actions"><button id="rel-again" type="button" class="second">Read again</button></div>
    </div>
  </section>
  <section id="skills" role="tabpanel" aria-labelledby="tab-skills" hidden>
    <div id="s-list">
      <label for="s-find">Search</label><input id="s-find" type="search" autocomplete="off" spellcheck="false">
      <div id="s-groups"></div>
      <p id="s-none" hidden>No skill matches that.</p>
    </div>
    <div id="s-view" hidden>
      <button id="s-back" type="button" class="second">Back</button>
      <h2 id="s-title" tabindex="-1"></h2>
      <p id="s-does"></p>
      <p id="s-facts" hidden></p>
      <p id="s-why" hidden></p>
      <div id="s-form"></div>
      <button id="s-run" type="button">Run</button>
    </div>
  </section>
  <section id="brain" role="tabpanel" aria-labelledby="tab-brain" hidden>
    <button id="b-read" type="button">Read my Brain</button>
    <div id="b-off" hidden><p id="b-why"></p><p class="when" id="b-off-at"></p><div class="actions"><button id="b-setup" type="button">Set up my Brain</button><button id="b-retry" type="button" class="second">Read again</button></div></div>
    <div id="b-on" hidden>
      <div class="b-head"><button id="b-repo" type="button" class="second"></button><span class="meta" id="b-at"></span><button id="b-again" type="button" class="second">Read again</button></div>
      <div id="b-projects-part"><h2 class="b-h">Projects</h2><ul class="list picks" id="b-projects"></ul></div>
      <div id="b-decisions-part"><h2 class="b-h">Decisions</h2><ul class="list picks" id="b-decisions"></ul></div>
      <div id="b-memory-part">
        <h2 class="b-h">Memory</h2>
        <label for="b-find">Filter</label><input id="b-find" type="search" autocomplete="off" spellcheck="false">
        <div id="b-groups"></div>
        <p class="when" id="b-partial" hidden>Your AI could not list every file.</p>
      </div>
      <div class="actions"><button id="b-add" type="button" class="second">Add to memory</button></div>
      <div id="b-week-part" hidden><h2 class="b-h">This week</h2><ul class="list week" id="b-week"></ul></div>
      <p class="missing" id="b-missing" hidden></p>
    </div>
  </section>
  <section id="company" role="tabpanel" aria-labelledby="tab-company" hidden>
    <button id="co-read" type="button">Read my company Brain</button>
    <div id="co-on" hidden>
      <div class="b-head"><button id="co-repo" type="button" class="second"></button><button id="co-again" type="button" class="second">Read again</button></div>
      <div id="co-people-part"><h2 class="b-h">People</h2><ul class="list plain" id="co-people"></ul></div>
      <div id="co-sugg-part"><h2 class="b-h">Suggestions</h2><ul class="list picks" id="co-sugg"></ul></div>
      <label for="co-ask">Ask the company Brain</label><textarea id="co-ask" rows="2" aria-describedby="co-ask-n"></textarea><span class="count" id="co-ask-n" hidden></span>
      <button id="co-ask-go" type="button">Ask</button>
      <label for="co-suggest">Suggest a change</label><textarea id="co-suggest" rows="2" aria-describedby="co-suggest-n"></textarea><span class="count" id="co-suggest-n" hidden></span>
      <button id="co-suggest-go" type="button" class="second">Suggest</button>
    </div>
  </section>
  <section id="task" hidden>
    <ol class="steps" id="t-steps"></ol>
    <div id="t-q" hidden>
      <p class="missing" id="t-cut" role="status" hidden>Your answer did not arrive whole. Send it again.</p>
      <p id="t-shows" hidden></p>
      <p id="t-q-text"></p>
      <div class="actions" id="t-opts"></div>
      <label for="t-answer">Your answer</label><textarea id="t-answer" rows="2" aria-describedby="t-answer-n"></textarea><span class="count" id="t-answer-n" hidden></span>
      <button id="t-send" type="button">Send</button>
    </div>
    <div id="t-gaps" hidden><h2>Not done</h2><ul class="notes"></ul></div>
    <div id="t-checks" hidden><h2>Check before you use it</h2><ul class="notes"></ul></div>
    <p id="t-result" hidden></p>
    <div class="actions" id="t-links"></div>
    <p class="missing" id="t-differs" hidden>Not the text you chose to keep. Open the file to check it.</p>
    <div id="t-next" hidden>
      <div class="actions"><button id="t-keep" type="button" class="second">Keep in my Brain</button><button id="t-alter" type="button" class="second" aria-controls="t-change-part" aria-expanded="false">Ask for a change</button><button id="t-again" type="button" class="second">Try again</button><button id="t-skill" type="button" class="second">Make a skill from this</button></div>
      <div id="t-change-part" hidden>
        <label for="t-change">What to change</label><textarea id="t-change" rows="2" aria-describedby="t-change-n"></textarea><span class="count" id="t-change-n" hidden></span>
        <button id="t-change-go" type="button">Send</button>
      </div>
    </div>
  </section>
  <p class="when" id="when" hidden></p>
  <p class="missing" id="missing" hidden></p>
  <div class="actions" id="main-actions">
    <button id="refresh" type="button">Refresh</button>
    <button id="check" type="button" class="second">Check connection</button>
  </div>
  <p class="status" id="status" role="status" aria-live="polite"></p>
  <details id="details" hidden><summary>Test details</summary><dl id="facts"></dl></details>
</main>
<script>
(() => {
  'use strict'
  const SKILL_CARDS = [{"name":"ask","title":"Ask","tagline":"Quick help with any task, using what your Brain knows","category":"daily","does":"Answers a question or does a small task using what your Brain already holds about you, your work and your past decisions, and names the files it used.","inputs":[{"id":"what","label":"What you need","type":"textarea","required":true,"placeholder":"Help me reply to a client who says our price is too high"}],"apps":["github"],"brain":"reads","sends_out":false,"runs":"chat"},{"name":"brutalist-image-generator","title":"Cover image","tagline":"A clean title image for a blog post, link preview or social post","category":"writing","does":"Makes a bold, text-first image with your title, for a blog post, a link preview or a social post, in your own look. It checks every word on the image and posts nothing.","inputs":[{"id":"kind","label":"What the image is for","type":"select","required":false,"options":["Link preview or blog (1200 x 630)","Social post (1080 x 1350)","Square (1080 x 1080)"]},{"id":"title","label":"Main text","type":"text","required":true,"placeholder":"Why your AI forgets everything"},{"id":"subtitle","label":"Second line","type":"text","required":false,"placeholder":"And the one file that fixes it"},{"id":"badge","label":"Small label","type":"text","required":false,"placeholder":"AI"},{"id":"style","label":"Style","type":"select","required":false,"options":["Minimal","Bold","Poster"]}],"apps":["github","images","files"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"content-generation","title":"Write a post with me","tagline":"Write a post, newsletter, thread or script with you, step by step","category":"writing","does":"Works through angle, hook, outline and final text with you, scores the result against a clear rubric, and keeps each finished piece in your Brain under its own name.","inputs":[{"id":"mode","label":"What you want","type":"select","required":false,"options":["Write something new","Score my draft","Turn a piece into other formats"]},{"id":"topic","label":"Topic and your take","type":"textarea","required":false,"placeholder":"e.g. Why small teams should write down decisions; I think most never do"},{"id":"platform","label":"Where it goes","type":"select","required":false,"options":["LinkedIn post","Newsletter","X thread","Video script"]},{"id":"audience","label":"Who reads it","type":"text","required":false,"placeholder":"e.g. founders of 5 to 20 person companies"},{"id":"material","label":"Your stories, data or draft","type":"textarea","required":false,"placeholder":"Paste examples, numbers or the draft to score"}],"apps":["github","web"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"creator-voice","title":"Check against my saved voice","tagline":"Checks a draft against the voice your Brain has saved, and fixes it","category":"writing","does":"Checks a post, email or other draft against how your Brain says you write: phrases you avoid, word choice, sentence shape, tone and detail. It quotes each problem, and can suggest the smallest rewrite.","inputs":[{"id":"content","label":"The draft to check","type":"textarea","required":true,"placeholder":"Paste the post, email or text"},{"id":"mode","label":"What to do","type":"select","required":false,"options":["Check it","Check it and suggest a rewrite","Add to my writing notes"]}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"decide","title":"Record a decision","tagline":"Keep a decision with its reasons, trade-off and review date","category":"daily","does":"Writes a dated decision record into your Brain: what you chose, over what, why, what you give up and when you will look at it again.","inputs":[{"id":"decision","label":"What you decided","type":"textarea","required":false,"placeholder":"e.g. We take only B2B clients until March"},{"id":"why","label":"Why","type":"textarea","required":false,"placeholder":"The main reason, in your words"},{"id":"alternatives","label":"What else you considered","type":"textarea","required":false,"placeholder":"e.g. Keep B2C too; hire a second person first"},{"id":"review_date","label":"When to look at it again","type":"date","required":false},{"id":"detail","label":"How much detail","type":"select","required":false,"options":["Short","Full"]}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"draft-email","title":"Draft email","tagline":"Write an email in your own voice, sent only when you say so","category":"daily","does":"Writes an email in your voice, sized and toned for the kind of email it is, using what your Brain and past emails say about the person. Nothing is sent until you approve the exact text.","inputs":[{"id":"to","label":"Who it is for","type":"text","required":true,"placeholder":"Name or email address, for example Sarah Lee"},{"id":"about","label":"What the email is about","type":"textarea","required":true,"placeholder":"For example: follow up on the proposal I sent last week"},{"id":"goal","label":"Who they are to you and what you want","type":"text","required":false,"placeholder":"For example: client, I want a yes to a call on Thursday"}],"apps":["github","gmail"],"brain":"reads","sends_out":true,"runs":"chat"},{"name":"email-response-orchestrator","title":"Answer my email","tagline":"Sort your unread email and draft replies you approve one by one","category":"daily","does":"Finds the emails that need an answer, skips newsletters and notifications, drafts each reply in your voice, and sends a reply only when you approve that exact text.","inputs":[{"id":"which","label":"Which emails","type":"text","required":false,"placeholder":"For example: unread from the last 3 days"},{"id":"limit","label":"At most how many","type":"select","required":false,"options":["5","10","20"]},{"id":"skip","label":"Senders or topics to leave alone","type":"textarea","required":false,"placeholder":"For example: anything from my bank, school newsletters"}],"apps":["github","gmail"],"brain":"reads","sends_out":true,"runs":"chat"},{"name":"eval-voice-match","title":"Compare with my past writing","tagline":"Sets a draft beside pieces you wrote and shows where it drifts","category":"quality","does":"Sets a draft beside pieces you wrote yourself, pasted or kept in your Brain, and shows where it differs, with the lines to fix. It is the AI's reading, not a score from a tool.","inputs":[{"id":"draft","label":"The draft to check","type":"textarea","required":true,"placeholder":"Paste the email, post or message"},{"id":"samples","label":"Some of your own writing","type":"textarea","required":false,"placeholder":"Paste two or three pieces you wrote and liked"}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"eval-workflow","title":"Check work against my rules","tagline":"Pass or fail on each of your rules for one finished piece of work","category":"quality","does":"Reads a finished piece of work and checks it against the rules your Brain holds for that kind of work, giving pass or fail for each rule and a verdict. It is the AI's reading, not a score.","inputs":[{"id":"work","label":"The work to check","type":"textarea","required":false,"placeholder":"Paste it, or name the file in your outputs folder"},{"id":"rules","label":"Extra rules for this check","type":"textarea","required":false,"placeholder":"For example: under 200 words, one clear ask, no prices"}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"evaluate-candidate","title":"Evaluate candidate","tagline":"Score a candidate profile against your vacancy","category":"hiring","does":"Scores a candidate's profile against the role you are filling, shows the evidence for each score, and drafts two outreach messages if they match. Nothing is sent.","inputs":[{"id":"vacancy","label":"Role you are filling","type":"text","required":false,"placeholder":"e.g. Senior backend engineer, Berlin"},{"id":"profile","label":"Candidate profile","type":"textarea","required":true,"placeholder":"Paste the profile text or CV"},{"id":"criteria","label":"Must-haves, if not in your Brain","type":"textarea","required":false,"placeholder":"e.g. 5+ years Go, can work from Berlin, led a team"}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"file-changes","title":"What changed","tagline":"The files changed in a pull request or between two branches","category":"projects","does":"Lists the files changed in a pull request, between two branches, or in a repository since a date, grouped by area, with what to do next. It changes nothing.","inputs":[{"id":"compare","label":"What to compare","type":"text","required":false,"placeholder":"A pull request link, two branches like main and new-pricing, or a date"},{"id":"repo","label":"Repository","type":"text","required":false,"placeholder":"For example: me/site"},{"id":"view","label":"How to show it","type":"select","required":false,"options":["Summary by area","Every file in detail","How to split into commits"]}],"apps":["github"],"brain":"reads","sends_out":false,"runs":"chat"},{"name":"first-week-onboarding","title":"First week onboarding","tagline":"Seven short days of real work that teach you your Second Brain","category":"coach","does":"A day-by-day first week on your own work: a quick win, finding things in your Brain, a first lesson, a better version and a look back. Your progress is kept in your Brain.","inputs":[{"id":"first_win","label":"A first piece of work to finish","type":"textarea","required":false,"placeholder":"A real task for this week that takes under an hour"},{"id":"day","label":"Day to do","type":"select","required":false,"options":["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"]}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"frontend-slides","title":"Slide deck","tagline":"A presentation that opens in any browser, from your notes","category":"writing","does":"Builds a slide deck as one web page that opens in any browser, from your notes or a PowerPoint you upload, in your own look. Every slide fits the screen with no scrolling.","inputs":[{"id":"purpose","label":"What the deck is for","type":"select","required":false,"options":["Pitch deck","Teaching","Conference talk","Internal presentation"]},{"id":"length","label":"How long","type":"select","required":false,"options":["Short (5 to 10 slides)","Medium (10 to 20 slides)","Long (20 or more slides)"]},{"id":"content","label":"Your notes, outline or topic","type":"textarea","required":false,"placeholder":"Paste your notes or outline, or upload a PowerPoint to this chat"},{"id":"style","label":"Look you want","type":"text","required":false,"placeholder":"Leave empty to use your usual look, or say: dark, editorial, playful"}],"apps":["github","files"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"full-cycle-auto","title":"Planned code change","tagline":"Plan, build and review a code change, with two yeses from you","category":"projects","does":"Plans a code change as a GitHub issue, makes it as a pull request, reads its checks, reviews it and lists what to fix. It asks you twice, before the issue and before the code, and never merges.","inputs":[{"id":"task","label":"The change","type":"textarea","required":true,"placeholder":"For example: let people sign up with Google as well as email"},{"id":"repo","label":"Repository","type":"text","required":false,"placeholder":"For example: me/site"},{"id":"issue","label":"Existing issue, if there is one","type":"text","required":false,"placeholder":"Link or number, for example #17"}],"apps":["github"],"brain":"reads","sends_out":true,"runs":"chat"},{"name":"full-cycle","title":"Big work, two sign-offs","tagline":"A big or high-stakes project, with your sign-off on plan and result","category":"projects","does":"Plans big work with its risks and the checks it must pass, waits for your yes, does it, tests it, waits for your yes again, then sorts what is open and offers to keep the plan and result.","inputs":[{"id":"task","label":"The project or result","type":"textarea","required":true,"placeholder":"A proposal for the Acme renewal, with pricing options and a timeline"},{"id":"project","label":"Plan to pick up","type":"text","required":false,"placeholder":"Leave empty for a new project, or name it, such as acme-renewal"},{"id":"deadline","label":"Deadline","type":"date","required":false}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"generate-pdf","title":"Make a PDF","tagline":"Turn a document into a clean PDF to share","category":"writing","does":"Lays out your text or a file from your Brain as a tidy PDF in your own look, ready to send. If this chat cannot make files, you get a print-ready page instead.","inputs":[{"id":"source","label":"What to turn into a PDF","type":"textarea","required":false,"placeholder":"Paste the text, or name the file, for example outputs/2026-11-02-proposal.md"},{"id":"title","label":"Title on the first page","type":"text","required":false,"placeholder":"Q1 proposal for Acme"}],"apps":["github","files","drive"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"grow","title":"How my Brain is growing","tagline":"See what your Brain holds and what it gained lately","category":"memory","does":"Counts what your Brain holds (facts, decisions, finished work, projects, your own skill changes), shows what was added in the last seven days, and points to what needs care, using only what the files show.","inputs":[],"apps":["github"],"brain":"reads","sends_out":false,"runs":"chat"},{"name":"idea","title":"Save an idea","tagline":"Capture an idea in seconds, sorted and kept in your Brain","category":"daily","does":"Adds your idea to the right ideas file in your Brain, with its category, priority and a few first steps, and tells you if you had a similar idea before.","inputs":[{"id":"idea","label":"Your idea","type":"textarea","required":true,"placeholder":"e.g. Offer a monthly review call to past clients"}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"import-ai-history","title":"Import past AI chats","tagline":"Keep what matters from your past ChatGPT, Claude or Gemini chats","category":"memory","does":"Walks you through exporting your past AI chats, reads the chats you pick, shows what is worth keeping and where, and saves only what you confirm. It never saves whole chats on its own.","inputs":[{"id":"platform","label":"Which AI the chats are from","type":"select","required":false,"options":["ChatGPT","Claude","Gemini","Not sure"]},{"id":"which","label":"Which chats to start with","type":"text","required":false,"placeholder":"For example: chats about pricing, or the 20 newest"}],"apps":["github","files","drive"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"import-content","title":"Import a link or file","tagline":"Bring a link, an uploaded file or pasted text into your Brain","category":"memory","does":"Works out what you gave it (a Drive link, a video, an AI chat export, a document or pasted text), reads it, shows what is worth keeping and where, and saves only what you confirm.","inputs":[{"id":"source","label":"Link or text to bring in","type":"textarea","required":false,"placeholder":"Paste a link or the text itself, or upload a file in the chat"}],"apps":["github","drive","files","web"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"import-from-drive","title":"Import from Drive","tagline":"Keep what matters from your Google Drive documents in your Brain","category":"memory","does":"Reads documents in a Drive folder you choose, shows what is worth keeping and where it would go, and saves only what you confirm. Documents brought in before are skipped.","inputs":[{"id":"folder","label":"Drive folder or document","type":"text","required":false,"placeholder":"A folder name or link, for example Client notes 2026"},{"id":"focus","label":"What to look for","type":"text","required":false,"placeholder":"For example: how I run projects, client facts, past decisions"}],"apps":["github","drive"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"import-from-video","title":"Import from video","tagline":"Keep what was said in a video, from its transcript","category":"memory","does":"Takes the transcript of a video, keeps a clean copy with its times if you want one, shows what is worth keeping and where, and saves only what you confirm.","inputs":[{"id":"video","label":"Video link or title","type":"text","required":false,"placeholder":"For example: https://youtu.be/... or My talk at the March meetup"},{"id":"transcript","label":"Transcript","type":"textarea","required":false,"placeholder":"Paste the transcript, or upload it as a file in the chat"}],"apps":["github","files","drive"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"import-memories","title":"Import what my AI knows","tagline":"Teach your Brain what ChatGPT or Claude already knows about you","category":"memory","does":"Reads what your other AI remembers about you, or the chats in your export that you pick, and proposes who you are, how you work and what you work on. You confirm each line before it is saved.","inputs":[{"id":"memories","label":"What your other AI remembers about you","type":"textarea","required":false,"placeholder":"Paste its saved memories or your custom instructions, or upload your export"}],"apps":["github","files","drive"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"learn","title":"Turn work into a pattern","tagline":"Turn what you just finished into a pattern your AI uses next time","category":"memory","does":"Asks a few short questions about work you just finished, then adds the lesson to your Brain as a new pattern or as one more example of a pattern you already had.","inputs":[{"id":"kind","label":"What you just finished","type":"select","required":false,"options":["Code or technical work","Client work","Content","Research or reading","Something else"]},{"id":"what","label":"What happened and what you learned","type":"textarea","required":false,"placeholder":"e.g. The import kept failing; dates were in two formats"}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"linkedin-carousel-pdf","title":"LinkedIn carousel","tagline":"Turn your points into a swipeable carousel PDF and its post","category":"writing","does":"Builds a 5 to 9 slide LinkedIn carousel from your points, laid out for phones, plus the post text to go with it. You post it yourself.","inputs":[{"id":"topic","label":"Topic","type":"text","required":true,"placeholder":"How I plan a week in 20 minutes"},{"id":"message","label":"The one thing readers should remember","type":"text","required":false,"placeholder":"Plan the week before the week plans you"},{"id":"points","label":"Your key points","type":"textarea","required":false,"placeholder":"One point per line, with any numbers or examples you have"},{"id":"kind","label":"Kind of carousel","type":"select","required":false,"options":["Tips","Case study","Research","Framework"]},{"id":"slides","label":"Number of slides","type":"select","required":false,"options":["5","7","8","9"]}],"apps":["github","files"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"my-workflow","title":"Task with a plan","tagline":"A task that needs a plan, kept in your Brain to pick up later","category":"projects","does":"Clears up what the task needs, makes a plan you agree to and keeps it in your Brain, does the steps, then checks the result against what you asked for. Next time, it picks up where the plan stands.","inputs":[{"id":"task","label":"What you want done","type":"textarea","required":true,"placeholder":"A one-page onboarding guide for new clients, based on how we ran the last three"},{"id":"project","label":"Plan to pick up","type":"text","required":false,"placeholder":"Leave empty for new work, or name it, such as client-guide"},{"id":"start","label":"How to start","type":"select","required":false,"options":["Ask me what is unclear first","Go straight to the plan"]}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"new-project","title":"New project","tagline":"Start a project with its goal and context in your Brain","category":"projects","does":"Makes one plan file for a new project in your Brain, with its goal, its context and room for its steps, so your AI can pick it up in any chat.","inputs":[{"id":"name","label":"Project name","type":"text","required":true,"placeholder":"For example: Acme website relaunch"},{"id":"goal","label":"What is true when it is done","type":"textarea","required":false,"placeholder":"For example: the new site is live and Acme has signed off"},{"id":"type","label":"Kind of project","type":"select","required":false,"options":["Client work","Internal","Content","Research","Personal"]},{"id":"context","label":"What to know about it","type":"textarea","required":false,"placeholder":"Deadline, people involved, tools, limits"}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"plan-my-day","title":"Plan my day","tagline":"The three things that matter most today, and why","category":"daily","does":"Looks at today's calendar, your open tasks and your plan, and suggests the three things that matter most today, each with one line on why.","inputs":[{"id":"extra","label":"Anything else on today","type":"textarea","required":false,"placeholder":"A deadline, an errand or a call that is not in your calendar"}],"apps":["github","calendar","gmail","notion","slack"],"brain":"reads","sends_out":false,"runs":"chat"},{"name":"plan-status","title":"Plan status","tagline":"See where a project's plan stands and what comes next","category":"projects","does":"Reads a project's plan in your Brain and shows what is done, what is next, what is blocked and why, and about how much time is left.","inputs":[{"id":"project","label":"Which project","type":"text","required":false,"placeholder":"Leave empty to see all your active projects"}],"apps":["github"],"brain":"reads","sends_out":false,"runs":"chat"},{"name":"plan","title":"Plan the steps","tagline":"Break a goal into small steps you can check off","category":"projects","does":"Turns a goal into five to seven small steps, each with what it makes and how to check it, and saves them in the project's plan in your Brain.","inputs":[{"id":"goal","label":"What you want done","type":"textarea","required":true,"placeholder":"For example: write and send the Acme proposal by Friday"},{"id":"project","label":"Which project","type":"text","required":false,"placeholder":"Leave empty to choose one or start a new one"}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"publish-blog","title":"Prepare a blog post","tagline":"A finished post in your voice, with title, link and summary ready","category":"writing","does":"Turns your draft or topic into a finished post in your voice, with its search title, web address and summary. It opens a pull request on your site only on your yes, and publishes nothing itself.","inputs":[{"id":"draft","label":"Your draft or the topic","type":"textarea","required":true,"placeholder":"Paste your draft, or write the topic and your main point"},{"id":"keyword","label":"What readers search for","type":"text","required":false,"placeholder":"For example: second brain for consultants"},{"id":"site_repo","label":"Your site's GitHub repository","type":"text","required":false,"placeholder":"Leave empty if your posts are not kept on GitHub"}],"apps":["github","web","images"],"brain":"writes","sends_out":true,"runs":"chat"},{"name":"quick-cycle","title":"Small code change","tagline":"A small change to a repository, made as a pull request and reviewed","category":"projects","does":"Makes a small change to a GitHub repository as a pull request, then reviews it. You see the exact change before anything is written, and nothing is merged.","inputs":[{"id":"task","label":"The small change","type":"textarea","required":true,"placeholder":"For example: fix the typo on the pricing page, or rename the Save button"},{"id":"repo","label":"Repository","type":"text","required":false,"placeholder":"For example: me/site"}],"apps":["github"],"brain":"reads","sends_out":true,"runs":"chat"},{"name":"recall","title":"Recall","tagline":"Find everything your Brain holds on a topic","category":"memory","does":"Looks through your Brain for a topic and shows what you know, what you decided and what you have done on it, with the file each part is in.","inputs":[{"id":"topic","label":"What to look for","type":"text","required":true,"placeholder":"For example: pricing, or a client's name"},{"id":"where","label":"Where to look","type":"select","required":false,"options":["Everywhere","Facts about my work","Decisions","Finished work","Projects"]}],"apps":["github"],"brain":"reads","sends_out":false,"runs":"chat"},{"name":"remove-ai-slop","title":"Remove AI slop","tagline":"Cleaner code or text, without the filler AI tends to add","category":"quality","does":"Finds AI filler in text you paste or in a pull request's changes, and shows the cleaner version line by line. A change to a file is made only on your yes.","inputs":[{"id":"pr","label":"Pull request","type":"text","required":false,"placeholder":"Link, or repository and number, for example me/site #42"},{"id":"text","label":"Or the text to clean","type":"textarea","required":false,"placeholder":"Paste the code or the writing"}],"apps":["github"],"brain":"reads","sends_out":true,"runs":"chat"},{"name":"review","title":"Review a pull request","tagline":"A careful code review of one pull request, with file and line","category":"projects","does":"Reads the changes in a pull request you name on GitHub and lists what to fix, each with the file and line. It changes no code and posts a review comment only on your yes.","inputs":[{"id":"pr","label":"Pull request","type":"text","required":false,"placeholder":"Link, or repository and number, for example me/site #42"},{"id":"focus","label":"Anything to look at closely","type":"text","required":false,"placeholder":"For example: the login change, or security only"}],"apps":["github"],"brain":"reads","sends_out":true,"runs":"chat"},{"name":"run-evals","title":"Test a quality check","tagline":"Runs one quality check five times to see if it can be trusted","category":"quality","does":"Runs one quality check five separate times on the same piece of work, each in a run that cannot see the others, and shows how far the scores spread, so you know whether the check can be trusted.","inputs":[{"id":"check","label":"Which check","type":"text","required":true,"placeholder":"The name of one of your quality checks"},{"id":"work","label":"The work to check","type":"textarea","required":false,"placeholder":"Paste it, or name its file in your Brain"}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"save-what-i-learned","title":"Save what I learned","tagline":"Keep a lesson, decision or preference for next time","category":"memory","does":"Writes a lesson, a decision or a preference into your Brain, so your AI knows it next time.","inputs":[{"id":"what","label":"What to keep","type":"textarea","required":false,"placeholder":"Type the lesson, choice or preference"}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"schedule-meeting","title":"Schedule meeting","tagline":"Turn a chat or a note into a calendar event you confirm first","category":"daily","does":"Reads a conversation, a screenshot or your own words, works out the meeting, shows you the event, and adds it to your calendar only on your yes, with the event link as proof.","inputs":[{"id":"details","label":"The meeting","type":"textarea","required":true,"placeholder":"Paste the conversation, or write: call with Sarah, Tuesday 2pm, Q2 plan"},{"id":"title","label":"Event title","type":"text","required":false,"placeholder":"Leave empty and one will be suggested"},{"id":"guests","label":"Guest email addresses","type":"text","required":false,"placeholder":"For example: sarah@example.com"},{"id":"duration","label":"How long","type":"select","required":false,"options":["30 minutes","60 minutes","90 minutes"]},{"id":"video","label":"Where it happens","type":"select","required":false,"options":["Video call link","In person","Phone","No location"]}],"apps":["github","calendar","gmail","files"],"brain":"reads","sends_out":true,"runs":"chat"},{"name":"schedule-placement","title":"Next step with a candidate","tagline":"See where a candidate stands and what to do next, with a draft","category":"hiring","does":"Finds a candidate's stage in your hiring pipeline, works out the next step and its date, drafts the message or agenda for it, and records the new stage in your Brain.","inputs":[{"id":"candidate","label":"Candidate name","type":"text","required":true,"placeholder":"e.g. Anna Kowalski"},{"id":"update","label":"What happened since last time","type":"textarea","required":false,"placeholder":"e.g. She replied yesterday and wants to talk next week"}],"apps":["github","gmail","calendar"],"brain":"writes","sends_out":true,"runs":"chat"},{"name":"second-brain-coach","title":"Second Brain coach","tagline":"Help using your Second Brain: which skill, how to ask, what to keep","category":"coach","does":"Helps you get more from your Second Brain: which of your skills fits a task, how to phrase a request, what is worth keeping, and what to do when a result is not right.","inputs":[{"id":"question","label":"What you need help with","type":"textarea","required":false,"placeholder":"Which skill should I use to write a LinkedIn post?"}],"apps":["github"],"brain":"reads","sends_out":false,"runs":"chat"},{"name":"send-outreach","title":"Send outreach","tagline":"Two short messages to a candidate about a vacancy","category":"hiring","does":"Drafts two short, personal messages to a candidate about a vacancy, using your voice and what your Brain knows about the role. You pick one, and it is sent only when you say yes.","inputs":[{"id":"candidate","label":"Candidate","type":"text","required":true,"placeholder":"Maria Lopez"},{"id":"vacancy","label":"Vacancy","type":"text","required":true,"placeholder":"Senior data engineer, Berlin"},{"id":"about","label":"What you know about them","type":"textarea","required":false,"placeholder":"Paste their profile, a link, or how you came across them"},{"id":"channel","label":"Where you will send it","type":"select","required":false,"options":["Email","LinkedIn message","Other"]}],"apps":["github","gmail","web"],"brain":"reads","sends_out":true,"runs":"chat"},{"name":"set-up-my-brain","title":"Set up my Brain","tagline":"Make the private place where your AI keeps what it knows","category":"memory","does":"Creates your Brain: a private GitHub repository that you own. It first learns you from your connected apps and what you paste, shows what it understood, and saves only what you confirm. Run it once, before any other skill.","inputs":[{"id":"name","label":"Name for your Brain","type":"text","required":false,"placeholder":"second-brain"},{"id":"about","label":"Who you are and what you do","type":"textarea","required":false,"placeholder":"Type your role and what you work on"},{"id":"how","label":"How you like work done","type":"textarea","required":false,"placeholder":"Type what your AI should always or never do"},{"id":"pasted","label":"What another AI knows about you","type":"textarea","required":false,"placeholder":"Paste its answer to: what do you know about me?"}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"setup-dictation","title":"Set up dictation","tagline":"Speak a thought into your Brain instead of typing it","category":"memory","does":"Checks that your chat app's voice input hears you well, and saves the names it mishears so your AI reads them right. Then you can speak a thought into your Brain instead of typing it.","inputs":[{"id":"device","label":"Where you speak","type":"select","required":false,"options":["Phone","Computer"]}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"simple-cycle","title":"Small task, start to finish","tagline":"One small piece of work, done in this chat from start to finish","category":"projects","does":"Takes one small task, such as a post, an email or a one-page summary, through a short checklist, the work and your review, then offers to keep the result and anything you taught it in your Brain.","inputs":[{"id":"task","label":"What you want done","type":"textarea","required":true,"placeholder":"A LinkedIn post about last week's client workshop, for founders, under 150 words"}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"step","title":"Do the next step","tagline":"Do one step of a project's plan and mark where it stands","category":"projects","does":"Finds the next step in a project's plan, does it with your Brain and connected apps, checks it, and marks it done or blocked in the plan, so you always know where you are.","inputs":[{"id":"project","label":"Which project","type":"text","required":false,"placeholder":"Leave empty when you have one active project"}],"apps":["github","gmail","calendar","drive","web","files"],"brain":"writes","sends_out":true,"runs":"chat"},{"name":"switch","title":"Switch project","tagline":"Pick up a project where you left it","category":"projects","does":"Loads a project's plan, what your Brain knows that bears on it and what was done last, and suggests the next step, so you can start without catching up.","inputs":[{"id":"project","label":"Which project","type":"text","required":false,"placeholder":"Leave empty to choose from your projects"}],"apps":["github"],"brain":"reads","sends_out":false,"runs":"chat"},{"name":"tldr","title":"TL;DR","tagline":"Anything long, as the few lines that matter","category":"daily","does":"Turns a contract, report, email thread or wordy paragraph into one line and the minute that matters: what is asked of you, what is easy to miss and what it leaves unsaid. Every line shows the words it rests on.","inputs":[{"id":"what","label":"What to shorten","type":"textarea","required":false,"placeholder":"Paste the text, or say which email thread or file to use"},{"id":"who","label":"For","type":"select","required":false,"options":["me","my manager","the board","a client","the team"]},{"id":"language","label":"Language","type":"select","required":false,"options":["English","Polish","German","French","Spanish"]},{"id":"focus","label":"Focus on","type":"text","required":false,"placeholder":"For example: what I have to pay and by when"}],"apps":["github","files","web","gmail","drive"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"validate","title":"Read a pull request's checks","tagline":"What passed and what failed on a pull request, from GitHub itself","category":"projects","does":"Reads the check results GitHub holds for a pull request you name and says what passed, what failed and why, and whether it is ready to merge. It runs nothing itself.","inputs":[{"id":"pr","label":"Pull request","type":"text","required":false,"placeholder":"Link, or repository and number, for example me/site #42"}],"apps":["github"],"brain":"reads","sends_out":false,"runs":"chat"},{"name":"wake-up","title":"Learn how I write","tagline":"Learns your voice from your own writing and writes a sample post","category":"writing","does":"Reads writing you give it or point to, describes how you write (openings, sentence length, phrases you use and avoid, tone), writes one sample post in that voice, and saves the description on your yes.","inputs":[{"id":"samples","label":"Some of your own writing","type":"textarea","required":false,"placeholder":"Paste three to ten posts, emails or newsletter pieces you wrote"},{"id":"where","label":"Where more of your writing is","type":"text","required":false,"placeholder":"For example: my Drive folder Posts, or my newsletter link"},{"id":"topic","label":"Topic for the sample post","type":"text","required":false,"placeholder":"Leave empty to use what you write about most"}],"apps":["github","drive","gmail","web","files"],"brain":"writes","sends_out":false,"runs":"chat"},{"name":"work","title":"Work through the plan","tagline":"Carry out a project's plan, saving where it stands after each step","category":"projects","does":"Does the open steps of a project's plan one after another, checks each, and marks it in the plan as it goes, so a cut-off chat loses nothing. Then it gathers the finished work for you to keep.","inputs":[{"id":"project","label":"Which project","type":"text","required":false,"placeholder":"Leave empty when you have one active project"},{"id":"until","label":"How far to go","type":"select","required":false,"options":["Until the plan is done","The next three steps","Until a step needs me"]}],"apps":["github","gmail","calendar","drive","web","files"],"brain":"writes","sends_out":true,"runs":"chat"},{"name":"write-like-me","title":"Write like me","tagline":"A short draft in your own voice, for you to check","category":"writing","does":"Drafts an email, message or post in your own words and at your level of formality, and lists what it assumed. It sends nothing.","inputs":[{"id":"what","label":"What to write","type":"textarea","required":false,"placeholder":"A reply to Anna saying yes to Tuesday, and asking for the agenda"},{"id":"reader","label":"Who reads it","type":"text","required":false,"placeholder":"A client I have met twice"},{"id":"examples","label":"Examples of your writing","type":"textarea","required":false,"placeholder":"Paste two or three messages you wrote and liked"}],"apps":["github"],"brain":"writes","sends_out":false,"runs":"chat"}]
  // The product in one list, the same one the computer's dashboard reads (shared/brain/product.mjs): the tabs, the
  // full-plan features and their locked words, what to schedule first, the stages of a relationship, the skill groups.
  const PRODUCT = {"tabs":[["today","Today"],["scheduled","Scheduled"],["tasks","Tasks"],["relationships","Relationships"],["skills","Skills"],["brain","Brain"],["company","Company"]],"features":[{"id":"today","plan":"base","title":"Today","tab":"today"},{"id":"tasks","plan":"base","title":"Tasks","tab":"tasks"},{"id":"routines","plan":"base","title":"Scheduled","tab":"scheduled"},{"id":"people","plan":"base","title":"People","tab":"company"},{"id":"work","plan":"base","title":"Projects","tab":"brain"},{"id":"agent","plan":"base","title":"The company agent","tab":"company"},{"id":"crm","plan":"base","title":"CRM","tab":"relationships"},{"id":"focus","plan":"base","title":"What needs you","tab":"today"},{"id":"jobs","plan":"base","title":"Prepared work","tab":"tasks"},{"id":"skills","plan":"base","title":"Skills","tab":"skills"},{"id":"library","plan":"base","title":"Skill library","tab":"skills"},{"id":"brain","plan":"base","title":"Brain updates","tab":"company"},{"id":"memory","plan":"base","title":"Memory","tab":"brain"},{"id":"system","plan":"base","title":"Your system","tab":"today"},{"id":"objectives","plan":"full","title":"Objectives","tab":"tasks"},{"id":"history","plan":"full","title":"History","tab":null},{"id":"access","plan":"full","title":"Team access","tab":null},{"id":"world","plan":"full","title":"3D view","tab":null},{"id":"updates","plan":"full","title":"Past updates","tab":null},{"id":"videos","plan":"full","title":"Video library","tab":null},{"id":"sites","plan":"full","title":"Sites","tab":null},{"id":"business","plan":"full","title":"Business","tab":null},{"id":"content","plan":"full","title":"Content","tab":null}],"locked":{"objectives":{"title":"Objectives","say":"Give your AI a goal, and watch it work towards it."},"business":{"title":"Business","say":"How the organisation is doing, read from the systems that already hold the numbers."},"content":{"title":"Content","say":"Your posts, newsletters and pages, from the first idea to what happened after publishing."},"access":{"title":"Team access","say":"Who can see and change what, in one place."},"updates":{"title":"Past updates","say":"Every daily and weekly team update, kept and easy to find."},"history":{"title":"History","say":"What changed across your work, day by day."},"videos":{"title":"Video library","say":"Short films that explain your work, in one place."},"sites":{"title":"Sites","say":"Every page your team has shared, each with its own address and password."},"world":{"title":"3D view","say":"Your team’s work as a place you can walk around."}},"scheduled":{"name":"Scheduled","suggested":[["What’s new this morning","Every weekday at 8:30 AM","Look through my connected apps (email, calendar, chat and tasks, where connected) for what changed since the last working day. Tell me the three things that matter most, each with where it came from."],["Plan the week","Mondays at 8:30 AM","From my connected apps, plan my week: what is due, what is waiting on me and what has gone quiet. Give me one short list by day."],["Close the week","Fridays at 4 PM","From my connected apps, list what I finished this week and what I left open. Name anything worth remembering, for me to save."]]},"stages":[{"id":"new","label":"New"},{"id":"talking","label":"Talking"},{"id":"proposal","label":"Proposal"},{"id":"active","label":"Working together"}],"categories":[["daily","Every day"],["memory","Memory and what you've learned"],["projects","Plans and projects"],["writing","Writing and publishing"],["quality","Checking quality"],["hiring","Hiring and placement"],["coach","Getting the most from it"]],"priorities":[{"id":"now","label":"Now"},{"id":"soon","label":"Soon"},{"id":"later","label":"Later"}],"states":[{"id":"open","label":"To do"},{"id":"doing","label":"Doing"},{"id":"done","label":"Done"}],"changes":[{"date":"2026-11-18","text":"A to-do list or a relationships list longer than 50 offers the rest, and anything due comes first."},{"date":"2026-11-18","text":"Make my first result shows on a Brain that was just set up."},{"date":"2026-11-17","text":"Your to-do list and your relationships are on the dashboard, kept in your Brain."},{"date":"2026-11-17","text":"A Company tab shows your company's shared Brain: who looks after it, open suggestions, and a question answered from it."},{"date":"2026-11-17","text":"Skills you made yourself are listed under Yours, and a finished task can become a skill."},{"date":"2026-11-17","text":"Today shows your first result, your connected apps and what needs you from your to-dos and relationships."},{"date":"2026-11-16","text":"Start a task on the dashboard, follow its steps and keep the result in your Brain."},{"date":"2026-11-16","text":"Scheduled work: see it, add it, pause it, run it now and delete it."}]}
  const host = window.parent
  const $ = (id) => document.getElementById(id)
  const facts = {}
  const fact = (k, v) => { facts[k] = v; $('facts').replaceChildren(...Object.entries(facts).flatMap(([a, b]) => { const dt = document.createElement('dt'), dd = document.createElement('dd'); dt.textContent = a; dd.textContent = b; return [dt, dd] })) }
  const SOURCES = [['email_threads_24h', 'Email', 'last 24 hours'], ['calendar_events_7d', 'Calendar', 'next 7 days'], ['github_open_issues', 'GitHub issues', 'open'], ['github_open_prs', 'Pull requests', 'open']]
  // On a company's own connector the person needs no GitHub, so their counts leave GitHub out.
  const sourcesFor = (d) => (d && d.reads === 'connector' ? SOURCES.filter(([k]) => !k.startsWith('github_')) : SOURCES)
  const STATE = { paused: 'Paused', ended: 'Ended' }
  const SUGGESTED = PRODUCT.scheduled.suggested
  const same = (t) => String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
  const TASK_STATE = { working: 'Working', question: 'Needs you', done: 'Done', failed: 'Failed' }
  const MARK = { done: '✓', doing: '▸', todo: '○', failed: '✕' }
  const SAID = { done: ' (done)', doing: ' (in progress)', todo: ' (not started)', failed: ' (could not be done)' }
  const TABS = PRODUCT.tabs.map(([id]) => id)
  for (const [id, label] of PRODUCT.tabs) $('tab-' + id).textContent = label
  // confirming names the scheduled task whose Delete was pressed once, until new data arrives; newer is true once a later card shows the same task.
  // answered names the question card the person answered, which stays answered for as long as the card is there.
  let ctx = {}, data = null, opened = null, shown = 'today', confirming = null, dropping = null, newer = false, answered = null
  // Refresh and Check connection read the counts and the scheduled tasks, so they stay with those two tabs.
  const bar = () => { $('main-actions').hidden = !!(data && data.task) || !['today', 'scheduled'].includes(shown) }
  const tab = (name) => { shown = name; for (const n of TABS) { $(n).hidden = n !== name || !!(data && data.task); $('tab-' + n).setAttribute('aria-selected', String(n === name)) } bar() }
  for (const n of TABS) $('tab-' + n).addEventListener('click', () => tab(n))
  // How long each refresh took, by its request id: measured once, on this device's clock, when its answer arrived here.
  const took = {}
  const askedAt = (d) => (typeof d.request === 'string' && /^R[0-9a-z]+$/.test(d.request) ? parseInt(d.request.slice(1), 36) : null)

  // JSON-RPC over postMessage, the MCP Apps transport (specification 2026-01-26).
  let nextId = 1, ready = Promise.resolve()
  const pending = new Map()
  const send = (m) => host.postMessage({ jsonrpc: '2.0', ...m }, '*')
  const request = (method, params, ms = 60000) => new Promise((resolve, reject) => {
    const id = nextId++
    pending.set(id, { resolve, reject })
    send({ id, method, params })
    setTimeout(() => { if (pending.delete(id)) reject(new Error('no answer from the app')) }, ms)
  })
  const notify = (method, params) => send({ method, params })
  addEventListener('message', (e) => {
    const m = e.data
    if (e.source !== host || !m || m.jsonrpc !== '2.0') return
    if (!m.method && pending.has(m.id)) {
      const p = pending.get(m.id)
      pending.delete(m.id)
      return m.error ? p.reject(new Error(m.error.message || 'refused')) : p.resolve(m.result)
    }
    if (m.method === 'ui/notifications/tool-result') return show(m.params && m.params.structuredContent, 'tool result')
    if (m.method === 'ui/notifications/host-context-changed') return applyContext(m.params)
    if (m.method === 'ui/notifications/tool-input') return fact('Tool input', JSON.stringify((m.params && m.params.arguments) || {}))
    if (m.id !== undefined && (m.method === 'ui/resource-teardown' || m.method === 'ping')) return send({ id: m.id, result: {} })
  })

  function applyContext(c) {
    ctx = { ...ctx, ...(c || {}) }
    if (ctx.theme) document.documentElement.dataset.theme = ctx.theme
    const vars = (ctx.styles && ctx.styles.variables) || {}
    const map = { '--color-background-primary': '--paper', '--color-text-primary': '--ink', '--color-text-secondary': '--muted', '--color-background-secondary': '--beige', '--font-sans': '--sans', '--font-mono': '--mono' }
    for (const [from, to] of Object.entries(map)) if (vars[from]) document.documentElement.style.setProperty(to, vars[from])
    if (ctx.platform) fact('Surface', ctx.platform)
    if (data) render()
  }

  // The host's locale and time zone where they work, the browser's own where the host sends one that does not.
  const local = (make) => { for (const [locale, timeZone] of [[ctx.locale, ctx.timeZone], [undefined, ctx.timeZone], [ctx.locale, undefined], [undefined, undefined]]) { try { return make(locale || undefined, timeZone || undefined) } catch {} } return '' }
  const when = (ms, o) => local((l, timeZone) => new Date(ms).toLocaleString(l, { ...o, timeZone }))
  const time = (ms) => when(ms, { hour: '2-digit', minute: '2-digit' })
  const day = (ms) => when(ms, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  // A card's time, with its date when it is not from today where the person is.
  const cardTime = (ms) => { const date = { year: 'numeric', month: 'numeric', day: 'numeric' }; return when(ms, date) === when(Date.now(), date) ? time(ms) : day(ms) }
  const number = (x, o) => local((l) => new Intl.NumberFormat(l, o).format(x))
  const secs = (ms) => (ms < 10000 ? (ms / 1000).toFixed(1) : Math.round(ms / 1000)) + ' s'

  function show(d, via) {
    if (!d || typeof d !== 'object') return
    data = d
    const asked = askedAt(d)
    // An answer shown again later, when the chat is reopened, says nothing about how long the refresh took.
    if (asked && d.counts && !(d.request in took)) { const ms = Date.now() - asked; took[d.request] = ms >= 0 && ms < 180000 ? ms : null }
    if (d.counts || d.scheduled || d.task || d.brain) $('status').textContent = ''
    if (d.brain) keepBrain(d.brain, d.at)
    newer = false
    confirming = null
    dropping = null
    // The answer to "Schedule it" opens on the scheduled tasks, once: the person's own choice of tab stays after that.
    // A Brain read that came without its request id still opens on the Brain tab. A read asked for from the to-do
    // list, the relationships or the Company tab opens there.
    const key = typeof d.request === 'string' ? d.request : d.brain ? 'B' + d.at : null
    if (key && key !== opened) { opened = key; const to = { A: 'scheduled', B: 'brain', K: 'tasks', C: 'relationships', O: 'company' }[key[0]]; if (to) tab(to) }
    fact('Data from', via)
    render()
    announce()
  }

  // Each step of a task arrives as a card of its own. Where the app lets its cards hear each other, an earlier card of
  // the same task folds to its title once a later one shows, so the person reads one card. Where it does not, every
  // card stays as it was.
  let cards = null, heard = null
  const announce = () => {
    const t = data && data.task, name = t && t.fold ? 'second-brain-task-' + t.fold : null
    // The channel is named by a secret the connector gives only to this person's cards of this task, so nothing else
    // in the app can tell a card to fold.
    if (name !== heard) {
      if (cards) cards.close()
      cards = null
      heard = name
      try { if (name) cards = new BroadcastChannel(name) } catch {}
      if (cards) cards.onmessage = (e) => {
        const m = e.data, now = data && data.task
        if (!m || !now || m.task !== now.id || !Number.isFinite(m.at) || m.at > Date.now() + 60000) return
        // A follow-up that arrived cut started nothing: the card it came from stays, and can ask again.
        if (m.cut) { if (m.at > data.at && now.state !== 'question' && isAnswered()) { keep(cardOf(), false); answered = null; render() } return }
        if (m.at > data.at && !newer) { newer = true; render() } else if (m.at < data.at) cards.postMessage(cardSays())
      }
    }
    if (cards) cards.postMessage(cardSays())
  }
  const cardSays = () => { const t = data.task; return { task: t.id, at: data.at, ...(t.cut && t.state === 'failed' ? { cut: true } : {}) } }

  function render() {
    const d = data
    const T = d.task || null
    const at = T && T.steps.findIndex((s) => s.state !== 'done' && s.state !== 'failed')
    $('product').textContent = T ? T.title : d.product || 'Your brain'
    // A card names its time, so the latest one is the one with the latest time, wherever the earlier ones stay.
    const now = !T ? '' : T.state === 'working' && T.steps.length ? \`Step \${(at < 0 ? T.steps.length : at + 1)} of \${T.steps.length}\` : T.state === 'question' && isAnswered() ? 'Answered' : T.state === 'done' && T.partial ? 'Done, with gaps' : TASK_STATE[T.state]
    $('plan').textContent = T ? now + (d.at ? \` · \${cardTime(d.at)}\` : '') : d.plan_name || d.plan || ''
    document.querySelector('.tabs').hidden = !!T
    bar()
    renderSkills(d.skills)
    renderBrain()
    renderRecords()
    renderCompany()
    renderNeeds()
    renderToday()
    for (const n of TABS) $(n).hidden = n !== shown || !!T
    $('task').hidden = !T || newer
    if (T) renderTask(T)
    const c = d.counts || {}
    const off = new Set((d.unavailable || []).map((u) => u.source))
    $('counts').replaceChildren(...sourcesFor(d).map(([key, name, span]) => {
      const tile = document.createElement('div'), num = document.createElement('span'), label = document.createElement('span')
      const has = Number.isInteger(c[key])
      tile.className = 'tile' + (has ? '' : ' off')
      num.className = 'num'
      // A count too long for its tile is shortened (1.2M), with the whole number on hover.
      num.textContent = has ? (c[key] >= 100000 ? number(c[key], { notation: 'compact', maximumFractionDigits: 1 }) : number(c[key])) : '–'
      if (has && c[key] >= 100000) tile.title = number(c[key])
      label.className = 'label'
      label.textContent = \`\${name}, \${span}\`
      tile.append(num, label)
      if (!has && off.has(key)) tile.title = (d.unavailable.find((u) => u.source === key) || {}).reason || ''
      return tile
    }))
    const ms = took[d.request]
    if (d.at && (d.counts || d.scheduled)) {
      $('when').hidden = false
      $('when').textContent = \`Updated \${time(d.at)}\` + (Number.isFinite(ms) ? \`, \${secs(ms)} after Refresh\` : '')
      if (Number.isFinite(ms)) fact('Refresh to answer', secs(ms))
    } else $('when').hidden = true
    $('details').hidden = !d.details
    const R = Array.isArray(d.scheduled) ? d.scheduled : null
    const partial = !!R && d.scheduled_complete === false
    $('list').replaceChildren(...(R ? (R.length ? R : partial ? [] : [{ title: 'None scheduled.', none: true }]) : []).map((r, i) => {
      const li = document.createElement('li'), title = document.createElement('span'), meta = document.createElement('span')
      title.className = 'r-title'
      title.textContent = r.title
      meta.className = 'r-meta'
      const last = r.last_result === 'running' ? 'Running now' : r.last_run ? \`Last \${day(Date.parse(r.last_run))}\${r.last_result === 'failed' ? ', failed' : ''}\` : r.last_result === 'failed' ? 'Last run failed' : ''
      meta.textContent = [r.schedule, STATE[r.state], r.next_run && \`Next \${day(Date.parse(r.next_run))}\`, last].filter(Boolean).join(' · ')
      li.append(title, ...(meta.textContent ? [meta] : []))
      if (r.none) return li
      // What the person can do with it: the page asks their AI, which uses its own app's scheduler.
      // The page speaks in the chat as the person, so it repeats nothing an AI wrote: a scheduled task is named by the
      // scheduler's own id, and one that came without an id can't be acted on from here.
      if (!r.id) return li
      const row = document.createElement('div'), named = \`my scheduled task with id \${r.id}\`
      const does = (label, wants, waiting) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.addEventListener('click', () => { confirming = null; ask(b, \`\${wants} with this app's own scheduler. If this app can't, tell me in one line. Then: \${refreshText('A' + Date.now().toString(36))}\`, waiting, 'Ask for it in the chat.') }); return b }
      row.className = 'row'
      // Delete is confirmed for the scheduled task itself, never for whichever one stands in its place by then.
      if (confirming === r.id) {
        const keep = document.createElement('button'); keep.type = 'button'; keep.textContent = 'Keep'; keep.addEventListener('click', () => { confirming = null; render() })
        row.append(does('Delete for good', \`Delete \${named} for good\`, 'Asked your AI to delete it.'), keep)
      } else {
        const del = document.createElement('button'); del.type = 'button'; del.textContent = 'Delete'; del.addEventListener('click', () => { confirming = r.id; render() })
        if (r.state === 'paused') row.append(does('Resume', \`Resume \${named}\`, 'Asked your AI to resume it.'))
        else if (r.state !== 'ended') row.append(does('Pause', \`Pause \${named}\`, 'Asked your AI to pause it.'))
        if (r.state !== 'ended') row.append(does('Run now', \`Run \${named} once now\`, 'Asked your AI to run it now.'))
        row.append(del)
      }
      li.append(row)
      return li
    }))
    // Three to start from: one fills the form below, so the person sees and can change it before it is scheduled.
    const have = new Set((R || []).map((r) => same(r.title)))
    const offers = SUGGESTED.filter(([title]) => !have.has(same(title)))
    $('suggest').hidden = !offers.length
    $('suggest-list').replaceChildren(...offers.map(([title, when, what]) => {
      const li = document.createElement('li'), name = document.createElement('span'), meta = document.createElement('span'), row = document.createElement('div'), b = document.createElement('button')
      name.className = 'r-title'; name.textContent = title
      meta.className = 'r-meta'; meta.textContent = when
      row.className = 'row'; b.type = 'button'; b.textContent = 'Use this'
      b.addEventListener('click', () => { [['r-title', title], ['r-when', when], ['r-what', what]].forEach(([id, v]) => { $(id).value = v; counter(id) }); $('add-go').focus() })
      row.append(b); li.append(name, meta, row)
      return li
    }))
    $('partial').hidden = !(R ? partial : (d.request || d.counts) && !off.has('scheduled'))
    $('partial').textContent = R ? 'Your AI could not read the full list.' : 'Your AI did not read what is scheduled.'
    if (R) fact('Scheduled shown', String(R.length))
    const missing = (d.unavailable || []).map((u) => \`\${(SOURCES.find(([k]) => k === u.source) || [, u.source === 'scheduled' ? PRODUCT.scheduled.name : u.source])[1]}: \${u.reason || 'not reachable'}\`)
    $('missing').hidden = !missing.length
    $('missing').textContent = missing.join(' · ')
  }

  // A task as the AI last reported it: its steps, the one question it waits on, and what came of it.
  function renderTask(T) {
    $('t-steps').replaceChildren(...T.steps.map((s) => {
      const li = document.createElement('li'), mark = document.createElement('span'), label = document.createElement('span'), said = document.createElement('span')
      li.className = s.state
      mark.className = 'mark'
      mark.setAttribute('aria-hidden', 'true')
      mark.textContent = MARK[s.state]
      label.textContent = s.label
      said.className = 'sr'
      said.textContent = SAID[s.state]
      label.append(said)
      if (s.note) { const note = document.createElement('span'); note.className = 'note'; note.textContent = s.note; label.append(note) }
      li.append(mark, label)
      return li
    }))
    const q = T.question
    $('t-q').hidden = !q
    if (q) {
      $('t-cut').hidden = !T.cut
      $('t-shows').hidden = !q.shows
      $('t-shows').textContent = q.shows || ''
      $('t-q-text').textContent = q.text
      // An option is answered by its number: the page never repeats in the chat, as the person, words the AI wrote.
      $('t-opts').replaceChildren(...q.options.map((o, i) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'second'; b.textContent = o; b.disabled = isAnswered(); b.addEventListener('click', () => answer(\`option \${i + 1} of your question\`)); return b }))
      $('t-send').disabled = isAnswered()
    }
    // What was not done and what to check come before the result, so a long result never hides them.
    for (const [id, items] of [['t-gaps', T.gaps], ['t-checks', T.checks]]) {
      const l = Array.isArray(items) ? items : []
      $(id).hidden = !l.length
      $(id).querySelector('ul').replaceChildren(...l.map((x) => { const li = document.createElement('li'); li.textContent = x; return li }))
    }
    $('t-result').hidden = !T.result
    $('t-result').textContent = T.result
    $('t-result').className = T.state === 'failed' ? 'bad' : ''
    $('t-links').replaceChildren(...T.links.map((l) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'second'; b.textContent = l.label; b.addEventListener('click', () => openLink(l.url)); return b }))
    // What can follow a finished task, once per card: the next card of the same task takes its place.
    const done = T.state === 'done', failed = T.state === 'failed', sent = isAnswered()
    const filed = T.links.some((l) => OUTPUT.test(l.url))
    $('t-differs').hidden = !(done && filed && chosen(T) && chosen(T) !== markOf(T.result))
    $('t-next').hidden = !done && !(failed && !T.cut)
    $('t-keep').hidden = !done || !T.result || !(Array.isArray(data.skills) && data.skills.length) || filed
    $('t-alter').hidden = !done
    // Done with gaps can try what was left, not only a failed task: real models end a task with a miss as done with gaps.
    $('t-again').hidden = !failed && !(done && T.partial)
    $('t-again').textContent = failed ? 'Try again' : 'Try what was not done'
    $('t-skill').hidden = !done || !T.result || !hasPlan()
    if (!done || sent) { $('t-change-part').hidden = true; $('t-alter').setAttribute('aria-expanded', 'false') }
    for (const id of ['t-keep', 't-alter', 't-again', 't-skill', 't-change-go']) $(id).disabled = sent
  }
  // Opens what the AI made, through the app: the page itself may open nothing.
  const openLink = async (url) => {
    try {
      if (!/^https:\\/\\//.test(url)) throw new Error('not a safe link')
      if (window.openai && typeof window.openai.openExternal === 'function') return await window.openai.openExternal({ href: url })
      const r = await request('ui/open-link', { url }, 15000)
      if (r && r.isError) throw new Error('refused')
    } catch (err) { $('status').textContent = \`Couldn't open it (\${err.message}): \${url}\` }
  }
  // The person's words exactly as they wrote them: only their line ends made one kind, and the two ends trimmed.
  const norm = (v) => v.replace(/\\r\\n?/g, '\\n').trim()
  // What fits in each field, in characters as the connector counts them. Nothing is cut: past its limit a field sends
  // nothing and keeps every word, and its count shows from 80% of the way.
  const FITS = { 't-what': 4000, 't-answer': 2000, 't-change': 2000, 'r-what': 2000, 'r-title': 80, 'r-when': 200, 'todo-title': 120, 'rel-org': 80, 'rel-person': 40, 'rel-role': 80, 'co-ask': 2000, 'co-suggest': 2000 }
  const length = (id) => [...norm($(id).value)].length
  const counter = (id) => { const c = $(id + '-n'), len = length(id), max = FITS[id]; c.hidden = len <= max * 0.8; c.textContent = \`\${number(len)} / \${number(max)}\`; c.classList.toggle('over', len > max) }
  for (const id of Object.keys(FITS)) $(id).addEventListener('input', () => counter(id))
  const tooLong = (id) => {
    const len = length(id)
    if (len <= FITS[id]) return false
    $('status').textContent = \`That is \${number(len)} characters and \${number(FITS[id])} fit. Shorten it: nothing was sent.\`
    counter(id)
    $(id).focus()
    return true
  }
  // Our rules go first and the person's own words last, then a mark: a message cut on the way has lost its mark, and
  // the AI is told not to act on it.
  const endsWith = (mark, cut) => \`This message ends with the exact mark \${mark}. If it does not, it was cut off on the way: do not act on it; \${cut}.\`
  const taskRules = (id, mark, answer) => \`\${endsWith(mark, \`call show_task with task "\${id}" and whole false\${answer ? ' and your question again' : ''}, then stop\`)} Otherwise pass whole true. Show your work on my dashboard, not in the chat: call show_task with task "\${id}", a short title and every step with its state, before you start and again after each step. Before you ask me anything, look for the answer in my connected apps. When you still need an answer from me, call show_task with state question, one question and up to 4 options; when I must approve or choose from something, such as an email draft or an event, also pass it under shows, whole and exactly as it would be sent or saved; then stop: my answer comes from the dashboard. Mark a step done only when it worked; when it could not be done, mark it failed with a short note and list it under gaps. An app that is not connected fails only the steps that need it: do the rest. Say only what a source confirms. What you write yourself, such as a draft, a summary or a plan, is the result: give it in full under result, whether or not you could save it anywhere. Say something was saved, sent, created or changed in one of my apps only when a tool confirmed it, and give the link or id it returned; otherwise say it was not done and list it under gaps. Under checks put every rule I gave for using the result, above all what must not be done with it (such as do not send it, or review it first), and everything I must still check before relying on it: at most 8, each under 200 characters, joining related ones rather than dropping one. The steps of the task itself do not go there. Keep the result to at most 450 words: over 4,000 characters it is refused, never cut. When every step is done or failed, call show_task with state done and what you did, with a link a tool returned for what you made when there is one. If it can't be done, call show_task with state failed and why. Never stop while the dashboard still shows the task as working. Write no more than one short line in the chat.\`
  // What the person chose to keep, as a mark of its text and never the text: when the card that follows a keep holds
  // another text beside the saved file's link, it says so. Real models added a line, and once saved a text the card had not held.
  const OUTPUT = /^https:\\/\\/github\\.com\\/[^/]+\\/[^/]+\\/blob\\/.+\\/outputs\\//, KEEPING = 'second-brain-keeping ', marks = new Map()
  const markOf = (s) => { let h = 5381, n = 0; for (const c of String(s)) { h = (h * 33 ^ c.codePointAt(0)) >>> 0; n++ } return \`\${n}.\${h}\` }
  const chose = (T) => { const k = T.fold || T.id, m = markOf(T.result); marks.set(k, m); try { localStorage.setItem(KEEPING + k, m) } catch {} }
  const chosen = (T) => { const k = T.fold || T.id; try { return localStorage.getItem(KEEPING + k) || marks.get(k) || null } catch { return marks.get(k) || null } }
  // The question card the person answered is this task's report at this time. It is kept where the host lets the page
  // keep anything, so the card still says Answered when the host shows it again; a frame that may keep nothing throws,
  // and then only this page's memory has it.
  const cardOf = () => (data && data.task ? \`\${data.task.fold || data.task.id} \${data.at}\` : null)
  const KEPT = 'second-brain-answered '
  const keep = (key, on) => {
    try { if (on) localStorage.setItem(KEPT + key, '1'); else localStorage.removeItem(KEPT + key) } catch {}
    try { if (window.openai && typeof window.openai.setWidgetState === 'function') window.openai.setWidgetState({ ...(window.openai.widgetState || {}), answered: on ? key : null }) } catch {}
  }
  const isAnswered = () => {
    const key = cardOf()
    if (!key) return false
    if (answered === key) return true
    try { if (localStorage.getItem(KEPT + key)) return true } catch {}
    try { return !!(window.openai && window.openai.widgetState && window.openai.widgetState.answered === key) } catch { return false }
  }
  async function answer(text, typed) {
    const T = data.task
    if (!text || isAnswered()) return
    answered = cardOf()
    keep(answered, true)
    render()
    $('status').textContent = 'Sent to your AI.'
    const mark = \`(end of answer \${T.id})\`
    try {
      fact('Asked through', await say(\`My answer for task \${T.id} is at the end of this message. Carry on from there. \${taskRules(T.id, mark, true)}\\nMy answer:\\n\${text}\\n\${mark}\`))
      if (typed) { $('t-answer').value = ''; counter('t-answer') }
    } catch (err) {
      keep(answered, false)
      answered = null
      render()
      $('status').textContent = \`Couldn't reach your AI (\${err.message}). Type your answer in the chat.\`
    }
  }
  // After a finished task the page speaks of it by its id only: the AI holds what it made, and the page repeats none of it.
  async function follow(text, typed) {
    if (isAnswered()) return
    answered = cardOf()
    keep(answered, true)
    render()
    $('status').textContent = 'Sent to your AI.'
    try {
      fact('Asked through', await say(text))
      if (typed) { $('t-change').value = ''; counter('t-change') }
    } catch (err) {
      keep(answered, false)
      answered = null
      render()
      $('status').textContent = \`Couldn't reach your AI (\${err.message}). Ask for it in the chat.\`
    }
  }
  const followMark = (T) => \`(end of task \${T.id})\`
  $('t-keep').addEventListener('click', () => { const T = data.task, mark = followMark(T); chose(T); follow(\`Keep the result of task \${T.id} in my Brain. Call brain_rules first and follow it. I read that result on my dashboard, and this message is my yes to save it exactly as it was shown, whole and unchanged, as one file in outputs/ named with today's date and a short name. That result is what your last show_task call with state done for this task passed under result, and nothing else: when the work itself is not in it, save nothing and list under gaps that the work was not on the card. The Brain rule to advise before acting does not cover how this result is written: do not ask or warn about its length, form or wording. Warn only when my Brain says something like this must not be saved. \${taskRules(T.id, mark)} This task never ends failed. When it is saved, call show_task with state done, the same result again, word for word with nothing added, and the saved file's page on github.com as its link, labelled Saved in my Brain. Say nothing about the saving in the result: the link says it. It is saved only when you have read the file back and it holds the result line by line, with every mark and placeholder. When it could not be saved, call show_task with state done and the same result again all the same, and list under gaps that it was not saved and why.\\n\${mark}\`) })
  $('t-again').addEventListener('click', () => { const T = data.task, mark = followMark(T); follow(\`Try task \${T.id} again. What I asked for is in my earlier message for that task, in this chat. Do again only what failed or was not done. \${taskRules(T.id, mark)}\\n\${mark}\`) })
  // A finished task becomes a skill of the person's own: the AI shows the whole text first, and saves it on their yes.
  $('t-skill').addEventListener('click', () => { const T = data.task, mark = followMark(T); follow(\`Make a skill of my own from task \${T.id}: the way you did that task, written so you can do it again for another case. Call brain_rules first and follow its rule on my own skills: ask me for its short name, show me the whole text under shows, and save it only on my yes. \${taskRules(T.id, mark)}\\n\${mark}\`) })
  $('t-alter').addEventListener('click', () => { const open = $('t-change-part').hidden; $('t-change-part').hidden = !open; $('t-alter').setAttribute('aria-expanded', String(open)); if (open) $('t-change').focus(); size() })
  $('t-change-go').addEventListener('click', () => {
    const v = norm($('t-change').value), T = data.task, mark = followMark(T)
    if (!v) return $('t-change').focus()
    if (!tooLong('t-change')) follow(\`Change the result of task \${T.id}. What I want changed is at the end of this message. Make that change in full, and keep whatever it does not touch as it was. Before you show the new result, check it against my words: when I ask for a length or a number, count it over the whole result, and when the count does not meet my words, change the result again first. \${taskRules(T.id, mark)}\\nMy change:\\n\${v}\\n\${mark}\`, true)
  })
  $('t-send').addEventListener('click', () => { const v = norm($('t-answer').value); if (!v) return $('t-answer').focus(); if (!tooLong('t-answer')) answer(v, true) })
  const hasPlan = () => Array.isArray(data && data.skills) && data.skills.length > 0
  const freeTask = (which, what) => { const id = 'T' + Date.now().toString(36), mark = \`(end of task \${id})\`; return ask(which, \`Do this task for me (task \${id}) using my own connected apps where it needs them. The task is at the end of this message. \${hasPlan() ? 'When the task needs what I know, decided or want remembered, call brain_rules first and follow it. ' : ''}\${taskRules(id, mark)}\\nMy task:\\n\${what}\\n\${mark}\`, 'Asked your AI to start.', 'Ask for the task in the chat.') }
  $('t-go').addEventListener('click', async () => {
    const what = norm($('t-what').value)
    if (!what) return $('t-what').focus()
    if (tooLong('t-what')) return
    if (await freeTask('t-go', what)) { $('t-what').value = ''; counter('t-what') }
  })

  // The skills this person has, set-up-my-brain first, then by category and title. The list is built only when the set
  // of skills changes, so a new card keeps the search, the open skill and what was typed in it.
  const FIRST = 'set-up-my-brain'
  const GROUPS = PRODUCT.categories
  const APP = { github: 'GitHub', gmail: 'Gmail', calendar: 'Google Calendar', drive: 'Google Drive', slack: 'Slack', notion: 'Notion', linkedin: 'LinkedIn', 'microsoft-365': 'Microsoft 365', web: 'the web', files: 'files', images: 'images' }
  const and = (a) => (a.length < 2 ? a.join('') : \`\${a.slice(0, -1).join(', ')} and \${a.at(-1)}\`)
  const el = (tag, props, ...kids) => { const e = Object.assign(document.createElement(tag), props); e.append(...kids); return e }
  // listed is the set of skills the list was built from; open names the skill shown; typed keeps each skill's unsent fields.
  // lead is what the Brain tab gives a skill that has no field for it.
  let listed = null, rows = [], folds = [], open = null, listY = 0, lead = null
  const unfolded = {}
  const typed = {}
  function renderSkills(names) {
    const have = new Set(Array.isArray(names) ? names : []), cards = SKILL_CARDS.filter((c) => have.has(c.name))
    $('tab-skills').hidden = !cards.length
    // The Brain needs the Brain rules, which come with a plan, as the skills do; so does everything kept in it.
    const kept = brainNow(), B = cards.length && kept && kept.b.found ? kept.b : null
    for (const [id, on] of [['brain', cards.length], ['relationships', cards.length], ['company', cards.length && (data.company || (B && B.company))]]) { $('tab-' + id).hidden = !on; if (!on && shown === id) tab('today') }
    if (!cards.length && shown === 'skills') tab('today')
    // The person's own skills, as their AI last read them from the Brain. One whose file can't be followed has no Run.
    const own = (B && Array.isArray(B.own_skills) ? B.own_skills : []).filter((o) => !SKILL_CARDS.some((c) => c.name === o.name)).map((o) => ({ name: o.name, title: o.title, tagline: o.tagline || '', does: o.tagline || '', own: true, broken: !o.ok, inputs: [{ id: 'given', label: 'What to use it on', type: 'textarea', required: false }], apps: [], brain: 'none', sends_out: false, runs: 'chat' }))
    const key = [...cards, ...own].map((c) => c.name + (c.broken ? '!' : '') + (c.own ? ':' + c.title + ':' + c.tagline : '')).join(' ')
    if (key === listed) return
    listed = key
    const byTitle = (a, b) => a.title.localeCompare(b.title)
    const groups = [['Start here', cards.filter((c) => c.name === FIRST)], ['Yours', own.sort(byTitle)], ...GROUPS.map(([k, h]) => [h, cards.filter((c) => c.category === k && c.name !== FIRST).sort(byTitle)])].filter(([, l]) => l.length)
    rows = []
    folds = []
    $('s-groups').replaceChildren(...groups.map(([heading, l], n) => {
      // A chat is a narrow place for fifty rows: only the first group starts open, and a search opens what it finds.
      const ul = el('ul', { className: 'list picks' }), head = n ? el('button', { type: 'button', className: 'fold' }, el('span', { textContent: heading }), el('span', { className: 'n', textContent: String(l.length) })) : null
      const group = el('div', { className: head ? 'group folds' : 'group' }, el('h2', {}, head || heading), ul)
      if (head) { folds.push({ heading, head, ul }); head.addEventListener('click', () => { unfolded[heading] = !unfolded[heading]; find() }) }
      for (const c of l) {
        const b = el('button', { type: 'button', className: 'skill' }, el('b', { textContent: c.title }), el('span', { textContent: c.tagline }), ...(c.runs === 'computer' ? [el('span', { className: 'needs', textContent: 'Needs a computer' })] : c.broken ? [el('span', { className: 'needs', textContent: 'Can’t be read' })] : [])), li = el('li', {}, b)
        b.addEventListener('click', () => openSkill(c))
        ul.append(li)
        rows.push({ c, li, b, group, text: [c.title, c.tagline, c.does].join(' ').toLocaleLowerCase() })
      }
      return group
    }))
    if (open && ![...cards, ...own].some((c) => c.name === open.name)) back(false)
    find()
  }
  // Every word typed must be in the title, tagline or what the skill does.
  const find = () => {
    const words = $('s-find').value.toLocaleLowerCase().split(/\\s+/).filter(Boolean), seen = new Set()
    for (const r of rows) { r.li.hidden = !words.every((w) => r.text.includes(w)); if (!r.li.hidden) seen.add(r.group) }
    for (const g of $('s-groups').children) g.hidden = !seen.has(g)
    for (const f of folds) { const on = !!words.length || !!unfolded[f.heading]; f.ul.hidden = !on; f.head.setAttribute('aria-expanded', String(on)) }
    $('s-none').hidden = !!seen.size || !rows.length
    size()
  }
  $('s-find').addEventListener('input', find)
  const fieldId = (i) => 's-in-' + i.id
  const field = (i) => {
    const id = fieldId(i), label = el('label', { htmlFor: id, textContent: i.label })
    // The mark is for the eye; a screen reader hears the field's own required.
    if (i.required) { const r = el('span', { className: 'req', textContent: ' (required)' }); r.setAttribute('aria-hidden', 'true'); label.append(r) }
    let f, box
    if (i.type === 'select') {
      f = el('select', {})
      // A required choice starts empty too, so nothing is sent that the person did not pick.
      const none = new Option(i.required ? 'Choose' : 'Not set', '')
      none.disabled = i.required
      f.append(none, ...i.options.map((o) => new Option(o, o)))
      f.selectedIndex = 0
      box = el('span', { className: 'pick' }, f)
    } else if (i.type === 'textarea') box = f = el('textarea', { rows: 3 })
    else if (i.type === 'date') box = f = el('input', { type: 'date' })
    else { f = el('input', { type: 'text', autocomplete: 'off' }); box = i.placeholder ? el('span', { className: 'line' }, f, el('span', { className: 'ph', textContent: i.placeholder })) : f; if (i.placeholder) box.lastChild.setAttribute('aria-hidden', 'true') }
    f.id = id
    f.required = i.required
    if (i.placeholder && (i.type === 'text' || i.type === 'textarea')) f.placeholder = i.placeholder
    const err = el('span', { className: 'err', id: id + '-e', textContent: 'Fill this in first.', hidden: true })
    const parts = [label, box]
    if (i.type === 'text' || i.type === 'textarea') {
      FITS[id] = FITS['t-what']
      f.setAttribute('aria-describedby', id + '-n')
      parts.push(el('span', { className: 'count', id: id + '-n', hidden: true }))
    }
    f.addEventListener(i.type === 'select' || i.type === 'date' ? 'change' : 'input', () => { if (FITS[id]) counter(id); if (!err.hidden) { err.hidden = true; f.removeAttribute('aria-invalid'); if (FITS[id]) f.setAttribute('aria-describedby', id + '-n'); else f.removeAttribute('aria-describedby') } })
    return [...parts, err]
  }
  const fields = () => (open && open.runs !== 'computer' && !open.broken ? open.inputs.map((i) => ({ i, f: $(fieldId(i)) })) : [])
  const keepTyped = () => { if (open) typed[open.name] = Object.fromEntries(fields().map(({ i, f }) => [i.id, f.value])) }
  function openSkill(c) {
    listY = scrollY
    open = c
    lead = null
    const chat = c.runs !== 'computer' && !c.broken
    $('s-title').textContent = c.title
    $('s-does').textContent = c.does
    const apps = (c.apps || []).map((a) => APP[a]).filter(Boolean)
    const facts = chat ? [apps.length && \`Uses \${and(apps)}.\`, c.brain === 'reads' && 'Reads your Brain.', c.brain === 'writes' && 'Reads and writes your Brain.', c.sends_out && 'Sends or books only after your yes.'].filter(Boolean) : []
    $('s-facts').hidden = !facts.length
    $('s-facts').textContent = facts.join(' ')
    $('s-why').hidden = chat
    $('s-why').textContent = chat ? '' : c.broken ? 'Its file has no steps your AI can follow. Ask your AI to repair it.' : c.why_computer || ''
    $('s-run').hidden = !chat
    $('s-form').replaceChildren(...(chat ? c.inputs.flatMap(field) : []))
    for (const { i, f } of fields()) { const v = (typed[c.name] || {})[i.id]; if (v) { f.value = v; if (FITS[f.id]) counter(f.id) } }
    $('s-list').hidden = true
    $('s-view').hidden = false
    size()
    $('s-title').focus()
  }
  function back(focus = true) {
    keepTyped()
    const was = open && open.name
    open = null
    $('s-view').hidden = true
    $('s-list').hidden = false
    $('s-form').replaceChildren()
    size()
    if (!focus) return
    scrollTo(0, listY)
    const r = rows.find((x) => x.c.name === was)
    if (r && r.b.offsetParent) r.b.focus()
  }
  $('s-back').addEventListener('click', () => back())
  $('s-run').addEventListener('click', async () => {
    const c = open, all = fields()
    if (!c) return
    for (const { i, f } of all) {
      if (!i.required || norm(f.value)) continue
      $(f.id + '-e').hidden = false
      f.setAttribute('aria-invalid', 'true')
      f.setAttribute('aria-describedby', \`\${FITS[f.id] ? f.id + '-n ' : ''}\${f.id}-e\`)
      return f.focus()
    }
    for (const { f } of all) if (FITS[f.id] && tooLong(f.id)) return
    // The person's words go after their label exactly as typed; a value of more than one line starts on the next line.
    const given = [lead, ...all.map(({ i, f }) => [i.label, norm(f.value)]).filter(([, v]) => v).map(([l, v]) => (v.includes('\\n') ? \`\${l}:\\n\${v}\` : \`\${l}: \${v}\`))].filter(Boolean).join('\\n')
    const len = [...given].length, max = FITS['t-what']
    if (len > max) {
      $('status').textContent = \`That is \${number(len)} characters and \${number(max)} fit. Shorten it: nothing was sent.\`
      const longest = all.filter(({ f }) => FITS[f.id]).sort((a, b) => length(b.f.id) - length(a.f.id))[0]
      if (longest) longest.f.focus()
      return
    }
    const id = 'T' + Date.now().toString(36), mark = \`(end of task \${id})\`
    // One of the person's own skills is a file in their Brain, read with the chat app's GitHub connector under the Brain rules.
    if (await ask('s-run', \`Run my \${c.own ? 'own ' : ''}skill "\${c.name}" for me (task \${id}) using my own connected apps where it needs them. \${c.own ? \`It is one I made: call brain_rules first, then read .claude/skills/\${c.name}/SKILL.md in my Brain and follow it, with those rules.\` : 'Read it with get_skill and follow it, with the Brain rules it returns.'} What I gave is at the end of this message. \${taskRules(id, mark)}\\nWhat I gave:\\n\${given || 'Nothing. Find what you need, or ask me.'}\\n\${mark}\`, 'Asked your AI to start.', 'Ask for the task in the chat.')) {
      delete typed[c.name]
      for (const { i, f } of fields()) { if (i.type === 'select') f.selectedIndex = 0; else f.value = ''; if (FITS[f.id]) counter(f.id) }
    }
  })

  // The Brain as the person's AI last read it with the chat app's GitHub connector. Each result draws a new page, so the last
  // read is kept where the frame may keep anything, and always shown with the time it was read.
  // It is kept under a name the connector gives only to this person's pages, so another sign-in in the same app never
  // sees it, and what comes back from the store is checked before it is drawn.
  const BRAIN_KEPT = 'second-brain-brain '
  let brainSeen = null
  const brainKey = () => (data && typeof data.mine === 'string' && /^[\\w-]{10,40}$/.test(data.mine) ? BRAIN_KEPT + data.mine : null)
  const texts = (a, ...keys) => a === null || (Array.isArray(a) && a.every((x) => (keys.length ? x && typeof x === 'object' && keys.every((k) => typeof x[k] === 'string') : typeof x === 'string')))
  const opt = (a, ...keys) => a === undefined || texts(a, ...keys)
  const okCompany = (c) => c === undefined || c === null || (typeof c === 'object' && typeof c.repo === 'string' && /^[\\w.-]+\\/[\\w.-]+$/.test(c.repo) && texts(c.people, 'name') && (c.suggestions === null || (Array.isArray(c.suggestions) && c.suggestions.every((x) => x && Number.isInteger(x.number) && typeof x.title === 'string'))))
  const okBrain = (b) => !!b && typeof b === 'object' && typeof b.found === 'boolean' && (!b.found || (typeof b.repo === 'string' && /^[\\w.-]+\\/[\\w.-]+$/.test(b.repo) && (b.branch === null || typeof b.branch === 'string') && texts(b.files) && texts(b.projects, 'name', 'title') && texts(b.decisions, 'path') && texts(b.changes, 'text') && opt(b.tasks, 'id', 'title') && opt(b.relationships, 'id', 'org') && opt(b.own_skills, 'name', 'title') && okCompany(b.company) && Array.isArray(b.unavailable)))
  const keptBrain = () => {
    const key = brainKey()
    if (brainSeen && brainSeen.key === key) return brainSeen
    brainSeen = null
    try { const k = key && JSON.parse(localStorage.getItem(key) || 'null'); if (k && okBrain(k.b) && Number.isFinite(k.at) && k.at <= Date.now() + 60000) brainSeen = { b: k.b, at: k.at, full: Number.isFinite(k.full) ? k.full : k.b.part === 'records' ? null : k.at, key } } catch {}
    return brainSeen
  }
  const keepBrain = (b, at) => {
    const k = keptBrain(), key = brainKey()
    if (!Number.isFinite(at) || (k && k.at >= at)) return
    // A read of the records alone changes the to-do list and the relationships of the last whole read, and nothing else.
    const whole = b.part !== 'records' || !k || !k.b.found || !b.found || k.b.repo !== b.repo
    const now = whole ? b : { ...k.b, tasks: b.tasks, tasks_done: b.tasks_done, relationships: b.relationships, tasks_more: b.tasks_more, relationships_more: b.relationships_more }
    brainSeen = { b: now, at, full: whole ? (b.part === 'records' ? null : at) : k.full, key }
    try { if (key) localStorage.setItem(key, JSON.stringify({ b: now, at, full: brainSeen.full })) } catch {}
  }
  // The newest read this page knows: show() keeps each one as it arrives, so an earlier card shows the later state too.
  const brainNow = () => keptBrain()
  // The to-do list and the relationships are the Brain's records (Brain rule 8), the same files a computer's dashboard keeps.
  // How the AI reaches the Brain: with the chat app's own GitHub connector, or, on a company's own connector, with that
  // connector's own Brain tools (data.reads is "connector"): the company keeps the Brains, and the person has no GitHub.
  const VIA_GITHUB = 'with the GitHub connector of the chat app you are in (in ChatGPT its GitHub app, in Claude its GitHub connector)'
  const VIA_CONNECTOR = 'with this Second Brain connector\\'s own brain_list and brain_read (your company keeps the Brain, so no GitHub connector is needed)'
  const onConnector = () => !!(data && data.reads === 'connector')
  const via = () => (onConnector() ? VIA_CONNECTOR : VIA_GITHUB)
  const noBrain = () => (onConnector() ? 'When the Brain can\\'t be read' : 'When GitHub is not connected or there is no Brain')
  const recordsAsk = 'Read .second-brain/records/tasks.json and .second-brain/records/crm.json there: give the to-dos that are not done (id, title, due, priority, status) and how many are done, and each relationship (id, organisation, first name, role, its stage now, the day I was last in touch, my next step and its day). A file that is not there yet is an empty list.'
  const recordsText = (rid) => \`Read what my dashboard lists (request \${rid}), \${via()}. Call brain_rules first to find my Brain. \${recordsAsk} Then call show_brain with request "\${rid}", part "records", the repository and what you read, and list what you could not read under unavailable. \${noBrain()}, call show_brain with found false and why. Write no more than one short line in the chat.\${data && data.details ? ' Pass details true.' : ''}\`
  const companyAsk = () => onConnector() ? 'Read my company Brain too, with brain_list and brain_read and which "company": its name from shared-brain.json and who looks after it (a name and a role each, nothing else).' : \`\${data && data.company ? 'Read my company Brain too' : 'If I have a company Brain, read it too'}, the second repository the Brain rules name: its name from shared-brain.json, who looks after it and who changed it in the last 30 days (a name and a role each, nothing else), and its open pull requests (number and title).\`
  const brainText = (rid) => \`Read my Brain for my dashboard (request \${rid}), \${via()}. Call brain_rules first to find it. List the files under me/, knowledge/, decisions/, outputs/ and projects/: paths only, never their text. For each project, read its plan.md and give its title, status, how many steps are done, blocked and in all, and the first step still to do. Read .second-brain/records/projects.json too, the projects my computer lists: add each one whose short name (its name in lower case, words joined by -) has no plan.md, with that short name, its name as the title, its next step, listed true, and status active when its state is moving, paused when it is waiting or stuck, and done when it is done. A file that is not there is an empty list. Read the 10 newest files in decisions/ and give each one's title, its date and its review date, and whether that date is only proposed. List the repository's commits from the last 7 days: date and message. \${recordsAsk} List my own skills, one per folder under .claude/skills/ with a SKILL.md: its short name, its title and its one line, with ok false when it has no "## Steps". When .second-brain/release.json is there, leave out every skill folder it lists that .second-brain/yours/skills.json does not name: those came with my computer's folder. \${companyAsk()} Then call show_brain with request "\${rid}" and what you read, and list what you could not read under unavailable. \${noBrain()}, call show_brain with found false and why. Write no more than one short line in the chat.\${data && data.details ? ' Pass details true.' : ''}\`
  const readBrain = (which, to = 'B') => ask(which, brainText(to + Date.now().toString(36)), 'Asked your AI to read your Brain.', 'Type "read my Brain" in the chat.')
  const readRecords = (which, to) => ask(which, recordsText(to + Date.now().toString(36)), 'Asked your AI to read it.', 'Type "read my to-do list" in the chat.')
  $('b-read').addEventListener('click', () => readBrain('b-read'))
  $('b-again').addEventListener('click', () => readBrain('b-again'))
  $('b-retry').addEventListener('click', () => readBrain('b-retry'))
  const enc = (p) => p.split('/').map(encodeURIComponent).join('/')
  const gh = (b, path) => \`https://github.com/\${b.repo}\` + (path ? \`/blob/\${enc(b.branch || 'HEAD')}/\${enc(path)}\` : '')
  // A date the AI read as YYYY-MM-DD is a day, not a moment: it is shown as that day wherever the person is.
  const dateOf = (s, year = true) => { const t = Date.parse(s + 'T00:00:00Z'); return Number.isFinite(t) ? local((l) => new Date(t).toLocaleDateString(l, { day: 'numeric', month: 'short', ...(year ? { year: 'numeric' } : {}), timeZone: 'UTC' })) || s : s }
  const today = () => local((l, timeZone) => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).map((x) => [x.type, x.value])); return \`\${p.year}-\${p.month}-\${p.day}\` })
  const words = (s) => { const m = /^(\\d{4}-\\d{2}-\\d{2})(?:-(.*))?$/.exec(s), rest = (m ? m[2] || '' : s).replace(/-/g, ' '); return m ? [dateOf(m[1]), rest].filter(Boolean).join(' ') : rest }
  const fileLabel = (path) => path.split('/').slice(1).map((p, i, a) => words(i === a.length - 1 ? p.replace(/\\.md$/i, '') : p)).join(' / ')
  const isDue = (d) => !!d.review && d.review <= today()
  const cardNamed = (name) => (Array.isArray(data && data.skills) && data.skills.includes(name) ? SKILL_CARDS.find((c) => c.name === name) || null : null)
  // A skill opened from the Brain tab opens in its own view on the Skills tab, with the project filled in.
  const fromBrain = (name, project) => {
    const c = cardNamed(name)
    if (!c) return
    if (open) back(false)
    tab('skills')
    openSkill(c)
    if (!project) return
    const i = c.inputs.find((x) => x.id === 'project') || c.inputs.find((x) => x.type === 'text' && /project/i.test(x.label))
    if (i) { const f = $(fieldId(i)); f.value = project; if (FITS[f.id]) counter(f.id) } else lead = \`Project: \${project}\`
  }
  $('b-setup').addEventListener('click', () => fromBrain(FIRST))
  $('b-add').addEventListener('click', () => fromBrain('save-what-i-learned'))
  const BRAIN_GROUPS = [['me', 'About me'], ['knowledge', 'What I know'], ['decisions', 'Decisions'], ['outputs', 'What my AI made'], ['projects', 'Projects']]
  const PART = { files: 'Memory', projects: 'Projects', decisions: 'Decisions', changes: 'This week', tasks: 'To do', relationships: 'Relationships', skills: 'Your skills', company: 'Company' }
  const SOME = 12
  let filesOf = null, bFolds = []
  const bUnfolded = {}, bAll = {}
  const card = (key, ...kids) => { const li = el('li', { className: 'card' }, ...kids); li.dataset.key = key; return li }
  const action = (label, run) => { const b = el('button', { type: 'button', textContent: label }); b.addEventListener('click', () => run(b)); return el('div', { className: 'row' }, b) }
  function renderBrain() {
    // A read of the records alone is not a read of the Brain: the tab then still offers to read it.
    const now = brainNow(), b = now && (!now.b.found || now.full) ? now.b : null
    $('b-read').hidden = !!b
    $('b-off').hidden = !b || !!b.found
    $('b-on').hidden = !b || !b.found
    if (!b) return
    if (!b.found) { $('b-why').textContent = b.reason || 'Your AI found no Brain.'; $('b-off-at').textContent = \`Read \${cardTime(now.at)}\`; $('b-setup').hidden = !cardNamed(FIRST); return }
    const go = (path) => () => openLink(gh(b, path))
    $('b-repo').textContent = b.repo
    $('b-repo').onclick = go()
    const flag = b.private === false ? el('span', { className: 'flag', textContent: 'Not private' }) : b.private ? 'Private' : null
    $('b-at').replaceChildren(...(flag ? [flag, ' · '] : []), \`Read \${cardTime(now.full)}\`)
    const P = Array.isArray(b.projects) ? b.projects : null
    $('b-projects-part').hidden = !P
    if (P) $('b-projects').replaceChildren(...(P.length ? P.map((p) => {
      const path = \`projects/\${p.name}/plan.md\`, meta = [Number.isInteger(p.total) && \`\${p.done || 0} of \${p.total} steps\`, p.blocked > 0 && \`\${p.blocked} blocked\`, p.status === 'paused' && 'Paused', p.status === 'done' && 'Done'].filter(Boolean).join(' · ')
      const head = el('button', { type: 'button', className: 'skill', title: path }, el('b', { textContent: p.title }), ...(meta ? [el('span', { textContent: meta })] : []), ...(p.next ? [el('span', { textContent: \`Next: \${p.next}\` })] : []))
      // A project only the computer lists has no plan yet: its card offers to plan it, and opens nothing.
      if (p.listed) { head.removeAttribute('title'); return card('p:' + p.name, head, ...(p.status !== 'done' && cardNamed('plan') ? [action('Plan the steps', () => fromBrain('plan', p.title || p.name))] : [])) }
      head.addEventListener('click', go(path))
      return card('p:' + p.name, head, ...(p.next && p.status !== 'done' && cardNamed('step') ? [action('Do the next step', () => fromBrain('step', p.name))] : []))
    }) : [el('li', {}, 'No projects yet', ...(cardNamed('new-project') ? [action('New project', () => fromBrain('new-project'))] : []))]))
    const D = Array.isArray(b.decisions) && b.decisions.length ? b.decisions : null
    $('b-decisions-part').hidden = !D
    if (D) $('b-decisions').replaceChildren(...D.map((d) => {
      const due = isDue(d), head = el('button', { type: 'button', className: 'skill', title: d.path }, el('b', { textContent: d.title || fileLabel(d.path) }))
      if (d.decided) head.append(el('span', { textContent: \`Decided \${dateOf(d.decided)}\` }))
      if (d.review) head.append(el('span', { className: due ? 'due' : '', textContent: \`Look again by \${dateOf(d.review)}\${d.proposed ? ' (proposed)' : ''}\` }, ...(due ? [el('span', { className: 'sr', textContent: ', due' })] : [])))
      head.addEventListener('click', go(d.path))
      // The page speaks in the chat as the person, so it names the file by its date and its place among that day's
      // files, never by a name an AI wrote.
      const on = /^decisions\\/(\\d{4}-\\d{2}-\\d{2})-[^/]+$/.exec(d.path), day = on && [...new Set([...(Array.isArray(b.files) ? b.files : []), ...D.map((x) => x.path)])].filter((p) => p.startsWith(\`decisions/\${on[1]}-\`) && !p.slice(10).includes('/')).sort()
      const which = on && \`the file in decisions/ whose name starts with \${on[1]}\` + (day.length > 1 ? \`, number \${day.indexOf(d.path) + 1} of the \${day.length} that do, in name order\` : '')
      return card('d:' + d.path, head, ...(due && which ? [action('Look at it again', (btn) => freeTask(btn, \`Look again at one of my decisions with me: \${which}. If you can't tell which file I mean, ask me. Read it from my Brain, tell me what was decided and why, and what has changed since that bears on it. Then ask me one question: keep it, change it, or drop it. Follow the Brain rules for anything you save.\`))] : []))
    }))
    const F = Array.isArray(b.files) ? b.files : null
    $('b-memory-part').hidden = !F
    $('b-partial').hidden = !(F && b.files_complete === false)
    if (F !== filesOf) { filesOf = F; buildFiles(b, F || []) }
    $('b-add').hidden = !cardNamed('save-what-i-learned')
    const W = Array.isArray(b.changes) ? b.changes : []
    $('b-week-part').hidden = !W.length
    $('b-week').replaceChildren(...W.map((c) => el('li', {}, el('span', { className: 'r-meta', textContent: c.date ? dateOf(c.date, false) : '' }), el('span', { textContent: c.text }))))
    const miss = (Array.isArray(b.unavailable) ? b.unavailable : []).map((u) => \`\${PART[u.what] || u.what}: \${u.reason || 'not read'}\`)
    $('b-missing').hidden = !miss.length
    $('b-missing').textContent = miss.join(' · ')
  }
  // The files by folder, each folder folded at the start; the filter opens what it finds.
  function buildFiles(b, F) {
    bFolds = []
    $('b-groups').replaceChildren(...BRAIN_GROUPS.map(([dir, heading]) => {
      const l = F.filter((p) => typeof p === 'string' && p.startsWith(dir + '/'))
      if (!l.length) return null
      if (dir === 'decisions' || dir === 'outputs') l.sort((x, y) => y.localeCompare(x)); else l.sort((x, y) => x.localeCompare(y))
      const ul = el('ul', { className: 'list picks' }), n = el('span', { className: 'n' }), head = el('button', { type: 'button', className: 'fold' }, el('span', { textContent: heading }), n), more = el('button', { type: 'button', className: 'second more' })
      const group = el('div', { className: 'group folds' }, el('h2', {}, head), ul, more), f = { heading, head, n, ul, more, group, rows: [] }
      head.addEventListener('click', () => { bUnfolded[heading] = !bUnfolded[heading]; bFind() })
      more.addEventListener('click', () => { const at = f.rows.filter((r) => !r.li.hidden).length; bAll[heading] = true; bFind(); const r = f.rows.filter((x) => !x.li.hidden)[at]; if (r) r.btn.focus() })
      for (const path of l) {
        const btn = el('button', { type: 'button', className: 'file', title: path, textContent: fileLabel(path) }), li = el('li', {}, btn)
        btn.addEventListener('click', () => openLink(gh(b, path)))
        ul.append(li)
        f.rows.push({ li, btn, text: path.toLocaleLowerCase() })
      }
      bFolds.push(f)
      return group
    }).filter(Boolean))
    bFind()
  }
  const bFind = () => {
    const q = $('b-find').value.trim().toLocaleLowerCase()
    for (const f of bFolds) {
      const hits = f.rows.filter((r) => !q || r.text.includes(q)), on = q ? hits.length > 0 : !!bUnfolded[f.heading], all = bAll[f.heading] || hits.length <= SOME
      f.group.hidden = !hits.length
      f.ul.hidden = !on
      f.head.setAttribute('aria-expanded', String(on))
      f.n.textContent = String(hits.length)
      for (const r of f.rows) r.li.hidden = true
      hits.forEach((r, i) => { r.li.hidden = !all && i >= SOME })
      f.more.hidden = !on || all
      f.more.textContent = \`Show all \${hits.length}\`
    }
    size()
  }
  $('b-find').addEventListener('input', bFind)
  // On Today: what in the Brain waits on the person, each going to its row on the Brain tab.
  function renderNeeds() {
    const now = brainNow(), b = hasPlan() && now && now.b && now.b.found ? now.b : null
    const rows = !b ? [] : [
      ...(now.full && Array.isArray(b.decisions) ? b.decisions : []).filter(isDue).map((d) => [d.title || fileLabel(d.path), \`Look again by \${dateOf(d.review)}\`, 'd:' + d.path]),
      ...(Array.isArray(b.projects) ? b.projects : []).filter((p) => p.blocked > 0).map((p) => [p.title, \`\${p.blocked} blocked\`, 'p:' + p.name]),
      ...(Array.isArray(b.tasks) ? b.tasks : []).filter((t) => t.due && t.due <= today()).map((t) => [t.title, \`Due \${dateOf(t.due)}\`, 't:' + t.id, 'tasks']),
      ...(Array.isArray(b.relationships) ? b.relationships : []).filter((r) => r.next_at && r.next_at <= today()).map((r) => [r.org, \`Next step by \${dateOf(r.next_at)}\`, 'r:' + r.id, 'relationships']),
    ]
    $('needs').hidden = !rows.length
    $('needs-list').replaceChildren(...rows.map(([title, meta, key, where = 'brain']) => {
      const btn = el('button', { type: 'button', className: 'skill' }, el('b', { textContent: title }), el('span', { textContent: meta }))
      btn.addEventListener('click', () => { tab(where); const to = [...$(where).querySelectorAll('li[data-key]')].find((li) => li.dataset.key === key); if (to) to.querySelector('button').focus() })
      return el('li', {}, btn)
    }))
  }

  // What the dashboard lists: the to-do list and the relationships, as the person's AI last read them from the Brain's
  // records, the same files a computer's dashboard keeps. Every change is asked of the AI in the chat, as the person,
  // naming the item by its id: the page repeats nothing an AI wrote. The person's own new words go last, before a mark.
  const change = (which, to, wants, words) => {
    const rid = to + Date.now().toString(36), mark = \`(end of request \${rid})\`
    return ask(which, \`\${wants} Call brain_rules first and follow its rule on what the dashboard lists. This message is my yes for exactly this change. \${words ? endsWith(mark, 'change nothing, and say so in one line') + ' ' : ''}Then: \${recordsText(rid)}\${words ? \`\\n\${words}\\n\${mark}\` : ''}\`, 'Asked your AI to change it.', 'Ask for it in the chat.')
  }
  const PRIORITY = Object.fromEntries(PRODUCT.priorities.map((x) => [x.id, x.label])), TODO_STATE = Object.fromEntries(PRODUCT.states.map((x) => [x.id, x.label])), STAGES = PRODUCT.stages
  const does = (label, run) => { const x = el('button', { type: 'button', textContent: label }); x.addEventListener('click', () => run(x)); return x }
  const dayIn = (v) => (/^\\d{4}-\\d{2}-\\d{2}$/.test(v) ? v : '')
  // stepFor names the relationship whose next step is being written, with what was typed so far.
  let stepFor = null, stepText = '', stepAt = ''
  function renderRecords() {
    const now = brainNow(), b = hasPlan() && now && now.b.found ? now.b : null
    $('goal').hidden = !(Array.isArray(data.features) && data.features.includes('objectives') && cardNamed('new-project'))
    $('todo').hidden = !hasPlan()
    const T = b && Array.isArray(b.tasks) ? b.tasks : null
    $('todo-off').hidden = !!T
    $('todo-on').hidden = !T
    if (T) {
      $('todo-list').replaceChildren(...(T.length ? T.map((t) => {
        const named = \`the to-do with id \${t.id} in my to-do list\`, meta = [t.status === 'doing' && TODO_STATE.doing, PRIORITY[t.priority]].filter(Boolean).join(' · ')
        const head = el('div', { className: 'skill' }, el('b', { textContent: t.title }), ...(t.due ? [el('span', { className: t.due <= today() ? 'due' : '', textContent: \`Due \${dateOf(t.due)}\` })] : []), ...(meta ? [el('span', { textContent: meta })] : []))
        // Delete is confirmed for the to-do itself, as it is for a scheduled task.
        const row = dropping === 't:' + t.id
          ? el('div', { className: 'row' }, does('Delete for good', (x) => { dropping = null; change(x, 'K', \`Delete \${named}.\`) }), does('Keep', () => { dropping = null; render() }))
          : el('div', { className: 'row' }, does('Done', (x) => change(x, 'K', \`Mark \${named} as done, with today's date.\`)), does('Let my AI do it', (x) => freeTask(x, \`Do one of my to-dos: the item with id \${t.id} in .second-brain/records/tasks.json in my Brain. Read it there first. When the work is done, mark that to-do as done in that file, as the Brain rule on what the dashboard lists says.\`)), does('Delete', () => { dropping = 't:' + t.id; render() }))
        return card('t:' + t.id, head, row)
      }) : [el('li', {}, 'Nothing to do.')]))
      $('todo-done').hidden = !(b.tasks_done > 0)
      $('todo-done').textContent = b.tasks_done > 0 ? \`\${number(b.tasks_done)} done\` : ''
      // Past the 50 a card holds, the rest is one press away, in the chat (#4590).
      $('todo-more').hidden = !(b.tasks_more > 0)
      $('todo-more-go').textContent = b.tasks_more > 0 ? \`Show the other \${number(b.tasks_more)}\` : ''
    }
    const R = b && Array.isArray(b.relationships) ? b.relationships : null
    $('rel-read').hidden = !!R
    $('rel-on').hidden = !R
    if (!R) return
    // By stage, in the order both dashboards name them; a stage of the company's own comes last.
    const known = new Set(STAGES.map((x) => x.id)), groups = [...STAGES.map((x) => [x.label, R.filter((r) => r.stage === x.id)]), ['Other', R.filter((r) => !known.has(r.stage))]].filter(([, l]) => l.length)
    $('rel-more').hidden = !(b.relationships_more > 0)
    $('rel-more-go').textContent = b.relationships_more > 0 ? \`Show the other \${number(b.relationships_more)}\` : ''
    $('rel-groups').replaceChildren(...(groups.length ? groups.map(([heading, l]) => el('div', { className: 'group' }, el('h2', { textContent: heading }), el('ul', { className: 'list picks' }, ...l.map(relation)))) : [el('p', { className: 'when', textContent: 'No relationships yet.' })]))
    const typing = stepFor && $('rel-next')
    if (typing && document.activeElement === document.body) typing.focus()
  }
  const relation = (r) => {
    const named = \`the relationship with id \${r.id} in my relationships\`, at = STAGES.findIndex((x) => x.id === r.stage), next = at >= 0 && at < STAGES.length - 1 ? STAGES[at + 1] : null
    const who = [r.person, r.role].filter(Boolean).join(', ')
    const head = el('div', { className: 'skill' }, el('b', { textContent: r.org }), ...(who ? [el('span', { textContent: who })] : []), ...(r.last ? [el('span', { textContent: \`Last in touch \${dateOf(r.last)}\` })] : []), ...(r.next ? [el('span', { className: r.next_at && r.next_at <= today() ? 'due' : '', textContent: \`Next: \${r.next}\${r.next_at ? \`, by \${dateOf(r.next_at)}\` : ''}\` })] : []))
    if (dropping === 'r:' + r.id) return card('r:' + r.id, head, el('div', { className: 'row' }, does('Remove for good', (x) => { dropping = null; change(x, 'C', \`Remove \${named}, with everything kept about it.\`) }), does('Keep', () => { dropping = null; render() })))
    if (stepFor === r.id) {
      const text = el('input', { id: 'rel-next', autocomplete: 'off', value: stepText }), on = el('input', { id: 'rel-next-at', type: 'date', value: stepAt })
      text.addEventListener('input', () => { stepText = text.value })
      on.addEventListener('change', () => { stepAt = on.value })
      const save = does('Save', async (x) => {
        const v = norm(text.value), by = dayIn(on.value)
        if (!v) return text.focus()
        if ([...v].length > 140) { $('status').textContent = \`That is \${number([...v].length)} characters and 140 fit. Shorten it: nothing was sent.\`; return text.focus() }
        if (await change(x, 'C', \`Set my next step for \${named}. The step\${by ? ' and its day are' : ' is'} at the end of this message.\`, \`Next step: \${v}\${by ? \`\\nBy: \${by}\` : ''}\`)) { stepFor = null; stepText = stepAt = ''; render() }
      })
      return card('r:' + r.id, head, el('div', { className: 'in' }, el('label', { htmlFor: 'rel-next', textContent: 'Next step' }), text, el('label', { htmlFor: 'rel-next-at', textContent: 'By' }), on, el('div', { className: 'row' }, save, does('Cancel', () => { stepFor = null; render() }))))
    }
    return card('r:' + r.id, head, el('div', { className: 'row' }, does('In touch today', (x) => change(x, 'C', \`Note that I was in touch today with \${named}: add a touch with today's date and how "Note".\`)), ...(next ? [does(\`Move to \${next.label}\`, (x) => change(x, 'C', \`Move \${named} to the stage "\${next.id}", with today's date.\`))] : []), does('Next step', () => { stepFor = r.id; stepText = stepAt = ''; render(); $('rel-next').focus() }), does('Remove', () => { dropping = 'r:' + r.id; render() })))
  }
  $('todo-read').addEventListener('click', () => readRecords('todo-read', 'K'))
  const MORE = (what, file, order) => \`List in this chat, as a short list, \${what} past the first 50 my dashboard shows: the items in .second-brain/records/\${file} from the 51st on, \${order}. Change nothing.\`
  $('todo-more-go').addEventListener('click', () => ask('todo-more-go', MORE('my to-dos that are not done', 'tasks.json under "mine"', 'in the order the dashboard uses (due date, earliest first, then those with none), each with its title, due date and id'), 'Asked your AI for the rest.', 'Type "show the rest of my to-do list" in the chat.'))
  $('rel-more-go').addEventListener('click', () => ask('rel-more-go', MORE('my relationships', 'crm.json under "added"', 'in the order the dashboard uses (next step date, earliest first, then those with none), each with its organisation, stage and next step'), 'Asked your AI for the rest.', 'Type "show the rest of my relationships" in the chat.'))
  $('todo-again').addEventListener('click', () => readRecords('todo-again', 'K'))
  $('rel-read').addEventListener('click', () => readRecords('rel-read', 'C'))
  $('rel-again').addEventListener('click', () => readRecords('rel-again', 'C'))
  $('todo-add').addEventListener('click', async () => {
    const v = norm($('todo-title').value), due = dayIn($('todo-due').value)
    if (!v) return $('todo-title').focus()
    if (tooLong('todo-title')) return
    if (await change('todo-add', 'K', \`Add a to-do to my to-do list. Its title\${due ? ' and the day it is due are' : ' is'} at the end of this message.\`, \`Title: \${v}\${due ? \`\\nDue: \${due}\` : ''}\`)) { $('todo-title').value = ''; $('todo-due').value = ''; counter('todo-title') }
  })
  $('rel-add').addEventListener('click', async () => {
    const ids = ['rel-org', 'rel-person', 'rel-role'], [org, person, role] = ids.map((id) => norm($(id).value))
    if (!org) return $('rel-org').focus()
    for (const id of ids) if (tooLong(id)) return
    if (await change('rel-add', 'C', 'Add a relationship to my relationships, at the stage "new". What I know of it is at the end of this message.', \`Organisation: \${org}\${person ? \`\\nFirst name: \${person}\` : ''}\${role ? \`\\nRole: \${role}\` : ''}\`)) for (const id of ids) { $(id).value = ''; counter(id) }
  })
  // A goal is a project in the Brain: its plan holds the steps, and each step runs as a task.
  $('goal-go').addEventListener('click', () => fromBrain('new-project'))

  // The company's shared Brain, a second repository: who looks after it, what is suggested, and two things to ask of it.
  function renderCompany() {
    const now = brainNow(), c = hasPlan() && now && now.b.found ? now.b.company : null
    $('co-read').hidden = !!c
    $('co-on').hidden = !c
    if (!c) return
    $('co-repo').textContent = c.name || c.repo
    // On a company's own connector the person has no GitHub sign-in, so the company Brain's page on GitHub is no link.
    $('co-repo').onclick = onConnector() ? null : () => openLink(\`https://github.com/\${c.repo}\`)
    const P = Array.isArray(c.people) ? c.people : [], S = Array.isArray(c.suggestions) ? c.suggestions : []
    $('co-people-part').hidden = !P.length
    $('co-people').replaceChildren(...P.map((x) => el('li', {}, el('b', { textContent: x.name }), ...(x.role ? [el('span', { textContent: x.role })] : []))))
    $('co-sugg-part').hidden = !S.length
    $('co-sugg').replaceChildren(...S.map((x) => { const btn = el('button', { type: 'button', className: 'file', textContent: x.title }); btn.addEventListener('click', () => openLink(\`https://github.com/\${c.repo}/pull/\${x.number}\`)); return el('li', {}, btn) }))
  }
  $('co-read').addEventListener('click', () => readBrain('co-read', 'O'))
  $('co-again').addEventListener('click', () => readBrain('co-again', 'O'))
  const company = (id, what) => $(id + '-go').addEventListener('click', async () => {
    const v = norm($(id).value)
    if (!v) return $(id).focus()
    if (!tooLong(id) && await freeTask(id + '-go', \`\${what()}\\n\${v}\`)) { $(id).value = ''; counter(id) }
  })
  const companyWhere = () => (onConnector() ? 'which this connector reads with which "company"' : 'the second repository the Brain rules name')
  company('co-ask', () => \`Answer my question from my company Brain, \${companyWhere()}. Read what bears on it there, and name the file each part of your answer comes from. When it holds no answer, say so. My question:\`)
  company('co-suggest', () => (onConnector() ? 'Suggest a change to my company Brain with brain_suggest, for the owner or an admin to approve. Show me exactly what would change under shows, and send it only on my yes. Never put my personal notes in it. What I want changed:' : 'Suggest a change to my company Brain, the second repository the Brain rules name. Prepare it as a pull request there, show me exactly what would change under shows, and open it only on my yes. Never put my personal notes in it. What I want changed:'))

  // On Today, under the counts: the first result, the person's system, what changed in this version, and the full plan.
  let newsOpen = false, fullOpen = false
  function renderToday() {
    const d = data, now = brainNow(), b = hasPlan() && now && now.b.found ? now.b : null
    // The first result is offered until the Brain holds something the person's AI made.
    $('first').hidden = !(b && now.full && Array.isArray(b.files) && b.files_complete !== false && !b.files.some((x) => x.startsWith('outputs/') && !/^outputs\\/README\\.md$/i.test(x)))
    const apps = Array.isArray(d.apps) ? d.apps : [], named = (on) => apps.filter((a) => a.connected === on).map((a) => APP[a.app]).filter(Boolean)
    const rows = [b && ['Brain', b.repo + (b.private === false ? ', not private' : '')], named(true).length && ['Connected', and(named(true))], named(false).length && ['Not connected', and(named(false))], d.version && ['Version', dateOf(d.version)]].filter(Boolean)
    $('system').hidden = !rows.length
    $('system-facts').replaceChildren(...rows.flatMap(([k, v]) => [el('dt', { textContent: k }), el('dd', { textContent: v })]))
    $('news-list').replaceChildren(...PRODUCT.changes.slice(0, 6).map((c) => el('li', {}, el('span', { className: 'r-meta', textContent: dateOf(c.date, false) }), el('span', { textContent: c.text }))))
    $('news-list').hidden = !newsOpen
    $('news-fold').setAttribute('aria-expanded', String(newsOpen))
    // The full plan, in the computer's own words: what Factory has not opened for this person shows locked, and what
    // it has opened that has no form in a chat says so.
    const held = new Set(Array.isArray(d.features) ? d.features : []), full = PRODUCT.features.filter((f) => f.plan === 'full')
    const waiting = full.filter((f) => held.has(f.id) && !f.tab), locked = full.filter((f) => !held.has(f.id))
    $('full').hidden = !hasPlan() || !(waiting.length + locked.length)
    $('full-n').textContent = String(waiting.length + locked.length)
    $('full-list').replaceChildren(...waiting.map((f) => el('li', {}, el('b', { textContent: f.title }), el('span', { textContent: 'Turned on for you. Nothing shows here yet.' }))), ...locked.map((f) => el('li', {}, el('b', { textContent: f.title }), el('span', { textContent: (PRODUCT.locked[f.id] || {}).say || '' }))))
    $('full-list').hidden = !fullOpen
    $('full-fold').setAttribute('aria-expanded', String(fullOpen))
  }
  $('news-fold').addEventListener('click', () => { newsOpen = !newsOpen; renderToday(); size() })
  $('full-fold').addEventListener('click', () => { fullOpen = !fullOpen; renderToday(); size() })
  $('first-go').addEventListener('click', () => freeTask('first-go', 'Make my first result: one real piece of my own work. Read me/work-recipes.md and me/profile.md in my Brain, pick the piece of work I repeat most that you can do now from my connected apps, and do it once. Only read: send nothing and change nothing in my apps. Give the finished work as the result, and say in one line which work you picked and why.'))

  // What the page asks the person's AI for: the counts, and the scheduled tasks the AI's own app has scheduled.
  const refreshText = (rid) => \`Refresh my dashboard (request \${rid}). With my own connected apps, count my email threads from the last 24 hours\${onConnector() ? ' and my calendar events in the next 7 days' : ', my calendar events in the next 7 days, and the open issues and open pull requests in my GitHub repositories'}. Counts only: never open, read or quote any content. Also list my scheduled tasks in this app: id, name, schedule with its time zone, state, next run, and when and how the last run ended, never their instructions. Read them from the scheduler now, not from memory. Also say which apps this chat has a connector for right now, by name only. Then call show_counts with request \\"\${rid}\\", the counts, the scheduled tasks and the apps, and list anything you can't reach under unavailable.\${data && data.details ? ' Pass details true.' : ''}\`
  // Says it in the chat as the person: ChatGPT's own way where the page has it, the open standard's everywhere else.
  const say = async (text) => {
    if (window.openai && typeof window.openai.sendFollowUpMessage === 'function') { await window.openai.sendFollowUpMessage({ prompt: text }); return 'sendFollowUpMessage' }
    // Not before the app has answered the page's hello, and not for a minute: an app that says nothing in 20 seconds
    // is not going to.
    await ready
    const r = await request('ui/message', { role: 'user', content: [{ type: 'text', text }] }, 20000)
    if (r && r.isError) throw new Error('refused')
    return 'ui/message'
  }
  const ask = async (which, text, waiting, typed) => {
    const button = typeof which === 'string' ? $(which) : which
    button.disabled = true
    $('status').textContent = waiting
    try {
      fact('Asked through', await say(text))
      fact('Asked at', time(Date.now()))
      return true
    } catch (err) {
      $('status').textContent = \`Couldn't ask your AI (\${err.message}). \${typed}\`
      fact('Ask error', err.message)
      return false
    } finally { setTimeout(() => { button.disabled = false }, 4000) }
  }

  $('refresh').addEventListener('click', () => ask('refresh', refreshText('R' + Date.now().toString(36)), 'Asked your AI to read the counts and what is scheduled.', 'Type \\"refresh my dashboard\\" in the chat.'))

  // A button, not a form: the frame this page runs in allows no form to be sent.
  $('add-go').addEventListener('click', async () => {
    const fields = ['r-title', 'r-when', 'r-what']
    for (const id of fields) if (!norm($(id).value)) return $(id).focus()
    for (const id of fields) if (tooLong(id)) return
    const rid = 'A' + Date.now().toString(36), mark = \`(end of request \${rid})\`, zone = ctx.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone
    const text = \`Schedule a task for me with this app's own scheduled tasks, so it runs on its own. Its name, when it runs and what it does are at the end of this message. Each run starts with no memory of this chat, so write its instructions complete on their own: which of my apps to use, what to make and where to put it. Have it tell me when a run ends, by notification or email, where this app can. My time zone is \${zone}. Keep exactly the time and time zone I gave. I mean exactly that time. Do not move it a few minutes earlier or later to spread load, even if your scheduler's own guidance prefers another minute. If this app can't run it at exactly that time or that often, create nothing yet: tell me in one line what I asked for, the closest it allows and why, and wait for my yes. Once it is created, read it back from the scheduler. If the scheduler holds a different time, time zone or frequency than I asked for, say the difference in one line and ask me whether to keep it or delete it. If this app can't schedule tasks, tell me in one line. \${endsWith(mark, 'create nothing, and say so in one line')} In every case, then: \${refreshText(rid)}\\nName: \${norm($('r-title').value)}\\nWhen: \${norm($('r-when').value)}\\nWhat it does:\\n\${norm($('r-what').value)}\\n\${mark}\`
    if (await ask('add-go', text, 'Asked your AI to set it up.', 'Ask for it in the chat.')) for (const id of fields) { $(id).value = ''; counter(id) }
  })

  $('check').addEventListener('click', async () => {
    const t0 = performance.now()
    $('check').disabled = true
    try {
      // ChatGPT's own call first where the page has it, as Refresh does: waiting on the other way first costs 30 seconds.
      // Only the connector's own answer counts: a refusal, or anything else, is no connection.
      const answer = (r) => { try { const a = !r || r.isError ? null : JSON.parse(r.content[0].text); return a && typeof a === 'object' && 'plan' in a ? a : null } catch { return null } }
      let s = null
      if (window.openai && typeof window.openai.callTool === 'function') { try { s = answer(await window.openai.callTool('setup_status', {})) } catch {} if (s) fact('Check went through', 'window.openai.callTool') }
      if (!s) {
        const r = await request('tools/call', { name: 'setup_status', arguments: {} }, 30000)
        if (r && r.isError) throw new Error('refused')
        s = answer(r)
        if (!s) throw new Error('no answer')
        fact('Check went through', 'tools/call')
      }
      const ms = performance.now() - t0
      $('status').textContent = \`Connected\${s.product ? \` to \${s.product}\` : ''} in \${secs(ms)}.\`
      fact('Check round trip', secs(ms))
    } catch (err) {
      $('status').textContent = \`No connection (\${err.message}).\`
      fact('Check error', err.message)
    } finally { $('check').disabled = false }
  })

  // The app's frame takes the height of what the page shows, so nothing is cut off and a shorter tab leaves no gap:
  // the page's own scroll height never falls below the frame it is in.
  const size = () => notify('ui/notifications/size-changed', { width: Math.ceil(document.documentElement.scrollWidth), height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) })
  if ('ResizeObserver' in window) new ResizeObserver(size).observe(document.body)

  if (window.openai) {
    if (window.openai.toolOutput) show(window.openai.toolOutput, 'window.openai.toolOutput')
    addEventListener('openai:set_globals', () => { if (window.openai.toolOutput) show(window.openai.toolOutput, 'window.openai.toolOutput') })
  }
  if (!data) { data = { counts: null }; render() }
  ready = request('ui/initialize', { appInfo: { name: 'second-brain-dashboard', version: '1' }, appCapabilities: { availableDisplayModes: ['inline'] }, protocolVersion: '2026-01-26' }, 15000)
    .then((r) => {
      fact('App', [r && r.hostInfo && r.hostInfo.name, r && r.hostInfo && r.hostInfo.version].filter(Boolean).join(' ') || 'unnamed')
      applyContext(r && r.hostContext)
      notify('ui/notifications/initialized', {})
      size()
    })
    .catch((err) => fact('Start error', err.message))
})()
</script>
</body>
</html>
`, "PRODUCT": { "tabs": [["today", "Today"], ["scheduled", "Scheduled"], ["tasks", "Tasks"], ["relationships", "Relationships"], ["skills", "Skills"], ["brain", "Brain"], ["company", "Company"]], "features": [{ "id": "today", "plan": "base", "title": "Today", "tab": "today" }, { "id": "tasks", "plan": "base", "title": "Tasks", "tab": "tasks" }, { "id": "routines", "plan": "base", "title": "Scheduled", "tab": "scheduled" }, { "id": "people", "plan": "base", "title": "People", "tab": "company" }, { "id": "work", "plan": "base", "title": "Projects", "tab": "brain" }, { "id": "agent", "plan": "base", "title": "The company agent", "tab": "company" }, { "id": "crm", "plan": "base", "title": "CRM", "tab": "relationships" }, { "id": "focus", "plan": "base", "title": "What needs you", "tab": "today" }, { "id": "jobs", "plan": "base", "title": "Prepared work", "tab": "tasks" }, { "id": "skills", "plan": "base", "title": "Skills", "tab": "skills" }, { "id": "library", "plan": "base", "title": "Skill library", "tab": "skills" }, { "id": "brain", "plan": "base", "title": "Brain updates", "tab": "company" }, { "id": "memory", "plan": "base", "title": "Memory", "tab": "brain" }, { "id": "system", "plan": "base", "title": "Your system", "tab": "today" }, { "id": "objectives", "plan": "full", "title": "Objectives", "tab": "tasks" }, { "id": "history", "plan": "full", "title": "History", "tab": null }, { "id": "access", "plan": "full", "title": "Team access", "tab": null }, { "id": "world", "plan": "full", "title": "3D view", "tab": null }, { "id": "updates", "plan": "full", "title": "Past updates", "tab": null }, { "id": "videos", "plan": "full", "title": "Video library", "tab": null }, { "id": "sites", "plan": "full", "title": "Sites", "tab": null }, { "id": "business", "plan": "full", "title": "Business", "tab": null }, { "id": "content", "plan": "full", "title": "Content", "tab": null }], "locked": { "objectives": { "title": "Objectives", "say": "Give your AI a goal, and watch it work towards it." }, "business": { "title": "Business", "say": "How the organisation is doing, read from the systems that already hold the numbers." }, "content": { "title": "Content", "say": "Your posts, newsletters and pages, from the first idea to what happened after publishing." }, "access": { "title": "Team access", "say": "Who can see and change what, in one place." }, "updates": { "title": "Past updates", "say": "Every daily and weekly team update, kept and easy to find." }, "history": { "title": "History", "say": "What changed across your work, day by day." }, "videos": { "title": "Video library", "say": "Short films that explain your work, in one place." }, "sites": { "title": "Sites", "say": "Every page your team has shared, each with its own address and password." }, "world": { "title": "3D view", "say": "Your team’s work as a place you can walk around." } }, "scheduled": { "name": "Scheduled", "suggested": [["What’s new this morning", "Every weekday at 8:30 AM", "Look through my connected apps (email, calendar, chat and tasks, where connected) for what changed since the last working day. Tell me the three things that matter most, each with where it came from."], ["Plan the week", "Mondays at 8:30 AM", "From my connected apps, plan my week: what is due, what is waiting on me and what has gone quiet. Give me one short list by day."], ["Close the week", "Fridays at 4 PM", "From my connected apps, list what I finished this week and what I left open. Name anything worth remembering, for me to save."]] }, "stages": [{ "id": "new", "label": "New" }, { "id": "talking", "label": "Talking" }, { "id": "proposal", "label": "Proposal" }, { "id": "active", "label": "Working together" }], "categories": [["daily", "Every day"], ["memory", "Memory and what you've learned"], ["projects", "Plans and projects"], ["writing", "Writing and publishing"], ["quality", "Checking quality"], ["hiring", "Hiring and placement"], ["coach", "Getting the most from it"]], "priorities": [{ "id": "now", "label": "Now" }, { "id": "soon", "label": "Soon" }, { "id": "later", "label": "Later" }], "states": [{ "id": "open", "label": "To do" }, { "id": "doing", "label": "Doing" }, { "id": "done", "label": "Done" }], "changes": [{ "date": "2026-11-18", "text": "A to-do list or a relationships list longer than 50 offers the rest, and anything due comes first." }, { "date": "2026-11-18", "text": "Make my first result shows on a Brain that was just set up." }, { "date": "2026-11-17", "text": "Your to-do list and your relationships are on the dashboard, kept in your Brain." }, { "date": "2026-11-17", "text": "A Company tab shows your company's shared Brain: who looks after it, open suggestions, and a question answered from it." }, { "date": "2026-11-17", "text": "Skills you made yourself are listed under Yours, and a finished task can become a skill." }, { "date": "2026-11-17", "text": "Today shows your first result, your connected apps and what needs you from your to-dos and relationships." }, { "date": "2026-11-16", "text": "Start a task on the dashboard, follow its steps and keep the result in your Brain." }, { "date": "2026-11-16", "text": "Scheduled work: see it, add it, pause it, run it now and delete it." }] }, "SKILLS": { "ask": { "title": "Ask", "tagline": "Quick help with any task, using what your Brain knows", "text": `# Ask

Gives the person quick help with a question or a small task, built on what their Brain holds, with the files it used named.

## Inputs

- what: the question or task. The skill cannot start without it; ask for it in one short question if it is missing.

## Steps

1. Read me/profile.md and me/how-i-work.md. Keep a list of what you read and what you could not read.
2. List the file names in knowledge/ and decisions/. Pick the ones whose names bear on the request (its subject, client, product, customer or method) and read them, up to about ten. When this chat's GitHub connector can search the Brain repository, also search it for the request's key words and read the best matches.
3. Look for similar past work: list the file names in outputs/ and read up to three that bear on the request.
4. Do the work. Use what the files say and name each file where you rely on it. Where the files and the request disagree, follow the Brain rules for advising before you act.
5. Under the answer, say in one line what the Brain gave: the files used, or plainly "your Brain has nothing on this yet" when you read the folders and found nothing that bears on it. Keep that apart from a file or folder you could not read, which goes under gaps. Never treat a file you could not read as empty.
6. When the task is too big for one answer (a full proposal, a presentation, research), say so, give the first useful part, and suggest the steps for the rest.
7. When the work brought out something worth keeping (a lesson, a choice, a preference), offer once to keep it with the skill "Save what I learned". Save nothing in this skill.

## Before you say done

- Every claim taken from the Brain names its file.
- The line on what the Brain gave is there, and it does not call the Brain empty when a read failed.
- Every file or folder you could not read is under gaps.
- Nothing was written to the Brain or sent.` }, "brutalist-image-generator": { "title": "Cover image", "tagline": "A clean title image for a blog post, link preview or social post", "text": `# Cover image

Gives the person a bold, text-first title image in their own look, with every word on it checked.

## Inputs

- kind: link preview or blog (1200 x 630), social post (1080 x 1350) or square (1080 x 1080). When it is missing, use 1200 x 630.
- title: the main text. Required. Use it word for word.
- subtitle: a second line. When it is missing, leave it out.
- badge: a short label in capitals, such as AI or LEADERSHIP. When it is missing and the title clearly names a subject, suggest one word and mark it "proposed"; otherwise leave it out.
- style: Minimal (lots of space, thin lines), Bold (heavy lines, strong blocks) or Poster (the type is the picture, dramatic contrast). When it is missing, use Minimal.

## Steps

1. Choose the look. Look for colours, fonts or a style the person named, in me/profile.md, me/how-i-work.md and files in knowledge/ whose names mention brand, style or design. Their look wins. Otherwise use the plain default: white background, near-black text and lines (#111111), one accent colour (#1F5FAD) used once at most, one bold sans-serif. Say in one line which look you used.
2. Write the image prompt. It states:
   - the exact size and shape;
   - the exact text, each piece in quotes, with its role: title large and bold, subtitle smaller, badge small in capitals in a box;
   - the colours by hex code, and that no other colours, gradients or photos are used;
   - the layout: text left-aligned or centred, margins of at least 40 px, rectangles and lines only, a lot of empty space;
   - what to avoid: extra words, logos, people, decorations, script fonts, busy patterns, soft blurry shadows.
   Show the prompt in one block.
3. Make the image with this app's own tool for making an image. Check what came back: an image or a link.
4. Check the image: every word spelled exactly as given and nothing else written on it; the shape matches the size asked; colours follow the look; no text near the edges. Image makers often misspell text: when a word is wrong, try once more with a shorter, clearer prompt. If it is still wrong, say so, and offer either the image with no text, for the person to add the words, or the same design as an exact-size page made with this app's own tool for making a page or file.
5. If this chat cannot make images, say so plainly. Give the prompt from step 2 to use in any image maker, and the layout in words. List the image under gaps.
6. Offer once to keep the prompt and the text as outputs/YYYY-MM-DD-short-name.md. Write it only on a yes, following the Brain rules for saving, as a new file; when that name is taken, add -2 rather than replace it. The image itself may not be writable through the chat app's GitHub connector: if the write is refused, say so and do not claim it was saved.

## Before you say done

- "Image made" is said only with the image or link the tool returned.
- The words on the image match the inputs exactly, or the reply says which word is wrong.
- No key, password or token was asked for or used. If the person offers one, tell them not to paste it in the chat.
- Nothing was uploaded or posted.
- A save is claimed only with the read-back and the GitHub link.` }, "content-generation": { "title": "Write a post with me", "tagline": "Write a post, newsletter, thread or script with you, step by step", "text": `# Write a post with me

Writes a LinkedIn post, newsletter, X thread or video script with the person in five approved steps, scores it honestly, and keeps each finished piece in their Brain under its own name.

## Inputs

- mode: write something new, score a draft, or turn a piece into other formats. When missing, take it from this chat; a pasted draft with "score" or "check" means score.
- topic: the subject and their view on it. When missing, ask in step 1.
- platform: where it goes. When missing, ask in step 1.
- audience: who reads it. When missing, use me/profile.md if it names their readers; otherwise ask in step 1.
- material: their stories, numbers or the draft. When missing, ask once in step 1; "none" is a fine answer. To score or reformat, ask for the text and wait for it.

## Steps

Before step 1, read the "Writing" part of me/how-i-work.md for their voice, any file in knowledge/ whose name points to their audience, and list outputs/ to see recent pieces so you do not repeat a topic or hook. Write in their voice from those files.

For "Write something new", do steps 1 to 5 in order. End each step with a question and wait for their answer before the next.

1. Clarify. Ask only what is still missing, one at a time: topic and their take, platform, goal (comments, shares, saves, sign-ups or reputation), audience, and the stories or numbers they can use. Then run the check below and tell them the result.
2. Angle. Offer two or three of the six formulas below that fit, each with one line on why it fits and the angle it takes. Recommend one and say why.
3. Hooks. Write five to seven opening lines using different patterns: contrarian statement, number or data teaser, short story opening, sharp question to the reader's situation, mistake confession, before and after, specific promise. Score each 0 to 100 on pattern fit, curiosity, specificity and emotion, with one line on why. Recommend two.
4. Outline. Lay out the chosen hook, each section with its key points and where each story or number goes, the point meant to make people save, share or comment, two call to action options, and the expected length.
5. Final text. Write it to the approved outline and the length for the platform, then run the writing check and the score below. Show the text, the score with its three parts, three strengths, up to two fixes, and the character and word count. Ask whether to change anything or save it.

For "Score my draft": run the writing check and the score on their text, show both, and offer a fixed version. For "Turn a piece into other formats": ask which of the four platforms they want, write one version for each, and run the writing check on each.

Facts: use only numbers and claims from the person, their Brain or a source you can name. If this chat can search the web, you may find supporting data and must give the link for each figure. If it cannot, or you find nothing, leave the claim out or mark it "[needs a source]". Never invent a number, study or quote.

Saving: when they approve a final piece, offer to save it. On yes, save it as a new file outputs/YYYY-MM-DD-<platform>-<two-to-four-topic-words>.md holding the final text, then the score, formula, hook pattern and counts. Try to read that path first; if a file is there, add -2 to the name. Never write over an earlier piece. Follow the Brain rules for saving and read it back.

This skill does not post anything. Give them the final text to post themselves.

### The check before writing (step 1)

Is it against common thinking? Can it be backed by data or experience? Could only this person write it? Can readers act on it this week? Is it timely for the audience? Will it start discussion? Five or six yes: go on. Three or four: sharpen the angle. Two or fewer: suggest another topic.

### Six formulas

1. Decision story: a choice they face or just made, with the stakes.
2. Costly mistake: what went wrong, what it cost, what they learned.
3. Uncomfortable truth: something people in the field think and rarely say.
4. Inside view: how something really works in their industry.
5. Progress update: where they are on a path, with real numbers.
6. Reachable goal: an aim the reader wants, shown to be within reach.

### Lengths

LinkedIn post 1500 to 2000 characters. Newsletter 800 to 900 words. X thread 8 to 12 posts. Video script 8 to 12 minutes spoken.

### Writing check

Scan every draft and fix before showing it:
- "It's not X. It's Y." and similar contradiction lines: state the point directly.
- "Here's the thing" and other announcements: delete them and keep the content.
- Four or more sentences in a row built the same way: vary them.
- Buzzwords such as harness, supercharge, unleash, leverage, synergy, game-changing: use a plain verb.
- Named methods ("I call this the X Method"): explain without the name.
- Questions like "Want to know the best part?" or "Sound familiar?": say it plainly.
- Long dashes: use a full stop or a comma.
Check again after fixing, up to three rounds, and show only the fixed text.

### Score

Hook 40%, fit with the person's voice and role 25%, reasons to save, share or comment 35%. Give each part 0 to 100 and the weighted total. 85 or more: ready. 70 to 84: good. 50 to 69: small changes. Under 50: rework. Say plainly that this is your judgment against this rubric, not a forecast of reach.

## Before you say done

- Each of steps 1 to 5 ended with their answer before the next began, unless they asked you to go straight to the text.
- Every number and claim comes from them, their Brain or a linked source, or is marked "[needs a source]".
- The final text passed the writing check.
- A saved piece is a new file in outputs/, the read-back shows the full text, no earlier file was overwritten, and you gave the link the GitHub tool returned. If the save failed, you said so, the text is in this chat, and it is under gaps.` }, "creator-voice": { "title": "Check against my saved voice", "tagline": "Checks a draft against the voice your Brain has saved, and fixes it", "text": `# Check against my saved voice

Tells the person, line by line, where a draft does not sound like them, measured against what their Brain says about how they write, and can suggest the smallest rewrite that fixes it.

## Inputs

- content: the draft to check. When it is missing, ask for it.
- mode: "Check it" (the default), "Check it and suggest a rewrite", or "Add to my writing notes".

## Steps

1. Read the "Writing" part of me/how-i-work.md and me/skill-notes/creator-voice.md. This is the voice you check against. When there is no "Writing" part or the file cannot be read, say so. Then offer two ways on: the skill "Learn how I write" to build one, or two or three pieces of their own writing pasted here to check against now. Without either, check only for plain writing (needless words, stock phrases, an unclear ask), say that this is all you checked, and list the missing voice under gaps.
2. Find avoided phrases. Go through the draft and list every word or phrase from their "avoid" list that appears in it, quoted with the sentence it is in. This is done by careful reading, not by an automatic test: say so in one line. When one is found, say the draft does not pass yet, and do step 3 only to show what else to fix.
3. Check the draft on five points. For each, say "fits" or "off". For each "off", quote the line from the draft and the line from their writing notes, or their sample, that it goes against:
   - words: does it use words they use, and none they would not.
   - sentence shape: length and rhythm compared with what the notes say.
   - tone: for example direct, warm, playful, how it opens and closes.
   - detail: specific facts and examples, not general claims.
   - avoided phrases: the result of step 2.
4. Give the verdict in one line: "sounds like you" only when step 2 found nothing and every point fits; otherwise "not yet", with the number of problems. Give no score out of a hundred.
5. For "Check it and suggest a rewrite": write the smallest change that fixes each problem, keeping everything that already fits. Show each changed line as before and after. Change no fact, number, name or promise; when a fix would need one, ask instead. Show the whole rewritten draft at the end.
6. For "Add to my writing notes", or when the person says during the check that something is or is not their voice (for example "I never say leverage"): show the exact line you would add to the "Writing" part of me/how-i-work.md, with today's date. Save it only on their yes, following the Brain rules for saving. When a new line says the opposite of an old one, ask which stands. To relearn the whole voice from new writing, point to the skill "Learn how I write". To compare the draft with whole pieces they wrote rather than with these notes, point to "Compare with my past writing".

## Before you say done

- Every problem quotes the draft and the writing note or sample it goes against.
- The reply says what the check was made against: their writing notes, pasted samples, or plain writing only.
- "Sounds like you" is said only when no avoided phrase was found and every point fits.
- A rewrite changed no fact, and the person saw every change.
- A note was said to be saved only when the read-back shows it.
- Nothing was sent or posted.` }, "decide": { "title": "Record a decision", "tagline": "Keep a decision with its reasons, trade-off and review date", "text": '# Record a decision\n\nSaves one decision as a dated file in the person\'s Brain, with what was chosen, over what, why, the trade-off and when to review it.\n\n## Inputs\n\n- decision: what they chose. When it is missing, take it from this chat if a choice was clearly made there and confirm it in one line; otherwise ask.\n- why: the reason. When it is missing, ask. Never write a reason they did not give.\n- alternatives: the other options. When missing, use options named in this chat; otherwise ask once, and accept "none".\n- review_date: when to look at it again. When missing, ask once. If they give none, propose a date about three months out, or a condition ("when we have 10 clients"), and mark it "proposed".\n- detail: Short or Full. When missing, use Short unless they gave pros and cons, success measures or several options, then use Full.\n\n## Steps\n\n1. Collect the pieces: a title of a few words, what was chosen, over what, why, what they give up, and the review date or condition. For Full, also the pros and cons of each option and how they will know it worked. Ask for what is missing one question at a time. Leave out a piece they cannot give rather than invent it.\n2. Check earlier decisions. List decisions/ and read every file whose name bears on this one. If one says the opposite or covers the same ground, show its file name, date and what it says, and ask: this one replaces it, both stand, or stop. When it replaces it, offer to add one dated line at the end of the old file: "Replaced by decisions/<new file name> on YYYY-MM-DD." Change nothing else in the old file.\n3. Name the file decisions/YYYY-MM-DD-short-name.md with today\'s date and two to five lower-case words joined by hyphens. Try to read that path first. If a file is already there, never write over it: if it is the same decision, add to it; if not, add -2 to the name.\n4. Write the record from the template below and show it with its file name. Ask "Save this?" and write only on yes.\n5. Save it as a new file in one commit whose message names the decision, following the Brain rules for saving. Then read it back.\n6. Report in one line: the decision, the file and the link the GitHub tool returned. Name the review date and say whether it is proposed.\n\nShort:\n\n```\n# <Title>\n\nDate: YYYY-MM-DD\nChose: <option>\nOver: <other options, or "none named">\nBecause: <reason, their words>\nTrade-off: <what they give up>\n\n## When we review it\n\n<YYYY-MM-DD or condition> <"(proposed)" if they did not confirm it>\n```\n\nFull: the same title and date, then these sections in order: "## What we decided" (one clear statement), "## Options we weighed" (each option with its pros and cons, the chosen one marked "chosen"), "## Why", "## What we give up and what we gain", "## How we will know it worked" (what would make them revisit it, and what success looks like), and last "## When we review it".\n\nThe file in decisions/ is the only place this decision is saved. There is no index, graph or other store to update. Never say it was added anywhere else.\n\n## Before you say done\n\n- The read-back shows the new file in decisions/ with your text and a "## When we review it" section holding a date or condition.\n- The link you give is the one the GitHub tool returned for this file.\n- No earlier decision file was overwritten; an old file changed only by one added "Replaced by" line, and only on their yes.\n- Every reason, option and date in the file came from the person or this chat, and anything they did not confirm is marked "proposed".\n- If the write or the read-back failed, you said it was not saved, showed the record so they can keep it, and listed it under gaps.' }, "draft-email": { "title": "Draft email", "tagline": "Write an email in your own voice, sent only when you say so", "text": `# Draft email

Writes one email in the person's own voice, sized and toned for the kind of email it is, and sends it only on their yes to the exact text.

## Inputs

- to: who the email is for, a name or an address. When only a name is given, find the address in the connected mail or in knowledge/. Never guess an address: when none is found, ask for it before anything is sent.
- about: what the email is about. When it is missing and the chat does not make it clear, ask one short question.
- goal: who the person is to them and what they want from the email. When it is missing, work it out from the Brain and past emails, and ask only when the type of email or the ask stays unclear.

## Steps

1. Read the Brain for voice and context: me/profile.md for their name and role, the "Writing" part of me/how-i-work.md for how they write, me/skill-notes/draft-email.md for their own changes to this skill, and the files in knowledge/ and decisions/ whose names or text mention the recipient or the subject. Note each file you used.
2. When mail is connected, search it for past emails with the recipient. Read the latest thread in full: what was said, what was promised, who wrote last, and whether this email should be a reply in that thread. Read two or three emails the person sent recently, to match their length, greeting and sign-off. Without connected mail, skip this step and list it under gaps.
3. Pick the type of email, and say which:
   - warm follow-up (they already showed interest): 30 to 50 words, give what they need, warm close.
   - re-engagement (overdue reply): 40 to 80 words, own the gap, give an easy out, no new pitch.
   - first contact: 80 to 150 words, open with something specific about them, the value, one low-effort ask.
   - update: 50 to 150 words, key news first, short list of details, clear next step.
   - thank you: short, genuine, specific about what they did.
4. Write the subject and the body. A specific subject ("Question about Thursday's meeting", not "Following up"). One clear ask. Plain text only, no bold, headings or bullet symbols that an inbox would show as raw characters. Sign off the way the person does, with their name from me/profile.md. Leave out "Hope this email finds you well", "Just checking in", "Per my last email", "Circle back", "Touch base" and any phrase me/how-i-work.md bans. Never state a price, date, promise or fact that no Brain file, past email or the person gave you: ask for it instead.
5. Check the draft before showing it: it sounds like the person and not like a company, it has no needless words, the length fits the type, the ask is clear, and no placeholder is left. Fix what fails.
6. Show the whole email exactly as it would go: To, Cc if any, Subject, whether it is a reply in an existing thread, and the body. Then ask what to do: send it, keep it as a draft in their mail, change it (for example shorter, warmer, or their own words), or stop.
7. On a change, rewrite, show the whole new text again and ask again. A yes given to an earlier version does not cover the new one.
8. On "send", and only for the text shown last, send it with the connected mail, in the thread when it is a reply. On "keep as draft", create the draft in their mail. Report the message or draft id, or the link, the mail tool returned. If the mail tool cannot send, cannot make drafts, failed, or is not connected, say plainly that nothing was sent, give the final text to copy, and list the missing step under gaps.

## Before you say done

- The person saw the full final text, and said yes to that text, before anything was sent or saved as a draft.
- "Sent" or "saved as a draft" is said only with the id or link the mail tool returned. Without it, the reply says nothing was sent.
- The recipient address came from the person, the connected mail or a Brain file, never from a guess.
- Every Brain file and past email you relied on is named, and every one you could not read is under gaps.
- Nothing in the email is a fact no source gave.` }, "email-response-orchestrator": { "title": "Answer my email", "tagline": "Sort your unread email and draft replies you approve one by one", "text": `# Answer my email

Finds the emails that need an answer, drafts each reply in the person's voice, and sends a reply only when they approve that exact text, one email at a time.

## Inputs

- which: which emails to look at. When missing, use unread emails in the inbox from the last 7 days.
- limit: the most emails to draft for in this run. When missing, use 10. Never draft for more than this, and never for emails outside "which".
- skip: senders or topics to leave alone, on top of the usual skips below. When missing, use only the usual skips.

## Steps

1. Read me/profile.md for the person's name, the "Writing" part of me/how-i-work.md for their voice and banned phrases, and me/skill-notes/email-response-orchestrator.md for their own changes, such as senders they always skip or always answer.
2. With the connected mail, search for the emails in "which". From the search results alone (sender, subject, date), skip without opening: newsletters and digests, event and ticket platforms, notifications from software tools, receipts and payment notices, no-reply, notifications and alerts senders, emails older than 7 days unless "which" asks for older, and anything in "skip". If mail is not connected, say so, offer to draft replies for emails the person pastes in, and list the mail under gaps.
3. Open the full thread only for the emails kept. Drop any thread where the person already wrote the last message. Note sender name and address, subject, the latest message and the thread it belongs to.
4. Sort each kept email: sales question, partnership, support, networking, personal, or other. Give it a priority: high for a buyer, a client problem or a partner with something concrete, medium for networking and requests, low for general questions. Read the files in knowledge/ and decisions/ whose names match the sender, their company or the topic.
5. Show the list in one short table: number, sender, subject, type, priority, and "reply" or "skip" with a reason. Ask which to draft. When they do not say, take high and medium, up to "limit".
6. Draft each chosen reply as plain text, with no bold, headings or bullet symbols. Answer the main point first, then two or three supporting points, then one clear next step, and sign as the person does. Keep it under 200 words: a quick answer 50 to 75, a sales reply 100 to 150. Never state a price, date, commitment or fact that no Brain file or email gave: ask the person instead. Check each draft for banned phrases, clichés, long dashes and leftover placeholders.
7. Take the drafts one email at a time. For each, show the sender, subject, a two-line summary of their message, and the full reply as it would go, then ask: send, keep as a draft in their mail, change, or skip. On a change, show the whole new reply and ask again. A yes covers only the one reply shown last. When the person says "send all", still go through each reply and get its own yes.
8. On "send", send that reply with the connected mail, in the same thread. On "keep as draft", create the draft there. Record the message or draft id the mail tool returned. Do not mark emails read, archive, label or delete anything unless the person asks for that exact thing.
9. End with one line per email: sent with its id, saved as a draft with its id, skipped, or not sent and why.

## Before you say done

- Each reply that went out had its own yes, given to its full final text.
- No more emails were drafted or sent than "limit" and "which" allowed.
- Every "sent" or "draft saved" has the id or link the mail tool returned. A reply without one is listed as not sent.
- No email was archived, deleted, labelled or marked read without being asked.
- Nothing in a reply is a fact no source gave, and every Brain file relied on is named.` }, "eval-voice-match": { "title": "Compare with my past writing", "tagline": "Sets a draft beside pieces you wrote and shows where it drifts", "text": `# Compare with my past writing

Tells the person where a draft does and does not sound like them, compared with their own writing and their writing rules, with the lines to change.

## Inputs

- draft: the text to check. When it is missing and the chat holds no draft, ask for it.
- samples: their own writing. When it is missing, use the Brain and any of their own writing earlier in this chat. Ask for samples only when the Brain and the chat have none.

## Steps

1. Gather what their voice is. The samples come first: the pasted ones, their own writing earlier in this chat, and pieces in outputs/ they wrote or approved. Then the "Writing" part of me/how-i-work.md (tone, length, greetings, sign-off, words they avoid) and me/skill-notes/eval-voice-match.md. Note each file you used and each you could not read. When they only want the draft held against their saved writing notes, with fixes, the skill "Check against my saved voice" is made for that.
2. Say how much you have to compare with: how many samples, and roughly how many words. When it is fewer than three pieces or about 300 words, say the comparison is thin and less reliable. With no samples and no writing rules at all, stop and ask for two or three pieces of their writing: there is nothing to compare with.
3. Compare the draft with the samples and rules on five points:
   - Words: words and phrases they use often, and ones they never use or ban.
   - Sentences: length and how much it varies, paragraph length, punctuation habits.
   - Tone: how warm, direct, playful or formal they are, and how they push back or agree.
   - Specifics: concrete examples and details, against general claims.
   - Banned phrases: any phrase the "Writing" part of me/how-i-work.md bans, and common AI phrases such as "I hope this finds you well", "delve", "game-changer", "It's not X. It's Y.".
4. For each point say "matches", "partly" or "differs", and back it with a short quote from the draft beside a quote or rule from their writing, naming the file it came from. Do not give a number or a score: this is your own reading, and you say so.
5. Give an overall verdict: sounds like you, close with a few fixes, or does not sound like you yet. Then the one change that would help most, as a concrete edit (for example: "Paragraph 3 has four sentences under eight words; you usually join them").
6. Offer the draft rewritten with only those fixes, and show it in full when they want it.
7. When the person says something that is a lasting rule about their writing (for example "I never use exclamation marks"), ask once whether to keep it. Show the exact line and say it goes under the "Writing" part of me/how-i-work.md. Save it only on their yes, following the Brain rules for saving.

## Before you say done

- Every "matches", "partly" or "differs" is backed by a quote and names where the comparison came from.
- No number, score or percentage was given, and the reply says the judgement is your reading.
- A thin set of samples is said to be thin.
- A rule was said to be saved only with the read-back and link; otherwise it is under gaps as not saved.
- Nothing was sent.` }, "eval-workflow": { "title": "Check work against my rules", "tagline": "Pass or fail on each of your rules for one finished piece of work", "text": `# Check work against my rules

Tells the person whether one finished piece of work meets the rules their Brain holds for it: pass or fail on each rule, with the evidence, and one verdict.

## Inputs

- work: the work to check, pasted or named as a file in outputs/. When it is missing, list the newest files in outputs/ and ask which one. When a name matches several files, ask which.
- rules: rules for this check only. When it is missing, use only the rules found in the Brain.

## Steps

1. Get the work. For a file, read it from outputs/ with the chat app's GitHub connector. When it cannot be read, say so and ask for it pasted instead.
2. Work out what kind of work it is (an email, a post, a plan, a report) and, when it says or the file name shows, which skill or project it came from.
3. Collect the rules that apply, each with where it came from: me/how-i-work.md, me/skill-notes/<that skill>.md, files in decisions/ whose names bear on this kind of work or its subject, projects/<short-name>/plan.md when it is for a project (its goal and what "done" means), and the rules given in this chat. Use only rules a file or the person states. Do not add rules of your own; you may list up to three things you noticed outside the rules, apart, as notes. When no rules are found at all, say so and ask for two or three rules before checking.
4. Check the work against each rule, one at a time. Give "pass", "fail" or "can't tell", with a short quote from the work that shows it. "Can't tell" is for a rule the work alone cannot show, such as "the facts are right" when no source is given.
5. Give one verdict: ready to use when every rule passes; fix first when any rule fails, naming the failed rules; or can't tell, naming what is missing. No number or score: this is your own reading, and you say so.
6. For each failed rule, propose the smallest fix as a before and after. Show the fixed version in full when they want it. Change no file: when they want the fixed version kept, it is a new file in outputs/, saved only on their yes, following the Brain rules for saving.

## Before you say done

- Every rule checked names where it came from, and no rule was invented.
- Every pass or fail is backed by a quote from the work.
- No number or score was given, and the reply says the judgement is your reading.
- Any file you could not read is under gaps.
- No file was changed, and a new file was saved only on a yes with the read-back and link.` }, "evaluate-candidate": { "title": "Evaluate candidate", "tagline": "Score a candidate profile against your vacancy", "text": '# Evaluate candidate\n\nScores one candidate profile against the role the person is filling, with the evidence for each score, and drafts two outreach messages when it is a match.\n\n## Inputs\n\n- vacancy: the role. When missing, use the only vacancy file in knowledge/ if there is just one; otherwise ask which role.\n- profile: the candidate\'s profile or CV text. When missing, ask them to paste it. Score nothing without it.\n- criteria: must-haves and nice-to-haves. Use these when no vacancy file exists, or to add to one.\n\n## Steps\n\n1. Find the role\'s criteria. List knowledge/ and read the file for this role, named like knowledge/vacancy-<role>.md. Take its must-haves, nice-to-haves, location and availability, and red flags.\n2. If there is no such file and no criteria were given, ask for them in one message: must-haves, nice-to-haves, location or remote rules, red flags. Do not score until you have at least the must-haves. Offer to save them as knowledge/vacancy-<role>.md so the next candidate is faster; save only on yes.\n3. Score the profile 1 to 10 on each dimension, and quote or point to the line of the profile behind each score:\n   - Must-haves met: 40%\n   - Experience level: 30%\n   - Location and availability: 20%\n   - Nice-to-haves: 10%\n   When the profile says nothing about a dimension, write "no evidence" and leave it out of the average instead of guessing. Work out the weighted average over the dimensions you could score, show the sum, and say on how many of the four it rests.\n4. Decide. Match at 6.5 or more. Red flags from the criteria are named even when the score is high. If any must-have has no evidence, the verdict is "maybe" with the exact question to ask the candidate, never "match".\n5. Write the summary:\n\n```\nCandidate: <name> | Role: <role>\nScore: <x.x>/10 on <n> of 4 dimensions: match, no match or maybe\nStrengths: <two or three, with evidence>\nGaps: <one to three, with evidence or "no evidence">\nRecommendation: pursue, skip or maybe (ask: <question>)\n```\n\n6. If it is a match or a maybe, draft two short outreach messages in the person\'s voice, using the "Writing" part of me/how-i-work.md. Angle A opens with a specific detail from the candidate\'s background. Angle B opens with the role\'s opportunity or challenge. Keep each under 120 words. Let them choose; this skill does not send. To send one, offer the skill "Send outreach".\n7. Offer to log the result. On yes, add an entry at the end of knowledge/candidates-<role>.md (create it with the heading "# Candidates for <role>" if it is missing), following the Brain rules for saving, then read it back:\n\n```\n## <name> (evaluated YYYY-MM-DD)\n\nProfile: <link, if they gave one>\nScore: <x.x>/10 on <n> of 4: <verdict>\nWhy: <one or two lines>\nYYYY-MM-DD <name>: stage sourced.\n```\n\n   Keep only what the hiring work needs: name, the public profile link, score, verdict and the short reasons. Never save contact details, age, health, family, religion, salary history or any other private detail unless the person asked to keep that exact detail. Never save the full pasted profile.\n\n## Before you say done\n\n- Every score points to text in the profile or says "no evidence"; none is guessed.\n- The criteria came from their Brain or from them, and the summary says which.\n- Outreach drafts were shown, not sent.\n- A logged entry is in the read-back of knowledge/candidates-<role>.md, everything that was in that file before is still there, and you gave the link the GitHub tool returned. If the write or read-back failed, you said it was not saved and listed it under gaps.' }, "file-changes": { "title": "What changed", "tagline": "The files changed in a pull request or between two branches", "text": `# What changed

Gives the person a clear list of what changed in a repository on GitHub, grouped by area, with the next things to do.

## Inputs

- compare: a pull request, two branches, or a date. When it is a date, show the commits on the default branch since then. When it is missing, ask once which of the three they mean.
- repo: the repository. Take it from a pull request link when there is one. When it is missing, ask once; when they say "my Brain", use their Brain repository.
- view: how to show it. When it is missing, use "Summary by area".

## Steps

1. Get the change with the chat app's GitHub connector: for a pull request, its list of changed files; for two branches, the comparison of the first with the second; for a date, the commits since that date and the files each one touched. Keep for each file its status (added, changed, removed, renamed) and the lines added and removed, as GitHub gives them. Without a GitHub connector that can read this repository, stop and say so.
2. Check that the list is complete. GitHub cuts long lists short: when the result says it is cut, or the count of files differs from the number listed, say how many files are missing from the view.
3. Group the files by area, using the repository's own top folders. Put each file in one of: code, tests, settings and build files, documents, content. For a Brain repository use its folders: me/, knowledge/, decisions/, outputs/ and projects/.
4. Suggest next actions from what changed, only where the files show it:
   - Code changed and no test file changed: suggest adding or updating tests.
   - Settings or build files changed: suggest reading them with care, and checking the pull request's check results.
   - A public function, page or setting renamed or removed: flag it as a possible breaking change.
   - Documents not changed while code did: suggest checking whether the README still holds.
   - In a Brain: a new file in knowledge/ that nothing else mentions, or a decision with no review date under "## When we review it".
5. Show it in the chosen view:
   - Summary by area: each area with its files and status, then totals (files, added, changed, removed, lines added and removed), then up to five next actions.
   - Every file in detail: each file with its status and line counts, and one line on what the change does, read from its diff. Mark a file "not read" when its diff was too large to open.
   - How to split into commits: group the files into a few commits that each do one thing, give each a short commit message, and say which files did not fit clearly. This is a proposal: nothing is committed.

## Before you say done

- Every number comes from what GitHub returned; none is estimated.
- A list that GitHub cut short says how much is missing.
- Nothing in the repository was changed.
- Any file or commit you could not read is under gaps.` }, "first-week-onboarding": { "title": "First week onboarding", "tagline": "Seven short days of real work that teach you your Second Brain", "text": `# First week onboarding

Guides the person through their first week with their Second Brain, one day per run, each day on real work of theirs, with where they are kept in projects/first-week/plan.md.

## Inputs

- first_win: a real piece of work for Day 1. When it is missing on Day 1, ask for one (step 4).
- day: the day to do. When it is empty, use the first day not done in projects/first-week/plan.md, or Day 1 when there is no plan.

## Steps

1. Read projects/first-week/plan.md. When it exists, show which days are done and which day this run does. When it does not exist, show the week below, one line per day, and offer to keep it there in the shape the skills "New project" and "Plan the steps" use: "# First week", "- Status: active", "- Started: <YYYY-MM-DD>", "## Goal" (a working Second Brain in a week), "## Context", "## Steps" with "### Step 1: Day 1, a quick win" to "### Step 7: Day 7, looking back", each with "- State: to do", and "## Log". Save only on their yes, following the Brain rules for saving. On a no, or when the Brain cannot be written, say the week will not be remembered between chats and go on. Result: the day to do.
2. Read me/plan.md and me/tools.md, besides what the Brain rules say to read. Result: what the person works on and which apps they have, or a gap for each file missing.
3. Check the list of skills the person has in this chat. Name a skill only by its title from that list. When a skill named below is not in it, do the same work by plain request in this chat. Never name a command.
4. Do the day. Each day ends with a named result.
   - Day 1, a quick win. Use first_win. When it is missing, ask: what is one real piece of work you need this week that you could finish in under an hour? Offer two suggestions from me/plan.md or me/profile.md, marked as suggestions; never use a stand-in such as "your first task". Do it with "Small task, start to finish". Result: a finished piece of work, offered for outputs/.
   - Day 2, finding things. Run three searches in the Brain: their role or company, a client or project from me/profile.md, and the subject of Day 1. For each, list the matching files in me/, knowledge/, decisions/ and outputs/ with one line from each. A search that finds nothing is reported as a gap in the Brain, not hidden. Result: what the Brain knows and what it is missing.
   - Day 3, your usual way of working. Do one real task with the cycle the person will use most ("Task with a plan" when it is in their list), and have them ask for at least one change. Result: a result they can use, offered for outputs/.
   - Day 4, a first lesson. Look at this week's files in outputs/ and offer two things that worked well in them; when there are none, ask the person what worked. Keep the one they pick with "Save what I learned". Result: the lesson's file and link.
   - Day 5, improving. Take the Day 1 or Day 3 result from outputs/ (when it was not kept, ask the person to paste it) and redo it using the Day 4 lesson and what Day 2 found. Show the two side by side with what changed and why. Result: the new version, offered as a new file in outputs/; the old one stays.
   - Day 6, another way. Do a new task with a different cycle: after "Small task, start to finish" try "Task with a plan", after "Task with a plan" try "Big work, two sign-offs", after "Big work, two sign-offs" try "Small task, start to finish" on a small task. Ask how it felt different and when they would choose it. Result: their answer in one or two lines.
   - Day 7, looking back. List what the Brain gained since Day 1: files in outputs/, knowledge/ and decisions/ dated this week or added in this week's commits, when the GitHub connector shows them. Ask: what worked, what was hard, what next. Draft at most three aims for next week. Result: the week's tally and the aims, which you offer to add to me/plan.md without rewriting it.
5. Show the day's checks: did the person get the day's result, and was what they wanted kept actually saved? When the plan is saved and the day's result is there, change that day's State line to "done <YYYY-MM-DD>" with no extra yes, as the Brain rules allow. Their one-line note on the day goes under "## Log" only if they want it kept and say yes. Result: plan.md read back with the day done, or a line that it was not updated.
6. Name the next day and what it will ask of them, in one line.

## Before you say done

- The day used the person's own work, never a stand-in task.
- Every skill named is in their list in this chat, named by its title.
- "Saved" or "done" in plan.md is said only with a read-back that shows the text and the link GitHub returned.
- Nothing was kept that the person did not say yes to, and their reflections were kept only when they asked.
- Nothing was sent or published.` }, "frontend-slides": { "title": "Slide deck", "tagline": "A presentation that opens in any browser, from your notes", "text": `# Slide deck

Gives the person a slide deck as one self-contained web page in their own look, where every slide fits the screen with no scrolling.

## Inputs

- purpose: pitch, teaching, conference talk or internal. When it is missing, take it from the content; ask only when it stays unclear.
- length: short (5 to 10), medium (10 to 20) or long (20 or more). When it is missing, fit the content.
- content: notes, an outline, a topic, an uploaded PowerPoint, or an earlier deck to improve. When it is missing, ask once. With a topic only, use knowledge/ files that match it and ask for the facts the deck needs; never invent numbers, quotes or results.
- style: the look they want. When it is missing, use their usual look (step 3).

## Steps

1. Pick the mode. New deck from notes or a topic. PowerPoint: read the uploaded file with this app's own tool for reading files; take each slide's text, notes and images, show the extracted outline and ask the person to confirm it. If the file cannot be read, say so and ask them to paste the text. Improve a deck: read the earlier HTML from the chat or outputs/ and keep its content unless asked.
2. Plan the slides as a numbered list: one heading and its points per slide, within these limits:
   - title slide: a heading, a subtitle, an optional line;
   - content slide: a heading and 4 to 6 short bullets, or two short paragraphs;
   - grid: a heading and at most 6 cards;
   - code: a heading and at most 10 lines;
   - quote: at most 3 lines and who said it;
   - image: a heading and one image.
   Too much for one slide: split it. Show the plan and go on unless the person changes it.
3. Choose the look. The style input wins. Then colours, fonts or a style named in me/profile.md, me/how-i-work.md or files in knowledge/ whose names mention brand, style or design. Otherwise use the plain default: white background, near-black text (#111111), grey secondary text (#555555), one accent colour (#1F5FAD); one sans-serif with bold headings; left-aligned text; slide numbers 01, 02 in small type. For a conference talk use the dark version: near-black background, white text. Say in one line which look you used. When the person asks to choose a style, make three one-slide previews in different looks first and let them pick.
4. Build one HTML file with all style and script inside it; at most one web-font link. These rules are required:
   - Each slide is exactly one screen: height 100vh and 100dvh, overflow hidden, scroll snapping from slide to slide.
   - All font sizes and spacing use clamp() or viewport units; no fixed pixel heights on content.
   - Height breakpoints at 700, 600 and 500 px shrink padding and type; below 600 px hide decorations and navigation dots. Below 600 px width, grids become one column.
   - Images have a max height (about 50vh) and keep their shape.
   - Navigation: arrow keys, space, page up and down, swipe, mouse wheel; a thin progress bar; small navigation dots; the current slide number.
   - Motion is subtle: fade and slide up, staggered about 100 ms, no bounce. Respect reduced-motion settings.
   - Avoid generic looks: purple gradients, glassmorphism, everything centred, clip art.
   Images from a PowerPoint are embedded in the file.
5. Check the code against every rule in step 4 and the limits in step 2, slide by slide. Fix what fails. You checked the code by reading it; it was not tested on real screens unless this app showed you the page rendered.
6. Deliver the deck with this app's own tool for making a page or a file, and check that it returned the page or file. If this chat has none, say so and give the whole HTML in one block to copy into a file ending in .html. Ask the person to open it on a laptop and a phone and say if any slide scrolls or cuts text.
7. Offer once to keep the deck as outputs/YYYY-MM-DD-short-name.html. Write it only on a yes, following the Brain rules for saving, as a new file; when that name is taken, add -2 rather than replace it. When improving a deck already in outputs/, save the new version as a new file unless they ask to replace the old one.

## Before you say done

- "Deck made" is said only with the page or file the tool returned, or with the full HTML in the reply.
- The reply says the screen checks were made by reading the code, and names any rule that could not be met.
- Every fact on the slides came from the person, their file or a named Brain file.
- A save is claimed only with the read-back and the GitHub link.` }, "full-cycle-auto": { "title": "Planned code change", "tagline": "Plan, build and review a code change, with two yeses from you", "text": `# Planned code change

Takes one code change in a GitHub repository from plan to a reviewed pull request: plan, build, check, review, and a list of what to fix for the person to choose from. It moves through the work with few questions, but asks before each thing it writes.

## Inputs

- task: the change. When what "done" means is unclear, ask one short question before planning.
- repo: the repository. When it is missing, ask once. This skill is for code and site repositories; for work in the Brain itself, say that "Task with a plan" or "Big work, two sign-offs" fits better and stop.
- issue: an issue that already describes the work. When it is given, read it and use it as the plan's starting point instead of writing a new issue.

## Steps

1. Read the repository with the chat app's GitHub connector: its README, any contributing file, the files the change will touch, in full, from the default branch, and open issues and pull requests whose titles bear on the task, so work is not done twice. Without a GitHub connector that can read and write this repository, stop and say so; you can still write the plan as text.
2. Plan. Write: the goal in one sentence, what "done" looks like as checks a person can see, the files to change and what changes in each, the risks, and what someone must test by hand. Keep it to what the task needs.
3. First yes. Show the plan, the exact issue title and text, the branch name and the pull request title you would use. Ask one question: go ahead with all of this, change it, or stop. When an issue was given, ask whether to add the plan to it as a comment instead.
4. On that yes, create the issue (or add the comment) and give the link the GitHub tool returned.
5. Build. Write every file change the plan needs, matching the style of each file. Then show the whole change at once: each file's path with the lines before and after, and the commit message. Second yes: write it, change it, or stop.
6. On that yes: create the branch from the latest default branch, commit the files, and open a pull request into the default branch that links the issue. Never write to the default branch itself. Read the files back from the branch and give the pull request link. When any part failed, say exactly what exists now.
7. Check. Read the pull request's check results and report each by name: passed, failed with the quoted cause, or still running. With no checks, say no checks ran. You cannot run code, tests, a database or a browser in this chat. When a check posted a preview link, list it. Then list the hand tests from the plan for the person to do.
8. Review the pull request as it now stands on GitHub: AI slop (comments, defensive checks and style unlike the file), correctness and edge cases, error handling, security (input checks, injection, escaping, sign-in and permission checks, secrets), tests changed with the code, and new dependencies. Give each finding with its file and line, marked must fix, should fix or small.
9. Triage. Show the findings and the failed checks as one numbered list, and ask which to fix now, which to leave and which to note on the issue. Stop here and wait.
10. For each fix they choose, show the exact change and commit it to the same branch only on a yes, then read it back. A note on the issue is posted only on a yes to its text. Merging is the person's step; merge only when they ask, with the link GitHub returned.

## Before you say done

- The issue and the code were each written only after a yes to exactly what was shown, and the default branch was not written to.
- Each issue, pull request and commit is reported with the link GitHub returned, and each commit with a read-back.
- Nothing says the code works or tests pass unless a check on GitHub said so; hand tests are listed as not done.
- Any file you could not read, and any step that failed, is under gaps.` }, "full-cycle": { "title": "Big work, two sign-offs", "tagline": "A big or high-stakes project, with your sign-off on plan and result", "text": `# Big work, two sign-offs

Takes a large or high-stakes piece of work through five phases: plan, work, test, review and triage, with the person's approval after the plan and after the review. The plan lives at projects/short-name/plan.md, so the work can run over several chats.

## Inputs

- task: the project or result. When it is missing, ask.
- project: the short name of a plan to pick up. When it is empty, list the folders in projects/ and, when one name clearly matches the task, ask whether to pick it up.
- deadline: when it must be finished. When it is missing, use one from the plan, the task or the Brain, or plan without one and say so.

## Steps

Plan

1. When a plan is to be picked up, read projects/short-name/plan.md. When it exists, show its goal, its phase (the newest "Phase:" line under "## Log") and each step's State line, and carry on from there on the person's yes. When it does not exist, say so and start new.
2. Read the files in knowledge/, decisions/ and outputs/ whose names bear on the task, besides what the Brain rules say to read, and follow me/skill-notes/full-cycle.md when it exists. Note each file you relied on and each you could not read.
3. Write the plan: the goal in one line; the requirements, each marked given, found (name the file) or assumed; "## How we will check it", 3 to 8 yes-or-no checks the result must pass, written now, before any work (for example "every figure has a source" or "fits on two pages"); the steps, each one action with a checkable result, a size and what it depends on; the risks, each with what you would do about it; and whether the deadline fits. Result: the full plan.
4. First approval. Show the plan in full and ask the person to approve it or say what to change. Do no work before an explicit approval. After a change, show it again. Then offer to keep it at projects/short-name/plan.md in the shape the skills "New project" and "Plan the steps" use: "# <title>", "- Status: active", "- Started: <YYYY-MM-DD>", "## Goal", "## Context" (the requirements, the risks and "How we will check it"), "## Steps" with each step as "### Step <N>: <action>" and its "- State: to do", "- Check:", "- Needs:" and "- Size:" lines, and "## Log" with "- <YYYY-MM-DD>: Phase: work.". Pick another name when that folder holds another project, and save on their yes following the Brain rules for saving. On a no, or when the Brain cannot be written, say the plan lives in this chat only. Result: the approved plan, with its link and read-back or "not saved".

Work

5. Do the steps in order and show each result. Keep a log in your reply: each choice you made along the way and why. A choice that would change the goal, the scope or a check is not yours: stop and ask. When a step is blocked, say what it needs, mark it blocked and go on with what does not depend on it. When the plan is saved, change each step's State line in plan.md as it ends, with no extra yes, and read it back. Use only the person's words, the Brain files you read and connected apps; mark anything else "unconfirmed". Result: every step's result and the log of choices.

Test

6. Run each check from "How we will check it" against the result: pass or fail, with the evidence (where in the result, and which source). Also check each fact, figure and name against the file or app it came from. A check a chat cannot run, such as running code or opening a system that is not connected, is "not run" with the reason, never "pass". Fix what fails within the plan and run that check again. Result: the test table.

Review

7. Second approval. Show the result, the test table, what is still open and at most three improvements. Ask the person to accept it or say what to change. A change goes back through Work and Test for the parts it touches. Result: the accepted result.

Triage

8. List every open point: a failed or unrun check, an unfinished or blocked step, a risk not closed, an improvement not taken. For each, propose one of: do now, add as a next step in the plan, or drop. The person decides each one. Result: the triage list with their choices.
9. Offer the saves as one list, each one kept only on its own yes, following the Brain rules for saving:
   - the accepted result as outputs/YYYY-MM-DD-short-name.md, never writing over a file of that name;
   - in plan.md, the triage points added as new steps and a "Phase:" line under "## Log" set to done or to what comes next, never rewriting their goal or steps (State lines, "done <YYYY-MM-DD>" or "blocked <YYYY-MM-DD>: <reason>", were already changed in Work);
   - each choice from the log that the person wants kept, as decisions/YYYY-MM-DD-short-name.md with why it was made and a review date under "## When we review it" marked "proposed" until they confirm it;
   - at most three things learned from the person, for me/how-i-work.md or the file in knowledge/ that fits.
   Result: each saved file with its link, and what was not kept.

## Before you say done

- No work started before the first approval, and the result was accepted at the second.
- Every check is pass, fail or not run with evidence; nothing unrun is shown as passed.
- "Saved" is said only with a read-back that shows the text and the link GitHub returned; no file lost what was there.
- Nothing was kept without a yes, and nothing was sent or published.` }, "generate-pdf": { "title": "Make a PDF", "tagline": "Turn a document into a clean PDF to share", "text": `# Make a PDF

Turns the person's document into a clean, print-ready PDF in their own look, and says plainly when this chat cannot make the file.

## Inputs

- source: the text, an uploaded file, or the path of a file in the Brain. When it is missing, use the document just written in this chat if there is one; otherwise ask one short question.
- title: the title on the first page. When it is missing, use the document's first heading, or its file name in plain words.

## Steps

1. Get the text. Pasted text: use it as it is. An uploaded file: read it with this app's own tool for reading files. A Brain path: read it with the chat app's GitHub connector. If the file cannot be read or does not exist, say which and ask for the text; do not rebuild it from memory.
2. Check the structure without changing the words: one title, headings in order, lists, tables with a header row, code kept as code, quotes marked. Fix only formatting (a broken table, a skipped heading level). List any change you made.
3. Choose the look. Look for colours, fonts or a style the person named, in me/profile.md, me/how-i-work.md and files in knowledge/ whose names mention brand, style or design. Their look wins. Otherwise use the plain default:
   - white page, near-black text (#111111), grey for secondary text (#555555), one accent colour (#1F5FAD) for headings and table headers only;
   - one clean sans-serif for text, a monospace font for code;
   - A4 or US Letter as the person uses, margins of about 2 cm.
   Say in one line which look you used.
4. Lay it out with these rules:
   - Title on the first page with the date; no header or footer text on other pages, page numbers only.
   - Tables: shaded header row, light alternating rows, never split a row across pages.
   - Code: monospace on a light grey box, lines wrapped, never cut off.
   - Quotes: indented with a thin bar on the left.
   - A heading never sits alone at the bottom of a page.
5. Make the PDF with this app's own tool for making a file. Check what came back: a file or a link. When the app can show the PDF, look at the first page and one page with a table or code, and fix what broke.
6. If this chat has no tool that makes a PDF, or the tool failed, say so plainly. Give the document as one complete HTML page with the look and print rules above, in one block to copy, and tell the person they can open it in their browser and choose Print, then Save as PDF. List the PDF under gaps.
7. Offer once to keep the source. Name the exact file: outputs/YYYY-MM-DD-short-name.md (skip this when the source is already a Brain file). Write it only on a yes, following the Brain rules for saving, as a new file; when that name is taken, add -2 rather than replace it. The PDF itself may not be writable through the chat app's GitHub connector: if the write is refused, say the PDF was not saved there. When Drive is connected and the person asks, upload the PDF there and give the link Drive returned.

## Before you say done

- "PDF made" is said only with the file or link the tool returned. Without it, the reply says no PDF was made and gives the print-ready page.
- The words are the person's own; only formatting changed, and each change is listed.
- Every save is backed by a read-back and the GitHub link; every upload by the Drive link. Anything not saved is under gaps.` }, "grow": { "title": "How my Brain is growing", "tagline": "See what your Brain holds and what it gained lately", "text": '# How my Brain is growing\n\nGives the person a short scoreboard of their Brain: what it holds, what it gained in the last seven days and what needs care, built only from the files in their repository.\n\n## Steps\n\n1. List the files in me/, me/skill-notes/, knowledge/, decisions/ and outputs/, and the folders in projects/. Count the files in each, leaving out README files. When a listing failed, write "not read" for that folder, never 0. When a listing may be cut short (the tool says so, or it returned a round number such as 100 or 1000), write "at least N".\n2. Check me/profile.md, me/how-i-work.md, me/tools.md and me/plan.md: for each, whether it exists and whether it has more than its headings. Read each one only far enough to tell.\n3. Find what was added in the last seven days from today\'s date:\n   - When the GitHub connector can list the repository\'s commits, list those of the last seven days and the seven before, and note the files each added or changed. Count new files per folder for both weeks.\n   - Otherwise use the dates in file names (decisions/ and outputs/ carry one) and say that only dated files were counted.\n   Say which of the two you used.\n4. For each project in projects/, read its plan.md Status and count its steps done out of all.\n5. Find what needs care, only from what you read:\n   - decisions whose "## When we review it" date has passed (read the decisions/ files from the newest, up to 20, and say when there were more);\n   - a me/ file that is missing or empty;\n   - an active project with no step done or logged in the last 14 days;\n   - a folder with nothing new this week when it had something the week before.\n6. Show the scoreboard in this shape, using only numbers counted in this chat:\n\n```\nYour Brain, week of <date>\n\nWhat it holds\n  Facts about your work (knowledge/)   <N> files\n  Decisions (decisions/)               <N>\n  Finished work (outputs/)             <N>\n  Projects (projects/)                 <N>, <N> active\n  Your skill changes (me/skill-notes/) <N>\n  About you (me/)                      <which of profile, how I work, tools, plan are filled>\n\nLast 7 days\n  <N> new and <N> changed files, against <N> and <N> the week before\n  New: <file names>\n\nNeeds care\n  <one line each, with the file it rests on>\n```\n\n7. Under the scoreboard, say in one line what it does not cover: this Brain keeps no record of which skills you used or a voice score, so neither is shown. Suggest one move for the first item under "Needs care", such as a decision to review or "Save what I learned" to fill an empty file.\n\n## Before you say done\n\n- Every number was counted in this chat from a listing or commits that were read; none is an estimate or an example.\n- A folder that could not be read shows "not read", and is under gaps.\n- No skill-use count, score or time saved is shown.\n- Nothing was written to the Brain.' }, "idea": { "title": "Save an idea", "tagline": "Capture an idea in seconds, sorted and kept in your Brain", "text": '# Save an idea\n\nAdds one idea to the person\'s Brain in seconds, sorted by category and priority, and warns when a similar idea is already there.\n\n## Inputs\n\n- idea: the idea in their words. When it is missing and this chat does not hold one, ask "What is the idea?" and wait.\n\n## Steps\n\n1. Take the idea in their words. Make a title from its first sentence, at most eight words. When they gave several ideas, treat each on its own. When one idea is longer than about 500 characters, ask once whether to keep it as one idea or split it.\n2. Sort it. Category: product, content, business, tech, process, client or personal. Priority: high when they say urgent, critical, soon or a client asked; low when they say someday, maybe or nice to have; medium otherwise. Area: a few words such as sales, marketing or operations.\n3. Choose the file: knowledge/ideas-<category>.md, for example knowledge/ideas-product.md. If knowledge/ already has an ideas file that clearly fits, use that one instead.\n4. Read the file as it is now. If it does not exist, you will create it with the heading "# <Category> ideas". If it holds an idea that says much the same, show it with its date and ask: add these details to that idea, save this as a new idea, or save nothing.\n5. Read the files in knowledge/ and decisions/ whose names bear on the idea, and list the folders in projects/. Note any that relate, by file name, for the "Related" line; when the idea belongs to a project, name its plan file, projects/<short-name>/plan.md. Never invent a link.\n6. Write the entry:\n\n```\n## <Title> (added YYYY-MM-DD)\n\nCategory: <category> | Priority: <priority> | Area: <area> | Status: new\n\n<the idea in their words>\n\nWhy it may matter (suggested): <one or two sentences>\nFirst steps (suggested):\n1. <step>\n2. <step>\nRelated: <file names, or "none found">\n```\n\n7. Show the entry and the file. Their idea is already the yes for their own words; ask one question about the suggested parts: "Save with the suggestions, or only your words?" Then save, following the Brain rules for saving. The new entry goes at the end of the file, after everything already there. For a new file, write the heading and then the entry. To add to an existing idea, put a dated line "Added YYYY-MM-DD: <details>" under that idea and change nothing else.\n8. Read the file back. Report in one line: the title, category and priority, the file, and the link the GitHub tool returned. Then give the suggested first steps once more in the reply.\n\nNothing else is updated: no counters, and no project\'s plan is changed. The "Related" line is the only link. When they want the idea to become a step in that plan, offer the skill "Plan the steps".\n\n## Before you say done\n\n- The read-back shows the new entry or added line, and every idea that was in the file before is still there, word for word.\n- When the file was new, the read-back shows the heading and the entry.\n- Parts you suggested are marked "suggested", and were saved only if they said yes to them.\n- If the write or the read-back failed, you said the idea was not saved, showed the entry so they can keep it, and listed it under gaps. Never say "captured" without the read-back.' }, "import-ai-history": { "title": "Import past AI chats", "tagline": "Keep what matters from your past ChatGPT, Claude or Gemini chats", "text": `# Import past AI chats

Brings the useful parts of the person's past AI chats into their Brain, chat by chat, saving only what they confirm.

## Inputs

- platform: which AI the chats come from. When it is missing or "Not sure", tell from the file once it is here, and ask only when you cannot.
- which: the chats to start with, by subject, date or number. When it is missing, list the chats and ask, as in step 3.

## Steps

1. When the person has no export yet, walk them through making one, one step at a time, and say menu names may differ a little from what they see:
   - ChatGPT: Settings, then Data controls, then Export data. A download link arrives by email. The download is a zip file holding conversations.json.
   - Claude: Settings, then Privacy, then Export data. A download link arrives by email, with conversations.json inside.
   - Gemini: Google Takeout (takeout.google.com), choose only My Activity and, inside it, Gemini Apps.
   Then ask them to upload the file into this chat, or to put it in their connected Drive and say where. Stop here until it is here.
2. Open it with this app's own tool for reading an uploaded file, or with the connected Drive. Check that it really is a chat export. Say plainly what you could read: how many chats you found, their date range, and whether the file opened in full or only in part. When the zip will not open, ask for conversations.json alone. When the file is too large to open at all, say so and offer two ways on: a smaller export, or chats copied and pasted from the AI's own history page, a few at a time.
3. List the chats you can see, newest first: date, title and length, at most 30 at a time. Ask which to read, matched to which when given. Never pick or read all of them on your own.
4. Read the chosen chats, at most five per batch. Read knowledge/imported-sources.md first and skip any chat already listed there with the same AI, title and date, saying which you skipped.
5. Read me/profile.md, me/how-i-work.md and the files in knowledge/ and decisions/ whose names bear on the chats.
6. For each chat, propose what is worth keeping, as numbered items: a fact about their work for a file in knowledge/ (an existing file on that subject first), a preference about how they work for me/how-i-work.md, something about who they are for me/profile.md, or a choice and its reason for a new file in decisions/ named YYYY-MM-DD-short-name.md, dated with the chat's date. Keep the person's own words and conclusions, not the AI's long answers. Mark what the Brain already holds and anything that says the opposite. Leave out health, money, family and other private matters unless the person asks for them, never save private details about other people, and say what you left out.
7. Ask which items to save, and say that a line for each chat read will go in knowledge/imported-sources.md, so it is skipped next time. Save only what they chose, following the Brain rules for saving. End each item with the AI's name, the chat's title and its date.
8. Add one line per chat read to knowledge/imported-sources.md: today's date, the AI's name, the chat's title and date, and what was saved where, or "nothing kept". Create the file with the heading "Imported sources" when it does not exist.
9. Read back every file you wrote and report each with the link the GitHub tool returned. Say how many chats are read so far out of how many found, and offer the next batch.

## Before you say done

- The report says how many chats were found, how many were read and which ones; it never says the history was imported when only part of it was read.
- No whole chat was saved, and nothing was saved that the person did not confirm.
- The read-back shows each saved item with the earlier text still there.
- knowledge/imported-sources.md lists every chat read in this run.
- No password, key, card number or private detail about another person was saved.` }, "import-content": { "title": "Import a link or file", "tagline": "Bring a link, an uploaded file or pasted text into your Brain", "text": `# Import a link or file

Takes whatever the person hands over, works out what it is, reads it the right way, and keeps in their Brain only what they confirm.

## Inputs

- source: a link, or text the person pasted. A file they upload into this chat counts too. When none of these is here, ask once for a link, an upload or pasted text.

## Steps

1. Work out what it is, and say it in one line:
   - a Google Drive link: read it with the connected Drive.
   - a YouTube or other video link: a video can be used only through its words. Ask for a transcript to paste or upload, or use one a connected app provides. Never describe a video you could not read the words of. For a long video, say that the skill "Import from video" is made for it.
   - an export of AI chats (a conversations file from ChatGPT, Claude or Gemini): say that the skill "Import past AI chats" is made for it, since these files are large and must be read in parts, and stop here unless the person wants only a few chats now.
   - another web page: read it with this app's own tool for reading web pages. When the chat has none, or the page needs a sign-in, ask them to paste the text.
   - an uploaded file (text, Word, PDF, web page): read it with this app's own tool for reading an uploaded file.
   - pasted text: use it as it is.
   - anything else: say what it looks like and that you cannot read it here, and ask for the text instead.
2. Read it. Say whether you read it in full, in part (up to where) or not at all. A file or page too long to read whole is read in parts the person chooses, and you never say you read what you did not.
3. Read knowledge/imported-sources.md when it exists. When the same link or file name is listed there, say when it was brought in and what was kept, and ask whether to go on.
4. Read me/profile.md, me/how-i-work.md and the files in knowledge/ and decisions/ whose names bear on the content, so you can tell what is new.
5. Propose what is worth keeping, as a numbered list of at most ten items. For each: the text to save in plain words, where in the source it came from, and where it goes: me/profile.md or me/how-i-work.md for something about the person, a file in knowledge/ for a fact about their work (an existing file on that subject first), a new file in decisions/ named YYYY-MM-DD-short-name.md for a choice and its reason. Mark items the Brain already holds, and point out anything that says the opposite of a Brain file. Leave out passwords, keys, card numbers and private details about other people, and say you left them out.
6. Ask which items to save: all, some by number, or none, and say that a line for this source will go in knowledge/imported-sources.md. Save only those, following the Brain rules for saving, with the source's name or link at the end of each item.
7. Add one line to knowledge/imported-sources.md: today's date, the kind of source, its name or link, and what was saved where, or "nothing kept". Create the file with the heading "Imported sources" when it does not exist.
8. Read back every file you wrote, and report each saved item with its file and the link the GitHub tool returned.

## Before you say done

- You said what the source was and how much of it you read.
- Every saved item was shown and confirmed first, and the read-back shows it with the earlier text still there.
- Nothing was described from a video, page or file whose words you did not read.
- knowledge/imported-sources.md has a line for this source.
- Nothing private about another person, and no password, key or card number, was saved.` }, "import-from-drive": { "title": "Import from Drive", "tagline": "Keep what matters from your Google Drive documents in your Brain", "text": `# Import from Drive

Brings what matters from the person's Google Drive documents into their Brain, a few at a time, saving only what they confirm and never the same document twice.

## Inputs

- folder: the Drive folder or document to read, by name or link. When it is missing, ask once which folder. Never read the whole Drive.
- focus: what to look for in the documents. When it is missing, look for facts about their work, how they like work done, and choices they made.

## Steps

1. Check that the connected Drive can list and read files. When this chat has no Drive connector, stop the Drive part: say so, offer that they upload a document into this chat or paste its text instead, and list Drive under gaps.
2. Find the folder in the connected Drive. When several match, show them and ask which one. List its documents with name, type and last change date. Text, Google Docs, Word, PDF and web pages can be read; list any other kind as skipped. When the folder holds more than 30 documents, show the list and ask which ones or which subfolder to start with.
3. Read knowledge/imported-sources.md in the Brain when it exists. A document already listed there with the same Drive link and the same last change date is skipped; say how many were skipped. A document listed with an older change date is offered again as changed.
4. Read the chosen documents, at most five per batch. For each, note whether it could be read in full, only in part (say up to where) or not at all. Never fill in a part you could not read.
5. Read me/profile.md, me/how-i-work.md and the files in knowledge/ and decisions/ whose names bear on what you found, so you can tell what is new.
6. Propose what is worth keeping from the batch, as a numbered list. For each item: the text to save in plain words, the document it came from, and where it goes: me/profile.md or me/how-i-work.md for something about the person, a file in knowledge/ for a fact about their work (an existing file on that subject first, a new one only when none fits), a new file in decisions/ named YYYY-MM-DD-short-name.md for a choice and why it was made. Mark an item "already in your Brain" when a file says the same, and point out where a document says the opposite of a Brain file. Leave out passwords, keys, card numbers and private details about other people, and say that you left them out.
7. Ask which items to save: all, some by number, or none, and say that a line for each document read will go in knowledge/imported-sources.md, so it is skipped next time. Save only those, following the Brain rules for saving. Put the document's name and link at the end of each saved item.
8. Add one line per document you read to knowledge/imported-sources.md: today's date, "Drive", the document's name, its link, its last change date, and what was saved where, or "nothing kept". Create the file with the heading "Imported sources" when it does not exist.
9. Read back every file you wrote. Report each item saved with its file and the link the GitHub tool returned. Then offer the next batch, or stop when the person says so.

## Before you say done

- Every saved item was shown and confirmed first, and the read-back shows it with the earlier text still there.
- knowledge/imported-sources.md lists every document read in this run, so a second run skips them.
- Each document read only in part, or not at all, is named under gaps with where reading stopped.
- No document is called imported unless its items were saved and read back.
- Nothing private about another person, and no password, key or card number, was saved.` }, "import-from-video": { "title": "Import from video", "tagline": "Keep what was said in a video, from its transcript", "text": `# Import from video

Turns what was said in a video into text the person can find again, and keeps the parts that matter in their Brain. It works from the video's words only; it never watches a video.

## Inputs

- video: the video's link or title, used to name and date what is saved. When it is missing, ask for the title once.
- transcript: the video's words. It may also come as a file uploaded into this chat, or from a connected app that holds it (for example a transcript file in the connected Drive). When there is none, see step 1.

## Steps

1. Get the words. Use, in this order: the pasted transcript, a transcript file uploaded into this chat (read with this app's own tool for reading an uploaded file), or a transcript a connected app provides. When there is none, stop and say plainly that a chat cannot get words from a video by itself. Tell them how to get them: on YouTube, the video's "Show transcript" option, copied and pasted here; for their own video file, the transcript their recording or meeting app made. Never write a transcript, summary or quote from the title, the link or what the video is probably about.
2. Say what you have: the title, how long the transcript is, whether it has times, and whether it looks whole or cut off. When it is too long to read in one go, read it in parts the person chooses (for example the first half hour) and say which parts you read.
3. Read knowledge/imported-sources.md when it exists. When this video is listed, say when it was brought in and what was kept, and ask whether to go on.
4. Offer a clean copy of the transcript: a heading with the title, the source link, the length when known and today's date, then the text split into short sections. Each section starts with its time, like [12:30], only when the transcript gave that time; never invent times. Tidy line breaks and remove repeated caption lines, but change no words. Ask whether to save it as outputs/YYYY-MM-DD-transcript-short-name.md. When it is too long for one write, save it in parts to the same file and read back each part.
5. Read me/profile.md, me/how-i-work.md and the files in knowledge/ and decisions/ whose names bear on the video's subject.
6. Propose what is worth keeping, as a numbered list of at most ten items: the point in plain words, its time in the video when known, and where it goes (a file in knowledge/ for a fact or method, me/how-i-work.md for how the person works, a new file in decisions/ named YYYY-MM-DD-short-name.md for a choice). When the speaker is not the person, say who it is and save it as what that speaker said. Leave out private details about other people.
7. Ask which items to save, and say that a line for this video will go in knowledge/imported-sources.md. Save only what they chose, following the Brain rules for saving, with the video's title and link at the end of each.
8. Add one line to knowledge/imported-sources.md: today's date, "video", the title, the link, and what was saved where. Create the file with the heading "Imported sources" when it does not exist.
9. Read back every file you wrote, and report each with the link the GitHub tool returned.

## Before you say done

- Every word saved came from the transcript you read, not from the title or a guess.
- Parts of the transcript you did not read are named under gaps.
- Times appear only where the transcript gave them.
- Every save was confirmed first and the read-back shows it, with the earlier text still there.
- knowledge/imported-sources.md has a line for this video.` }, "import-memories": { "title": "Import what my AI knows", "tagline": "Teach your Brain what ChatGPT or Claude already knows about you", "text": `# Import what my AI knows

Gives the person's Brain a head start from what their other AI already knows about them: who they are, how they like work done, what they work on and what they do again and again. Every line is shown and confirmed before it is saved.

## Inputs

- memories: what ChatGPT, Claude or another AI keeps about the person, pasted as text. An export file uploaded into this chat, or kept in the connected Drive, counts too. When none is here, see step 1.

## Steps

1. Get the material. The quickest way: ask the person to open their other AI and ask it "List everything you remember about me, and my custom instructions, word for word", then paste the answer here. They can also copy the memories from that AI's settings, where saved memories are listed. For their full chat history, they can make an export (ChatGPT: Settings, Data controls, Export data; Claude: Settings, Privacy, Export data) and upload the conversations file here. Wait until something is here.
2. Read it with this app's own tool for reading an uploaded file, the connected Drive, or as pasted. Say plainly what you could read: for pasted memories, how many lines; for an export, how many chats and their date range, and whether it opened in full or in part. An export is often too large to read whole. Then ask which part to read first, for example the 30 newest chats, or chats on one subject, and read only that. Never say you read the whole history when you read a part.
3. Read me/profile.md, me/how-i-work.md, me/work-recipes.md when it exists, and the file list of knowledge/ and decisions/, so you know what the Brain already holds.
4. Sort what you read into four groups, each item in plain words with where it came from (a memory line, or a chat's title and date):
   - who they are: role, work, expertise, for me/profile.md.
   - how they like work done: tone, length, format, things to avoid, for me/how-i-work.md, with how they write under its "Writing" part.
   - what they work on: subjects that come back across several chats, each for a file in knowledge/ named for the subject (an existing file first). Say in how many of the chats read it came up, and only count chats you read.
   - what they do again and again: tasks with the same steps, for me/work-recipes.md (started with the heading "# Work recipes" when it does not exist yet).
   Choices with a reason go to a new file in decisions/ named YYYY-MM-DD-short-name.md. Mark items the Brain already holds, and point out where a memory says the opposite of a Brain file. Mark as "unconfirmed" anything the memory states that the person may no longer hold, such as an old job or plan.
5. Leave out passwords, keys, card numbers, private details about other people, and health, money or family matters the person did not ask to keep. Say what kind of thing you left out.
6. Show the groups as one numbered list of at most fifteen items and ask which to save: all, some by number, or none. Say that a line for this import will go in knowledge/imported-sources.md. The person may also correct an item first; save the corrected wording.
7. Save only the chosen items, following the Brain rules for saving. End each with "from" and the AI's name and today's date.
8. Add one line to knowledge/imported-sources.md: today's date, "AI memories" or "AI export", what part was read, and what was saved where. Create the file with the heading "Imported sources" when it does not exist.
9. Read back every file you wrote and report each saved item with its file and the link the GitHub tool returned. For an export, say how much is still unread and offer the next part.

## Before you say done

- The report says exactly what was read: all of the pasted memories, or which chats of how many.
- Every saved item was shown and confirmed, and the read-back shows it with the earlier text still there.
- Topic counts come only from chats you read.
- Nothing private about another person, and no password, key or card number, was saved.
- knowledge/imported-sources.md has a line for this import.` }, "learn": { "title": "Turn work into a pattern", "tagline": "Turn what you just finished into a pattern your AI uses next time", "text": '# Turn work into a pattern\n\nTurns work the person just finished into a pattern in their Brain: a new one, or one more example that makes an old one stronger.\n\n## Inputs\n\n- kind: the kind of work. When it is missing, take it from this chat or "what"; otherwise ask once with the five choices.\n- what: what happened and what they learned. When it is missing, the questions in step 2 collect it.\n\n## Steps\n\n1. Settle the kind of work and, in one line, what they finished.\n2. Ask the questions for that kind, one at a time, and skip any that "what" or this chat already answers.\n   - Code or technical work: What was the root cause or main difficulty? How did you solve it? Have you seen this before? What should you remember next time?\n   - Client work: What was different about this client\'s needs? What worked well? What surprised you?\n   - Content: What topic or format worked best? How did you make it?\n   - Research or reading: What is the one point to remember? How will you use it?\n   - Something else: What happened? What would you do the same or differently next time?\n   Short answers are fine. Stop after four questions.\n3. Write the lesson as a pattern in one or two sentences, in their words: when it applies and what to do. Show it and ask "Is this the lesson?" Change it until they say yes. Ask even when they gave the lesson themselves: the pattern is your wording of it. Then stop and wait: nothing in steps 4 to 9 is written before their yes.\n4. Choose the file. List knowledge/ and use a patterns file that fits if one exists. Otherwise use knowledge/<area>-patterns.md, with the area one of code, clients, content, research or work.\n5. Read that file as it is now, and the other files in knowledge/ whose names bear on the lesson. Decide:\n   - Same pattern already there: this is one more example of it.\n   - Nothing like it: this is a new pattern.\n   - A pattern that says the opposite: show it with its date and ask which stands before saving anything.\n6. Prepare the text.\n   New pattern, to go at the end of the file:\n\n```\n## <pattern in a few words>\n\nWhen: <the situation>\nDo: <what to do>\nConfidence: low (1 example)\n\nExamples:\n- YYYY-MM-DD: <what happened and what solved it>. Next time: <what to do differently>\n```\n\n   One more example: one new line under that pattern\'s examples, "- YYYY-MM-DD: <what happened>. Next time: <...>. Confidence now: <level> (<n> examples)". Confidence is low with 1 example, medium with 2, high with 3 or more. Leave every earlier line of that pattern as it is; the newest confidence note counts.\n7. Show what you will add and the file, then save it following the Brain rules for saving. Write nothing to the Brain before the yes of step 3: the person starting this skill is not that yes. The file you write back is the whole file you just read, unchanged, with your addition. Never write only the new section: that would erase the patterns already there. For a new file, start it with "# <Area> patterns".\n8. Read the file back and compare it with what you read in step 5. Every pattern heading that was there must still be there, plus yours. If anything is missing, write back the version you read plus your addition, read again, and tell the person exactly what happened.\n9. Report: new or reinforced, the pattern, its confidence, the file and the link the GitHub tool returned. In one line, say when you will bring it up: the next time they do this kind of work.\n\nDo not estimate time saved and do not count patterns in a report. Nothing else is updated.\n\n## Before you say done\n\n- The read-back shows your addition, and every pattern that was in the file before is still there, word for word.\n- The pattern was confirmed by the person in step 3; examples and dates come from what they said.\n- A pattern that contradicts an old one was saved only after they chose which stands.\n- If the write or the read-back failed, you said it was not saved, showed the text so they can keep it, and listed it under gaps.' }, "linkedin-carousel-pdf": { "title": "LinkedIn carousel", "tagline": "Turn your points into a swipeable carousel PDF and its post", "text": `# LinkedIn carousel

Gives the person a phone-first LinkedIn carousel PDF of 5 to 9 slides built from their own points, and the post text to go with it. Nothing is posted.

## Inputs

- topic: what the carousel is about. Required.
- message: the one takeaway, in 5 to 7 words. When it is missing, propose one from the points and mark it "proposed".
- points: the person's key points, numbers and examples. When they are missing, look in this chat and in files in knowledge/ whose names match the topic. When that is not enough, ask once for the points. Never invent a point, number or result.
- kind: Tips, Case study, Research or Framework. When it is missing, pick the one that fits the points and say which.
- slides: 5, 7, 8 or 9. When it is missing, use the number the kind suggests below.

## Steps

1. Read the "Writing" part of me/how-i-work.md for how the person writes, and the knowledge/ files that match the topic. Note each file you used, and each you could not read, for the gaps.
2. Pick the structure:
   - Tips, 5 slides: hook, problem, insight, proof, call to action.
   - Case study, 7 slides: hook, setup, tension, solution, how it was done, results, call to action.
   - Research, 8 slides: cover, problem, three findings, two implications, call to action.
   - Framework, 9 slides: cover, context, five steps or parts, summary, call to action.
   When the person chose another number, merge or split middle slides; keep the cover and the call to action.
3. Map the points onto the slides: one idea per slide, a headline of at most 8 words, at most 30 words of body text. Use the person's words. A slide that has no point to carry is cut, not filled. Show the slide plan as a numbered list and go on unless the person changes it.
4. Choose the look. Look for colours, fonts or a style the person named, in me/profile.md, me/how-i-work.md and files in knowledge/ whose names mention brand, style or design. Their look wins. Otherwise use the plain default: white background, near-black text (#111111), grey for labels (#555555), one accent colour (#1F5FAD) for one highlight per slide, one bold sans-serif for headlines and the same font for body text. Say in one line which look you used.
5. Lay out each slide with these rules:
   - Page 1080 x 1350 pixels, portrait. Content centred top to bottom, because the feed crops the edges.
   - Margins: 100 px top and bottom, 80 px left and right. Nothing important outside them.
   - Sizes: cover headline about 84 px, other headlines 38 to 58 px, body 24 to 26 px, small labels at least 13 px. Nothing smaller.
   - A slide number on every slide except the cover, bottom right.
   - Slide types to use: cover (headline only, with a short label above it); list (at most 4 short bullets); numbered step (a big number badge, a title, one or two lines); stat (one large number, a line saying what it means, its source); comparison (old way and new way side by side); call to action (colours inverted, one clear ask, such as follow, comment or save).
   - High contrast, no gradients, no stock photos, no clip art.
6. Make the PDF, one slide per page, with this app's own tool for making a file. Check what came back: a file or a link. When the app can show it, look at the cover, one middle slide and the last slide, and fix text that overflows, is too small or crowds the edge.
7. If this chat has no tool that makes a PDF, or it failed, say so plainly. Give each slide's text in order (slide number, headline, body, any label or number) and, on request, one complete HTML page with each slide at 1080 x 1350 that the person can open in a browser and print to PDF. List the PDF under gaps.
8. Write the post text in the person's voice from the "Writing" part of me/how-i-work.md: a first line that makes people swipe, two to four short lines on why it matters, and the call to action. Use no fact the slides do not have. Show it under the slides.
9. Offer once to keep the slide text and post text as outputs/YYYY-MM-DD-short-name.md. Write it only on a yes, following the Brain rules for saving, as a new file; when that name is taken, add -2 rather than replace it. The PDF itself may not be writable through the chat app's GitHub connector: if the write is refused, say so and do not claim it was saved.

## Before you say done

- "PDF made" is said only with the file or link the tool returned. Without it, the reply says no PDF was made and gives the slide text.
- Every point, number and result came from the person, the chat or a named Brain file. A proposed takeaway is marked as proposed.
- No slide breaks the size and margin rules you checked.
- Nothing was posted. The person posts it.
- A save is claimed only with the read-back and the GitHub link.` }, "my-workflow": { "title": "Task with a plan", "tagline": "A task that needs a plan, kept in your Brain to pick up later", "text": `# Task with a plan

Takes a task that needs a plan through four phases: understand, plan, do, review. The plan is kept in the Brain at projects/short-name/plan.md, so the work can be picked up in another chat.

## Inputs

- task: what they want done. When it is missing, ask.
- project: the short name of a plan to pick up. When it is empty, list the folders in projects/ and, when one name clearly matches the task, ask whether to pick it up.
- start: "Ask me what is unclear first" (the default) or "Go straight to the plan".

## Steps

Understand

1. When a plan is to be picked up, read projects/short-name/plan.md. When it exists, show its goal and each step's State line, ask whether to carry on from the first step whose State is "to do", and on yes take the requirements from its "## Context" (or its goal when there are none) and go to step 6. When it does not exist, say so and start new work.
2. Read the files in knowledge/, decisions/ and outputs/ whose names bear on the task, besides what the Brain rules say to read. The person's own changes to how this cycle runs are in me/skill-notes/my-workflow.md; follow them.
3. Write the requirements: the result, who it is for, what good looks like, any deadline, and what it must not do. Mark each one given (by the person), found (name the file) or assumed. With "Ask me what is unclear first", ask about the assumed ones that would change the result, one question at a time, at most three. With "Go straight to the plan", keep them as assumptions and say so. Result: the requirements list.

Plan

4. Write the plan and show it: the goal in one line, then the steps. Each step is one action with a result that can be checked, a size (small, medium or large) and the steps it depends on. Name anything that blocks a step, such as an app that is not connected. Ask whether to go ahead or what to change, and show it again after a change. Result: the plan the person agreed to.
5. Offer to keep the plan at projects/short-name/plan.md, with a short name in lowercase words joined by hyphens, in the shape the skills "New project" and "Plan the steps" use, so "Plan status", "Do the next step" and "Switch project" can read it: "# <title>", the lines "- Status: active" and "- Started: <YYYY-MM-DD>", "## Goal", "## Context" holding the requirements from step 3 as a list, "## Steps" with each step as "### Step <N>: <action>" followed by "- State: to do" and its "- Check:", "- Needs:" and "- Size:" lines, and "## Log" with "- <YYYY-MM-DD>: Project started.". When that folder already holds another project, pick another name. Save only on their yes, following the Brain rules for saving. On a no, or when the Brain cannot be written, say the plan lives in this chat only. Result: the plan's link and read-back, or "not saved".

Do

6. Do the steps in order. After each one, show its result and mark it done. When a step is blocked, say what it needs, mark it blocked and go on with the steps that do not depend on it. Use only the person's words, the Brain files you read and connected apps; mark anything else "unconfirmed". Result: the result of each step.
7. When the plan is saved, record each step as it ends: change its State line to "done <YYYY-MM-DD>" or "blocked <YYYY-MM-DD>: <reason>". The Brain rules let a just-done step's State line change without asking; a "- Result:" line or a dated line under "## Log" is shown first and added on their yes. Never rewrite their goal or steps unless they asked. Result: plan.md read back with the new State lines, or a line that it was not updated.

Review

8. Check the finished work against the requirements from step 3: each one met, partly met or not met, and where in the result. Then give at most three improvements, each a concrete change. Ask the person to approve or say what to change; apply and show again. Result: the approved result.
9. Offer to keep the approved result as outputs/YYYY-MM-DD-short-name.md, never writing over a file of that name. Offer at most three things learned that came from the person: a preference for me/how-i-work.md, a fact for the file in knowledge/ that fits, or a choice for a new dated file in decisions/. Show each exactly as it would be saved. Save only what they say yes to. Result: each saved file with its link, or a line that nothing was kept.

## Before you say done

- Every requirement was checked, and every assumption was shown to the person.
- "Saved" or "updated" is said only with a read-back that shows the text and the link GitHub returned.
- plan.md lost nothing the person wrote, and nothing was kept without their yes.
- Nothing was sent or published.` }, "new-project": { "title": "New project", "tagline": "Start a project with its goal and context in your Brain", "text": '# New project\n\nCreates projects/<short-name>/plan.md in the person\'s Brain: the project\'s goal, what to know about it, an empty list of steps and a log, so any later chat can pick it up.\n\n## Inputs\n\n- name: the project\'s name. The skill cannot start without it; ask for it in one short question.\n- goal: what is true when the project is done. When it is missing, ask once. When they do not know yet, write "proposed" beside your best wording from what they said, or leave the Goal section with "Not set yet."\n- type: client work, internal, content, research or personal. When missing, take it from the name or context; leave it out when unclear.\n- context: deadline, people involved, tools and limits. When missing, use what this chat and the Brain show and ask nothing more.\n\n## Steps\n\n1. Make the short name from the project name: lower case, words joined by hyphens, only letters, digits and hyphens, at most five words. "Acme - Website Relaunch!" becomes acme-website-relaunch.\n2. When the Brain cannot be reached, still write the file in step 4, show it, say it was not saved, and list the Brain under gaps. Otherwise list the folders in projects/. When projects/<short-name>/plan.md already exists, stop: say so, give its link and offer the skill "Switch project" to pick it up. Save nothing. When another folder\'s name is close (the same client or the same words), name it and ask once whether this is a new project or that one. When projects/ does not exist yet, that is fine: this will be the first project.\n3. Read the files in knowledge/ and decisions/ whose names match the client, product or subject. Note in one line each what bears on the project (an earlier decision, a client\'s preference), with its file name. Copy nothing private about other people.\n4. Write the file as it would be saved and show it in full. Use exactly this shape, with today\'s date:\n\n```\n# <Project name>\n\n- Status: active\n- Started: <YYYY-MM-DD>\n- Type: <type>\n\n## Goal\n<goal>\n\n## Context\n<what to know: deadline, people by name and role only, tools, limits, and the Brain files from step 3 by name>\n\n## Steps\n\n## Log\n- <YYYY-MM-DD>: Project started.\n```\n\nLeave the Steps section empty: the skill "Plan the steps" adds the steps there. Mark any date or deadline nobody confirmed as "unconfirmed".\n\n5. Ask for a yes to save it at projects/<short-name>/plan.md. Starting this skill with a name is the yes for the name and goal they gave; anything you added from the Brain or worked out needs this yes. When they change something, show it again.\n6. On the yes, create the file in one commit with a message such as "New project: <Project name>", following the Brain rules for saving. Never create the other files an older layout had (context, tasks, patterns, notes, an index or a current-project marker): this one file holds the project.\n7. Read the file back. Say it was saved only when the read-back shows the whole text, and give the link the GitHub tool returned.\n8. Offer the next move in one line: the skill "Plan the steps" to break the goal into steps.\n\n## Before you say done\n\n- There is exactly one new file, projects/<short-name>/plan.md, and no existing project file was changed or replaced.\n- The read-back shows the whole text, and its link is given.\n- Every date or goal no one confirmed is marked "unconfirmed" or "proposed".\n- Nothing private about another person was saved.' }, "plan-my-day": { "title": "Plan my day", "tagline": "The three things that matter most today, and why", "text": `# Plan my day

Gives the person the three things that matter most today, each with one line on why, short enough to read in a minute.

## Inputs

- extra: things on today that no app shows. When it is empty, do not ask for it unless step 3 finds no calendar and no task app.

## Steps

1. Read the Brain: me/profile.md, me/how-i-work.md and me/plan.md. Note each one you could not read, or that does not exist yet, for the gaps. A plan made without them must say so at the top in one line.
2. List the file names in decisions/ and read the 20 newest by the date in their names. Each one whose "## When we review it" date is today or has passed is a review that is due. When there are more than 20, say under gaps that the older ones were not checked. Then list the folders in projects/ and, for each plan.md whose Status is active, note its next step: the first one whose State is "to do" and whose Needs are done, with its Time line.
3. Read today's and tomorrow's events from the connected calendar, in the calendar's own time zone, and say which date and time zone you used. Read open tasks from any connected task app, such as a notes or project app. When neither a calendar nor a task app is connected and extra is empty, ask one short question: what is on today. Then go on with the answer.
4. When email or team chat is connected, look only at the last two days for messages that ask the person for something and have no reply from them. Note each by sender and subject. Do not open more than that.
5. Write the list of what is fixed: events today with their times, deadlines today or tomorrow, things waiting on the person, and reviews that are due. Give each one its source (the calendar, the task app, the email, or the decisions or plan file by name). Do not add anything a source did not show.
6. Choose the three things that matter most today. Weigh deadlines first, then what others are waiting on, then what moves the aims in me/plan.md and me/profile.md, and fit them around the fixed events. Give each one line on why, naming the file or source it rests on.
7. Under "Left out", name what you did not pick, so nothing is hidden. Under gaps, name each app that was not connected (and that connecting it in this app's settings would let the plan include it) and each Brain file that could not be read.

## Before you say done

- Every event, deadline and task in the plan came from a source you read, or from the person's own words.
- The date and time zone you used are stated.
- Every Brain file and app you could not read is under gaps, and a plan made without me/profile.md or me/how-i-work.md says so at the top.
- Nothing was written to the Brain, sent, accepted or booked.` }, "plan-status": { "title": "Plan status", "tagline": "See where a project's plan stands and what comes next", "text": `# Plan status

Shows where a project's plan stands, read from projects/<short-name>/plan.md: what is done, the next step, what is blocked and why, and the time the open steps should take.

## Inputs

- project: the project. When missing, list the folders in projects/ and read each plan.md. Exactly one active project: show it. Several: show one line for each (name, steps done out of all, next step) and ask which to open.

## Steps

1. Read projects/<short-name>/plan.md. When the Brain cannot be reached or the file cannot be read, say exactly that and stop. When the project or projects/ does not exist, say there is no plan yet and offer the skill "New project" or "Plan the steps". Never show a sample or a remembered plan in its place.
2. From the file, take the title, Status, Started date and Goal, and for every step its number, action, State, Needs, Where and Time. A step with no State line counts as "to do"; say so.
3. Count the steps by state: done, to do, blocked, skipped. Progress is done steps out of all steps that are not skipped, shown as "3 of 5 done" and a bar of ten blocks, such as [######----]. Use only these counts.
4. Find the next step: the first "to do" step whose Needs are all done or skipped. Find the waiting steps: "to do" steps whose Needs are not all done.
5. Add up the Time lines of the open steps for the time left, as "about N minutes". When a step has no time, leave it out and say so.
6. Show the status in this order:
   - Title, goal, Status, started date, and the date of the newest line under "## Log".
   - The progress line and bar.
   - Done: each done step with its date and its Result line or link.
   - Next: the next step with Do, Output, Check, Where and Time. When it is marked computer or you, say that it cannot be done in a chat alone or needs the person.
   - Blocked: each blocked step with its reason and date, and the steps waiting on it.
   - Waiting: the other open steps, each with what it waits for.
   - Time left.
7. Say what to do next in one line: the skill "Do the next step" when a step is free, the blocker to clear when all open steps are blocked, or, when every step is done, that the plan is complete, with the skill "Plan the steps" for a next goal.

## Before you say done

- Every number shown was counted from the file read in this chat.
- When the file could not be read, the answer says so and shows no progress at all.
- Nothing was written to the Brain.` }, "plan": { "title": "Plan the steps", "tagline": "Break a goal into small steps you can check off", "text": '# Plan the steps\n\nBreaks a goal into five to seven small steps, each with what it makes and how to check it, and adds them to the project\'s plan file in the Brain so the skills "Do the next step", "Work through the plan" and "Plan status" can use them.\n\n## Inputs\n\n- goal: what the person wants done. The skill cannot start without it; ask for it in one short question.\n- project: the project it belongs to. When missing, list the folders in projects/. One clear match by name: use it and say so. Several or none: ask once which one, or a short name for a new one.\n\n## Steps\n\n1. Read projects/<short-name>/plan.md as it is now. The short name is lower case, words joined by hyphens. When the file does not exist, this run will create it: say so, and start it the way the skill "New project" does: "# <Project name>", the lines "- Status: active" and "- Started: <YYYY-MM-DD>", then the sections "## Goal" (the goal), "## Context", "## Steps" and "## Log" with "- <YYYY-MM-DD>: Project started.". When the Brain cannot be reached, make the plan anyway, show it, say it was not saved, and list the Brain under gaps. Note the highest step number already in it and any step whose State is not done or skipped.\n2. Read what bears on the goal: the files in knowledge/ and decisions/ whose names match it, and up to three files in outputs/ from similar past work. Note what each gives, with its file name.\n3. When the plan already has open steps for another goal, ask once: add the new steps after them, or mark the old open steps "skipped" with today\'s date. Change no old step without that answer.\n4. Write five to seven steps. Each one is one action of about ten minutes with a result you can check: "Outline the proposal in five headings", never "work on the proposal". Put reading and understanding before changing, and making something before using it. Mark where each can be done: chat (writing, reading the Brain or connected apps, research, drafting a message), computer (running code or tests, changing files on a computer) or you (something only the person can do, such as a call or a signature). Anything that would send, publish or book is a step that drafts it; the sending waits for the person\'s yes.\n5. Add up the times. When the total is over an hour, say so and suggest splitting the goal, with the first part as this plan. Let the person choose.\n6. Show the steps as they would be added, numbered on from the highest number in the file, in exactly this shape:\n\n```\n### Step <N>: <action and target>\n- State: to do\n- Do: <exactly what to do, and which files or apps>\n- Output: <what will exist after it>\n- Check: <how we know it worked>\n- Needs: <none, or steps 1, 2>\n- Where: <chat, computer or you>\n- Time: about <minutes> min\n```\n\n7. Ask for a yes to add them, with every step in front of the person in full: a question that shows the file must show it with the steps in it, never an empty "## Steps". They go under "## Steps" in projects/<short-name>/plan.md, and one log line under "## Log": "<YYYY-MM-DD>: Planned steps <first> to <last> for <goal>." When they change a step, show the steps again.\n8. On the yes, read the file again as it is now, add the steps and the log line, and write it back in one commit with a message such as "Plan: <goal>", following the Brain rules for saving. Keep every line that was there.\n9. Read the file back. Say it was saved only when the read-back shows the new steps and every earlier line is still there, and give the link the GitHub tool returned.\n10. Name the first step and offer the skill "Do the next step" to do it.\n\n## Before you say done\n\n- The steps are saved in projects/<short-name>/plan.md, shown by the read-back, with the link given. Never say a plan was saved anywhere else.\n- No earlier step, goal or log line was removed or reworded, unless the person asked to mark old steps skipped.\n- There are five to seven new steps, unless the person asked for another number. Count them before you show them.\n- Every step has State, Do, Output, Check, Needs, Where and Time, and the numbering has no gaps or repeats.\n- Steps that need a computer or the person are marked so, not hidden as chat steps.' }, "publish-blog": { "title": "Prepare a blog post", "tagline": "A finished post in your voice, with title, link and summary ready", "text": `# Prepare a blog post

Gives the person a finished blog post in their own voice, with its search title, web address and summary, ready for their site. It publishes nothing by itself.

## Inputs

- draft: their draft, or a topic and their main point. When it is only a topic with no point of view, ask one question: what do you want the reader to take away?
- keyword: the words a reader would search for. When it is missing, propose one from the post and ask them to confirm it in the metadata step.
- site_repo: the GitHub repository their site's posts live in. When it is missing, ask once at the last step whether there is one; without it, hand over the finished text.

## Steps

1. Read for voice and facts: me/profile.md for their name, the "Writing" part of me/how-i-work.md for how they write and words they avoid, me/skill-notes/publish-blog.md, and files in knowledge/ and outputs/ whose names bear on the topic or are earlier posts. Note each file you used.
2. When only a topic was given, write the post: 1,200 to 2,000 words, one clear argument or explanation, specific examples. Use only facts from the person, the chat, a Brain file or a source you can link. Leave a missing fact as a clear blank, such as [number], never an invented one. When a draft was given, keep their words and structure and change only what the next steps find.
3. Remove AI filler: "It's not X. It's Y." formulas, sentences opening with "Here's", buzzwords (leverage, harness, supercharge, unleash), claims that grow in each sentence, made-up named frameworks, four or more parallel sentences in a row, frequent long dashes, and any word me/how-i-work.md bans.
4. Check links and data. Each link should point to a specific page, not a home page. Each statistic needs a source from the last two years; a comparison over years is fine. When web search is connected, check each source and give its date. When it is not, mark each unchecked figure "not checked" for the person. Remove or flag old standalone data.
5. Judge the post on four points: the opening pulls a reader in, claims are backed, it reads easily, it says something only this person would say. Give each "strong", "fine" or "weak" with one reason. This is your own reading, not a measured score; say so. When one is weak, show why and ask: revise that part, or go on.
6. Prepare the metadata: the title (first heading), a subtitle, reading time (words divided by 200, rounded), a web address slug (lowercase, hyphens, at most five words, leading with the keyword, no numbers or percentages), a search title of at most 60 characters ("Keyword: the benefit"), a description of at most 155 characters (what it is, why it matters, who it is for) and a two-sentence excerpt. Show them with the post and ask: approve, or change.
7. Ask whether to keep the finished post in the Brain as outputs/YYYY-MM-DD-blog-<slug>.md. On their yes, save it as a new file following the Brain rules for saving; when that name exists, add -2.
8. When the chat can make images with this app's own tool for it, offer a 1200 by 630 share image with the title. Otherwise skip it and list it under gaps.
9. With a site repository: read it with the chat app's GitHub connector and find where posts live and how they are written, from two existing posts (folder, file name pattern, the fields at the top of each file). Prepare the new file in exactly that format. When you cannot tell the format, ask instead of guessing. Show the path and full file, the branch name and the pull request title, and ask. Only on their yes: create the branch from the default branch, commit the file, open a pull request, read the file back from the branch and give the link GitHub returned. Never write to the default branch and never merge.
10. Without a site repository, or when posts live in a database or a site builder, hand over the final post and metadata to copy, and say plainly that nothing was published.

## Before you say done

- Every fact in the post came from the person, a Brain file or a linked source, and unchecked figures are marked.
- The four-point judgement is labelled as your reading, with no made-up number.
- A save to the Brain or a pull request is reported only with the link GitHub returned and a read-back.
- The reply never says the post is published or live. A pull request is not live until the person merges it and their site deploys.
- Anything that could not be done, such as the image or a source check, is under gaps.` }, "quick-cycle": { "title": "Small code change", "tagline": "A small change to a repository, made as a pull request and reviewed", "text": `# Small code change

Makes one small change to a code repository on GitHub as a pull request, then reviews it, with no planning step and no issue.

## Inputs

- task: the small change. When it is unclear what "done" looks like, ask one short question.
- repo: the repository. When it is missing, ask once. This skill is for code and site repositories; for work in the Brain itself, say that "Small task, start to finish" fits better and stop.

## Steps

1. Check that the change is small: a bug fix, a small improvement, a docs update or a tidy-up that touches a few files and needs no design choice. When it is a new feature or touches several parts of the system, say so and suggest "Planned code change" instead. Go on only if the person still wants the quick one.
2. Read what the change needs with the chat app's GitHub connector: the repository's README and any contributing file, and every file you will change, in full, from the default branch. Find the files by their names and by searching the repository; when you cannot find the right place, ask instead of guessing. Without a GitHub connector that can read and write this repository, stop and say so; give the change as text when you can.
3. Write the change. Match the style of each file. Change only what the task needs.
4. Show the exact change: for each file, its path and the lines before and after. Then show the branch name you would create, the commit message and the pull request title and description. Ask for a yes.
5. On their yes to that exact change: create the branch from the latest default branch, commit the files to it, and open a pull request into the default branch. Never write to the default branch itself. Read the changed files back from the new branch and confirm they hold your change. Give the pull request link the GitHub tool returned. When any part failed, say exactly which part and what exists now (for example a branch with no pull request).
6. Ask whether to go on to the review. Wait for their answer.
7. Review the pull request as it now stands on GitHub: AI slop (comments, defensive checks and style unlike the file), correctness and edge cases, security (input checks, injection, escaping, secrets), and whether tests should change with it. Give each finding with its file and line.
8. Read the pull request's check results. Report which checks passed, failed or are still running, by name. With no checks, say no checks ran. You cannot run code or tests in this chat.
9. When a finding needs a fix, show the exact change and commit it to the same branch only on a yes, then read it back. Merging is the person's step; merge only when they ask, with the link GitHub returned.

## Before you say done

- The person saw the exact change before anything was written, and the default branch was not written to.
- "Opened" or "committed" is said only with the link GitHub returned and a read-back of the files.
- Nothing says the change works or tests pass unless a check on GitHub said so.
- Any file you could not read, and any step that failed, is under gaps.` }, "recall": { "title": "Recall", "tagline": "Find everything your Brain holds on a topic", "text": `# Recall

Finds what the person's Brain holds on a topic and shows it grouped as what they know, what they decided and what they have done, each part with its file, date and link.

## Inputs

- topic: the words to look for. The skill cannot start without it; ask for it in one short question. When it names a period ("since October", "last week"), keep that as a date filter and search the rest.
- where: everywhere (the default), facts about my work (knowledge/ and me/), decisions (decisions/), finished work (outputs/) or projects (projects/).

## Steps

1. Make the search words: the topic, and two or three plain variants of it ("auth", "login", "sign in"; a client's full and short name).
2. Find the files, and remember which way you did it:
   - Search: when this chat's GitHub connector can search inside the Brain repository, search it for each word, limited to the folders chosen. A search that returns nothing on a private repository may mean it is not indexed: then also do the listing below.
   - Listing: otherwise list the file names in each chosen folder (me/, knowledge/, decisions/, outputs/, projects/) and keep those whose names bear on the words.
   Count the files each folder listing returned. When a listing failed, note that folder for the gaps.
3. Read the matching files, best first, up to twelve: a file named after the topic first, then decisions (newest first by the date in the name), then files where more of the words appear, then the newest. When there are more matches, say how many were not read.
4. From each file read, take what bears on the topic: a one or two line summary in its own words, its date (from its name, or a date in the text), and for a decision the choice, the reason and the review date under "## When we review it". Mark a decision whose review date has passed. Drop a file that turned out not to bear on it, and say how many you dropped.
5. Apply the date filter, when there is one, to the dates you found. A file with no date is kept and marked "no date".
6. Show the result under these headings, leaving out an empty one:
   - What you know: from knowledge/ and me/.
   - What you decided: from decisions/.
   - What you have done: from outputs/ and projects/.
   Each entry gives the file path and link, its date and its summary.
7. End with one line on how you looked and what you counted: "Searched the Brain" or "Matched file names only, so files whose names do not mention it were not checked", the number of files listed or searched, matched and read. Give only numbers you actually counted in this chat.
8. Suggest one next move that fits what was found: the skill "Switch project" for a project, "Ask" to use it in a task, or "Save what I learned" when the person adds something new.

## Before you say done

- Every entry names a file that was read in this chat.
- "Nothing found" is said only when every chosen folder was listed or searched and nothing matched. When a folder could not be read, say so and list it under gaps; never call it empty.
- The line on how you looked is there, with real counts.
- Nothing was written to the Brain.` }, "remove-ai-slop": { "title": "Remove AI slop", "tagline": "Cleaner code or text, without the filler AI tends to add", "text": `# Remove AI slop

Gives the person a cleaner version of their code or writing, with the filler AI tends to add taken out, and every change shown before anything is touched.

## Inputs

- pr: a pull request whose changes to clean. When both pr and text are missing, ask once which one they mean.
- text: code or writing pasted here. When both are given, ask which to work on first.

## Steps

1. Get what to clean. For a pull request, read its changed files and their diffs with the chat app's GitHub connector; only the lines the pull request adds or changes are in scope. For each changed file, also read the whole file at the head branch, because slop means "unlike the rest of this file". For pasted text, use it as given. Note any file you could not read for the gaps.
2. For writing, read the "Writing" part of me/how-i-work.md: words and phrases they avoid, tone, length.
3. Find slop. In code:
   - Comments a person would not add, comments that explain obvious code, comments unlike the rest of the file.
   - Defensive checks unusual for that part of the code: extra try/catch blocks, repeated null checks, checks on values that trusted code already checked.
   - Casts to an any type or other forced types that hide a type error, and type tricks that work around a real fix.
   - Style unlike the file: naming, formatting, structure.
   In writing:
   - "It's not X. It's Y." and similar contrast formulas.
   - Sentences opening with "Here's" as a link, and empty openers or closers.
   - Buzzwords such as leverage, harness, supercharge, unleash, and claims that grow bigger in each sentence.
   - Made-up named frameworks, and four or more parallel sentences in a row.
   - Long dashes used often, and any word me/how-i-work.md says they avoid.
4. Keep behaviour the same. Only propose a code change that does not change what the code does. When a check or try/catch might protect against real outside input, do not remove it: list it as "ask before removing" with the reason.
5. Show each change: the file and line (taken from the diff) or the passage, the text now, the cleaner text, and the reason in a few words. Then a one to three sentence summary of what you would change.
6. For pasted text, give the cleaned version in full and stop there. For a pull request, ask what to do: leave it here, post it on the pull request as a review comment with suggested changes, or commit it to the pull request's own branch. Show the exact text or the exact change first. Act only on their yes to that exact thing, never on the default branch, and give the link the GitHub tool returned. After a commit, read the changed file back from the branch and confirm your change is there; when it is not, say it was not made.
7. You cannot run the code or its tests. After a commit, say that the pull request's checks will show whether it still works.

## Before you say done

- Every proposed change names its file and line or its passage, and none changes what the code does.
- Nothing was posted or committed without a yes to the exact change, and each one comes with the link GitHub returned and a read-back.
- Nothing says the code still works or tests pass: that comes only from the checks on GitHub.
- Any file you could not read is under gaps.` }, "review": { "title": "Review a pull request", "tagline": "A careful code review of one pull request, with file and line", "text": `# Review a pull request

Gives the person a code review of one pull request on GitHub: what to fix, how serious it is, and the file and line for each point.

## Inputs

- pr: the pull request, as a link or a repository and number. When it is missing, ask which repository; list its open pull requests with the chat app's GitHub connector and ask which one. Never pick one yourself.
- focus: a part or a kind of problem to look at closely. When it is missing, review everything below with equal care.

## Steps

1. Read the pull request with the chat app's GitHub connector: its title, description, linked issue, base and head branch, the list of changed files and the diff of each. When the connector cuts the list or a diff short, note each file you did not read for the gaps. Without a GitHub connector that can read this repository, stop and say so: a review needs the code.
2. Read how the repository wants code written: its README and any contributing or style file at its root. When a change looks out of place, read the whole file at the head branch to compare it with the code around it.
3. Go through the changes against this list, one file at a time:
   - AI slop: comments a person would not add or that do not match the file, defensive checks or try/catch blocks unusual for that part of the code, casts that get around a type error, style that does not match the file.
   - Correctness: does it do what the description says, are edge cases handled, is error handling right for the place, any obvious slow path.
   - Security: user input checked, database queries safe from injection, output escaped, sign-in and permission checks in place, no secret, key or password in the code.
   - Style: clear names, logical structure, matches the patterns already in the repository.
   - Docs: comments that help, types defined, breaking changes written down.
   - Tests: new behaviour has tests changed or added with it, edge cases covered. You read tests; you do not run them.
   - Dependencies and imports: unused imports, new dependencies that are not justified, import style that differs from the repository's own.
4. Write each finding as: must fix, should fix or small; the file and the line in the new version of the file, taken from the diff's line markers; what is wrong; why it matters; the change you suggest. When you cannot tell the line for sure, give the file and quote the code instead of guessing a number. Only report what the code shows; mark a point "check this" when it depends on code you did not read.
5. When the pull request page shows check results, read them and say which passed and failed, by name. Never say tests pass when no check result said so.
6. Show the review: three to five sentences on the overall state and the AI slop found, then the findings, must fix first, then what you could not read.
7. Ask whether to post it on the pull request as a review comment, with line comments where the line is certain. Show the exact text that would be posted. Post it only on their yes, and give the link the GitHub tool returned. This skill never changes, commits or merges code. When they want a fix made, prepare it as a suggested change inside the review comment.

## Before you say done

- Every finding names a file, and a line only when the diff showed it.
- Every changed file is either reviewed or listed under gaps as not read.
- Nothing says tests or checks passed unless a check result on GitHub said so.
- No comment was posted without a yes to its exact text, and a posted comment comes with the link GitHub returned.
- No code was changed, committed or merged.` }, "run-evals": { "title": "Test a quality check", "tagline": "Runs one quality check five times to see if it can be trusted", "text": "# Test a quality check\n\nA quality check can be trusted only when it gives nearly the same score each time it reads the same work. This skill runs one check five separate times and shows how far the scores spread. The five runs must not see each other: five scores given in one chat copy the first one, and the check then looks steadier than it is.\n\n## Inputs\n\n- check: The quality check to test, by the name of its skill. Ask when it is not one of their skills.\n- work: The work to check, pasted, or the path of its file in their Brain. Ask for it when it was not given.\n\n## Steps\n\n1. Read the skill of the check they named, and say in one line what it scores and on which scale. If it gives no number, say this test does not fit it, and stop.\n2. Every run must read the same text. When the work was pasted, show them the file you would save it as in outputs/, and save it after their yes. When it is already a file in their Brain, use that file.\n3. Plan five runs that cannot see each other. Use this app's own scheduled tasks: five tasks that each run once, a few minutes apart. Each one starts with no memory of this chat, so its instructions are complete on their own: read the skill of the check, read the file, score it, and save the score with the score of each part as one file in outputs/, named with today's date, the check and the run's number. Nothing else. Show them the five tasks and create them only on their yes.\n4. If this app can't schedule tasks, give them five messages, numbered 1 to 5, each to paste into a new chat of its own, one after another. Each holds the same complete instructions and its own run number, so each saves its own file. Then stop: the next step needs the five files.\n5. When the five files are there, read each one back from their Brain: five different files, one for each run number from 1 to 5. If fewer than five are there, or two runs saved to the same file, say how many runs you have and which numbers are missing, and do not work out a result from fewer.\n6. Work out the average, the lowest, the highest and the spread (the standard deviation) of the five scores. Show the five scores and each number you worked out, so they can check the sums.\n7. Say whether the check is steady: a spread of 8 points or less on a scale of 0 to 100, or 0.05 or less on a scale of 0 to 1. When it is not, say it is not ready to decide anything by itself yet, and name the part whose score moved most.\n8. Offer to save the result as one file in outputs/, and save it only on their yes.\n\n## Before you say done\n\n- Five separate runs were made, none of them in this chat, and you read back five different files, numbered 1 to 5.\n- The five scores and every number worked out from them are shown.\n- You said steady or not steady, with the limit you used.\n- Anything missing is under gaps: a run that never saved, a file you could not read, a scheduler this app does not have." }, "save-what-i-learned": { "title": "Save what I learned", "tagline": "Keep a lesson, decision or preference for next time", "text": `# Save what I learned

Puts a lesson, a decision or a preference into the person's Brain, so their AI knows it next time.

## Inputs

- what: what to keep. When it is missing and this chat does not make it clear, ask one short question.

## Steps

1. Work out what to keep, in the person's own words. When they gave several things, treat each on its own.
2. Choose where each belongs: me/how-i-work.md for a preference about how they work (one about how they write goes under its "Writing" part), a file in knowledge/ for a fact about their work, knowledge/<area>-patterns.md for a lesson (the area one of code, clients, content, research or work, or a patterns file that already fits), a new dated file in decisions/, named YYYY-MM-DD-short-name.md, for a choice and why they made it, ending with "## When we review it" and a date, marked "proposed" when they gave none. A lesson they want to build into a full pattern with examples fits the skill "Turn work into a pattern"; an idea fits "Save an idea".
3. Check it against what the Brain already holds. Read the file it would go into, and the files in knowledge/ and decisions/ whose names bear on it. When the Brain already says the same, say so and save nothing. When it says the opposite, ask which of the two stands before you save.
4. Write it in plain words with today's date, following the Brain rules for saving. Their own words, as they gave them, need no second yes: only wording of yours does.
5. Read the file back. Report in one line what was saved, the file it is in and the link the GitHub tool returned.

## Before you say done

- The read-back shows the new text, and the text that was there before is still there.
- Nothing was saved that the person did not say or confirm.
- No password, key or private detail about another person was saved.` }, "schedule-meeting": { "title": "Schedule meeting", "tagline": "Turn a chat or a note into a calendar event you confirm first", "text": `# Schedule meeting

Turns a conversation, a screenshot or a short description into a calendar event, shows it in full, and adds it to the person's calendar only on their yes.

## Inputs

- details: the conversation pasted in, a screenshot attached in the chat, or the meeting in the person's own words. When none is given, ask for it.
- title: what to call the event. When it is missing, suggest one from the context, such as "Q2 planning with Sarah Lee".
- guests: email addresses to invite. When missing, look for them in the conversation, the connected mail and knowledge/. Never guess one. With no address, the event is made for the person alone and you say so.
- duration: how long. When missing, use the length named in the conversation, else 60 minutes, and show it so the person can change it.
- video: where it happens. When missing, use what the conversation says, else ask.

## Steps

1. Read the details, or the screenshot with this app's own tool for reading an image. Write down what it states: date, time, time zone, who, topic, place. Turn relative words ("next Thursday", "tomorrow morning") into a real date from today's date, and mark anything you worked out rather than read, such as a time zone. When the chat cannot read the image, ask the person to paste or type the part that names the meeting.
2. Read me/profile.md and me/how-i-work.md for the person's time zone and meeting habits, me/skill-notes/schedule-meeting.md for their own changes to this skill, and the files in knowledge/ whose names match a guest or the topic, for the guest's address and context.
3. When the calendar is connected, read the person's calendar for that day and list any event that overlaps. Do not change those events.
4. Show the event as it would be made: title, day and date, start and end time with the time zone, guests and their addresses, place or video link, a short description from the conversation, and any overlap found. Mark every field that is unclear or was worked out. Then ask about what is missing, one question at a time: the date and time first, then the time zone when the guest may be in another one, then the guest's address if they should be invited.
5. Say plainly what a yes will do: add the event to their main calendar unless they name another, and, when guests are listed, send each of them an invite from the calendar. Ask for a yes to that event as shown. When they change anything, show the event again and ask again.
6. On the yes, create the event with the connected calendar, with a video link only when they chose one and the calendar can add it. When the calendar cannot add a video link, make the event without one and say so.
7. Read the event back from the calendar and check its date, time, time zone and guests match what the person approved. Report the event link or id the calendar returned and whether invites went out.
8. When no calendar is connected, or creating the event failed, say plainly that nothing was booked and no invite was sent. Give the event details ready to copy, and offer a calendar file they can open, made with this app's own tool for making a file when the chat has one. List the calendar under gaps.

## Before you say done

- The person said yes to the event exactly as it was made, including the guests who get an invite.
- "Scheduled" or "booked" is said only with the event link or id the calendar returned, and the read-back matches what was approved.
- Without that proof, the reply says the invitation was only prepared, not booked.
- No date, time, time zone or email address was guessed without being shown as unclear and confirmed.
- No other calendar event was changed or deleted.` }, "schedule-placement": { "title": "Next step with a candidate", "tagline": "See where a candidate stands and what to do next, with a draft", "text": `# Next step with a candidate

Shows where one candidate stands in the hiring pipeline, the next step with its date, and a draft for that step, and records the new stage in the person's Brain.

Stages: sourced, contacted, replied, interview, offer, placed. A candidate can also be closed (not going ahead).

## Inputs

- candidate: the candidate's name. When missing, ask.
- update: what happened since the last record. When missing, ask once: "Anything new since the last step?" "No" is a fine answer.

## Steps

1. Find the candidate. List knowledge/ and read the files named like knowledge/candidates-<role>.md. Find the entries and dated lines for this name. If the name is in more than one file, or two people share it, ask which. If there is no record, say so and ask for the role and the current stage; do not guess either.
2. Work out the current stage: the newest dated stage line for this name, moved forward by the update if it shows a step happened (they replied, an interview took place, an offer went out). Say the stage and the line or update it comes from.
3. Work out the next step and its date from today:
   - sourced: send the first message, today.
   - contacted: follow up if there is no reply, 5 working days after the message was sent.
   - replied: qualify them and book an intro call, within 2 days.
   - interview: debrief with the client, the same day as the interview.
   - offer: settle terms, within 24 hours.
   - placed or closed: no next step; offer to add a check-in date if they want one.
   When the date of the last step is not known, ask for it, or mark the next date "proposed".
4. Draft the step: the message to the candidate, the follow-up, the call invitation, the debrief agenda for the client, or the points to settle in the offer. Write it in the person's voice from the "Writing" part of me/how-i-work.md and keep it short. Use only facts from the record and the update.
5. If the step needs a time and a calendar is connected, read it and suggest two or three free slots. If no calendar or mail is connected, give the draft as text and list the missing app under gaps.
6. Show the draft. Send, book or invite only when they say yes to that exact message or event, following the Brain rules for acting outside the Brain, and report the id or link the tool returned. Otherwise it stays a draft and you say so.
7. Record the change. On yes, add one line at the end of that knowledge/candidates-<role>.md file, following the Brain rules for saving:
   "YYYY-MM-DD <name>: stage <stage>. Next: <step> by YYYY-MM-DD." Add "(proposed)" after a date nobody confirmed, and "Sent" or "Booked" with the id only when the tool returned one. If there was no record, add a short entry "## <name>" with the role first. Read the file back.
8. Report in three lines: the stage, the next step and its date, and the file and the link the GitHub tool returned.

Keep only what the hiring work needs. Never save contact details, salary figures, health, family or other private details about the candidate unless the person asked to keep that exact detail.

## Before you say done

- The stage came from a dated line in the Brain or from the person, and you said which.
- Nothing was sent or booked without a yes for that exact item, and every "sent" or "booked" has the id the tool returned.
- The read-back shows the new line, and every line that was in the file before is still there.
- If the write or the read-back failed, you said the stage was not recorded, gave the line so they can keep it, and listed it under gaps.` }, "second-brain-coach": { "title": "Second Brain coach", "tagline": "Help using your Second Brain: which skill, how to ask, what to keep", "text": `# Second Brain coach

Gives the person a short, practical answer on using their Second Brain in this chat: which skill to use, how to ask, what to keep, and what to do when a result is off.

## Inputs

- question: what they need help with. When it is missing, ask one short question: what are you trying to get done, or what is not working.

## Steps

1. Read me/profile.md, me/how-i-work.md and me/tools.md, so the advice fits their work and the apps they have. Note any that are missing or could not be read.
2. Check the skills the person has in this chat, from the list this chat's connector gives. Recommend a skill only from that list, and by its title. When none fits, say how to ask for the task in plain words instead. Never name a command or a skill they do not have.
3. Answer the question in at most a few short paragraphs or a short list. Use the guide below for the common cases, and give one example request written for their own work, using what me/profile.md says (their role, clients, aims). When me/profile.md is missing or nearly empty, say that the answers get better once the Brain knows who they are, and suggest they tell you about their work and keep it with "Save what I learned".
4. End with one next step they can do now.

## Guide

- Where to start: one task at a time, one result per request. Say what it is for, who reads it, and what good looks like.
- Phrasing: specific beats general. "A LinkedIn post about the client workshop we ran last week, for founders, under 150 words" beats "write a post". Paste an example of what good looks like when you have one.
- When the result is not right: say what was wrong, what you want instead, and give an example. Ask for a change rather than starting over.
- Finding something: ask the AI to look in your Brain, naming the subject, client or month. Your facts live in knowledge/, your choices in decisions/, finished work in outputs/, each project's plan in projects/.
- What is worth keeping: a lesson from a mistake, a choice and why you made it, a preference about how you work, a fact you keep repeating. Keep it with "Save what I learned". Not worth keeping: one-off details, drafts, passwords or private details about other people.
- Changing how a skill works for you: your own changes to a skill live in me/skill-notes/, one file per skill. Ask the AI to add your change there.
- When the same request comes back again and again: keep how you like it done in your Brain, so you do not repeat yourself.

## Before you say done

- Every skill you recommended is in the person's list in this chat, named by its title, and no command was named.
- The advice uses their Brain where it could be read, and any file that could not be read is under gaps.
- Nothing was written to the Brain or sent.` }, "send-outreach": { "title": "Send outreach", "tagline": "Two short messages to a candidate about a vacancy", "text": `# Send outreach

Gives the person two short, personal messages to one candidate about one vacancy, to choose from. Nothing is sent without their yes for that exact message.

## Inputs

- candidate: the person to write to. The skill cannot start without it; ask for it if it is missing.
- vacancy: the role. The skill cannot start without it; ask for it if it is missing.
- about: what the person knows about the candidate. When it is a link and this chat can open web pages, read the page; when it cannot, ask them to paste the text. When it is missing, look in the Brain (step 2), then ask once for one specific thing about the candidate.
- channel: email, a LinkedIn message or other. When it is missing, write for a direct message and add no subject line.

## Steps

1. Read the voice: the "Writing" part of me/how-i-work.md for how they write to people (tone, greeting, sign-off). Note it for the gaps when it cannot be read or does not exist yet, and then write plain, warm and short.
2. Read what the Brain knows. List the files in knowledge/ and read knowledge/vacancy-<role>.md for this vacancy, knowledge/candidates-<role>.md for any entry on this candidate, and files whose names match the client or company it is for. From the vacancy file take the role, why it is open now and what makes it good. When no file covers the vacancy, ask once for those three facts, and do not invent them.
3. Find the hook: one specific, true thing about the candidate (their work, a post, a move, a skill) from about or a Brain file. Say which source it came from. When there is none, say so, and open with the fit between their known background and the role instead of a made-up detail.
4. Draft two options with different angles. Each one: line 1 the personal hook, lines 2 and 3 the role and why now and why them, line 4 a clear, low-pressure ask (such as whether they are open to a short reply). At most four sentences. No generic opener such as "I hope this finds you well", no hard selling, nothing about the client that the Brain marks as confidential. For email, add a short subject line to each.
5. Show both, as Option A and Option B, then the sources each fact came from, then ask which angle feels more natural and what to change.
6. When they pick one and ask to send it: sending is possible only by email, through a connected email app. Show the exact message, the recipient's address and the subject, and send only on their yes for that exact text. Report the id the email app returned. With no email app, or for a LinkedIn message, give the final text for them to copy and send themselves, and say it was not sent. Then offer the skill "Next step with a candidate" to record the new stage.

## Before you say done

- Every fact about the candidate and the vacancy came from the person or a named Brain file; nothing was invented.
- Each option has at most four sentences and no generic opener.
- Any Brain file you could not read is under gaps.
- A message was said to be sent only with the id the email app returned. Otherwise it says it was not sent.` }, "set-up-my-brain": { "title": "Set up my Brain", "tagline": "Make the private place where your AI keeps what it knows", "text": `# Set up my Brain

Creates the person's Brain: a private GitHub repository they own. Before it writes anything, it learns who they are and how they work from what this chat can reach, shows what it understood, and keeps only what they confirm. It runs once, and it can be run again to add what is missing.

## Inputs

- name: the repository's name. When it is missing, use second-brain.
- about: who the person is and what they do, in their own words.
- how: how they want work done. "Nothing yet" is a full answer.
- pasted: what another AI they use knows about them, pasted in. When it is missing, offer this once: they ask that AI "What do you know about me and my work? List it plainly", and paste the answer here.

## Steps

1. Check that this chat has a GitHub connector that can create a repository and write files as the person. When it has none, or it can only read, stop here. Tell them to add GitHub in this app's connectors, allowed to create and change their repositories, and to run this again. List it under gaps and create nothing.
2. Look in their own repositories for one that has a .second-brain folder. Before you use it, check all four, and write nothing into it until they hold: it belongs to their own account, not an organisation or another person; it is private; .second-brain/brain.json is there and says "kind":"person"; and its "layout" is 1 or 2. One exception for the marker: a private copy their computer made before the marker existed has no .second-brain/brain.json, but has .second-brain/release.json and no .second-brain/company folder. That is their Brain of layout 1, from their computer: say so, and it counts as holding the marker. When one fails, say which and that this repository was not used: a folder alone, another person's, a company's or a team's Brain, or a layout this skill does not know is not their Brain. When all hold, they already have a Brain: say which, create no repository, and go on from step 4 to add only what it lacks.
3. Say what you will create and ask once: a private repository under their own account with the name above. On their yes, create it as private, under their own account and never under an organisation. When the name is taken, ask for another. Read the repository back and confirm it is private. If it is not, say so at once and write nothing into it.
4. Learn the person, from these and nothing else. Read only, change nothing, and take no private details about other people.
   - What they gave above, and what they pasted from another AI.
   - What this app itself remembers about them, where it has such a memory.
   - Their connected apps, each only after they say you may read it: the last two weeks of email subjects and senders, calendar entries, recent document titles and open tasks. Say which apps are connected and ask once which of them you may read.
   - Their company's Brain, when they have one (the second repository the Brain rules name): its README and what its knowledge and decisions say about how the company works, its tools and who does what. This is what the company prepared for them, so they only check it. On their company's own connector, \`setup_status\` gives it under \`company_setup\`: what never goes into an AI, and under \`prepared_for_you\` what the company already knows of this person's role, work and recipes. It holds only what was prepared for this person. Start from that and ask them only to confirm or correct it.
5. Show what you understood, in five short parts, and ask them to correct it. Mark as unconfirmed anything you worked out and no source says.
   - Who they are and what they do.
   - How they want work done.
   - Their apps: each one that is connected in this chat, and up to three that are not and would help most, each with why.
   - The work they repeat: up to five pieces, each with what starts it, what it produces and which apps it uses.
   - A plan: the three things their AI should take off them first, in order.
6. Save only what they confirmed, in one commit. Leave alone any file that is already there, with one exception: a file below that holds only its heading, as an earlier run left it for a part they had not confirmed, takes what they confirm now under that heading, and a README below that holds only its heading takes its line. A file with any other line in it stays exactly as it is.
   - .second-brain/brain.json with exactly {"kind":"person","layout":2}, or with exactly {"kind":"person","layout":1} in a copy their computer made before the marker existed (step 2), whose layout is 1
   - README.md with the heading "My Brain" and the line "What my AI knows about me and my work. Private."
   - me/profile.md with who they are, and me/how-i-work.md with the heading "How I like work done", then how they want work done
   - me/tools.md with the heading "The tools I work with", then one line for each app: its name, and "connected" or "not connected yet"
   - me/work-recipes.md with the heading "The tasks I repeat", then each piece of work they confirmed
   - me/plan.md with the heading "The plan", then the three things in order
   - me/warnings-off.md with the heading "Warnings I turned off"
   - knowledge/README.md with the heading "Knowledge" and the line "Facts about my work that my AI should know: how things are done, who does what, where things live."
   - decisions/README.md with the heading "Decisions" and the line "Choices I made and why. One short file per decision, with the date. To see a decision again on a date, end its file with the heading When we review it and the date on the last line, written like 2027-02-01."
   - outputs/README.md with the heading "Outputs" and the line "Finished work."
   A part they did not confirm gets its heading only, and is listed under gaps.
7. Read back the list of files and me/profile.md. Report the repository's link as the GitHub tool returned it, and say the Brain is ready. Then name the first thing on their plan and offer to do it now as their first result.

## Before you say done

- The repository is private, belongs to the person, and its .second-brain/brain.json says a person's Brain of layout 1 or 2, or it is a copy their computer made before the marker existed (step 2). You checked this before writing anything into it.
- Every file in step 6 is there. No file that existed before was changed, except one that held only its heading and now holds what they confirmed.
- Every line you saved is one the person gave or confirmed. Nothing you only worked out was saved as fact.
- me/tools.md says connected only for an app that is connected in this chat now.
- Nothing from their company's Brain was copied into their own as a personal note, and nothing of theirs was put into the company's.
- The link you give is the one the tool returned.` }, "setup-dictation": { "title": "Set up dictation", "tagline": "Speak a thought into your Brain instead of typing it", "text": `# Set up dictation

The person wants to speak a thought into their Brain instead of typing it. In a chat, the way to do that is the voice input of the chat app itself. This skill checks that it hears them well, and keeps the names it mishears, so that what they say arrives as what they meant.

## Inputs

- device: Phone or Computer, where they will speak. Ask when it was not given.

## Steps

1. Tell them where to speak. In the chat app, the microphone button in the message box turns speech into text before it is sent. On a phone, the microphone key of the keyboard does the same in any app. On a computer, the system's own dictation works in the chat app too: Dictation on a Mac, voice typing on Windows. Name only the one that fits their device.
2. Ask them to say two or three sentences about their work into this chat, the way they would say a thought they want kept, and to send it without correcting it.
3. Read what arrived. Ask them which words came out wrong. Then ask them to say the names they use most: the people, companies, products and places of their work. Write down each one that arrived wrong, with what they meant.
4. Read me/how-i-work.md in their Brain. Show them the lines you would add under a heading "Names I say": one line for each name, as it is heard and as it is written. Add them only after their yes, as the Brain rules say. With no name misheard, add nothing.
5. Show them the shortest way to use it: say the thought, send it, and ask for it to be saved. Offer to save the test thought now if it is one worth keeping, and save it only on their yes.
6. If the voice input is missing or the app refuses the microphone, say what to switch on: the microphone permission for the app, in the settings of the phone or the computer. Do not try to install anything: a chat cannot reach their device.

## Before you say done

- They sent at least one spoken message in this chat, and you read it.
- Every name that arrived wrong is either saved with their yes, or listed as not saved.
- You said the file and gave its page for anything you saved, after reading it back.
- You named anything you could not do under gaps, such as a Brain you could not reach.` }, "simple-cycle": { "title": "Small task, start to finish", "tagline": "One small piece of work, done in this chat from start to finish", "text": `# Small task, start to finish

Takes one small piece of work from request to finished result in this chat: a short checklist, the work, the person's review, and the result kept in outputs/ on their yes.

## Inputs

- task: what they want done, as one result. When it is missing, ask what it is. When it asks for several results, or for work that will not fit in one sitting, say this cycle does one small result, ask which comes first, and name the rest so they are not lost. For the larger work, suggest "Task with a plan", or "Big work, two sign-offs" when it is high-stakes.

## Steps

Plan

1. Read the files in knowledge/, decisions/ and outputs/ whose names bear on the task, besides what the Brain rules say to read. Note what each one gave and each one you could not read.
2. Write the checklist and show it: what the result is (its form, length and who reads it), then 3 to 7 items, each one thing to write, find or check. Name what is missing that neither the person nor the Brain gave. Ask about it, one question at a time, only when the result would be wrong without it; otherwise write it down as an assumption. Result: the checklist, in the chat. Nothing is saved.

Work

3. Do each item in order and mark it done in your reply. Use only the person's words, the Brain files you read and connected apps. Mark anything else "unconfirmed". Result: the full draft.

Review

4. Show the draft in full. Under it, give a short list: each checklist item met or not, each Brain file the draft rests on by name, each assumption and unconfirmed point, and at most two things the person may want to change. Ask whether it is done or what to change. Apply the changes and show the whole result again, until they say it is done. Result: the version they approved.

Complete

5. Offer to keep the approved result as outputs/YYYY-MM-DD-short-name.md, with today's date and a short name from the task, starting with one line on what task it answers. When a file with that name exists, pick another name; never write over it. Save only on their yes, following the Brain rules for saving. When the Brain cannot be written, say it was not saved and give the result ready to copy. Result: the file link and a read-back that shows the text, or "not saved".
6. Offer at most three things learned in this run, only ones that came from the person: a preference they showed in the review (for me/how-i-work.md), a fact about their work (for the file in knowledge/ that fits), or a choice and why (for a new dated file in decisions/). Show each exactly as it would be saved and where. Save only the ones they say yes to. Result: each saved item with its link, or a line that nothing was kept.

## Before you say done

- The person saw the whole result and said it was done.
- "Saved" is said only with a read-back that shows the text and the link GitHub returned. Otherwise the reply says the result is in this chat only.
- Nothing was kept that the person did not say yes to, and no existing file was written over.
- Nothing was sent or published.` }, "step": { "title": "Do the next step", "tagline": "Do one step of a project's plan and mark where it stands", "text": `# Do the next step

Does exactly one step of a project's plan, checks it, and records its new state in projects/<short-name>/plan.md, so the next chat starts where this one ended.

## Inputs

- project: the project. When missing, list the folders in projects/ and read each plan.md's Status line. Exactly one active project: use it and say so. Otherwise ask once which one.

## Steps

1. Read projects/<short-name>/plan.md. When it cannot be read, say so and stop: never do or mark a step from memory of an earlier chat. When it exists but has no steps, say so and offer the skill "Plan the steps". When every step is done or skipped, say the plan is complete and offer the skill "Plan the steps" for the next goal.
2. Pick the next step: the first one whose State is "to do" and whose Needs are all done or skipped. When none is free because the rest are blocked or waiting, list each blocked step with its reason and stop. Say which step you picked and why.
3. Read what the step names (Brain files, outputs, the connected app it uses) and the knowledge/ and decisions/ files whose names bear on it.
4. Do the step by its Where line. When it has none, judge it by what the step asks and say which you chose.
   - chat: do it here with the Brain and the connected apps: write the draft, find the facts, prepare the message. Anything that would send, publish, book or invite is drafted and shown, and done only on the person's yes for that exact thing, with the id or link the tool returned.
   - computer: it needs running code, tests or files on a computer, which a chat cannot do. Say so plainly. You may write out what to run or change, but it has not run. Its new State is "blocked <YYYY-MM-DD>: needs a computer".
   - you: say exactly what the person has to do. When they say it is done, its new State is "done <YYYY-MM-DD> (confirmed by you)". Otherwise it stays "to do".
   When a needed app is not connected, do what you can, say what is missing, and mark the step "blocked <YYYY-MM-DD>: <app> not connected".
5. Check the result against the step's Check line. Show what meets it. When the check is a judgment only the person can make, show the output and ask. A step is done only when its check is met; never mark one done because the work was attempted. A check that needs running something is not met in a chat.
6. When the step made something worth keeping (a draft, a summary), show it and offer to save it as outputs/<YYYY-MM-DD>-<short-name>-step-<N>.md. Save it only on a yes, following the Brain rules for saving, and read it back.
7. Show the change to the plan: the step's new State line, a "- Result:" line under that step with the output's link or one line on what was done, and one log line under "## Log": "<YYYY-MM-DD>: Step <N> <new state>: <one line>." Starting this skill is the yes for recording the step's state; ask before saving anything else.
8. Read plan.md again as it is now. Change only that step's State line and add the two lines; every other line stays exactly as it was. Write it back in one commit with a message such as "Step <N>: <state>".
9. Read the file back and compare it with what you read in step 8: only the State line and the new lines differ. Say the plan was updated only then, and give the link the GitHub tool returned. When the write or read-back failed, say the plan was not updated, and that the step's state lives only in this chat.
10. Report: what was done, the check and its result, the new state, progress as done steps out of all steps, and the next step with its time. Offer the skill "Do the next step" again. When this was the last open step, offer instead to change the plan's "- Status: active" line to "- Status: done <YYYY-MM-DD>"; make that change only on a yes, the same way as step 8 and 9.

## Before you say done

- Exactly one step was worked on.
- A step marked done had its check met in this chat or confirmed by the person; nothing needing a computer was marked done.
- Nothing was sent, published or booked without a yes for that exact thing, and every one has the id or link the tool returned.
- The read-back shows the new state and all earlier text of plan.md, and its link is given.` }, "switch": { "title": "Switch project", "tagline": "Pick up a project where you left it", "text": `# Switch project

Loads one project from the Brain so the person can carry on without catching up: its goal and context, what was done last, what is open, what the Brain knows that bears on it, and the step to take next.

## Inputs

- project: the project's name or short name. When missing, list the folders in projects/ with each plan's title and Status, and ask once which one.

## Steps

1. List the folders in projects/. Match the name the person gave to a short name, ignoring case, spaces and hyphens. When none matches, show the projects there are, name the closest one, and offer the skill "New project". When projects/ does not exist, say there are no projects yet. When the Brain cannot be reached, say so and stop: never describe a project from memory.
2. Read projects/<short-name>/plan.md. Take its Goal, Context, Status, every step with its State, and the last five lines under "## Log".
3. Work out how long since it was last worked on: the date of the newest Log line or step state, against today's date. Say the date it rests on.
4. Read what bears on it: the files in knowledge/ and decisions/ whose names match the project, its client or its subject, and the files in outputs/ whose names carry the short name. Read at most ten. Note for each one line on what it adds, such as a client's preference or a decision still in force, with the file name and date. For a decision whose "## When we review it" date has passed, say the review is due.
5. Choose the suggested next step: a blocked step whose blocker may now be cleared comes first when the plan shows a date for it; otherwise the first "to do" step whose Needs are done. When there are no steps, suggest the skill "Plan the steps".
6. Show, in this order: the project title and goal; last worked on, with how many days ago; recent activity (the last three done steps and their dates, or the last Log lines); open steps grouped as next, waiting and blocked, each with its reason; what the Brain adds, file by file; the suggested next step with its time and why. Mark any of it that came from a file you could not read fully.
7. Offer to go on with the skill "Do the next step". For the rest of this chat, treat this as the project the person is working on.

## Before you say done

- Every fact shown came from a file read in this chat, named by its path.
- No file was written: switching changes nothing in the Brain.
- Every file you could not read is under gaps, and a missing plan is never filled with a made-up one.` }, "tldr": { "title": "TL;DR", "tagline": "Anything long, as the few lines that matter", "text": `# TL;DR

Gives something long back as the few lines a reader can act on, each tied to its words, losing no condition, limit or "not".

## Inputs

- what: the text: pasted, attached, linked, or a mail thread or drive file. When missing, ask once.
- who: the reader. "me" or missing: the person. Anyone else: a hand-over to someone who was not part of the work.
- language: of the result. When missing, the one the person writes in.
- focus: what matters most. Put it first; never drop a key part for it.

## Steps

1. Read me/profile.md and me/how-i-work.md for role and concerns, and me/skill-notes/tldr.md: its rules win. For a hand-over, find from the Brain or one question what the reader knows and if they use an AI assistant; if unclear, assume they know nothing.
2. Get the original word for word, read only: pasted, an upload (with this app's own tool for it), a link, mail or drive. Keep page and section numbers, times and speakers. If it cannot be read (a scan with no text, a sign-in page, an app not connected), say what would help, such as pasting it, and wait. Never shorten from a guess. Note if it is the person's own writing.
3. Number its parts and mark each key part: one with a sum, a number, a date, a duty or decision, or a condition ("unless", "only", "if", "up to", "at least", "not", "no later than", "not earlier than", "draft", "may").
4. Name its kind; answer its questions from the original alone, with its words or "not said":
   - contract: parties; price, how paid; start, end; renews by itself; ending early; liability limit; each side's duties.
   - proposal or invoice: what for; price, with tax or not; delivery or due date; how paid; valid until; what it needs from us.
   - report: period; main result; compared with; risks named; next.
   - thread or meeting: where it ended, or what was decided; who does what; by when; what is open.
   - policy: applies to whom; from when; what changes; exceptions; if not followed.
   - plan: goal; owner; due; cost; how we know it worked.
   - research: question; finding; evidence, how much; limits.
   - change: today and after; why (planned step, fault, new need); who it affects, who not; gains; cost or risk, why acceptable; usual way or not; what the reader must do, why them.
   - decision: what; why now; options, including no change; each one's cost or risk; which is recommended, why; who decides.
   - own writing, or other: the point; what it asks.
5. Find what is asked (who, and by when as a full date with weekday, from the document's date), what is easy to miss (fine print, a renewal, a footnote; in a thread the newest message wins: say what changed, when), and what doesn't add up (add up its tables). Compare its people, sums and dates with knowledge/, decisions/ and connected mail or files: a difference goes under Against what we know.
6. Sections for the person, in order, each only when it has something: In one line (25 words at most); The minute (five at most, the one not to miss in bold); For you (three at most); Asked of you (each with who and by); Easy to miss (four at most); Not said; Doesn't add up; Against what we know (cite both sides); Tighter (only for their own writing: same meaning, facts and conditions, their voice, fewer words); The whole thing (one line per section, for an original of 300 words or more).
   For someone else: Why this change, or Why decide now (three at most, always first); Before and after, or The options (six at most); What we need from you (four at most, only what this reader can do, why them); Easy to miss; then Not said, Doesn't add up, Against what we know. The title says what changes, for whom. If the reader uses an AI and the work suits it, end with a brief for it: Context (every site and project in full), Goal (what must be true, not how), Requirements (the usual way, no workarounds; a key, password or token never passes through an AI: the reader enters it), Done when (how it checks, seeing no secret).
7. Every line ends with a marker such as [3]; a Sources list under the result gives each its place (page, section, time, speaker) and exact words, "..." for any left out. Your own reading says so. Numbers, dates and quotes exactly as written. A condition stays: "paid within 30 days unless disputed" never becomes "paid within 30 days"; "not earlier than" is a start, not a deadline. Nothing the original does not say. Sites by full address; people and projects by names the reader knows. Nothing is a problem unless a source says so. No history the reader does not need, no ticket by number alone, no empty field such as "By: not said", no name the sources keep private.
8. Read the short version alone, as a stranger: write 4 to 8 statements of what it says, and each name, address, term or step you could not act on. Compare each statement with the original, fix any line that misleads or is unclear, and read again. Say this re-read was yours, not an independent reader's.
9. Apply these checks to your draft yourself; fix and reapply, up to five rounds:
   - Order and lengths: as in step 6.
   - Quotes: every quoted word is in the original exactly.
   - Figures: each number, date and time is in its cited source; weekdays fit dates; no older figure where a newer message differs.
   - Coverage: every key part is covered by a line, or listed as left out, with why.
   - Conditions: no line drops a condition its source has.
   - Kind: every question answered or under Not said.
   - Shorter: what is read first, leaving out Not said, Doesn't add up, Against what we know, Tighter, The whole thing and the brief, is at most 220 words (300 for a hand-over) and 70% of the original (60% over 300 words).
   - Sources: every line has a marker or says it is your reading; every link and address is in a source.
   - Rules: each ask has who, a past date is marked overdue; framing, empty fields, history, private names, the brief (steps 6, 7).
   - Fresh read: every statement matches and nothing is unclear.
10. Show the result, its Sources, the words before and after, and the check report: each check passed or not, and for a failure the line at fault and why. Say you, the AI, applied the checks; no program ran them. For a hand-over, give the whole text in one block to copy, headings in bold, brief last. Send it to no one. Later, answer from the original's words; after any change, check again and show it whole.
11. Ask whether to keep it. Only on a yes, save the result and its Sources as a new file outputs/YYYY-MM-DD-tldr-short-name.md, following the Brain rules for saving; never over an existing file, never the full original. A correction for next time goes to me/skill-notes/tldr.md, on a yes.

## Before you say done

- Every line rests on words in the original or says it is your reading; every key part is covered or left out with a reason.
- The report names each failure with its line and says you applied the checks and did the re-read.
- Nothing was sent; a save is claimed only with its read-back and link.` }, "validate": { "title": "Read a pull request's checks", "tagline": "What passed and what failed on a pull request, from GitHub itself", "text": `# Read a pull request's checks

Tells the person what passed and what failed on one pull request, as GitHub's own checks report it, and what stands between it and a merge.

## Inputs

- pr: the pull request, as a link or a repository and number. When it is missing, ask which repository; list its open pull requests with the chat app's GitHub connector and ask which one.

## Steps

1. Read the pull request with the chat app's GitHub connector: its state, base and head branch, the latest commit on the head branch, and whether GitHub says it can be merged. Without a GitHub connector that can read this repository, stop and say so: there is nothing to read the checks from.
2. Read the check results and commit statuses for that latest commit. Results on an older commit do not count for the current code: say so when that is all there is.
3. Put each check in one group, by the result GitHub gave: passed, failed, still running or queued, skipped, cancelled, or waiting for someone to act. Keep its name and its link.
4. For each failed check, read the summary or log the connector gives. Quote the lines that show the failure, with the file and line when the log names them. When you add a likely cause, say it is your reading of the log. When the connector gives no log, say only that it failed and give the link.
5. When the connector shows which checks are required to merge, say which of them are not yet passed. When it does not show this, say you could not tell which checks are required.
6. Read the changed files and look for what no check catches: a password, key or token in the text, a leftover placeholder such as TODO or "lorem", an empty section, and a new file nothing links to. List these apart from the checks, as your own reading.
7. Report in this shape:
   - Commit read, and its date.
   - Passed: names. Failed: names, each with the quoted cause. Still running, skipped, cancelled, waiting: names.
   - From my reading, not a check: what step 6 found, or "nothing found".
   - Ready to merge: yes only when every check read has passed or was skipped, none is still running and GitHub says it can be merged. Otherwise no, with the reason, or "can't tell yet" while checks are running.

## Before you say done

- Every "passed" or "failed" comes from a check result GitHub returned for the latest commit; nothing was run in this chat and the report does not say otherwise.
- A pull request with no checks is reported as "no checks ran", never as passing.
- Your own reading is kept apart from the check results and labelled as yours.
- Any check, log or file you could not read is under gaps.` }, "wake-up": { "title": "Learn how I write", "tagline": "Learns your voice from your own writing and writes a sample post", "text": `# Learn how I write

Gives the person a clear description of how they write, taken only from their own writing, and one sample post that sounds like them. Run it again whenever they have more writing to learn from.

## Inputs

- samples: writing the person wrote themselves, pasted here. A file uploaded into this chat counts too.
- where: where more of their writing is: a folder in the connected Drive, a newsletter or blog link, or their sent mail. When samples and where are both missing, ask once for one of them.
- topic: the subject of the sample post. When it is missing, use the subject that comes up most in the samples.

## Steps

1. Gather their writing, and only theirs. Use the pasted samples and uploaded files; documents in the named Drive folder; a web page with this app's own tool for reading web pages; or, when they agree, ten recent emails they sent, from the connected mail, using only the lines they wrote. Also read finished pieces in outputs/ that they wrote. A LinkedIn profile usually cannot be read without signing in: when it cannot be read, ask them to copy their recent posts from their LinkedIn activity and paste them. List each source with how many pieces and words it gave, and name under gaps each one you could not read.
2. Check there is enough. Three pieces or about 500 words is the least for a description you can stand behind. With less, say so and ask for more. Go on with less only when the person asks, and then mark the whole description "proposed, from" and the number of pieces. With nothing of theirs to read, stop: never describe a voice you have not read.
3. Read me/how-i-work.md and me/skill-notes/wake-up.md. When me/how-i-work.md already has a "Writing" part, note what it says, so you can show what is new or different.
4. Describe the voice from the samples, with a short quoted example for each point:
   - the three openings they use most (how a piece starts).
   - sentence length: usual length in words, and how much it varies.
   - punctuation habits, for example short lines, questions, lists, emoji or none.
   - five to ten phrases or words they use often.
   - words and phrases to avoid: the ones the person names, plus common stock phrases that never appear in the samples, marked "proposed" until they confirm them.
   - tone: for example direct or gentle, playful or serious, how they push back, how they close.
   - the subjects they write about most.
5. Write one sample post on the topic in that voice. Use only facts from the samples, the Brain or the person; leave any missing fact as a blank like [number].
6. Show the description and the sample. Ask whether the description is right, and fix what they correct.
7. Offer to save the description in me/how-i-work.md under a "Writing" part, with today's date and the sources it came from (for example "from 8 LinkedIn posts and 3 emails"). Where the file already has a "Writing" part, add the new lines under it and leave the old ones, and point out any line that says the opposite of an old one so they can say which stands. Save only on their yes, following the Brain rules for saving. The sample post is not saved unless they ask, and then it goes in outputs/.
8. Read back the file and report what was saved with the link the GitHub tool returned.

## Before you say done

- Every point in the description quotes or rests on the person's own writing that you read, and the sources are listed.
- A description from fewer than three pieces is marked "proposed".
- Phrases to avoid that the person did not name are marked "proposed".
- The save was confirmed first, the read-back shows it, and the earlier "Writing" lines are still there.
- Nothing was posted or sent.` }, "work": { "title": "Work through the plan", "tagline": "Carry out a project's plan, saving where it stands after each step", "text": `# Work through the plan

Carries out the open steps of a project's plan in order, checking each and recording it in projects/<short-name>/plan.md before moving on, then gathers the finished work into one file in outputs/ for the person to keep.

## Inputs

- project: the project. When missing, list the folders in projects/ and read each plan.md's Status line. Exactly one active project: use it and say so. Otherwise ask once which one. When the person described a task with no plan, say there is none and offer the skill "Plan the steps" first.
- until: how far to go. When missing, go until the plan is done. "Until a step needs me" stops at the first step marked you or computer, or the first yes you need.

## Steps

1. Read projects/<short-name>/plan.md. When it cannot be read, say so and stop: never work from a plan remembered from another chat. When it has no open steps, say so and offer the skill "Plan the steps".
2. Read me/skill-notes/work.md when it exists, the files in knowledge/ and decisions/ whose names bear on the goal, and every Brain file the steps name. Keep a list of the files used.
3. Show the run before you start: the open steps in order, which ones can be done here (Where: chat) and which need a computer or the person (Where: computer or you). Say that after each step you will record its state in plan.md, and that starting this skill is the yes for that. Anything else you save or send will be asked for on its own.
4. For each step in turn, take the first one whose State is "to do" and whose Needs are all done or skipped, and do it as the skill "Do the next step" does:
   - chat: do the work here with the Brain and the connected apps. A message, post or booking is drafted and shown; it goes out only on a yes for that exact thing, and you report the id or link the tool returned.
   - computer: it needs code, tests or files on a computer. Say so, write out what to run if it helps, mark it "blocked <YYYY-MM-DD>: needs a computer", record it as in step 6, and go on to the next free step.
   - you: say what the person must do, and wait. Mark it "done <YYYY-MM-DD> (confirmed by you)" only on their word; when they leave it for later, go on to the next free step.
   - an app it needs is not connected: do what you can, mark it "blocked <YYYY-MM-DD>: <app> not connected" and go on to the next free step.
5. Check each result against its Check line before marking it done. When a check fails, say what is wrong and offer: fix and go on, change the approach, or leave it "to do" with a note. When you did a step differently from its Do line, say how and why in its Result line.
6. After each step, read plan.md as it is now, change only that step's State line, add a "- Result:" line under it and one dated line under "## Log", write it back in one commit, and read it back. Go on to the next step only when the read-back shows the change. When the write fails, stop the run and say which steps are recorded and which live only in this chat.
7. When the run stops, gather what the steps made into one document: a title, the date, the project and its plan link, the Brain files used, then the work itself, then a short list of the steps done, any done differently and any left blocked. Show it.
8. Ask for a yes to save it as outputs/<YYYY-MM-DD>-<short-name>.md. On the yes, create it following the Brain rules for saving, read it back, give the link, and add a "- Result:" link to it under the last step done.
9. When every step is done or skipped, offer to change the plan's "- Status: active" line to "- Status: done <YYYY-MM-DD>", and make that change only on a yes, as in step 6.
10. Report: steps done out of all steps, steps blocked and why, what was sent or booked with its id or link, and the next step. Offer to keep any lesson learned with the skill "Save what I learned".

## Before you say done

- Each step marked done had its check met here or confirmed by the person; no step needing a computer was marked done.
- Every state change is in plan.md, shown by a read-back, and no other text in it was lost or reworded.
- Nothing was sent, published or booked without a yes for that exact thing.
- A deliverable is called saved only with its read-back and link.` }, "write-like-me": { "title": "Write like me", "tagline": "A short draft in your own voice, for you to check", "text": `# Write like me

Gives the person the shortest draft that does the job, in their own voice, with every assumption listed so they can fix it fast.

## Inputs

- what: what the piece is for. When it is missing and this chat does not make it clear, ask one short question that covers both what it is for and who reads it.
- reader: who reads it. When it is missing, take it from what or the chat; ask only inside the one question above.
- examples: their own writing to copy the voice from. When it is missing, use the Brain and any of their writing pasted earlier in this chat. Never ask for examples before drafting.

## Steps

1. Read the "Writing" part of me/how-i-work.md: tone, length, greetings, sign-off, words they avoid. When the piece is about a client, a project or a subject, list the files in knowledge/ and read the ones whose names match. Note each file you could not read, or that does not exist yet, for the gaps.
2. Decide the voice. The person's own examples win over everything else, then me/how-i-work.md, then plain, short and friendly. Say in one line which of these you followed.
3. Write the shortest version that does the job, in their words and at their level of formality. Use only facts from the person, the chat or a Brain file. Leave any missing fact as a clear blank, such as [date], instead of making one up.
4. Show the draft. Under it, list each assumption: the reader, the tone, any fact or blank, and anything you left out.
5. When the person changes the draft in a way that shows a lasting preference (for example "never start with Hi", "shorter"), ask once whether to keep it for next time. Show the exact line you would add and say it goes under the "Writing" part of me/how-i-work.md. Save it only on their yes, following the Brain rules for saving. A one-off change to this draft is not a preference: do not offer to save it.
6. This skill only drafts. When they then ask to send it, that is a separate action: prepare it with the recipient and ask under the Brain rules for acting outside the Brain.

## Before you say done

- Every fact in the draft came from the person, the chat or a named Brain file, and every guess is listed as an assumption.
- Any Brain file you could not read is under gaps, and the voice line says what you followed instead.
- A preference was said to be saved only when the read-back shows it and the link is given; otherwise it is under gaps as not saved.
- Nothing was sent.` } }, "BRAIN_RULES": `Brain rules. Follow them in every task and skill.

The Brain is this person's memory: a private repository in their company's GitHub, reached only through this Second Brain connector, which their company runs. Read it with brain_list and brain_read and save it with brain_save. When setup_status says saves go through the save link, call save_link wherever these rules say brain_save, and give the person its link. Delete a file only with brain_delete. Never use another GitHub connector for it. What is in it goes nowhere else.

1. Find it. It is the Brain brain_list shows: you never choose a repository. If those tools fail when you call them, say so plainly, do every part of the work that doesn't need the Brain, and list the Brain under gaps. Never keep their memory anywhere else instead.

2. Its folders. me/profile.md (who they are). me/how-i-work.md (how they want work done). me/tools.md (their apps), me/work-recipes.md (work they repeat) and me/plan.md. me/skill-notes/<skill>.md (their own changes to a skill). knowledge/ (facts about their work, one file per subject). decisions/ (one dated file per decision, named YYYY-MM-DD-short-name.md, with the review date under "## When we review it"). outputs/ (finished work). projects/<short-name>/plan.md (a project's goal, its steps and where each stands). me/warnings-off.md (warnings they asked not to see again). Never make other top-level folders, such as memory/, brain/ or tasks/. When a skill names one of those, facts and patterns go in knowledge/, decisions in decisions/, who the person is in me/, finished work in outputs/, and a task on their to-do list.

3. Recall first. Before the work, read me/profile.md and me/how-i-work.md and the skill's own note in me/skill-notes/ when you follow a skill. Then list knowledge/ and decisions/ with brain_list, every time, and read the files whose names bear on the work with brain_read: a folder you did not list cannot warn you. Read each one as it is now, even when this chat read it before: a copy can be a save behind. Use what you read, and name the file when you rely on it. A file you could not read was not used: list it under gaps.

4. Advise before you act. When what the person asks goes against something their Brain holds as decided or as how they work (a decision, a rule, a lesson from an earlier mistake), stop before acting and ask one question. Open it with the path of the file that says so and that file's date, then what it says, and offer: go on anyway, change the task, or stop warning about this. Read me/warnings-off.md before any warning. Warn only when a file clearly says it, never on a guess, and never about something that file lists. When they choose to stop the warning, add one dated line for it to me/warnings-off.md. You advise and the person decides: never change or skip their work on your own.

5. Saving. The Brain holds only what the person confirmed.
- Ask first. Say exactly what you would save and in which file, and write only after their yes. When they started a skill in order to save something, their own words are the yes for those words as they gave them, and adding today's date changes nothing. Anything you reworded, summed up or worked out yourself is shown first and saved on their yes.
- Add, never replace. Read the file as it is now, add to it, and write it back in one commit whose message says what was added. Add to a file that fits before making a new one. Never delete or rewrite what is there unless they asked for exactly that. One line may change without asking: a step's state in a project's plan, when that step was just done or found blocked.
- Prove it. After saving, read the file back with brain_read. Say it was saved only when that read shows your text. If the save or the read-back failed, say it was not saved and list it under gaps. When brain_save says the Brain changed since it was read, read the file again, add your text to what is there now, and save once more. After a save link, read the file back once the person says they pressed Save.
- Keep their rules with it. When the person gave a rule for using what you save, such as do not send it or review it first, write that rule at the top of the file, above the work.
- Mark what is not certain. Write "proposed" or "unconfirmed" beside a date, number or decision that no source confirmed.
- No secrets. Never save a password, key, token or card number, or private details about other people.

6. Acting outside the Brain (sending, publishing, booking, inviting, deleting). Prepare it, show it and ask. Act only on their yes for that exact thing, and report the id or link the tool returned.

7. A company Brain is shared with the whole company. Read it with brain_list and brain_read and which: company, and name the file an answer comes from. Never put personal notes in it. A change to it goes as a suggestion with brain_suggest, and only when they ask: the owner or an admin approves it.

8. What the dashboard lists. .second-brain/records/ holds tasks.json (the to-do list), crm.json (relationships), projects.json (the short list of projects), routines.json (scheduled work) and jobs.json (prepared work), as JSON. Read them when the work is about a task, a contact, a project or a schedule: they are part of what the person told you. Change one only when the person asks or a dashboard task says to. Read the file as it is now, change only the item named, keep every other item and every field you do not know, and write the whole file back in one commit. When the file is not there yet, create it in the shape below. A new item gets an id of eight letters and digits that no other item has. Shapes: tasks.json is {"mine":[{"id","title","notes","due":"YYYY-MM-DD or null","priority":"now, soon or later","status":"open, doing or done","created","done"}],"dismissed":{},"snoozed":{}}; crm.json is {"added":[{"id","org","person","role","stage","lastAt","lastHow","lastText"}],"stage":{"<id>":{"stage","at"}},"touches":{"<id>":[{"at","how","text"}]},"next":{"<id>":{"text","at"}}}; projects.json is [{"id","name","state":"moving, waiting, stuck or done","next","owner","why"}]; routines.json is [{"id","title","when","why","text","state"}]; jobs.json is [{"id","title","outcome","state"}]. Dates are YYYY-MM-DD and times are ISO, in UTC.

9. The person's own skills. A skill they made is .claude/skills/<short-name>/SKILL.md in the Brain: frontmatter holding only name: <short-name> and description: one line on what it gives, then a heading with its name, "## Steps" and "## Before you say done". When they ask for one of their own skills by name, read that file and follow it, with these rules. Make or change one only when they ask, show the whole text first, and save it on their yes. Never save a skill of theirs under the name of a skill the dashboard already lists. When the Brain came from a folder on their computer, the skills that came with that folder are there too: the ones .second-brain/release.json lists and .second-brain/yours/skills.json does not name. Those are not the person's own. Never change one, and never follow one in place of a skill the dashboard lists. A skill for the whole company is suggested with brain_suggest at skills/<short-name>/SKILL.md, in the same form.`, "COMPANY_START": [{ "path": "AGENTS.md", "text": "# Instructions for the AI in {{NAME}}\n\nThis is the shared brain of {{ORGANISATION}}. {{CURATOR_NAME}} approves every change.\n\n- The copy in a person's folder (`shared-brain/`) is read only. Never edit, add or delete files there; the next update replaces it.\n- To change something, suggest it with the person's shared-brain skill. It goes to {{CURATOR_NAME}} for approval.\n- For questions about the team, start with `README.md` and `skill-map.md`, then `knowledge/` and `decisions/`. Say which file an answer comes from.\n- Never put personal notes, private conversations, client emails, passwords, keys or tokens here, and nothing from a person's own brain unless they asked and saw exactly what is sent.\n- Plain language a new colleague understands on the first read. One topic per file in `knowledge/`, one decision per file in `decisions/`, named `YYYY-MM-DD-short-title.md`.\n- Each skill is `skills/<id>/SKILL.md` with frontmatter `name` and `description` only, and a row in `skill-map.md`. A new skill starts as `draft`; only {{CURATOR_NAME}} makes it `live`.\n" }, { "path": "CLAUDE.md", "text": "# Instructions for the AI in {{NAME}}\n\nThis is the shared brain of {{ORGANISATION}}. {{CURATOR_NAME}} approves every change.\n\n- The copy in a person's folder (`shared-brain/`) is read only. Never edit, add or delete files there; the next update replaces it.\n- To change something, suggest it with the person's shared-brain skill. It goes to {{CURATOR_NAME}} for approval.\n- For questions about the team, start with `README.md` and `skill-map.md`, then `knowledge/` and `decisions/`. Say which file an answer comes from.\n- Never put personal notes, private conversations, client emails, passwords, keys or tokens here, and nothing from a person's own brain unless they asked and saw exactly what is sent.\n- Plain language a new colleague understands on the first read. One topic per file in `knowledge/`, one decision per file in `decisions/`, named `YYYY-MM-DD-short-title.md`.\n- Each skill is `skills/<id>/SKILL.md` with frontmatter `name` and `description` only, and a row in `skill-map.md`. A new skill starts as `draft`; only {{CURATOR_NAME}} makes it `live`.\n" }, { "path": "README.md", "text": "# {{NAME}}\n\nThe shared brain of {{ORGANISATION}}: the knowledge, decisions and skills the team shares. Each person's own brain stays private; only what the team agrees to share comes here.\n\n## What is in here\n\n| Folder or file | What it holds |\n|---|---|\n| `knowledge/` | How the team works: processes, who does what, products and partners in general terms. |\n| `decisions/` | Decisions the team made, each with the reason and a date to look at it again. |\n| `skills/` | Skills: written steps the team's AI follows for work that comes round. |\n| `skill-map.md` | Every skill: what it is for, who owns it and whether it is live for everyone. |\n| `shared-brain.json` | Settings the setup reads. Do not rename or move it. |\n\n## How a change gets in\n\nAnyone on the team suggests a change from their own dashboard or by asking their AI. {{CURATOR_NAME}} looks after this shared brain and approves each suggestion. Once approved, it reaches everyone's AI at their next update.\n" }, { "path": "decisions/README.md", "text": "# Decisions\n\nOne decision per file, named `YYYY-MM-DD-short-title.md`, with: the decision, why, the options considered, who decided and when to look at it again. To change a decision, add a new file that says which one it replaces.\n" }, { "path": "knowledge/README.md", "text": "# Knowledge\n\nWhat everyone on the team should know about how it works: processes, who to ask for what, products and partners in general terms. One topic per file, named with lowercase letters, digits and hyphens. Start with one sentence on what the file is about. Never personal notes, private conversations, client emails or secrets.\n" }, { "path": "shared-brain.json", "text": '{\n  "schema": "shared-brain/1",\n  "name": "{{NAME}}",\n  "organisation": "{{ORGANISATION}}",\n  "client": "{{CLIENT_ID}}",\n  "curator": "{{CURATOR_LOGIN}}",\n  "curatorName": "{{CURATOR_NAME}}"\n}\n' }, { "path": "skill-map.md", "text": "# Skill map\n\nEvery skill in `skills/`, who owns it and its status. `draft`: being written or checked, reaches no one. `live`: reaches everyone's AI at their next update. `deprecated`: removed at the next update. Only {{CURATOR_NAME}} changes a status to `live`.\n\n| Skill | Use when | Owner | How it is checked | Status |\n|---|---|---|---|---|\n" }, { "path": "skills/README.md", "text": "# Skills\n\nA skill is written steps the team's AI follows for work that comes round. Each is `skills/<id>/SKILL.md`, starting with frontmatter that has only `name` and `description`, then the steps in plain language. Every skill has a row in `../skill-map.md`. Skills marked `live` reach everyone's AI at their next update.\n" }] }, "host": "cloudflare" };

// ../brain/layout.mjs
var LAYOUT_VERSION = 2;
var MARKER = ".second-brain/brain.json";
var markerText = (kind = "person") => `${JSON.stringify({ kind, layout: LAYOUT_VERSION })}
`;
var FOLDERS = [
  { path: "me", holds: "who the person is and how they want work done" },
  { path: "knowledge", holds: "facts about their work, one file per subject" },
  { path: "decisions", holds: "one dated file per decision, with the date it is looked at again" },
  { path: "outputs", holds: "finished work" },
  { path: "projects", holds: "one folder per project, with its plan" }
];
var RECORDS_DIR = ".second-brain/records";
var OWN_SKILLS_DIR = ".claude/skills";
var OWN_SKILLS_LIST = ".second-brain/yours/skills.json";
var TOP_FILES = ["README.md", "AGENTS.md", "CLAUDE.md", "skill-map.md", MARKER, OWN_SKILLS_LIST, "shared-brain.json", "company-setup.json"];
var PLACES = [...FOLDERS.map((f) => `${f.path}/`), `${RECORDS_DIR}/`, `${OWN_SKILLS_DIR}/`, "skills/"];
function brainPath(v) {
  if (typeof v !== "string" || !v || [...v].length > 200 || v.endsWith("/") || v.includes("\\") || v.includes("//")) return null;
  if (v.split("/").some((p) => p === "" || p === "." || p === "..")) return null;
  if (/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/.test(v) || v.isWellFormed && !v.isWellFormed()) return null;
  return TOP_FILES.includes(v) || PLACES.some((p) => v.startsWith(p)) ? v : null;
}

// webcrypto.mjs
var enc = new TextEncoder();
var dec = new TextDecoder();
var subtle = () => globalThis.crypto.subtle;
var base64 = (bytes) => {
  const b = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (let i = 0; i < b.length; i += 32768) s += String.fromCharCode(...b.subarray(i, i + 32768));
  return btoa(s);
};
var b64u = (bytes) => base64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
var fromB64u = (text2) => {
  const s = String(text2).replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(s + "=".repeat((4 - s.length % 4) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};
var fromBase64 = (b64) => dec.decode(fromB64u(b64));
var randomToken = (bytes = 32) => b64u(globalThis.crypto.getRandomValues(new Uint8Array(bytes)));
var typedCode = (groups = 3) => {
  const ABC = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const r = globalThis.crypto.getRandomValues(new Uint8Array(groups * 4));
  return Array.from({ length: groups }, (_, g) => Array.from(r.subarray(g * 4, g * 4 + 4), (x) => ABC[x % ABC.length]).join("")).join("-");
};
async function blobSha(text2) {
  const body = enc.encode(text2);
  const head = enc.encode(`blob ${body.length}\0`);
  const all = new Uint8Array(head.length + body.length);
  all.set(head);
  all.set(body, head.length);
  return [...new Uint8Array(await subtle().digest("SHA-1", all))].map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function sha256(text2) {
  return b64u(await subtle().digest("SHA-256", typeof text2 === "string" ? enc.encode(text2) : text2));
}
function same(a, b) {
  const x = enc.encode(String(a)), y = enc.encode(String(b));
  let d = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) d |= (x[i] || 0) ^ (y[i] || 0);
  return d === 0;
}
var keys = /* @__PURE__ */ new Map();
var hmacKey = (secret) => {
  if (!keys.has(secret)) keys.set(secret, subtle().importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]));
  return keys.get(secret);
};
async function hmac(secret, text2) {
  return b64u(await subtle().sign("HMAC", await hmacKey(secret), enc.encode(text2)));
}
async function sign(secret, claims) {
  const body = b64u(enc.encode(JSON.stringify(claims)));
  return `${body}.${await hmac(secret, body)}`;
}
async function open(secret, token, typ, now = Date.now()) {
  try {
    const [body, sig, extra] = String(token || "").split(".");
    if (!body || !sig || extra !== void 0 || !same(sig, await hmac(secret, body))) return null;
    const claims = JSON.parse(dec.decode(fromB64u(body)));
    return claims && claims.typ === typ && Number.isFinite(claims.exp) && claims.exp > now ? claims : null;
  } catch {
    return null;
  }
}
var sealKey = async (secret) => {
  const base = await subtle().importKey("raw", enc.encode(secret), "HKDF", false, ["deriveKey"]);
  return subtle().deriveKey({ name: "HKDF", hash: "SHA-256", salt: enc.encode("second-brain-connector"), info: enc.encode("seal v1") }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
};
async function seal(secret, text2) {
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  const out = await subtle().encrypt({ name: "AES-GCM", iv }, await sealKey(secret), enc.encode(text2));
  return `v1.${b64u(iv)}.${b64u(out)}`;
}
async function unseal(secret, sealed) {
  const [v, iv, data] = String(sealed || "").split(".");
  if (v !== "v1" || !iv || !data) throw new Error("not a sealed value");
  return dec.decode(await subtle().decrypt({ name: "AES-GCM", iv: fromB64u(iv) }, await sealKey(secret), fromB64u(data)));
}
var der = (pem) => fromB64u(pem.replace(/-----[^-]+-----/g, ""));
var len = (n) => n < 128 ? [n] : n < 256 ? [129, n] : n < 65536 ? [130, n >> 8, n & 255] : [131, n >> 16, n >> 8 & 255, n & 255];
function pkcs1to8(pkcs1) {
  const algo = [48, 13, 6, 9, 42, 134, 72, 134, 247, 13, 1, 1, 1, 5, 0];
  const octet = [4, ...len(pkcs1.length)];
  const inner = [2, 1, 0, ...algo, ...octet];
  const total = inner.length + pkcs1.length;
  const out = new Uint8Array([48, ...len(total), ...inner, ...pkcs1]);
  return out;
}
var rsaKeys = /* @__PURE__ */ new Map();
var rsaKey = (pem) => {
  if (!rsaKeys.has(pem)) {
    const raw = der(pem);
    const pkcs8 = /BEGIN RSA PRIVATE KEY/.test(pem) ? pkcs1to8(raw) : raw;
    rsaKeys.set(pem, subtle().importKey("pkcs8", pkcs8, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]));
  }
  return rsaKeys.get(pem);
};
async function appJwt(pem, appId, now = Date.now()) {
  const head = b64u(enc.encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const iat = Math.floor(now / 1e3) - 60;
  const body = b64u(enc.encode(JSON.stringify({ iat, exp: iat + 540, iss: String(appId) })));
  const sig = await subtle().sign("RSASSA-PKCS1-v1_5", await rsaKey(pem), enc.encode(`${head}.${body}`));
  return `${head}.${body}.${b64u(sig)}`;
}
var edKeys = /* @__PURE__ */ new Map();
async function verifyEd25519(publicKey, text2, signature) {
  try {
    if (!edKeys.has(publicKey)) edKeys.set(publicKey, subtle().importKey("raw", fromB64u(publicKey), { name: "Ed25519" }, false, ["verify"]));
    return await subtle().verify({ name: "Ed25519" }, await edKeys.get(publicKey), fromB64u(signature), typeof text2 === "string" ? enc.encode(text2) : text2);
  } catch {
    return false;
  }
}

// github.mjs
var REPO = /^[A-Za-z0-9_.-]{1,100}$/;
var repoName = (v) => typeof v === "string" && REPO.test(v) && !/^\.+$/.test(v) ? v : null;
var APP_PERMISSIONS = { contents: "write", administration: "write", pull_requests: "write", metadata: "read" };
function appName(company) {
  const c = String(company).trim().replace(/\s+/g, " ");
  const whole = [`Second Brain ${c}`, `${c} Brain`, c].find((n) => n.length <= 34);
  if (whole) return whole;
  const cut = c.slice(0, 35).replace(/\s+\S*$/, "");
  return cut && cut.length <= 34 ? cut : c.slice(0, 34);
}
function manifest({ base, company }) {
  return {
    name: appName(company),
    url: base,
    redirect_url: `${base}/admin/github/back`,
    setup_url: `${base}/admin/github/installed`,
    public: false,
    default_permissions: APP_PERMISSIONS,
    default_events: [],
    hook_attributes: { url: `${base}/admin/github/events`, active: false }
  };
}
var GitHubError = class extends Error {
  constructor(status, message2) {
    super(message2);
    this.status = status;
  }
};
function github({ api = "https://api.github.com", fetchImpl = (...a) => fetch(...a), now = () => Date.now() } = {}) {
  const call = async (method, path, { token, jwt, body } = {}) => {
    const r = await fetchImpl(`${api}${path}`, {
      method,
      headers: { accept: "application/vnd.github+json", "x-github-api-version": "2022-11-28", "user-agent": "second-brain-connector", ...token ? { authorization: `token ${token}` } : jwt ? { authorization: `Bearer ${jwt}` } : {}, ...body ? { "content-type": "application/json" } : {} },
      body: body ? JSON.stringify(body) : void 0,
      signal: AbortSignal.timeout(15e3)
    });
    if (r.status === 204) return null;
    const text2 = await r.text();
    let data = null;
    try {
      data = text2 ? JSON.parse(text2) : null;
    } catch {
      data = null;
    }
    if (!r.ok) throw new GitHubError(r.status, `GitHub answered ${r.status}${data && typeof data.message === "string" ? `: ${data.message.slice(0, 160)}` : ""}`);
    return data;
  };
  async function convert(code) {
    if (!/^[A-Za-z0-9_-]{4,100}$/.test(String(code))) throw new GitHubError(400, "Not a code from GitHub");
    const d = await call("POST", `/app-manifests/${code}/conversions`);
    if (!d || !d.id || !d.pem || !d.slug) throw new GitHubError(502, "GitHub did not give the App's key");
    return { id: d.id, slug: d.slug, pem: d.pem, clientId: d.client_id, clientSecret: d.client_secret, webhookSecret: d.webhook_secret, owner: d.owner && d.owner.login };
  }
  function as(app) {
    const tokens = /* @__PURE__ */ new Map();
    let installationId = app.installationId || null;
    const jwt = () => appJwt(app.pem, app.id, now());
    async function installation() {
      if (installationId) return installationId;
      const list = await call("GET", "/app/installations", { jwt: await jwt() });
      const mine = (list || []).find((i) => i.account && i.account.login && i.account.login.toLowerCase() === String(app.org).toLowerCase());
      if (!mine) throw new GitHubError(404, `The App is not installed on ${app.org} yet`);
      installationId = mine.id;
      return installationId;
    }
    async function token({ repos = [], write = false, admin = false, pulls = false } = {}) {
      const key = JSON.stringify([repos.slice().sort(), write, admin, pulls]);
      const had = tokens.get(key);
      if (had && had.until - now() > 12e4) return had.token;
      const permissions = admin ? { administration: "write", metadata: "read" } : { contents: write ? "write" : "read", metadata: "read", ...pulls ? { pull_requests: write ? "write" : "read" } : {} };
      const d = await call("POST", `/app/installations/${await installation()}/access_tokens`, { jwt: await jwt(), body: { ...repos.length ? { repositories: repos } : {}, permissions } });
      tokens.set(key, { token: d.token, until: Date.parse(d.expires_at) || now() + 3e6 });
      return d.token;
    }
    const at = (repo) => `/repos/${encodeURIComponent(app.org)}/${encodeURIComponent(repo)}`;
    return {
      installation,
      token,
      /** Makes a private repository in the company's organisation, with a first commit. Answers its name. */
      async createRepo(name, description) {
        if (!repoName(name)) throw new GitHubError(400, "Not a repository name");
        const t = await token({ admin: true });
        await call("POST", `/orgs/${encodeURIComponent(app.org)}/repos`, { token: t, body: { name, description: String(description || "").slice(0, 300), private: true, auto_init: true, has_issues: false, has_projects: false, has_wiki: false } });
        return name;
      },
      async exists(repo) {
        try {
          await call("GET", at(repo), { token: await token({ repos: [repo] }) });
          return true;
        } catch (e) {
          if (e.status === 404) return false;
          throw e;
        }
      },
      /** The commit the default branch is on, and its tree. */
      async head(repo) {
        const t = await token({ repos: [repo] });
        const r = await call("GET", at(repo), { token: t });
        const ref = await call("GET", `${at(repo)}/git/ref/heads/${encodeURIComponent(r.default_branch)}`, { token: t });
        const commit = await call("GET", `${at(repo)}/git/commits/${ref.object.sha}`, { token: t });
        return { branch: r.default_branch, commit: ref.object.sha, tree: commit.tree.sha };
      },
      /** Every file's path, size and blob id. */
      async files(repo) {
        const h = await this.head(repo);
        const d = await call("GET", `${at(repo)}/git/trees/${h.tree}?recursive=1`, { token: await token({ repos: [repo] }) });
        return { commit: h.commit, files: (d.tree || []).filter((x) => x.type === "blob").map((x) => ({ path: x.path, size: x.size, sha: x.sha })), truncated: !!d.truncated };
      },
      /** One file's text and blob id, or null. */
      async read(repo, path) {
        try {
          const d = await call("GET", `${at(repo)}/contents/${path.split("/").map(encodeURIComponent).join("/")}`, { token: await token({ repos: [repo] }) });
          if (!d || Array.isArray(d) || d.type !== "file") return null;
          return { text: fromBase64(d.content || ""), sha: d.sha, size: d.size };
        } catch (e) {
          if (e.status === 404) return null;
          throw e;
        }
      },
      /**
       * Saves several files as one commit: text for a file to write, null for one to delete. With base, the commit is
       * made only if the branch is still there; otherwise GitHub refuses (409/422) and nothing is changed.
       */
      // inline: each file's text goes in the tree itself, so many files cost the same few calls (a host such as
      // Cloudflare's free plan allows 50 calls out per request).
      async commit(repo, changes, message2, { base, inline = false } = {}) {
        const t = await token({ repos: [repo], write: true });
        const h = await this.head(repo);
        if (base && base !== h.commit) throw new GitHubError(409, "The Brain changed since it was read");
        const tree = [];
        for (const c of changes) {
          if (c.text === null) tree.push({ path: c.path, mode: "100644", type: "blob", sha: null });
          else if (inline) tree.push({ path: c.path, mode: "100644", type: "blob", content: c.text });
          else {
            const blob = await call("POST", `${at(repo)}/git/blobs`, { token: t, body: { content: c.text, encoding: "utf-8" } });
            tree.push({ path: c.path, mode: "100644", type: "blob", sha: blob.sha });
          }
        }
        const newTree = await call("POST", `${at(repo)}/git/trees`, { token: t, body: { base_tree: h.tree, tree } });
        const commit = await call("POST", `${at(repo)}/git/commits`, { token: t, body: { message: String(message2).slice(0, 200), tree: newTree.sha, parents: [h.commit] } });
        await call("PATCH", `${at(repo)}/git/refs/heads/${encodeURIComponent(h.branch)}`, { token: t, body: { sha: commit.sha, force: false } });
        return { commit: commit.sha };
      },
      /**
       * A suggestion to the company Brain: the changes on a branch of their own, and a pull request the owner or an
       * admin approves on the admin page. Answers its number.
       */
      async suggest(repo, changes, { title, body, branch }) {
        const t = await token({ repos: [repo], write: true, pulls: true });
        const h = await this.head(repo);
        await call("POST", `${at(repo)}/git/refs`, { token: t, body: { ref: `refs/heads/${branch}`, sha: h.commit } });
        const tree = [];
        for (const c of changes) {
          if (c.text === null) tree.push({ path: c.path, mode: "100644", type: "blob", sha: null });
          else {
            const blob = await call("POST", `${at(repo)}/git/blobs`, { token: t, body: { content: c.text, encoding: "utf-8" } });
            tree.push({ path: c.path, mode: "100644", type: "blob", sha: blob.sha });
          }
        }
        const newTree = await call("POST", `${at(repo)}/git/trees`, { token: t, body: { base_tree: h.tree, tree } });
        const commit = await call("POST", `${at(repo)}/git/commits`, { token: t, body: { message: String(title).slice(0, 200), tree: newTree.sha, parents: [h.commit] } });
        await call("PATCH", `${at(repo)}/git/refs/heads/${encodeURIComponent(branch)}`, { token: t, body: { sha: commit.sha, force: false } });
        const pr = await call("POST", `${at(repo)}/pulls`, { token: t, body: { title: String(title).slice(0, 200), body: String(body || "").slice(0, 4e3), head: branch, base: h.branch } });
        return { number: pr.number };
      },
      /** The open suggestions: number, title, branch and when. */
      async suggestions(repo) {
        const d = await call("GET", `${at(repo)}/pulls?state=open&per_page=50`, { token: await token({ repos: [repo], pulls: true }) });
        return (d || []).map((x) => ({ number: x.number, title: String(x.title).slice(0, 200), branch: x.head && x.head.ref, at: x.created_at, body: String(x.body || "").slice(0, 1e3) }));
      },
      /** The files a suggestion changes, by name. */
      async suggestionFiles(repo, number) {
        const d = await call("GET", `${at(repo)}/pulls/${Number(number)}/files?per_page=100`, { token: await token({ repos: [repo], pulls: true }) });
        return (d || []).map((f) => ({ path: f.filename, status: f.status, additions: f.additions, deletions: f.deletions }));
      },
      async approve(repo, number) {
        await call("PUT", `${at(repo)}/pulls/${Number(number)}/merge`, { token: await token({ repos: [repo], write: true, pulls: true }), body: { merge_method: "squash" } });
      },
      async decline(repo, number) {
        await call("PATCH", `${at(repo)}/pulls/${Number(number)}`, { token: await token({ repos: [repo], write: true, pulls: true }), body: { state: "closed" } });
      },
      /** Puts the files back as they were at an earlier commit, as a new commit on top (nothing is rewritten). */
      async restoreTree(repo, commitSha, message2) {
        const t = await token({ repos: [repo], write: true });
        const h = await this.head(repo);
        const old = await call("GET", `${at(repo)}/git/commits/${encodeURIComponent(commitSha)}`, { token: t });
        const commit = await call("POST", `${at(repo)}/git/commits`, { token: t, body: { message: String(message2).slice(0, 200), tree: old.tree.sha, parents: [h.commit] } });
        await call("PATCH", `${at(repo)}/git/refs/heads/${encodeURIComponent(h.branch)}`, { token: t, body: { sha: commit.sha, force: false } });
        return { commit: commit.sha };
      },
      /** The last commits that touched the Brain, newest first: when, and the message. */
      async history(repo, n = 20) {
        const d = await call("GET", `${at(repo)}/commits?per_page=${Math.min(100, n)}`, { token: await token({ repos: [repo] }) });
        return (d || []).map((c) => ({ commit: c.sha, at: c.commit && c.commit.committer && c.commit.committer.date, message: c.commit && String(c.commit.message).split("\n")[0].slice(0, 120) }));
      }
    };
  }
  return { convert, as };
}

// brain.mjs
var MOST_FILE = 400 * 1024;
var MOST_FILES = 50;
var personReadme = (name) => `# ${name}'s Brain

Everything ${name}'s AI should know and remember: who they are, how they work, their decisions, their projects and their finished work.

Kept by the Second Brain on your company's connector. Each folder says what it holds.
`;
function personStart(name) {
  return [
    { path: MARKER, text: markerText("person") },
    { path: "README.md", text: personReadme(name) },
    ...FOLDERS.map((f) => ({ path: `${f.path}/README.md`, text: `# ${f.path}

Holds ${f.holds}.
` }))
  ];
}
function companyFiles(start, company, brainName = "") {
  const name = String(company || "").trim() || "Your company";
  const values = { NAME: String(brainName || "").trim() || `${name} shared brain`, ORGANISATION: name, CLIENT_ID: "", CURATOR_LOGIN: "", CURATOR_NAME: `${name}'s owner or an admin` };
  const fill = (text2, json) => text2.replace(/\{\{([A-Z_]+)\}\}/g, (all, key) => key in values ? json ? JSON.stringify(values[key]).slice(1, -1) : values[key] : all);
  return start.map((f) => ({ path: f.path, text: fill(f.text, f.path.endsWith(".json")) }));
}
function brains({ gh, settings }) {
  const repoOf = (person, which) => which === "company" ? settings.companyRepo : person.repo;
  async function ensurePerson(person, made2 = async () => {
  }) {
    if (!person.repo) throw new GitHubError(400, "This person has no Brain repository named");
    const there = await gh.exists(person.repo);
    if (there && !person.repoMade) throw new GitHubError(409, `A repository named ${person.repo} is already in your organisation, made by someone else, so it was not used`);
    if (!there) {
      await gh.createRepo(person.repo, `${person.name}'s Second Brain`);
      person.repoMade = true;
      await made2();
    }
    if (!there || !(await gh.files(person.repo)).files.some((f) => f.path === MARKER)) await gh.commit(person.repo, personStart(person.name), "Start the Brain");
    return person.repo;
  }
  async function ensureCompany(start) {
    const repo = settings.companyRepo;
    if (!await gh.exists(repo)) {
      await gh.createRepo(repo, `${settings.company}: the company's shared Brain`);
      await gh.commit(repo, [{ path: MARKER, text: markerText("company") }, ...companyFiles(start, settings.company)], "Start the company Brain");
    }
    return repo;
  }
  async function list(person, which = "mine") {
    const repo = repoOf(person, which);
    const { commit, files, truncated } = await gh.files(repo);
    return { which, commit, truncated, files: files.filter((f) => brainPath(f.path)).map((f) => ({ path: f.path, size: f.size, sha: f.sha })) };
  }
  async function read(person, path, which = "mine") {
    const p = brainPath(path);
    if (!p) return { problem: "That is not a place in a Brain." };
    const f = await gh.read(repoOf(person, which), p);
    if (!f) return { problem: "No such file.", missing: true };
    if (f.size > MOST_FILE) return { problem: "That file is too large to read here." };
    return { which, path: p, text: f.text, sha: f.sha };
  }
  async function save(person, changes, message2, base) {
    if (!Array.isArray(changes) || !changes.length) return { problem: "Name at least one file to save." };
    if (changes.length > MOST_FILES) return { problem: `Save at most ${MOST_FILES} files at once.` };
    const out = [];
    for (const c of changes) {
      const p = brainPath(c && c.path);
      if (!p) return { problem: `${String(c && c.path).slice(0, 80)} is not a place in a Brain.` };
      if (c.text !== null && typeof c.text !== "string") return { problem: `Give ${p} its text, or null to delete it.` };
      if (typeof c.text === "string" && new TextEncoder().encode(c.text).length > MOST_FILE) return { problem: `${p} is too large.` };
      out.push({ path: p, text: c.text });
    }
    try {
      const r = await gh.commit(person.repo, out, String(message2 || "Save from Second Brain").slice(0, 200), { base });
      return { saved: out.map((c) => c.path), commit: r.commit };
    } catch (e) {
      if (e.status === 409 || e.status === 422) return { conflict: true, problem: "The Brain changed since it was read. Read it again, then save." };
      throw e;
    }
  }
  return { ensurePerson, ensureCompany, list, read, save, repoOf };
}

// ../brain/company-setup.mjs
var COMPANY_SETUP_FILE = "company-setup.json";
var COMPANY_SETUP_SCHEMA = "company-setup/1";
var COMPANY_SETUP_MOST = 380 * 1024;
var COMPANY_LOGO_MOST = 200 * 1024;
var LOGO_MOST = COMPANY_LOGO_MOST;
var HEX = /^#[0-9a-f]{6}$/i;
var EMAIL = /^[^\s@]{1,100}@[^\s@]+\.[^\s@]{1,100}$/;
var LOGO = /^data:image\/(?:png|jpeg|svg\+xml);base64,[A-Za-z0-9+/]+=*$/;
var plain = (v) => !!v && typeof v === "object" && !Array.isArray(v);
var text = (v, n) => typeof v === "string" ? v.trim().slice(0, n) : "";
var lines = (v, most, n) => (Array.isArray(v) ? v : []).map((x) => text(x, n)).filter(Boolean).slice(0, most);
var listOfText = (v) => Array.isArray(v) && v.every((x) => typeof x === "string");
var sizeOf = (v) => {
  try {
    return JSON.stringify(v).length;
  } catch {
    return Infinity;
  }
};
var writtenSize = (v) => {
  try {
    return `${JSON.stringify(v, null, 2)}
`.length;
  } catch {
    return Infinity;
  }
};
var BREAK = /[\u0000-\u001f\u007f\u2028\u2029]/;
var oneLine = (v) => typeof v !== "string" || !BREAK.test(v);
function companySetupProblems(v) {
  if (!plain(v)) return ["It is not a company setup file."];
  const out = [];
  if (v.schema !== COMPANY_SETUP_SCHEMA) out.push(`"schema" must be "${COMPANY_SETUP_SCHEMA}"`);
  const c = v.company;
  if (!plain(c) || !text(c.name, 120)) out.push('"company.name" is missing');
  else {
    if (c.colour !== void 0 && c.colour !== "" && c.colour !== null && !(typeof c.colour === "string" && HEX.test(c.colour.trim()))) out.push('"company.colour" must be a colour such as #2470cf');
    if (c.logoData !== void 0 && c.logoData !== "" && c.logoData !== null) {
      if (typeof c.logoData !== "string" || !LOGO.test(c.logoData)) out.push('"company.logoData" must be a PNG, JPEG or SVG picture as a data address');
      else if (c.logoData.length > LOGO_MOST) out.push(`"company.logoData" is larger than ${LOGO_MOST / 1024} KB`);
    }
    for (const k of ["name", "shortName", "brainName", "colour", "workFocus"]) if (!oneLine(c[k])) out.push(`"company.${k}" must be one line`);
    for (const k of ["apps", "neverInAi"]) {
      if (c[k] !== void 0 && !listOfText(c[k])) out.push(`"company.${k}" must be a list of plain lines`);
      else if (c[k] !== void 0 && !c[k].every(oneLine)) out.push(`"company.${k}" must hold one line for each item`);
    }
    if (c.recipes !== void 0 && c.recipes !== null && !plain(c.recipes)) out.push('"company.recipes" must be an object');
    else if (sizeOf(c.recipes || {}) > 2e4) out.push('"company.recipes" is too long');
    else for (const [k, x] of Object.entries(c.recipes || {})) if (!oneLine(x)) out.push(`"company.recipes.${k}" must be one line`);
  }
  if (v.prepared !== void 0 && v.prepared !== null) {
    if (!plain(v.prepared)) out.push('"prepared" must be an object');
    else if (v.prepared.people !== void 0) {
      const people = v.prepared.people;
      if (!Array.isArray(people) || people.length > 300) out.push('"prepared.people" must be a list of at most 300 people');
      else {
        const ids = /* @__PURE__ */ new Set();
        const emails = /* @__PURE__ */ new Set();
        people.forEach((p, i) => {
          if (!plain(p) || !text(p.id, 80) || !text(p.firstName, 80)) return out.push(`"prepared.people[${i}]" needs an "id" and a "firstName"`);
          if (ids.has(p.id)) out.push(`"prepared.people[${i}].id" is used twice`);
          ids.add(p.id);
          if (p.email === void 0) return;
          if (!EMAIL.test(p.email)) return out.push(`"prepared.people[${i}].email" must be an email address`);
          if (emails.has(p.email.toLowerCase())) out.push(`"prepared.people[${i}].email" is used twice`);
          emails.add(p.email.toLowerCase());
        });
      }
    }
  }
  if (Math.max(writtenSize(v), out.length ? 0 : writtenSize(cleaned(v))) > COMPANY_SETUP_MOST) out.push(`It is larger than ${COMPANY_SETUP_MOST / 1024} KB. A smaller logo usually fixes that.`);
  return out;
}
function readCompanySetup(source) {
  let v = source;
  if (typeof source === "string") {
    if (source.length > COMPANY_SETUP_MOST) return null;
    try {
      v = JSON.parse(source);
    } catch {
      return null;
    }
  }
  if (companySetupProblems(v).length) return null;
  return cleaned(v);
}
function companySetupJoined(given, was) {
  const g = readCompanySetup(given);
  const w = readCompanySetup(was);
  if (!g || !w) return g;
  const filled = (v) => Array.isArray(v) ? v.length > 0 : plain(v) ? Object.keys(v).length > 0 : typeof v === "string" ? v.trim() !== "" : v !== null && v !== void 0;
  const company = { ...w.company };
  for (const [k, v] of Object.entries(g.company)) if (filled(v)) company[k] = v;
  return readCompanySetup({ schema: COMPANY_SETUP_SCHEMA, company, prepared: g.prepared || w.prepared });
}
function cleaned(v) {
  const c = v.company;
  const name = text(c.name, 120);
  return {
    schema: COMPANY_SETUP_SCHEMA,
    company: {
      id: text(c.id, 60),
      name,
      shortName: text(c.shortName, 60) || name,
      brainName: text(c.brainName, 60),
      colour: typeof c.colour === "string" && HEX.test(c.colour.trim()) ? c.colour.trim() : "",
      logoData: typeof c.logoData === "string" && LOGO.test(c.logoData) ? c.logoData : "",
      workFocus: text(c.workFocus, 300),
      apps: lines(c.apps, 24, 60),
      neverInAi: lines(c.neverInAi, 12, 200),
      recipes: plain(c.recipes) ? c.recipes : {}
    },
    prepared: plain(v.prepared) ? v.prepared : null
  };
}
var plainName = (s) => String(s || "").normalize("NFD").replace(/\p{M}/gu, "").replace(/ł/gi, "l").toLowerCase().trim();
var firstWord = (s) => plainName(s).split(/\s+/)[0];
function preparedPerson(setup, member, others = []) {
  const people = Array.isArray(setup?.prepared?.people) ? setup.prepared.people : [];
  const email = String(member?.email || "").trim().toLowerCase();
  const byEmail = email ? people.find((p) => typeof p.email === "string" && p.email.toLowerCase() === email) : null;
  if (byEmail) return byEmail;
  const said = firstWord(member?.name);
  if (!said || others.some((n) => firstWord(n) === said)) return null;
  const hits = people.filter((p) => plainName(p.firstName) === said);
  return hits.length === 1 && hits[0].email === void 0 ? hits[0] : null;
}
function setupFor(setup, me) {
  return setup.prepared ? { ...setup, prepared: { ...setup.prepared, people: me ? [me] : [] } } : setup;
}

// envelope.mjs
var enc2 = new TextEncoder();
var dec2 = new TextDecoder();
var MAX = 256 * 1024;
var signedText = (keyId, payload) => `brain-envelope/1
${keyId}
${payload}`;
function envelopeOf(v) {
  if (v && typeof v === "object" && !Array.isArray(v)) return Object.keys(v).sort().join(",") === "keyId,payload,signature" && ["keyId", "payload", "signature"].every((k) => typeof v[k] === "string") ? v : null;
  const parts = String(v || "").replace(/\s+/g, "").split(".");
  if (parts.length !== 3 || !/^[a-z0-9][a-z0-9-]{2,40}$/.test(parts[0]) || !parts[1] || !parts[2]) return null;
  return { keyId: parts[0], payload: parts[1], signature: parts[2] };
}
var envelopeText = (e) => `${e.keyId}.${e.payload}.${e.signature}`;
async function openEnvelope(v, keys2, now = Date.now()) {
  const e = envelopeOf(v);
  if (!e) return null;
  const key = (keys2 || []).find((k) => k.keyId === e.keyId && (!k.from || Date.parse(k.from) <= now) && (!k.until || now < Date.parse(k.until)));
  if (!key || e.payload.length > MAX * 4 / 3 + 4) return null;
  if (!await verifyEd25519(key.publicKey, signedText(e.keyId, e.payload), e.signature)) return null;
  try {
    return JSON.parse(dec2.decode(fromB64u(e.payload)));
  } catch {
    return null;
  }
}
function keysOf(v) {
  let list = v;
  if (typeof v === "string") {
    try {
      list = JSON.parse(v);
    } catch {
      list = [];
    }
  }
  return (Array.isArray(list) ? list : []).filter((k) => k && /^[a-z0-9][a-z0-9-]{2,40}$/.test(String(k.keyId)) && /^[A-Za-z0-9+/_-]{43}=?$/.test(String(k.publicKey))).map((k) => ({ keyId: k.keyId, publicKey: k.publicKey, ...k.from ? { from: k.from } : {}, ...k.until ? { until: k.until } : {} }));
}

// licence.mjs
var KIND = { licence: "company-licence", withdrawal: "company-licence-withdrawal" };
var FLAVORS = ["local-first", "cloud-first"];
var dateOnly = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(`${v}T00:00:00Z`));
function contract(o) {
  if (!o || typeof o !== "object") return { problem: "not a licence" };
  if (o.kind !== KIND.licence) return { problem: "not a company licence" };
  if (o.v !== 1) return { problem: "a licence of another version" };
  if (typeof o.id !== "string" || !/^[A-Za-z0-9_-]{6,80}$/.test(o.id)) return { problem: "no licence id" };
  if (!o.company || typeof o.company.name !== "string" || !o.company.name.trim()) return { problem: "no company name" };
  if (!Number.isInteger(o.seats) || o.seats < 1 || o.seats > 1e5) return { problem: "no number of seats" };
  if (typeof o.ownerSeat !== "boolean") return { problem: "does not say whether the owner takes a seat" };
  if (!["base", "full"].includes(o.plan)) return { problem: "no plan" };
  if (!Array.isArray(o.flavors) || !o.flavors.length || o.flavors.some((f) => !FLAVORS.includes(f))) return { problem: "no way of working" };
  if (!dateOnly(o.updatesUntil)) return { problem: "no date updates end" };
  if (!Number.isFinite(Date.parse(o.issued))) return { problem: "no date it was issued" };
  return {
    licence: {
      v: 1,
      id: o.id,
      company: { name: o.company.name.trim().slice(0, 120) },
      seats: o.seats,
      ownerSeat: o.ownerSeat,
      plan: o.plan,
      features: Array.isArray(o.features) ? o.features.filter((f) => typeof f === "string" && /^[a-z0-9-]{1,40}$/.test(f)) : [],
      flavors: [...new Set(o.flavors)],
      updatesUntil: o.updatesUntil,
      issued: new Date(o.issued).toISOString()
    }
  };
}
async function readLicence(v, keys2, now = Date.now()) {
  const o = await openEnvelope(v, keys2, now);
  if (!o) return { problem: "This is not a licence signed by Second Brain. Copy it again from your purchase email." };
  const c = contract(o);
  return c.problem ? { problem: `This licence is not complete: ${c.problem}.` } : { licence: c.licence, text: envelopeText(envelopeOf(v)) };
}
async function readWithdrawal(v, keys2, now = Date.now()) {
  const o = await openEnvelope(v, keys2, now);
  return o && o.kind === KIND.withdrawal && o.v === 1 && typeof o.id === "string" && Number.isFinite(Date.parse(o.at)) ? { id: o.id, reason: String(o.reason || "").slice(0, 200), at: new Date(o.at).toISOString() } : null;
}
var sameTerms = (a, b) => JSON.stringify({ ...a, issued: null }) === JSON.stringify({ ...b, issued: null });
var updatesCover = (licence, released) => !!licence && dateOnly(String(released).slice(0, 10)) && String(released).slice(0, 10) <= licence.updatesUntil;
var seatsTaken = (licence, people) => people.filter((p) => ["invited", "active"].includes(p.status) && (licence.ownerSeat || p.role !== "owner")).length;
async function refresh({ current, currentText, factoryUrl, connectorVersion, keys: keys2, fetchImpl = fetch, now = Date.now() }) {
  if (!current || !currentText || !factoryUrl) return { same: true };
  let r;
  try {
    r = await fetchImpl(`${factoryUrl}/api/brain/company-licence`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ licence: currentText, connector_version: connectorVersion }), signal: AbortSignal.timeout(8e3) });
  } catch {
    return { unreachable: true };
  }
  if (r.status >= 500 || r.status === 429) return { unreachable: true };
  if (!r.ok) return { same: true };
  let body;
  try {
    body = await r.json();
  } catch {
    return { unreachable: true };
  }
  if (body && body.withdrawal) {
    const w = await readWithdrawal(body.withdrawal, keys2, now);
    return w && w.id === current.id && w.at > current.issued ? { withdrawn: w } : { same: true };
  }
  if (body && body.licence) {
    const n = await readLicence(body.licence, keys2, now);
    if (n.licence && n.licence.id === current.id && n.licence.issued > current.issued) return { licence: n.licence, text: n.text };
  }
  return { same: true };
}

// pages.mjs
var esc = (v) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
var CSS = `
:root{--ink:#141414;--muted:#5b554b;--paper:#fff;--panel:#f3f0ed;--line:#d9d3cc;--accent:#1f63b8;--ok:#1d6b3a;--ok-bg:#e3f1e7;--warn:#7a2e12;--warn-bg:#fbe8df;color-scheme:light dark}
@media (prefers-color-scheme:dark){:root{--ink:#f2efe9;--muted:#b7afa3;--paper:#121212;--panel:#1d1c1b;--line:#3a3733;--accent:#7fb0ef;--ok:#9fd8b0;--ok-bg:#183222;--warn:#ffc2a6;--warn-bg:#3a2016}}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased}
header{display:flex;align-items:center;gap:14px;max-width:960px;margin:0 auto;padding:20px 16px;flex-wrap:wrap}
.brand{font:700 15px ui-monospace,Menlo,Consolas,monospace;letter-spacing:.04em;text-transform:uppercase}
.rule{width:1px;height:20px;background:var(--ink)}
.prod{font:12px ui-monospace,Menlo,Consolas,monospace;letter-spacing:.08em;color:var(--muted)}
main{max-width:960px;margin:0 auto;padding:8px 16px 64px}
.narrow{max-width:480px;margin:6vh auto 0}
h1{font-size:30px;line-height:1.1;letter-spacing:-.01em;margin:0 0 10px}
h2{font-size:19px;margin:34px 0 10px}
p{margin:0 0 14px}.muted{color:var(--muted)}
.panel{background:var(--panel);padding:22px 20px;margin:0 0 16px}
label{display:block;font-weight:700;font-size:14px;margin:0 0 6px}
input,select,textarea{display:block;width:100%;margin:0 0 14px;padding:12px;border:1px solid var(--line);background:var(--paper);color:var(--ink);font:inherit;border-radius:0}
textarea{min-height:120px;font:13px ui-monospace,Menlo,Consolas,monospace}
input:focus,select:focus,textarea:focus{outline:2px solid var(--accent);outline-offset:0}
button,.button{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 18px;border:0;background:var(--ink);color:var(--paper);font:700 15px inherit;font-family:inherit;cursor:pointer;text-decoration:none;border-radius:0}
button.quiet,.button.quiet{background:transparent;color:var(--ink);border:1px solid var(--line)}
button.danger{background:transparent;color:var(--warn);border:1px solid var(--warn)}
.row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.row select{width:auto;margin:0}
label.check{display:flex;gap:10px;align-items:center;font-weight:400;margin:0 0 14px}label.check input{width:auto;margin:0}
.msg{padding:12px 14px;margin:0 0 16px}.msg.ok{background:var(--ok-bg);color:var(--ok)}.msg.err{background:var(--warn-bg);color:var(--warn)}
ol.steps{padding-left:22px;margin:0 0 14px}ol.steps li{margin:0 0 10px}
.copy{display:flex;gap:8px;align-items:stretch}.copy input{margin:0;font:14px ui-monospace,Menlo,Consolas,monospace}.copy textarea{margin:0}
table{width:100%;border-collapse:collapse;margin:0 0 14px}th,td{text-align:left;padding:10px 8px;border-bottom:1px solid var(--line);vertical-align:top;font-size:15px}
th{font-size:13px;color:var(--muted);font-weight:600}
.tag{display:inline-block;padding:2px 8px;font-size:12px;border:1px solid var(--line)}
.state{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;margin:0 0 14px}.state b{font-weight:700}
.dot{display:inline-block;width:9px;height:9px;margin-right:6px;background:var(--ok)}.dot.no{background:var(--warn)}
code{font:13px ui-monospace,Menlo,Consolas,monospace;word-break:break-all}
@media (max-width:620px){h1{font-size:25px}table thead{display:none}table,tbody,tr,td{display:block;width:100%}tr{border-bottom:1px solid var(--line);padding:8px 0}td{border:0;padding:3px 0}}
`;
function layout({ company, title, body, narrow = false }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)}</title><style>${CSS}</style></head><body><header>${company ? `<span class="brand">${esc(company)}</span><span class="rule"></span><span class="prod">SECOND BRAIN</span>` : '<span class="brand">Second Brain</span>'}</header><main${narrow ? ' class="narrow"' : ""}>${body}</main></body></html>`;
}
var message = (m) => m ? `<p class="msg ${m.ok ? "ok" : "err"}" role="${m.ok ? "status" : "alert"}">${esc(m.text)}</p>` : "";
var hidden = (fields) => Object.entries(fields).map(([k, v]) => `<input type="hidden" name="${esc(k)}" value="${esc(v)}">`).join("");
var copyField = (id, value) => `<div class="copy"><input id="${esc(id)}" readonly value="${esc(value)}"></div>`;
var copyText = (id, value) => `<div class="copy"><textarea id="${esc(id)}" readonly rows="${String(value).split("\n").length + 4}">${esc(value)}</textarea></div>`;

// workspace.mjs
var ROLES = ["owner", "admin", "member"];
var STATUSES = ["invited", "active", "removed"];
var DAY = 864e5;
var LIMITS = { invite: 14 * DAY, browser: 30 * DAY, refresh: 60 * DAY, access: 10 * 6e4, code: 5 * 6e4, signin: 15 * 6e4 };
var clean = (v, n) => typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g, " ").replace(/\s+/g, " ").trim().slice(0, n) : "";
var emailOf = (v) => {
  const e = clean(v, 200).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? e : null;
};
var slugOf = (v) => clean(v, 60).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "person";
function workspace(store, { now = () => Date.now() } = {}) {
  const key = (kind, id) => `${kind}:${id}`;
  const hashed = async (token) => sha256(`token ${token}`);
  async function people() {
    return (await store.list("person:")).map((r) => r.value);
  }
  async function person(id) {
    return typeof id === "string" && /^[a-z0-9-]{1,60}$/.test(id) ? store.get(key("person", id)) : null;
  }
  async function byEmail(email) {
    const e = emailOf(email);
    return e ? (await people()).find((p) => p.email === e && p.status !== "removed") || null : null;
  }
  async function current(id, epoch) {
    const p = await person(id);
    return p && p.status === "active" && (epoch === void 0 || p.epoch === epoch) ? p : null;
  }
  async function audit(by, what, about = null) {
    await store.put(key("audit", `${new Date(now()).toISOString()}-${randomToken(4)}`), { at: new Date(now()).toISOString(), by: by || null, what, about });
  }
  async function add({ name, email, role = "member", flavor, by, licence, repo, status = "invited", shown = true }) {
    const n = clean(name, 80), e = emailOf(email);
    if (!n) return { problem: "Type their name." };
    if (!e) return { problem: "Type an email address." };
    if (!ROLES.includes(role)) return { problem: "Pick a role." };
    if (!licence) return { problem: "Paste the company licence first." };
    if (!licence.flavors.includes(flavor)) return { problem: `The licence does not include ${flavor}.` };
    if (await byEmail(e)) return { problem: `${e} is already in the workspace.` };
    const all = await people();
    if (role === "owner" && all.some((p2) => p2.role === "owner" && p2.status !== "removed")) return { problem: "The workspace has an owner." };
    const counts = role !== "owner" || licence.ownerSeat;
    if (counts && seatsTaken(licence, all) >= licence.seats) return { problem: `All ${licence.seats} seats are taken. Remove someone, or buy more seats.`, full: true };
    let id = slugOf(n), i = 1;
    while (all.some((p2) => p2.id === id)) id = `${slugOf(n)}-${++i}`;
    const p = { id, name: n, email: e, role, flavor, status, repo: repo || null, epoch: 1, created: new Date(now()).toISOString(), joined: status === "active" ? new Date(now()).toISOString() : null, removed: null, by: by || null };
    await store.put(key("person", id), p);
    await audit(by, `added ${role}`, id);
    return { person: p, invite: status === "invited" ? await invite(p.id, { shown }) : null };
  }
  async function invite(id, { shown = true } = {}) {
    const p = await person(id);
    if (!p || p.status === "removed") return null;
    for (const r of await store.list("invite:")) if (r.value.person === id) await store.del(r.key);
    const token = randomToken();
    await store.put(key("invite", await hashed(token)), { person: id, shown, exp: now() + LIMITS.invite });
    return token;
  }
  async function redeem(token, kind = "invite") {
    if (typeof token !== "string" || token.length < 20 || token.length > 100) return null;
    const r = await store.take(key(kind, await hashed(token)));
    if (!r || r.exp <= now()) return null;
    const p = await person(r.person);
    if (!p || p.status === "removed") return null;
    if (p.status === "invited") {
      p.status = "active";
      p.joined = new Date(now()).toISOString();
      if (r.shown) p.unconfirmed = true;
      await store.put(key("person", p.id), p);
      await audit(p.id, "joined", p.id);
    }
    return p;
  }
  async function confirm(p) {
    if (!p.unconfirmed) return p;
    p.unconfirmed = false;
    p.epoch += 1;
    await store.put(key("person", p.id), p);
    for (const kind of ["browser:", "refresh:"]) for (const r of await store.list(kind)) if (r.value.person === p.id) await store.del(r.key);
    await audit(p.id, "confirmed by email: earlier sign-ins ended", p.id);
    return p;
  }
  async function signInLink(id) {
    const p = await person(id);
    if (!p || p.status !== "active") return null;
    const token = randomToken();
    await store.put(key("signin", await hashed(token)), { person: id, exp: now() + LIMITS.signin });
    return token;
  }
  async function remove(id, by) {
    const p = await person(id);
    if (!p || p.status === "removed") return { problem: "Not in the workspace." };
    if (p.role === "owner") return { problem: "The owner cannot be removed. Make someone else the owner first." };
    p.status = "removed";
    p.removed = new Date(now()).toISOString();
    p.epoch += 1;
    await store.put(key("person", id), p);
    for (const kind of ["invite:", "signin:", "browser:", "refresh:", "draft:"]) for (const r of await store.list(kind)) if (r.value.person === id) await store.del(r.key);
    await audit(by, "removed", id);
    return { person: p };
  }
  async function change(id, fields, by) {
    const p = await person(id);
    if (!p || p.status === "removed") return { problem: "Not in the workspace." };
    if (fields.role !== void 0) {
      if (!ROLES.includes(fields.role) || fields.role === "owner" || p.role === "owner") return { problem: "That role cannot be given here." };
      p.role = fields.role;
    }
    if (fields.flavor !== void 0) {
      if (!FLAVORS.includes(fields.flavor)) return { problem: "Pick a way of working." };
      p.flavor = fields.flavor;
    }
    await store.put(key("person", id), p);
    await audit(by, `changed ${Object.keys(fields).join(" and ")}`, id);
    return { person: p };
  }
  async function handOver(fromId, toId, { leave = false } = {}) {
    const from = await person(fromId), to = await person(toId);
    if (!from || from.role !== "owner" || from.status !== "active") return { problem: "Only the owner can hand the workspace over." };
    if (!to || to.id === from.id || to.status !== "active") return { problem: "Pick someone who has joined the workspace." };
    if (to.unconfirmed) return { problem: `${to.name} has not signed in with their email yet. Press Email a sign-in link next to their name, and hand it over once they have used it.` };
    to.role = "owner";
    from.role = "admin";
    await store.put(key("person", to.id), to);
    await store.put(key("person", from.id), from);
    await audit(from.id, "handed ownership over", to.id);
    if (leave) await remove(from.id, from.id);
    return { person: to };
  }
  async function update(p) {
    await store.put(key("person", p.id), p);
  }
  async function newBrowser(p) {
    const token = randomToken();
    await store.put(key("browser", await hashed(token)), { person: p.id, epoch: p.epoch, exp: now() + LIMITS.browser });
    return token;
  }
  async function browser(token) {
    if (typeof token !== "string" || token.length < 20 || token.length > 100) return null;
    const s = await store.get(key("browser", await hashed(token)));
    return s && s.exp > now() ? current(s.person, s.epoch) : null;
  }
  async function endBrowser(token) {
    if (typeof token === "string") await store.del(key("browser", await hashed(token)));
  }
  async function newRefresh(p, client, family = randomToken(9)) {
    const token = randomToken();
    await store.put(key("refresh", await hashed(token)), { person: p.id, epoch: p.epoch, client, family, exp: now() + LIMITS.refresh });
    return token;
  }
  async function useRefresh(token, client) {
    if (typeof token !== "string" || token.length < 20 || token.length > 100) return { problem: "invalid_grant" };
    const h = await hashed(token);
    const r = await store.take(key("refresh", h));
    if (!r) {
      const spent = await store.get(key("spent", h));
      if (spent) {
        for (const x of await store.list("refresh:")) if (x.value.family === spent.family) await store.del(x.key);
      }
      return { problem: "invalid_grant" };
    }
    await store.put(key("spent", h), { family: r.family, exp: r.exp });
    if (r.exp <= now() || r.client !== client) return { problem: "invalid_grant" };
    const p = await current(r.person, r.epoch);
    if (!p) return { problem: "invalid_grant" };
    return { person: p, refresh: await newRefresh(p, client, r.family) };
  }
  async function signOutAll(id, by) {
    const p = await person(id);
    if (!p) return;
    p.epoch += 1;
    await store.put(key("person", id), p);
    for (const kind of ["browser:", "refresh:"]) for (const r of await store.list(kind)) if (r.value.person === id) await store.del(r.key);
    await audit(by, "signed out everywhere", id);
  }
  async function tidy() {
    for (const kind of ["invite:", "signin:", "browser:", "refresh:", "spent:", "code:", "login:", "draft:"]) for (const r of await store.list(kind)) if (r.value && r.value.exp <= now()) await store.del(r.key);
  }
  async function log(n = 50) {
    return (await store.list("audit:")).slice(-n).reverse().map((r) => r.value);
  }
  return { people, person, byEmail, current, add, invite, redeem, confirm, signInLink, remove, change, handOver, update, newBrowser, browser, endBrowser, newRefresh, useRefresh, signOutAll, tidy, audit, log, STATUSES };
}

// updates.mjs
var dec3 = new TextDecoder();
var KIND2 = "company-connector-releases";
var CHECK = 6 * 36e5;
var START = 36e5;
var PLATFORMS = { mac: "Mac with Apple silicon", "mac-intel": "Mac with an Intel chip", windows: "Windows PC" };
var MODES = ["approve", "auto"];
var versionOk = (v) => typeof v === "string" && /^\d{1,4}\.\d{1,4}\.\d{1,4}$/.test(v);
function newer(a, b) {
  const x = a.split(".").map(Number), y = b.split(".").map(Number);
  for (let i = 0; i < 3; i += 1) if (x[i] !== y[i]) return x[i] > y[i];
  return false;
}
var APPS = "https://github.com/second-brain-factory/company-connector/releases/download/";
async function readReleases(text2, keys2, now = Date.now()) {
  const o = await openEnvelope(text2, keys2, now);
  if (!o || o.kind !== KIND2 || o.v !== 1 || !Array.isArray(o.releases)) return null;
  const releases = o.releases.filter((r) => r && versionOk(r.version) && /^\d{4}-\d{2}-\d{2}$/.test(String(r.released)) && r.files && typeof r.files === "object").map((r) => ({
    version: r.version,
    released: r.released,
    notes: String(r.notes || "").slice(0, 300),
    files: Object.fromEntries(Object.entries(r.files).filter(([, f]) => f && typeof f.url === "string" && /^https:\/\//.test(f.url)).map(([k, f]) => [k, { url: f.url, sha256: typeof f.sha256 === "string" ? f.sha256 : null, size: Number.isInteger(f.size) ? f.size : null }]))
  }));
  return { releases };
}
var digest = async (bytes) => b64u(await globalThis.crypto.subtle.digest("SHA-256", bytes));
function updates({ store, fetchImpl = (...a) => fetch(...a), now = () => Date.now(), version, target = "connector", licenceText = async () => null, updatesUrl = null, releaseKeys = [], apply = null, snapshot = null }) {
  const record = async () => await store.get("updates") || { mode: "approve" };
  const save = (r) => store.put("updates", r);
  async function list(r, force = false) {
    if (updatesUrl && (force || !r.checked || now() - r.checked >= CHECK)) {
      try {
        const lt = await licenceText();
        const res = await fetchImpl(updatesUrl, { headers: { accept: "text/plain", ...lt ? { "x-brain-licence": lt } : {} }, signal: AbortSignal.timeout(8e3) });
        if (res.ok) {
          const text2 = (await res.text()).trim();
          if (await readReleases(text2, releaseKeys, now())) r.list = text2;
        }
      } catch {
      }
      r.checked = now();
      await save(r);
    }
    return r.list && await readReleases(r.list, releaseKeys, now()) || { releases: [] };
  }
  const best = (releases, licence) => releases.filter((x) => newer(x.version, version) && updatesCover(licence, x.released) && x.files[target] && x.files[target].sha256).sort((a, b) => newer(a.version, b.version) ? -1 : 1)[0] || null;
  const sameOrigin = (a, b) => {
    try {
      return new URL(a).origin === new URL(b).origin;
    } catch {
      return false;
    }
  };
  async function fetchBytes(file) {
    let res;
    const lt = updatesUrl && sameOrigin(file.url, updatesUrl) ? await licenceText() : null;
    try {
      res = await fetchImpl(file.url, { headers: lt ? { "x-brain-licence": lt } : {}, signal: AbortSignal.timeout(3e4) });
    } catch {
      return { problem: "The release could not be downloaded. Nothing changed; try again later." };
    }
    if (!res.ok) return { problem: "The release could not be downloaded. Nothing changed; try again later." };
    const bytes = new Uint8Array(await res.arrayBuffer());
    if (file.size !== null && bytes.length !== file.size || await digest(bytes) !== file.sha256) return { problem: "The download does not match the release we signed, so it was not installed. Nothing changed." };
    return { bytes };
  }
  async function fetchChecked(file) {
    const got = await fetchBytes(file);
    return got.bytes ? { code: dec3.decode(got.bytes) } : got;
  }
  async function appRelease(platform, licence) {
    if (!Object.hasOwn(PLATFORMS, platform)) return null;
    const { releases } = await list(await record());
    return releases.filter((x) => x.files[platform] && x.files[platform].url.startsWith(APPS) && /^[0-9a-f]{64}$/.test(x.files[platform].sha256) && (!licence || updatesCover(licence, x.released))).sort((a, b) => newer(a.version, b.version) ? -1 : 1)[0] || null;
  }
  async function settle(r) {
    if (!r.pending) return r;
    if (r.pending.version === version) {
      r.installed = { version, at: new Date(now()).toISOString() };
      delete r.pending;
      delete r.failed;
      await save(r);
    } else if (now() - Date.parse(r.pending.at) > START) {
      r.failed = { version: r.pending.version, at: r.pending.at };
      delete r.pending;
      await save(r);
    }
    return r;
  }
  return {
    /** What the owner sees: the mode, what is running, what is ready, what came before, and any update that failed. */
    async state(licence = null) {
      const r = await settle(await record());
      const lic = licence || (await store.get("licence") || {}).licence || null;
      const { releases } = await list(r);
      const available = best(releases, lic);
      const blocked = !available && releases.some((x) => newer(x.version, version) && !updatesCover(lic, x.released));
      return { mode: r.mode, current: version, available: available && { version: available.version, notes: available.notes, released: available.released }, updatesEnded: blocked, previous: r.previous || null, pending: r.pending || null, failed: r.failed || null, manual: !apply };
    },
    async act(what, { mode, licence, by } = {}) {
      const r = await settle(await record());
      if (what === "mode") {
        if (!MODES.includes(mode)) return { problem: "Pick how updates install." };
        r.mode = mode;
        await save(r);
        return { text: mode === "auto" ? "Updates now install by themselves, once a day." : "Updates now wait for you to install them." };
      }
      if (what === "install") {
        if (!licence) return { problem: "Add the company licence first." };
        if (r.pending) return { problem: `Version ${r.pending.version} is still starting.` };
        const release = best((await list(r, true)).releases, licence);
        if (!release) return { problem: "You have the newest version your licence covers." };
        if (!apply) return { problem: `Version ${release.version} is ready. Your host updates by hand: follow "Update by hand" in your guide.` };
        const got = await fetchChecked(release.files[target]);
        if (got.problem) return got;
        if (snapshot) await store.put(`snapshot:${version}`, { at: new Date(now()).toISOString(), records: await snapshot() });
        const done = await apply({ kind: "install", version: release.version, code: got.code, release });
        if (!done || !done.ok) return { problem: done && done.problem || "The update could not be put in place. Nothing changed." };
        r.previous = { version, ref: done.ref || null, at: new Date(now()).toISOString() };
        r.pending = { version: release.version, at: new Date(now()).toISOString(), by: by || null };
        delete r.failed;
        await save(r);
        return { text: `Version ${release.version} is installing. It takes a few minutes; this page shows it once it runs.` };
      }
      if (what === "rollback") {
        if (!r.previous) return { problem: "There is no version before to go back to." };
        if (!apply) return { problem: 'Your host goes back by hand: follow "Go back by hand" in your guide.' };
        const done = await apply({ kind: "rollback", version: r.previous.version, ref: r.previous.ref });
        if (!done || !done.ok) return { problem: done && done.problem || "Going back did not work. Nothing changed." };
        const back = r.previous.version;
        r.pending = { version: back, at: new Date(now()).toISOString(), by: by || null, rollback: true };
        delete r.previous;
        await save(r);
        return { text: `Going back to version ${back}. It takes a few minutes.` };
      }
      return { problem: "Pick what to do." };
    },
    /**
     * The computer app for a platform: the newest zip this licence covers, with its fingerprint, from our signed list.
     * The zips are in the releases of our templates repository, too large for a connector on Cloudflare or Vercel to pass
     * on, so the connector never fetches them. The person's own AI downloads the zip, checks the fingerprint and starts
     * it (#4771), so nothing is opened by hand. A zip anywhere else, or one with no fingerprint, is not offered. Null:
     * none yet.
     */
    async appFile(platform, licence = null) {
      const r = await appRelease(platform, licence);
      return r ? { url: r.files[platform].url, sha256: r.files[platform].sha256, version: r.version } : null;
    }
  };
}

// deploy.mjs
function gitDeploy({ client, repo, path }) {
  return async function apply({ kind, version, code, ref }) {
    const c = await client();
    if (!c) return { problem: "Connect GitHub first." };
    try {
      if (kind === "install") {
        const before = (await c.head(repo)).commit;
        await c.commit(repo, [{ path, text: code }, { path: "VERSION", text: `${version}
` }], `Second Brain connector ${version}`, { base: before });
        return { ok: true, ref: before };
      }
      if (kind === "rollback") {
        if (!ref) return { problem: "The version before is not known." };
        await c.restoreTree(repo, ref, `Back to Second Brain connector ${version}`);
        return { ok: true };
      }
    } catch (e) {
      return { problem: `GitHub did not take the update (${e.status || e.message}). Nothing changed.` };
    }
    return { problem: "Unknown step." };
  };
}

// prepared.mjs
var KIND3 = "company-brain";
var MOST_PREPARED_FILES = 200;
var MOST_PREPARED_FILE = 120 * 1024;
var MOST_PREPARED_BYTES = 180 * 1024;
var TOP = ["README.md", "AGENTS.md", "CLAUDE.md", "skill-map.md", "shared-brain.json", COMPANY_SETUP_FILE];
var PLACES2 = ["knowledge/", "decisions/", "skills/"];
var SKILL_ID = /^[a-z0-9][a-z0-9-]{0,63}$/;
var LICENCE_ID = /^[A-Za-z0-9_-]{6,80}$/;
var size = (t) => new TextEncoder().encode(t).length;
function preparedPath(v) {
  const p = brainPath(v);
  if (!p) return null;
  if (TOP.includes(p)) return p;
  if (!PLACES2.some((x) => p.startsWith(x))) return null;
  if (p.startsWith("skills/") && p !== "skills/README.md") {
    const [, id, ...rest] = p.split("/");
    if (!SKILL_ID.test(id) || !rest.length || !/\.md$/i.test(p)) return null;
  }
  return p;
}
function plainSkillText(text2, id) {
  const m = String(text2 || "").match(/^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!m) return false;
  const lines2 = m[1].split(/\r?\n/).filter((l) => l.trim());
  const name = lines2.filter((l) => /^name:\s*\S/.test(l));
  const description = lines2.filter((l) => /^description:\s*\S/.test(l));
  return lines2.length === 2 && name.length === 1 && description.length === 1 && (!id || name[0].replace(/^name:\s*/, "").trim().replace(/^["']|["']$/g, "") === id);
}
function skillDescription(text2) {
  const m = String(text2 || "").match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const line = m && m[1].split(/\r?\n/).find((l) => /^description:\s*\S/.test(l));
  return line ? line.replace(/^description:\s*/, "").trim().replace(/^["']|["']$/g, "") : "";
}
function preparedContract(o) {
  if (!o || typeof o !== "object" || o.kind !== KIND3) return { problem: "This is not a prepared company Brain." };
  if (o.v !== 1) return { problem: "This prepared Brain is of another version. Ask Second Brain for a new one." };
  const name = typeof o.name === "string" ? o.name.trim().slice(0, 80) : "";
  if (!name) return { problem: "This prepared Brain has no name." };
  if (typeof o.licence !== "string" || !LICENCE_ID.test(o.licence)) return { problem: "This prepared Brain names no licence, so it can't be added. Ask Second Brain for one made for your licence." };
  if (!Array.isArray(o.files) || !o.files.length) return { problem: "This prepared Brain has no files." };
  if (o.files.length > MOST_PREPARED_FILES) return { problem: `This prepared Brain has more than ${MOST_PREPARED_FILES} files.` };
  const seen = /* @__PURE__ */ new Set();
  let total = 0;
  const files = [];
  for (const f of o.files) {
    const p = preparedPath(f && f.path);
    if (!p) return { problem: `${String(f && f.path).slice(0, 80)} has no place in a company Brain.` };
    if (seen.has(p)) return { problem: `${p} is in it twice.` };
    if (typeof f.text !== "string") return { problem: `${p} has no text.` };
    const n = size(f.text);
    if (n > MOST_PREPARED_FILE) return { problem: `${p} is too large.` };
    total += n;
    seen.add(p);
    files.push({ path: p, text: f.text });
  }
  if (total > MOST_PREPARED_BYTES) return { problem: "This prepared Brain is too large." };
  const setup = files.find((f) => f.path === COMPANY_SETUP_FILE);
  if (setup) {
    let v;
    try {
      v = JSON.parse(setup.text);
    } catch {
      return { problem: `${COMPANY_SETUP_FILE} is not a company setup.` };
    }
    const wrong = companySetupProblems(v);
    if (wrong.length) return { problem: `${COMPANY_SETUP_FILE} can't be used: ${wrong[0]}.` };
  }
  for (const f of files) {
    const m = f.path.match(/^skills\/([^/]+)\/SKILL\.md$/);
    if (m && !plainSkillText(f.text, m[1])) return { problem: `${f.path} is not plain written steps: its frontmatter may hold only its name (${m[1]}) and a description.` };
  }
  for (const id of new Set(files.map((f) => f.path.match(/^skills\/([^/]+)\//)?.[1]).filter(Boolean))) {
    if (!files.some((f) => f.path === `skills/${id}/SKILL.md`)) return { problem: `skills/${id}/ has no SKILL.md.` };
  }
  return {
    prepared: {
      v: 1,
      name,
      company: typeof o.company === "string" ? o.company.trim().slice(0, 120) : "",
      licence: o.licence,
      made: Number.isFinite(Date.parse(o.made)) ? new Date(o.made).toISOString() : null,
      files
    }
  };
}
async function readPrepared(v, keys2, { licence = null, anyLicence = false, now = Date.now() } = {}) {
  const o = await openEnvelope(v, keys2, now);
  if (!o) return { problem: "This is not a prepared Brain signed by Second Brain. Copy it again, all of it, from the email or file it came in." };
  const c = preparedContract(o);
  if (c.problem) return c;
  if (!anyLicence && (!licence || c.prepared.licence !== licence.id)) return { problem: `This prepared Brain was made for another company's licence${c.prepared.company ? ` (${c.prepared.company})` : ""}. Ask Second Brain for the one made for yours.` };
  return { prepared: c.prepared, text: envelopeText(envelopeOf(v)) };
}
function companySkillProblem(files) {
  const where = "A company skill goes at skills/<id>/SKILL.md, where <id> is its name in lowercase letters, digits and hyphens, and its other files are Markdown (.md) beside it.";
  for (const f of files) {
    const m = f.path.match(/^skills\/([^/]+)\/SKILL\.md$/);
    if (!m && /(^|\/)skill\.md$/i.test(f.path) || f.path.startsWith("skills/") && !preparedPath(f.path)) return `${f.path} is not a place for a company skill. ${where}`;
    if (!m || f.text === null) continue;
    const id = m[1];
    if (size(f.text) > MOST_PREPARED_FILE) return `${f.path} is too large: a skill is at most ${MOST_PREPARED_FILE / 1024} KB.`;
    if (!/^---\r?\n[\s\S]*?\r?\n---/.test(f.text)) return `${f.path} has no frontmatter. Start it with a line ---, then name: ${id}, then description: one line on when to use it, then ---.`;
    if (!plainSkillText(f.text)) return `${f.path} can't be served: its frontmatter may hold only name and description, one line each.`;
    if (!plainSkillText(f.text, id)) return `${f.path} has another name than its folder. Make its name ${id}, or suggest it at skills/<its name>/SKILL.md.`;
  }
  return null;
}
var clean2 = (s) => String(s || "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[`*]/g, "").trim();
var idOf = (s) => clean2(s).replace(/^skills\//, "").replace(/\/SKILL\.md$/i, "").replace(/\/$/, "");
var cellsOf = (line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
var MAP_TABLE = "| Skill | Use when | Owner | How it is checked | Status |\n|---|---|---|---|---|";
function mapTable(mapText) {
  const lines2 = String(mapText || "").replace(/\n+$/, "").split("\n");
  const at = lines2.findIndex((l) => {
    const n = cellsOf(l).map((c) => clean2(c).toLowerCase());
    return l.trim().startsWith("|") && n.includes("skill") && n.includes("status");
  });
  if (at < 0) return null;
  let end = at + 1;
  while (end < lines2.length && lines2[end].trim().startsWith("|")) end += 1;
  return { lines: lines2, names: cellsOf(lines2[at]).map((c) => clean2(c).toLowerCase()), first: at + 2, end };
}
function skillMapWith(mapText, id, description, by) {
  const t = mapTable(mapText) || mapTable(`${String(mapText || "").trim() || "# Skill map"}

${MAP_TABLE}
`);
  const { lines: lines2, names } = t;
  for (let i = t.first; i < t.end; i++) {
    const cells = cellsOf(lines2[i]);
    if (idOf(cells[names.indexOf("skill")]) !== id) continue;
    cells[names.indexOf("status")] = "live";
    lines2[i] = `| ${cells.join(" | ")} |`;
    return `${lines2.join("\n")}
`;
  }
  const cell = (s) => String(s || "").replace(/\r?\n/g, " ").replace(/\|/g, "/").trim();
  const value = (n) => n === "skill" ? id : n === "status" ? "live" : n.startsWith("use when") ? cell(description) : n === "owner" ? cell(by) : n.startsWith("how it is checked") ? `Read by ${cell(by)}` : "";
  lines2.splice(t.end, 0, `| ${names.map(value).join(" | ")} |`);
  return `${lines2.join("\n")}
`;
}
function skillMapJoined(preparedText, heldText) {
  const held = mapTable(heldText);
  if (!held) return preparedText;
  const t = mapTable(preparedText) || mapTable(`${String(preparedText || "").trim() || "# Skill map"}

${MAP_TABLE}
`);
  const ids = new Set(t.lines.slice(t.first, t.end).map((l) => idOf(cellsOf(l)[t.names.indexOf("skill")])));
  const kept = [];
  for (let i = held.first; i < held.end; i++) {
    const cells = cellsOf(held.lines[i]);
    const id = idOf(cells[held.names.indexOf("skill")]);
    if (!SKILL_ID.test(id) || ids.has(id)) continue;
    ids.add(id);
    kept.push(`| ${t.names.map((n) => {
      const j = held.names.indexOf(n);
      return j >= 0 ? cells[j] || "" : "";
    }).join(" | ")} |`);
  }
  t.lines.splice(t.end, 0, ...kept);
  return `${t.lines.join("\n")}
`;
}
function skillMapWithout(mapText, id) {
  const t = mapTable(mapText);
  if (!t) return mapText;
  const rows = t.lines.filter((l, i) => !(i >= t.first && i < t.end && idOf(cellsOf(l)[t.names.indexOf("skill")]) === id));
  return `${rows.join("\n")}
`;
}
function liveCompanySkills(mapText, paths = null) {
  let cols = null;
  const out = [];
  for (const raw of String(mapText || "").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line.startsWith("|")) {
      if (cols) break;
      continue;
    }
    const cells = line.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
    if (!cols) {
      const names = cells.map((c) => clean2(c).toLowerCase());
      if (names.includes("skill")) {
        if (!names.includes("status")) return [];
        const use = names.findIndex((n) => n.startsWith("use when"));
        cols = { skill: names.indexOf("skill"), status: names.indexOf("status"), use: use >= 0 ? use : names.findIndex((n, i) => i !== names.indexOf("skill") && i !== names.indexOf("status")) };
      }
      continue;
    }
    if (cells.every((c) => /^:?-*:?$/.test(c))) continue;
    const id = idOf(cells[cols.skill]);
    if (!SKILL_ID.test(id) || clean2(cells[cols.status]).toLowerCase() !== "live" || out.some((s) => s.name === id)) continue;
    if (paths && !paths.has(`skills/${id}/SKILL.md`)) continue;
    out.push({ name: id, use: cols.use >= 0 ? clean2(cells[cols.use]).slice(0, 300) : "" });
  }
  return out.slice(0, 50);
}

// core.mjs
var import_chat = __toESM(require_chat(), 1);
var { makeChat } = import_chat.default;
var APP_CALLBACKS = ["https://claude.ai/api/mcp/auth_callback", "https://chatgpt.com/connector_platform_oauth_redirect"];
var COMPUTER_CLIENT = "second-brain-computer";
var brainRepoName = (x) => `brain-${x.id}-${randomToken(6).toLowerCase().replace(/[^a-z0-9]/g, "")}`.slice(0, 90);
var loopback = (u) => {
  try {
    const x = new URL(u);
    return x.protocol === "http:" && ["127.0.0.1", "localhost", "[::1]"].includes(x.hostname) && !x.username && !x.password;
  } catch {
    return false;
  }
};
var allowedRedirect = (u) => typeof u === "string" && (APP_CALLBACKS.includes(u) || /^https:\/\/chatgpt\.com\/connector\/oauth\/[A-Za-z0-9_-]+$/.test(u) || loopback(u));
var LICENCE_CHECK = 12 * 36e5;
var COOKIE = "sb_session";
var WORKS = { "cloud-first": "In their chat", "local-first": "On their computer" };
var PLAN_LINKS = { claude: "https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp", chatgpt: "https://chatgpt.com/pricing" };
var APP_NAMES = { claude: "Claude", chatgpt: "ChatGPT", other: "Another app" };
var CHECK_FILE = ".second-brain/records/connected.json";
var SAVED_AND_READ_BACK = "Connected: saved and read back.";
var SAVING = { direct: "saved and read back", link: "saves go through the save link", unchecked: "saving not checked yet" };
var RETRY_DIRECT = 7 * DAY;
var SAVE_LINK = { lasts: 30 * 6e4, files: 10, each: 20 };
function createConnector(config) {
  const { secret, store, version, factoryUrl = null, githubApi = "https://api.github.com", githubWeb = "https://github.com", email = null, fetchImpl = (...a) => fetch(...a), now = () => Date.now(), log = () => {
  } } = config;
  const content = config.content || {};
  if (!secret || secret.length < 32) throw new Error("CONNECTOR_SECRET must be at least 32 characters");
  const licenceKeys = keysOf(config.licenceKeys);
  if (!licenceKeys.length) throw new Error("The connector needs the public keys licences are signed with");
  const base = String(config.base || "").replace(/\/+$/, "");
  if (!/^https:\/\/[^/]+$/.test(base) && !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(base)) throw new Error("CONNECTOR_BASE must be the https address the connector answers on, such as https://setup.example.com");
  const secure = base.startsWith("https:");
  const people = workspace(store, { now });
  const gh = github({ api: githubApi, fetchImpl, now });
  const deployRepo = repoName(config.deployRepo || "");
  const apply = config.applyUpdate || (deployRepo ? gitDeploy({ client: async () => {
    const app = await appOf();
    return app && app.installationId ? gh.as(app) : null;
  }, repo: deployRepo, path: config.deployPath || "connector.js" }) : null);
  const releaseKeys = keysOf(config.releaseKeys);
  const up = updates({ store, fetchImpl, now, version, target: config.host || "connector", licenceText: async () => (await licenceOf() || {}).text || null, updatesUrl: config.updatesUrl, releaseKeys, apply, snapshot: () => backup() });
  const settingsOf = async () => await store.get("settings") || {};
  const licenceOf = async () => await store.get("licence") || null;
  async function appOf() {
    const sealed = await store.get("github");
    if (!sealed) return null;
    return JSON.parse(await unseal(secret, sealed.sealed));
  }
  async function brainsOf() {
    const app = await appOf();
    if (!app || !app.installationId) return null;
    const settings = await settingsOf();
    return brains({ gh: gh.as(app), settings });
  }
  async function companySetupNow() {
    try {
      const app = await appOf();
      const repo = (await settingsOf()).companyRepo;
      if (!app || !app.installationId || !repo) return null;
      const f = await gh.as(app).read(repo, COMPANY_SETUP_FILE);
      return f ? readCompanySetup(f.text) : null;
    } catch {
      return null;
    }
  }
  const markOf = async () => (await sha256(`address ${secret}`)).slice(0, 24);
  async function addressLive({ force = false } = {}) {
    const had = await store.get("address-check");
    if (!force && had && now() - had.at < 6e5) return had;
    let state = "unreachable";
    try {
      const r = await fetchImpl(`${base}/.well-known/second-brain-connector`, { headers: { accept: "application/json" }, signal: AbortSignal.timeout(5e3) });
      const body2 = r.ok ? await r.json().catch(() => null) : null;
      state = body2 && body2.mark === await markOf() ? "live" : "elsewhere";
    } catch {
      state = "unreachable";
    }
    const out = { state, at: now() };
    await store.put("address-check", out);
    return out;
  }
  async function licence({ check = true } = {}) {
    const l = await licenceOf();
    if (!l || !check || now() - (l.checked || 0) < LICENCE_CHECK) return l;
    const r = await refresh({ current: l.licence, currentText: l.text, factoryUrl, connectorVersion: version, keys: licenceKeys, fetchImpl, now: now() });
    const next = { ...l, checked: now(), reachable: !r.unreachable };
    if (r.licence) {
      next.licence = r.licence;
      next.text = r.text;
      if (l.withdrawn && r.licence.issued > l.withdrawn.at) {
        delete next.withdrawn;
        await people.audit(null, "licence restored", null);
      } else if (!sameTerms(l.licence, r.licence)) await people.audit(null, "licence renewed", null);
    }
    if (r.withdrawn && !l.withdrawn) {
      next.withdrawn = r.withdrawn;
      await people.audit(null, "licence withdrawn", null);
    }
    await store.put("licence", next);
    return next;
  }
  const SECURITY = { "x-content-type-options": "nosniff", "referrer-policy": "same-origin" };
  const CSP = `default-src 'none'; style-src 'unsafe-inline'; img-src 'self' data:; form-action 'self' ${githubWeb} https://claude.ai https://chatgpt.com http://127.0.0.1:* http://localhost:*; frame-ancestors 'none'; base-uri 'none'`;
  const json = (status, body2, headers = {}) => new Response(JSON.stringify(body2), { status, headers: { "content-type": "application/json", "cache-control": "no-store", ...SECURITY, ...headers } });
  const html = (status, page2, headers = {}) => new Response(page2, { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "content-security-policy": CSP, "x-frame-options": "DENY", ...SECURITY, ...headers } });
  const redirect = (to, headers = {}) => new Response(null, { status: 303, headers: { location: to, "cache-control": "no-store", ...SECURITY, ...headers } });
  const cookieOf = (req, name) => {
    const m = String(req.headers.get("cookie") || "").split(/;\s*/).find((c) => c.startsWith(`${name}=`));
    return m ? decodeURIComponent(m.slice(name.length + 1)) : null;
  };
  const setCookie = (token2) => `${COOKIE}=${encodeURIComponent(token2)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(LIMITS.browser / 1e3)}${secure ? "; Secure" : ""}`;
  const clearCookie = `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? "; Secure" : ""}`;
  const form = async (req) => {
    try {
      return new URLSearchParams(await req.text());
    } catch {
      return new URLSearchParams();
    }
  };
  const body = async (req) => {
    try {
      return await req.json();
    } catch {
      return void 0;
    }
  };
  const sameSite = (req) => {
    const o = req.headers.get("origin");
    if (o) return o === base;
    const r = req.headers.get("referer");
    return !!r && (r === base || r.startsWith(`${base}/`));
  };
  const page = async (title, inner, opts = {}) => layout({ company: (await settingsOf()).company, title, body: inner, ...opts });
  async function browserPerson(req) {
    return people.browser(cookieOf(req, COOKIE));
  }
  async function signedIn(req, client) {
    const t = (/^Bearer +(\S+)$/i.exec(String(req.headers.get("authorization") || "")) || [])[1];
    const a = t && await open(secret, t, "access", now());
    if (!a || client && a.c !== client) return null;
    const person = await people.current(a.p, a.e);
    return person ? { person, client: a.c } : null;
  }
  const bearer = async (req, client) => (await signedIn(req, client) || {}).person || null;
  const unauthorized = () => json(401, { error: "unauthorized" }, { "www-authenticate": `Bearer resource_metadata="${base}/.well-known/oauth-protected-resource"` });
  async function clientOf(id) {
    if (id === COMPUTER_CLIENT) return { id, redirects: "loopback" };
    return typeof id === "string" && /^[A-Za-z0-9_-]{8,80}$/.test(id) ? store.get(`client:${id}`) : null;
  }
  async function appKeyOf(clientId) {
    const c = clientId === COMPUTER_CLIENT ? null : await clientOf(clientId);
    const to = c && Array.isArray(c.redirects) ? c.redirects : [];
    return to.some((u) => u.startsWith("https://claude.ai/")) ? "claude" : to.some((u) => u.startsWith("https://chatgpt.com/")) ? "chatgpt" : "other";
  }
  async function setSaving(id, app, patch) {
    const x = await people.person(id);
    if (!x) return;
    x.saving = { ...x.saving || {}, [app]: { ...(x.saving || {})[app] || {}, ...patch } };
    await people.update(x);
  }
  const stamp = () => new Date(now()).toISOString();
  const redirectFits = (client, uri) => allowedRedirect(uri) && (client.redirects === "loopback" ? loopback(uri) : client.redirects.includes(uri) || loopback(uri) && client.redirects.some(loopback));
  async function authorizeRequest(q) {
    const client = await clientOf(q.get("client_id"));
    const uri = q.get("redirect_uri");
    if (!client || !redirectFits(client, uri)) return { problem: "This sign-in did not come from Claude, ChatGPT or the Second Brain app. Start it again from the app." };
    if (q.get("response_type") !== "code" || q.get("code_challenge_method") !== "S256" || !/^[A-Za-z0-9_-]{43,128}$/.test(String(q.get("code_challenge")))) return { problem: "This sign-in is missing a part. Start it again from the app." };
    return { client, fields: { client_id: client.id, redirect_uri: uri, response_type: "code", code_challenge: q.get("code_challenge"), code_challenge_method: "S256", state: q.get("state") || "", scope: q.get("scope") || "" } };
  }
  const appName2 = (uri) => String(uri).startsWith("https://claude.ai") ? "Claude" : String(uri).startsWith("https://chatgpt.com") ? "ChatGPT" : "the Second Brain app";
  async function issueCode(p, f) {
    const code = randomToken();
    await store.put(`code:${await sha256(code)}`, { person: p.id, epoch: p.epoch, client: f.client_id, redirect: f.redirect_uri, challenge: f.code_challenge, exp: now() + LIMITS.code });
    const to = new URL(f.redirect_uri);
    to.searchParams.set("code", code);
    if (f.state) to.searchParams.set("state", f.state);
    to.searchParams.set("iss", base);
    return to.toString();
  }
  const accessFor = async (p, client) => sign(secret, { typ: "access", p: p.id, e: p.epoch, c: client, exp: now() + LIMITS.access });
  async function token(req) {
    const f = await form(req);
    const client = f.get("client_id");
    if (f.get("grant_type") === "refresh_token") {
      const r = await people.useRefresh(f.get("refresh_token"), client);
      if (r.problem) return json(400, { error: "invalid_grant" });
      return json(200, { access_token: await accessFor(r.person, client), token_type: "Bearer", expires_in: LIMITS.access / 1e3, refresh_token: r.refresh });
    }
    if (f.get("grant_type") !== "authorization_code") return json(400, { error: "unsupported_grant_type" });
    const code = f.get("code");
    const c = typeof code === "string" && code.length <= 100 ? await store.take(`code:${await sha256(code)}`) : null;
    const verifier = String(f.get("code_verifier") || "");
    if (!c || c.exp <= now() || c.client !== client || c.redirect !== f.get("redirect_uri") || !/^[A-Za-z0-9._~-]{43,128}$/.test(verifier)) return json(400, { error: "invalid_grant" });
    const challenge = b64u(await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)));
    if (!same(challenge, c.challenge)) return json(400, { error: "invalid_grant" });
    const p = await people.current(c.person, c.epoch);
    if (!p) return json(400, { error: "invalid_grant" });
    await people.audit(p.id, `connected ${appName2(c.redirect)}`, p.id);
    if (client !== COMPUTER_CLIENT) await setSaving(p.id, await appKeyOf(client), { connected: stamp() });
    return json(200, { access_token: await accessFor(p, client), token_type: "Bearer", expires_in: LIMITS.access / 1e3, refresh_token: await people.newRefresh(p, client) });
  }
  async function needsEmail() {
    return html(503, await page("Set up email first", `<h1>Set up email first</h1><p>Invitations and sign-in codes go by email. Add <code>RESEND_API_KEY</code> and <code>EMAIL_FROM</code> to this connector's settings on your host, as the guide for your host shows, then reload this page.</p>`, { narrow: true }));
  }
  async function signInPage(next, msg) {
    if (!email) return needsEmail();
    const settings = await settingsOf();
    return html(200, await page("Sign in", `<h1>Sign in</h1>${message(msg)}<form method="post" action="/signin" class="panel">${hidden({ next: next || "" })}<label for="email">Your work email</label><input id="email" name="email" type="email" autocomplete="email" required><button>Send me a code</button></form><p class="muted">No email? Ask ${esc(settings.company || "your company")}'s Second Brain admin for a sign-in link.</p>`, { narrow: true }));
  }
  const nextOf = (v) => typeof v === "string" && /^\/(authorize\?|welcome$|admin$|save\/[A-Za-z0-9_-]{20,60}$)/.test(v) && v.length < 2e3 ? v : "/";
  async function emailSignIn(req) {
    if (!sameSite(req)) return html(403, await page("Not allowed", "<h1>Not allowed</h1>"));
    const f = await form(req);
    const next = nextOf(f.get("next"));
    const e = emailOf(f.get("email"));
    const login = randomToken(12);
    const p = e ? await people.byEmail(e) : null;
    if (p && p.status === "active") {
      const code = typedCode(2);
      await store.put(`login:${login}`, { person: p.id, code: await sha256(code), tries: 0, next, exp: now() + LIMITS.signin });
      try {
        await email.send({ to: p.email, subject: `Your sign-in code: ${code}`, text: `Your code to sign in to ${(await settingsOf()).company || "your company"}'s Second Brain is ${code}. It works once, for 15 minutes.` });
      } catch {
        log({ event: "email failed" });
      }
    } else {
      await store.put(`login:${login}`, { person: null, code: await sha256(randomToken()), tries: 0, next, exp: now() + LIMITS.signin });
    }
    return html(200, await page("Check your email", `<h1>Check your email</h1><p>If ${esc(e || "that address")} is in your company's workspace, a code is on its way.</p><form method="post" action="/signin/code" class="panel">${hidden({ login })}<label for="code">Code</label><input id="code" name="code" autocomplete="one-time-code" autocapitalize="characters" required><button>Sign in</button></form>`, { narrow: true }));
  }
  async function emailCode(req) {
    if (!sameSite(req)) return html(403, await page("Not allowed", "<h1>Not allowed</h1>"));
    const f = await form(req);
    const id = String(f.get("login") || "");
    const l = /^[A-Za-z0-9_-]{10,40}$/.test(id) ? await store.get(`login:${id}`) : null;
    const wrong = async () => html(400, await page("Sign in", `<h1>That code did not work</h1><p>Codes work once, for 15 minutes. <a href="/signin">Ask for a new one</a>.</p>`, { narrow: true }));
    if (!l || l.exp <= now() || l.tries >= 5) return wrong();
    l.tries += 1;
    await store.put(`login:${id}`, l);
    if (!l.person || !same(await sha256(String(f.get("code") || "").trim().toUpperCase()), l.code)) return wrong();
    await store.del(`login:${id}`);
    const found = await people.current(l.person);
    if (!found) return wrong();
    const p = await people.confirm(found);
    return redirect(l.next, { "set-cookie": setCookie(await people.newBrowser(p)) });
  }
  async function linkPage(req, kind) {
    const t = new URL(req.url).searchParams.get("t") || "";
    const settings = await settingsOf();
    if (req.method === "GET") return html(200, await page(kind === "invite" ? "Join" : "Sign in", `<h1>${kind === "invite" ? `Join ${esc(settings.company || "your company")}'s Second Brain` : "Sign in"}</h1><form method="post" class="panel">${hidden({ t })}<button>Continue</button></form>`, { narrow: true }));
    if (!sameSite(req)) return html(403, await page("Not allowed", "<h1>Not allowed</h1>"));
    const taken = await people.redeem((await form(req)).get("t"), kind);
    const p = taken && kind === "signin" ? await people.confirm(taken) : taken;
    if (!p) return html(400, await page("Link used", `<h1>This link has been used or has ended</h1><p>Ask your Second Brain admin for a new one.</p>`, { narrow: true }));
    return redirect("/welcome", { "set-cookie": setCookie(await people.newBrowser(p)) });
  }
  const connectedApps = (x) => Object.keys(APP_NAMES).filter((k) => x.saving && x.saving[k]).map((k) => [k, x.saving[k]]);
  async function welcome(p) {
    const l = await licence({ check: false });
    const isAdmin = ["owner", "admin"].includes(p.role);
    const address = `${base}/mcp`;
    const link = (to, text2) => `<a href="${esc(to)}" target="_blank" rel="noopener noreferrer">${text2}</a>`;
    const apps = connectedApps(p);
    const connected = apps.length ? `<div class="state">${apps.map(([k, x]) => `<b>${APP_NAMES[k]}</b><span><span class="dot${x.mode ? "" : " no"}"></span>Connected: ${SAVING[x.mode] || SAVING.unchecked}</span>`).join("")}</div>` : "";
    const cloud = `<h2>Add your connector</h2><p>A paid Claude or ChatGPT plan. ${link(PLAN_LINKS.claude, "Claude: custom connectors")} · ${link(PLAN_LINKS.chatgpt, "ChatGPT: plans")}</p>${copyField("address", address)}${connected}<ol class="steps"><li><b>Claude</b>, at claude.ai in a browser: open <b>Plugins</b>, press <b>Add</b>, then <b>Add custom connector</b>. Type a name, paste the address, press <b>Continue</b>, then <b>Add</b>, and sign in.</li><li><b>ChatGPT</b>, at chatgpt.com in a browser: open <b>Plugins</b>, press <b>Add</b>, then <b>Add custom MCP server</b>. Type a name, paste the address, set <b>Authentication</b> to <b>OAuth</b>, tick <b>I understand and want to continue</b>, press <b>Create as a plugin</b>, then <b>Connect</b>, and sign in.</li><li>In a company Claude or ChatGPT workspace, its owner or admin adds the connector first. Then you connect to it and sign in.</li><li>Ask: <i>check that my Second Brain can save</i>. It saves one small file to your Brain, reads it back and answers <b>${esc(SAVED_AND_READ_BACK.slice(0, -1))}</b>, or says how saving works in your app.</li><li>Then ask: <i>open my Second Brain dashboard</i>.</li></ol><p class="muted">On a personal ChatGPT plan, OpenAI may use what ChatGPT reads through a connector to train its models, unless <b>Improve the model for everyone</b> is off in your ChatGPT settings.</p>`;
    const zips = p.flavor === "cloud-first" || !l || l.withdrawn ? [] : (await Promise.all(Object.entries(PLATFORMS).map(async ([k, name]) => [name, await up.appFile(k, l.licence)]))).filter(([, f]) => f);
    const ask = `Please set up my Second Brain on this computer. My company gave it to me, and I want it.

Here is what I expect, and you can check it in the folder: a small dashboard that runs only on this computer, using the copy of Node inside the folder. It adds one command to my skills. While I set up, the dashboard gives you setup jobs, one at a time.

1. Work in the folder this chat is in, if I made it for my Second Brain or it is empty. Otherwise make a folder called "Second Brain" in my Documents folder and work there.
2. Download the file for this computer into that folder as starter.zip:
${zips.map(([name, f]) => `   ${name}: ${f.url}
   SHA-256: ${f.sha256}`).join("\n")}
3. Check that its SHA-256 fingerprint matches. If it does not, stop and tell me.
4. Unzip it there, adding only the files that are not there yet and never over a file that is already there.
5. Read AI-SETUP.md in that folder, run the program it names, and do what it says.

Do all of this yourself, and tell me briefly what you are doing. I only want to press Allow when your app asks.`;
    const local = zips.length ? `<h2>Set up the Second Brain app</h2><ol class="steps"><li>On your computer, open <b>Claude</b> (the Code tab) or <b>ChatGPT</b> (Codex), and send it this message:${copyText("ask", ask)}</li><li>When the app asks for your company's address, paste this, then press Continue on the page it opens:${copyField("address", base)}</li></ol>` : `<h2>Set up the Second Brain app</h2><p>The app is not here yet. Ask your owner.</p>`;
    return html(200, await page("Your Second Brain", `<h1>Hello, ${esc(p.name)}</h1>${l && l.withdrawn ? message({ text: "Your company's licence was withdrawn. Ask your owner." }) : ""}${p.flavor === "cloud-first" ? cloud : local}${isAdmin ? '<p><a class="button quiet" href="/admin">Manage the workspace</a></p>' : ""}<form method="post" action="/signout"><button class="quiet">Sign out of this browser</button></form>`));
  }
  async function adminPage(p, msg) {
    const [settings, l, app, list] = [await settingsOf(), await licence(), await appOf(), await people.people()];
    const lic = l && l.licence;
    const active = list.filter((x) => x.status !== "removed");
    const taken = lic ? seatsTaken(lic, list) : 0;
    const st = (ok, yes, no) => `<span><span class="dot${ok ? "" : " no"}"></span>${esc(ok ? yes : no)}</span>`;
    const ghReady = !!(app && app.installationId);
    const live = await addressLive();
    const addressText = { live: base, elsewhere: `${base} reaches another server: check the DNS line in the owner guide`, unreachable: `${base} is not reachable yet: add the DNS line in the owner guide (it can take up to an hour)` }[live.state];
    const status = `<div class="state"><b>Address</b>${st(live.state === "live", addressText, addressText)}<b>GitHub</b>${st(ghReady, `${app && app.org} (${settings.companyRepo || ""})`, app ? "App made: install it on your organisation" : "Not connected")}<b>Licence</b>${st(!!lic && !l.withdrawn, lic ? `${lic.company.name}: ${taken} of ${lic.seats} seats${lic.ownerSeat ? "" : " (the owner takes none)"}, updates until ${lic.updatesUntil}` : "", l && l.withdrawn ? `Withdrawn: ${l.withdrawn.reason || "ask Second Brain"}` : "Not added")}<b>Version</b>${st(true, version, "")}</div>`;
    const connect = !ghReady ? `<h2>Connect GitHub</h2><div class="panel">${app ? `<p>The App is made. Install it on ${esc(app.org)}:</p><p><a class="button" href="${esc(`${githubWeb}/apps/${app.slug}/installations/new`)}">Install on GitHub</a></p>` : `<p>Your Brains are kept in your company's GitHub organisation, made by an App only your organisation holds. You need to be an owner of the organisation. A free organisation is enough.</p><form method="post" action="/admin/github/start"><label for="org">Your GitHub organisation's name</label><input id="org" name="org" required pattern="[A-Za-z0-9-]{1,39}" autocapitalize="off"><button>Connect GitHub</button></form>`}</div>` : "";
    const mayChange = (x) => x.id === p.id || x.role !== "owner" && (x.role !== "admin" || p.role === "owner");
    const works = (x) => lic && lic.flavors.length > 1 && mayChange(x) ? `<form method="post" action="/admin/people/${esc(x.id)}/flavor" class="row"><select name="flavor" aria-label="How ${esc(x.name)} works">${lic.flavors.map((f) => `<option value="${f}"${f === x.flavor ? " selected" : ""}>${WORKS[f]}</option>`).join("")}</select><button class="quiet">Save</button></form>` : WORKS[x.flavor];
    const rows = active.map((x) => `<tr><td><b>${esc(x.name)}</b><br><span class="muted">${esc(x.email)}</span></td><td>${esc(x.role)}</td><td>${works(x)}</td><td><span class="tag">${esc(x.status)}</span>${connectedApps(x).map(([k, v]) => `<br><span class="muted">${APP_NAMES[k]}: ${SAVING[v.mode] || SAVING.unchecked}</span>`).join("")}</td><td>${x.role === "owner" ? "" : `<form method="post" action="/admin/people/${esc(x.id)}/link" class="row"><button class="quiet">${x.status === "invited" ? "Email a new invitation" : "Email a sign-in link"}</button></form>${x.status === "active" ? `<form method="post" action="/admin/people/${esc(x.id)}/signout"><button class="quiet">Sign out everywhere</button></form>` : ""}${p.role === "owner" && x.status === "active" ? `<form method="post" action="/admin/people/${esc(x.id)}/owner"><button class="quiet">Make owner</button></form>` : ""}<form method="post" action="/admin/people/${esc(x.id)}/remove"><button class="danger">Remove</button></form>`}</td></tr>`).join("");
    const invite = lic && ghReady ? `<form method="post" action="/admin/people" class="panel"><h2 style="margin-top:0">Invite someone</h2><label for="name">Name</label><input id="name" name="name" required><label for="email">Work email</label><input id="email" name="email" type="email" required><label for="flavor">How they work</label><select id="flavor" name="flavor">${lic.flavors.map((f) => `<option value="${f}">${f === "cloud-first" ? "In their chat (Claude or ChatGPT)" : "On their computer (the Second Brain app)"}</option>`).join("")}</select><label for="role">Role</label><select id="role" name="role"><option value="member">Member</option><option value="admin">Admin: can invite and remove</option></select><button>Invite</button></form>` : "";
    let suggestions = "";
    if (ghReady) {
      try {
        const list2 = await gh.as(app).suggestions(settings.companyRepo);
        const held = await Promise.all(list2.map((s) => store.get(`suggestion:${s.number}`)));
        const skillsIn = (h) => (h && h.skills || []).map((x) => `<p>${x.description === null ? `Removes the company skill <b>${esc(x.name)}</b>` : `Company skill <b>${esc(x.name)}</b>: ${esc(x.description)}`}</p>`).join("");
        suggestions = list2.length ? `<h2>Suggestions to the company Brain</h2>${list2.map((s, i) => `<div class="panel"><p><b>${esc(s.title)}</b></p>${skillsIn(held[i])}<p class="muted">${esc(s.body)}</p><div class="row"><form method="post" action="/admin/suggestions/${s.number}/approve"><button>Approve</button></form><form method="post" action="/admin/suggestions/${s.number}/decline"><button class="quiet">Decline</button></form></div></div>`).join("")}` : "";
      } catch {
        suggestions = "";
      }
    }
    const u = await up.state();
    const now2 = u.pending ? `Version ${esc(u.pending.version)} is ${u.pending.rollback ? "coming back" : "installing"}. It takes a few minutes.` : u.available ? `Version ${esc(u.available.version)} is ready${u.available.notes ? `: ${esc(u.available.notes)}` : ""}.` : u.updatesEnded ? `Newer versions came out after ${esc(lic ? lic.updatesUntil : "")}, when your updates ended. Yours keeps working as it is; renew to get them.` : "You have the newest version.";
    const failed = u.failed ? message({ text: `Version ${u.failed.version} did not start, so you are still on ${version}. Nothing was lost.` }) : "";
    const updatesPanel = `<h2>Updates</h2><div class="panel">${failed}<p>${now2}</p><form method="post" action="/admin/updates" class="row"><select name="mode" aria-label="How updates install"><option value="approve"${u.mode === "approve" ? " selected" : ""}>Install when I approve</option><option value="auto"${u.mode === "auto" ? " selected" : ""}>Install by themselves</option></select><button class="quiet" name="do" value="mode">Save</button>${u.available && !u.pending ? '<button name="do" value="install">Install now</button>' : ""}${u.previous && !u.pending ? `<button class="quiet" name="do" value="rollback">Go back to version ${esc(u.previous.version)}</button>` : ""}</form></div>`;
    const cs = p.role === "owner" && ghReady ? await companySetupNow() : null;
    const preparedPeople = cs && cs.prepared && Array.isArray(cs.prepared.people) ? cs.prepared.people.length : 0;
    const setupPanel = ghReady ? `<h2>Company setup</h2><div class="panel">${cs ? `<p><b>${esc(cs.company.brainName || cs.company.name)}</b>${preparedPeople ? `: ${preparedPeople} ${preparedPeople === 1 ? "person" : "people"} prepared` : ""}</p>` : ""}<form method="post" action="/admin/company-setup"><label for="brainName">Your Brain's name</label><input id="brainName" name="brainName" maxlength="60" value="${esc(cs ? cs.company.brainName : "")}"><label for="colour">Your colour</label><input id="colour" name="colour" maxlength="7" placeholder="#2470cf" pattern="#[0-9a-fA-F]{6}" value="${esc(cs ? cs.company.colour : "")}"><label for="workFocus">Most of the work here is</label><input id="workFocus" name="workFocus" maxlength="300" value="${esc(cs ? cs.company.workFocus : "")}"><label for="neverInAi">Never put into an AI, one per line</label><textarea id="neverInAi" name="neverInAi">
${esc(cs ? cs.company.neverInAi.join("\n") : "")}</textarea><button class="quiet" name="do" value="fields">Save</button></form>${cs ? '<form method="post" action="/admin/company-setup"><button class="danger" name="do" value="remove">Remove the company setup</button></form>' : ""}</div>` : "";
    const prepared = p.role === "owner" && ghReady ? `<h2>Prepared Brain</h2><div class="panel">${settings.prepared ? `<p>${esc(settings.prepared.name)}: ${settings.prepared.files} files, added ${esc(String(settings.prepared.at).slice(0, 10))}.</p>` : ""}<form method="post" action="/admin/prepared"><label for="prepared">${settings.prepared ? "A newer prepared Brain from Second Brain" : "The prepared Brain Second Brain sent you"}</label><textarea id="prepared" name="prepared" required></textarea><button>Check it</button></form></div>` : "";
    const backup2 = `<h2>Backup</h2><div class="panel"><p>Brains are kept, with every earlier version, in your GitHub. This saves the workspace itself: people, roles and settings. Keep it somewhere safe.</p><div class="row"><a class="button quiet" href="/admin/backup">Download the workspace</a></div><form method="post" action="/admin/restore" enctype="application/x-www-form-urlencoded"><label for="restore">Restore from a download</label><textarea id="restore" name="backup" required></textarea><button class="quiet">Restore</button></form></div>`;
    return html(200, await page("Your workspace", `<h1>${esc(settings.company || "Your workspace")}</h1>${message(msg)}${status}${connect}<h2>People</h2>${active.length ? `<table><thead><tr><th>Person</th><th>Role</th><th>How they work</th><th>State</th><th></th></tr></thead><tbody>${rows}</tbody></table>` : ""}${invite}${prepared}${suggestions}${p.role === "owner" ? setupPanel + updatesPanel + backup2 : ""}<p><a href="/welcome">Your own way in</a></p>`));
  }
  async function claimPage(msg) {
    return html(200, await page("Set up your connector", `<h1>Set up your Second Brain</h1>${message(msg)}<form method="post" action="/admin/claim" class="panel"><label for="licence">Your company licence, from your purchase email</label><textarea id="licence" name="licence" required></textarea><label for="name">Your name</label><input id="name" name="name" required autocomplete="name"><label for="email">Your work email</label><input id="email" name="email" type="email" required autocomplete="email"><label for="flavor">How you work</label><select id="flavor" name="flavor"><option value="cloud-first">In my chat (Claude or ChatGPT)</option><option value="local-first">On my computer (the Second Brain app)</option></select><button>Continue</button></form>`, { narrow: true }));
  }
  async function claim(req) {
    if (!sameSite(req)) return html(403, await page("Not allowed", "<h1>Not allowed</h1>"));
    if ((await people.people()).some((x) => x.role === "owner")) return redirect("/admin");
    const f = await form(req);
    const r = await readLicence(f.get("licence"), licenceKeys, now());
    if (r.problem) return claimPage({ text: r.problem });
    const flavor = FLAVORS.includes(f.get("flavor")) && r.licence.flavors.includes(f.get("flavor")) ? f.get("flavor") : r.licence.flavors[0];
    await store.put("licence", { text: r.text, licence: r.licence, checked: now(), reachable: true });
    await store.put("settings", { ...await settingsOf(), company: r.licence.company.name, companyRepo: "company-brain", since: new Date(now()).toISOString() });
    const added = await people.add({ name: f.get("name"), email: f.get("email"), role: "owner", flavor, licence: r.licence, repo: null, status: "active" });
    if (added.problem) return claimPage({ text: added.problem });
    const owner = added.person;
    owner.repo = brainRepoName(owner);
    await people.update(owner);
    return redirect("/admin", { "set-cookie": setCookie(await people.newBrowser(owner)) });
  }
  async function recover(req) {
    if (!sameSite(req)) return html(403, await page("Not allowed", "<h1>Not allowed</h1>"));
    const f = await form(req);
    const l = await licenceOf();
    const owner = (await people.people()).find((x) => x.role === "owner" && x.status === "active");
    const r = await readLicence(f.get("licence"), licenceKeys, now());
    if (!l || !owner || r.problem || r.licence.id !== l.licence.id || emailOf(f.get("email")) !== owner.email) return html(400, await page("Sign in", `<h1>That did not match</h1><p><a href="/admin">Try again</a></p>`, { narrow: true }));
    await people.audit(owner.id, "owner signed in with the licence", owner.id);
    return redirect("/admin", { "set-cookie": setCookie(await people.newBrowser(owner)) });
  }
  async function githubStart(req, p) {
    const f = await form(req);
    const org = String(f.get("org") || "").trim();
    if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(org)) return adminPage(p, { text: "That is not a GitHub organisation name." });
    const state = randomToken();
    await store.put(`ghstate:${state}`, { person: p.id, org, exp: now() + 36e5 });
    const settings = await settingsOf();
    const m = manifest({ base, company: settings.company || org });
    return html(200, await page("Connect GitHub", `<h1>Make your App on GitHub</h1><p>GitHub shows the App's name and what it may do. Press <b>Create GitHub App</b> there, then <b>Install</b> on ${esc(org)}.</p><form method="post" action="${esc(`${githubWeb}/organizations/${encodeURIComponent(org)}/settings/apps/new?state=${state}`)}">${hidden({ manifest: JSON.stringify(m) })}<button>Continue to GitHub</button></form>`, { narrow: true }));
  }
  async function githubBack(req, p) {
    const q = new URL(req.url).searchParams;
    const s = await store.take(`ghstate:${q.get("state") || "-"}`);
    if (!s || s.exp <= now() || s.person !== p.id) return adminPage(p, { text: "That GitHub step had ended. Press Connect GitHub again." });
    let app;
    try {
      app = await gh.convert(q.get("code"));
    } catch (e) {
      return adminPage(p, { text: `GitHub did not finish: ${e.message}` });
    }
    if (String(app.owner || "").toLowerCase() !== s.org.toLowerCase()) return adminPage(p, { text: `The App was made under ${app.owner}, not ${s.org}. Make it in the organisation.` });
    await store.put("github", { sealed: await seal(secret, JSON.stringify({ ...app, org: s.org })), at: new Date(now()).toISOString() });
    await people.audit(p.id, "GitHub App made", null);
    return redirect(`${githubWeb}/apps/${encodeURIComponent(app.slug)}/installations/new`);
  }
  async function githubInstalled(req, p) {
    const app = await appOf();
    if (!app) return redirect("/admin");
    const client = gh.as(app);
    let installationId;
    try {
      installationId = await client.installation();
    } catch (e) {
      return adminPage(p, { text: `${e.message}. Install the App on your organisation, then come back.` });
    }
    await store.put("github", { sealed: await seal(secret, JSON.stringify({ ...app, installationId })), at: new Date(now()).toISOString() });
    const b = await brainsOf();
    try {
      await b.ensureCompany(content.COMPANY_START || []);
      for (const x of await people.people()) if (x.status !== "removed" && x.repo) await b.ensurePerson(x, () => people.update(x));
    } catch (e) {
      return adminPage(p, { text: `GitHub is connected, but a Brain could not be made: ${e.message}` });
    }
    await people.audit(p.id, "GitHub connected", null);
    return adminPage(p, { ok: true, text: "GitHub is connected. The company Brain and yours are made." });
  }
  async function inviteSomeone(req, p) {
    const f = await form(req);
    const l = await licence({ check: false });
    if (l && l.withdrawn) return adminPage(p, { text: "The licence was withdrawn: nobody can be invited." });
    const b = await brainsOf();
    if (!b) return adminPage(p, { text: "Connect GitHub first." });
    const role = f.get("role") === "admin" ? "admin" : "member";
    const added = await people.add({ name: f.get("name"), email: f.get("email"), role, flavor: f.get("flavor"), by: p.id, licence: l && l.licence });
    if (added.problem) return adminPage(p, { text: added.problem });
    const x = added.person;
    x.repo = brainRepoName(x);
    await people.update(x);
    try {
      await b.ensurePerson(x, () => people.update(x));
    } catch (e) {
      return adminPage(p, { text: `${x.name} is invited, but their Brain could not be made yet: ${e.message}. It is made when GitHub answers.` });
    }
    const url = `${base}/invite?t=${added.invite}`;
    if (!await sendInvitation(p, x, url)) return adminPage(p, { text: `${x.name} is invited, but the email could not be sent. Press Email a new invitation next to their name in a minute.` });
    return adminPage(p, { ok: true, text: `${x.name} is invited: the invitation went to ${x.email}.` });
  }
  async function sendInvitation(p, x, url) {
    try {
      await email.send({ to: x.email, subject: `${(await settingsOf()).company}: your Second Brain`, text: `${p.name} invited you to your company's Second Brain. Open this link to join (it works once, for 14 days):

${url}` });
      return true;
    } catch {
      log({ event: "email failed" });
      return false;
    }
  }
  async function personAction(p, id, act, req) {
    const x = await people.person(id);
    if (!x || x.status === "removed") return adminPage(p, { text: "Not in the workspace." });
    if (act === "flavor") return changeFlavor(p, x, (await form(req)).get("flavor"));
    if (act === "owner") return handOver(p, x, await form(req));
    if (x.role === "owner" || x.role === "admin" && p.role !== "owner") return adminPage(p, { text: "Only the owner can do that." });
    if (act === "remove") {
      const r = await people.remove(id, p.id);
      return adminPage(p, r.problem ? { text: r.problem } : { ok: true, text: `${x.name} is removed. Their seat is free, and every app they connected stopped working for them.` });
    }
    if (act === "signout") {
      if (x.status !== "active") return adminPage(p, { text: `${x.name} has not joined yet.` });
      await people.signOutAll(id, p.id);
      return adminPage(p, { ok: true, text: `${x.name} is signed out everywhere: every browser and app they connected stopped. They keep their seat and their Brain, and sign in again with their email.` });
    }
    if (act === "link") {
      if (x.status === "invited") {
        const url = `${base}/invite?t=${await people.invite(id)}`;
        if (!await sendInvitation(p, x, url)) return adminPage(p, { text: "The email could not be sent. Try again in a minute." });
        await people.audit(p.id, "sent an invitation again", x.id);
        return adminPage(p, { ok: true, text: `A new invitation went to ${x.email}. The earlier one no longer works.` });
      }
      const t = await people.signInLink(id);
      try {
        await email.send({ to: x.email, subject: `${(await settingsOf()).company}: sign in to your Second Brain`, text: `Open this link to sign in to your company's Second Brain (it works once):

${base}/signin/link?t=${t}` });
      } catch {
        log({ event: "email failed" });
        return adminPage(p, { text: "The email could not be sent. Try again in a minute." });
      }
      await people.audit(p.id, "sent a sign-in link", x.id);
      return adminPage(p, { ok: true, text: `A sign-in link went to ${x.name}'s email.` });
    }
    return adminPage(p, { text: "Unknown action." });
  }
  async function changeFlavor(p, x, flavor) {
    if (x.id !== p.id && (x.role === "owner" || x.role === "admin" && p.role !== "owner")) return adminPage(p, { text: "Only the owner can do that." });
    const l = await licenceOf();
    if (!l || !l.licence.flavors.includes(flavor)) return adminPage(p, { text: "Your licence does not include that way of working." });
    if (flavor === x.flavor) return adminPage(p);
    const r = await people.change(x.id, { flavor }, p.id);
    if (r.problem) return adminPage(p, { text: r.problem });
    const local = flavor === "local-first";
    if (x.id === p.id) return adminPage(r.person, { ok: true, text: `You now work ${local ? "on your computer" : "in your chat"}. Your own page shows how to start.` });
    let told = false;
    if (x.status === "active") {
      try {
        await email.send({ to: x.email, subject: `${(await settingsOf()).company}: how you use your Second Brain changed`, text: `${p.name} changed how you use your company's Second Brain: you now use it ${local ? "on your computer, with the Second Brain app" : "in your chat, with Claude or ChatGPT"}. Your Brain stays as it is. Your page shows how to start:

${base}/welcome` });
        told = true;
      } catch {
        log({ event: "email failed" });
      }
    }
    return adminPage(p, { ok: true, text: `${x.name} now works ${local ? "on their computer" : "in their chat"}.${told ? " An email told them how to start." : ""}` });
  }
  async function handOver(p, x, f) {
    if (p.role !== "owner") return adminPage(p, { text: "Only the owner can do that." });
    if (f.get("confirm") !== "yes") {
      return html(200, await page("Hand over", `<h1>Make ${esc(x.name)} the owner?</h1><p>${esc(x.name)} then manages the workspace, its updates and its backup, and can get back in with the licence. You stay as an admin.</p><form method="post" action="/admin/people/${esc(x.id)}/owner" class="panel">${hidden({ confirm: "yes" })}<label class="check"><input type="checkbox" name="leave" value="yes"> I am leaving: remove me from the workspace</label><button>Make ${esc(x.name)} the owner</button></form><p><a href="/admin">Cancel</a></p>`, { narrow: true }));
    }
    const leave = f.get("leave") === "yes";
    const r = await people.handOver(p.id, x.id, { leave });
    if (r.problem) return adminPage(p, { text: r.problem });
    try {
      await email.send({ to: x.email, subject: `${(await settingsOf()).company}: you are the owner of your Second Brain`, text: `${p.name} made you the owner of your company's Second Brain. You now manage its people, updates and backup:

${base}/admin` });
    } catch {
      log({ event: "email failed" });
    }
    if (leave) return redirect("/", { "set-cookie": clearCookie });
    return adminPage(await people.person(p.id), { ok: true, text: `${x.name} is the owner now, and you are an admin.` });
  }
  const JOINED = ["skill-map.md", COMPANY_SETUP_FILE];
  async function preparedStep(req, p) {
    const f = await form(req);
    const l = await licence();
    const r = await readPrepared(f.get("prepared") || "", releaseKeys, { licence: l && l.licence, now: now() });
    if (r.problem) return adminPage(p, { text: r.problem });
    const app = await appOf();
    const settings = await settingsOf();
    if (!app || !app.installationId) return adminPage(p, { text: "Connect GitHub first: the prepared Brain goes into the company Brain." });
    const client = gh.as(app);
    let there;
    try {
      there = new Set((await client.files(settings.companyRepo)).files.map((x) => x.path));
    } catch (e) {
      return adminPage(p, { text: `GitHub did not answer as expected: ${e.message}` });
    }
    const { name, files } = r.prepared;
    const skills = liveCompanySkills((files.find((x) => x.path === "skill-map.md") || {}).text, new Set(files.map((x) => x.path)));
    const holds = readCompanySetup((files.find((x) => x.path === COMPANY_SETUP_FILE) || {}).text || "");
    const heldPeople = holds && holds.prepared && Array.isArray(holds.prepared.people) ? holds.prepared.people.length : 0;
    if (f.get("confirm") !== "yes") {
      const joins = (x) => there.has(x.path) && JOINED.includes(x.path);
      const row = (x) => `<li><code>${esc(x.path)}</code>${joins(x) ? ' <span class="muted">adds to the one there</span>' : there.has(x.path) ? ' <span class="muted">replaces the one there</span>' : ""}</li>`;
      const joined = files.filter(joins).length;
      return html(200, await page("Prepared Brain", `<h1>Add ${esc(name)} to the company Brain?</h1><p>${files.length} files: ${files.filter((x) => !there.has(x.path)).length} new, ${files.filter((x) => there.has(x.path) && !joins(x)).length} replacing the ones there${joined ? `, ${joined} adding to the ones there` : ""}. Everything stays in your GitHub, with its history.</p>${holds ? `<p>It sets up <b>${esc(holds.company.brainName || holds.company.name)}</b> for everyone: your company's name, look and what never goes into an AI${heldPeople ? `, and what we prepared for ${heldPeople} of your people` : ""}.</p>` : ""}${skills.length ? `<h2>Skills for everyone</h2><ul>${skills.map((x) => `<li><b>${esc(x.name)}</b>${x.use ? `: ${esc(x.use)}` : ""}</li>`).join("")}</ul>` : ""}<details class="panel"><summary>Every file</summary><ul>${files.map(row).join("")}</ul></details><form method="post" action="/admin/prepared">${hidden({ prepared: r.text, confirm: "yes" })}<button>Add to the company Brain</button></form><p><a href="/admin">Cancel</a></p>`));
    }
    let added;
    const joinedWith = async (x) => {
      if (!JOINED.includes(x.path)) return x;
      const held = await client.read(settings.companyRepo, x.path);
      if (!held) return x;
      if (x.path === "skill-map.md") return { path: x.path, text: skillMapJoined(x.text, held.text) };
      const v = companySetupJoined(x.text, held.text);
      return v ? { path: x.path, text: `${JSON.stringify(v, null, 2)}
` } : x;
    };
    try {
      added = await changeCompanyBrain(client, settings.companyRepo, async () => ({ files: await Promise.all(files.map(joinedWith)), message: `Add ${name}, prepared by Second Brain`, inline: true }));
    } catch (e) {
      return adminPage(p, { text: `The prepared Brain could not be added: ${e.message}` });
    }
    if (added.problem) return adminPage(p, { text: added.problem });
    await store.put("settings", { ...await settingsOf(), prepared: { name, files: files.length, at: new Date(now()).toISOString(), made: r.prepared.made } });
    await people.audit(p.id, "added the prepared Brain", name);
    return adminPage(p, { ok: true, text: `${name} is in the company Brain.${skills.length ? ` Its ${skills.length === 1 ? "skill reaches" : `${skills.length} skills reach`} everyone's AI.` : ""}` });
  }
  async function suggestionAction(p, number, act) {
    const app = await appOf();
    const settings = await settingsOf();
    if (!app || !app.installationId || !Number.isInteger(number)) return adminPage(p, { text: "Not found." });
    const client = gh.as(app);
    let skills = [];
    try {
      if (act === "approve") {
        skills = (await client.suggestionFiles(settings.companyRepo, number)).filter((f) => /^skills\/[^/]+\/SKILL\.md$/.test(f.path));
        await client.approve(settings.companyRepo, number);
      } else await client.decline(settings.companyRepo, number);
    } catch (e) {
      return adminPage(p, { text: e.message });
    }
    await store.del(`suggestion:${number}`);
    await people.audit(p.id, `${act}d a suggestion`, String(number));
    if (act !== "approve") return adminPage(p, { ok: true, text: "Declined." });
    let live;
    try {
      live = await mapSkills(client, settings.companyRepo, skills, p);
    } catch (e) {
      return adminPage(p, { text: `Approved, but its skill could not be marked live in the skill map: ${e.message}` });
    }
    return adminPage(p, { ok: true, text: `Approved: it is in the company Brain for everyone${live.length ? `, and ${live.length === 1 ? "its skill reaches" : `its ${live.length} skills reach`} everyone's AI` : ""}.` });
  }
  async function mapSkills(client, repo, changed, p) {
    if (!changed.length) return [];
    let live = [];
    const done = await changeCompanyBrain(client, repo, async () => {
      const held = await client.read(repo, "skill-map.md");
      let map = held ? held.text : "";
      live = [];
      for (const f of changed) {
        const id = f.path.split("/")[1];
        if (f.status === "removed") {
          map = skillMapWithout(map, id);
          continue;
        }
        const s = await client.read(repo, f.path);
        if (!s || !plainSkillText(s.text, id)) continue;
        map = skillMapWith(map, id, skillDescription(s.text), p.name);
        live.push(id);
      }
      return (held ? map !== held.text : live.length) ? { files: [{ path: "skill-map.md", text: map }], message: live.length ? `Make ${live.join(", ")} live` : "Take removed skills out of the skill map" } : null;
    });
    if (done && done.problem) throw new Error(done.problem);
    return live;
  }
  const BACKED_UP = ["person:", "settings", "licence", "github", "updates", "client:"];
  async function backup() {
    const out = { kind: "second-brain-connector-backup", v: 1, at: new Date(now()).toISOString(), version, records: {} };
    for (const prefix of BACKED_UP) for (const r of await store.list(prefix)) out.records[r.key] = r.value;
    return out;
  }
  async function restore(text2, p) {
    let b;
    try {
      b = JSON.parse(text2);
    } catch {
      return { problem: "That is not a workspace download." };
    }
    if (!b || b.kind !== "second-brain-connector-backup" || b.v !== 1 || !b.records || typeof b.records !== "object") return { problem: "That is not a workspace download." };
    const keys2 = Object.keys(b.records);
    if (!keys2.every((k) => BACKED_UP.some((x) => k === x || x.endsWith(":") && k.startsWith(x)))) return { problem: "That download holds something a workspace does not." };
    const owner = Object.values(b.records).find((v) => v && v.role === "owner");
    if (!owner || owner.email !== p.email) return { problem: "That download is from another owner's workspace." };
    for (const k of keys2) await store.put(k, b.records[k]);
    for (const x of await people.people()) await people.signOutAll(x.id, p.id);
    await people.audit(p.id, "workspace restored", null);
    return { ok: true };
  }
  async function saveCompanySetup(f, p) {
    const app = await appOf();
    const repo = (await settingsOf()).companyRepo;
    if (!app || !app.installationId || !repo) return { problem: "Connect GitHub first." };
    const client = gh.as(app);
    try {
      if (f.get("do") === "remove") {
        const gone = await changeCompanyBrain(client, repo, async () => await client.read(repo, COMPANY_SETUP_FILE) ? { files: [{ path: COMPANY_SETUP_FILE, text: null }], message: "Remove the company setup" } : null);
        if (gone && gone.problem) return gone;
        await people.audit(p.id, "company setup removed", null);
        return { text: "The company setup is removed. Everyone keeps their own Brain as it is." };
      }
      if (f.get("do") === "fields") {
        const said = (k, n) => String(f.get(k) || "").trim().slice(0, n);
        return brandCompany(p, { brainName: said("brainName", 60), colour: said("colour", 7), workFocus: said("workFocus", 300), neverInAi: String(f.get("neverInAi") || "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean) });
      }
      return { problem: "Nothing was changed." };
    } catch (e) {
      if (e instanceof GitHubError) {
        log({ event: "github", status: e.status });
        return { problem: "GitHub did not answer as expected. Try again in a minute." };
      }
      throw e;
    }
  }
  async function changeCompanyBrain(client, repo, make) {
    for (let tries = 0; tries < 3; tries++) {
      const base2 = (await client.head(repo)).commit;
      const change = await make();
      if (!change || change.problem) return change;
      try {
        await client.commit(repo, change.files, change.message, { base: base2, inline: !!change.inline });
        return change;
      } catch (e) {
        if (!(e instanceof GitHubError) || e.status !== 409 && e.status !== 422) throw e;
      }
    }
    return { problem: "The company Brain kept changing while this was saved. Try again in a minute." };
  }
  async function brandCompany(p, given) {
    const app = await appOf();
    const settings = await settingsOf();
    const repo = settings.companyRepo;
    if (!app || !app.installationId || !repo) return { problem: "Connect GitHub first." };
    if (!given || typeof given !== "object" || Array.isArray(given)) return { problem: 'Send {"company": {...}}.' };
    const client = gh.as(app);
    try {
      let setup = null;
      const saved = await changeCompanyBrain(client, repo, async () => {
        const held = await client.read(repo, COMPANY_SETUP_FILE);
        const was = held ? readCompanySetup(held.text) : null;
        const company = { ...was ? was.company : {} };
        for (const k of ["name", "shortName", "brainName", "colour", "logoData", "workFocus", "apps", "neverInAi", "recipes"]) if (given[k] !== void 0 && given[k] !== null) company[k] = given[k];
        if (!company.name) company.name = settings.company || "";
        if (!company.brainName) company.brainName = "Company Brain";
        if (!company.recipes || !Object.keys(company.recipes).length) company.recipes = company.workFocus ? { focus: company.workFocus } : {};
        const v = { schema: COMPANY_SETUP_SCHEMA, company, prepared: was ? was.prepared : null };
        const problems = companySetupProblems(v);
        if (problems.length) return { problem: `That can't be used: ${problems[0]}.` };
        setup = readCompanySetup(v);
        const text2 = `${JSON.stringify(setup, null, 2)}
`;
        return held && held.text === text2 ? null : { files: [{ path: COMPANY_SETUP_FILE, text: text2 }], message: "Save the company setup" };
      });
      if (saved && saved.problem) return saved;
      await people.audit(p.id, "company setup saved", null);
      return { text: `Saved. Everyone gets ${setup.company.name}'s setup the next time their Brain keeps in step.` };
    } catch (e) {
      if (e instanceof GitHubError) {
        log({ event: "github", status: e.status });
        return { problem: "GitHub did not answer as expected. Try again in a minute." };
      }
      throw e;
    }
  }
  async function preparedFor(p, cs) {
    const others = (await people.people()).filter((x) => x.id !== p.id && x.status !== "removed").map((x) => x.name);
    return preparedPerson(cs, { name: p.name, email: p.email }, others);
  }
  async function setupFileFor(p, text2) {
    const cs = readCompanySetup(text2);
    if (!cs) return null;
    const view = `${JSON.stringify(setupFor(cs, await preparedFor(p, cs)), null, 2)}
`;
    return { text: view, size: new TextEncoder().encode(view).length, sha: await blobSha(view) };
  }
  async function companySetupFor(p) {
    const cs = await companySetupNow();
    if (!cs) return null;
    const me = await preparedFor(p, cs);
    const c = cs.company;
    const all = cs.prepared && cs.prepared.understanding && typeof cs.prepared.understanding === "object" ? cs.prepared.understanding : null;
    return {
      brain_name: c.brainName || null,
      work_focus: c.workFocus || null,
      apps: c.apps,
      never_in_ai: c.neverInAi,
      prepared_for_you: me ? { role: me.role || null, work: me.work || null, style: me.style || [], recipes: me.recipes || [] } : null,
      // What was prepared for the whole company is everyone's start when nothing was prepared for this person.
      prepared_for_everyone: all ? { work: all.work || null, style: all.style || [], recipes: all.recipes || [] } : null,
      next: `Follow never_in_ai in everything.${me ? " Start the person's setup from prepared_for_you." : all ? " Start the person's setup from prepared_for_everyone." : ""}`
    };
  }
  const a0 = (m) => m.params && m.params.arguments && typeof m.params.arguments === "object" ? m.params.arguments : {};
  const FULL = (content.PRODUCT && content.PRODUCT.features ? content.PRODUCT.features : []).filter((f) => f.plan === "full").map((f) => f.id);
  let chat = null;
  const chatFor = () => chat ||= makeChat({
    SKILLS: content.SKILLS || {},
    BRAIN_RULES: content.BRAIN_RULES || "",
    PRODUCT: content.PRODUCT || { features: [], changes: [{ date: version }] },
    DASHBOARD: content.DASHBOARD || "",
    names: {},
    openFeatures: (who) => FULL.filter((id) => (who.features || []).includes(id)),
    hmac: () => {
      throw new Error("sign ahead with signedFor");
    },
    readWith: "with this connector's brain_list and brain_read"
  });
  const BRAIN_TOOLS = [
    { name: "brain_list", title: "List the Brain", description: "Lists the files of the person's Brain (which: mine) or of the company Brain (which: company): path and size, never content. folder narrows it, such as knowledge/.", inputSchema: { type: "object", properties: { which: { type: "string", enum: ["mine", "company"] }, folder: { type: "string", maxLength: 120 } } }, annotations: { readOnlyHint: true } },
    { name: "brain_read", title: "Read from the Brain", description: "Reads one file of the person's Brain or of the company Brain, as it is now.", inputSchema: { type: "object", properties: { path: { type: "string", maxLength: 200 }, which: { type: "string", enum: ["mine", "company"] } }, required: ["path"] }, annotations: { readOnlyHint: true } },
    { name: "brain_save", title: "Save to the Brain", description: "Saves files in the person's own Brain as one change, after their yes, following the Brain rules. text: the whole new text of the file. base: the commit brain_list gave, so a save made since is never overwritten. Read each file back after. To delete a file, use brain_delete.", inputSchema: { type: "object", properties: { files: { type: "array", maxItems: 50, items: { type: "object", properties: { path: { type: "string", maxLength: 200 }, text: { type: "string" } }, required: ["path", "text"] } }, message: { type: "string", maxLength: 200 }, base: { type: "string", maxLength: 64 } }, required: ["files", "message"] }, annotations: { readOnlyHint: false, destructiveHint: false } },
    // Deleting is its own tool, labelled as it is (#4795): each app sorts and permits a connector's tools by these labels.
    { name: "brain_delete", title: "Delete from the Brain", description: "Deletes files from the person's own Brain as one change, only when they asked for exactly that and said yes. Earlier versions stay in the Brain's history. base: the commit brain_list gave.", inputSchema: { type: "object", properties: { paths: { type: "array", maxItems: 50, items: { type: "string", maxLength: 200 } }, message: { type: "string", maxLength: 200 }, base: { type: "string", maxLength: 64 } }, required: ["paths", "message"] }, annotations: { readOnlyHint: false, destructiveHint: true } },
    { name: "brain_suggest", title: "Suggest a change to the company Brain", description: "Sends a change to the company Brain for the owner or an admin to approve, when the person asks. Never personal notes.", inputSchema: { type: "object", properties: { files: { type: "array", maxItems: 20, items: { type: "object", properties: { path: { type: "string", maxLength: 200 }, text: { type: ["string", "null"] } }, required: ["path", "text"] } }, title: { type: "string", maxLength: 120 }, why: { type: "string", maxLength: 1e3 } }, required: ["files", "title"] }, annotations: { readOnlyHint: false, destructiveHint: false } }
  ];
  const SAVING_TOOLS = [
    { name: "check_saving", title: "Check that saving works", description: "The first-save check of the person's Second Brain: saves one small file to their own Brain (.second-brain/records/connected.json) and reads it back, which proves that this app can save there. It is what the person asks for when they ask you to check, test or set up their Second Brain, or whether it can save. Tell the person its answer.", inputSchema: { type: "object", properties: {} }, annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true } },
    { name: "save_link", title: "Make a save link", description: "For when this app does not let you call check_saving, brain_save or brain_suggest. It changes nothing in a Brain: the text waits, sealed, on this connector for 30 minutes, and the link opens a page where the person, signed in, reads it and presses Save. files: each file's path and its whole new text, as brain_save takes them. suggest: true sends them to the company Brain as a suggestion, with its title and why. With no files, it only records that this app saves through the link. Give the person the link exactly as returned, and read each file back with brain_read once they say they pressed Save.", inputSchema: { type: "object", properties: { files: { type: "array", maxItems: SAVE_LINK.files, items: { type: "object", properties: { path: { type: "string", maxLength: 200 }, text: { type: "string" } }, required: ["path", "text"] } }, message: { type: "string", maxLength: 200 }, suggest: { type: "boolean" }, title: { type: "string", maxLength: 120 }, why: { type: "string", maxLength: 1e3 } } }, annotations: { readOnlyHint: true } }
  ];
  const modeOf = (p, app) => ((p.saving || {})[app] || {}).mode || null;
  const COMPANY_SKILL_TOOL = { name: "company_skill", title: "Read a company skill", description: "Reads one of the company's own skills, listed under company_skills in setup_status, with the Brain rules. Follow the rules and the skill.", inputSchema: { type: "object", properties: { name: { type: "string", maxLength: 64 } }, required: ["name"] }, annotations: { readOnlyHint: true } };
  async function companySkills(p) {
    const b = await brainsOf();
    if (!b) return [];
    const r = await b.list(p, "company");
    const had = await store.get("company-skills");
    if (had && had.commit === r.commit) return had.skills;
    const paths = new Set(r.files.map((f) => f.path));
    const map = paths.has("skill-map.md") ? await b.read(p, "skill-map.md", "company") : null;
    const skills = liveCompanySkills(map && map.text, paths);
    await store.put("company-skills", { commit: r.commit, skills });
    return skills;
  }
  async function ownSkills(p) {
    const b = await brainsOf();
    if (!b) return [];
    return (await b.list(p, "mine")).files.map((f) => (/^\.claude\/skills\/([a-z0-9][a-z0-9-]{0,59})\/SKILL\.md$/.exec(f.path) || [])[1]).filter(Boolean);
  }
  async function companySkill(p, name) {
    let live;
    try {
      live = await companySkills(p);
    } catch (e) {
      if (e instanceof GitHubError) return { problem: "GitHub did not answer as expected. Try again in a minute." };
      throw e;
    }
    if (typeof name !== "string" || !live.some((x) => x.name === name)) return { problem: "No company skill of that name is live. setup_status lists them under company_skills." };
    const b = await brainsOf();
    const f = await b.read(p, `skills/${name}/SKILL.md`, "company");
    if (f.problem) return f;
    if (!plainSkillText(f.text, name)) return { problem: "This skill holds more than written steps, so it is not served here. Ask the owner to check it." };
    return { text: `${content.BRAIN_RULES || ""}

---

This is ${name}, one of the company's own skills, from its company Brain. Its other files, such as tests.md, are in the company Brain under skills/${name}/: read them with brain_read (which: company).

${f.text}` };
  }
  async function savingFor(p, app) {
    const s = (p.saving || {})[app] || {};
    if (s.mode === "direct") return { state: "direct", next: "Save with brain_save." };
    const viaLink = "Wherever a skill, the dashboard or the Brain rules say brain_save or brain_suggest, call save_link instead, give the person its link, and read each file back with brain_read once they say they pressed Save.";
    if (s.mode === "link") {
      const again = now() - (s.asked || 0) >= RETRY_DIRECT;
      if (again) await setSaving(p.id, app, { asked: now() });
      return { state: "save_link", next: `${again ? "First call check_saving once. If it answers, tell the person saving works directly now, and save with brain_save. If you have no check_saving tool or this app refuses the call: " : ""}This app does not let you save directly. ${viaLink}` };
    }
    return { state: "not_checked", next: `Saving from this app is not checked yet. If the person asked you to check, test or set up their Second Brain, call check_saving now and tell them its answer in one line. If they asked for something else, do that, then tell them in one line that saving is not checked yet and ask whether to check it now: it saves one small file to their Brain and reads it back. If you have no check_saving tool, or this app refuses the call, call save_link with no files and tell the person what it says. ${viaLink.replace("Wherever", "From then on, wherever")}` };
  }
  function textFiles(files, most) {
    if (!Array.isArray(files) || !files.length) return { problem: "Name at least one file." };
    if (files.length > most) return { problem: `At most ${most} files at once.` };
    const out = [];
    let size2 = 0;
    for (const f of files) {
      const path = brainPath(f && f.path);
      if (!path) return { problem: `${String(f && f.path).slice(0, 80)} is not a place in a Brain.` };
      if (typeof f.text !== "string") return { problem: `Give ${path} its text.` };
      size2 += new TextEncoder().encode(f.text).length;
      out.push({ path, text: f.text });
    }
    if (size2 > MOST_FILE) return { problem: "That is too much text for one save link. Send fewer files." };
    return { files: out };
  }
  async function checkSaving(p, app, b) {
    const had = await b.read(p, CHECK_FILE);
    let record = {};
    try {
      record = had.text ? JSON.parse(had.text) : {};
    } catch {
      record = {};
    }
    if (!record || typeof record !== "object" || Array.isArray(record)) record = {};
    const text2 = `${JSON.stringify({ ...record, [app]: stamp() }, null, 1)}
`;
    const r = await b.save(p, [{ path: CHECK_FILE, text: text2 }], `Check that saving works from ${app === "other" ? "this app" : APP_NAMES[app]}`);
    if (!r.saved) return r;
    const back = await b.read(p, CHECK_FILE);
    if (back.text !== text2) return { problem: "The save did not read back. Try again in a minute." };
    const was = modeOf(p, app);
    await setSaving(p.id, app, { mode: "direct", at: stamp() });
    await people.audit(p.id, `checked saving from ${APP_NAMES[app]}: saved and read back`, null);
    return { connected: true, text: SAVED_AND_READ_BACK, ...was === "link" ? { say: "Tell the person: saving works directly here now, so the save link is no longer needed." } : {} };
  }
  async function saveLink(p, app, a) {
    const was = modeOf(p, app);
    const first = was !== "link";
    const name = app === "other" ? "This app" : APP_NAMES[app];
    if (first) {
      await setSaving(p.id, app, { mode: "link", at: stamp(), asked: was === "direct" ? 0 : now() });
      await people.audit(p.id, `saves from ${APP_NAMES[app]} go through the save link`, null);
    }
    const say = first && was !== "direct" ? { say: `Tell the person once, in your own words: connected. ${name} does not let me save to your Brain directly here, so from now on saves go through a save link: I write the text, you open the link and press Save. If you use ${name === "This app" ? "it" : name} in a company workspace, its admin can allow saving for this connector.` } : {};
    if (!Array.isArray(a.files) || !a.files.length) return { saving: "save_link", ...say, next: "For each save, call save_link with the files." };
    const t = textFiles(a.files, SAVE_LINK.files);
    if (t.problem) return t;
    const suggest = a.suggest === true;
    const wrong = suggest && companySkillProblem(t.files);
    if (wrong) return { problem: wrong };
    const draft = { kind: suggest ? "suggest" : "save", files: t.files, message: String(a.message || "").slice(0, 200), title: String(a.title || "").slice(0, 100), why: String(a.why || "").slice(0, 1e3) };
    const waiting = (await store.list(`draft:${p.id}:`)).sort((x, y) => x.value.exp - y.value.exp);
    for (const [i, w] of waiting.entries()) if (w.value.exp <= now() || i < waiting.length - (SAVE_LINK.each - 1)) await store.del(w.key);
    const id = randomToken(18);
    await store.put(`draft:${p.id}:${await sha256(id)}`, { person: p.id, sealed: await seal(secret, JSON.stringify(draft)), exp: now() + SAVE_LINK.lasts });
    return { link: `${base}/save/${id}`, ends: "in 30 minutes", ...say, next: `Give the person this link exactly as it is. They open it, signed in to their Second Brain, and press ${suggest ? "Send" : "Save"}. Once they say they did, ${suggest ? "tell them it waits for their owner or an admin to approve" : "read each file back with brain_read"}.` };
  }
  async function suggestChange(p, files, title, why) {
    if (files.some((f) => f.path === COMPANY_SETUP_FILE)) return { problem: "The company setup is changed only by the owner, on the company's own page." };
    const wrong = companySkillProblem(files);
    if (wrong) return { problem: wrong };
    const app = await appOf();
    const settings = await settingsOf();
    const r = await gh.as(app).suggest(settings.companyRepo, files, { title: `${String(title || "A suggestion").slice(0, 100)} (from ${p.name})`, body: String(why || "").slice(0, 1e3), branch: `suggest/${p.id}-${randomToken(4).toLowerCase().replace(/[^a-z0-9]/g, "")}` });
    const skills = files.map((f) => [f, f.path.match(/^skills\/([^/]+)\/SKILL\.md$/)]).filter(([, m]) => m).map(([f, m]) => ({ name: m[1], description: f.text === null ? null : skillDescription(f.text) }));
    if (skills.length) await store.put(`suggestion:${r.number}`, { skills });
    await people.audit(p.id, "suggested a change to the company Brain", String(r.number));
    return { suggested: true, number: r.number, message: "Sent to the owner and admins to approve." };
  }
  async function brainCall(p, name, a, { chat: chat2 = null } = {}) {
    const b = await brainsOf();
    if (!b) return { problem: "The company has not connected GitHub yet. Ask your owner." };
    const which = a.which === "company" ? "company" : "mine";
    try {
      if (name === "brain_list") {
        const r = await b.list(p, which);
        const folder = typeof a.folder === "string" && a.folder ? a.folder.replace(/^\/+/, "") : "";
        let files = folder ? r.files.filter((f) => f.path.startsWith(folder)) : r.files;
        if (which === "company" && files.some((f) => f.path === COMPANY_SETUP_FILE)) {
          const held = await b.read(p, COMPANY_SETUP_FILE, "company");
          const view = held.problem ? null : await setupFileFor(p, held.text);
          files = files.flatMap((f) => f.path !== COMPANY_SETUP_FILE ? [f] : view ? [{ path: f.path, size: view.size, sha: view.sha }] : []);
        }
        return { ...r, files };
      }
      if (name === "brain_read") {
        const r = await b.read(p, a.path, which);
        if (which !== "company" || r.path !== COMPANY_SETUP_FILE) return r;
        const view = await setupFileFor(p, r.text);
        return view ? { which, path: r.path, text: view.text, sha: view.sha } : { problem: "No such file.", missing: true };
      }
      if (name === "brain_save") {
        const changes = Array.isArray(a.files) ? a.files : a.changes;
        if (chat2 && Array.isArray(changes) && changes.some((c) => c && c.text === null)) return { problem: "brain_save saves text. To delete a file, use brain_delete." };
        const r = await b.save(p, changes, a.message, typeof a.base === "string" ? a.base : void 0);
        if (r.saved) await people.audit(p.id, `saved ${r.saved.length} file${r.saved.length === 1 ? "" : "s"}`, null);
        if (r.saved && chat2 && modeOf(p, chat2) !== "direct") await setSaving(p.id, chat2, { mode: "direct", at: stamp() });
        return r;
      }
      if (name === "brain_delete") {
        const paths = Array.isArray(a.paths) ? a.paths : [];
        if (!paths.length) return { problem: "Name at least one file to delete." };
        for (const path of paths.slice(0, 50)) {
          const f = await b.read(p, path);
          if (f.problem) return { problem: `${String(path).slice(0, 80)}: ${f.problem}`, missing: f.missing };
        }
        const r = await b.save(p, paths.map((path) => ({ path, text: null })), a.message || "Delete from Second Brain", typeof a.base === "string" ? a.base : void 0);
        if (!r.saved) return r;
        await people.audit(p.id, `deleted ${r.saved.length} file${r.saved.length === 1 ? "" : "s"}`, null);
        return { deleted: r.saved, commit: r.commit };
      }
      if (name === "check_saving") return checkSaving(p, chat2, b);
      if (name === "brain_suggest") {
        const files = Array.isArray(a.files) ? a.files : [];
        const out = [];
        for (const f of files) {
          const path = brainPath(f && f.path);
          if (!path || f.text !== null && typeof f.text !== "string") return { problem: `${String(f && f.path).slice(0, 80)} is not a place in a Brain.` };
          out.push({ path, text: f.text });
        }
        if (!out.length) return { problem: "Name at least one file." };
        return suggestChange(p, out, a.title, a.why);
      }
    } catch (e) {
      if (e instanceof GitHubError) {
        log({ event: "github", status: e.status });
        return { problem: e.status === 404 ? "That Brain is not there yet. Ask your owner." : "GitHub did not answer as expected. Try again in a minute.", status: e.status };
      }
      throw e;
    }
    return { problem: "Unknown call." };
  }
  async function mcp(req) {
    if (req.method !== "POST") return new Response(null, { status: 405 });
    const s = await signedIn(req);
    if (!s) return unauthorized();
    const p = s.person;
    const l = await licence();
    if (!l || l.withdrawn) return json(403, { error: "licence_withdrawn", error_description: "This company's licence is not active. Ask your owner." });
    const sent = await body(req);
    const wrong = (code, msg) => json(400, { jsonrpc: "2.0", id: null, error: { code, message: msg } });
    if (sent === void 0) return wrong(-32700, "Parse error");
    if (!sent || typeof sent !== "object" || Array.isArray(sent) || typeof sent.method !== "string") return wrong(-32600, "Invalid Request");
    const m = { ...sent, params: sent.params && typeof sent.params === "object" && !Array.isArray(sent.params) ? sent.params : {} };
    if (m.method.startsWith("notifications/") || m.id === void 0) return new Response(null, { status: 202 });
    const ok = (result) => json(200, { jsonrpc: "2.0", id: m.id, result });
    const lic = l.licence;
    const plan = lic.plan === "full" ? "accelerator" : "starter";
    const cloud = p.flavor === "cloud-first";
    const who = { u: p.id, planName: lic.plan === "full" ? "Full" : "Base", features: lic.plan === "full" ? [...FULL, ...lic.features] : lic.features };
    const c = chatFor();
    if (m.method === "initialize") return ok({ protocolVersion: typeof m.params.protocolVersion === "string" ? m.params.protocolVersion : "2025-06-18", capabilities: { tools: {}, prompts: {}, resources: {} }, serverInfo: { name: "second-brain", version }, instructions: `This is ${lic.company.name}'s Second Brain. Call setup_status first: it says what the person has and how saving works in this app, and you do what its saving.next says. A person who asks you to check their Second Brain is asking for check_saving too. Read their Brain only with brain_list and brain_read, save it with brain_save, or with save_link when setup_status says so, and delete from it only with brain_delete. Read a skill with get_skill before following it, with the Brain rules it returns, one of the company's own skills (company_skills in setup_status) with company_skill, and one of the person's own (own_skills in setup_status) with brain_read at .claude/skills/<name>/SKILL.md. When setup_status has company_setup, never put what its never_in_ai lists into an answer or a tool, and start the person's setup from prepared_for_you, or from prepared_for_everyone when that is empty, instead of asking again. ${cloud ? "When the person asks for their dashboard, call open_dashboard. When the dashboard asks to read the Brain, read it with brain_list and brain_read, and pass it to show_brain with its request id." : ""}` });
    if (m.method === "ping") return ok({});
    if (m.method === "tools/list") return ok({ tools: [{ name: "setup_status", description: "Who is signed in, their company, which skills they can use, and the company's own setup when it has one: what never goes into an AI and what was prepared for this person.", inputSchema: { type: "object", properties: {} }, annotations: { readOnlyHint: true } }, ...BRAIN_TOOLS, ...SAVING_TOOLS, COMPANY_SKILL_TOOL, ...c.chatTools(plan, true).filter((t) => cloud || !["open_dashboard", "show_counts", "show_task", "show_brain"].includes(t.name))] });
    if (m.method === "tools/call") {
      const a = m.params.arguments && typeof m.params.arguments === "object" ? m.params.arguments : {};
      const text2 = (t, e) => ok({ isError: !!e, content: [{ type: "text", text: typeof t === "string" ? t : JSON.stringify(t) }] });
      const app = await appKeyOf(s.client);
      if (m.params.name === "setup_status") {
        const cs = await companySetupFor(p);
        let own = [];
        let mine = [];
        try {
          own = await companySkills(p);
          mine = await ownSkills(p);
        } catch (e) {
          if (!(e instanceof GitHubError)) throw e;
        }
        return text2({ company: lic.company.name, name: p.name, role: p.role, works: p.flavor, plan: who.planName, skills: c.allowedSkills(plan), company_skills: own.map((x) => ({ name: x.name, use: x.use })), own_skills: mine, saving: await savingFor(p, app), ...cs ? { company_setup: cs } : {} });
      }
      if (m.params.name === "company_skill") {
        const r = await companySkill(p, a.name);
        return r.problem ? text2(r.problem, true) : text2(r.text);
      }
      if (m.params.name === "save_link") {
        const r = await saveLink(p, app, a);
        return text2(r, !!r.problem);
      }
      if (m.params.name === "check_saving" || BRAIN_TOOLS.some((t) => t.name === m.params.name)) {
        const r = await brainCall(p, m.params.name, a, { chat: app });
        return text2(r, !!r.problem);
      }
    }
    const signed = /* @__PURE__ */ new Map();
    for (const t of [`mine ${p.id}`, ...typeof a0(m).task === "string" ? [`fold ${p.id} ${a0(m).task}`] : []]) signed.set(t, await hmac(secret, t));
    const said = c.answer(m, who, plan, lic.company.name, true, (t) => {
      if (!signed.has(t)) throw new Error("unsigned name");
      return signed.get(t);
    });
    if (said) return said.error ? json(200, { jsonrpc: "2.0", id: m.id, error: said.error }) : ok(said.result);
    return json(200, { jsonrpc: "2.0", id: m.id, error: { code: -32601, message: "unknown" } });
  }
  async function api(req, path) {
    const p = await bearer(req, COMPUTER_CLIENT);
    if (!p) return unauthorized();
    const l = await licence();
    if (!l || l.withdrawn) return json(403, { error: "licence_withdrawn" });
    if (path === "/api/me") return json(200, { id: p.id, name: p.name, role: p.role, works: p.flavor, company: l.licence.company.name, plan: l.licence.plan, features: l.licence.features });
    if (path === "/api/company-setup") {
      if (req.method !== "POST") return json(404, { error: "not_found" });
      if (p.role !== "owner") return json(400, { problem: "Only the owner changes the company setup." });
      const r2 = await brandCompany(p, (await body(req) || {}).company);
      return json(r2.problem ? 400 : 200, r2.problem ? r2 : { ok: true });
    }
    const q = new URL(req.url).searchParams;
    const call = { "/api/brain/files": "brain_list", "/api/brain/file": "brain_read", "/api/brain/save": "brain_save", "/api/brain/suggest": "brain_suggest" }[path];
    if (!call) return json(404, { error: "not_found" });
    const a = req.method === "POST" ? await body(req) || {} : { which: q.get("which"), path: q.get("path"), folder: q.get("folder") };
    const r = await brainCall(p, call, a);
    return json(r.problem ? r.conflict ? 409 : r.missing ? 404 : r.status >= 500 || r.status === 429 ? 503 : 400 : 200, r);
  }
  const unix = (t) => String(t).replace(/\r\n?/g, "\n");
  async function savePage(req, id) {
    const narrow = { narrow: true };
    const p = await browserPerson(req);
    if (!p) return req.method === "GET" ? redirect(`/signin?next=${encodeURIComponent(`/save/${id}`)}`) : html(403, await page("Not allowed", "<h1>Not allowed</h1>"));
    const l = await licenceOf();
    if (!l || l.withdrawn) return html(403, await page("Not active", "<h1>Your company's Second Brain is not active</h1><p>Ask your owner.</p>", narrow));
    const ended = async () => html(404, await page("Save link", "<h1>This save link has ended</h1><p>A save link works once, for 30 minutes, for the person it was made for. Ask your AI for a new one.</p>", narrow));
    const key = `draft:${p.id}:${await sha256(id)}`;
    const held = await store.get(key);
    if (!held || held.exp <= now()) return ended();
    const draft = JSON.parse(await unseal(secret, held.sealed));
    const suggest = draft.kind === "suggest";
    const b = await brainsOf();
    if (!b) return html(503, await page("Not ready", "<h1>Your company has not connected GitHub yet</h1><p>Ask your owner.</p>", narrow));
    const show = async (msg, files2 = draft.files) => {
      const fields = [];
      for (const [i, f2] of files2.entries()) {
        let there = false;
        if (!suggest) {
          try {
            there = !(await b.read(p, f2.path)).missing;
          } catch {
            there = false;
          }
        }
        fields.push(`<label for="text${i}"><code>${esc(f2.path)}</code>${there ? ' <span class="tag">replaces the file there now</span>' : ""}</label><textarea id="text${i}" name="text${i}" required>
${esc(f2.text)}</textarea>`);
      }
      return html(msg ? 400 : 200, await page(suggest ? "Suggest" : "Save", `<h1>${suggest ? "Suggest to the company Brain" : "Save to your Brain"}</h1>${message(msg)}<form method="post" action="/save/${esc(id)}" class="panel">${suggest && draft.title ? `<p><b>${esc(draft.title)}</b></p>` : ""}${fields.join("")}<div class="row"><button name="do" value="save">${suggest ? "Send" : "Save"}</button><button class="quiet" name="do" value="discard" formnovalidate>${suggest ? "Don't send" : "Don't save"}</button></div></form>`));
    };
    if (req.method === "GET") return show();
    if (req.method !== "POST") return new Response(null, { status: 405 });
    if (!sameSite(req)) return html(403, await page("Not allowed", "<h1>Not allowed</h1>"));
    const f = await form(req);
    if (!await store.take(key)) return ended();
    if (f.get("do") === "discard") return html(200, await page("Not saved", `<h1>${suggest ? "Not sent" : "Not saved"}</h1>`, narrow));
    const files = draft.files.map((x, i) => {
      const sent = f.get(`text${i}`);
      return { path: x.path, text: sent === null || unix(sent) === unix(x.text) ? x.text : unix(sent) };
    });
    const keep = async (text2) => {
      await store.put(key, { ...held, sealed: await seal(secret, JSON.stringify({ ...draft, files })) });
      return show({ text: text2 }, files);
    };
    const t = textFiles(files, SAVE_LINK.files);
    if (t.problem) return keep(t.problem);
    try {
      if (suggest) {
        const r = await suggestChange(p, files, draft.title, draft.why);
        if (r.problem) return keep(r.problem);
      } else {
        const r = await b.save(p, files, draft.message || "Save through the save link");
        if (!r.saved) return keep(r.problem);
        await people.audit(p.id, `saved ${r.saved.length} file${r.saved.length === 1 ? "" : "s"} through the save link`, null);
      }
    } catch (e) {
      if (!(e instanceof GitHubError)) throw e;
      log({ event: "github", status: e.status });
      return keep("GitHub did not answer as expected. Try again in a minute.");
    }
    return html(200, await page("Saved", `<h1>${suggest ? "Sent to your owner and admins to approve" : "Saved to your Brain"}</h1><ul>${files.map((x) => `<li><code>${esc(x.path)}</code></li>`).join("")}</ul><p>Go back to your chat.</p>`, narrow));
  }
  async function handle(req) {
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    const method = req.method;
    if (path === "/.well-known/second-brain-connector") return json(200, { mark: await markOf() });
    if (path === "/health") return json(200, { ok: true, version, owner: (await people.people()).some((x) => x.role === "owner") });
    if (path.startsWith("/.well-known/oauth-protected-resource")) return json(200, { resource: `${base}/mcp`, authorization_servers: [base], scopes_supported: ["brain"] });
    if (path.startsWith("/.well-known/oauth-authorization-server") || path.startsWith("/.well-known/openid-configuration")) return json(200, { issuer: base, authorization_endpoint: `${base}/authorize`, token_endpoint: `${base}/token`, registration_endpoint: `${base}/register`, authorization_response_iss_parameter_supported: true, response_types_supported: ["code"], grant_types_supported: ["authorization_code", "refresh_token"], code_challenge_methods_supported: ["S256"], token_endpoint_auth_methods_supported: ["none"], scopes_supported: ["brain"] });
    if (path === "/register" && method === "POST") {
      const m = await body(req);
      const uris = m && Array.isArray(m.redirect_uris) ? m.redirect_uris.filter((u) => typeof u === "string") : [];
      if (!uris.length || uris.length > 10 || !uris.every(allowedRedirect)) return json(400, { error: "invalid_redirect_uri", error_description: "Sign-ins return only to Claude, ChatGPT or this computer." });
      const id = randomToken(18);
      await store.put(`client:${id}`, { id, redirects: uris, name: String(m && m.client_name || "").slice(0, 80), at: new Date(now()).toISOString() });
      return json(201, { client_id: id, client_name: String(m && m.client_name || "").slice(0, 80), redirect_uris: uris, token_endpoint_auth_method: "none", grant_types: ["authorization_code", "refresh_token"], response_types: ["code"] });
    }
    if (path === "/token" && method === "POST") return token(req);
    if (path === "/mcp") return mcp(req);
    if (path.startsWith("/api/")) return api(req, path);
    if (path === "/authorize") {
      const q = method === "POST" ? await form(req) : url.searchParams;
      const a = await authorizeRequest(q);
      if (a.problem) return html(400, await page("Sign in", `<h1>That sign-in can't go on</h1><p>${esc(a.problem)}</p>`, { narrow: true }));
      const p2 = await browserPerson(req);
      const l = await licenceOf();
      if (!p2) return signInPage(`/authorize?${new URLSearchParams(a.fields)}`);
      if (!l || l.withdrawn) return html(403, await page("Not active", "<h1>Your company's Second Brain is not active</h1><p>Ask your owner.</p>", { narrow: true }));
      if (method === "GET") return html(200, await page("Connect", `<h1>Connect ${esc(appName2(a.fields.redirect_uri))}</h1><p>${esc(appName2(a.fields.redirect_uri).replace(/^./, (c) => c.toUpperCase()))} will read and save your Brain as <b>${esc(p2.name)}</b>.</p><form method="post" action="/authorize" class="panel">${hidden(a.fields)}<button>Connect</button></form>`, { narrow: true }));
      if (!sameSite(req)) return html(403, await page("Not allowed", "<h1>Not allowed</h1>"));
      return redirect(await issueCode(p2, a.fields));
    }
    if (!email && (path.startsWith("/admin") || path.startsWith("/signin"))) return needsEmail();
    if (path === "/signin" && method === "GET") return signInPage(nextOf(url.searchParams.get("next")));
    if (path === "/signin" && method === "POST") return emailSignIn(req);
    if (path === "/signin/code" && method === "POST") return emailCode(req);
    if (path === "/signin/link") return linkPage(req, "signin");
    if (path === "/invite") return linkPage(req, "invite");
    const sv = /^\/save\/([A-Za-z0-9_-]{20,60})$/.exec(path);
    if (sv) return savePage(req, sv[1]);
    if (path === "/signout" && method === "POST") {
      if (sameSite(req)) await people.endBrowser(cookieOf(req, COOKIE));
      return redirect("/", { "set-cookie": clearCookie });
    }
    const p = await browserPerson(req);
    if (path === "/" || path === "/welcome") {
      if (!(await people.people()).some((x) => x.role === "owner")) return redirect("/admin");
      return p ? welcome(p) : signInPage(path === "/welcome" ? "/welcome" : "/");
    }
    if (path === "/admin" && method === "GET" && !(await people.people()).some((x) => x.role === "owner")) return claimPage();
    if (path === "/admin/claim" && method === "POST") return claim(req);
    if (path === "/admin/recover" && method === "POST") return recover(req);
    if (path.startsWith("/admin")) {
      if (!p) return path === "/admin" ? html(200, await page("Sign in", `<h1>Sign in to manage the workspace</h1><p><a class="button" href="/signin?next=/admin">Sign in</a></p><details class="panel"><summary>I am the owner and can't sign in</summary><form method="post" action="/admin/recover"><label for="licence">The company licence</label><textarea id="licence" name="licence" required></textarea><label for="email">Your email</label><input id="email" name="email" type="email" required><button>Sign in</button></form></details>`, { narrow: true })) : redirect("/admin");
      if (!["owner", "admin"].includes(p.role)) return html(403, await page("Not allowed", '<h1>Only the owner and admins manage the workspace</h1><p><a href="/welcome">Your own way in</a></p>', { narrow: true }));
      if (method === "GET" && path === "/admin") return adminPage(p);
      if (method === "GET" && path === "/admin/github/back") return p.role === "owner" ? githubBack(req, p) : adminPage(p, { text: "Only the owner connects GitHub." });
      if (method === "GET" && path === "/admin/github/installed") return p.role === "owner" ? githubInstalled(req, p) : adminPage(p, { text: "Only the owner connects GitHub." });
      if (method === "GET" && path === "/admin/backup") {
        if (p.role !== "owner") return adminPage(p, { text: "Only the owner downloads the workspace." });
        await people.audit(p.id, "workspace downloaded", null);
        return new Response(JSON.stringify(await backup(), null, 1), { status: 200, headers: { "content-type": "application/json", "content-disposition": `attachment; filename="workspace-${new Date(now()).toISOString().slice(0, 10)}.json"`, "cache-control": "no-store", ...SECURITY } });
      }
      if (method !== "POST") return redirect("/admin");
      if (!sameSite(req)) return html(403, await page("Not allowed", "<h1>Not allowed</h1>"));
      if (path === "/admin/github/start") return p.role === "owner" ? githubStart(req, p) : adminPage(p, { text: "Only the owner connects GitHub." });
      if (path === "/admin/people") return inviteSomeone(req, p);
      if (path === "/admin/prepared") return p.role === "owner" ? preparedStep(req, p) : adminPage(p, { text: "Only the owner adds a prepared Brain." });
      let m2 = /^\/admin\/people\/([a-z0-9-]{1,60})\/(remove|link|signout|flavor|owner)$/.exec(path);
      if (m2) return personAction(p, m2[1], m2[2], req);
      m2 = /^\/admin\/suggestions\/(\d{1,7})\/(approve|decline)$/.exec(path);
      if (m2) return suggestionAction(p, Number(m2[1]), m2[2]);
      if (path === "/admin/updates") {
        if (p.role !== "owner") return adminPage(p, { text: "Only the owner installs updates." });
        const f = await form(req);
        const l = await licenceOf();
        const r = await up.act(f.get("do"), { mode: f.get("mode"), licence: l && !l.withdrawn ? l.licence : null, by: p.id });
        await people.audit(p.id, `updates: ${f.get("do")}`, null);
        return adminPage(p, r.problem ? { text: r.problem } : { ok: true, text: r.text });
      }
      if (path === "/admin/company-setup") {
        if (p.role !== "owner") return adminPage(p, { text: "Only the owner changes the company setup." });
        const r = await saveCompanySetup(await form(req), p);
        return adminPage(p, r.problem ? { text: r.problem } : { ok: true, text: r.text });
      }
      if (path === "/admin/restore") {
        if (p.role !== "owner") return adminPage(p, { text: "Only the owner restores the workspace." });
        const r = await restore((await form(req)).get("backup"), p);
        if (r.problem) return adminPage(p, { text: r.problem });
        return redirect("/admin", { "set-cookie": clearCookie });
      }
      return redirect("/admin");
    }
    return json(404, { error: "not_found" });
  }
  return {
    async fetch(req) {
      try {
        const res = await handle(req);
        log({ event: "request", method: req.method, path: new URL(req.url).pathname.replace(/[A-Za-z0-9_-]{20,}/g, "…"), status: res.status });
        return res;
      } catch (e) {
        log({ event: "error", path: new URL(req.url).pathname, error: String(e && e.name) });
        return json(500, { error: "Internal server error" });
      }
    },
    // For a host's daily schedule: check the licence, install an update in automatic mode, drop what has ended.
    async daily() {
      const l = await licence();
      await people.tidy();
      const u = await up.state();
      if (u.mode === "auto" && u.available && l && !l.withdrawn) await up.act("install", { licence: l.licence, by: null });
      return { ok: true };
    }
  };
}

// store.mjs
function d1Store(db) {
  let ready = null;
  const table = () => ready ||= db.prepare("CREATE TABLE IF NOT EXISTS records (k TEXT PRIMARY KEY, v TEXT NOT NULL)").run();
  const parse = (row) => row ? JSON.parse(row.v) : null;
  return {
    kind: "d1",
    async get(key) {
      await table();
      return parse(await db.prepare("SELECT v FROM records WHERE k = ?").bind(key).first());
    },
    async put(key, value) {
      await table();
      await db.prepare("INSERT INTO records (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v").bind(key, JSON.stringify(value)).run();
    },
    async del(key) {
      await table();
      await db.prepare("DELETE FROM records WHERE k = ?").bind(key).run();
    },
    async take(key) {
      await table();
      return parse(await db.prepare("DELETE FROM records WHERE k = ? RETURNING v").bind(key).first());
    },
    async list(prefix) {
      await table();
      const { results } = await db.prepare("SELECT k, v FROM records WHERE k >= ? AND k < ? ORDER BY k").bind(prefix, `${prefix}￿`).all();
      return (results || []).map((r) => ({ key: r.k, value: JSON.parse(r.v) }));
    }
  };
}

// email.mjs
function resendEmail({ key, from, fetchImpl = (...a) => fetch(...a) }) {
  if (!key || !from) return null;
  return {
    async send({ to, subject, text: text2 }) {
      const r = await fetchImpl("https://api.resend.com/emails", { method: "POST", headers: { authorization: `Bearer ${key}`, "content-type": "application/json" }, body: JSON.stringify({ from, to: [to], subject, text: text2 }), signal: AbortSignal.timeout(1e4) });
      if (!r.ok) throw new Error(`Resend answered ${r.status}`);
    }
  };
}

// hosts/cloudflare.mjs
var made = null;
var connector = (env) => made ||= createConnector({
  ...sb_build_default,
  secret: env.CONNECTOR_SECRET,
  base: env.CONNECTOR_BASE,
  store: d1Store(env.DB),
  email: resendEmail({ key: env.RESEND_API_KEY, from: env.EMAIL_FROM }),
  deployRepo: env.DEPLOY_REPO,
  deployPath: "connector.js",
  log: (e) => console.log(JSON.stringify(e))
});
var cloudflare_default = {
  fetch: (req, env) => connector(env).fetch(req),
  scheduled: (event, env, ctx) => ctx.waitUntil(connector(env).daily())
};
export {
  cloudflare_default as default
};
