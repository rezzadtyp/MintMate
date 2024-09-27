"use client";

import MintNFTForm from "@/components/MintNFTForm";
import { useActiveAccount } from "thirdweb/react";

function MintNFTPage() {
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;

  return (
    <div className="container mx-auto">
      {address ? (
        <div className="">
          <MintNFTForm />
        </div>
      ) : (
        <div>Sign in to mint an NFT.</div>
      )}
    </div>
  );
}

export default MintNFTPage;
