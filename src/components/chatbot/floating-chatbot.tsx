"use client";

import ChatBubble from "@/components/chatbot/chat-bubble";
import ChatComposer from "@/components/chatbot/chat-composer";
import ChatMessageList from "@/components/chatbot/chat-message-list";
import ChatPanelHeader from "@/components/chatbot/chat-panel-header";
import type {
  ChatMessage,
  ChatOperator,
  ChatPanelMode,
} from "@/components/chatbot/types";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

const MOBILE_MEDIA_QUERY = "(max-width: 900px)";
const CHAT_PANEL_ID = "floating-chatbot-panel";

const TEAM_MEMBERS: ChatOperator[] = [
  {
    id: "senja",
    name: "Senja",
    avatar: "/images/user/user-01.jpg",
  },
  {
    id: "timothy",
    name: "Timothy",
    avatar: "/images/user/user-02.jpg",
  },
  {
    id: "alice",
    name: "Alice",
    avatar: "/images/user/user-03.jpg",
  },
];

const WEBSITE_AVATAR = "/images/logo.png";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    sender: "operator",
    text: "Hi, what would you like to ask?",
    timestamp: "Just now",
    avatarUrl: WEBSITE_AVATAR,
  },
];

function createTimestamp() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export default function FloatingChatbot() {
  const [panelMode, setPanelMode] = useState<ChatPanelMode>("minimized");
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);

  const bubbleRef = useRef<HTMLButtonElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const replyTimerRef = useRef<number | null>(null);

  const isExpanded = panelMode === "expanded";

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_MEDIA_QUERY);
    const handle = () => setIsMobileViewport(mql.matches);
    handle();
    mql.addEventListener("change", handle);
    return () => mql.removeEventListener("change", handle);
  }, []);

  useEffect(() => {
    if (!isExpanded) return;
    setHasUnread(false);
    window.setTimeout(() => composerRef.current?.focus(), 120);
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded || isMobileViewport) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPanelMode("minimized");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isExpanded, isMobileViewport]);

  useEffect(() => {
    if (!(isExpanded && isMobileViewport)) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isExpanded, isMobileViewport]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current !== null) {
        window.clearTimeout(replyTimerRef.current);
      }
    };
  }, []);

  const panelClassName = useMemo(() => {
    const baseClass =
      "pointer-events-auto fixed bg-[var(--chatbot-surface)] text-[var(--chatbot-text)]";

    if (isMobileViewport) {
      return `${baseClass} inset-0 h-dvh w-full rounded-none border-0`;
    }

    return `${baseClass} bottom-5 right-5 h-[610px] w-[360px] rounded-[18px] border border-[var(--chatbot-border)] shadow-[0_24px_48px_-16px_var(--chatbot-shadow-strong)]`;
  }, [isMobileViewport]);

  const panelAnimStyle: CSSProperties = isExpanded
    ? {
        opacity: 1,
        transform: "translateY(0px) scale(1)",
        pointerEvents: "auto",
        transition:
          "opacity 280ms cubic-bezier(0.22, 1, 0.36, 1), transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "opacity, transform",
      }
    : {
        opacity: 0,
        transform: "translateY(12px) scale(0.97)",
        pointerEvents: "none",
        transition:
          "opacity 180ms cubic-bezier(0.4, 0, 1, 1), transform 180ms cubic-bezier(0.4, 0, 1, 1)",
        willChange: "opacity, transform",
      };

  const closePanel = () => {
    setPanelMode("minimized");
    window.setTimeout(() => bubbleRef.current?.focus(), 120);
  };

  const togglePanel = () => {
    if (isExpanded) {
      closePanel();
      return;
    }
    setPanelMode("expanded");
  };

  const submitMessage = (messageText: string) => {
    const text = messageText.trim();
    if (!text) return;

    const outgoing: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: createTimestamp(),
    };

    setMessages((currentMessages) => [...currentMessages, outgoing]);
    setInputValue("");
    setIsSending(true);

    if (replyTimerRef.current !== null) {
      window.clearTimeout(replyTimerRef.current);
    }

    replyTimerRef.current = window.setTimeout(() => {
      const reply: ChatMessage = {
        id: `operator-${Date.now()}`,
        sender: "operator",
        text: "Thanks, our team will check this first and follow up with details in this chat.",
        timestamp: createTimestamp(),
        avatarUrl: WEBSITE_AVATAR,
      };
      setMessages((currentMessages) => [...currentMessages, reply]);
      setIsSending(false);
      replyTimerRef.current = null;
    }, 800);
  };

  return (
    <>
      <ChatBubble
        expanded={isExpanded}
        isMobileViewport={isMobileViewport}
        hasUnread={hasUnread}
        panelId={CHAT_PANEL_ID}
        onToggle={togglePanel}
        buttonRef={bubbleRef}
      />

      <section
        id={CHAT_PANEL_ID}
        role={isMobileViewport ? "dialog" : "region"}
        aria-label="Support chat panel"
        aria-hidden={!isExpanded}
        className={`z-[95] overflow-hidden ${panelClassName}`}
        style={panelAnimStyle}
      >
        <div className="flex h-full flex-col">
          <ChatPanelHeader
            operators={TEAM_MEMBERS}
            isMobile={isMobileViewport}
            onClose={closePanel}
          />

          <ChatMessageList messages={messages} isSending={isSending} />

          <ChatComposer
            value={inputValue}
            isDisabled={isSending}
            inputRef={composerRef}
            onChange={setInputValue}
            onSubmit={() => submitMessage(inputValue)}
          />
        </div>
      </section>
    </>
  );
}
