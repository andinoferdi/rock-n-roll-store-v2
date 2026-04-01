"use client";

import type { FilterGroup } from "@/app/products/data/catalog-data";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

type SidebarFiltersProps = {
  groups: FilterGroup[];
};

const groupTitleClass =
  "text-[0.72rem] font-semibold tracking-[0.11em] uppercase text-[var(--landing-text)] [font-family:var(--font-barlow-condensed)]";

export default function SidebarFilters({ groups }: SidebarFiltersProps) {
  const initialCollapsedState = useMemo(
    () => groups.reduce<Record<string, boolean>>((accumulator, group) => {
      accumulator[group.id] = false;
      return accumulator;
    }, {}),
    [groups],
  );

  const [collapsedGroups, setCollapsedGroups] = useState(initialCollapsedState);
  const [multiSelections, setMultiSelections] = useState<Record<string, Set<string>>>(() => {
    const initialState: Record<string, Set<string>> = {};
    for (const group of groups) {
      if (!group.options) {
        continue;
      }

      initialState[group.id] = new Set(
        group.options.filter((option) => option.selected).map((option) => option.label),
      );
    }
    return initialState;
  });

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((previous) => ({
      ...previous,
      [groupId]: !previous[groupId],
    }));
  };

  const toggleOption = (groupId: string, optionLabel: string, type: FilterGroup["type"]) => {
    setMultiSelections((previous) => {
      const current = new Set(previous[groupId] ?? []);

      if (type === "single") {
        return {
          ...previous,
          [groupId]: new Set([optionLabel]),
        };
      }

      if (current.has(optionLabel)) {
        current.delete(optionLabel);
      } else {
        current.add(optionLabel);
      }

      return {
        ...previous,
        [groupId]: current,
      };
    });
  };

  return (
    <aside className="rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-4 sm:p-5">
      <div className="space-y-4">
        {groups.map((group) => {
          const isCollapsed = collapsedGroups[group.id];
          const selectedOptions = multiSelections[group.id] ?? new Set<string>();

          return (
            <section key={group.id} className="border-b border-[var(--landing-border)] pb-4 last:border-b-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                className="flex w-full items-center justify-between"
              >
                <span className={groupTitleClass}>{group.title}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "text-[var(--landing-text-subtle)] transition-transform duration-200",
                    isCollapsed && "-rotate-90",
                  )}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {!isCollapsed ? (
                group.type === "range" && group.range ? (
                  <div className="mt-3 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <label className="relative">
                        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[0.75rem] text-[var(--landing-text-subtle)]">
                          $
                        </span>
                        <input
                          type="number"
                          readOnly
                          value={group.range.selectedMin}
                          className="h-9 w-full rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-bg-2)] pl-5 pr-2.5 text-[0.82rem] text-[var(--landing-text-muted)]"
                        />
                      </label>
                      <label className="relative">
                        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[0.75rem] text-[var(--landing-text-subtle)]">
                          $
                        </span>
                        <input
                          type="number"
                          readOnly
                          value={group.range.selectedMax}
                          className="h-9 w-full rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-bg-2)] pl-5 pr-2.5 text-[0.82rem] text-[var(--landing-text-muted)]"
                        />
                      </label>
                    </div>
                    <div className="h-[3px] rounded-full bg-[var(--landing-border)]">
                      <div className="h-full w-[62%] rounded-full bg-[var(--landing-blue)]" />
                    </div>
                  </div>
                ) : (
                  <ul className="mt-3 space-y-1.5">
                    {group.options?.map((option) => {
                      const isSelected = selectedOptions.has(option.label);

                      return (
                        <li key={option.label}>
                          <button
                            type="button"
                            onClick={() => toggleOption(group.id, option.label, group.type)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-[4px] border px-2.5 py-2 text-left transition-colors duration-150",
                              isSelected
                                ? "border-[var(--landing-border-strong)] bg-[var(--landing-blue-soft)]"
                                : "border-transparent hover:border-[var(--landing-border)] hover:bg-[var(--landing-bg-2)]",
                            )}
                          >
                            <span className="text-[0.82rem] text-[var(--landing-text-muted)]">{option.label}</span>
                            <span className="text-[0.74rem] text-[var(--landing-text-subtle)]">{option.count}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )
              ) : null}
            </section>
          );
        })}
      </div>
    </aside>
  );
}