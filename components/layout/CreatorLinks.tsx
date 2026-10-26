import { ArrowUpRight, GitBranch, TvMinimalPlay } from "lucide-react";
import { author } from "@/lib/site";

export function CreatorLinks({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={compact ? "creator-compact" : "panel creator-panel"}
      aria-label="作者与社交主页"
    >
      <div className="flex items-center gap-3">
        <span className="creator-avatar">
          X<span>.</span>
        </span>
        <div>
          <a
            href={author.github}
            target="_blank"
            rel="me noopener noreferrer"
            className="text-sm font-semibold hover:text-brand"
          >
            {author.name}
          </a>
          <p className="mt-1 text-[11px] text-muted">一起学习，一起成长。</p>
        </div>
      </div>
      <nav className="creator-socials" aria-label="作者社交主页">
        <a
          href={author.github}
          target="_blank"
          rel="me noopener noreferrer"
          aria-label="XiangZi7 的 GitHub 主页（新窗口）"
        >
          <GitBranch size={15} />
          GitHub
          <ArrowUpRight size={11} />
        </a>
        <a
          href={author.bilibili}
          target="_blank"
          rel="me noopener noreferrer"
          aria-label="XiangZi7 的哔哩哔哩主页（新窗口）"
        >
          <TvMinimalPlay size={16} />B 站<ArrowUpRight size={11} />
        </a>
      </nav>
    </section>
  );
}
