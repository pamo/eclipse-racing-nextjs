import { Card } from '@/components/Card';
import { getSiteSettings } from '@/lib/sanity';
import { getColorClasses } from '@/utils/color';
import { PortableText, SanityImageAssetDocument } from 'next-sanity';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { getImageDimensions } from '@sanity/asset-utils';
import RaceResultsWidget from '@/components/race-results/RaceResultsWidget';

const components = {
  types: {
    image: ({ value }: { value: SanityImageAssetDocument }) => {
      const { width, height } = getImageDimensions(value);
      return (
        <Image
          src={urlFor(value.asset)
            .width(1200)
            .height(Math.round(1200 * (height / width)))
            .auto('format')
            .quality(100)
            .url()}
          alt={value.alt || 'Photo of the team'}
          width={1200}
          height={Math.round(1200 * (height / width))}
          className="my-0 h-auto w-full overflow-hidden rounded-lg"
          sizes="(max-width: 768px) 100vw, 800px"
          loading="eager"
          placeholder="blur"
          blurDataURL={urlFor(value.asset)
            .width(50)
            .height(Math.round(50 * (height / width)))
            .auto('format')
            .quality(30)
            .url()}
        />
      );
    },
  },
};
export default async function Home() {
  const siteSettings = await getSiteSettings();

  return (
    <main className="prose mx-auto grid min-h-screen min-w-full grid-cols-1 gap-4 p-4 lg:grid-cols-2">
      <Card colorClasses={getColorClasses(1)}>
        <h1 className="m-0 text-eclipse-blue-dark">{siteSettings.description}</h1>
        <PortableText value={siteSettings.content} components={components} />
      </Card>
      <RaceResultsWidget />
    </main>
  );
}
