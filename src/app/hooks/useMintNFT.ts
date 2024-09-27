"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Account } from "thirdweb/wallets";

interface MintNFTData {
  name: string;
  description: string;
  image: File[];
  external_url?: string;
  address: string;
  account: Account;
}

interface MintNFTResponse {
  tokenURI: string;
}

export const useMintNFT = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mintNFT = async (payload: MintNFTData) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      payload.image.forEach((file: File) => {
        formData.append("image", file);
      });
      formData.append("address", payload.address);

      const account = payload.account;

      // Step 1: Call the backend to get the tokenURI
      const { data } = await axios.post<MintNFTResponse>(
        "/api/mint",
        {
          ...formData,
          account,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data) {
        toast.success("NFT has been successfully minted");
      } else {
        toast.error("Failed to mint NFT");
      }
    } catch (error) {
      toast.error("Error minting NFT");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mintNFT, isLoading };
};
