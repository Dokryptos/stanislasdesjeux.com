type CarouselNavigationProps = {
  onPrev: () => void;
  onNext: () => void;
};
export default function CarouselNavigation({
  onPrev,
  onNext,
}: CarouselNavigationProps) {
  return (
    <div className="absolute inset-0 flex z-10 pt-[50px]">
      <div
        className="w-1/2 h-full laptop:cursor-carrouselLeft"
        onClick={onPrev} // call function `onPrev`  props
      />

      {/* Zone droite pour nextProject */}
      <div
        className="w-1/2 h-full laptop:cursor-carrouselRight"
        onClick={onNext} // call function `onNext` props
      />
    </div>
  );
}
