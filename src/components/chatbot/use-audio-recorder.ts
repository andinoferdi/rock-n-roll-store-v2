"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatAudioClip } from "@/components/chatbot/types";

export type RecorderState = "idle" | "recording" | "processing" | "recorded";

const MAX_AUDIO_SECONDS = 60;
const WAVEFORM_BAR_COUNT = 20;

type UseAudioRecorderOptions = {
  isPanelOpen: boolean;
};

type UseAudioRecorderReturn = {
  recorderState: RecorderState;
  audioDraft: ChatAudioClip | null;
  recordingDurationSec: number;
  audioError: string;
  waveformBars: number[];
  handleRecordClick: (isDisabled: boolean) => void;
  stopRecording: () => void;
  clearAudioDraft: (options?: { revoke?: boolean }) => void;
};

export function useAudioRecorder({
  isPanelOpen,
}: UseAudioRecorderOptions): UseAudioRecorderReturn {
  const [recorderState, setRecorderState] = useState<RecorderState>("idle");
  const [audioDraft, setAudioDraft] = useState<ChatAudioClip | null>(null);
  const [recordingDurationSec, setRecordingDurationSec] = useState(0);
  const [audioError, setAudioError] = useState("");
  const [waveformBars, setWaveformBars] = useState<number[]>(
    Array(WAVEFORM_BAR_COUNT).fill(0),
  );

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingChunksRef = useRef<Blob[]>([]);
  const recordingStreamRef = useRef<MediaStream | null>(null);
  const recordingTimerRef = useRef<number | null>(null);
  const maxDurationTimeoutRef = useRef<number | null>(null);
  const recordingStartedAtRef = useRef<number | null>(null);
  const audioDraftRef = useRef<ChatAudioClip | null>(null);
  // Ref-based duration so onstop never reads stale state (stale closure fix)
  const recordingDurationSecRef = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const waveformRafRef = useRef<number | null>(null);

  useEffect(() => {
    audioDraftRef.current = audioDraft;
  }, [audioDraft]);

  // Full cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioDraftRef.current?.blobUrl)
        URL.revokeObjectURL(audioDraftRef.current.blobUrl);
      if (recordingTimerRef.current !== null)
        window.clearInterval(recordingTimerRef.current);
      if (maxDurationTimeoutRef.current !== null)
        window.clearTimeout(maxDurationTimeoutRef.current);
      if (waveformRafRef.current !== null)
        cancelAnimationFrame(waveformRafRef.current);
      if (audioContextRef.current) void audioContextRef.current.close();
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
      if (recordingStreamRef.current) {
        recordingStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // Reset all recording state when the panel closes
  useEffect(() => {
    if (isPanelOpen) return;

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    if (recordingStreamRef.current) {
      recordingStreamRef.current.getTracks().forEach((t) => t.stop());
      recordingStreamRef.current = null;
    }
    if (recordingTimerRef.current !== null) {
      window.clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (maxDurationTimeoutRef.current !== null) {
      window.clearTimeout(maxDurationTimeoutRef.current);
      maxDurationTimeoutRef.current = null;
    }
    if (waveformRafRef.current !== null) {
      cancelAnimationFrame(waveformRafRef.current);
      waveformRafRef.current = null;
    }
    if (audioContextRef.current) {
      void audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;

    if (audioDraftRef.current?.blobUrl)
      URL.revokeObjectURL(audioDraftRef.current.blobUrl);

    setRecorderState("idle");
    setAudioDraft(null);
    setRecordingDurationSec(0);
    recordingDurationSecRef.current = 0;
    setAudioError("");
    setWaveformBars(Array(WAVEFORM_BAR_COUNT).fill(0));
  }, [isPanelOpen]);

  const startWaveformAnimation = (analyser: AnalyserNode) => {
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      analyser.getByteFrequencyData(dataArray);
      const step = Math.max(
        1,
        Math.floor(dataArray.length / WAVEFORM_BAR_COUNT),
      );
      const bars = Array.from({ length: WAVEFORM_BAR_COUNT }, (_, i) => {
        let sum = 0;
        const from = i * step;
        const to = Math.min((i + 1) * step, dataArray.length);
        for (let j = from; j < to; j++) sum += dataArray[j];
        return sum / (to - from) / 255;
      });
      setWaveformBars(bars);
      waveformRafRef.current = requestAnimationFrame(tick);
    };

    waveformRafRef.current = requestAnimationFrame(tick);
  };

  const cleanupAudioContext = () => {
    if (waveformRafRef.current !== null) {
      cancelAnimationFrame(waveformRafRef.current);
      waveformRafRef.current = null;
    }
    analyserRef.current = null;
    if (audioContextRef.current) {
      void audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setWaveformBars(Array(WAVEFORM_BAR_COUNT).fill(0));
  };

  const stopRecording = () => {
    if (maxDurationTimeoutRef.current !== null) {
      window.clearTimeout(maxDurationTimeoutRef.current);
      maxDurationTimeoutRef.current = null;
    }
    if (recordingTimerRef.current !== null) {
      window.clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    cleanupAudioContext();
    // Brief "processing" while onstop fires asynchronously and assembles the blob
    setRecorderState("processing");
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  const startRecording = async () => {
    if (typeof window === "undefined") return;
    if (!navigator.mediaDevices?.getUserMedia || !("MediaRecorder" in window)) {
      setAudioError("Voice recording is not supported in this browser.");
      return;
    }

    setAudioError("");
    if (audioDraftRef.current?.blobUrl)
      URL.revokeObjectURL(audioDraftRef.current.blobUrl);
    setAudioDraft(null);
    setRecordingDurationSec(0);
    recordingDurationSecRef.current = 0;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordingStreamRef.current = stream;
      recordingChunksRef.current = [];

      const audioCtx = new AudioContext();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyserRef.current = analyser;
      startWaveformAnimation(analyser);

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recordingStartedAtRef.current = Date.now();

      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) recordingChunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        if (recordingStreamRef.current) {
          recordingStreamRef.current.getTracks().forEach((t) => t.stop());
          recordingStreamRef.current = null;
        }

        const recordedBlob = new Blob(recordingChunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        if (recordedBlob.size === 0) {
          setAudioError("No audio detected. Please try recording again.");
          setRecorderState("idle");
          setRecordingDurationSec(0);
          recordingDurationSecRef.current = 0;
          return;
        }

        // Use the ref — not state — so we always read the latest value
        // regardless of when this callback fires (stale closure fix)
        const durationFromRef = Math.min(
          recordingDurationSecRef.current,
          MAX_AUDIO_SECONDS,
        );
        const durationFromClock = recordingStartedAtRef.current
          ? Math.min(
              Math.round((Date.now() - recordingStartedAtRef.current) / 1000),
              MAX_AUDIO_SECONDS,
            )
          : 0;

        setAudioDraft({
          id:
            typeof crypto !== "undefined" && "randomUUID" in crypto
              ? crypto.randomUUID()
              : `${Date.now()}-audio`,
          blobUrl: URL.createObjectURL(recordedBlob),
          mimeType: recordedBlob.type || "audio/webm",
          durationSec: Math.max(durationFromRef, durationFromClock, 1),
          sizeBytes: recordedBlob.size,
        });
        setRecorderState("recorded");
      };

      recorder.start(250);
      setRecorderState("recording");
      setRecordingDurationSec(0);
      recordingDurationSecRef.current = 0;

      recordingTimerRef.current = window.setInterval(() => {
        if (!recordingStartedAtRef.current) return;
        const nextDuration = Math.min(
          Math.floor((Date.now() - recordingStartedAtRef.current) / 1000),
          MAX_AUDIO_SECONDS,
        );
        recordingDurationSecRef.current = nextDuration;
        setRecordingDurationSec(nextDuration);
      }, 250);

      maxDurationTimeoutRef.current = window.setTimeout(() => {
        stopRecording();
        setAudioError(
          "Recording reached 60 seconds and stopped automatically.",
        );
      }, MAX_AUDIO_SECONDS * 1000);
    } catch {
      setAudioError(
        "Microphone access was denied. Please allow microphone permission.",
      );
      setRecorderState("idle");
      setRecordingDurationSec(0);
      recordingDurationSecRef.current = 0;
      cleanupAudioContext();
      if (recordingStreamRef.current) {
        recordingStreamRef.current.getTracks().forEach((t) => t.stop());
        recordingStreamRef.current = null;
      }
    }
  };

  const clearAudioDraft = (options?: { revoke?: boolean }) => {
    const shouldRevoke = options?.revoke ?? true;
    setAudioDraft((current) => {
      if (shouldRevoke && current?.blobUrl) {
        URL.revokeObjectURL(current.blobUrl);
      }
      return null;
    });
    setRecorderState("idle");
    setRecordingDurationSec(0);
    recordingDurationSecRef.current = 0;
  };

  const handleRecordClick = (isDisabled: boolean) => {
    if (isDisabled || recorderState === "processing") return;
    if (recorderState === "recording") {
      stopRecording();
      return;
    }
    void startRecording();
  };

  return {
    recorderState,
    audioDraft,
    recordingDurationSec,
    audioError,
    waveformBars,
    handleRecordClick,
    stopRecording,
    clearAudioDraft,
  };
}
