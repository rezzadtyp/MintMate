import { NextResponse } from "next/server";
import Moralis, { initializeMoralis } from "../lib/moralisClient";

export async function GET() {
  try {
    await initializeMoralis();

    const response = await Moralis.EvmApi.nft.getContractNFTs({
      chain: "0xaa36a7",
      format: "decimal",
      address: "0xA895a9b5882DBa287CF359b6a722C5be46aCb675",
    });

    return NextResponse.json(response.raw);
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return NextResponse.json(
      { error: "Failed to fetch NFTs" },
      { status: 500 }
    );
  }
}
