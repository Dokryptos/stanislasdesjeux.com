import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import ProjectSlugComponent from "@/components/slug/slugCaroussel";

const FILM_SLUG_QUERY = defineQuery(`
  {
  "filmCurrentSlug": *[
    _type == "film" &&
    slug.current == $slug
][0]{
  ...,
  gallery[]{
  ...,
  video{ 
  asset ->{
  playbackId,
  
      }
    }
  }
},
  "filmAllProject": *[
  _type == "film"
] | order(orderRank) {_id, title, thumbnail, slug, categorie, gallery}
}
`);

export default async function filmSlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data } = await sanityFetch({
    query: FILM_SLUG_QUERY,
    params: { slug: (await params).slug },
  });
  if (!data) {
    notFound();
  }
  const { filmCurrentSlug, filmAllProject } = data;
  console.log(filmCurrentSlug);
  return (
    <ProjectSlugComponent
      projectCurrent={filmCurrentSlug}
      projectAll={filmAllProject}
      typeList="films"
    />
  );
}
