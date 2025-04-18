"use client";
import MuxPlayer from "@mux/mux-player-react";
import { SanityVideo } from "@/type/film";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import pauseImg from "@/public/image/pause-video.png";
import playImg from "@/public/image/play-video.png";
interface VideoDisplayProps {
  video?: SanityVideo;
  title: string;
}

export default function VideoDisplay({ video, title }: VideoDisplayProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  function triggerShowControls() {
    setShowControls(true);

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1000);
  }

  function togglePlay() {
    const player = playerRef.current;
    if (!player) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    player.paused ? player.play() : player.pause();
    triggerShowControls();
  }
  return (
    <div
      className="col-start-1 col-span-6 tablet:col-start-2 tablet:col-span-7 laptop:col-start-4 laptop:col-span-6 flex justify-center items-center w-full h-dvh relative"
      onTouchStart={triggerShowControls}
      onMouseMove={triggerShowControls}
    >
      <MuxPlayer
        nohotkeys
        ref={playerRef}
        loop
        playbackId={video?.asset?.playbackId}
        key={title}
        disable-tracking
        disableCookies
        className="z-30 w-full flex justify-center items-center"
      />
      {showControls && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={togglePlay}
          className="absolute flex items-center justify-center z-40"
        >
          <Image
            src={isPlaying ? pauseImg.src : playImg.src}
            className="cursor-pointer"
            width={48}
            height={48}
            alt={isPlaying ? "pause" : "play"}
          />
        </motion.div>
      )}
    </div>
  );
}
