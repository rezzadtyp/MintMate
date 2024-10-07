import { useState } from "react";
import GalleryResponse from "../types/nft.types";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";

interface getResponse extends GalleryResponse {}

export const useGetNFTsByWallet = (address: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<getResponse | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const getNFTs = async () => {
    if (!address) {
      setError("Address is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get<getResponse>(`/nft/wallet?address=${address}`);
      setData(response.data);
    } catch (error) {
      setError("Error fetching NFTs");
      toast.error("Error fetching NFTs");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refetch: getNFTs };
};
