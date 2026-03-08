Hi Garrett,

"Public users cannot access private records" isn't a config setting — it's a data architecture decision that has to be right from day one. Built a working version of your registry: https://secure-registry.vercel.app

Covers exact-match lookup, the privacy split between public and private record shapes, and a Stripe checkout flow that atomically creates or updates the registration post-payment.

Built a similar multi-role system for a lead management platform, 200+ records/day.

Quick question: are the 4 fixed-price services always triggered at checkout, or can owners add them later from their dashboard?

Call this week or a written scope doc. Your pick.

Humam

P.S. I'm a Next.js developer, not Bubble — but the demo shows I understood your system before applying.
