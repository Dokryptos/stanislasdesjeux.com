import StillLifeSlugComponent from "@/components/stillLife/slugComponent";
import { getStillLifeSlug } from "@/sanity/queries";
import { notFound } from "next/navigation";

export default async function stillLifeSlug({
  params,
}: {
  params: { slug: string };
}) {
  if (!params.slug) {
    notFound();
  }
  const data = await getStillLifeSlug({ params });
  if (!data) notFound();

  console.log(data);
  const { stillLifeCurrentSlug, stillLifeProjectArray } = data;
  return (
    <StillLifeSlugComponent
      stillLifeCurrentSlug={stillLifeCurrentSlug}
      stillLifeProjectArray={stillLifeProjectArray}
    />
  );
}
