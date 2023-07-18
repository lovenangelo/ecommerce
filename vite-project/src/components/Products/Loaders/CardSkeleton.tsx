import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  const arr = new Array(3).fill(0);
  const cardSkeletons = arr.map((item) => {
    return <Skeleton className="w-full h-96 rounded-md" />;
  });

  return cardSkeletons;
};

export default CardSkeleton;
