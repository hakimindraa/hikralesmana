export function ProjectSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-neutral-200 aspect-[4/3] mb-6"></div>
      <div className="h-3 bg-neutral-200 rounded w-1/4 mb-3"></div>
      <div className="h-6 bg-neutral-200 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
    </div>
  )
}

export function GallerySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-neutral-200 aspect-square"></div>
    </div>
  )
}

export function TestimonialSkeleton() {
  return (
    <div className="animate-pulse bg-white p-8 border border-neutral-200">
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-neutral-200"></div>
        ))}
      </div>
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-neutral-200 rounded w-full"></div>
        <div className="h-4 bg-neutral-200 rounded w-full"></div>
        <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
      </div>
      <div className="h-5 bg-neutral-200 rounded w-1/3 mb-2"></div>
      <div className="h-3 bg-neutral-200 rounded w-1/4"></div>
    </div>
  )
}

export function BeforeAfterSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-neutral-200 aspect-[4/3] mb-4"></div>
      <div className="h-5 bg-neutral-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-neutral-200 rounded w-full"></div>
    </div>
  )
}
