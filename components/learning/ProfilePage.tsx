"use client";

import { useState } from "react";
import {
  BookOpen,
  Check,
  Download,
  GraduationCap,
  Moon,
  NotebookPen,
  Settings2,
  Star,
  Sun,
} from "lucide-react";
import { useLearningStore } from "@/lib/learning/store";
import { PageHeading, PageSkeleton } from "./PageHeading";
import { CreatorLinks } from "@/components/layout/CreatorLinks";
import { AuthorAvatar } from "@/components/brand/AuthorAvatar";
import { useResourceStore } from "@/lib/resources/store";

export function ProfilePage() {
  const hydrated = useLearningStore((state) => state.hydrated);
  return hydrated ? <ProfileContent /> : <PageSkeleton />;
}
function ProfileContent() {
  const state = useLearningStore();
  const resourceState = useResourceStore();
  const resourceValues = Object.values(resourceState.records);
  const [name, setName] = useState(state.displayName);
  function exportData() {
    const content = JSON.stringify(
      {
        displayName: state.displayName,
        saved: state.saved,
        mastered: state.mastered,
        mistakes: state.mistakes,
        notes: state.notes,
        documents: state.documents,
        activity: state.activity,
        sessions: state.sessions,
        resourceRecords: resourceState.records,
        resourceActivity: resourceState.activity,
      },
      null,
      2,
    );
    const url = URL.createObjectURL(
      new Blob([content], { type: "application/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "yxcr-os-learning.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <main className="dashboard-page">
      <PageHeading
        title="你的成长，都记录在这里"
        description="按照自己的习惯，打造一个安静、高效的学习空间。"
        label="个人学习档案"
        action={
          <button className="outline-button" onClick={exportData}>
            <Download size={15} />
            导出学习记录
          </button>
        }
      />
      <div className="dashboard-columns">
        <div className="space-y-5">
          <section className="panel">
            <div className="flex items-center gap-5">
              <AuthorAvatar size={73} className="profile-avatar" />
              <div>
                <h2 className="text-xl font-semibold">{state.displayName}</h2>
                <p className="mt-2 text-sm text-muted">
                  终身学习者 · 每天进步一点点
                </p>
              </div>
            </div>
            <form
              className="mt-7"
              onSubmit={(event) => {
                event.preventDefault();
                state.setDisplayName(name);
                state.notify("个人资料已更新");
              }}
            >
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor="display-name"
              >
                如何称呼你
              </label>
              <div className="flex gap-3">
                <input
                  id="display-name"
                  className="form-control"
                  maxLength={20}
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="输入你的昵称"
                />
                <button type="submit" className="solid-button shrink-0">
                  <Check size={15} />
                  保存
                </button>
              </div>
              <p className="mt-2 text-xs text-muted">
                这个名字会显示在你的学习概览中。
              </p>
            </form>
          </section>
          <section className="panel">
            <div className="section-heading">
              <h2>界面偏好</h2>
              <Settings2 size={17} className="text-muted" />
            </div>
            <p className="mb-5 mt-2 text-sm text-muted">
              选择让你更舒适的阅读方式。
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "light", title: "浅色模式", icon: Sun },
                { value: "dark", title: "深色模式", icon: Moon },
              ].map(({ value, title, icon: Icon }) => (
                <button
                  className={`theme-preview ${value} ${state.theme === value ? "is-active" : ""}`}
                  key={value}
                  onClick={() => state.setTheme(value as "light" | "dark")}
                >
                  <span className="mini-screen">
                    <i />
                    <span>
                      <b />
                      <b />
                      <b />
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <Icon size={16} />
                    {title}
                    {state.theme === value && (
                      <Check size={15} className="ml-auto text-brand" />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </section>
          <section className="panel">
            <h2 className="text-base font-semibold">阅读字体</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="font-sample">
                <span className="text-2xl font-medium">Aa 学而不止</span>
                <p className="mt-3 text-xs text-muted">
                  Inter · 系统中文 UI 字体
                </p>
              </div>
              <div className="font-sample">
                <span className="font-mono text-xl">const learn = true</span>
                <p className="mt-3 text-xs text-muted">
                  JetBrains Mono Variable
                </p>
              </div>
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <CreatorLinks />
          <section className="panel">
            <h2 className="mb-6 text-base font-semibold">知识积累</h2>
            <div className="space-y-5">
              {[
                {
                  title: "已掌握题目",
                  value: state.mastered.length + resourceValues.filter(item => item.mastered).length,
                  icon: GraduationCap,
                },
                { title: "收藏题目与资源", value: state.saved.length + resourceValues.filter(item => item.saved).length, icon: Star },
                {
                  title: "学习笔记",
                  value:
                    Object.values(state.notes).filter((note) => note.trim())
                      .length + state.documents.length + resourceValues.filter(item => item.note.trim()).length,
                  icon: NotebookPen,
                },
                {
                  title: "完成练习",
                  value: state.sessions.length,
                  icon: BookOpen,
                },
              ].map(({ title, value, icon: Icon }) => (
                <div
                  className="flex items-center justify-between text-sm"
                  key={title}
                >
                  <span className="flex items-center gap-2.5 text-muted">
                    <Icon size={16} />
                    {title}
                  </span>
                  <strong className="font-medium">{value}</strong>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-line pt-4 text-xs leading-6 text-muted">
              学习数据保存在当前浏览器。你可以定期导出一份记录，留住每一步成长。
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
