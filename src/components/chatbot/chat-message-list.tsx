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

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

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
                {message.text ? (
                  <p className="whitespace-pre-wrap break-words">{message.text}</p>
                ) : null}

                {message.attachments && message.attachments.length > 0 ? (
                  <div className={`${message.text ? "mt-2" : ""} space-y-1.5`}>
                    {message.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 ${
                          isOperator
                            ? "border-[var(--chatbot-border)] bg-[var(--chatbot-surface-subtle)]"
                            : "border-[color-mix(in_oklab,var(--chatbot-on-accent)_35%,transparent)] bg-[color-mix(in_oklab,var(--chatbot-on-accent)_16%,transparent)]"
                        }`}
                      >
                        {attachment.kind === "image" && attachment.previewUrl ? (
                          <Image
                            src={attachment.previewUrl}
                            alt={attachment.name}
                            width={40}
                            height={40}
                            unoptimized
                            className="h-10 w-10 rounded-lg border border-[var(--chatbot-border)] object-cover"
                          />
                        ) : (
                          <span
                            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-[0.62rem] font-semibold ${
                              isOperator
                                ? "border border-[var(--chatbot-border)] bg-[var(--chatbot-surface)] text-[var(--chatbot-text-muted)]"
                                : "bg-[color-mix(in_oklab,var(--chatbot-on-accent)_20%,transparent)] text-[var(--chatbot-on-accent)]"
                            }`}
                          >
                            PDF
                          </span>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-[0.73rem] font-semibold">
                            {attachment.name}
                          </p>
                          <p
                            className={`text-[0.65rem] ${
                              isOperator
                                ? "text-[var(--chatbot-text-muted)]"
                                : "text-[var(--chatbot-on-accent-muted)]"
                            }`}
                          >
                            {formatFileSize(attachment.size)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

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
