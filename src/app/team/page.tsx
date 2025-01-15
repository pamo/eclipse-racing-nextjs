import { client } from "@/lib/sanity";
import TeamMembersList from "@/components/TeamMembersList";
import { notFound } from "next/navigation";
import { TeamMember, boardPositionOrder } from "@/types/team";

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
      name,
      lastName,
      boardPosition,
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

  const activeMembers = sortTeamMembers(
    allMembers.filter((member: TeamMember) => member.isActive),
  );
  const alumniMembers = allMembers
    .filter((member: TeamMember) => !member.isActive)
    .sort((a: TeamMember, b: TeamMember) =>
      a.lastName.localeCompare(b.lastName),
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-eclipse-blue-dark text-center">
        Our Team
      </h1>

      <h2 className="text-3xl font-bold mb-6 text-eclipse-blue-dark">
        Active Members
      </h2>
      <TeamMembersList members={activeMembers} />

      {alumniMembers.length > 0 && (
        <>
          <h2 className="text-3xl font-bold my-8 text-eclipse-blue-dark">
            Alumni
          </h2>
          <TeamMembersList members={alumniMembers} />
        </>
      )}
    </div>
  );
}
