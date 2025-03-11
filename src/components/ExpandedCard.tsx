'use client';

import { getBoardPositionTitle, TeamMember } from '@/types/team';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { ColorClasses } from '@/utils/color';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

interface ExpandedCardProps {
  member: TeamMember;
  colorClasses: ColorClasses;
  isOpen: boolean;
  onClose: () => void;
}

export function ExpandedCard({ member, colorClasses, isOpen, onClose }: ExpandedCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const hotspot = member.image?.hotspot || { x: 0.5, y: 0.5 };

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
                <div className="mb-6 flex items-center justify-between">
                  <DialogTitle className={`text-2xl font-bold ${colorClasses.text}`}>
                    {member.firstName} {member.lastName}
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className="ml-4 rounded-full p-2 transition-colors hover:bg-gray-100"
                    aria-label="Close"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex flex-col gap-6 md:flex-row">
                  {member.image && (
                    <div className="w-full md:w-1/3">
                      <div
                        className={`aspect-square overflow-hidden rounded-lg border-4 ${colorClasses.border} relative mx-auto h-48 w-48 sm:h-64 sm:w-64 md:h-auto md:w-full`}
                      >
                        {imageLoading && (
                          <div className="${colorClasses.border} absolute inset-0 animate-pulse bg-opacity-20" />
                        )}
                        <Image
                          src={urlFor(member.image)
                            .width(800)
                            .height(800)
                            .fit('crop')
                            .crop('focalpoint')
                            .focalPoint(hotspot.x, hotspot.y)
                            .format('webp')
                            .quality(90)
                            .url()}
                          alt={`${member.firstName} ${member.lastName}`}
                          width={800}
                          height={800}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={urlFor(member.image)
                            .width(40)
                            .height(40)
                            .fit('crop')
                            .crop('focalpoint')
                            .focalPoint(hotspot.x, hotspot.y)
                            .format('webp')
                            .quality(20)
                            .url()}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                          className={`h-full w-full object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'} `}
                          priority={true}
                          onLoadingComplete={() => setImageLoading(false)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="w-full space-y-4 md:w-2/3">
                    <div className="space-y-4">
                      <h3 className="mb-2 font-bold">Joined {member.yearJoined}</h3>
                      {member.boardPosition && (
                        <div className={`${colorClasses.text} text-sm italic sm:text-base`}>
                          {getBoardPositionTitle(member.boardPosition)}
                        </div>
                      )}
                      {member.disciplines && member.disciplines.length > 0 && (
                        <div>
                          <h3 className="mb-2 font-bold">Disciplines</h3>
                          <div className="flex flex-wrap gap-2">
                            {member.disciplines.map((discipline) => (
                              <span
                                key={discipline}
                                className={`rounded-full border px-3 py-1 text-sm ${colorClasses.border} ${colorClasses.text} bg-white font-medium shadow-sm`}
                              >
                                {discipline}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {member.bio && (
                        <div>
                          <h3 className="mb-2 font-bold">Bio</h3>
                          <p className="text-gray-600">{member.bio}</p>
                        </div>
                      )}
                      {member.favoriteRaceMemory && (
                        <div>
                          <h3 className="mb-2 font-bold">Favorite Race Memory</h3>
                          <p className="text-gray-600">{member.favoriteRaceMemory}</p>
                        </div>
                      )}
                      {member.bucketListRide && (
                        <div>
                          <h3 className="mb-2 font-bold">Bucket List Ride</h3>
                          <p className="text-gray-600">{member.bucketListRide}</p>
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
