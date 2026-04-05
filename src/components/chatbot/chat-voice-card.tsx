import ChatAudioPlayer from "@/components/chatbot/chat-audio-player";
import type { ChatAudioClip } from "@/components/chatbot/types";
import type { RecorderState } from "@/components/chatbot/use-audio-recorder";

function formatDuration(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safeSeconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (safeSeconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

type ChatVoiceCardProps = {
  recorderState: RecorderState;
  audioDraft: ChatAudioClip | null;
  recordingDurationSec: number;
  waveformBars: number[];
  onStop: () => void;
  onClearDraft: () => void;
};

export default function ChatVoiceCard({
  recorderState,
  audioDraft,
  recordingDurationSec,
  waveformBars,
  onStop,
  onClearDraft,
}: ChatVoiceCardProps) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-[var(--chatbot-border)] bg-[var(--chatbot-surface-subtle)] px-2.5 py-2">
      {/* Recording: pulsing dot + live waveform + stop button */}
      {recorderState === "recording" && (
        <>
          <span
            className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-500/90 text-white"
            aria-hidden="true"
            style={{
              animation: "chatbotRecordPulse 1.4s ease-in-out infinite",
            }}
          >
            <span className="h-2.5 w-2.5 rounded-sm bg-current" />
          </span>

          <div
            className="flex flex-1 items-end gap-[2px]"
            style={{ height: "28px" }}
            aria-hidden="true"
          >
            {waveformBars.map((bar, i) => (
              <div
                key={i}
                className="flex-1 rounded-full bg-red-400"
                style={{
                  height: `${Math.max(14, bar * 100)}%`,
                  opacity: 0.55 + bar * 0.45,
                  transition: "height 80ms ease-out, opacity 80ms ease-out",
                }}
              />
            ))}
          </div>

          <span
            className="flex-shrink-0 text-[0.7rem] font-semibold tabular-nums text-[var(--chatbot-text-muted)]"
            aria-live="polite"
            aria-atomic="true"
          >
            {formatDuration(recordingDurationSec)}
          </span>

          <button
            type="button"
            onClick={onStop}
            aria-label="Stop recording"
            className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600 active:scale-95"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
          </button>
        </>
      )}

      {/* Processing: spinner while blob assembles */}
      {recorderState === "processing" && (
        <div className="flex flex-1 items-center gap-2">
          <span
            className="h-4 w-4 flex-shrink-0 animate-spin rounded-full border-2 border-[var(--chatbot-border)] border-t-[var(--chatbot-accent)]"
            aria-hidden="true"
          />
          <p className="text-[0.72rem] text-[var(--chatbot-text-muted)]">
            Processing...
          </p>
        </div>
      )}

      {/* Recorded: inline audio player with remove */}
      {recorderState === "recorded" && audioDraft ? (
        <ChatAudioPlayer
          blobUrl={audioDraft.blobUrl}
          durationSec={audioDraft.durationSec}
          onRemove={onClearDraft}
          className="w-full"
        />
      ) : null}
    </div>
  );
}
