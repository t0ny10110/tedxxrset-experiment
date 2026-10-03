import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Clock3, MapPin, X } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { eventConfig, type Speaker } from "@/lib/event-config";
import { CustomCursor } from "./CustomCursor";
import { MagneticLink } from "./MagneticLink";

const StageCanvas = lazy(() => import("./StageCanvas").then((module) => ({ default: module.StageCanvas })));

function MaskedLines({ lines, className = "" }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  return (
    <div ref={ref} className={className}>
      {lines.map((line, index) => (
        <span className="masked-line" key={line}>
          <motion.span initial={{ y: "110%", filter: "blur(8px)" }} animate={inView ? { y: 0, filter: "blur(0px)" } : { y: "110%", filter: "blur(8px)" }} transition={{ duration: 0.9, delay: index * 0.11, ease: [0.16, 1, 0.3, 1] }}>{line}</motion.span>
        </span>
      ))}
    </div>
  );
}

function SpeakerDetail({ speaker, open, onOpenChange }: { speaker: Speaker; open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="speaker-dialog max-w-none border-0 p-0" onOpenAutoFocus={(event) => event.preventDefault()}>
        <Button variant="ghost" size="icon" className="speaker-dialog-close" onClick={() => onOpenChange(false)} aria-label="Close speaker details"><X /></Button>
        <div className="speaker-dialog-portrait"><img src={speaker.portrait} alt={speaker.name} width={896} height={1344} /></div>
        <div className="speaker-dialog-copy">
          <p className="eyebrow">Featured speaker</p>
          <DialogTitle>{speaker.name}</DialogTitle>
          <DialogDescription>{speaker.role}</DialogDescription>
          <blockquote>“{speaker.manifesto}”</blockquote>
          <p>{speaker.bio}</p>
          <div className="speaker-dialog-talk"><span>Talk</span><strong>{speaker.talk}</strong></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function EventExperience() {
  const journeyRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [chapter, setChapter] = useState(0);
  const [speakerIndex, setSpeakerIndex] = useState(0);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const section = journeyRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const next = distance > 0 ? Math.max(0, Math.min(1, -rect.top / distance)) : 0;
      progress.current = next;
      setChapter(Math.min(3, Math.floor(next * 4.05)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const onPointer = (event: PointerEvent) => {
      pointer.current = { x: event.clientX / window.innerWidth - 0.5, y: event.clientY / window.innerHeight - 0.5 };
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(frame);
    };
  }, []);

  const speaker = eventConfig.speakers[speakerIndex] ?? eventConfig.speakers[0];
  const changeSpeaker = (direction: number) => setSpeakerIndex((current) => (current + direction + eventConfig.speakers.length) % eventConfig.speakers.length);
  const chapters = [
    { number: "I", title: "Before the idea", text: "A room waits. One red circle holds the promise of everything unsaid." },
    { number: "II", title: "Ignition", text: "The light finds the stage. Attention becomes a shared act." },
    { number: "III", title: "Gathering", text: "A hundred perspectives arrive, ready to collide and connect." },
    { number: "IV", title: "The spark", text: "One voice steps forward. The known world begins to move." },
  ];
  const activeChapter = chapters[chapter] ?? chapters[0];

  return (
    <main>
      <CustomCursor />
      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${eventConfig.brand} home`}><strong>TED<sup>x</sup></strong><span>Northbridge</span></a>
        <MagneticLink href="#tickets" className="header-ticket">Tickets <ArrowUpRight /></MagneticLink>
      </header>

      <section ref={journeyRef} className="stage-journey" id="top" aria-label="Event story">
        <div className="stage-sticky">
          <div className="stage-canvas" aria-hidden><Suspense fallback={<div className="stage-fallback" />}><StageCanvas progress={progress} pointer={pointer} /></Suspense></div>
          <div className="stage-vignette" />
          <div className="hero-copy">
            <p className="eyebrow">{eventConfig.date} · {eventConfig.location}</p>
            <h1><span>TED<sup>x</sup></span> {eventConfig.theme}</h1>
            <p className="hero-sub">An invitation to leave certainty at the door.</p>
          </div>
          <div className="journey-chapter" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={chapter} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45 }}>
                <span>{activeChapter.number} / IV</span><h2>{activeChapter.title}</h2><p>{activeChapter.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="scroll-cue"><span>Scroll to explore</span><i /></div>
          <div className="chapter-rail">{chapters.map((item, index) => <span key={item.number} className={index === chapter ? "is-active" : ""} />)}</div>
        </div>
      </section>

      <section className="ideas-section">
        <p className="eyebrow">The purpose</p>
        <MaskedLines lines={["Ideas", "worth", "spreading."]} className="ideas-title" />
        <p className="ideas-copy">Not answers handed down from a stage. New questions, made electric by a room full of curious minds.</p>
      </section>

      <section className="theme-section">
        <div className="theme-orbit" aria-hidden><span /><span /><i /></div>
        <div className="theme-copy"><p className="eyebrow">2027 theme</p><MaskedLines lines={["Beyond", "the known"]} className="theme-title" /><p>Progress begins at the edge of what we understand. Together, we cross that edge.</p></div>
      </section>

      <section className="speaker-stage" id="speakers">
        <div className="speaker-backdrop" aria-hidden><AnimatePresence mode="wait"><motion.div key={speaker.id} initial={{ opacity: 0, x: 80, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0% 0)" }} exit={{ opacity: 0, x: -80, clipPath: "inset(100% 0 0 0)" }} transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}><p>{speaker.talk}</p><span>{speaker.manifesto}</span></motion.div></AnimatePresence></div>
        <div className="speaker-heading"><p className="eyebrow">Voices on the red circle</p><h2>The speakers</h2></div>
        <div className="speaker-visual">
          <div className="speaker-spotlight" />
          <AnimatePresence mode="wait">
            <motion.button key={speaker.id} className="speaker-portrait" initial={{ opacity: 0, x: 260, filter: "brightness(0) contrast(1.3) blur(4px)" }} animate={{ opacity: [0, 1, 1], x: [260, 0, 0], filter: ["brightness(0) contrast(1.3) blur(4px)", "brightness(0) contrast(1.3) blur(0px)", "brightness(1) contrast(1.12) blur(0px)"] }} exit={{ opacity: [1, 0.9, 0], x: [0, -20, -230], filter: ["brightness(1) contrast(1.12) blur(0px)", "brightness(0) contrast(1.3) blur(0px)", "brightness(0) contrast(1.3) blur(5px)"] }} transition={{ duration: 1.15, times: [0, 0.58, 1], ease: [0.16, 1, 0.3, 1] }} onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--speaker-x", `${((event.clientX - rect.left) / rect.width - 0.5) * 12}px`); event.currentTarget.style.setProperty("--speaker-y", `${((event.clientY - rect.top) / rect.height - 0.5) * 8}px`); }} onPointerLeave={(event) => { event.currentTarget.style.setProperty("--speaker-x", "0px"); event.currentTarget.style.setProperty("--speaker-y", "0px"); }} onClick={() => setSelectedSpeaker(speaker)} aria-label={`Open ${speaker.name} details`}>
              <img src={speaker.portrait} alt="" width={896} height={1344} loading="lazy" />
            </motion.button>
          </AnimatePresence>
        </div>
        <div className="speaker-meta"><span>{String(speakerIndex + 1).padStart(2, "0")} / {String(eventConfig.speakers.length).padStart(2, "0")}</span><h3>{speaker.name}</h3><p>{speaker.role}</p><button className="speaker-read" onClick={() => setSelectedSpeaker(speaker)}>Enter their idea <ArrowUpRight /></button></div>
        <div className="speaker-controls"><Button variant="outline" size="icon" onClick={() => changeSpeaker(-1)} aria-label="Previous speaker"><ArrowLeft /></Button><Button variant="outline" size="icon" onClick={() => changeSpeaker(1)} aria-label="Next speaker"><ArrowRight /></Button></div>
      </section>

      <section className="experience-section">
        <div className="experience-intro"><p className="eyebrow">Inside the day</p><h2>Not a conference.<br />A shift in perspective.</h2></div>
        <div className="experience-list">{eventConfig.experience.map((item) => <article key={item.index}><span>{item.index}</span><h3>{item.name}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className="info-section" id="information">
        <div className="info-title"><p className="eyebrow">The invitation</p><h2>One day.<br />Leave different.</h2></div>
        <div className="info-facts"><div><CalendarDays /><span>Date</span><strong>{eventConfig.date}</strong></div><div><Clock3 /><span>Time</span><strong>{eventConfig.time}</strong></div><div><MapPin /><span>Venue</span><strong>{eventConfig.venue}</strong><small>{eventConfig.location}</small></div></div>
        <div className="schedule"><p className="eyebrow">Programme</p>{eventConfig.schedule.map((entry) => <div key={entry.time}><time>{entry.time}</time><span>{entry.item}</span></div>)}</div>
      </section>

      <section className="cta-section" id="tickets"><p className="eyebrow">The room is waiting</p><MaskedLines lines={["Ready to", "explore?"]} className="cta-title" /><MagneticLink href="mailto:tickets@tedxnorthbridge.example" className="ticket-cta"><span>Get your ticket</span><ArrowUpRight /></MagneticLink></section>

      <footer><div className="footer-brand"><strong>TED<sup>x</sup></strong><span>Northbridge</span></div><p>{eventConfig.organizer}</p><a href={`mailto:${eventConfig.contact}`}>{eventConfig.contact}</a><nav aria-label="Social media">{eventConfig.socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}</nav><small>© 2027 TEDx Northbridge</small></footer>
      {selectedSpeaker ? <SpeakerDetail speaker={selectedSpeaker} open onOpenChange={(open) => { if (!open) setSelectedSpeaker(null); }} /> : null}
    </main>
  );
}