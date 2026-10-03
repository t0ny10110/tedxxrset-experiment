import anikaPortrait from "@/assets/speaker-anika.png";
import eliasPortrait from "@/assets/speaker-elias.png";
import miraPortrait from "@/assets/speaker-mira.png";

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
  brand: "TEDx Northbridge",
  organizer: "Independently organized TED event",
  theme: "Beyond the Known",
  date: "18 April 2027",
  time: "10:00 — 18:30",
  venue: "The Foundry Auditorium",
  location: "Northbridge University, London",
  contact: "hello@tedxnorthbridge.example",
  ticketUrl: "#tickets",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
  speakers: [
    {
      id: "anika-rao",
      name: "Anika Rao",
      role: "Futurist & Systems Thinker",
      talk: "The Futures We Refuse to Imagine",
      manifesto: "Possibility is not prediction. It is a practice.",
      bio: "Anika studies the decisions hiding inside our ideas of progress. Her work helps institutions imagine futures that are not merely probable, but worth choosing.",
      portrait: anikaPortrait,
    },
    {
      id: "elias-cole",
      name: "Elias Cole",
      role: "Architect of Public Life",
      talk: "Cities That Remember Us",
      manifesto: "A place becomes public when everyone leaves a trace.",
      bio: "Elias designs civic spaces around memory, encounter, and belonging. His practice asks how our streets can become instruments for a more generous public life.",
      portrait: eliasPortrait,
    },
    {
      id: "mira-chen",
      name: "Dr. Mira Chen",
      role: "Neuroscientist & Storyteller",
      talk: "Attention Is a World-Building Tool",
      manifesto: "What we notice becomes the world we inhabit.",
      bio: "Mira explores how attention reshapes memory, learning, and collective action. She translates frontier neuroscience into vivid tools for everyday agency.",
      portrait: miraPortrait,
    },
  ] satisfies Speaker[],
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