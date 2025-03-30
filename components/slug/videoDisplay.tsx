import Player from "@vimeo/player";
import { useEffect, useRef } from "react";

interface VideoDisplayProps {
  videoUrl: number;
  title: string;
}

export default function VideoDisplay({ videoUrl, title }: VideoDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (containerRef.current && !playerRef.current) {
      try {
        playerRef.current = new Player(containerRef.current, {
          id: videoUrl,
          autoplay: true,
          dnt: true,
          portrait: false,
          title: false,
          width: 700,
        });

        playerRef.current.on("play", () => console.log("▶️ Vidéo en lecture"));
        playerRef.current.on("pause", () => console.log("⏸ Vidéo en pause"));
        playerRef.current.on("ended", () => console.log("🏁 Vidéo terminée"));
      } catch (error) {
        console.error("❌ Erreur lors de l'initialisation du player:", error);
      }

      return () => {
        playerRef.current?.destroy();
        playerRef.current = null;
      };
    }
  }, [videoUrl]);
  return (
    <div className="col-start-1 col-span-6 tablet:col-start-2 tablet:col-span-7 laptop:col-start-4 laptop:col-span-6 flex justify-center items-center w-full h-dvh">
      <div
        key={title}
        ref={containerRef}
        className="z-30 w-full h-full flex justify-center items-center"
      ></div>
    </div>
  );
}
