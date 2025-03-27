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

export const ALL_FILM_QUERY = defineQuery(`*[
  _type == "film"
] | order(orderRank) {_id, title, thumbnail, slug, categorie, gallery}`);

export async function getAllFilm(): Promise<FilmType[]> {
  const { data } = await sanityFetch({ query: ALL_FILM_QUERY });
  if (!data) {
    notFound();
  }
  return data;
}

export const ALL_ART_QUERY = defineQuery(`*[
  _type == "art"
] | order(orderRank) {_id, title, thumbnail, slug, gallery, description}`);

export async function getAllArt(): Promise<ArtType> {
  const { data } = await sanityFetch({ query: ALL_ART_QUERY });
  if (!data) {
    notFound();
  }
  return data;
}
