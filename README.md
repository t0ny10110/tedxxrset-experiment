# TEDx Immersive Stage

Build a premium immersive TEDx event website inspired by high-end interactive WebGL experiences.

CORE ARCHITECTURE & CONCEPT:
- Concept C: Physical TEDx stage transforming sequentially through a scroll-driven narrative journey:
  1. Pre-Show: Empty dark stage focusing on the iconic red circular carpet, ambient atmospheric haze and dust motes.
  2. Ignition: Overhead stage lights and volumetric beams sweep down onto the red carpet.
  3. Gathering: Audience silhouettes emerge in the foreground and flanks, establishing scale and depth.
  4. The Spark: Speaker silhouette steps into the spotlight as the massive 3D TEDx logo illuminates in the background.
  5. Interactive Speaker Stage: The stage remains the active centerpiece. Speakers are presented as 2.5D transparent photographic cutouts positioned on the red carpet. Selecting or navigating between speakers causes the previous speaker to dissolve into shadow and the new speaker to glide into the spotlight from the wings, revealing high-contrast lighting, subtle mouse-reactive parallax, and ambient breathing motion. Behind them, the stage backdrop LED projects their talk title and manifesto in oversized masked typography. Clicking a speaker opens an expansive cinematic detail view.
  6. Event Experience: Visual storytelling sections for talks, performances, networking, and community.
  7. Event Information & Venue: Minimal, elegant presentation of date, schedule, venue, and location.
  8. Final CTA & Minimal Footer: Dramatic "READY TO EXPLORE?" section with high-impact "GET YOUR TICKET" CTA, TEDx branding, and social links.

INTERACTION & MOTION DESIGN:
- Custom cursor: Small central dot with a larger soft ring following with smooth interpolation, morphing shape over interactive elements.
- Magnetic buttons: Buttons subtly pull toward the cursor with spring physics and return smoothly to origin.
- Typography: Split major headings into individual lines/words, revealing them with masked clipping, translation, opacity, and subtle blur.
- Scroll & Camera: Scroll progress controls the Three.js / WebGL camera smoothly through the narrative timeline with parallax layers.
- Ambient motion: Slow, continuous drifting dust motes/particles, subtle idle breathing for 3D elements, and shifting lighting.
- Performance: Optimized render loops, proper disposal of Three.js geometries/materials, reduced particle counts and graceful fallbacks for mobile and low-power devices.
- Modular data: Cleanly isolate event info, theme copy, speaker profiles, dates, and venue in a dedicated configuration file so details can be swapped easily.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://tedx-rset-test.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c134f71c-ef07-4a8c-afea-a3a2978f2840).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
