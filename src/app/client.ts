import { createThirdwebClient, defineChain, getContract } from "thirdweb";

export const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0xA895a9b5882DBa287CF359b6a722C5be46aCb675",
});
