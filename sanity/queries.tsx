import { defineQuery } from "next-sanity";
import { sanityFetch } from "./lib/live";
import { notFound } from "next/navigation";
import ArtType from "@/type/art";
import FilmType from "@/type/film";
import StillLifeType from "@/type/stillLife";
import HomeImgType from "@/type/home";

export const HOMEIMG_QUERY = defineQuery(`*[
    _type == "homepage"
    && defined(slug.current)
  ] | order(orderRank) {_id, title, thumbnail, slug }`);

// Fonction pour récupérer les projets (Serveur)
export async function getHomeImg(): Promise<HomeImgType[]> {
  const { data } = await sanityFetch({ query: HOMEIMG_QUERY });
  return data;
}
