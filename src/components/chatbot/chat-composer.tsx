import Image from "next/image";
import type { ChatAttachment } from "@/components/chatbot/types";
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
  inputRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
  onSubmit: (payload: { text: string; attachments: ChatAttachment[] }) => void;
};

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

const MAX_ATTACHMENT_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_ATTACHMENT_COUNT = 5;

// Derive a short display label from a MIME type, e.g. "application/pdf" → "PDF"
function mimeToLabel(mimeType: string): string {
  const sub = mimeType.split("/")[1] ?? mimeType;
  return sub.split("+")[0].toUpperCase().slice(0, 6);
}

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function createAttachmentFromFile(file: File): ChatAttachment | null {
  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf";

  if (!isImage && !isPdf) return null;
  if (file.size > MAX_ATTACHMENT_SIZE_BYTES) return null;

  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${file.name}`,
    name: file.name,
    size: file.size,
    mimeType: file.type || "application/octet-stream",
    previewUrl: isImage ? URL.createObjectURL(file) : undefined,
    kind: isImage ? "image" : "document",
  };
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

// ─── Document icon (white paperclip on a green square) ───────────────────────
function DocIcon() {
  return (
    <span
      className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
      style={{ backgroundColor: "#2563eb" }}
      aria-hidden="true"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
      </svg>
    </span>
  );
}

// ─── Individual attachment card — Bibit style ─────────────────────────────────
// Remove badge stays inside the card so it does not get clipped.
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
      {/* Floating × badge */}
      <button
        type="button"
        aria-label={`Remove attachment ${attachment.name}`}
        onClick={onRemove}
        className="absolute right-1 top-1 z-10 inline-flex h-5 w-5 items-center justify-center rounded-full text-white transition-transform hover:scale-110 active:scale-95"
        style={{ backgroundColor: "#2563eb" }}
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

      {/* Card body */}
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
          <DocIcon />
        )}

        <div className="min-w-0">
          {/* Truncate long filenames — strip extension for cleaner display */}
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

export default function ChatComposer({
  value,
  isDisabled,
  inputRef,
  onChange,
  onSubmit,
}: ChatComposerProps) {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [attachmentError, setAttachmentError] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Track attachments for cleanup on unmount
  const attachmentsRef = useRef<ChatAttachment[]>([]);

  // Auto-resize textarea
  useEffect(() => {
    const textareaElement = inputRef.current;
    if (!textareaElement) return;

    const maxHeight = 260;
    textareaElement.style.height = "auto";
    const nextHeight = Math.min(textareaElement.scrollHeight, maxHeight);
    textareaElement.style.height = `${nextHeight}px`;
    textareaElement.style.overflowY =
      textareaElement.scrollHeight > maxHeight ? "auto" : "hidden";
    textareaElement.style.overflowX = "hidden";
    textareaElement.style.overflowWrap = "break-word";
  }, [inputRef, value]);

  // Close emoji picker on outside click / Escape
  useEffect(() => {
    if (!isEmojiPickerOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
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

  // Keep ref in sync for cleanup
  useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);

  // Revoke all object URLs on unmount
  useEffect(() => {
    return () => {
      attachmentsRef.current.forEach((a) => {
        if (a.previewUrl) URL.revokeObjectURL(a.previewUrl);
      });
    };
  }, []);

  const removeAttachment = (attachmentId: string) => {
    setAttachments((current) => {
      const target = current.find((a) => a.id === attachmentId);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return current.filter((a) => a.id !== attachmentId);
    });
    setAttachmentError("");
  };

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;

    const selectedFiles = Array.from(fileList);
    setAttachmentError("");

    setAttachments((current) => {
      const next = [...current];

      for (const file of selectedFiles) {
        if (next.length >= MAX_ATTACHMENT_COUNT) {
          setAttachmentError(`Up to ${MAX_ATTACHMENT_COUNT} files allowed.`);
          break;
        }

        const parsed = createAttachmentFromFile(file);
        if (!parsed) {
          setAttachmentError(
            file.size > MAX_ATTACHMENT_SIZE_BYTES
              ? `${file.name} exceeds 10 MB.`
              : `Only images and PDFs are allowed: ${file.name}`,
          );
          continue;
        }

        next.push(parsed);
      }

      return next;
    });

    // Reset so the same file can be re-selected
    event.target.value = "";
  };

  const handleSubmit = () => {
    const trimmedText = value.trim();
    if (isDisabled || (!trimmedText && attachments.length === 0)) return;

    onSubmit({ text: trimmedText, attachments });
    setAttachments([]);
    setAttachmentError("");
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

  const hasContent = value.trim().length > 0 || attachments.length > 0;

  return (
    <div
      ref={wrapperRef}
      className="relative flex-shrink-0 border-t border-[var(--chatbot-border)] bg-[var(--chatbot-surface)]"
    >
      {/* Keyframe for card entrance */}
      <style>{`
        @keyframes chatbotAttachIn {
          from { opacity: 0; transform: translateY(6px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0px) scale(1); }
        }
      `}</style>

      {/* ── Emoji picker ──────────────────────────────────────────────────── */}
      {isEmojiPickerOpen && (
        <div
          id="chatbot-emoji-picker"
          className="absolute bottom-[calc(100%+0.5rem)] left-3 right-3 z-20 overflow-hidden rounded-2xl border border-[var(--chatbot-border)] bg-[var(--chatbot-surface)] shadow-[0_10px_24px_-10px_var(--chatbot-shadow-strong)]"
          role="dialog"
          aria-label="Emoji picker"
        >
          <div className="max-h-56 space-y-3 overflow-y-auto p-3 chatbot-scrollable">
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
                      onClick={() => handlePickEmoji(emoji)}
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
      )}

      {/* ── Attachment preview strip ───────────────────────────────────────
          Appears above the textarea when files are staged.
          Cards have Bibit-style: green doc icon, floating × badge. */}
      {attachments.length > 0 && (
        <div className="px-3 pt-3">
          <div className="flex max-h-[7rem] flex-wrap gap-x-3 gap-y-3 overflow-y-auto chatbot-scrollable pb-0.5 pr-0.5 pl-0.5 pt-0.5">
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

      {/* ── Inline error ──────────────────────────────────────────────────── */}
      {attachmentError && (
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
            {attachmentError}
          </p>
        </div>
      )}

      {/* ── Textarea ──────────────────────────────────────────────────────── */}
      <div className="px-4 pb-1 pt-3">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Write your message..."
          aria-label="Write your message"
          rows={1}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit();
            }
          }}
          className="w-full min-h-[36px] resize-none bg-transparent text-[0.86rem] leading-[1.55] text-[var(--chatbot-text)] outline-none placeholder:text-[var(--chatbot-text-subtle)]"
          style={{ overflow: "hidden", overflowWrap: "break-word" }}
        />
      </div>

      {/* ── Toolbar ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 pb-3">
        {/* Hidden native file input */}
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
          {/* Emoji */}
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

          {/* Attach — badge shows count when files are queued */}
          <button
            type="button"
            aria-label="Upload file"
            onClick={() => fileInputRef.current?.click()}
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
            {/* File count badge */}
            {attachments.length > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[0.48rem] font-bold text-white"
                style={{ backgroundColor: "#2563eb" }}
                aria-hidden="true"
              >
                {attachments.length}
              </span>
            )}
          </button>

          {/* Record audio */}
          <button
            type="button"
            aria-label="Record audio message"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--chatbot-text-subtle)] transition-colors hover:bg-[var(--chatbot-surface-subtle)] hover:text-[var(--chatbot-text)]"
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

        {/* Send button */}
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
