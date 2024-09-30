import axios from "axios";
import { useState } from "react";
import GalleryResponse from "../types/nft.types";
import { toast } from "sonner";

interface getResponse extends GalleryResponse {}

export const useGetNFTs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<getResponse | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const getNFTs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<getResponse>("/api/get-nfts");
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
