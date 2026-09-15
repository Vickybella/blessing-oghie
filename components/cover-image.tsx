import { AssetImage } from "./asset-image";
import { cn } from "@/lib/utils";

export function CoverImage({
  src,
  alt,
  className,
  fit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        fit === "contain" && "flex items-center justify-center bg-[#0a0a0d]",
        className,
      )}
    >
      <AssetImage src={src} alt={alt} fit={fit} className="h-full w-full" />
    </div>
  );
}
