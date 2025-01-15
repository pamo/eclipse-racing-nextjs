import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { client } from "@/lib/sanity";

const inter = Inter({ subsets: ["latin"] });

async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      title,
      description
    }
  `);
}

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  return {
    title: siteSettings.title,
    description: siteSettings.description,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              {siteSettings?.title}
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/team">Team</Link>
              </li>
              <li>
                <Link href="/sponsors">Sponsors</Link>
              </li>
              <li>
                <Link href="/join">Join</Link>
              </li>
              <li>
                <Link href="/donate">Donate</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>
              &copy; {new Date().getFullYear()} {siteSettings?.title}. All
              rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
