import StillLifeType from "@/type/stillLife";
import Link from "next/link";

interface StillLifeDataProps {
  stillLifeData: StillLifeType[];
}

export default function StillLifeComponent({
  stillLifeData,
}: StillLifeDataProps) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-dvh">
        {stillLifeData.map((data: StillLifeType) => (
          <div key={data._id} className="flex items-center">
            <div className="hidden text-[7px] laptop:pr-1 desktop:pr-2">
              {data?.categorie}
            </div>
            <Link href={`/stillLife/${data.slug.current}`}>
              <p className="text-[18px] desktop:text-[25px] laptop:text-[#CECECE]">
                {data.title}
              </p>
            </Link>
            <div className="text-[7px] pl-1 desktop:p-2">
              {data.gallery.length < 10 ? (
                <>0 {data.gallery.length}</>
              ) : (
                <>{data.gallery.length}</>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
