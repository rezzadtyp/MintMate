import { MediaRenderer } from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { client } from "@/app/client";
import NFT from "@/app/types/nft.types";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";

type NFTCardProps = {
  nft: NFT;
};

export const NFTCard = ({ nft }: NFTCardProps) => {
  let image = "";
  let name = "Unnamed NFT";
  const { token_address, token_id } = nft;

  try {
    const parsedMetadata = JSON.parse(nft.metadata);
    image = parsedMetadata.image || "";
    name = parsedMetadata.name || name;
  } catch (error) {
    console.error("Error parsing NFT metadata:", error);
  }

  return (
    <Link href={`/assets/${token_address}/${token_id}`}>
      <Card className="rounded-none">
        <CardContent className="flex flex-col items-center pt-4 gap-2 group">
          <div className="w-full h-auto aspect-square overflow-hidden rounded-none items-center flex justify-center bg-gray-100 transition-all ease-in-out group-hover:scale-[1.02]">
            <MediaRenderer
              client={client}
              src={image}
              height="100%"
              width="100%"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
          <div className="p-1 w-full flex flex-col gap-2">
            <h2 className="font-semibold">{name}</h2>
            <Badge
              variant="outline"
              className="text-sm w-fit font-normal rounded-none"
            >
              {shortenAddress(nft.owner_of)}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
