import FilmComponent from "@/components/films/filmComponent";
import { getAllFilm } from "@/sanity/queries";

export default async function Film() {
  const filmData = await getAllFilm();
  if (!filmData) throw new Error("Aucun projet Film");

  return <FilmComponent filmData={filmData} />;
}
