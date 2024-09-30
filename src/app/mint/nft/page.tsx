"use client";

import MintNFTForm from "@/components/MintNFTForm";
import { useActiveAccount } from "thirdweb/react";

function MintNFTPage() {
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;

  return (
    <div className="p-4 pt-20 min-h-[60vh] flex items-center justify-center container max-w-screen-xl mx-auto">
      {address ? (
        <div className="flex w-full mb-20">
          <MintNFTForm />
        </div>
      ) : (
        <div className="flex justify-center mb-20">Sign in to mint an NFT.</div>
      )}
    </div>
  );
}

export default MintNFTPage;
