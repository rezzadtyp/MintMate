"use client";

import { client } from "@/app/client";
import { useGetNFTMetadata } from "@/app/hooks/useGetNFTMetadata";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { MediaRenderer } from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import NFTDetails from "../../../../components/NFTDetails";

const NFTPage = () => {
  const pathname = usePathname();
  const splitpath = pathname.split("/");
  const address = splitpath[2];
  const tokenId = splitpath[3];

  const {
    data: nft,
    isLoading,
    refetch,
  } = useGetNFTMetadata({
    address: address,
    token_id: tokenId.toString(),
  });

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <div>Loading NFT...</div>;
  }

  if (!nft) {
    return null;
  }

  const NFTMetadata = nft.normalized_metadata;

  return (
    <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-8">
      <div className="md:col-span-2 p-8 w-screen md:w-full">
        <div className="rounded-xl aspect-square overflow-hidden relative flex items-center justify-center">
          <MediaRenderer
            client={client}
            src={NFTMetadata.image}
            alt={NFTMetadata.name}
            height="100%"
            width="100%"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
      </div>
      <div className="w-full col-span-3 px-4 md:px-0 space-y-6">
        <div className="space-y-2">
          <p className="font-medium">{nft.name}</p>
          <p className="text-lg font-semibold">{NFTMetadata.name}</p>
          <p>{NFTMetadata.description}</p>
          <p>Owner: {shortenAddress(nft.owner_of)}</p>
        </div>
        <NFTDetails
          contractType={nft.contract_type}
          tokenAddress={nft.token_address}
          tokenId={nft.token_id}
          token_uri={nft.token_uri}
          key={nft.token_id}
        />
      </div>
    </div>
  );
};

export default NFTPage;
