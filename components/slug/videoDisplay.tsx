/* eslint-disable @next/next/no-img-element */
"use client";
import MuxPlayer from "@mux/mux-player-react";
import { SanityVideo } from "@/type/film";
import { useRef, useState, useEffect } from "react";
import playIcon from "@/public/image/play-video.png";
import pauseIcon from "@/public/image/pause-video.png";
interface VideoDisplayProps {
  video: SanityVideo;
  title: string;
}

export default function VideoDisplay({ video, title }: VideoDisplayProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    player.addEventListener("play", onPlay);
    player.addEventListener("pause", onPause);

    return () => {
      player.removeEventListener("play", onPlay);
      player.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;
    if (player.paused) player.play();
    else player.pause();
  };
  console.log(video);
  return (
    <div className="col-start-1 col-span-6 tablet:col-start-2 tablet:col-span-7 laptop:col-start-4 laptop:col-span-6 flex justify-center items-center w-full h-dvh ">
      <MuxPlayer
        ref={playerRef}
        nohotkeys
        loop
        playbackId={video.asset?.playbackId}
        key={title}
        disable-tracking
        disableCookies
        className="z-30 w-full file:flex justify-center items-center"
      />
      <div onClick={togglePlay} className="absolute ">
        <img
          src={isPlaying ? pauseIcon.src : playIcon.src}
          alt={isPlaying ? "Pause" : "Play"}
          className="absolute h-16 w-16 opacity-90 z-50"
        />
      </div>
    </div>
  );
}
