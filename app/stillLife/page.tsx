import StillLifeComponent from "@/components/stillLife";
import { getAllStillLife } from "@/sanity/queries";

export default async function StillLife() {
  const stillLifeData = await getAllStillLife();
  if (!stillLifeData) {
    throw new Error("Aucun projet Home");
  }

  return <StillLifeComponent stillLifeData={stillLifeData} />;
}
