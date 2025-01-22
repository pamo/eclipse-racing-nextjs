import { Card } from "@/components/Card";
import { client } from "@/lib/sanity";
import { ContactInfo, SocialMedia } from "@/types/contact";
import { getColorClasses } from "@/utils/color";
import { notFound } from "next/navigation";

async function getContactInfo(): Promise<ContactInfo | null> {
  return client.fetch(`
    *[_type == "contactInfo"][0] {
      email,
      phone,
      address,
      socialMedia
    }
  `);
}

export default async function ContactPage() {
  const contactInfo = await getContactInfo();
  if (!contactInfo) notFound();
  return (
    <div className="container mx-auto px-4 py-8">
      <Card colorClasses={getColorClasses(3)}>
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="mb-4">
          Have questions or want to get in touch? We&apos;d love to hear from
          you!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mt-6 mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              {contactInfo.socialMedia.map(
                (social: SocialMedia, index: number) => (
                  <a
                    key={index}
                    href={social.url}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {social.platform}
                  </a>
                ),
              )}
            </div>
          </div>
          {/* <div>
            <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
            <form></form>
          </div> */}
        </div>
      </Card>
    </div>
  );
}
