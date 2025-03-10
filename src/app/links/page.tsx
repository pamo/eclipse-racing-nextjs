import { client } from '@/lib/sanity';
import { Card } from '@/components/Card';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { getColorClasses } from '@/utils/color';
import { notFound } from 'next/navigation';
import type { SanityImageSource } from '@/lib/sanity';

interface Link {
  _id: string;
  title: string;
  url: string;
  icon?: SanityImageSource;
  order: number;
  active: boolean;
}

async function getLinks(): Promise<Link[]> {
  return client.fetch(`
    *[_type == "link" && active == true] | order(order asc) {
      _id,
      title,
      url,
      icon,
      order,
      active
    }
  `);
}

export default async function LinksPage() {
  const links = await getLinks();

  if (!links) notFound();

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-eclipse-blue">Quick Links</h1>
      </div>

      <div className="space-y-4">
        {links.map((link, index) => (
          <a
            key={link._id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform hover:scale-[1.02]"
          >
            <Card colorClasses={getColorClasses(index)}>
              <div className="flex items-center space-x-4 p-4">
                {link.icon?.asset && (
                  <div className="h-12 w-12 flex-shrink-0">
                    <Image
                      src={urlFor(link.icon).width(96).height(96).url()}
                      alt={`${link.title} icon`}
                      width={48}
                      height={48}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{link.title}</h2>
                  <p className="truncate text-sm text-gray-500">{link.url}</p>
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
