import type { RefObject } from "react";

type ChatBubbleProps = {
  expanded: boolean;
  isMobileViewport: boolean;
  hasUnread: boolean;
  panelId: string;
  onToggle: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
};

export default function ChatBubble({
  expanded,
  isMobileViewport,
  hasUnread,
  panelId,
  onToggle,
  buttonRef,
}: ChatBubbleProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={expanded ? "Close chat" : "Open chat"}
      aria-controls={panelId}
      aria-expanded={expanded}
      onClick={onToggle}
      className={`pointer-events-auto fixed bottom-5 right-5 z-[90] inline-flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-[var(--chatbot-accent)] text-[var(--chatbot-on-accent)] shadow-[0_8px_24px_-6px_var(--chatbot-shadow-strong)] hover:-translate-y-[2px] hover:bg-[var(--chatbot-accent-strong)] hover:shadow-[0_12px_28px_-6px_var(--chatbot-shadow-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chatbot-focus-ring)] focus-visible:ring-offset-2 active:translate-y-0 ${
        expanded && isMobileViewport
          ? "pointer-events-none opacity-0 scale-90"
          : "opacity-100 scale-100"
      }`}
      style={{
        transition:
          "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms cubic-bezier(0.22, 1, 0.36, 1), background-color 150ms ease, box-shadow 150ms ease",
        willChange: "transform, opacity",
      }}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
          expanded
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-75"
        }`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
          expanded
            ? "opacity-0 rotate-90 scale-75"
            : "opacity-100 rotate-0 scale-100"
        }`}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="8" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="13" y2="14" />
        </svg>
      </div>

      {hasUnread && !expanded && (
        <span
          className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--chatbot-surface)] bg-[var(--chatbot-unread)] text-[0.5rem] font-bold text-[var(--chatbot-on-accent)]"
          aria-hidden="true"
        >
          1
        </span>
      )}
    </button>
  );
}
