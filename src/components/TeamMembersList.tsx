import Image from 'next/image';
import { urlFor } from "@/lib/sanity";
import { Card } from "@/components/Card";
import { getColorClasses } from "@/utils/color";
import { getBoardPositionTitle, TeamMember } from "@/types/team";

export default function TeamMembersList({
  members,
}: {
  members: TeamMember[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member, index) => {
        const colorClasses = getColorClasses(index);
        return (
          <Card key={member._id} colorClasses={colorClasses}>
            {member.image && (
              <div
                className={`w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 ${colorClasses.border}`}
              >
                <Image
                  src={urlFor(member.image).width(128).height(128).url()}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <h2
              className={`text-xl font-bold ${colorClasses.text} mb-2 text-center`}
            >
              {member.name}
            </h2>
            {member.boardPosition && (
              <p className={`${colorClasses.text} text-center mb-2 italic`}>
                {getBoardPositionTitle(member.boardPosition)}
              </p>
            )}
            <p className={`${colorClasses.lightText} text-center mb-4`}>
              Joined in {member.yearJoined}
            </p>
            <p className="text-gray-600 text-sm">{member.bio}</p>
          </Card>
        );
      })}
    </div>
  );
}
