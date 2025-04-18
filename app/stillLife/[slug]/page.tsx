import ProjectSlugComponent from "@/components/slug/slugCaroussel";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const STILLLIFE_SLUG_QUERY = defineQuery(`
  {
  "stillLifeCurrentSlug": *[
    _type == "stillLife" &&
    slug.current == $slug
][0]{
  ...,
  gallery[]{
  ...,
  video{ 
  asset ->{
  playbackId,
  data
      }
    }
  }
},
  "stillLifeAllProject": *[
  _type == "stillLife"
] | order(orderRank) {_id, title, thumbnail, slug, categorie, gallery}
}
`);

export default async function stillLifeSlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data } = await sanityFetch({
    query: STILLLIFE_SLUG_QUERY,
    params: { slug: (await params).slug },
  });
  if (!data) {
    notFound();
  }
  const { stillLifeCurrentSlug, stillLifeAllProject } = data;

  return (
    <ProjectSlugComponent
      projectCurrent={stillLifeCurrentSlug}
      projectAll={stillLifeAllProject}
      typeList="stillLife"
    />
  );
}
