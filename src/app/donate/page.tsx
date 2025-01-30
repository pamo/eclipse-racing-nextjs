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
    <Card>
      <h1 className="text-3xl font-bold mb-6">{donationInfo.title}</h1>
      <div className="mb-4">
        <PortableText value={donationInfo.content} />
      </div>
      <a href={donationInfo.donationLink} className="btn btn-primary mr-4">
        Make a Donation
      </a>
      <a href="/contact" className="btn btn-secondary">
        Contact for Sponsorship
      </a>
    </Card>
  );
}
