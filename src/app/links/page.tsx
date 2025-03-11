import { client } from '@/lib/sanity';
import { Card } from '@/components/Card';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { getColorClasses } from '@/utils/color';
import type { SanityImageSource } from '@/lib/sanity';
import { Suspense } from 'react';
import notFound from '../not-found';

interface Link {
  _id: string;
  title: string;
  url: string;
  icon?: SanityImageSource;
  order: number;
  active: boolean;
}

async function getLinks(): Promise<Link[]> {
  return client.fetch(
    `*[_type == "link" && active == true] | order(order asc) {
      _id,
      title,
      url,
      icon,
      order,
      active
    }`,
    {},
    {
      next: {
        revalidate: 3600,
      },
    }
  );
}

function LinksSkeleton() {
  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="mb-8 text-center">
        <div className="mx-auto h-10 w-48 animate-pulse rounded-lg bg-neutral-200" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="rounded-lg border-2 border-neutral-200 p-4">
              <div className="flex min-w-0 items-center space-x-4">
                <div className="h-12 w-12 flex-shrink-0 rounded-full bg-neutral-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 rounded bg-neutral-200" />
                  <div className="h-4 w-full rounded bg-neutral-200" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinksList({ links }: { links: Link[] }) {
  return (
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
            <div className="flex min-w-0 items-center space-x-4 p-4">
              {link.icon?.asset && (
                <div className="h-12 w-12 flex-shrink-0">
                  <Image
                    src={urlFor(link.icon).width(96).height(96).format('webp').quality(75).url()}
                    alt={`${link.title} icon`}
                    width={48}
                    height={48}
                    className="h-full w-full rounded-full object-cover"
                    sizes="48px"
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold">{link.title}</h2>
                <p className="truncate text-sm text-gray-500">{link.url}</p>
              </div>
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
}

async function LinksContainer() {
  const links = await getLinks();

  if (!links || links.length === 0) {
    notFound();
  }

  return <LinksList links={links} />;
}

export default function LinksPage() {
  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-eclipse-blue">Quick Links</h1>
      </div>

      <Suspense fallback={<LinksSkeleton />}>
        <LinksContainer />
      </Suspense>
    </div>
  );
}
