"use client";

import Image from "next/image";
import ChatEmojiPicker from "@/components/chatbot/chat-emoji-picker";
import ChatVoiceCard from "@/components/chatbot/chat-voice-card";
import { useAudioRecorder } from "@/components/chatbot/use-audio-recorder";
import { useAttachments } from "@/components/chatbot/use-attachments";
import type { ChatAttachment, ChatAudioClip } from "@/components/chatbot/types";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type RefObject,
} from "react";

type ChatComposerProps = {
  value: string;
  isDisabled: boolean;
  isPanelOpen: boolean;
  inputRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
  onSubmit: (payload: {
    text: string;
    attachments: ChatAttachment[];
    audioClip?: ChatAudioClip | null;
  }) => void;
};

function mimeToLabel(mimeType: string): string {
  const sub = mimeType.split("/")[1] ?? mimeType;
  return sub.split("+")[0].toUpperCase().slice(0, 6);
}

function insertEmojiAtCaret(
  currentValue: string,
  emoji: string,
  textareaElement: HTMLTextAreaElement | null,
) {
  if (!textareaElement) {
    const merged = `${currentValue}${emoji}`;
    return {
      value: merged,
      cursorStart: merged.length,
      cursorEnd: merged.length,
    };
  }
  const start = textareaElement.selectionStart ?? currentValue.length;
  const end = textareaElement.selectionEnd ?? currentValue.length;
  const value = currentValue.slice(0, start) + emoji + currentValue.slice(end);
  const cursor = start + emoji.length;
  return { value, cursorStart: cursor, cursorEnd: cursor };
}

function AttachmentCard({
  attachment,
  onRemove,
}: {
  attachment: ChatAttachment;
  onRemove: () => void;
}) {
  return (
    <div
      className="relative"
      style={{
        animation: "chatbotAttachIn 260ms cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
    >
      <button
        type="button"
        aria-label={`Remove attachment ${attachment.name}`}
        onClick={onRemove}
        className="absolute right-1 top-1 z-10 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--chatbot-accent)] text-[var(--chatbot-on-accent)] transition-transform hover:scale-110 active:scale-95"
      >
        <svg
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div className="flex max-w-[188px] items-center gap-2.5 rounded-xl border border-[var(--chatbot-border)] bg-[var(--chatbot-surface)] px-2.5 py-2 shadow-[0_1px_4px_var(--chatbot-shadow-soft)]">
        {attachment.kind === "image" && attachment.previewUrl ? (
          <Image
            src={attachment.previewUrl}
            alt={attachment.name}
            width={40}
            height={40}
            unoptimized
            className="h-10 w-10 flex-shrink-0 rounded-lg border border-[var(--chatbot-border)] object-cover"
          />
        ) : (
          // Doc icon uses accent token — no hardcoded hex
          <span
            className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--chatbot-accent)] text-[var(--chatbot-on-accent)]"
            aria-hidden="true"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </span>
        )}

        <div className="min-w-0">
          <p className="truncate text-[0.73rem] font-semibold leading-tight text-[var(--chatbot-text)]">
            {attachment.name.replace(/\.[^.]+$/, "")}
          </p>
          <p className="mt-0.5 text-[0.65rem] font-medium text-[var(--chatbot-text-muted)]">
            {mimeToLabel(attachment.mimeType)}
          </p>
        </div>
      </div>
    </div>
  );
}

function InlineError({ message }: { message: string }) {
  return (
    <div
      className="mx-3 mt-2 flex items-start gap-1.5 rounded-lg border border-[var(--chatbot-border)] bg-[var(--chatbot-article-surface)] px-2.5 py-1.5"
      role="status"
      aria-live="polite"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-[1px] flex-shrink-0 text-[var(--chatbot-text-muted)]"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p className="text-[0.7rem] leading-snug text-[var(--chatbot-text-muted)]">
        {message}
      </p>
    </div>
  );
}

