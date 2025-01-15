import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';
interface ApplicationInfo {
  title: string;
  content: PortableTextBlock[];
  steps: string[];
  applicationFormLink: string;
}
async function getApplicationInfo(): Promise<ApplicationInfo | null> {
  return client.fetch(`
    *[_type == "applicationInfo"][0] {
      title,
      content,
      steps,
      applicationFormLink
    }
  `);
}

export default async function JoinPage() {
  const applicationInfo = await getApplicationInfo();

  if (!applicationInfo) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{applicationInfo.title}</h1>
      <div className="mb-4">
        <PortableText value={applicationInfo.content} />
      </div>
      <h2 className="text-2xl font-bold mt-6 mb-4">How to Join</h2>
      <ol className="list-decimal list-inside mb-4">
        {applicationInfo.steps.map((step: string, index: number) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <p className="mb-4">Ready to take the next step? Fill out our application form:</p>
      <a href={applicationInfo.applicationFormLink} className="btn btn-primary">
        Application Form
      </a>
    </div>
  );
}
