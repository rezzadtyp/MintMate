"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSendTransaction, useWaitForReceipt } from "thirdweb/react";
import { contract } from "../client";
import { prepareContractCall } from "thirdweb";
import { FileWithPath } from "react-dropzone";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";

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
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [nftData, setNftData] = useState<MintNFTData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  const { mutate: sendTx, isError } = useSendTransaction();

  const mintNFT = async (payload: MintNFTData) => {
    setIsLoading(true);
    setNftData(payload);
    setIsDialogOpen(true);

    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      Array.from(payload.image!).forEach((file: FileWithPath) => {
        formData.append("image", file);
      });
      formData.append("address", payload.address);

      const { data } = await axiosInstance.post<MintNFTResponse>(
        "/nft",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const transaction = prepareContractCall({
        contract,
        method:
          "function mintNFT(address recipient, string tokenURI) returns (uint256)",
        params: [payload.address, data.tokenURI],
      });

      sendTx(transaction, {
        onSuccess: (tx) => {
          setTransactionHash(tx.transactionHash);
          toast.info("Transaction sent! Waiting for confirmation...");
        },
        onError: (error) => {
          toast.error(`Error minting NFT: ${error.message}`);
          setIsLoading(false);
        },
      });
    } catch (error) {
      toast.error("Error minting NFT");
      setIsDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const { data: receipt, isLoading: isWaitingForReceipt } = useWaitForReceipt(
    transactionHash
      ? {
          transactionHash: transactionHash as `0x${string}`,
          client: contract.client,
          chain: contract.chain,
        }
      : undefined
  );

  useEffect(() => {
    if (transactionHash) {
      if (receipt) {
        toast.success(
          "NFT has been minted successfully! Please wait until it gets approved."
        );
        router.push(`/account`);
      }
      if (isError) {
        toast.error("Transaction denied");
        setTransactionHash(null);
      }
    }
  }, [transactionHash, receipt, isError, router]);

  return { mintNFT, isLoading, isDialogOpen, setIsDialogOpen, nftData };
};
