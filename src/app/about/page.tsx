import { Card } from '@/components/Card';
import { client, urlFor } from '@/lib/sanity';
import { getColorClasses } from '@/utils/color';
import type { PortableTextComponents } from '@portabletext/react';
import { PortableText } from '@portabletext/react';
import { getImageDimensions } from '@sanity/asset-utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const { width, height } = getImageDimensions(value);
      const hotspot = value.hotspot || { x: 0.5, y: 0.5 };

      return (
        <Image
          src={urlFor(value.asset)
            .width(1200)
            .height(Math.round(1200 * (height / width)))
            .auto('format')
            .fit('crop')
            .crop('focalpoint')
            .focalPoint(hotspot.x, hotspot.y)
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
async function getAboutPage() {
  return client.fetch(`
    *[_type == "page" && slug.current == "about"][0] {
      title,
      content
    }
  `);
}

export default async function AboutPage() {
  const page = await getAboutPage();
  if (!page) notFound();

  return (
    <div className="prose mx-auto min-h-screen p-4">
      <Card colorClasses={getColorClasses(4)}>
        <h1 className="mb-6 text-3xl font-bold">{page.title}</h1>
        <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-neutral-100" />}>
          <PortableText value={page.content} components={components} />
        </Suspense>
      </Card>
    </div>
  );
}
