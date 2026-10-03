# Fixed cinematic timeline

## Experience
- Replace the document-length journey and all vertically stacked sections with one fixed, full-viewport experience.
- Organize the story as six reversible timeline states: Intro, The Idea, Speakers, The Experience, Event, and CTA.
- Keep the WebGL stage continuously mounted so camera, lighting, particles, logo, audience, and speaker staging transform without page cuts.
- Present each scene’s typography and controls as layered stage graphics, using masked transitions rather than section changes.

## Interaction
- Capture desktop wheel input with a non-passive listener, normalize trackpad deltas, and accumulate them into a clamped 0–1 target.
- Smooth the displayed timeline toward that target every frame so fast wheel input never causes jumps.
- Map vertical touch swipes to the same target on mobile, with backward navigation supported.
- Keep keyboard arrow/Page Up/Page Down navigation available and honor reduced-motion preferences.
- Add a minimal `01 / 06` indicator and a thin timeline rail with direct scene selection.

## Speaker stage
- Preserve the step-in choreography inside Scene 03: the outgoing speaker dissolves into shadow, the next enters from the wing, warms into photography, and syncs with backdrop typography.
- Keep speaker detail access and previous/next speaker controls available only while the Speakers scene is active.

## Technical details
- Drive camera position, camera target, field of view, environment groups, lights, audience, speaker silhouette, logo glow, and dust response from the smoothed timeline ref inside the Three.js frame loop.
- Keep all replaceable event copy and speaker data in the existing event configuration file.
- Retain the client-only route and performance caps, with a styled non-WebGL fallback.
- Remove obsolete scrolling layout CSS and lock the document to the viewport.

## Verification
- Verify wheel, trackpad-style deltas, reverse travel, touch swipes, keyboard controls, speaker switching, and CTA access.
- Check desktop and phone viewports for clipping or overflow, then confirm clean browser and build diagnostics.
