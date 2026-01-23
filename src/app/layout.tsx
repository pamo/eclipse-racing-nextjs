import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { getSiteSettings } from '@/lib/sanity';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Page } from '@/types/page';

const inter = Inter({ subsets: ['latin'] });

const pages: Page[] = [
  { title: 'About', slug: 'about' },
  { title: 'Team', slug: 'team' },
  { title: 'Donate', slug: 'donate' },
  { title: 'Sponsors', slug: 'sponsors' },
  { title: 'Join', slug: 'join' },
  { title: 'Events', slug: 'events' },
];

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  return {
    title: siteSettings.title,
    description: siteSettings.description,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en">
      <body className={`${inter.className} psychedelic-bg min-h-screen`}>
        <header className="sticky top-0 z-50 bg-eclipse-blue-dark text-white">
          <Navigation siteTitle={siteSettings.title} logo={siteSettings.logo} pages={pages} />
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="bg-eclipse-blue-dark py-8 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/team"
                      className="transition-colors hover:text-eclipse-yellow-light"
                    >
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/donate"
                      className="transition-colors hover:text-eclipse-yellow-light"
                    >
                      Donate
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsors"
                      className="transition-colors hover:text-eclipse-yellow-light"
                    >
                      Sponsors
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/join"
                      className="transition-colors hover:text-eclipse-yellow-light"
                    >
                      Join Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-8 text-center">
              <p>
                &copy; {new Date().getFullYear()} {siteSettings.title}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
