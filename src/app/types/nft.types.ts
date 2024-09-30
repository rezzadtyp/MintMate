export default interface NFT {
  token_address: string;
  token_id: string;
  amount: string;
  token_hash: string;
  block_number: string;
  block_number_minted: string | null;
  contract_type: string;
  name: string;
  symbol: string;
  token_uri: string;
  metadata: string;
  last_token_uri_sync: string;
  last_metadata_sync: string;
  minter_address: string | null;
  owner_of: string;
  rarity_rank: number | null;
  rarity_percentage: number | null;
  rarity_label: string | null;
  possible_spam: boolean;
  verified_collection: boolean;
  floor_price: number | null;
  floor_price_usd: number | null;
  floor_price_currency: string | null;
}

// Define the type for the overall response structure
export default interface GalleryResponse {
  cursor: string | null;
  page: number;
  page_size: number;
  result: NFT[];
}
