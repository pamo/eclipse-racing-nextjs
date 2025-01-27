import Image from 'next/image';
import { urlFor, SanityImageSource, client } from '@/lib/sanity';
import { Card } from '@/components/Card';
import { ColorClasses } from '@/utils/color';
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



function SponsorCard({ sponsor, level }: { sponsor: Sponsor; level: string }) {
  const colorClasses = getSponsorColorClasses(level);

  return (
    <Card colorClasses={colorClasses}>
      <a
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full relative"
        style={{ aspectRatio: getSponsorAspectRatio(level) }}
      >
        <Image
          src={urlFor(sponsor.logo).url()}
          alt={sponsor.name}
          fill
          sizes={getSponsorImageSizes(level)}
          className="object-contain transition-transform duration-300 hover:scale-105"
        />
      </a>
    </Card>
  );
}
function getSponsorColorClasses(level: string): ColorClasses {
  switch (level) {
    case 'platinum':
      return {
        border: 'border-slate-300',
        shadow: 'bg-slate-200',
        text: 'text-slate-900',
        lightText: 'text-slate-600'
      };
    case 'gold':
      return {
        border: 'border-amber-300',
        shadow: 'bg-amber-200',
        text: 'text-amber-900',
        lightText: 'text-amber-600'
      };
    case 'silver':
      return {
        border: 'border-gray-300',
        shadow: 'bg-gray-200',
        text: 'text-gray-900',
        lightText: 'text-gray-600'
      };
    case 'bronze':
    default:
      return {
        border: 'border-orange-300',
        shadow: 'bg-orange-200',
        text: 'text-orange-900',
        lightText: 'text-orange-600'
      };
  }
}

function getSponsorAspectRatio(level: string): string {
  switch (level) {
    case 'platinum':
      return '3/1'; // wider aspect ratio for platinum
    case 'gold':
      return '2/1'; // wide aspect ratio for gold
    case 'silver':
      return '3/2'; // slightly wide aspect ratio for silver
    case 'bronze':
    default:
      return '1/1'; // square aspect ratio for bronze
  }
}

function getSponsorImageSizes(level: string): string {
  switch (level) {
    case 'platinum':
      return '100vw'; // Full viewport width
    case 'gold':
      return '(max-width: 768px) 100vw, 50vw'; // Full width on mobile, half on desktop
    case 'silver':
      return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw';
    case 'bronze':
    default:
      return '(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16.67vw';
  }
}

export default async function SponsorsPage() {
  const sponsors: Sponsor[] = await getSponsors();
  if (!sponsors) notFound();
  const sortedSponsors = sortSponsors(sponsors);

  const sponsorsByLevel = sortedSponsors.reduce((acc, sponsor) => {
    const level = sponsor.sponsorshipLevel?.toLowerCase() || 'bronze';
    if (!acc[level]) acc[level] = [];
    acc[level].push(sponsor);
    return acc;
  }, {} as Record<string, Sponsor[]>);

  return (
    <div className="space-y-8 p-4">
      {/* Platinum Sponsors */}
      {sponsorsByLevel.platinum && (
        <div className="w-full space-y-8">
          {sponsorsByLevel.platinum.map((sponsor) => (
            <SponsorCard key={sponsor._id} sponsor={sponsor} level="platinum" />
          ))}
        </div>
      )}

      {/* Gold Sponsors */}
      {sponsorsByLevel.gold && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sponsorsByLevel.gold.map((sponsor) => (
            <SponsorCard key={sponsor._id} sponsor={sponsor} level="gold" />
          ))}
        </div>
      )}

      {/* Silver Sponsors */}
      {sponsorsByLevel.silver && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sponsorsByLevel.silver.map((sponsor) => (
            <SponsorCard key={sponsor._id} sponsor={sponsor} level="silver" />
          ))}
        </div>
      )}

      {/* Bronze Sponsors */}
      {sponsorsByLevel.bronze && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {sponsorsByLevel.bronze.map((sponsor) => (
            <SponsorCard key={sponsor._id} sponsor={sponsor} level="bronze" />
          ))}
        </div>
      )}
    </div>
  );
}
