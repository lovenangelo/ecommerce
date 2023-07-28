import { Skeleton } from "../../ui/skeleton";

const SkeletonLoading = () => {
  return (
    <div className="max-h-[400px] h-max grid grid-cols-3 mt-4 gap-8 ">
      <div className="col-span-2 w-full min-h-[400px] h-max row-auto overflow-auto rounded-lg border bg-gray-100">
        <Skeleton className="w-full h-[400px]" />
      </div>
      <div className="col-span-1 h-full bg-gray-100 rounded-lg border">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
};

export default SkeletonLoading;
