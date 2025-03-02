import { SanityImageSource } from '@/lib/sanity';

export const BoardPositions = {
  PRESIDENT: 'president',
  VICE_PRESIDENT: 'vicePresident',
  SECRETARY: 'secretary',
  TREASURER: 'treasurer',
  RECRUITING: 'recruiting',
  CAPTAIN: 'captain',
  SOCIAL: 'social',
  COMMUNITY: 'community',
} as const;

export type BoardPosition = (typeof BoardPositions)[keyof typeof BoardPositions];

export interface TeamMember {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  boardPosition?: BoardPosition;
  yearJoined: number;
  subtitle: string;
  bucketListRide?: string;
  favoriteRaceMemory?: string;
  disciplines?: string[];
  bio: string;
  image?: SanityImageSource;
  isActive: boolean;
}

// Order for sorting board positions
export const boardPositionOrder: Record<BoardPosition, number> = {
  [BoardPositions.PRESIDENT]: 1,
  [BoardPositions.VICE_PRESIDENT]: 2,
  [BoardPositions.SECRETARY]: 3,
  [BoardPositions.TREASURER]: 4,
  [BoardPositions.RECRUITING]: 5,
  [BoardPositions.CAPTAIN]: 6,
  [BoardPositions.SOCIAL]: 7,
  [BoardPositions.COMMUNITY]: 8,
};

// Function to get formatted board position title
export function getBoardPositionTitle(position: BoardPosition): string {
  switch (position) {
    case BoardPositions.PRESIDENT:
      return 'President';
    case BoardPositions.VICE_PRESIDENT:
      return 'Vice President';
    case BoardPositions.SECRETARY:
      return 'Secretary';
    case BoardPositions.TREASURER:
      return 'Treasurer';
    case BoardPositions.RECRUITING:
      return 'New Member Coordinator';
    case BoardPositions.CAPTAIN:
      return 'Race Captain';
    case BoardPositions.SOCIAL:
      return 'Social Chair';
    case BoardPositions.COMMUNITY:
      return 'Community Outreach';
    default:
      return '';
  }
}
