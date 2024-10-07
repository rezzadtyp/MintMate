"use client";

import { useState, useEffect } from "react";
import { useGetNFTsByWallet } from "../hooks/useGetNFTsByWallet";
import { shortenAddress } from "thirdweb/utils";
import NFTCardSkeleton from "@/components/NFTCardSkeleton";
import { NFTCard } from "@/components/NFTCard";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import eth_logo from "../../../public/images/ethereum-seeklogo.svg";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const AccountPage = () => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const storedAddress = localStorage.getItem("address");
    if (storedAddress) {
      setAddress(storedAddress);
    }
  }, []);

  const {
    data: nfts,
    isLoading,
    error,
    refetch,
  } = useGetNFTsByWallet(address || "");

  useEffect(() => {
    if (address) {
      refetch();
    }
  }, [address]);

  if (!address) {
    return <div className="container min-h-screen mx-auto">Loading...</div>;
  }

  const copyToClipboard = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
        alert("Address copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  return (
    <div className="w-screen">
      <div className="w-screen h-[240px] bg-black/15"></div>
      <div className="container min-h-screen -mt-[100px] mx-auto flex flex-col gap-8">
        <div className="flex flex-col">
          <div className="w-[140px] h-[140px] bg-gradient-to-tr from-indigo-200 to-indigo-800 rounded-full border-white border-4"></div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="link"
                  onClick={copyToClipboard}
                  className="w-fit p-0 text-lg flex gap-2"
                >
                  <div className="relative">
                    <Image
                      src={eth_logo}
                      alt="Sepolia"
                      width={12}
                      height={12}
                      objectFit="contain"
                    />
                  </div>
                  {shortenAddress(address)}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy address</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div>
          <Button variant="ghost">Collected {nfts?.result.length}</Button>
          <Separator />
        </div>
        {isLoading ? (
          <div className="grid grid-cols-4 w-full gap-4 justify-center">
            {[...Array(5)].map((_, idx) => (
              <div key={idx}>
                <NFTCardSkeleton />
              </div>
            ))}
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : nfts ? (
          <div className="grid grid-cols-5 w-full gap-4 justify-center">
            {nfts.result.map((nft, index) => (
              <div key={index}>
                <NFTCard nft={nft} key={nft.token_id} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 w-full gap-4 justify-center">
            {[...Array(4)].map((_, idx) => (
              <div key={idx}>
                <NFTCardSkeleton />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
