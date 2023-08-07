import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = ({ number = 3 }: { number?: number }) => {
  const arr = new Array(number).fill(0);
  const cardSkeletons = arr.map((_, index) => {
    return <Skeleton key={index} className="w-full h-96 rounded-md" />;
  });

  return cardSkeletons;
};

export default CardSkeleton;
