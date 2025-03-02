function SkeletonRow() {
  return <div className="h-12 w-full animate-pulse rounded-md bg-neutral-300"></div>;
}
export default function Loading() {
  const rows = Array.from({ length: 10 }, (_, i) => <SkeletonRow key={i} />);
  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="h-10 w-full animate-pulse rounded-lg bg-neutral-300"></div>
      {rows}
    </div>
  );
}
