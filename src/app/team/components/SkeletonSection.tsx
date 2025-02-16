interface SkeletonSectionProps {
  title: string;
  itemCount: number;
}

export default function SkeletonSection({ title, itemCount }: SkeletonSectionProps) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-eclipse-blue-dark">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: itemCount }).map((_, index) => (
          <div key={index} className="animate-pulse bg-gray-300 h-48 rounded-md"></div>
        ))}
      </div>
    </section>
  );
}
