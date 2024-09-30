import Moralis from "moralis";

let isInitialized = false;

export const initializeMoralis = async () => {
  if (!isInitialized) {
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY!.toString(),
    });
    isInitialized = true;
  }
};

export default Moralis;