export default function ChatComposer({
  value,
  isDisabled,
  isPanelOpen,
  inputRef,
  onChange,
  onSubmit,
}: ChatComposerProps) {
  const {
    recorderState,
    audioDraft,
    recordingDurationSec,
    audioError,
    waveformBars,
    handleRecordClick,
    stopRecording,
    clearAudioDraft,
  } = useAudioRecorder({ isPanelOpen });

  const {
    attachments,
    attachmentError,
    removeAttachment,
    handleFileSelection,
    clearAttachments,
  } = useAttachments();

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;

    const maxHeight = 260;
    el.style.height = "auto";
    const nextHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${nextHeight}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
    el.style.overflowX = "hidden";
    el.style.overflowWrap = "break-word";
  }, [inputRef, value]);

  // Close emoji picker on outside click or Escape
  useEffect(() => {
    if (!isEmojiPickerOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsEmojiPickerOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsEmojiPickerOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isEmojiPickerOpen]);

  const handleSubmit = () => {
    const trimmedText = value.trim();
    if (isDisabled || (!trimmedText && attachments.length === 0 && !audioDraft))
      return;

    onSubmit({ text: trimmedText, attachments, audioClip: audioDraft });
    setIsEmojiPickerOpen(false);
    clearAttachments({ revoke: false });
    clearAudioDraft({ revoke: false });
  };

  const handlePickEmoji = (emoji: string) => {
    const insertion = insertEmojiAtCaret(value, emoji, inputRef.current);
    onChange(insertion.value);

    window.requestAnimationFrame(() => {
      const el = inputRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(insertion.cursorStart, insertion.cursorEnd);
    });
  };

  const hasContent =
    value.trim().length > 0 || attachments.length > 0 || audioDraft !== null;
  const showVoiceCard = recorderState !== "idle" || audioDraft !== null;

  return (
    <div
      ref={wrapperRef}
      className="relative flex-shrink-0 border-t border-[var(--chatbot-border)] bg-[var(--chatbot-surface)]"
    >
      <style>{`
        @keyframes chatbotAttachIn {
          from { opacity: 0; transform: translateY(6px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0px) scale(1); }
        }
        @keyframes chatbotRecordPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.45; }
        }
      `}</style>

      {/* Emoji picker */}
      {isEmojiPickerOpen && <ChatEmojiPicker onPickEmoji={handlePickEmoji} />}

      {/* Attachment preview strip */}
      {attachments.length > 0 && (
        <div className="px-3 pt-3">
          <div className="chatbot-scrollable flex max-h-[7rem] flex-wrap gap-3 overflow-y-auto pb-0.5 pl-0.5 pr-0.5 pt-0.5">
            {attachments.map((attachment) => (
              <AttachmentCard
                key={attachment.id}
                attachment={attachment}
                onRemove={() => removeAttachment(attachment.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Voice card: recording / processing / recorded */}
      {showVoiceCard && (
        <div className="px-3 pt-2">
          <ChatVoiceCard
            recorderState={recorderState}
            audioDraft={audioDraft}
            recordingDurationSec={recordingDurationSec}
            waveformBars={waveformBars}
            onStop={stopRecording}
            onClearDraft={clearAudioDraft}
          />
        </div>
      )}

      {/* Inline errors */}
      {attachmentError && <InlineError message={attachmentError} />}
      {audioError && <InlineError message={audioError} />}

      {/* Textarea */}
      <div className="px-4 pb-1 pt-3">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            onChange(event.target.value)
          }
          placeholder="Write your message..."
          aria-label="Write your message"
          rows={1}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit();
            }
          }}
          className="min-h-[36px] w-full resize-none bg-transparent text-[0.86rem] leading-[1.55] text-[var(--chatbot-text)] outline-none placeholder:text-[var(--chatbot-text-subtle)]"
          style={{ overflow: "hidden", overflowWrap: "break-word" }}
        />
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 pb-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          multiple
          className="sr-only"
          onChange={handleFileSelection}
          aria-label="Attach files"
        />

        <div className="flex items-center gap-1">
          {/* Emoji toggle */}
          <button
            type="button"
            aria-label="Insert emoji"
            aria-controls="chatbot-emoji-picker"
            aria-expanded={isEmojiPickerOpen}
            onClick={() => setIsEmojiPickerOpen((s) => !s)}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              isEmojiPickerOpen
                ? "bg-[var(--chatbot-surface-subtle)] text-[var(--chatbot-accent)]"
                : "text-[var(--chatbot-text-subtle)] hover:bg-[var(--chatbot-surface-subtle)] hover:text-[var(--chatbot-text)]"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 13s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </button>

          {/* Attach */}
          <button
            type="button"
            aria-label="Upload file"
            onClick={() => {
              if (recorderState === "recording") return;
              fileInputRef.current?.click();
            }}
            disabled={recorderState === "recording"}
            className={`relative inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              attachments.length > 0
                ? "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"
                : "text-[var(--chatbot-text-subtle)] hover:bg-[var(--chatbot-surface-subtle)] hover:text-[var(--chatbot-text)]"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
            {attachments.length > 0 && (
              // Count badge uses accent token — no hardcoded hex
              <span
                className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--chatbot-accent)] text-[0.48rem] font-bold text-[var(--chatbot-on-accent)]"
                aria-hidden="true"
              >
                {attachments.length}
              </span>
            )}
          </button>

          {/* Record audio */}
          <button
            type="button"
            aria-label={
              recorderState === "recording"
                ? "Stop recording audio message"
                : "Record audio message"
            }
            onClick={() => handleRecordClick(isDisabled)}
            disabled={recorderState === "processing"}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              recorderState === "recording"
                ? "bg-red-500 text-white hover:bg-red-600"
                : recorderState === "processing"
                  ? "cursor-not-allowed opacity-40 text-[var(--chatbot-text-subtle)]"
                  : "text-[var(--chatbot-text-subtle)] hover:bg-[var(--chatbot-surface-subtle)] hover:text-[var(--chatbot-text)]"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
        </div>

        {/* Send */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled || !hasContent}
          aria-label="Send message"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--chatbot-accent)] text-[var(--chatbot-on-accent)] shadow-[0_2px_8px_var(--chatbot-shadow-soft)] transition-all duration-150 hover:bg-[var(--chatbot-accent-strong)] disabled:cursor-not-allowed disabled:opacity-40"
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
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
