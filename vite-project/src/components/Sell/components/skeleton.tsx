import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoading = () => {
  return (
    <div className="w-full h-full space-y-4 grid grid-cols-3 gap-8 auto-rows p-[32px] overflow-hidden">
      <div className="space-y-4 col-span-3">
        <Skeleton className="h-[32px] w-24" />
        <hr />
      </div>
      <div className="space-y-4 flex flex-col">
        <Skeleton className="h-[295px]" />
        <Skeleton className="h-[68px]" />
        <Skeleton className="h-[224px]" />
      </div>
      <div className="space-y-4 flex flex-col">
        <Skeleton className="h-[68px]" />
        <Skeleton className="h-[68px]" />
        <Skeleton className="h-[68px]" />
        <Skeleton className="h-[224px]" />
      </div>
      <div className="space-y-4 flex flex-col">
        <Skeleton className="h-[92px]" />
        <Skeleton className="h-[68px]" />
        <Skeleton className="h-[224px]" />
      </div>
    </div>
  );
};

export default SkeletonLoading;
