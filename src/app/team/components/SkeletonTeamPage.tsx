import SkeletonSection from './SkeletonSection';

export default function SkeletonTeamPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8">
      <h1 className="mb-4 text-center text-3xl font-bold text-eclipse-blue-dark md:mb-8 md:text-4xl">
        Our Team
      </h1>

      <div className="space-y-6 md:space-y-8">
        <SkeletonSection title="Active Members" itemCount={8} />
        <SkeletonSection title="Alumni" itemCount={4} />
      </div>
    </div>
  );
}
