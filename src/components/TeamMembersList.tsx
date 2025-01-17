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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {members.map((member, index) => {
        const colorClasses = getColorClasses(index);
        return (
          <Card key={member._id} colorClasses={colorClasses}>
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              {member.image && (
                <div
                  className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-full border-4 ${colorClasses.border}`}
                >
                  <Image
                    src={urlFor(member.image).width(128).height(128).url()}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    priority={index < 6} // Prioritize loading for first 6 images
                  />
                </div>
              )}
              <div className="space-y-2 sm:space-y-3">
                <h2
                  className={`text-lg sm:text-xl font-bold ${colorClasses.text} text-center`}
                >
                  {member.name}
                </h2>
                {member.boardPosition && (
                  <p
                    className={`${colorClasses.text} text-sm sm:text-base text-center italic line-clamp-1 mt-1`}
                  >
                    {getBoardPositionTitle(member.boardPosition)}
                  </p>
                )}
                <p
                  className={`${colorClasses.lightText} text-sm sm:text-base text-center`}
                >
                  Joined in {member.yearJoined}
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center mt-3 line-clamp-4 w-full">
                  {member.bio}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
