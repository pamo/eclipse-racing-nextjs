function SkeletonRow() {
  return <div className="h-8 w-full animate-pulse rounded-md bg-neutral-300"></div>;
}
export default function Loading() {
  const rows = Array.from({ length: 10 }, (_, i) => <SkeletonRow key={i} />);
  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="h-2.5 w-full animate-pulse rounded-sm bg-neutral-300"></div>
      {rows}
    </div>
  );
}
