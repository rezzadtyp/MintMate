import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const NFTCardSkeleton = () => {
  return (
    <Card className="rounded-none">
      <CardContent className="flex flex-col pt-4 gap-2">
        <Skeleton className="w-full h-auto aspect-square overflow-hidden rounded-none items-center flex" />
        <Skeleton className="w-full h-4 rounded-none" />
        <Skeleton className="w-32 h-4 rounded-none" />
      </CardContent>
    </Card>
  );
};

export default NFTCardSkeleton;
