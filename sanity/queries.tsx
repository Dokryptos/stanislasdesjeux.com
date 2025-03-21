import { defineQuery } from "next-sanity";
import { sanityFetch } from "./lib/live";
import { notFound } from "next/navigation";
import ArtType from "@/type/art";
import FilmType from "@/type/film";
import StillLifeType from "@/type/stillLife";
import HomeImgType from "@/type/home";

export const HOMEIMG_QUERY = defineQuery(`*[
    _type == "homepage"
  ] | order(orderRank) {_id, title, thumbnail, slug}`);

// Fonction pour récupérer les projets (Serveur)
export async function getHomeImg(): Promise<HomeImgType[]> {
  const { data } = await sanityFetch({ query: HOMEIMG_QUERY });
  if (!data) {
    notFound();
  }
  return data;
}

export const STILLLIFE_QUERY = defineQuery(`*[
  _type == "stillLife"
] | order(orderRank) {_id, title, thumbnail, slug, categorie, gallery}`);

export async function getAllStillLife(): Promise<StillLifeType[]> {
  const { data } = await sanityFetch({ query: STILLLIFE_QUERY });
  if (!data) {
    notFound();
  }
  return data;
}

// export const STILLLIFE_SLUG_QUERY = defineQuery(`
//   {
//   "stillLifeCurrentSlug": *[
//     _type == "stillLife" &&
//     slug.current == $slug
// ][0]{
//   ...,
// },
//   "stillLifeAllProject": *[
//   _type == "stillLife"
// ] | order(orderRank) {_id, title, thumbnail, slug, categorie, gallery}
// }
// `);
// export async function getStillLifeSlug({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<{
//   stillLifeCurrentSlug: StillLifeType;
//   stillLifeAllProject: StillLifeType[];
// }> {
//   const { data } = await sanityFetch({
//     query: STILLLIFE_SLUG_QUERY,
//     params: { slug: params.slug },
//   });
//   if (!data) {
//     notFound();
//   }
//   return data;
// }
