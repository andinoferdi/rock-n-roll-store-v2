type EmojiGroup = {
  id: string;
  title: string;
  items: string[];
};

const EMOJI_GROUPS: EmojiGroup[] = [
  {
    id: "smileys",
    title: "Smileys & People",
    items: [
      "\u{1F600}",
      "\u{1F601}",
      "\u{1F602}",
      "\u{1F923}",
      "\u{1F603}",
      "\u{1F604}",
      "\u{1F605}",
      "\u{1F606}",
      "\u{1F609}",
      "\u{1F60A}",
      "\u{1F60B}",
      "\u{1F60E}",
      "\u{1F60D}",
      "\u{1F618}",
      "\u{1F617}",
      "\u{1F619}",
      "\u{1F61A}",
      "\u{1F642}",
      "\u{1F917}",
      "\u{1F929}",
      "\u{1F914}",
      "\u{1F610}",
      "\u{1F611}",
      "\u{1F636}",
      "\u{1F644}",
      "\u{1F60F}",
      "\u{1F623}",
      "\u{1F625}",
      "\u{1F62E}",
      "\u{1F910}",
      "\u{1F62F}",
      "\u{1F62A}",
      "\u{1F62B}",
      "\u{1F971}",
      "\u{1F634}",
      "\u{1F60C}",
      "\u{1F61B}",
      "\u{1F61C}",
      "\u{1F61D}",
      "\u{1F924}",
    ],
  },
  {
    id: "gestures",
    title: "Popular Gestures",
    items: [
      "\u{1F44D}",
      "\u{1F44E}",
      "\u{1F44F}",
      "\u{1F64C}",
      "\u{1F64F}",
      "\u{1F44C}",
      "\u{1F91D}",
      "\u{1F525}",
      "\u{2764}\u{FE0F}",
      "\u{1F4AF}",
      "\u{1F3B8}",
      "\u{1F3B5}",
      "\u{1F3B6}",
      "\u{1F69A}",
      "\u{1F4E6}",
      "\u{1F6CD}\u{FE0F}",
      "\u{2B50}",
      "\u{2705}",
      "\u{26A1}",
      "\u{1F3AF}",
    ],
  },
];

type ChatEmojiPickerProps = {
  onPickEmoji: (emoji: string) => void;
};

export default function ChatEmojiPicker({ onPickEmoji }: ChatEmojiPickerProps) {
  return (
    <div
      id="chatbot-emoji-picker"
      className="absolute bottom-[calc(100%+0.5rem)] left-3 right-3 z-20 overflow-hidden rounded-2xl border border-[var(--chatbot-border)] bg-[var(--chatbot-surface)] shadow-[0_10px_24px_-10px_var(--chatbot-shadow-strong)]"
      role="dialog"
      aria-label="Emoji picker"
    >
      <div className="chatbot-scrollable max-h-56 space-y-3 overflow-y-auto p-3">
        {EMOJI_GROUPS.map((group) => (
          <section key={group.id}>
            <p className="mb-2 text-[0.78rem] font-semibold text-[var(--chatbot-text-muted)]">
              {group.title}
            </p>
            <div className="grid grid-cols-8 gap-1.5">
              {group.items.map((emoji) => (
                <button
                  key={`${group.id}-${emoji}`}
                  type="button"
                  aria-label={`Insert emoji ${emoji}`}
                  onClick={() => onPickEmoji(emoji)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[1.25rem] leading-none transition-colors hover:bg-[var(--chatbot-surface-subtle)]"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="border-t border-[var(--chatbot-border)] px-3 py-2">
        <span className="inline-flex items-center rounded-full bg-[var(--chatbot-accent)] px-3 py-1 text-[0.75rem] font-semibold text-[var(--chatbot-on-accent)]">
          Smileys
        </span>
      </div>
    </div>
  );
}
