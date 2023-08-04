import { Skeleton } from "../../ui/skeleton";

const SkeletonLoading = () => {
  return (
    <div className="max-h-[400px] h-max grid grid-cols-1 sm:grid-cols-3 mt-4 gap-2 sm:gap-8 ">
      <div className="col-span-2 w-full h-24 sm:h-[400px] row-auto overflow-auto rounded-lg border bg-gray-100">
        <Skeleton className="w-full h-[400px]" />
      </div>
      <div className="col-span-1 h-full bg-gray-100 rounded-lg border">
        <Skeleton className="h-60 sm:h-full w-full" />
      </div>
    </div>
  );
};

export default SkeletonLoading;
