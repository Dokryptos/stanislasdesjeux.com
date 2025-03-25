"use client";
import StillLifeType from "@/type/stillLife";
import Link from "next/link";
import { useState, useEffect } from "react";
import ThumbnailGrid from "../ui/grid/thumbnailGrid";
import ProjectList from "../ui/list/projectList";

interface StillLifeDataProps {
  stillLifeData: StillLifeType[];
}

export default function StillLifeComponent({
  stillLifeData,
}: StillLifeDataProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isMobileTablet, setIsMobileTablet] = useState(false);
  const [lastHoveredProject, setLastHoveredProject] = useState<number | null>(
    null
  );
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileTablet(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (hoveredProject !== null) {
      setLastHoveredProject(hoveredProject);
      setIsExiting(false);
    } else if (lastHoveredProject !== null) {
      setIsExiting(true);
      setTimeout(() => {
        setLastHoveredProject(null);
        setIsExiting(false);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredProject]);

  return (
    <div className="relative">
      <div className="absolute flex flex-col justify-center items-center h-dvh w-full z-20 ">
        {stillLifeData.map((data: StillLifeType, i: number) => {
          return (
            <div key={data._id}>
              <Link href={`/stillLife/${data.slug.current}`}>
                <ProjectList
                  key={data._id}
                  data={data}
                  index={i}
                  hoveredProject={hoveredProject}
                  setHoveredProject={setHoveredProject}
                  isMobileTablet={isMobileTablet}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <div className="hidden laptop:block fixed top-0 left-0 right-0 bottom-0 z-0">
        {hoveredProject !== null && (
          <ThumbnailGrid
            thumbnails={stillLifeData[hoveredProject]?.thumbnail}
            projectId={stillLifeData[hoveredProject]?._id}
            isExiting={isExiting}
          />
        )}
      </div>
    </div>
  );
}
