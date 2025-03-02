import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';
import { Card } from '@/components/Card';
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
    <div className="container prose mx-auto p-4">
      <Card>
        <h1>{applicationInfo.title}</h1>
        <PortableText value={applicationInfo.content} />
        <h2>Steps to Apply</h2>
        <ol className="list-inside list-decimal">
          {applicationInfo.steps.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <a
          href={applicationInfo.applicationFormLink}
          className="btn outline-3 outline-solid mr-4 bg-eclipse-pink text-white outline outline-offset-2 outline-eclipse-pink hover:bg-eclipse-pink-dark hover:outline-eclipse-pink-dark"
        >
          Application Form
        </a>
      </Card>
    </div>
  );
}
