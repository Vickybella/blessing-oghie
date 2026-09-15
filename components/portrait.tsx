import { UserRound } from "lucide-react";
import { AssetImage } from "./asset-image";

export function Portrait({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return <AssetImage src={src} alt={alt} icon={UserRound} className={className} priority={priority} />;
}
