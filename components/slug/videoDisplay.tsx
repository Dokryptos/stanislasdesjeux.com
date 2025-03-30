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
      console.log("✅ Initialisation du player !");

      try {
        playerRef.current = new Player(containerRef.current, {
          id: videoUrl,
        });

        playerRef.current.on("play", () => console.log("▶️ Vidéo en lecture"));
        playerRef.current.on("pause", () => console.log("⏸ Vidéo en pause"));
        playerRef.current.on("ended", () => console.log("🏁 Vidéo terminée"));
      } catch (error) {
        console.error("❌ Erreur lors de l'initialisation du player:", error);
      }

      return () => {
        console.log("🗑 Destruction du player");
        playerRef.current?.destroy();
        playerRef.current = null;
      };
    }
  }, [videoUrl]);
  console.log(videoUrl);
  return (
    <div className="col-start-1 col-span-6 tablet:col-start-2 tablet:col-span-7 laptop:col-start-4 laptop:col-span-6 flex justify-center items-center w-full h-dvh">
      <div key={title} ref={containerRef} className="z-30"></div>
    </div>
  );
}
