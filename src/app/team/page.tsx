import { client } from '@/lib/sanity'
import TeamMembersList from '@/components/TeamMembersList'
import { notFound } from "next/navigation";

async function getTeamMembers() {
  return client.fetch(`
    *[_type == "teamMember"] | order(name asc) {
      _id,
      name,
      slug,
      yearJoined,
      bio,
      image
    }
  `);
}

export default async function TeamPage() {
  const members = await getTeamMembers();

  if (!members) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-eclipse-blue-dark text-center">
        Our Team
      </h1>

      <TeamMembersList members={members} />
    </div>
  );
}
