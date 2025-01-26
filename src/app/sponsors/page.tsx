import Image from 'next/image';
import { urlFor, SanityImageSource, client } from '@/lib/sanity';
import { Card } from '@/components/Card';
import { getColorClasses } from '@/utils/color';
import { notFound } from 'next/navigation';
import { sponsorLevelOrder } from '@/types/sponsor';

interface Sponsor {
  _id: string;
  name: string;
  website: string;
  logo: SanityImageSource;
  description: string;
  sponsorshipLevel: string
}

async function getSponsors(): Promise<Sponsor[]> {
  return client.fetch(`
      *[_type == "sponsor"] {
        _id,
        name,
        website,
        logo,
        description,
        sponsorshipLevel
      }
    `);
}

function sortSponsors(sponsors: Sponsor[]): Sponsor[] {
  return sponsors.sort((a, b) => {
    if (a.sponsorshipLevel && b.sponsorshipLevel) {
      const levelA = a.sponsorshipLevel.toLowerCase();
      const levelB = b.sponsorshipLevel.toLowerCase();
      const orderA = sponsorLevelOrder[levelA as keyof typeof sponsorLevelOrder];
      const orderB = sponsorLevelOrder[levelB as keyof typeof sponsorLevelOrder];

      return orderA - orderB;
    }
    return a.name.localeCompare(b.name);
  });
}

export default async function SponsorsPage() {
  const sponsors: Sponsor[] = await getSponsors();
  if (!sponsors) notFound();
  const sortedSponsors = sortSponsors(sponsors);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {sortedSponsors?.map((sponsor, index) => {
        const colorClasses = getColorClasses(index);
        return (
          <Card key={sponsor._id} colorClasses={colorClasses}>
            <a
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-48 mb-4 overflow-hidden"
            >
              <Image
                src={urlFor(sponsor.logo).url()}
                alt={sponsor.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain transition-transform duration-300 hover:scale-105"
              />
            </a>
          </Card>
        );
      })}
    </div>
  );
}
