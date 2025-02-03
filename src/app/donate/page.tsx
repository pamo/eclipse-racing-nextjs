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
    <div className="container p-4">
      <Card>
        <h1 className="text-3xl font-bold mb-6">{donationInfo.title}</h1>
        <div className="mb-4 prose">
          <PortableText value={donationInfo.content} />
        </div>
        <a href={donationInfo.donationLink} className="btn outline outline-3 outline-offset-2 outline-solid outline-eclipse-blue hover:outline-eclipse-blue-dark bg-eclipse-blue hover:bg-eclipse-blue-dark text-white mr-4">
          Make a Donation
        </a>
        <a href="/contact" className="btn outline outline-3 outline-offset-2 outline-solid outline-eclipse-green hover:outline-eclipse-green-dark bg-eclipse-green hover:bg-eclipse-green-dark mr-4">
          Contact for Sponsorship
        </a>
      </Card>
    </div>
  );
}
