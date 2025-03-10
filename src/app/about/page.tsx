import { client } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { Card } from '@/components/Card';
import { getColorClasses } from '@/utils/color';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import type { PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="my-8 overflow-hidden rounded-lg">
        <Image
          src={urlFor(value).width(800).height(450).url()}
          alt={value.alt || ''}
          width={800}
          height={450}
          className="h-auto w-full"
          priority={false}
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
        <PortableText value={page.content} components={components} />
      </Card>
    </div>
  );
}
