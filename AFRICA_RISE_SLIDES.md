# Ultorn @ Africa Rise — 5-Minute Slide Structure

**Deck:** 8 visible slides + 11 hidden appendix slides
**Format:** 16:9, 1920×1080
**Run time:** 4:45 target, 5:00 hard stop
**Rule:** the slides are not the script. Each slide carries one image or one number; you carry the story.

---

## The timing at a glance

| # | Slide | Time | Beat |
|---|---|---|---|
| 1 | Title | pre-roll | Walk-on backdrop |
| 2 | 2:00 p.m. Matchday | 0:00–0:40 | The hook |
| 3 | The code ships fast | 0:40–1:40 | The vibe-coding problem |
| 4 | The race we can win | 1:40–2:20 | The strategic choice + the bill |
| 5 | Ultorn. Five things. | 2:20–3:30 | The solution |
| 6 | One platform. Four buyers. | 3:30–4:20 | The sports application |
| 7 | Working today. | 4:20–4:45 | Proof and model |
| 8 | Three pilots. 90 days. | 4:45–5:00 | The ask and close |

Eight slides in five minutes is roughly 37 seconds per slide. Slides 2 and 3 get 100 seconds between them — that is deliberate. The emotion is front-loaded; the product is compressed.

---

## Slide 1 — Title

**On slide**

> AFRICA RISE · DAKAR · OCTOBER 2026
>
> # The Trust Layer for African Sport
>
> ### In the AI era.
>
> Ultorn — a Utachi Industries Labs product

**Visual:** Full-bleed dark frame. Utachi Industries mark top-left; typeset "Ultorn" in Plus Jakarta Sans beside it — there is no separate Ultorn logo file yet. Optional: a dimmed, desaturated stadium-at-night image at 20% opacity. No stock "hacker in a hoodie."

**Say:** Nothing yet. Walk on, let the title sit, then start the hook. Do not read the title aloud.

**Build note:** This slide should be up before you reach the stage. It is a backdrop, not a beat.

---

## Slide 2 — The hook

**On slide**

> # 2:00 p.m. Matchday.
>
> ## The ticketing platform is down.
>
> It wasn't traffic.

**Visual:** One full-bleed image: a packed stadium at dusk, or a phone screen showing a ticketing error page over a blurred crowd. If you use the error screen, build it from one of the seeded findings in the Dakar United FC demo tenant — do not mock up a product feature that does not exist.

**Say (the hook, 0:00–0:40):**

> Imagine it's matchday in Dakar. The stadium is full. The club just signed its biggest sponsorship deal ever. And at two o'clock, the ticketing platform goes down.
>
> Not because of traffic. Because someone vibe-coded the new ticketing app three weeks ago, pasted an API key into the frontend, and shipped it. Nobody was watching.
>
> That is the new risk in African sport. Not just hackers. Speed. The AI era is arriving faster than the security layer around it.

**Build note:** One image, three lines. Do not put the whole story on the slide. The pause after "nobody was watching" is the first beat of the pitch.

---

## Slide 3 — The vibe-coding problem

**On slide**

> # The code ships fast.
>
> # The doors stay open.
>
> `HARDCODED KEYS` · `TLS DISABLED` · `ADMIN PANEL PUBLIC`
>
> And the data leaves the building.

**Visual:** A dark code card on the left with three concrete, red-flagged lines:

```js
const API_KEY = "sk-live-..."
rejectUnauthorized: false
eval(userInput)
```

On the right, a phone mockup of a fan app or ticketing page — the thing that shipped. The contrast is the slide: beautiful product, broken plumbing.

**Say (0:40–1:40):**

> Let's be honest about what's happening. The next generation of sports software in Africa will not be built by large engineering teams. It will be built by a club's marketing lead, a federation's operations manager, a founder with an idea and a prompt.
>
> That is a superpower. A club in Dakar can have a ticketing platform, a fan app, an academy portal, and a scouting tool in a weekend.
>
> But AI writes code that looks right. It hardcodes keys to make the demo work. It disables TLS when the certificate fails. It ships `eval`, opens CORS to the world, and leaves the admin panel on the public internet.
>
> The code ships fast. The doors stay open.
>
> And it's not just code. Staff are pasting athlete passports, medical notes, minors' records, and fan payment data into foreign AI models. The data leaves the building. Nobody logs it. Nobody knows where it went.

**Build note:** Build the three code flags one at a time as you say them. Then bring in the last line — "And the data leaves the building" — as a separate, quieter reveal. That is the turn from code to people.

---

## Slide 4 — The race we can win

**On slide**

> # We won't win the model race.
>
> ## We can win the defense race.
>
> **THE MODEL RACE** — US and China. Not ours to run.
>
> **THE DEFENSE RACE** — Who protects everything AI touches. Ours to own.
>
> Our data. Our defenses. Our sovereignty.
>
> Bill No. 25/2026 · passed by the National Assembly · 21 August 2026

