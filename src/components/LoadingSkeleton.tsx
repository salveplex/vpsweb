export function LoadingSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 md:px-6">
      <div className="space-y-5">
        <div className="h-4 w-40 animate-pulse rounded bg-current opacity-10" />
        <div className="h-16 w-full animate-pulse rounded bg-current opacity-10" />
        <div className="h-24 w-2/3 animate-pulse rounded bg-current opacity-10" />
      </div>
      <div className="aspect-[4/3] animate-pulse rounded-lg bg-current opacity-10" />
    </div>
  )
}
