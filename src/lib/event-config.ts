import anikaPortrait from "@/assets/speaker-anika.png";
import eliasPortrait from "@/assets/speaker-elias.png";
import speaker3 from "@/assets/speaker-3.png";
import speaker4 from "@/assets/speaker-4.png";
import speaker5 from "@/assets/speaker-5.png";
import speaker6 from "@/assets/speaker-6.png";
import speaker7 from "@/assets/speaker-7.png";


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
    {
      id: "speaker-3",
      name: "Speaker 3",
      role: "Speaker profile coming soon",
      talk: "The future we haven't imagined yet",
      manifesto: "Every big change starts as a small, strange idea.",
      bio: "The third speaker announcement for TEDx Rajagiri is coming soon.",
      portrait: speaker3,
    },
    {
      id: "speaker-4",
      name: "Speaker 4",
      role: "Speaker profile coming soon",
      talk: "Designing for the people left out",
      manifesto: "Better ideas begin by asking who is missing.",
      bio: "The fourth speaker announcement for TEDx Rajagiri is coming soon.",
      portrait: speaker4,
    },
    {
      id: "speaker-5",
      name: "Speaker 5",
      role: "Speaker profile coming soon",
      talk: "What science still can't explain",
      manifesto: "Curiosity is the oldest engine of progress.",
      bio: "The fifth speaker announcement for TEDx Rajagiri is coming soon.",
      portrait: speaker5,
    },
    {
      id: "speaker-6",
      name: "Speaker 6",
      role: "Speaker profile coming soon",
      talk: "Leading when the map runs out",
      manifesto: "Courage is choosing to move before you are certain.",
      bio: "The sixth speaker announcement for TEDx Rajagiri is coming soon.",
      portrait: speaker6,
    },
    {
      id: "speaker-7",
      name: "Speaker 7",
      role: "Speaker profile coming soon",
      talk: "Building with nothing but nerve",
      manifesto: "Start with what you have. The rest follows.",
      bio: "The seventh speaker announcement for TEDx Rajagiri is coming soon.",
      portrait: speaker7,
    },
  ] satisfies Speaker[],
  scenes: [
    { index: "01", label: "Intro", eyebrow: "TEDx Rajagiri", title: "TEDx x RSET", text: "A stage waits in the dark. Move forward to ignite it." },
    { index: "02", label: "The idea", eyebrow: "Worth spreading", title: "One thought changes everything", text: "Progress begins when a familiar world is seen from an unfamiliar angle." },
    { index: "03", label: "Speakers", eyebrow: "Voices on the red circle", title: "Step into the light", text: "Seven voices. Seven perspectives. One room ready to listen." },
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