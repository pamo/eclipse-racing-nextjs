import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";

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
      <h1 className="text-4xl font-bold mt-8 mb-4">{siteSettings.title}</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        {siteSettings.description}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/about" className="btn btn-primary">
          Our Mission
        </Link>
        <Link href="/team" className="btn btn-secondary">
          Meet the Team
        </Link>
        <Link href="/sponsors" className="btn btn-secondary">
          Our Sponsors
        </Link>
        <Link href="/join" className="btn btn-primary">
          Join Us
        </Link>
      </div>
    </main>
  );
}
