import { client } from "@/lib/sanity";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

async function getSponsors() {
  return client.fetch(`
    *[_type == "sponsor"] | order(name asc) {
      _id,
      name,
      website,
      logo,
      description
    }
  `);
}

export default async function SponsorsPage() {
  const sponsors = await getSponsors();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Sponsors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <Image
              src={urlFor(sponsor.logo).width(300).height(200).url()}
              alt={sponsor.name}
              width={300}
              height={200}
              className="w-full h-40 object-contain"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{sponsor.name}</h2>
              <p className="mt-2">{sponsor.description}</p>
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Visit Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
