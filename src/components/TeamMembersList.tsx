"use client";
import { Card } from "@/components/Card";
import { ExpandedCard } from "@/components/ExpandedCard";
import { getColorClasses } from "@/utils/color";
import { getBoardPositionTitle, TeamMember } from "@/types/team";
import { Avatar } from "./Avatar";
import { useState } from "react";

export default function TeamMembersList({
  members,
  showExtraCard = false,
}: {
  members: TeamMember[];
  showExtraCard?: boolean;
}) {
  const [expandedMember, setExpandedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {members.map((member, index) => {
          const colorClasses = getColorClasses(index);
          return (
            <button
              key={member._id}
              onClick={() => setExpandedMember(member)}
              className="text-left focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
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
                  </div>
                </div>
              </Card>
            </button>
          );
        })}
        {showExtraCard && (
          <Card colorClasses={getColorClasses(members.length)}>
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] p-6">
              <h2
                className={`text-2xl font-bold text-center mb-4 ${getColorClasses(members.length).text}`}
              >
                And Many More!
              </h2>
              <p className="text-center text-gray-600">
                Eclipse Racing has been home to many amazing cyclists over the
                years.
              </p>
            </div>
          </Card>
        )}
      </div>
      {expandedMember && (
        <ExpandedCard
          member={expandedMember}
          colorClasses={getColorClasses(
            members.findIndex((m) => m._id === expandedMember._id),
          )}
          onClose={() => setExpandedMember(null)}
        />
      )}
    </>
  );
}
