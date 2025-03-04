function SkeletonCard() {
  return (
    <div className="relative h-full min-h-[200px]">
      {/* Card shadow effect */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 transform rounded-lg bg-neutral-200"></div>

      {/* Card content */}
      <div className="relative z-10 h-full rounded-lg border-2 border-neutral-200 bg-white p-4">
        {/* Date and race name */}
        <div className="mb-4 space-y-2">
          <div className="h-6 w-32 animate-pulse rounded-md bg-neutral-300"></div>
          <div className="h-5 w-48 animate-pulse rounded-md bg-neutral-200"></div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          <div className="h-4 w-24 animate-pulse rounded-md bg-neutral-200"></div>
          <div className="space-y-2">
            <div className="h-4 w-40 animate-pulse rounded-md bg-neutral-100"></div>
            <div className="h-4 w-36 animate-pulse rounded-md bg-neutral-100"></div>
            <div className="w-38 h-4 animate-pulse rounded-md bg-neutral-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  const cards = Array.from({ length: 4 }, (_, i) => <SkeletonCard key={i} />);

  return <div className="grid grid-cols-1 gap-6 lg:auto-rows-fr lg:grid-cols-2">{cards}</div>;
}
