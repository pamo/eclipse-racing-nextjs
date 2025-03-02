interface SkeletonSectionProps {
  title: string;
  itemCount: number;
}

export default function SkeletonSection({ title, itemCount }: SkeletonSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold text-eclipse-blue-dark md:mb-6 md:text-3xl">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: itemCount }).map((_, index) => (
          <div key={index} className="h-48 animate-pulse rounded-md bg-gray-300"></div>
        ))}
      </div>
    </section>
  );
}
