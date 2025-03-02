export interface SocialMedia {
  platform: string;
  url: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  socialMedia: SocialMedia[];
}
