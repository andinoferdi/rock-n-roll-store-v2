export type ChatPanelMode = "minimized" | "expanded";
export type ChatViewMode = "conversation" | "article";

export type ChatSender = "operator" | "user";

export type ChatAttachmentKind = "image" | "document";

export type ChatAttachment = {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  previewUrl?: string;
  kind: ChatAttachmentKind;
};

export type ChatAudioClip = {
  id: string;
  blobUrl: string;
  mimeType: string;
  durationSec: number;
  sizeBytes: number;
};

export type ChatTextMessage = {
  id: string;
  sender: ChatSender;
  text: string;
  timestamp: string;
  avatarUrl?: string;
  attachments?: ChatAttachment[];
  audioClip?: ChatAudioClip;
};

export type ChatMessage = ChatTextMessage;

export type ChatQuickAction = {
  id: string;
  label: string;
  prompt: string;
};

export type ChatOperator = {
  id: string;
  name: string;
  avatar?: string;
};

export type ChatArticle = {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  category: string;
  publishedAt: string;
  helpUrl: string;
  content: string[];
};
