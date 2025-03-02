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
          src={urlFor(value.asset).fit('max').url()}
          alt="Photo of the team"
          width={width}
          height={height}
          style={{
            aspectRatio: width / height,
          }}
        />
      );
    },
  },
};
export default async function Home() {
  const siteSettings = await getSiteSettings();

  return (
    <main className="prose mx-auto min-h-screen min-w-full p-4">
      <Card colorClasses={getColorClasses(1)}>
        <h1>{siteSettings.description}</h1>
        <PortableText value={siteSettings.content} components={components} />
        <RaceResultsWidget />
      </Card>
    </main>
  );
}
