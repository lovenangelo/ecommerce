import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function SellLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center bg-gradient-to-r from-[#9dc4b8] to-[#17494D]"
      )}
    >
      {children}
    </div>
  );
}
