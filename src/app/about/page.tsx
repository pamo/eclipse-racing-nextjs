import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

async function getAboutPage() {
  return client.fetch(`
    *[_type == "page" && slug.current == "about"][0] {
      title,
      content
    }
  `);
}

export default async function AboutPage() {
  const page = await getAboutPage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
      <PortableText value={page.content} />
    </div>
  );
}
