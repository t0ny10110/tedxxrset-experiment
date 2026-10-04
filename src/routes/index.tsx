import { createFileRoute } from "@tanstack/react-router";
import { EventExperience } from "@/components/EventExperience";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "TEDx Rajagiri — TEDx x RSET, 16 January 2027" },
      { name: "description", content: "Step onto the TEDx Rajagiri stage: speakers, schedule and tickets for 16 January 2027 at RSET, Kochi." },
      { property: "og:title", content: "TEDx Rajagiri — TEDx x RSET" },
      { property: "og:description", content: "Speakers, schedule and tickets for TEDx Rajagiri at RSET, Kochi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventExperience,
});
