# Scene 03 polish + site finishing pass

## 1. Speakers
- Add 5 more speakers (7 total), all as clearly marked placeholders: "Speaker 3"–"Speaker 7", with "coming soon" text.
- Generate 5 new placeholder speaker cutout photos that match the style of the current two.
- Keep the walk in and out, but make it a fade. The outgoing speaker drifts left or right while fading away. The new speaker drifts in from the opposite side while fading in. No black silhouette, just soft opacity and a gentle blur.
- Smoother switching: one shared easing curve. The screen text, light warm-up and photo fade all play on the same timing. Rapid clicks are ignored until the fade finishes, so nothing stacks or jumps.

## 2. Three-stage reveal (from your sketch)
Scrolling into the Speakers scene plays three stages:

```text
Stage 1  Darkness     curtain closed, lights 0%, "Awaiting entrance"
Stage 2  Red Circle   lone spotlight on the red circle, lights ~40%
Stage 3  Full Stage   screen on, speaker in focus, audience lit, lights 100%
```
- Your scrolling drives each stage, so it plays backwards when you scroll up.
- Two dark curtain panels part as the stage opens. In stage 3 a dim row of audience shapes lights up at the front edge of the stage.

## 3. TEDx type and homepage title
- Use a striking font pairing across the whole site. "Unbounded" for big headings: wide, heavy, futuristic display type that looks like stage lettering. "Space Grotesk" for body text and labels: sharp and modern. Headings use very tight letter spacing and huge sizes.
- Everywhere "TEDx" appears, including the logo, the homepage title and the headings, "TED" shows in white or bold type and the "x" always shows in TED red.
- Give the text bold colours. Big headings get a glowing gradient that moves slowly from hot TED red through ember orange to electric magenta. Small labels and numbers get a neon red glow. Speaker talk titles on the stage screen glow in warm amber and red, like real LED light. Each scene gets its own accent colour, so the colours shift as you move through the site:
  - Intro: red
  - Idea: magenta
  - Speakers: amber
  - Experience: electric blue
  - Event: violet
  - Tickets: red
- Make the "TEDx x RSET" title on the first screen much bigger, about 1.6× its current size, filling most of the screen width. On phones it shrinks to fit without being cut off.

## 4. Ticket button
- Change the round "Get your ticket" button into a proper rectangle: solid TED red, sharp corners, wide padding, an arrow, and a slight magnetic pull when you move toward it.

## 5. Small finishing details
- A thin red progress line on the Speakers screen while each photo fades in.
- Better spacing and alignment on the Experience, Event and closing screens.
- Footer line on the closing screen: TEDx Rajagiri, contact email, Instagram, and the "independently organized TED event" notice.
- Fix the page title and description so they no longer say "Ideas in Motion".
- Check on phone and desktop sizes for anything cut off.

## Technical details
- New speaker entries and images go in the event content file. The images are placeholders until real photos arrive.
- The three-stage reveal maps scene-03 progress (about 0.32–0.48) to curtain, spotlight and audience values inside the existing 3D frame loop. The page text follows the same value.
- Fonts load through the root page head. The font tokens are updated in the global stylesheet.
- No changes to how scrolling works, the fixed screen, or the 6-scene layout.
