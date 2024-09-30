"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Account } from "thirdweb/wallets";
import { useSendTransaction, useSimulateTransaction } from "thirdweb/react";
import { contract } from "../client";
import { prepareContractCall } from "thirdweb";
import { FileWithPath } from "react-dropzone";

interface MintNFTData {
  name: string;
  description: string;
  image?: FileList;
  address: string;
}

interface MintNFTResponse {
  tokenURI: string;
}

export const useMintNFT = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    mutate: sendTx,
    data: transactionResult,
    isError,
    isSuccess,
  } = useSendTransaction();

  const mintNFT = async (payload: MintNFTData) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      Array.from(payload.image!).forEach((file: FileWithPath) => {
        formData.append("image", file);
      });
      formData.append("address", payload.address);

      // Step 1: Call the backend to get the tokenURI
      const { data } = await axios.post<MintNFTResponse>(
        "/api/ipfs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Step 2: Transact the NFT Minting process with mintNFT function
      const transaction = prepareContractCall({
        contract,
        method:
          "function mintNFT(address recipient, string tokenURI) returns (uint256)",
        params: [payload.address, data.tokenURI],
      });

      // Step 3: Send the transaction and wait for the user's confirmation
      sendTx(transaction, {
        onSuccess: () => {
          // Show success toast once the transaction is confirmed
          toast.success("NFT has been minted successfully");
        },
        onError: (error) => {
          // Show error toast if the transaction fails
          toast.error(`Error minting NFT: ${error}`);
        },
      });
    } catch (error) {
      toast.error("Error minting NFT");
    } finally {
      setIsLoading(false);
    }
  };

  return { mintNFT, isLoading };
};
