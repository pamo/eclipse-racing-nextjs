import { Card } from '@/components/Card';
import { getSiteSettings } from '@/lib/sanity';
import { getColorClasses } from '@/utils/color';

export default async function Home() {
  const siteSettings = await getSiteSettings();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card colorClasses={getColorClasses(1)}>
        <p>{siteSettings.description}</p>
        <p>{siteSettings.content}</p>
        </Card>
    </main>
  );
}
