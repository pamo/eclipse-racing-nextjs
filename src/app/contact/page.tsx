import { Card } from '@/components/Card';
import { client } from '@/lib/sanity';
import { ContactInfo, SocialMedia } from '@/types/contact';
import { getColorClasses } from '@/utils/color';
import { notFound } from 'next/navigation';
import ContactForm from './components/ContactForm';

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
    <div className="container prose mx-auto px-4 py-8">
      <Card colorClasses={getColorClasses(3)}>
        <h1 className="mb-6 text-3xl font-bold">Contact Us</h1>
        <p>Have questions or want to get in touch? We&apos;d love to hear from you!</p>
        <ContactForm />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 mt-6 text-2xl font-bold">Follow Us</h2>
            <div className="flex space-x-4">
              {contactInfo.socialMedia.map((social: SocialMedia, index: number) => (
                <a key={index} href={social.url} className="text-blue-500 hover:text-blue-700">
                  {social.platform}
                </a>
              ))}
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
