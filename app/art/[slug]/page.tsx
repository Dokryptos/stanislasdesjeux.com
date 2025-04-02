import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import SlugArt from "@/components/art/slug/artSlugComponent";

const ART_SLUG_QUERY = defineQuery(`*[
    _type == "art" &&
    slug.current == $slug
][0]{
  ...,

}`);

export default async function artSlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data } = await sanityFetch({
    query: ART_SLUG_QUERY,
    params: { slug: (await params).slug },
  });
  if (!data) {
    notFound();
  }
  return <SlugArt artCurrentSlug={data} />;
}
