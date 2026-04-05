"use client";

import ChatBubble from "@/components/chatbot/chat-bubble";
import ChatArticleViewer from "@/components/chatbot/chat-article-viewer";
import ChatComposer from "@/components/chatbot/chat-composer";
import ChatMessageList from "@/components/chatbot/chat-message-list";
import ChatPanelHeader from "@/components/chatbot/chat-panel-header";
import {
  CHATBOT_ARTICLES,
  findChatbotArticleById,
} from "@/components/chatbot/mock-articles";
import type {
  ChatAudioClip,
  ChatAttachment,
  ChatMessage,
  ChatOperator,
  ChatPanelMode,
  ChatViewMode,
} from "@/components/chatbot/types";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const MOBILE_MEDIA_QUERY = "(max-width: 900px)";
const REDUCED_MOTION_MEDIA_QUERY = "(prefers-reduced-motion: reduce)";
const CHAT_PANEL_ID = "floating-chatbot-panel";
const PANEL_EXIT_RESET_DELAY_MS = 220;

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

const WEBSITE_AVATAR = "/images/Logo.png";

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

function collectMessageMediaUrls(messages: ChatMessage[]): Set<string> {
  const urls = new Set<string>();

  for (const message of messages) {
    if (message.audioClip?.blobUrl) {
      urls.add(message.audioClip.blobUrl);
    }

    for (const attachment of message.attachments ?? []) {
      if (attachment.previewUrl) {
        urls.add(attachment.previewUrl);
      }
    }
  }

  return urls;
}

