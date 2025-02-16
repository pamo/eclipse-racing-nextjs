import SkeletonSection from './SkeletonSection';

export default function SkeletonTeamPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-7xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-eclipse-blue-dark text-center">
        Our Team
      </h1>

      <div className="space-y-6 md:space-y-8">
        <SkeletonSection title="Active Members" itemCount={8} />
        <SkeletonSection title="Alumni" itemCount={4} />
      </div>
    </div>
  );
}
