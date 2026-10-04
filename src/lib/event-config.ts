import dulquerPortrait from "@/assets/speaker-dulquer.png";
import fahadhPortrait from "@/assets/speaker-fahadh.png";
import mohanlalPortrait from "@/assets/speaker-mohanlal.png";
import mammoottyPortrait from "@/assets/speaker-mammootty.png";

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
      id: "dulquer-salmaan",
      name: "Dulquer Salmaan",
      role: "Actor & Film Producer",
      talk: "An idea ready to take the stage",
      manifesto: "A new perspective begins with one brave question.",
      bio: "Dulquer Salmaan is an acclaimed actor and film producer known for pushing creative boundaries across Indian cinema.",
      portrait: dulquerPortrait,
    },
    {
      id: "fahadh-faasil",
      name: "Fahadh Faasil",
      role: "National Award Winning Actor",
      talk: "A story that changes the room",
      manifesto: "The right idea keeps moving long after the lights fade.",
      bio: "Fahadh Faasil is a celebrated National Award-winning actor renowned for his intense performances and cinematic vision.",
      portrait: fahadhPortrait,
    },
    {
      id: "mohanlal",
      name: "Mohanlal",
      role: "Iconic Cinema Legend & Director",
      talk: "The future we haven't imagined yet",
      manifesto: "Every big change starts as a small, strange idea.",
      bio: "Mohanlal Viswanathan is one of Indian cinema's greatest legends, spanning over four decades of transformative storytelling.",
      portrait: mohanlalPortrait,
    },
    {
      id: "mammootty",
      name: "Mammootty",
      role: "Padma Shri & Veteran Actor",
      talk: "Designing for the people left out",
      manifesto: "Better ideas begin by asking who is missing.",
      bio: "Mammootty is a Padma Shri recipient and titan of Indian cinema, inspiring generations through groundbreaking art.",
      portrait: mammoottyPortrait,
    },
    {
      id: "dulquer-salmaan-2",
      name: "Dulquer Salmaan",
      role: "Keynote Speaker",
      talk: "What science still can't explain",
      manifesto: "Curiosity is the oldest engine of progress.",
      bio: "Exploring how art and storytelling bridge the gap between imagination and technological innovation.",
      portrait: dulquerPortrait,
    },
    {
      id: "fahadh-faasil-2",
      name: "Fahadh Faasil",
      role: "Keynote Speaker",
      talk: "Leading when the map runs out",
      manifesto: "Courage is choosing to move before you are certain.",
      bio: "Navigating unchartered creative paths and redefining the modern storytelling landscape.",
      portrait: fahadhPortrait,
    },
    {
      id: "mohanlal-2",
      name: "Mohanlal",
      role: "Honorary Speaker",
      talk: "Building with nothing but nerve",
      manifesto: "Start with what you have. The rest follows.",
      bio: "Reflections on passion, persistence, and decades of mastery on stage and screen.",
      portrait: mohanlalPortrait,
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