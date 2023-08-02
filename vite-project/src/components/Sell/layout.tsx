import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function SellLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center p-2 md:p-12 bg-gradient-to-r w-full h-full from-[#9dc4b8] to-[#17494D]"
      )}
    >
      {children}
    </div>
  );
}
