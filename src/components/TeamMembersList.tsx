'use client';
import { Card } from '@/components/Card';
import { ExpandedCard } from '@/components/ExpandedCard';
import { getColorClasses } from '@/utils/color';
import { getBoardPositionTitle, TeamMember } from '@/types/team';
import { Avatar } from './Avatar';
import { useState, useEffect } from 'react';

function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function getMemberHash(firstName: string, lastName: string): string {
  return `${toKebabCase(firstName)}-${toKebabCase(lastName)}`;
}

export default function TeamMembersList({
  members,
  showExtraCard = false,
}: {
  members: TeamMember[];
  showExtraCard?: boolean;
}) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const member = members.find((m) => getMemberHash(m.firstName, m.lastName) === hash);
      if (member) {
        setSelectedMember(member);
      }
    }
  }, [members]);
  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    const hash = getMemberHash(member.firstName, member.lastName);
    window.history.pushState(null, '', `#${hash}`);
  };

  const handleClose = () => {
    setSelectedMember(null);
    window.history.pushState(null, '', window.location.pathname);
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {members.map((member, index) => {
          const colorClasses = getColorClasses(index);
          return (
            <button
              key={member._id}
              onClick={() => handleMemberClick(member)}
              className="rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-offset-2"
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
                    <h2 className={`text-center text-lg font-bold sm:text-xl`}>{member.name}</h2>
                    {member.boardPosition && (
                      <p
                        className={`${colorClasses.text} mt-1 line-clamp-1 text-center text-sm italic sm:text-base`}
                      >
                        {getBoardPositionTitle(member.boardPosition)}
                      </p>
                    )}
                    <p className="text-center text-sm sm:text-base">
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
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center p-6">
              <h2
                className={`mb-4 text-center text-2xl font-bold ${getColorClasses(members.length).text}`}
              >
                And Many More!
              </h2>
              <p className="text-center text-gray-600">
                Eclipse Racing has been home to many amazing cyclists over the years.
              </p>
            </div>
          </Card>
        )}
      </div>
      {selectedMember && (
        <ExpandedCard
          member={selectedMember!}
          colorClasses={
            selectedMember
              ? getColorClasses(members.findIndex((m) => m._id === selectedMember._id))
              : getColorClasses(0)
          }
          isOpen={!!selectedMember}
          onClose={handleClose}
        />
      )}
    </>
  );
}
