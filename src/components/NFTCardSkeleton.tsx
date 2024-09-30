import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const NFTCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex flex-col pt-4 gap-2">
        <Skeleton className="w-full h-auto aspect-square overflow-hidden rounded-md items-center flex" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-32 h-4" />
      </CardContent>
    </Card>
  );
};

export default NFTCardSkeleton;
