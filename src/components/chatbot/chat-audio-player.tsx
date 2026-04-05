"use client";

import { useRef, useState, type ChangeEvent } from "react";

type ChatAudioPlayerProps = {
  blobUrl: string;
  durationSec: number;
  sizeBytes?: number;
  onRemove?: () => void;
  className?: string;
  // "on-accent" = player lives inside an accent-colored container (e.g. user bubble).
  // Inverts play button and seek colors so they remain visible on the accent background.
  variant?: "default" | "on-accent";
};

// Both seek variants are defined together so the injected style is static —
// no dynamic interpolation, safe to render on every instance.
const SEEK_STYLES = `
  .chatbot-audio-seek-default::-webkit-slider-thumb,
  .chatbot-audio-seek-accent::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 11px; height: 11px;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -4px;
  }
  .chatbot-audio-seek-default::-webkit-slider-thumb { background: var(--chatbot-accent); }
  .chatbot-audio-seek-accent::-webkit-slider-thumb  { background: var(--chatbot-on-accent); }

  .chatbot-audio-seek-default::-moz-range-thumb,
  .chatbot-audio-seek-accent::-moz-range-thumb {
    width: 11px; height: 11px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
  .chatbot-audio-seek-default::-moz-range-thumb { background: var(--chatbot-accent); }
  .chatbot-audio-seek-accent::-moz-range-thumb  { background: var(--chatbot-on-accent); }
`;

function formatDuration(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safeSeconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (safeSeconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function ChatAudioPlayer({
  blobUrl,
  durationSec,
  onRemove,
  className = "",
  variant = "default",
}: ChatAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [resolvedDuration, setResolvedDuration] = useState(
    Math.max(1, durationSec || 0),
  );

  const effectiveDuration = Math.max(1, resolvedDuration || durationSec || 1);
  const progressPercent = Math.min(
    100,
    (currentTime / effectiveDuration) * 100,
  );
  const isOnAccent = variant === "on-accent";

  const seekClass = isOnAccent
    ? "chatbot-audio-seek-accent"
    : "chatbot-audio-seek-default";
  const trackFill = isOnAccent
    ? "var(--chatbot-on-accent)"
    : "var(--chatbot-accent)";
  const trackEmpty = isOnAccent
    ? "color-mix(in oklab, var(--chatbot-on-accent) 28%, transparent)"
    : "var(--chatbot-border)";

  const handlePlayPause = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      void el.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const el = audioRef.current;
    if (!el) return;
    const nextTime = parseFloat(event.target.value);
    el.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <div className={`w-full ${className}`}>
      <style>{SEEK_STYLES}</style>

      <audio
        ref={audioRef}
        src={blobUrl}
        preload="metadata"
        onLoadedMetadata={() => {
          const el = audioRef.current;
          if (el && Number.isFinite(el.duration) && el.duration > 0) {
            setResolvedDuration(el.duration);
          }
        }}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        style={{ display: "none" }}
      />

      <div className="flex items-center gap-2.5">
        {/* Play / Pause */}
        <button
          type="button"
          onClick={handlePlayPause}
          aria-label={isPlaying ? "Pause voice message" : "Play voice message"}
          className={`inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-80 active:scale-95 ${
            isOnAccent
              ? "bg-[var(--chatbot-on-accent)] text-[var(--chatbot-accent)]"
              : "bg-[var(--chatbot-accent)] text-[var(--chatbot-on-accent)]"
          }`}
        >
          {isPlaying ? (
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="5" y="3" width="4" height="18" rx="1" />
              <rect x="15" y="3" width="4" height="18" rx="1" />
            </svg>
          ) : (
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>

        {/* Seek track + timestamps */}
        <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <input
            type="range"
            min={0}
            max={effectiveDuration}
            step={0.05}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek voice message"
            className={`${seekClass} w-full cursor-pointer appearance-none`}
            style={{
              background: `linear-gradient(to right, ${trackFill} ${progressPercent}%, ${trackEmpty} ${progressPercent}%)`,
              height: "3px",
              borderRadius: "2px",
              outline: "none",
            }}
          />
          <div className="flex justify-between">
            <span
              className={`text-[0.6rem] tabular-nums ${
                isOnAccent
                  ? "text-[var(--chatbot-on-accent-muted)]"
                  : "text-[var(--chatbot-text-muted)]"
              }`}
            >
              {formatDuration(currentTime)}
            </span>
            <span
              className={`text-[0.6rem] tabular-nums ${
                isOnAccent
                  ? "text-[var(--chatbot-on-accent-muted)]"
                  : "text-[var(--chatbot-text-muted)]"
              }`}
            >
              {formatDuration(effectiveDuration)}
            </span>
          </div>
        </div>

        {/* Remove — only present in composer draft context */}
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove recorded audio"
            className={`inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
              isOnAccent
                ? "text-[var(--chatbot-on-accent-muted)] hover:text-[var(--chatbot-on-accent)]"
                : "text-[var(--chatbot-text-subtle)] hover:bg-[var(--chatbot-surface-subtle)] hover:text-[var(--chatbot-text)]"
            }`}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
