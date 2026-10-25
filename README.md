# Eagle Eye Adventure Club

Frontend-only Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion site. No backend, API routes or payments.

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck && npm run lint && npm test && npm run build
```

## Where to edit content
| What | File |
| --- | --- |
| Company email/phone/location/WhatsApp, socials, stats | `src/lib/config.ts` |
| Adventures (trips, prices, itineraries) | `src/data/adventures.ts` |
| Destinations | `src/data/destinations.ts` |
| Gallery photos | `src/data/gallery.ts` |
| Testimonials (currently demo placeholders) | `src/data/testimonials.ts` |
| FAQs | `src/data/faqs.ts` |
| Page hero / section images | `src/data/images.ts` |
| Production URL (canonical / Open Graph) | `NEXT_PUBLIC_SITE_URL` (see `.env.example`) |

Images are Unsplash URLs (allowed in `next.config.ts`). To use local images, put files in `public/` and use `/your-image.jpg` paths.
