"use client";

import { getBoardPositionTitle, TeamMember } from "@/types/team";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { ColorClasses } from "@/utils/color";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface ExpandedCardProps {
  member: TeamMember;
  colorClasses: ColorClasses;
  onClose: () => void;
}

export function ExpandedCard({
  member,
  colorClasses,
  onClose,
}: ExpandedCardProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 bg-black/50 overflow-y-auto md:overflow-hidden">
      <div
        className={`bg-white rounded-lg border-2 ${colorClasses.border} w-full max-w-3xl
				my-4 md:my-0 // Add margin for mobile scrolling
				md:max-h-[90vh] // Only constrain height on desktop
				md:overflow-y-auto // Only add scroll on desktop
			`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold ${colorClasses.text}`}>
              {member.firstName} {member.lastName}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors ml-4"
              aria-label="Close"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {member.image && (
              <div className="w-full md:w-1/3">
                <div
                  className={`aspect-square overflow-hidden rounded-lg border-4 ${colorClasses.border}
									relative w-48 h-48 sm:w-64 sm:h-64 md:w-full md:h-auto mx-auto`}
                >
                  {imageLoading && (
                    <div className="absolute inset-0 ${colorClasses.border} bg-opacity-20 animate-pulse" />
                  )}
                  <Image
                    src={urlFor(member.image)
                      .width(800)
                      .height(800)
                      .fit("crop")
                      .crop("center")
                      .quality(90)
                      .url()}
                    alt={`${member.firstName} ${member.lastName}`}
                    width={800}
                    height={800}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className={`
                      object-cover w-full h-full
                      transition-opacity duration-300
                      ${imageLoading ? "opacity-0" : "opacity-100"}
                    `}
                    priority={true}
                    onLoadingComplete={() => setImageLoading(false)}
                  />
                </div>
              </div>
            )}

            <div className="w-full md:w-2/3 space-y-4">
              <div className="space-y-4">
                <h3 className="font-bold mb-2">Joined {member.yearJoined}</h3>
                {member.boardPosition && (
                  <div
                    className={`${colorClasses.text} text-sm sm:text-base italic`}
                  >
                    {getBoardPositionTitle(member.boardPosition)}
                  </div>
                )}
                {member.disciplines && member.disciplines.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-2">Disciplines</h3>
                    <div className="flex flex-wrap gap-2">
                      {member.disciplines.map((discipline) => (
                        <span
                          key={discipline}
                          className={`px-3 py-1 rounded-full text-sm ${colorClasses.border} bg-white`}
                        >
                          {discipline}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {member.bio && (
                  <div>
                    <h3 className="font-bold mb-2">Bio</h3>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                )}
                {member.favoriteRaceMemory && (
                  <div>
                    <h3 className="font-bold mb-2">Favorite Race Memory</h3>
                    <p className="text-gray-600">{member.favoriteRaceMemory}</p>
                  </div>
                )}
                {member.bucketListRide && (
                  <div>
                    <h3 className="font-bold mb-2">Bucket List Ride</h3>
                    <p className="text-gray-600">{member.bucketListRide}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
