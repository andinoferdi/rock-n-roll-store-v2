"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { ChatAttachment } from "@/components/chatbot/types";

const MAX_ATTACHMENT_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_ATTACHMENT_COUNT = 5;

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

type UseAttachmentsReturn = {
  attachments: ChatAttachment[];
  attachmentError: string;
  removeAttachment: (id: string) => void;
  handleFileSelection: (event: ChangeEvent<HTMLInputElement>) => void;
  clearAttachments: (options?: { revoke?: boolean }) => void;
  clearAttachmentError: () => void;
};

export function useAttachments(): UseAttachmentsReturn {
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [attachmentError, setAttachmentError] = useState("");
  const attachmentsRef = useRef<ChatAttachment[]>([]);

  useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);

  // Revoke object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      attachmentsRef.current.forEach((a) => {
        if (a.previewUrl) URL.revokeObjectURL(a.previewUrl);
      });
    };
  }, []);

  const removeAttachment = (id: string) => {
    setAttachments((current) => {
      const target = current.find((a) => a.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return current.filter((a) => a.id !== id);
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

    event.target.value = "";
  };

  const clearAttachments = (options?: { revoke?: boolean }) => {
    const shouldRevoke = options?.revoke ?? true;
    setAttachments((current) => {
      if (shouldRevoke) {
        current.forEach((a) => {
          if (a.previewUrl) URL.revokeObjectURL(a.previewUrl);
        });
      }
      return [];
    });
  };

  const clearAttachmentError = () => setAttachmentError("");

  return {
    attachments,
    attachmentError,
    removeAttachment,
    handleFileSelection,
    clearAttachments,
    clearAttachmentError,
  };
}
