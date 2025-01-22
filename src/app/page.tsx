import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';

async function getHomePageData() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      title,
      description,
      logo
    }
  `);
}

export default async function Home() {
  const siteSettings = await getHomePageData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {siteSettings?.logo && (
        <Image
          src={urlFor(siteSettings.logo).width(200).height(200).url()}
          alt={siteSettings.title}
          width={200}
          height={200}
        />
      )}
      <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
        {siteSettings.description}
      </p>
    </main>
  );
}
