"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Header } from "@/components/interview/Header";
import { Sidebar } from "@/components/interview/Sidebar";
import { WorkspaceDialog } from "@/components/interview/WorkspaceDialog";
import { articles } from "@/lib/interview/data";
import { resourceSummary } from "@/lib/resources/config";
import {
  initializeResourceState,
  useResourceStore,
} from "@/lib/resources/store";
import type { Panel } from "@/lib/interview/types";
import {
  initializeLearningState,
  useLearningStore,
} from "@/lib/learning/store";
import { articleHref } from "@/lib/interview/data";
import type { SidebarGroup } from "@/lib/resources/navigation";

export function AppShell({ children, navigation }: { children: ReactNode; navigation: SidebarGroup[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const theme = useLearningStore((state) => state.theme);
  const mastered = useLearningStore((state) => state.mastered);
  const resourceRecords = useResourceStore((state) => state.records);
  const totalMastered =
    mastered.length +
    Object.values(resourceRecords).filter((item) => item.mastered).length;
  const toast = useLearningStore((state) => state.toast);
  const setTheme = useLearningStore((state) => state.setTheme);
  const notify = useLearningStore((state) => state.notify);
  const currentArticle = articles.find(
    (article) => pathname === articleHref(article.slug),
  );
  const closeMenu = useCallback(() => setMobileOpen(false), []);
  useEffect(() => {
    void initializeLearningState();
    void initializeResourceState();
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => notify(""), 2600);
    return () => clearTimeout(timer);
  }, [toast, notify]);
  function openPanel(panel: Panel) {
    if (panel === "help") setHelpOpen(true);
    else router.push(`/${panel}`);
  }
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.2 }}>
      <div className="workspace min-h-screen" data-theme={theme}>
        <a className="skip-link" href="#main-content">
          跳至主要内容
        </a>
        <Header
          dark={theme === "dark"}
          onTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
          onPanel={openPanel}
          onMenu={() => setMobileOpen(!mobileOpen)}
          progress={Math.round((totalMastered / resourceSummary.total) * 100)}
        />
        <div className="workspace-layout">
          <Sidebar
            navigation={navigation}
            topic={currentArticle?.topic ?? ""}
            mobileOpen={mobileOpen}
            onClose={closeMenu}
          />
          <div id="main-content" tabIndex={-1} className="workspace-content min-w-0">
            {children}
          </div>
        </div>
        {helpOpen && (
          <WorkspaceDialog
            panel="help"
            onClose={() => setHelpOpen(false)}
            article={articles[0]}
          />
        )}
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast}
              className="toast flex items-center gap-2"
              role="status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <Check size={16} className="shrink-0 text-brand" />
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
