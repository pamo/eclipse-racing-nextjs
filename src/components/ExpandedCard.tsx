"use client";

import { getBoardPositionTitle, TeamMember } from "@/types/team";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { ColorClasses } from "@/utils/color";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

interface ExpandedCardProps {
  member: TeamMember;
  colorClasses: ColorClasses;
  isOpen: boolean;
  onClose: () => void;
}

export function ExpandedCard({
  member,
  colorClasses,
  isOpen,
  onClose,
}: ExpandedCardProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={`w-full max-w-3xl transform overflow-hidden rounded-lg border-2 ${colorClasses.border} bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                <div className="flex justify-between items-center mb-6">
                  <DialogTitle
                    className={`text-2xl font-bold ${colorClasses.text}`}
                  >
                    {member.firstName} {member.lastName}
                  </DialogTitle>
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
                      <h3 className="font-bold mb-2">
                        Joined {member.yearJoined}
                      </h3>
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
                                className={`
                                  px-3 py-1 rounded-full text-sm
                                  border ${colorClasses.border}
                                  ${colorClasses.text}
                                  bg-white
                                  shadow-sm
                                  font-medium
                                `}
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
                          <h3 className="font-bold mb-2">
                            Favorite Race Memory
                          </h3>
                          <p className="text-gray-600">
                            {member.favoriteRaceMemory}
                          </p>
                        </div>
                      )}
                      {member.bucketListRide && (
                        <div>
                          <h3 className="font-bold mb-2">Bucket List Ride</h3>
                          <p className="text-gray-600">
                            {member.bucketListRide}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
