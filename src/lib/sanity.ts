import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export interface SanityImageHotspot {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface SanityImageCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

export interface SanityImageSource {
  _type: 'image';
  asset: SanityImageAsset;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
}

export const client = createClient({
  projectId: '4vmhoqo4',
  dataset: 'production',

  apiVersion: '2023-05-03',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      title,
      description,
      content,
      "logo": logo.asset->url
    }
  `);
}
