export default function SkeletonTeamPage() {
  return (
    <div className="grid min-h-[400px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-[300px] animate-pulse rounded-lg bg-neutral-100"
          style={{
            animationDelay: `${i * 100}ms`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );
}
