import StillLifeComponent from "@/components/stillLife";
import { getAllStillLife } from "@/sanity/queries";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function StillLife() {
  const stillLifeData = await getAllStillLife();
  if (!stillLifeData) {
    throw new Error("Aucun projet Still Life");
  }

  return <StillLifeComponent stillLifeData={stillLifeData} />;
}
