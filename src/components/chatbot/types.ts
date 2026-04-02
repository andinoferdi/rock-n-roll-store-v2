export type ChatPanelMode = "minimized" | "expanded";

export type ChatSender = "operator" | "user";

export type ChatMessage = {
  id: string;
  sender: ChatSender;
  text: string;
  timestamp: string;
  avatarUrl?: string;
};

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