**Visual:** One split screen. Left half dimmed and desaturated: abstract server racks or a globe with the big flags blurred — the race we are not running. Right half in the violet accent: a shield over Dakar or the continent — the race we own. Hard vertical divider. Keep the right side abstract; a bright point on Dakar, not a detailed map.

**Say (1:40–2:20):**

> Let's be honest about the race. Senegal is not going to out-build OpenAI, Google, or Beijing. That race is not ours — and we shouldn't run it.
>
> But AI is writing the code now, and AI is running the attacks. The tools that will protect African institutions are being built somewhere else. If we don't build our own, we protect our data with foreign tools, on foreign servers, under foreign law. Every prompt sent to someone else's model is a small export of sovereignty.
>
> We can't win the model race. We can win the defense race. Senegal's National Assembly passed Bill No. 25/2026 in August: local hosting, CERT notification, audits, human oversight of AI. Sovereignty isn't a slogan. It's who holds the data.

**Build note:** This is the strategic slide. Dim the left half as you say "that race is not ours." Light up the right half on "We can win the defense race." Do **not** put "72 hours" on the slide unless you have confirmed it in the final text. The bill line is a footnote — slow down on it, don't read it.

---

## Slide 5 — The solution

**On slide**

> # Ultorn. Five things.

| | |
|---|---|
| **FIND** | Nuclei, Nmap, HTTP evidence. No exploitation. |
| **WATCH** | Ticketing, streaming, membership, results. |
| **PROVE** | Immutable audit. Named human sign-off. |
| **COMPLY** | Findings mapped to Bill No. 25/2026. |
| **PROTECT** | Sanitized prompts. Local model option. |

**Visual:** A clean five-row table, or five horizontal bands with the verb in large accent type and the line in white. Background: a faint, darkened screenshot of the console — enough to signal "real product," not enough to read.

**Say (2:20–3:30):**

> Ultorn is a sovereign, defensive cybersecurity operations platform built in Dakar, for African institutions. It is how we win that race. Five things.
>
> **It finds exposure.** We scan domains, IPs, and URLs with Nuclei, Nmap, and full HTTP evidence. No exploitation. Just the truth about what's visible.
>
> **It watches.** Continuous monitors check ticketing, streaming, membership, and results endpoints for outages, configuration drift, leaked credentials, and policy violations.
>
> **It proves.** Every scan, finding, and review goes into an immutable audit log. Critical findings require a named analyst to sign off. When a sponsor or auditor asks what happened, you have the record.
>
> **It complies.** Findings map to Bill No. 25/2026 — CERT notification windows, audit obligations, AI governance — and become a plain-language report a board can actually read.
>
> **And it protects the AI era in two directions.** AI Guard strips names, IPs, credentials, emails, phone numbers, and card data before anything reaches an external model — or runs the whole workflow on a local open-source model, so no foreign vendor owns it. Our code scanner catches the fingerprints of vibe coding — hardcoded secrets, unsafe `eval`, disabled TLS — before they reach fans.

**Build note:** This is the densest slide in the deck. Build one row per sentence. If you are running long, cut the table to the five verbs and say the descriptions — do not add more text.

---

## Slide 6 — In sport

**On slide**

> # One platform. Four buyers.
>
> **CLUB** — Pre-season assessment. Matchday watch.
>
> **FEDERATION / LEAGUE** — Same standard. One evidence pack.
>
> **ACADEMY** — Minors' records. Logged access.
>
> **STADIUM / BROADCASTER** — 24 hours before kickoff → 6 hours after.

**Visual:** A 2×2 grid with four thin-line icons: a shirt/badge, a trophy, a graduation cap, a broadcast tower. Keep the icons monochrome; use the violet accent on hover only if it is a live deck. If you have a real screenshot of the Dakar United FC demo tenant, put it behind the grid at low opacity.

**Say (3:30–4:20):**

> Now put that in the sports context.
>
> A **club** gets its website, ticketing, academy, and fan app assessed before the season — then monitored through matchday.
>
> A **federation or league** gets every club assessed to the same standard, one evidence pack for licensing and sponsors, and a single escalation path.
>
> An **academy** gets athlete and minor records protected, access logged, and AI-assisted reports with identity data stripped before it reaches any model.
>
> A **stadium or broadcaster** gets ticketing, streaming, and results watched from 24 hours before kickoff to six hours after.
>
> Africa Rise is building the network, the credibility, and the narrative of African sport. Utachi builds products from Dakar for this market. Together, we don't have to import trust. We can build it here.

**Build note:** The last paragraph is the partnership moment. Step away from the screen, or gesture to the Africa Rise team in the room. Do not read it off the slide.

---

## Slide 7 — Proof and model

**On slide**

