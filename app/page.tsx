import HomeComponent from "@/components/home";
import { getHomeImg } from "@/sanity/queries";

export default async function Home() {
  const homeData = await getHomeImg();
  console.log(homeData);
  if (!homeData) {
    throw new Error("Aucun projet Home");
  }

  return <HomeComponent homeData={homeData} />;
}
