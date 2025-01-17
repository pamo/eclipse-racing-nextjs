import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
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
        <header className="bg-eclipse-blue-dark text-white sticky top-0 z-50">
          <Navigation siteTitle={siteSettings.title} />
        </header>

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        <footer className="bg-eclipse-blue-dark text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/team"
                      className="hover:text-eclipse-yellow-light transition-colors"
                    >
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsors"
                      className="hover:text-eclipse-yellow-light transition-colors"
                    >
                      Sponsors
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/join"
                      className="hover:text-eclipse-yellow-light transition-colors"
                    >
                      Join Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="hover:text-eclipse-yellow-light transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="hover:text-eclipse-yellow-light transition-colors"
                  >
                    Strava
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p>
                &copy; {new Date().getFullYear()} {siteSettings.title}. All
                rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
