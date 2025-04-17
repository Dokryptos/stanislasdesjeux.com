"use client";
import MuxPlayer from "@mux/mux-player-react";
import { SanityVideo } from "@/type/film";
interface VideoDisplayProps {
  video: SanityVideo;
  title: string;
}

export default function VideoDisplay({ video, title }: VideoDisplayProps) {
  return (
    <div className="col-start-1 col-span-6 tablet:col-start-2 tablet:col-span-7 laptop:col-start-4 laptop:col-span-6 flex justify-center items-center w-full h-dvh">
      <MuxPlayer
        nohotkeys
        autoPlay={true}
        playbackId={video.asset.playbackId}
        key={title}
        className="z-30 w-full flex justify-center items-center"
      />
    </div>
  );
}
