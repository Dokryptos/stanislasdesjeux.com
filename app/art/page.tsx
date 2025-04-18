import ArtComponent from "@/components/art/artComponent";
import { getAllArt } from "@/sanity/queries";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Art() {
  const artData = await getAllArt();
  if (!artData) throw new Error("Aucun projet Art");
  return <ArtComponent artData={artData} />;
}
