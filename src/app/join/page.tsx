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
    <div className="container p-4">
      <Card>
        <h1 className="text-3xl font-bold mb-6">{applicationInfo.title}</h1>
        <div className="mb-4">
          <PortableText value={applicationInfo.content} />
        </div>
        <h2 className="text-2xl font-bold mt-6 mb-4">Steps to Apply</h2>
        <ol className="list-decimal list-inside mb-4">
          {applicationInfo.steps.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <a href={applicationInfo.applicationFormLink} className="btn outline outline-3 outline-offset-2 outline-solid outline-eclipse-pink hover:outline-eclipse-pink-dark bg-eclipse-pink hover:bg-eclipse-pink-dark text-white mr-4">
          Application Form
        </a>
      </Card>
    </div>
  );
}
