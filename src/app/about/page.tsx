import { client } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { Card } from '@/components/Card';
import { getColorClasses } from '@/utils/color';

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
    <div className="container p-4">
      <Card colorClasses={getColorClasses(2)}>
        <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
        <PortableText value={page.content} />
      </Card>
    </div>
  );
}
