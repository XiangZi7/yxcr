export function QuestionSkeleton() {
  return (
    <div className="content-layout grid min-w-0 items-start">
      <main className="article-card min-w-0 rounded-xl" aria-busy="true">
        <span className="sr-only" role="status">
          正在加载知识内容…
        </span>
        <div aria-hidden="true" className="motion-safe:animate-pulse">
          <div className="mb-8 h-4 w-36 rounded bg-line" />
          <div className="mb-4 h-9 w-3/4 rounded-lg bg-line" />
          <div className="mb-10 h-3 w-40 rounded bg-line" />
          <div className="mb-6 h-6 w-1/3 rounded bg-line" />
          <div className="space-y-4">
            {[0, 1, 2, 3].map((line) => (
              <div key={line} className="h-4 rounded bg-line" />
            ))}
            <div className="h-4 w-2/3 rounded bg-line" />
          </div>
          <div className="my-8 h-52 rounded-lg bg-line" />
        </div>
      </main>
      <aside className="right-sidebar min-w-0" aria-hidden="true">
        <div className="side-card motion-safe:animate-pulse">
          <div className="mb-6 h-5 w-20 rounded bg-line" />
          <div className="space-y-5">
            {[0, 1, 2, 3, 4].map((line) => (
              <div key={line} className="h-3 w-4/5 rounded bg-line" />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
