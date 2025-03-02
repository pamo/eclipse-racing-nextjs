import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';
import { Card } from '@/components/Card';

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
      <Card>
        <h1 className="mb-6 text-3xl font-bold">{donationInfo.title}</h1>

        <PortableText value={donationInfo.content} />

        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <a
            href={donationInfo.donationLink}
            className="btn outline-3 outline-solid mb-4 block bg-eclipse-blue text-white outline outline-offset-2 outline-eclipse-blue hover:bg-eclipse-blue-dark hover:outline-eclipse-blue-dark sm:mb-0 sm:inline-block"
          >
            Make a Donation
          </a>
          <a
            href="/contact"
            className="btn outline-3 outline-solid block bg-eclipse-green outline outline-offset-2 outline-eclipse-green hover:bg-eclipse-green-dark hover:outline-eclipse-green-dark sm:inline-block"
          >
            Contact for Sponsorship
          </a>
        </div>
      </Card>
    </div>
  );
}
