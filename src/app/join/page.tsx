import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';
import { Card } from '@/components/Card';
import { PushLink } from '@/components/PushButton';
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
        <PushLink
          href={applicationInfo.applicationFormLink}
          className="bg-eclipse-pink hover:bg-eclipse-pink-dark"
        >
          Application Form
        </PushLink>
      </Card>
    </div>
  );
}
