import { client } from '@/lib/sanity'
import TeamMembersList from '@/components/TeamMembersList'

interface TeamMember {
  _id: string
  name: string
  yearJoined: number
  bio: string
  image?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    _type: 'image';
  }
}

async function getTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(`
    *[_type == "teamMember"] | order(name asc) {
      _id,
      name,
      yearJoined,
      bio,
      image
    }
  `)
}

export default async function TeamPage() {
  const members = await getTeamMembers()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Team</h1>
      <TeamMembersList members={members} />
    </div>
  )
}
