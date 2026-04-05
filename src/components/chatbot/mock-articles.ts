import type { ChatArticle } from "@/components/chatbot/types";

export const CHATBOT_ARTICLES: ChatArticle[] = [
  {
    id: "guitar-setup-live",
    title: "Stable Live Guitar Setup in 10 Minutes",
    summary:
      "A quick guide to action, intonation, and tuning checks before a show so your guitar stays stable through the full set.",
    readTime: "4 min",
    category: "Gear Setup",
    publishedAt: "April 2026",
    helpUrl: "https://faq.bibit.id/id/",
    content: [
      "Start by checking neck relief and action height at the 12th fret. For live use, slightly higher action is often safer against fret buzz when dynamics increase.",
      "Next, verify intonation on each string with a reliable tuner. Do not jump to pickup height before intonation is correct, because bad intonation will skew your tone decisions.",
      "Finally, run a short three-song set simulation with your actual strumming and bending style. If tuning remains stable, your setup is stage-ready.",
    ],
  },
  {
    id: "pedalboard-order",
    title: "Efficient Pedalboard Order from Clean to Lead",
    summary:
      "A flexible core pedal chain for weekly rehearsals, quick recordings, and small shows without complex routing.",
    readTime: "5 min",
    category: "Effects",
    publishedAt: "March 2026",
    helpUrl: "https://faq.bibit.id/id/",
    content: [
      "A safe order for most setups is tuner, compressor, drive, modulation, delay, then reverb. This arrangement gives cleaner gain control when moving from clean to lead.",
      "If noise rises with higher gain, fix power supply and patch cable quality before adding a noise gate. The root issue is usually an unstable power chain.",
      "Keep two core level presets: rhythm and lead. Small and consistent level differences usually work better than extreme tones that are hard to manage in a full-band mix.",
    ],
  },
  {
    id: "amp-room-matching",
    title: "Matching Amplifier Settings to Room Size",
    summary:
      "How to choose amp headroom and EQ so your tone stays clear without masking other instruments in small rehearsal rooms.",
    readTime: "6 min",
    category: "Amplifier",
    publishedAt: "February 2026",
    helpUrl: "https://faq.bibit.id/id/",
    content: [
      "In smaller rooms, focus on mid clarity and controlled low-end. Excess bass can sound big when soloed but disappear once the full band starts playing.",
      "Set your master volume for adequate headroom first, then shape character with the gain channel. This keeps transitions between songs more consistent.",
      "Test settings with the drummer during the loudest song dynamics, not during light soundcheck moments. The heaviest scenario is the most realistic reference for live performance.",
    ],
  },
  {
    id: "quick-home-recording",
    title: "Fast Home Recording Workflow for Clean Drafts",
    summary:
      "A simple framework to capture song ideas quickly with clean quality and without a complex studio setup.",
    readTime: "4 min",
    category: "Recording",
    publishedAt: "January 2026",
    helpUrl: "https://faq.bibit.id/id/",
    content: [
      "Prepare a project template with core tracks, click track, and basic buses before recording. A stable template saves time when ideas come quickly.",
      "Record a guide track with a metronome first, then layer instruments gradually. This structure makes editing easier and keeps timing tight across tracks.",
      "During early mixing, prioritize level balance and panning before heavy plugins. Many demos already sound solid with correct gain staging alone.",
    ],
  },
];

export function findChatbotArticleById(articleId: string) {
  return CHATBOT_ARTICLES.find((article) => article.id === articleId) ?? null;
}
