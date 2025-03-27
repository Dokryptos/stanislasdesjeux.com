import ArtComponent from "@/components/art/artComponent";
import { getAllArt } from "@/sanity/queries";

export default async function Film() {
  const artData = await getAllArt();
  if (!artData) throw new Error("Aucun projet Art");

  return <ArtComponent artData={artData} />;
}