> # Working today.
>
> `LIVE CONSOLE` · `DAKAR UNITED FC DEMO TENANT` · `88 BACKEND TESTS`
>
> **Baseline assessment → Monthly monitoring → Sovereign-AI tier → League-wide agreement**
>
> Africa Rise (proposed): co-brand · distribute · share revenue

**Visual:** The strongest real screenshot you have: the console dashboard with the Dakar United FC demo tenant open, showing findings across ticketing, academy, and stadium. Crop it so the type is readable. Put the three proof chips along the bottom.

**Say (4:20–4:45):**

> The platform works today: scanning, monitoring, human review, compliance mapping, reports, AI Guard, code scanning, audit. Eighty-eight backend tests. A working console. And a sports demo tenant — Dakar United FC — with realistic demo findings across ticketing, academy, stadium, and the fan app.
>
> The model is a baseline assessment per club, a monthly monitoring subscription, a sovereign-AI tier for academies and federations, and a league-wide enterprise agreement. Africa Rise can co-brand it, distribute it, and share the revenue.

**Build note:** Do not linger on "88 backend tests." It is credibility, not the headline. Say it once, move on. If the screenshot is not legible from the back of the room, cut it and use the three chips on black — a blurry dashboard hurts more than it helps.

---

## Slide 8 — The ask

**On slide**

> # Three pilots.
>
> # 90 days.
>
> ## Africa Rise as our go-to-market partner.
>
> **Know before they do.**
>
> Ultorn · a Utachi Industries Labs product · Dakar

**Visual:** Near-black. No image, or a single stadium tunnel / floodlight at very low opacity. This is the slide the room should remember. Let the type be huge. Put your contact line in the footer at 12pt, not in the headline.

**Say (4:45–5:00):**

> We're looking for three pilot clubs or federations in the next 90 days, and Africa Rise as our go-to-market partner.
>
> Africa Rise builds the future of African sport. Ultorn makes sure that when it gets there — in the AI era — the data, the money, and the kids are safe.
>
> Know before they do. Thank you.

**Build note:** Do not advance to a "Thank you" slide. This is the last image. Stay on it through the applause, then use it as the backdrop for Q&A. If someone asks for contact details, point to the footer.

---

## Slide 8B — End card (optional, never advanced during the five minutes)

**On slide**

> **The model race is theirs.**
>
> **The defense race is ours.**
>
> Know before they do.
>
> Ultorn · a Utachi Industries Labs product · Dakar

**Use:** If you would rather have the thesis on screen through Q&A than the ask, advance to this card after "Thank you" — never before. Slide 8 is the last image of the pitch; this is the last image of the day.

---

# Hidden appendix slides

These are not part of the five minutes. Build them, hide them, and jump to them only when a question demands it. Each one is a single answer, not a second deck.

## A1 — The problem in numbers

**Headline:** The last eighteen months.

**Content:**

- **3,794** cybercrime offenses recorded by the National Police in 2025 (257 prosecuted).
- **139 TB** claimed in the DAF/"Green Blood" breach — unconfirmed by authorities.
- **$7.9M** business-email-compromise attempt stopped, December 2025.
- **651** arrests in a 16-country mobile-money operation, December 2025–January 2026.
- **≥$5B** estimated African cyberattack losses in 2025 (Interpol).

**Footer:** Sources in A9. Say "claimed" for the DAF figure.

## A2 — How AI Guard works

**Headline:** What leaves the building.

**Content:** A five-step horizontal flow:

`PROMPT` → `SANITIZE` (names, IPs, credentials, PII) → `STILL SENSITIVE?` → `YES: LOCAL` / `NO: EXTERNAL MODEL` → `IMMUTABLE LOG`

**Line underneath:** Provider, model, and whether it was sanitized are logged. The raw content is not.

## A3 — Compliance mapping

**Headline:** Bill No. 25/2026 → shipped feature.

Use the six-row table from `AFRICA_RISE_PITCH_PACK.md` §15 (Appendix A). Keep it to one screen: obligation on the left, feature on the right, no paragraph cells.

**Footer:** Passed by the National Assembly on 21 August 2026; not confirmed in force. Draft mapping, not a legal opinion.

## A4 — Market

**Headline:** Small today. Growing into a regulated market.

**Content:** The Mordor table — ~$0.68B (2025), ~$0.77B (2026), ~$1.44B (2031), 13.3% CAGR. One line: "Do not blend with the broader security-solutions category."

**Footer:** Source in A9. We do not show a SAM/SOM we cannot source. The Africa figure above is sourced; the bottom-up Senegal count will be published with its register sources.

## A5 — Competition

**Headline:** Built for this bill, from Dakar.

Use the five-row comparison table from `AFRICA_RISE_PITCH_PACK.md` §10. Add the sports line: "In sport, the real alternative is a volunteer and a WhatsApp group."

