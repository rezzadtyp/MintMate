import { useState } from "react";
import GalleryResponse from "../types/nft.types";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";

interface getResponse extends GalleryResponse {}

export const useGetNFTs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<getResponse | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const getNFTs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get<getResponse>("/nft");
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
