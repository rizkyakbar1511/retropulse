import { cn } from "@/lib/utils";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-spin inline-block size-12 border-[3px] border-current border-t-transparent text-[#FFBA08] rounded-full",
        className
      )}
    />
  );
}
