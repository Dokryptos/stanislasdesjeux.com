import FilmComponent from "@/components/films/filmComponent";
import { getAllFilm } from "@/sanity/queries";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Film() {
  const filmData = await getAllFilm();
  if (!filmData) throw new Error("Aucun projet Film");

  return <FilmComponent filmData={filmData} />;
}