export default function FloatingChatbot() {
  const [panelMode, setPanelMode] = useState<ChatPanelMode>("minimized");
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [viewMode, setViewMode] = useState<ChatViewMode>("conversation");
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [articleSearchValue, setArticleSearchValue] = useState("");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const bubbleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const replyTimerRef = useRef<number | null>(null);
  const closeResetTimerRef = useRef<number | null>(null);
  const previousDesktopArticleDetailOpenRef = useRef(false);
  const ownedMessageMediaUrlsRef = useRef<Set<string>>(new Set());

  const isExpanded = panelMode === "expanded";
  const activeArticle = activeArticleId
    ? findChatbotArticleById(activeArticleId)
    : null;
  const isDesktopArticleDetailOpen =
    !isMobileViewport && viewMode === "article" && activeArticleId !== null;

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_MEDIA_QUERY);
    const handle = () => setIsMobileViewport(mql.matches);
    handle();
    mql.addEventListener("change", handle);
    return () => mql.removeEventListener("change", handle);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia(REDUCED_MOTION_MEDIA_QUERY);
    const handle = () => setPrefersReducedMotion(mql.matches);
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
        if (closeResetTimerRef.current !== null) {
          window.clearTimeout(closeResetTimerRef.current);
        }

        setPanelMode("minimized");
        closeResetTimerRef.current = window.setTimeout(() => {
          setViewMode("conversation");
          setActiveArticleId(null);
          setArticleSearchValue("");
          bubbleRef.current?.focus();
          closeResetTimerRef.current = null;
        }, PANEL_EXIT_RESET_DELAY_MS);
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
    const nextUrls = collectMessageMediaUrls(messages);
    for (const url of ownedMessageMediaUrlsRef.current) {
      if (!nextUrls.has(url)) {
        URL.revokeObjectURL(url);
      }
    }
    ownedMessageMediaUrlsRef.current = nextUrls;
  }, [messages]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current !== null) {
        window.clearTimeout(replyTimerRef.current);
      }
      if (closeResetTimerRef.current !== null) {
        window.clearTimeout(closeResetTimerRef.current);
      }
      for (const url of ownedMessageMediaUrlsRef.current) {
        URL.revokeObjectURL(url);
      }
      ownedMessageMediaUrlsRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const wasDesktopArticleDetailOpen =
      previousDesktopArticleDetailOpenRef.current;
    previousDesktopArticleDetailOpenRef.current = isDesktopArticleDetailOpen;

    if (prefersReducedMotion || !isExpanded || !panelRef.current) {
      return;
    }

    // When opening article detail: the panel width springs from 360→440px.
    // We add a complementary vertical micro-lift so the panel feels alive,
    // but we deliberately avoid any scale transform here — scaling simultaneously
    // with a width transition creates a visual conflict that reads as jank.
    if (!wasDesktopArticleDetailOpen && isDesktopArticleDetailOpen) {
      panelRef.current.animate(
        [
          {
            transform: "translateY(0px)",
            easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          },
          {
            transform: "translateY(-5px)",
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          },
          { transform: "translateY(0px)" },
        ],
        {
          duration: 520,
          fill: "none",
        },
      );
    }

    // When closing article detail: a subtle downward settle as width springs back.
    if (wasDesktopArticleDetailOpen && !isDesktopArticleDetailOpen) {
      panelRef.current.animate(
        [
          {
            transform: "translateY(0px)",
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          },
          {
            transform: "translateY(3px)",
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          },
          { transform: "translateY(0px)" },
        ],
        {
          duration: 380,
          fill: "none",
        },
      );
    }
  }, [isDesktopArticleDetailOpen, isExpanded, prefersReducedMotion]);

  const panelClassName = useMemo(() => {
    const baseClass =
      "pointer-events-auto fixed bg-[var(--chatbot-surface)] text-[var(--chatbot-text)]";

    if (isMobileViewport) {
      return `${baseClass} inset-0 h-dvh w-full rounded-none border-0`;
    }

    const desktopWidthClass = isDesktopArticleDetailOpen
      ? "w-[440px]"
      : "w-[360px]";

    // Use a spring-like cubic-bezier for the width so it overshoots ever-so-slightly
    // and settles — far more organic than a plain ease-out.
    return `${baseClass} bottom-5 right-5 h-[610px] ${desktopWidthClass} rounded-[18px] border border-[var(--chatbot-border)] shadow-[0_24px_48px_-16px_var(--chatbot-shadow-strong)] transition-[width] duration-[420ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]`;
  }, [isDesktopArticleDetailOpen, isMobileViewport]);

  // Anchored to the bottom-right (where the bubble lives) so the panel
  // appears to grow out of the bubble rather than from the top.
  const panelAnimStyle: CSSProperties = isExpanded
    ? {
        opacity: 1,
        transform: "translateY(0px) scale(1)",
        transformOrigin: "bottom right",
        pointerEvents: "auto",
        transition:
          "opacity 300ms cubic-bezier(0.22, 1, 0.36, 1), transform 360ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "opacity, transform",
      }
    : {
        opacity: 0,
        transform: "translateY(16px) scale(0.96)",
        transformOrigin: "bottom right",
        pointerEvents: "none",
        transition:
          "opacity 190ms cubic-bezier(0.4, 0, 1, 1), transform 190ms cubic-bezier(0.4, 0, 1, 1)",
        willChange: "opacity, transform",
      };

  function closePanel() {
    if (closeResetTimerRef.current !== null) {
      window.clearTimeout(closeResetTimerRef.current);
    }

    setPanelMode("minimized");

    closeResetTimerRef.current = window.setTimeout(() => {
      setViewMode("conversation");
      setActiveArticleId(null);
      setArticleSearchValue("");
      bubbleRef.current?.focus();
      closeResetTimerRef.current = null;
    }, PANEL_EXIT_RESET_DELAY_MS);
  }

  const togglePanel = () => {
    if (isExpanded) {
      closePanel();
      return;
    }
    if (closeResetTimerRef.current !== null) {
      window.clearTimeout(closeResetTimerRef.current);
      closeResetTimerRef.current = null;
    }
    setViewMode("conversation");
    setActiveArticleId(null);
    setArticleSearchValue("");
    setPanelMode("expanded");
  };

  const submitMessage = (payload: {
    text: string;
    attachments: ChatAttachment[];
    audioClip?: ChatAudioClip | null;
  }) => {
    const text = payload.text.trim();
    if (!text && payload.attachments.length === 0 && !payload.audioClip) return;

    const outgoing: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: createTimestamp(),
      attachments: payload.attachments.length > 0 ? payload.attachments : undefined,
      audioClip: payload.audioClip ?? undefined,
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

  const openArticleById = (articleId: string) => {
    const article = findChatbotArticleById(articleId);
    if (!article) {
      return;
    }
    setActiveArticleId(article.id);
    setViewMode("article");
  };

  const handleSwitchView = (nextView: ChatViewMode) => {
    if (nextView === "conversation") {
      setViewMode("conversation");
      return;
    }
    setActiveArticleId(null);
    setViewMode("article");
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
        ref={panelRef}
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
            activeView={viewMode}
            onSwitchView={handleSwitchView}
            onClose={closePanel}
          />

          {viewMode === "article" ? (
            <ChatArticleViewer
              articles={CHATBOT_ARTICLES}
              activeArticle={activeArticle}
              searchValue={articleSearchValue}
              onSearchChange={setArticleSearchValue}
              onOpenArticle={openArticleById}
              onBackToList={() => setActiveArticleId(null)}
            />
          ) : (
            <>
              <ChatMessageList messages={messages} isSending={isSending} />

              <ChatComposer
                value={inputValue}
                isDisabled={isSending}
                isPanelOpen={isExpanded}
                inputRef={composerRef}
                onChange={setInputValue}
                onSubmit={submitMessage}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
