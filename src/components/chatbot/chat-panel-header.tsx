import Image from "next/image";
import type { ChatOperator, ChatViewMode } from "@/components/chatbot/types";

type ChatPanelHeaderProps = {
  operators: ChatOperator[];
  isMobile: boolean;
  activeView: ChatViewMode;
  onSwitchView: (view: ChatViewMode) => void;
  onClose: () => void;
};

export default function ChatPanelHeader({
  operators,
  isMobile,
  activeView,
  onSwitchView,
  onClose,
}: ChatPanelHeaderProps) {
  const showOperatorInfo = activeView === "conversation";

  return (
    <header className="relative overflow-hidden bg-[var(--chatbot-accent)] flex-shrink-0">
      {/* Subtle tile/wallpaper pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--chatbot-on-accent) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden="true"
      />

      {/* Top row: tabs + close button */}
      <div className="relative z-10 flex items-center justify-between px-3 pb-2 pt-3">
        <div className="flex items-center gap-[3px] rounded-full bg-[var(--chatbot-control-bg)] p-[3px]">
          <button
            type="button"
            aria-label="Conversation"
            onClick={() => onSwitchView("conversation")}
            className={`rounded-full px-3.5 py-1.5 text-[0.72rem] font-semibold transition-colors ${
              activeView === "conversation"
                ? "bg-[var(--chatbot-surface)] text-[var(--chatbot-accent)] shadow-[0_2px_8px_var(--chatbot-shadow-soft)]"
                : "text-[var(--chatbot-on-accent-muted)] hover:text-[var(--chatbot-on-accent)]"
            }`}
          >
            Conversation
          </button>
          <button
            type="button"
            aria-label="Articles"
            onClick={() => onSwitchView("article")}
            className={`rounded-full px-3.5 py-1.5 text-[0.72rem] font-semibold transition-colors ${
              activeView === "article"
                ? "bg-[var(--chatbot-surface)] text-[var(--chatbot-accent)] shadow-[0_2px_8px_var(--chatbot-shadow-soft)]"
                : "text-[var(--chatbot-on-accent-muted)] hover:text-[var(--chatbot-on-accent)]"
            }`}
          >
            Articles
          </button>
        </div>

        <button
          type="button"
          aria-label={isMobile ? "Close chat" : "Minimize chat"}
          onClick={onClose}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--chatbot-control-border)] bg-[var(--chatbot-control-bg)] text-[var(--chatbot-on-accent)] transition-colors hover:bg-[var(--chatbot-control-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chatbot-control-border)]"
        >
          <svg
            width="15"
            height="15"
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
        </button>
      </div>
      {showOperatorInfo ? (
        <div className="relative z-10 px-4 pb-4 pt-1">
          <div className="mb-3 flex items-start gap-4">
            {operators.slice(0, 3).map((operator) => (
              <div key={operator.id} className="flex flex-col items-center gap-1">
                {operator.avatar ? (
                  <Image
                    src={operator.avatar}
                    alt={operator.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border-2 border-[var(--chatbot-control-border)] bg-[var(--chatbot-control-bg)] object-cover shadow-[0_2px_8px_var(--chatbot-shadow-soft)]"
                  />
                ) : (
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--chatbot-control-border)] bg-[var(--chatbot-control-bg)] text-[0.7rem] font-semibold uppercase text-[var(--chatbot-on-accent)] shadow-[0_2px_8px_var(--chatbot-shadow-soft)]">
                    {operator.name.slice(0, 2)}
                  </span>
                )}
                <span className="text-[0.62rem] font-semibold text-[var(--chatbot-on-accent)]">
                  {operator.name}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[0.95rem] font-bold leading-snug text-[var(--chatbot-on-accent)]">
            Have questions? Talk to our team.
          </p>

          <div className="mt-1.5 flex items-center gap-1.5">
            <span
              className="inline-flex h-2 w-2 rounded-full bg-[var(--chatbot-online)]"
              aria-hidden="true"
            />
            <span className="text-[0.72rem] text-[var(--chatbot-on-accent-muted)]">
              Usually replies within 2 hours
            </span>
          </div>
        </div>
      ) : (
        <div className="relative z-10 px-4 pb-3 pt-0.5">
          <p className="text-[0.92rem] font-bold text-[var(--chatbot-on-accent)]">
            Most Read Articles
          </p>
        </div>
      )}
    </header>
  );
}
