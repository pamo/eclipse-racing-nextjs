export const SponsorLevels = {
  PLATINUM: 'platinum',
  GOLD: 'gold',
  SILVER: 'silver',
  BRONZE: 'bronze',
} as const;

export type SponsorLevel = (typeof SponsorLevels)[keyof typeof SponsorLevels];
export const sponsorLevelOrder: Record<SponsorLevel, number> = {
  [SponsorLevels.PLATINUM]: 1,
  [SponsorLevels.GOLD]: 2,
  [SponsorLevels.SILVER]: 3,
  [SponsorLevels.BRONZE]: 4,
};
