"use client";

import type { ChatArticle } from "@/components/chatbot/types";
import { useEffect, useMemo, useRef } from "react";

type ChatArticleViewerProps = {
  articles: ChatArticle[];
  activeArticle: ChatArticle | null;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onOpenArticle: (articleId: string) => void;
  onBackToList: () => void;
};

// Keyframes are injected once via a <style> tag so we stay framework-agnostic
// (no global CSS edits required). Each view gets its own entrance so the
// list ↔ article transitions feel intentional rather than abrupt.
const ANIMATION_STYLES = `
  @keyframes chatbotArticleIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes chatbotListIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes chatbotItemIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

export default function ChatArticleViewer({
  articles,
  activeArticle,
  searchValue,
  onSearchChange,
  onOpenArticle,
  onBackToList,
}: ChatArticleViewerProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredArticles = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();
    if (!keyword) {
      return articles;
    }

    return articles.filter((article) => {
      const haystack =
        `${article.title} ${article.summary} ${article.category}`.toLowerCase();
      return haystack.includes(keyword);
    });
  }, [articles, searchValue]);

  useEffect(() => {
    if (!activeArticle) {
      searchRef.current?.focus();
      return;
    }
    titleRef.current?.focus();
  }, [activeArticle]);

  return (
    <section
      className="chatbot-scrollable flex-1 overflow-y-auto bg-[var(--chatbot-article-surface)] px-4 py-4"
      aria-label="Article viewer"
    >
      {/* Shared keyframe definitions — rendered once, harmless on re-renders */}
      <style>{ANIMATION_STYLES}</style>

      {!activeArticle ? (
        // List view — slides down gently from where the article header was.
        // key="list" forces a remount (and therefore re-animation) every time
        // we navigate back from an article.
        <div
          key="list"
          className="space-y-3"
          style={{
            animation: "chatbotListIn 320ms cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <label className="relative block">
            <span className="sr-only">Search articles</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--chatbot-text-subtle)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search our help articles..."
              className="h-10 w-full rounded-xl border border-[var(--chatbot-article-border)] bg-[var(--chatbot-surface)] pl-9 pr-3 text-[0.8rem] text-[var(--chatbot-text)] outline-none placeholder:text-[var(--chatbot-text-subtle)] focus-visible:ring-2 focus-visible:ring-[var(--chatbot-focus-ring)]"
            />
          </label>

          <ul className="space-y-2">
            {filteredArticles.map((article, index) => (
              <li
                key={article.id}
                style={{
                  // Stagger each list item for a ripple-in feel
                  animation: `chatbotItemIn 300ms cubic-bezier(0.16, 1, 0.3, 1) both`,
                  animationDelay: `${index * 40}ms`,
                }}
              >
                <button
                  type="button"
                  onClick={() => onOpenArticle(article.id)}
                  className="w-full rounded-xl border border-[var(--chatbot-article-border)] bg-[var(--chatbot-surface)] px-3 py-2.5 text-left transition-colors hover:bg-[var(--chatbot-surface-subtle)]"
                  aria-label={`Open article ${article.title}`}
                >
                  <p className="text-[0.82rem] font-semibold leading-[1.45] text-[var(--chatbot-text)]">
                    {article.title}
                  </p>
                  <p className="mt-1 text-[0.73rem] leading-[1.45] text-[var(--chatbot-text-muted)]">
                    {article.summary}
                  </p>
                </button>
              </li>
            ))}
          </ul>

          {filteredArticles.length === 0 ? (
            <p className="rounded-xl border border-[var(--chatbot-article-border)] bg-[var(--chatbot-surface)] px-3 py-2.5 text-[0.75rem] text-[var(--chatbot-text-muted)]">
              No article matched your search keyword.
            </p>
          ) : null}
        </div>
      ) : (
        // Article view — slides up from slightly below as the panel expands.
        // key={activeArticle.id} ensures a fresh animation per article open.
        <article
          key={activeArticle.id}
          className="rounded-2xl border border-[var(--chatbot-article-border)] bg-[var(--chatbot-surface)] p-4"
          style={{
            animation:
              "chatbotArticleIn 380ms cubic-bezier(0.16, 1, 0.3, 1) both",
            // Small delay so the panel width spring has a head-start — the content
            // arriving ~60ms after the width begins moving feels intentional.
            animationDelay: "60ms",
          }}
        >
          <div className="mb-3 flex items-start justify-between gap-2">
            <button
              type="button"
              onClick={onBackToList}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--chatbot-article-border)] bg-[var(--chatbot-surface)] px-2.5 py-1 text-[0.7rem] font-semibold text-[var(--chatbot-text)] transition-colors hover:bg-[var(--chatbot-surface-subtle)]"
              aria-label="Back to article list"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back
            </button>
            <a
              href={activeArticle.helpUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-[var(--chatbot-article-border)] px-2.5 py-1 text-[0.68rem] font-semibold text-[var(--chatbot-text)] transition-colors hover:bg-[var(--chatbot-surface-subtle)]"
            >
              Open Helpdesk
            </a>
          </div>

          <h2
            ref={titleRef}
            tabIndex={-1}
            className="text-[1.02rem] font-bold leading-[1.4] text-[var(--chatbot-article-heading)] outline-none"
          >
            {activeArticle.title}
          </h2>
          <p className="mt-1 text-[0.72rem] text-[var(--chatbot-article-muted)]">
            Updated {activeArticle.publishedAt} - {activeArticle.readTime}
          </p>
          <p className="mt-2 text-[0.82rem] leading-[1.6] text-[var(--chatbot-text-muted)]">
            {activeArticle.summary}
          </p>

          <div className="mt-4 space-y-3">
            {activeArticle.content.map((paragraph, index) => (
              <p
                key={`${activeArticle.id}-paragraph-${index}`}
                className="text-[0.84rem] leading-[1.65] text-[var(--chatbot-text)]"
                style={{
                  // Stagger body paragraphs so the article reads in gracefully
                  animation:
                    "chatbotItemIn 280ms cubic-bezier(0.16, 1, 0.3, 1) both",
                  animationDelay: `${120 + index * 55}ms`,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}
