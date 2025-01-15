import Image from 'next/image'
import { SanityImageSource, urlFor } from '@/lib/sanity'

interface TeamMember {
  _id: string
  name: string
  yearJoined: number
  bio: string
  image?: SanityImageSource
}

export default function TeamMembersList({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member) => (
        <div
          key={member._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden border-t-4 border-eclipse-pink"
        >
          {member.image && (
            <Image
              src={urlFor(member.image).width(300).height(300).url()}
              alt={member.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="text-xl font-bold text-eclipse-blue-dark">
              {member.name}
            </h2>
            <p className="text-eclipse-green-dark">
              Joined in {member.yearJoined}
            </p>
            <p className="mt-2 text-gray-600">{member.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
