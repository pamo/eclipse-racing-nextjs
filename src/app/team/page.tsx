import { client } from '@/lib/sanity';
import TeamMembersList from '@/components/TeamMembersList';
import { notFound } from 'next/navigation';
import { TeamMember, boardPositionOrder } from '@/types/team';
import { Suspense } from 'react';
import SkeletonTeamPage from '@/app/team/components/SkeletonTeamPage';

function sortTeamMembers(members: TeamMember[]): TeamMember[] {
  return members.sort((a, b) => {
    // First, sort by board position
    if (a.boardPosition && b.boardPosition) {
      return (
        boardPositionOrder[a.boardPosition as keyof typeof boardPositionOrder] -
        boardPositionOrder[b.boardPosition as keyof typeof boardPositionOrder]
      );
    }
    // If only one has a board position, they go first
    if (a.boardPosition) return -1;
    if (b.boardPosition) return 1;

    // If neither has a board position, sort by last name
    return a.lastName.localeCompare(b.lastName);
  });
}
async function getTeamMembers() {
  return client.fetch(`
    *[_type == "teamMember"] {
      _id,
      "name": firstName + " " + lastName,
      firstName,
      lastName,
      boardPosition,
      disciplines,
      favoriteRaceMemory,
      bucketListRide,
      yearJoined,
      bio,
      image,
      isActive
    }
  `);
}

export default async function TeamPage() {
  const allMembers = await getTeamMembers();

  if (!allMembers || allMembers.length === 0) notFound();

  const activeMembers = sortTeamMembers(allMembers.filter((member: TeamMember) => member.isActive));
  const alumniMembers = allMembers
    .filter((member: TeamMember) => !member.isActive)
    .sort((a: TeamMember, b: TeamMember) => a.lastName.localeCompare(b.lastName));

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8">
        <h1 className="mb-4 text-center text-3xl font-bold text-eclipse-blue-dark md:mb-8 md:text-4xl">
          Our Team
        </h1>

        <div className="grid min-h-[500px] gap-6 md:gap-8">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-eclipse-blue-dark md:mb-6 md:text-3xl">
              Active Members
            </h2>
            <div className="min-h-[400px]">
              <Suspense fallback={<SkeletonTeamPage />}>
                <TeamMembersList members={activeMembers} />
              </Suspense>
            </div>
          </section>

          {alumniMembers.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-bold text-eclipse-blue-dark md:mb-6 md:text-3xl">
                Alumni
              </h2>
              <div className="min-h-[400px]">
                <Suspense fallback={<SkeletonTeamPage />}>
                  <TeamMembersList members={alumniMembers} showExtraCard />
                </Suspense>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
