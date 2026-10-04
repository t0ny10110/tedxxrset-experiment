import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Clock3, Instagram, MapPin, X } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { eventConfig, type Speaker } from "@/lib/event-config";
import { CustomCursor } from "./CustomCursor";
import { MagneticLink } from "./MagneticLink";
import WarpText from "./WarpText";

const StageCanvas = lazy(() => import("./StageCanvas").then((module) => ({ default: module.StageCanvas })));
const SCENE_COUNT = eventConfig.scenes.length;

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function SpeakerDetail({ speaker, open, onOpenChange }: { speaker: Speaker; open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="speaker-dialog max-w-none border-0 p-0" onOpenAutoFocus={(event) => event.preventDefault()}>
        <Button variant="ghost" size="icon" className="speaker-dialog-close" onClick={() => onOpenChange(false)} aria-label="Close speaker details"><X /></Button>
        <div className="speaker-dialog-portrait"><img src={speaker.portrait} alt={speaker.name} width={896} height={1344} /></div>
        <div className="speaker-dialog-copy"><p className="eyebrow">Featured speaker</p><DialogTitle>{speaker.name}</DialogTitle><DialogDescription>{speaker.role}</DialogDescription><blockquote>“{speaker.manifesto}”</blockquote><p>{speaker.bio}</p><div className="speaker-dialog-talk"><span>Talk</span><strong>{speaker.talk}</strong></div></div>
      </DialogContent>
    </Dialog>
  );
}

