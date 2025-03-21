import StillLifeSlugComponent from "@/components/stillLife/slugComponent";
import { getStillLifeSlug } from "@/sanity/queries";
import { notFound } from "next/navigation";

export default async function stillLifeSlug({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getStillLifeSlug({ params });
  if (!data) notFound();

  const { stillLifeCurrentSlug, stillLifeAllProject } = data;
  return (
    <StillLifeSlugComponent
      stillLifeCurrentSlug={stillLifeCurrentSlug}
      stillLifeAllProject={stillLifeAllProject}
    />
  );
}
