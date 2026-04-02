import Image from "next/image";
import type { ChatMessage } from "@/components/chatbot/types";
import { useEffect, useRef } from "react";

type ChatMessageListProps = {
  messages: ChatMessage[];
  isSending: boolean;
};

export default function ChatMessageList({
  messages,
  isSending,
}: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  return (
    <div
      className="chatbot-scrollable flex-1 overflow-y-auto px-3 py-4"
      aria-live="polite"
      aria-relevant="additions text"
    >
      <div className="space-y-2">
        {messages.map((message) => {
          const isOperator = message.sender === "operator";
          const isBrandAvatar = message.avatarUrl?.startsWith("/images/logo/");

          return (
            <article
              key={message.id}
              className={`flex items-end gap-2 ${isOperator ? "justify-start" : "justify-end"}`}
            >
              {/* Operator avatar on the left */}
              {isOperator && (
                <div className="flex-shrink-0 self-end">
                  {message.avatarUrl ? (
                    <Image
                      src={message.avatarUrl}
                      alt="Support agent"
                      width={28}
                      height={28}
                      className={`h-7 w-7 border border-[var(--chatbot-border)] ${
                        isBrandAvatar
                          ? "rounded-full bg-[var(--chatbot-surface-subtle)] p-0.5 object-contain"
                          : "rounded-full object-cover"
                      }`}
                    />
                  ) : (
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--chatbot-border)] bg-[var(--chatbot-surface-subtle)] text-[0.6rem] font-semibold uppercase text-[var(--chatbot-text-muted)]">
                      AG
                    </span>
                  )}
                </div>
              )}

              <div
                className={`max-w-[78%] text-[0.86rem] leading-[1.55] ${
                  isOperator
                    ? "rounded-2xl rounded-bl-[4px] border border-[var(--chatbot-border)] bg-[var(--chatbot-operator-bubble)] px-3.5 py-2.5 text-[var(--chatbot-text)] shadow-[0_1px_2px_var(--chatbot-shadow-soft)]"
                    : "rounded-2xl rounded-br-[4px] bg-[var(--chatbot-user-bubble)] px-3.5 py-2.5 text-[var(--chatbot-on-accent)]"
                }`}
              >
                <p className="whitespace-pre-wrap break-words">
                  {message.text}
                </p>
                <p
                  className={`mt-1 text-[0.63rem] ${
                    isOperator
                      ? "text-[var(--chatbot-text-subtle)]"
                      : "text-[var(--chatbot-on-accent-muted)]"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </article>
          );
        })}

        {isSending && (
          <div className="flex items-end gap-2">
            {/* Placeholder avatar while sending */}
            <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[var(--chatbot-border)] bg-[var(--chatbot-surface-subtle)] text-[0.6rem] font-semibold uppercase text-[var(--chatbot-text-muted)]">
              AG
            </span>
            <div className="inline-flex items-center gap-1 rounded-2xl rounded-bl-[4px] border border-[var(--chatbot-border)] bg-[var(--chatbot-operator-bubble)] px-4 py-3 shadow-[0_1px_2px_var(--chatbot-shadow-soft)]">
              <span className="h-1.5 w-1.5 animate-[chatbotPulse_1s_ease-in-out_infinite] rounded-full bg-[var(--chatbot-text-subtle)]" />
              <span
                className="h-1.5 w-1.5 animate-[chatbotPulse_1s_ease-in-out_infinite] rounded-full bg-[var(--chatbot-text-subtle)]"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="h-1.5 w-1.5 animate-[chatbotPulse_1s_ease-in-out_infinite] rounded-full bg-[var(--chatbot-text-subtle)]"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
