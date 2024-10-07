import { axiosInstance } from "@/lib/axios";
import { useState } from "react";
import NFT from "../types/nft.types";
import { notFound } from "next/navigation";

interface getNFTMetadataParams {
  address: string;
  token_id: string;
}

export const useGetNFTMetadata = (params: getNFTMetadataParams) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<NFT | undefined>(undefined);
  const { address, token_id } = params;

  const getNFTMetadata = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/nft/${address}/${token_id}`);

      setData(response.data);
    } catch (error) {
      notFound();
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, refetch: getNFTMetadata };
};
