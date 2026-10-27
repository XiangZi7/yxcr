"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { resourceCollections } from "@/lib/resources/config";
import { topicHref } from "@/lib/resources/sections";
import type { SidebarGroup, SidebarItem } from "@/lib/resources/navigation";
import { ResourceIcon } from "@/components/resources/ResourceIcon";

function containsPage(item: SidebarItem, href: string): boolean {
  return item.href === href || Boolean(item.children?.some((child) => containsPage(child, href)));
}

export function SidebarCatalog({
  groups,
  pathname,
  topic,
  onNavigate,
}: {
  groups: SidebarGroup[];
  pathname: string;
  topic: string;
  onNavigate: () => void;
}) {
  const activeHref = topic ? topicHref(topic) : pathname;
  const activeGroup = groups.find((group) =>
    group.items.some((item) => containsPage(item, activeHref)),
  );
  const [expanded, setExpanded] = useState(true);
  const [openGroup, setOpenGroup] = useState<string | null>(
    activeGroup?.id ?? null,
  );

  return (
    <nav className="sidebar-catalog" aria-label="知识导航">
      <button
        type="button"
        className="category-label sidebar-catalog-heading"
        aria-expanded={expanded}
        aria-controls="sidebar-catalog-groups"
        onClick={() => setExpanded(!expanded)}
      >
        <span>知识导航</span>
        <small>{resourceCollections.length} 栏目</small>
        <ChevronDown size={13} className={expanded ? "" : "-rotate-90"} />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id="sidebar-catalog-groups"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {groups.map((group) => {
              const open = openGroup === group.id;
              const selected = activeGroup?.id === group.id;
              const headingId = `sidebar-${group.id}-heading`;
              const contentId = `sidebar-${group.id}-items`;

              return (
                <div className="sidebar-catalog-group" key={group.id}>
                  <button
                    type="button"
                    id={headingId}
                    className={`group-heading sidebar-group-heading ${selected ? "has-active" : ""}`}
                    aria-expanded={open}
                    aria-controls={contentId}
                    onClick={() => setOpenGroup(open ? null : group.id)}
                  >
                    <span className="sidebar-group-icon">
                      <ResourceIcon name={group.icon} size={17} />
                    </span>
                    <span className="sidebar-item-label">{group.title}</span>
                    <small className="sidebar-group-count">
                      {group.items.length}
                    </small>
                    <ChevronDown
                      size={14}
                      className={`sidebar-group-chevron ${open ? "is-open" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key={group.id}
                        id={contentId}
                        role="region"
                        aria-labelledby={headingId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="sidebar-group-items">
                          {group.items.map((item) => (
                            <SidebarBranch
                              key={item.id}
                              item={item}
                              activeHref={activeHref}
                              onNavigate={onNavigate}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function SidebarBranch({ item, activeHref, onNavigate }: {
  item: SidebarItem;
  activeHref: string;
  onNavigate: () => void;
}) {
  const active = item.href === activeHref;
  const selected = containsPage(item, activeHref);
  const [open, setOpen] = useState(selected);
  const children = item.children;
  const contentId = `sidebar-topic-${item.id}`;

  return (
    <div className={`sidebar-branch ${selected ? "contains-active" : ""}`}>
      <div className="sidebar-item-row">
        <Link
          href={item.href}
          prefetch={false}
          className={`topic-link sidebar-collection-link ${active ? "is-active" : ""}`}
          aria-current={active ? "page" : undefined}
          title={item.title}
          onClick={onNavigate}
        >
          <ResourceIcon name={item.icon} size={16} />
          <span className="sidebar-item-label">{item.title}</span>
          <small className="sidebar-item-count">{item.count.toLocaleString("en-US")}</small>
        </Link>
        {children?.length ? (
          <button
            type="button"
            className="sidebar-branch-toggle"
            aria-label={`${open ? "收起" : "展开"}${item.title}子分类`}
            aria-expanded={open}
            aria-controls={contentId}
            onClick={() => setOpen(!open)}
          >
            <ChevronDown size={13} className={`sidebar-group-chevron ${open ? "is-open" : ""}`} />
          </button>
        ) : null}
      </div>
      {children?.length ? (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key={item.id}
              id={contentId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="sidebar-nested-items">
                <Link href={item.href} prefetch={false} className="sidebar-topic-overview" onClick={onNavigate}>
                  查看全部{item.title}
                </Link>
                {children.map((child) => (
                  <SidebarBranch key={child.id} item={child} activeHref={activeHref} onNavigate={onNavigate} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : null}
    </div>
  );
}
