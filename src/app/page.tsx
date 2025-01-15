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
      <h1 className="text-4xl font-bold mb-4 text-eclipse-blue-dark">{siteSettings.title}</h1>
      <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">{siteSettings.description}</p>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <Link href="/about" className="btn bg-eclipse-pink text-white hover:bg-eclipse-pink-dark">
          Our Mission
        </Link>
        <Link href="/team" className="btn bg-eclipse-green text-white hover:bg-eclipse-green-dark">
          Meet the Team
        </Link>
        <Link
          href="/sponsors"
          className="btn bg-eclipse-yellow text-eclipse-blue-dark hover:bg-eclipse-yellow-dark"
        >
          Our Sponsors
        </Link>
        <Link href="/join" className="btn bg-eclipse-blue text-white hover:bg-eclipse-blue-dark">
          Join Us
        </Link>
      </div>
    </main>
  );
}
