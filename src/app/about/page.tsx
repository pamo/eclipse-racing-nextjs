import { client } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { Card } from '@/components/Card';
import { getColorClasses } from '@/utils/color';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import type { PortableTextComponents } from '@portabletext/react';
import { Suspense } from 'react';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="my-8 overflow-hidden rounded-lg">
        <Image
          src={urlFor(value).width(800).height(450).format('webp').quality(80).url()}
          alt={value.alt || ''}
          width={800}
          height={450}
          className="h-auto w-full"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 800px"
          placeholder="blur"
          blurDataURL={urlFor(value).width(50).height(28).format('webp').quality(20).url()}
        />
      </div>
    ),
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
