import anikaPortrait from "@/assets/speaker-anika.png";
import eliasPortrait from "@/assets/speaker-elias.png";

export type Speaker = {
  id: string;
  name: string;
  role: string;
  talk: string;
  manifesto: string;
  bio: string;
  portrait: string;
};

export const eventConfig = {
  brand: "TEDx Rajagiri",
  host: "Rajagiri School of Engineering & Technology",
  organizer: "Independently organized TED event",
  theme: "Ideas in Motion",
  date: "16 January 2027",
  time: "10:00 — 18:30",
  venue: "Rajagiri School of Engineering & Technology",
  location: "Kakkanad, Kochi",
  contact: "tedxrset@rajagiritech.edu.in",
  ticketUrl: "mailto:tedxrset@rajagiritech.edu.in",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/tedxrset/" },
  ],
  speakers: [
    {
      id: "anika-rao",
      name: "Speaker 1",
      role: "Speaker profile coming soon",
      talk: "An idea ready to take the stage",
      manifesto: "A new perspective begins with one brave question.",
      bio: "The first speaker announcement for TEDx Rajagiri is coming soon.",
      portrait: anikaPortrait,
    },
    {
      id: "elias-cole",
      name: "Speaker 2",
      role: "Speaker profile coming soon",
      talk: "A story that changes the room",
      manifesto: "The right idea keeps moving long after the lights fade.",
      bio: "The second speaker announcement for TEDx Rajagiri is coming soon.",
      portrait: eliasPortrait,
    },
  ] satisfies Speaker[],
  scenes: [
    { index: "01", label: "Intro", eyebrow: "TEDx Rajagiri", title: "Ideas in motion", text: "A stage waits in the dark. Move forward to ignite it." },
    { index: "02", label: "The idea", eyebrow: "Worth spreading", title: "One thought changes everything", text: "Progress begins when a familiar world is seen from an unfamiliar angle." },
    { index: "03", label: "Speakers", eyebrow: "Voices on the red circle", title: "Step into the light", text: "Two voices. Two perspectives. One room ready to listen." },
    { index: "04", label: "The experience", eyebrow: "Inside the day", title: "More than a conference", text: "Talks, performance, encounters and community move in one shared rhythm." },
    { index: "05", label: "Event", eyebrow: "The invitation", title: "16 January", text: "Rajagiri School of Engineering & Technology · Kakkanad, Kochi" },
    { index: "06", label: "CTA", eyebrow: "The room is waiting", title: "Ready to explore?", text: "Join TEDx Rajagiri and leave with a different view of what comes next." },
  ],
  experience: [
    { index: "01", name: "Talks", text: "Ideas sharpened until every word carries weight." },
    { index: "02", name: "Performances", text: "Live interventions that change the rhythm of the room." },
    { index: "03", name: "Encounters", text: "Conversations designed to continue long after the lights fall." },
    { index: "04", name: "Community", text: "A gathering of people willing to think beyond the obvious." },
  ],
  schedule: [
    { time: "09:15", item: "Doors & first encounters" },
    { time: "10:00", item: "Act I — What we inherit" },
    { time: "13:00", item: "Table conversations" },
    { time: "14:30", item: "Act II — What we invent" },
    { time: "17:30", item: "Closing performance" },
  ],
} as const;