function SkeletonRow() {
  return <div className="h-8 w-full rounded-md animate-pulse bg-neutral-300"></div>;
}
export default function Loading() {
  const rows = Array.from({ length: 10 }, (_, i) => <SkeletonRow key={i} />);
  return (
    <div className="flex-col gap-2 mt-4 flex">
      <div className="h-2.5 w-full rounded-sm animate-pulse bg-neutral-300"></div>
      {rows}
    </div>
  );
}
