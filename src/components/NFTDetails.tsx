import Link from "next/link";
import { shortenAddress } from "thirdweb/utils";
import { Card, CardContent, CardHeader } from "./ui/card";

interface NFTDetailsParams {
  tokenAddress: string;
  tokenId: string;
  contractType: string;
  token_uri: string;
}

const NFTDetails = (nft: NFTDetailsParams) => {
  return (
    <Card>
      <CardHeader>
        <p className="text-xl font-semibold">Details</p>
      </CardHeader>
      <CardContent className="grid grid-cols-2">
        <div className="text-start">
          <p>Contract Address</p>
          <p>Token ID</p>
          <p>Token Standard</p>
          <p>Chain</p>
          <p>Metadata</p>
        </div>
        <div className="text-end">
          <Link
            href={`https://sepolia.etherscan.io/address/${nft.tokenAddress}`}
            target="__blank"
          >
            {shortenAddress(nft.tokenAddress)}
          </Link>
          <p>{nft.tokenId}</p>
          <p>{nft.contractType}</p>
          <p>Sepolia</p>
          <Link href={nft.token_uri} target="__blank">
            IPFS
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default NFTDetails;
