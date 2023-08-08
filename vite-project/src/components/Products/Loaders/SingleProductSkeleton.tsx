import { Skeleton } from "@/components/ui/skeleton";

const SingleProductSkeleton = () => {
  return (
    <div className="container mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 rows-auto w-full h-full">
        <Skeleton className="h-48 sm:h-full w-full p-8 rounded-md" />
        <div className="p-5 space-y-8 h-max">
          <Skeleton className="space-y-2 h-[56px] w-full"></Skeleton>
          <div className="grid grid-cols-2 h-max row-auto gap-4">
            <Skeleton className="space-y-4 h-[88px] w-full"></Skeleton>{" "}
            <Skeleton className="space-y-4 h-[88px] w-full"></Skeleton>{" "}
          </div>
          <Skeleton className="h-[1px] w-full" />
          <Skeleton className="h-[88px] w-full" />
          <Skeleton className="flex space-x-2 h-[28px] w-full" />
          <Skeleton className="flex space-x-2 h-[28px] w-full" />
          <Skeleton className="h-[1px] w-full" />
          <Skeleton className="w-full my-8 h-[306px]" />
        </div>
      </div>
    </div>
  );
};

export default SingleProductSkeleton;
