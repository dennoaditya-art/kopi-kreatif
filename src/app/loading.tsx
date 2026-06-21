export default function LoadingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8">
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-64 rounded-2xl bg-ink/5 dark:bg-white/5" />
        <div className="h-5 w-96 rounded-2xl bg-ink/5 dark:bg-white/5" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border-2 border-ink/5 dark:border-white/5 overflow-hidden">
              <div className="aspect-[4/3] bg-ink/5 dark:bg-white/5" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 rounded-2xl bg-ink/5 dark:bg-white/5" />
                <div className="h-3 w-1/2 rounded-2xl bg-ink/5 dark:bg-white/5" />
                <div className="h-8 w-full rounded-2xl bg-ink/5 dark:bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

