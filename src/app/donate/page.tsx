import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

async function getDonationInfo() {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{donationInfo.title}</h1>
      <div className="mb-4">
        <PortableText value={donationInfo.content} />
      </div>
      <h2 className="text-2xl font-bold mt-6 mb-4">Donation Options</h2>
      <ul className="list-disc list-inside mb-4">
        {donationInfo.donationOptions.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
      <p className="mb-4">
        For corporate sponsorship opportunities, please contact us directly.
      </p>
      <a href={donationInfo.donationLink} className="btn btn-primary mr-4">
        Make a Donation
      </a>
      <a href="/contact" className="btn btn-secondary">
        Contact for Sponsorship
      </a>
    </div>
  );
}
