import { Card } from "@/components/Card";
import { getColorClasses } from "@/utils/color";
import { getBoardPositionTitle, TeamMember } from "@/types/team";
import { Avatar } from "./Avatar";

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
              <Avatar
                image={member.image}
                firstName={member.firstName}
                lastName={member.lastName}
                colorClasses={colorClasses}
                className="mb-3 sm:mb-4"
                priority={index < 6}
              />
              <div className="space-y-2 sm:space-y-3">
                <h2 className={`text-lg sm:text-xl font-bold text-center`}>
                  {member.name}
                </h2>
                {member.boardPosition && (
                  <p
                    className={`${colorClasses.text} text-sm sm:text-base text-center italic line-clamp-1 mt-1`}
                  >
                    {getBoardPositionTitle(member.boardPosition)}
                  </p>
                )}
                <p className="text-sm sm:text-base text-center">
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
