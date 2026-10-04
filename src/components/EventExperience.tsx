import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Clock3, Instagram, MapPin, X } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { eventConfig, type Speaker } from "@/lib/event-config";
import { CustomCursor } from "./CustomCursor";
import { MagneticLink } from "./MagneticLink";

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

const SWITCH_MS = 900;
const EASE = [0.22, 1, 0.36, 1] as const;
const FADE = { duration: SWITCH_MS / 1000, ease: EASE };
const smooth = (v: number, a: number, b: number) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
function TedxWord({ text }: { text: string }) {
  return <>{text.split(/(TEDx)/).map((part, i) => part === "TEDx" ? <span key={i} className="tedx-word">TED<span className="tedx-x">x</span></span> : part)}</>;
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
  const sceneRef = useRef(0);
  const speakerRef = useRef(0);
  sceneRef.current = activeScene;
  speakerRef.current = speakerIndex;

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
  const changeSpeaker = (step: number) => { const now = performance.now(); if (now - speakerSwitch.current < SWITCH_MS) return; setDirection(step); speakerSwitch.current = now; setSpeakerIndex((current) => (current + step + eventConfig.speakers.length) % eventConfig.speakers.length); };
  const setHover = (value: boolean) => { speakerHover.current = value; setHovered(value); };
  const px = pointer.current.x; const py = pointer.current.y;
  const sceneProgress = visualProgress * (SCENE_COUNT - 1);
  const local = sceneProgress - 2;
  const curtain = smooth(local, -0.75, -0.4);
  const spot = smooth(local, -0.6, -0.3);
  const full = smooth(local, -0.35, -0.08);

  return (
    <main ref={rootRef} className="cinematic-experience" aria-label={`${eventConfig.brand} interactive experience`}>
      <CustomCursor />
      <div className="cinematic-canvas" aria-hidden><Suspense fallback={<div className="stage-fallback" />}><StageCanvas progress={progress} pointer={pointer} speakerSwitch={speakerSwitch} speakerHover={speakerHover} /></Suspense></div>
      <div className="cinematic-vignette" aria-hidden />

      <header className="cinematic-header">
        <button className="brand cinematic-brand" onClick={() => { targetProgress.current = 0; }} aria-label="Return to intro"><strong>TED<span className="tedx-x">x</span></strong><span>Rajagiri</span></button>
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
              <div className="scene-copy"><p className="eyebrow">{scene.eyebrow}</p>{index === 0 ? <h1 className="intro-title"><TedxWord text="TEDx" /> <span className="intro-x">x</span> RSET</h1> : <h1 className="scene-title"><TedxWord text={scene.title} /></h1>}<p className="scene-description">{scene.text}</p></div>

              {index === 2 ? <div className="cinematic-speaker">
                <div className="stage-led-wrap" style={{ opacity: full }}><div className={`speaker-led${hovered ? " is-hot" : ""}`} aria-hidden style={{ transform: `translate3d(${px * 14}px, ${py * 8}px, 0)` }}><AnimatePresence initial={false}><motion.div key={speaker.id} className="led-inner" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={FADE}><strong>{speaker.talk}</strong><em>{speaker.manifesto}</em></motion.div></AnimatePresence></div></div>
                <div className="speaker-spot" aria-hidden style={{ opacity: 0.15 + spot * 0.45 + full * 0.4 }} />
                <div className="speaker-portrait-wrap" style={{ opacity: full }}><AnimatePresence initial={false} custom={direction}><motion.button key={speaker.id} custom={direction} className={`cinematic-speaker-portrait${hovered ? " is-hovered" : ""}`} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)} variants={{ enter: (d: number) => ({ opacity: 0, x: `${d * 14}vw`, filter: "blur(10px)" }), center: { opacity: 1, x: "0vw", filter: "blur(0px)", transition: FADE }, exit: (d: number) => ({ opacity: 0, x: `${d * -14}vw`, filter: "blur(10px)", transition: FADE }) }} initial="enter" animate="center" exit="exit" onClick={() => setSelectedSpeaker(speaker)} aria-label={`Open ${speaker.name} details`}><span className="portrait-parallax" style={{ transform: `translate3d(${px * -18}px, ${py * -12}px, 0) rotateY(${px * 6}deg)` }}><img src={speaker.portrait} alt="" width={896} height={1344} /></span></motion.button></AnimatePresence></div>
                <div className="stage-curtain left" aria-hidden style={{ transform: `translateX(${-curtain * 100}%)` }} /><div className="stage-curtain right" aria-hidden style={{ transform: `translateX(${curtain * 100}%)` }} />
                <p className="stage-status" aria-hidden style={{ opacity: 1 - spot }}>Awaiting entrance</p>
                <div className="stage-audience" aria-hidden style={{ opacity: full * 0.9 }}>{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ height: `${3.2 + ((i * 37) % 7) * 0.25}rem` }} />)}</div>
                <div className="cinematic-speaker-meta" style={{ opacity: full }}><motion.b key={speaker.id} className="speaker-progress" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={FADE} /><span>{String(speakerIndex + 1).padStart(2, "0")} / {String(eventConfig.speakers.length).padStart(2, "0")}</span><h2>{speaker.name}</h2><p>{speaker.role}</p>{hovered ? <p className="speaker-hover-talk">{speaker.talk}</p> : null}<button className="speaker-read" onClick={() => setSelectedSpeaker(speaker)}>Enter their idea <ArrowUpRight /></button></div>
                <div className="cinematic-speaker-controls"><Button variant="outline" size="icon" onClick={() => changeSpeaker(-1)} aria-label="Previous speaker"><ArrowLeft /></Button><Button variant="outline" size="icon" onClick={() => changeSpeaker(1)} aria-label="Next speaker"><ArrowRight /></Button></div>
              </div> : null}

              {index === 3 ? <div className="experience-marquee">{eventConfig.experience.map((item) => <div key={item.index}><span>{item.index}</span><strong>{item.name}</strong><p>{item.text}</p></div>)}</div> : null}
              {index === 4 ? <div className="event-facts"><div><CalendarDays /><span>Date</span><strong>{eventConfig.date}</strong></div><div><Clock3 /><span>Time</span><strong>{eventConfig.time}</strong></div><div><MapPin /><span>Venue</span><strong>{eventConfig.venue}</strong><small>{eventConfig.location}</small></div></div> : null}
              {index === 5 ? <><div className="cinematic-cta"><MagneticLink href={eventConfig.ticketUrl} className="ticket-cta"><span>Get your ticket</span><ArrowUpRight /></MagneticLink><a className="instagram-link" href={eventConfig.socials[0]?.href} target="_blank" rel="noreferrer"><Instagram /> @tedxrset</a></div><footer className="cinematic-footer"><span><TedxWord text="TEDx" /> Rajagiri</span><a href={`mailto:${eventConfig.contact}`}>{eventConfig.contact}</a><a href={eventConfig.socials[0]?.href} target="_blank" rel="noreferrer">Instagram</a><span>This independent TEDx event is operated under license from TED.</span></footer></> : null}
            </section>
          );
        })}
      </div>

      <nav className="timeline-nav" aria-label="Cinematic scenes"><div className="timeline-track"><b style={{ transform: `scaleY(${visualProgress})` }} />{eventConfig.scenes.map((scene, index) => <button key={scene.index} className={activeScene === index ? "is-active" : ""} onClick={() => { targetProgress.current = index / (SCENE_COUNT - 1); }} aria-label={`Go to ${scene.label}`}><span>{scene.label}</span></button>)}</div></nav>
      {activeScene < 5 ? <div className="input-cue"><span>Scroll or swipe to travel</span><i /></div> : null}
      {selectedSpeaker ? <SpeakerDetail speaker={selectedSpeaker} open onOpenChange={(open) => { if (!open) setSelectedSpeaker(null); }} /> : null}
    </main>
  );
}