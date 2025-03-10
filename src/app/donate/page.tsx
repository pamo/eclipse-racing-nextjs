import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';
import { Card } from '@/components/Card';
import { PushLink } from '@/components/PushButton';
import { getColorClasses } from '@/utils/color';

interface DonationInfo {
  title: string;
  content: PortableTextBlock[];
  donationOptions: string[];
  donationLink: string;
}

async function getDonationInfo(): Promise<DonationInfo | null> {
  return client.fetch(`
    *[_type == "donationInfo"][0] {
      title,
      content,
      donationOptions,
      donationLink
    }
  `);
}

export default async function DonatePage() {
  const donationInfo = await getDonationInfo();

  if (!donationInfo) notFound();

  return (
    <div className="container prose mx-auto p-4">
      <Card colorClasses={getColorClasses(2)}>
        <h1 className="mb-6 text-3xl font-bold">{donationInfo.title}</h1>

        <PortableText value={donationInfo.content} />

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4">
          <PushLink
            href={donationInfo.donationLink}
            className="bg-eclipse-blue text-white hover:bg-eclipse-blue-dark sm:mb-0 sm:inline-block"
          >
            Make a Donation
          </PushLink>
          <PushLink
            href="/contact"
            className="bg-eclipse-green hover:bg-eclipse-green-dark sm:mb-0 sm:inline-block"
          >
            Contact for Sponsorship
          </PushLink>
        </div>
      </Card>
    </div>
  );
}
