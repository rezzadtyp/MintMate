"use client";

import { useEffect } from "react";
import { useGetNFTs } from "../hooks/useGetNFTs";
import { NFTCard } from "@/components/NFTCard";
import NFTCardSkeleton from "@/components/NFTCardSkeleton";

const GalleryPage = () => {
  const { data: nfts, isLoading, error, refetch } = useGetNFTs();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="container min-h-screen mx-auto flex flex-col gap-8">
      <h1 className="text-5xl pt-10 font-semibold">Gallery</h1>
      {isLoading ? (
        <div className="grid grid-cols-4 w-full gap-4 justify-center">
          <div className="">
            <NFTCardSkeleton />
          </div>
          <div className="">
            <NFTCardSkeleton />
          </div>
          <div className="">
            <NFTCardSkeleton />
          </div>
          <div className="">
            <NFTCardSkeleton />
          </div>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : nfts && !isLoading ? (
        <div className="grid grid-cols-4 w-full gap-4 justify-center">
          {nfts.result.map((nft, index) => (
            <div className="" key={index}>
              <NFTCard nft={nft} key={nft.token_id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 w-full gap-4 justify-center">
          <div className="">
            <NFTCardSkeleton />
          </div>
          <div className="">
            <NFTCardSkeleton />
          </div>
          <div className="">
            <NFTCardSkeleton />
          </div>
          <div className="">
            <NFTCardSkeleton />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
