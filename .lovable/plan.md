# Cinematic TEDx Event Experience

## Build
- Replace the placeholder homepage with one continuous, dark theatrical journey centered on a physical TEDx stage.
- Add a full-screen Three.js scene with a red carpet, dimensional TEDx letters, stage architecture, lighting, haze, dust, audience silhouettes, and a speaker silhouette.
- Drive the stage camera, lights, audience, and speaker reveal from scroll progress across the pre-show, ignition, gathering, and spark chapters.
- Layer editorial story copy over the stage with masked line reveals and restrained transitions.

## Speakers and Event Story
- Create an interactive speaker stage with three placeholder profiles, keyboard/button navigation, spotlight transitions, large projected talk typography, and an expansive speaker detail view.
- Add full-width visual chapters for talks, performances, networking, community, event information, ticket call-to-action, and a minimal footer.
- Isolate all replaceable names, theme copy, profiles, dates, venue, schedule, links, and contact details in one configuration module.

## Interaction and Responsiveness
- Add a smooth custom cursor and magnetic ticket controls for precise pointer devices.
- Add subtle pointer parallax, ambient breathing, drifting particles, scroll progress, and reduced-motion/mobile fallbacks.
- Keep the experience usable with keyboard navigation, visible focus states, semantic controls, and screen-reader labels.

## Technical Details
- Use React Three Fiber with client-only rendering, capped pixel density, instancing, bounded particle counts, and proper cleanup.
- Use local geometry and CSS atmosphere rather than remote runtime assets, avoiding loading failures.
- Define a cinematic semantic token system and route-specific social metadata.
- Verify compilation, desktop and mobile rendering, interactions, animation state, and browser console cleanliness.
