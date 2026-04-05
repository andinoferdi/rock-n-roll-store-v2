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
      className={`pointer-events-auto fixed bottom-5 right-5 z-[90] inline-flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-[var(--chatbot-accent)] text-[var(--chatbot-on-accent)] shadow-[0_8px_24px_-6px_var(--chatbot-shadow-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chatbot-focus-ring)] focus-visible:ring-offset-2 ${
        expanded && isMobileViewport
          ? "pointer-events-none opacity-0 scale-90"
          : "opacity-100 scale-100"
      }`}
      style={{
        // Separate transitions per property so hover lift doesn't interfere
        // with the open/close scale+opacity — each animates independently.
        transition: [
          "transform 280ms cubic-bezier(0.16, 1, 0.3, 1)",
          "opacity 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          "background-color 150ms ease",
          "box-shadow 200ms ease",
        ].join(", "),
        willChange: "transform, opacity",
      }}
      // Hover/active states via inline so they don't collide with Tailwind utilities
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform =
          "translateY(-2px) scale(1.04)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 14px 32px -6px var(--chatbot-shadow-strong)";
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "var(--chatbot-accent-strong)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "";
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform =
          "translateY(0px) scale(0.97)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "";
      }}
    >
      {/* Close icon — rotates in from 90° */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: expanded ? 1 : 0,
          transform: expanded
            ? "rotate(0deg) scale(1)"
            : "rotate(-90deg) scale(0.7)",
          transition: expanded
            ? "opacity 200ms 60ms ease-out, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)"
            : "opacity 150ms ease-in, transform 200ms ease-in",
        }}
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

      {/* Chat icon — rotates out to 90° when closing */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: expanded ? 0 : 1,
          transform: expanded
            ? "rotate(90deg) scale(0.7)"
            : "rotate(0deg) scale(1)",
          transition: expanded
            ? "opacity 150ms ease-in, transform 200ms ease-in"
            : "opacity 200ms 60ms ease-out, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
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
