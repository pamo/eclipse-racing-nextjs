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
      <body
        className={`${inter.className} psychedelic-bg min-h-screen flex flex-col`}
      >
        <header className="bg-eclipse-blue-dark text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-eclipse-yellow-light"
            >
              {siteSettings.title}
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link href="/about" className="hover:text-eclipse-pink-light">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-eclipse-pink-light">
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/sponsors"
                  className="hover:text-eclipse-pink-light"
                >
                  Sponsors
                </Link>
              </li>
              <li>
                <Link href="/join" className="hover:text-eclipse-pink-light">
                  Join
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-eclipse-pink-light">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-eclipse-pink-light">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow container mx-auto px-4 py-8 bg-white bg-opacity-90 my-8 rounded-lg shadow-lg">
          {children}
        </main>
        <footer className="bg-eclipse-blue-dark text-white p-4">
          <div className="container mx-auto text-center">
            <p>
              &copy; {new Date().getFullYear()} {siteSettings.title}. All rights
              reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
