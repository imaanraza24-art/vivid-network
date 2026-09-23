# Vivid Network

The official website and content platform for **Vivid Network** — a youth-led
media brand. *By youth. For youth.*

Built with Next.js 14 (App Router) + TypeScript + Tailwind CSS, deployable
directly to Vercel.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in whatever providers you're ready to connect
npm run dev
```

Visit `http://localhost:3000`.

## Project structure

```
/app                    Routes (Next.js App Router — file-based routing)
  /articles              Articles archive
  /articles/[slug]        Individual article page
  /vivid-voices           Podcast archive
  /vivid-voices/[slug]     Individual episode page
  /about, /get-involved, /contact, /search
  /api/contact             Contact form handler
  /api/story-submission    Share Your Story handler (private review queue)
  /api/newsletter          Vivid Mailbox signup handler
  /api/search               Powers the /search page

/components              Reusable UI: Navigation, Footer, ArticleCard,
                          EpisodeCard, forms, empty states, the hero
                          background animation, etc.

/content
  /articles/index.ts       Article content source — starts EMPTY on purpose
  /episodes/index.ts       Episode content source — starts EMPTY on purpose

/lib
  types.ts                 Article/Episode/SearchResult data models
  content.ts                The ONLY module pages/components read content
                            through — swap the source, nothing downstream
                            changes
  format.ts                 Date/duration/URL helpers
```

Content is deliberately separated from presentation: no article or episode
is ever hard-coded into a component. Everything flows through
`lib/content.ts`.

## Publishing real content (no CMS yet)

Until a CMS is connected, publish directly in code:

1. Open `content/articles/index.ts` (or `content/episodes/index.ts`).
2. Add an object matching the `Article` / `Episode` type in `lib/types.ts`
   — there's a commented-out example in each file showing the exact shape.
3. Set `published: true`.
4. Deploy. The homepage, archive page, category filters, search, and the
   item's own `/articles/[slug]` or `/vivid-voices/[slug]` page all pick it
   up automatically.

Leave any listening link (Spotify / Apple Podcasts / YouTube) as `null`
until the real URL exists — the UI shows "coming soon" and activates the
button the moment a real URL is added. **Never invent placeholder URLs.**

## Connecting a real CMS later

Replace the body of `getAllArticlesFromSource()` /
`getAllEpisodesFromSource()` in the two `content/*/index.ts` files with a
fetch to your CMS (Sanity, Contentful, headless WordPress, a database —
whatever you pick), mapping its response into the `Article[]` / `Episode[]`
shape. Nothing in `lib/content.ts` or any page/component needs to change,
because they only depend on that shape.

## Connecting a real podcast RSS feed

The `Episode` type already carries every field a standard RSS `<item>`
provides. To go live:

1. Set `PODCAST_RSS_URL` in your environment.
2. In `content/episodes/index.ts`, replace the static array with a fetch +
   parse of that feed, mapping each item to the `Episode` shape.

No RSS URL is hard-coded anywhere in this codebase — add your own once
Vivid Voices has a real feed.

## Forms and email

Three API routes validate submissions server-side and log them, but **do
not send email or add subscribers until you connect a real provider** —
this avoids the site ever claiming a message was sent when it wasn't.

| Route | Purpose | Env vars to activate it |
|---|---|---|
| `POST /api/contact` | Contact form → `vividnetworkcontact@gmail.com` | `EMAIL_PROVIDER_API_KEY`, `CONTACT_EMAIL` |
| `POST /api/story-submission` | Share Your Story → private review queue, never auto-published | `EMAIL_PROVIDER_API_KEY` (or your chosen review destination) |
| `POST /api/newsletter` | Vivid Mailbox signup | `NEWSLETTER_PROVIDER_API_KEY`, `NEWSLETTER_AUDIENCE_ID` |

Each route file has an "Integration point" comment showing exactly where a
real provider call goes. No credentials are ever referenced in
client-side code — only in these server-only route handlers, read from
environment variables.

## Deploying to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import it in Vercel — it auto-detects Next.js, no config needed.
3. Add the environment variables from `.env.example` in Project Settings.
4. Deploy. All routes (including `/articles/[slug]` and
   `/vivid-voices/[slug]`) work correctly on refresh — Next.js/Vercel
   handles this natively, no redirects or rewrites required.

## Design system quick reference

- **Background**: `#080808` (near-black), see `ink` in `tailwind.config.ts`
- **Accents**: deep purple (`plum`) as atmosphere/glow/hover, golden yellow
  (`gold`) sparingly for buttons and active states — target ~80% neutral /
  15% purple / 5% gold
- **Type**: Fraunces (display/editorial) + Manrope (body/UI), loaded via
  `next/font/google` in `app/layout.tsx`
- **Hero background typography**: `components/HeroBackground.tsx` — five
  phrases, continuous right-to-left marquee loop, subtle desktop parallax,
  `prefers-reduced-motion` respected

## What's intentionally NOT here

Per the "real content only" rule: zero seeded articles, zero seeded
episodes, zero fake guests/testimonials/stats/partnerships/social URLs.
Every one of those surfaces an elegant empty state instead. Fill them in
only with real content, real people, and real links.