## A6 — Business model

**Headline:** Sports proves it. Institutions pay for it.

Two columns:

| Sports | Institutional |
|---|---|
| Baseline assessment | Per-client SaaS/managed |
| Monthly monitoring | Self-hosted license |
| Sovereign-AI tier | Compliance-mapping wedge |
| League-wide agreement | Government / bank / telecom |

**Footer:** Pricing in finalization. Do not quote a number you cannot defend.

## A7 — Team

**Headline:** Built in Dakar.

One card: **Abdoullah Ndao** — founder, Utachi Industries Labs; built and shipped Ultorn. Second line: **Utachi Industries** — Studio + Labs; branding, product, engineering, Dakar. If other team members are on stage, add their names and one-line proof; do not invent credentials or logos.

## A8 — Roadmap

**Headline:** The next four quarters.

Q4 2026: first three sports pilots + Africa Rise partnership.
Q1 2027: first paid conversion + institutional design partner.
Q2 2027: independent audit + production hardening + Ollama in production.
Q3–Q4 2027: case studies + one francophone market.

**Footer:** Targets, not commitments. No client-count projections.

## A9 — Sources

**Headline:** Sources.

The seven footnotes from `AFRICA_RISE_PITCH_PACK.md` §16, set at 10–11pt. This slide exists so you can say "it's sourced" and point. Do not read it aloud.

## A10 — What we are not

**Headline:** Boundaries.

Five lines:

- Not offensive. No exploitation.
- Not autonomous. A named human signs off.
- Not a foundation model. We control what reaches one.
- Not a compliance certificate. We produce the evidence.
- Not finished enterprise software. It is a working MVP.

This is the trust slide. Use it when someone asks "is this actually secure?" — it is a better answer than a defensive one.

## A11 — The ask, unpacked

**Headline:** What a pilot actually is.

- Scope: one club or federation; website, ticketing, academy portal, fan app; one matchday.
- Duration: 8 weeks, including one matchday.
- Price: no fee for the first three pilots; conversion to paid monitoring.
- Success: critical findings closed or accepted with a named owner; matchday monitored without material outage; board report delivered.
- End: paid monitoring or league agreement; otherwise anonymized case study and one referral.

Use this in a follow-up meeting, not on stage. It answers the question "so what does yes actually mean?"

---

# Design system

**Colors:**

- Background: `#050505`
- Headline: `#FFFFFF`
- Body: `#EDEDED`
- Muted labels: `#9A9A9A`
- Accent: `#A78BFA` (the site accent)
- Alert: `#FF8A8A`
- Success: `#BBF7D0`

**Type:**

- Plus Jakarta Sans (brand font), fallback Inter.
- Headline: 72–96pt, tight tracking, two lines maximum.
- Body: 28–32pt.
- Labels: 14–16pt, uppercase, letter-spaced.
- Footer/sources: 10–12pt.

**Layout:**

- 16:9, generous margins (at least 80px).
- One idea per slide.
- Maximum 12 words in a headline.
- Maximum 3 lines of body copy.
- No bullet walls. No paragraphs.
- Every number gets a source in the footer, even if it is small.

**Imagery:**

- Real Dakar, real stadium, real product screenshots. No generic "cyber" stock.
- If you cannot get a good image, use type on black. A clean typographic slide beats a bad stock photo.
- Desaturate images slightly so the violet accent is the only saturated color.

---

# Rehearsal notes

- **Target 4:45, hard stop 5:00.** Time yourself out loud three times. If you are over 4:50, cut the third example in the sports section, not the ask.
- **Do not read the slides.** The slide says "2:00 p.m."; you say the story. If you catch yourself reading, stop and look at the room.
- **Build animations:** only for the three code flags (slide 3), the two race columns (slide 4), and the five verbs (slide 5). Everything else appears at once. Too much motion reads as a product demo, not a pitch.
- **Demo:** 20 seconds maximum, and only if the room is technical. Use the seeded Dakar United FC tenant. Have a screen recording as backup. Never debug live.
- **Q&A:** stay on slide 8. Jump to appendix slides by number; do not scroll through the visible deck.
- **If you get 3 minutes:** keep slides 1–4, 6, and 8. Cut slide 5 to the five verbs spoken aloud, and cut slide 7 to one sentence: "The platform is live today, with a sports demo tenant."
- **If you get 90 seconds:** slides 2, 4, and 8 only. Hook, the race, the ask.

---

# The one thing to remember

The deck has eight slides, but it is really three images:

1. **A stadium at 2 p.m.** — the consequence.
2. **A split screen: their race on the left, ours on the right** — the strategic choice.
3. **"Three pilots. 90 days."** — the ask.

And the sentence that ties them: **The model race is theirs. The defense race is ours.**

Everything else is supporting material. If the projector dies, you can still give this pitch with those three images in your head.
