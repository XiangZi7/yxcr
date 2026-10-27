"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AudioLines,
  Bot,
  ChevronDown,
  ClipboardCheck,
  House,
  LayoutGrid,
  Star,
  NotebookPen,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { navigationGroups } from "@/lib/interview/data";
import { resourceCollections } from "@/lib/resources/config";
import { BrandIcon } from "./BrandIcon";
import { CreatorLinks } from "@/components/layout/CreatorLinks";
import { collectionHref, topicHref } from "@/lib/resources/sections";

export function Sidebar({
  topic,
  mobileOpen,
  onClose,
}: {
  topic: string;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, onClose]);
  const links = [
    { label: "学习首页", icon: House, href: "/" },
    { label: "学习概览", icon: House, href: "/overview" },
    { label: "全部知识库", icon: LayoutGrid, href: "/library" },
    { label: "今日学习", icon: ClipboardCheck, href: "/today" },
    { label: "自测练习", icon: Bot, href: "/practice" },
    { label: "收藏与错题", icon: Star, href: "/saved" },
    { label: "我的笔记", icon: NotebookPen, href: "/notes" },
  ] as const;

  return (
    <>
      {mobileOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="关闭导航"
          onClick={onClose}
        />
      )}
      <aside
        className={`sidebar ${mobileOpen ? "is-mobile-open" : ""}`}
        aria-label="学习导航"
      >
        <nav className="flex flex-col gap-0.5" aria-label="主要导航">
          {links.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className={`primary-nav ${pathname === href || (href === "/library" && (pathname.startsWith("/learn/") || pathname.startsWith("/library/") || pathname.startsWith("/topics/"))) ? "is-active" : ""}`}
              aria-current={pathname === href ? "page" : undefined}
              onClick={onClose}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <button
          className="category-label flex w-full items-center justify-between"
          onClick={() => setCategoriesOpen(!categoriesOpen)}
          aria-expanded={categoriesOpen}
        >
          技术分类
          <ChevronDown
            size={13}
            className={!categoriesOpen ? "-rotate-90" : ""}
          />
        </button>
        <AnimatePresence initial={false}>
          {categoriesOpen && (
            <motion.nav
              key="categories"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
              aria-label="技术分类"
            >
              {navigationGroups.map((group) => {
                const open = !collapsed.includes(group.title);
                return (
                  <div className="nav-group" key={group.title}>
                    <button
                      className="group-heading flex w-full items-center gap-3"
                      aria-expanded={open}
                      onClick={() =>
                        setCollapsed(
                          open
                            ? [...collapsed, group.title]
                            : collapsed.filter((item) => item !== group.title),
                        )
                      }
                    >
                      <BrandIcon name={group.icon} />
                      <span>{group.title}</span>
                      <motion.span
                        className="ml-auto"
                        animate={{ rotate: open ? 180 : 0 }}
                      >
                        <ChevronDown size={15} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key={group.title}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          {group.topics.map((name) => {
                            const collection = resourceCollections.find(
                              (item) => item.title === name,
                            );
                            const href = collection
                              ? collectionHref(collection.id)
                              : topicHref(name);
                            const active =
                              topic === name ||
                              (Boolean(collection) && pathname === href);

                            return (
                              <Link
                                href={href}
                                key={name}
                                className={`topic-link flex items-center gap-3 ${active ? "is-active" : ""}`}
                                aria-current={active ? "page" : undefined}
                                onClick={onClose}
                              >
                                <BrandIcon name={name} />
                                <span>{name}</span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
        <div className="encouragement relative overflow-hidden rounded-lg">
          <AudioLines
            size={17}
            strokeWidth={2.5}
            className="mb-3 text-[#234a82]"
          />
          <p className="relative z-10 font-semibold">每天进步一点点</p>
          <p className="relative z-10 mt-1 text-muted">让学习更有方向</p>
          <svg
            className="mountains absolute inset-x-0 bottom-0 w-full"
            viewBox="0 0 220 78"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="mountain-front"
                x1="155"
                y1="0"
                x2="155"
                y2="90"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9dc7ff" stopOpacity=".8" />
                <stop offset="1" stopColor="#bfd9ff" stopOpacity=".15" />
              </linearGradient>
              <linearGradient
                id="mountain-back"
                x1="100"
                y1="25"
                x2="100"
                y2="90"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#c0daff" stopOpacity=".8" />
                <stop offset="1" stopColor="#d9e9ff" stopOpacity=".1" />
              </linearGradient>
            </defs>
            <path
              d="M24 78 102 43Q108 39 115 46L128 51 146 34Q152 28 160 36L192 61 220 67V78Z"
              fill="url(#mountain-back)"
            />
            <path
              d="m103 78 74-72q7-9 14 0l16 15 13 9v48Z"
              fill="url(#mountain-front)"
            />
            <path
              d="m138 49 15-15 11 9 14-16 13 8 13-8 16 7v44h-90Z"
              fill="#c1dcff"
              fillOpacity=".3"
            />
          </svg>
        </div>
        <footer className="sidebar-credits">
          <CreatorLinks compact />
          <nav className="sidebar-info" aria-label="关于本站">
            <Link href="/about" onClick={onClose}>关于我们</Link>
            <Link href="/contact" onClick={onClose}>联系我们</Link>
            <Link href="/privacy" onClick={onClose}>隐私政策</Link>
          </nav>
        </footer>
      </aside>
    </>
  );
}