export function EventExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const targetProgress = useRef(0);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const touchY = useRef<number | null>(null);
  const [visualProgress, setVisualProgress] = useState(0);
  const [speakerIndex, setSpeakerIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const speakerSwitch = useRef(-10000);
  const speakerHover = useRef(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const activeScene = Math.min(SCENE_COUNT - 1, Math.round(visualProgress * (SCENE_COUNT - 1)));
  const speaker = eventConfig.speakers[speakerIndex];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    let last = performance.now();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const advance = (delta: number) => {
      targetProgress.current = clamp(targetProgress.current + delta);
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const normalized = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1);
      advance(normalized * 0.00042);
    };
    const onTouchStart = (event: TouchEvent) => { touchY.current = event.touches[0]?.clientY ?? null; };
    const onTouchMove = (event: TouchEvent) => {
      const nextY = event.touches[0]?.clientY;
      if (touchY.current === null || nextY === undefined) return;
      event.preventDefault();
      advance((touchY.current - nextY) * 0.0016);
      touchY.current = nextY;
    };
    const onTouchEnd = () => { touchY.current = null; };
    const onPointer = (event: PointerEvent) => { pointer.current = { x: event.clientX / window.innerWidth - 0.5, y: event.clientY / window.innerHeight - 0.5 }; };
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", "Space", "ArrowUp", "PageUp", "Home", "End"].includes(event.code)) event.preventDefault();
      if (["ArrowDown", "PageDown", "Space"].includes(event.code)) advance(1 / (SCENE_COUNT - 1));
      if (["ArrowUp", "PageUp"].includes(event.code)) advance(-1 / (SCENE_COUNT - 1));
      if (event.code === "Home") targetProgress.current = 0;
      if (event.code === "End") targetProgress.current = 1;
    };
    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      const smoothing = reduced ? 18 : 5.5;
      progress.current += (targetProgress.current - progress.current) * (1 - Math.exp(-smoothing * delta));
      if (Math.abs(targetProgress.current - progress.current) < 0.0001) progress.current = targetProgress.current;
      setVisualProgress(progress.current);
      frame = requestAnimationFrame(tick);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: false });
    root.addEventListener("touchend", onTouchEnd);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("keydown", onKey);
    frame = requestAnimationFrame(tick);
    return () => {
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      root.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!speaker) return null;
  const changeSpeaker = (step: number) => { setDirection(step); speakerSwitch.current = performance.now(); setSpeakerIndex((current) => (current + step + eventConfig.speakers.length) % eventConfig.speakers.length); };
  const setHover = (value: boolean) => { speakerHover.current = value; setHovered(value); };
  const px = pointer.current.x; const py = pointer.current.y;
  const sceneProgress = visualProgress * (SCENE_COUNT - 1);

  return (
    <main ref={rootRef} className="cinematic-experience" aria-label={`${eventConfig.brand} interactive experience`}>
      <CustomCursor />
      <div className="cinematic-canvas" aria-hidden><Suspense fallback={<div className="stage-fallback" />}><StageCanvas progress={progress} pointer={pointer} speakerSwitch={speakerSwitch} speakerHover={speakerHover} /></Suspense></div>
      <div className="cinematic-vignette" aria-hidden />

      <header className="cinematic-header">
        <button className="brand cinematic-brand" onClick={() => { targetProgress.current = 0; }} aria-label="Return to intro"><strong>TED<sup>x</sup></strong><span>Rajagiri</span></button>
        <span className="host-name">{eventConfig.host}</span>
        <MagneticLink href={eventConfig.ticketUrl} className="header-ticket">Tickets <ArrowUpRight /></MagneticLink>
      </header>

      <div className="scene-stack">
        {eventConfig.scenes.map((scene, index) => {
          const distance = Math.abs(sceneProgress - index);
          const opacity = Math.max(0, 1 - distance * 1.7);
          const direction = sceneProgress - index;
          return (
            <section key={scene.index} className={`cinematic-scene scene-${index + 1}${activeScene === index ? " is-active" : ""}`} aria-hidden={activeScene !== index} style={{ opacity, transform: `translate3d(0, ${direction * -48}px, 0) scale(${1 - Math.min(distance, 1) * 0.045})`, filter: `blur(${Math.min(distance * 10, 10)}px)` }}>
              <div className="scene-copy"><p className="eyebrow">{scene.eyebrow}</p>{index === 0 ? <h1 className="intro-warp-heading"><WarpText text="TEDx x RSET" color="#f8f5ff" warpStrength={0.08} warpScale={1.7} speed={0.55} pointerInfluence={0.42} pointerStrength={0.38} refraction={0.018} ripple fontSize={116} fontWeight={800} style={{ height: "320px" }} fontFamily="inherit" letterSpacing={-0.06} lineHeight={0.9} /></h1> : <h1>{scene.title}</h1>}<p className="scene-description">{scene.text}</p></div>

              {index === 2 ? <div className="cinematic-speaker">
                <div className={`speaker-led${hovered ? " is-hot" : ""}`} aria-hidden style={{ transform: `translate3d(${px * 14}px, ${py * 8}px, 0)` }}><AnimatePresence mode="wait"><motion.div key={speaker.id} initial="hidden" animate="show" exit="out" variants={{ hidden: {}, show: { transition: { delayChildren: 1.05, staggerChildren: 0.18 } }, out: { transition: { staggerChildren: 0.05 } } }}><span className="led-mask"><motion.strong variants={{ hidden: { y: "105%", opacity: 0 }, show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] } }, out: { y: "-105%", opacity: 0, transition: { duration: 0.4 } } }}>{speaker.talk}</motion.strong></span><span className="led-mask"><motion.em variants={{ hidden: { y: "110%", opacity: 0 }, show: { y: "0%", opacity: 1, transition: { duration: 0.8 } }, out: { opacity: 0, transition: { duration: 0.3 } } }}>{speaker.manifesto}</motion.em></span></motion.div></AnimatePresence></div>
                <div className="speaker-spot" aria-hidden />
                <AnimatePresence mode="wait" custom={direction}><motion.button key={speaker.id} custom={direction} className={`cinematic-speaker-portrait${hovered ? " is-hovered" : ""}`} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)} variants={{ enter: (d: number) => ({ opacity: 0, x: `${d * 60}vw`, filter: "brightness(0) contrast(1.8) blur(3px)" }), center: { opacity: [0, 0.9, 1, 1], x: ["var(--from)", "0vw", "0vw", "0vw"].map((v, i) => (i === 0 ? `${direction * 60}vw` : v)), filter: ["brightness(0) contrast(1.8) blur(3px)", "brightness(0) contrast(1.8) blur(0px)", "brightness(0.15) contrast(1.6) blur(0px)", "brightness(1) contrast(1.15) blur(0px)"], transition: { duration: 1.9, times: [0, 0.5, 0.62, 1], ease: [0.22, 0.7, 0.2, 1] } }, exit: (d: number) => ({ opacity: [1, 0.7, 0], x: ["0vw", "0vw", `${d * -8}vw`], scale: [1, 0.98, 0.94], filter: ["brightness(1) blur(0px)", "brightness(0) blur(2px)", "brightness(0) blur(10px)"], transition: { duration: 0.7, times: [0, 0.45, 1] } }) }} initial="enter" animate="center" exit="exit" onClick={() => setSelectedSpeaker(speaker)} aria-label={`Open ${speaker.name} details`}><span className="portrait-parallax" style={{ transform: `translate3d(${px * -18}px, ${py * -12}px, 0) rotateY(${px * 6}deg)` }}><img src={speaker.portrait} alt="" width={896} height={1344} /></span></motion.button></AnimatePresence>
                <div className="cinematic-speaker-meta"><span>{String(speakerIndex + 1).padStart(2, "0")} / {String(eventConfig.speakers.length).padStart(2, "0")}</span><h2>{speaker.name}</h2><p>{speaker.role}</p>{hovered ? <p className="speaker-hover-talk">{speaker.talk}</p> : null}<button className="speaker-read" onClick={() => setSelectedSpeaker(speaker)}>Enter their idea <ArrowUpRight /></button></div>
                <div className="cinematic-speaker-controls"><Button variant="outline" size="icon" onClick={() => changeSpeaker(-1)} aria-label="Previous speaker"><ArrowLeft /></Button><Button variant="outline" size="icon" onClick={() => changeSpeaker(1)} aria-label="Next speaker"><ArrowRight /></Button></div>
              </div> : null}

              {index === 3 ? <div className="experience-marquee">{eventConfig.experience.map((item) => <div key={item.index}><span>{item.index}</span><strong>{item.name}</strong><p>{item.text}</p></div>)}</div> : null}
              {index === 4 ? <div className="event-facts"><div><CalendarDays /><span>Date</span><strong>{eventConfig.date}</strong></div><div><Clock3 /><span>Time</span><strong>{eventConfig.time}</strong></div><div><MapPin /><span>Venue</span><strong>{eventConfig.venue}</strong><small>{eventConfig.location}</small></div></div> : null}
              {index === 5 ? <div className="cinematic-cta"><MagneticLink href={eventConfig.ticketUrl} className="ticket-cta"><span>Get your ticket</span><ArrowUpRight /></MagneticLink><a className="instagram-link" href={eventConfig.socials[0]?.href} target="_blank" rel="noreferrer"><Instagram /> @tedxrset</a></div> : null}
            </section>
          );
        })}
      </div>

      <nav className="timeline-nav" aria-label="Cinematic scenes"><span className="scene-counter">{String(activeScene + 1).padStart(2, "0")} <i /> {String(SCENE_COUNT).padStart(2, "0")}</span><div className="timeline-track"><b style={{ transform: `scaleY(${visualProgress})` }} />{eventConfig.scenes.map((scene, index) => <button key={scene.index} className={activeScene === index ? "is-active" : ""} onClick={() => { targetProgress.current = index / (SCENE_COUNT - 1); }} aria-label={`Go to ${scene.label}`}><span>{scene.label}</span></button>)}</div></nav>
      <div className="input-cue"><span>{visualProgress < 0.98 ? "Scroll or swipe to travel" : "Scroll up to return"}</span><i /></div>
      {selectedSpeaker ? <SpeakerDetail speaker={selectedSpeaker} open onOpenChange={(open) => { if (!open) setSelectedSpeaker(null); }} /> : null}
    </main>
  );
}