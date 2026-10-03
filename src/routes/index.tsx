import { createFileRoute } from "@tanstack/react-router";
import { EventExperience } from "@/components/EventExperience";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "TEDx Rajagiri — Ideas in Motion" },
      { name: "description", content: "Enter a cinematic TEDx Rajagiri experience of ideas, performance, and human connection." },
      { property: "og:title", content: "TEDx Rajagiri — Ideas in Motion" },
      { property: "og:description", content: "A cinematic TEDx experience where ideas move through the room." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventExperience,
});
