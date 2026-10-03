import { createFileRoute } from "@tanstack/react-router";
import { EventExperience } from "@/components/EventExperience";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "TEDx Northbridge — Beyond the Known" },
      { name: "description", content: "Step into Beyond the Known, a one-day TEDx experience of ideas, performance, and human connection." },
      { property: "og:title", content: "TEDx Northbridge — Beyond the Known" },
      { property: "og:description", content: "A cinematic TEDx experience where unfamiliar ideas take the stage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventExperience,
});
