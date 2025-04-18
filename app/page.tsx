import HomeComponent from "@/components/home";
import { getHomeImg } from "@/sanity/queries";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Home() {
  const homeData = await getHomeImg();
  if (!homeData) {
    throw new Error("Aucun projet Home");
  }

  return <HomeComponent homeData={homeData} />;
}
