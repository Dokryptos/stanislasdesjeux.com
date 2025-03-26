interface VideoDisplayProps {
  videoUrl: string;
  title: string;
}

export default function VideoDisplay({ videoUrl, title }: VideoDisplayProps) {
  return (
    <div className="col-start-1 col-span-6 tablet:col-start-2 tablet:col-span-7 laptop:col-start-4 laptop:col-span-6 flex items-center w-full h-dvh pb-[60px] pt-[60px]">
      <iframe
        src={videoUrl}
        title={title}
        className="w-full h-full"
        allowFullScreen
      ></iframe>
    </div>
  );
}
