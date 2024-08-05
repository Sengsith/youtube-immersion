import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ThumbnailSkeleton = ({ cards }: { cards: number }) => {
  return Array(cards)
    .fill(0)
    .map(() => (
      <div className="flex flex-col gap-4 mb-8">
        <div className="relative pb-[56.25%] w-full">
          <Skeleton className="absolute w-full h-full" />
        </div>
        <div className="flex flex-col gap-1 px-4">
          <Skeleton height={20} />
          <Skeleton height={15} count={3} />
        </div>
      </div>
    ));
};

export default ThumbnailSkeleton;
