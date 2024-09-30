import { NextResponse } from "next/server";
import * as dotenv from "dotenv";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { client } from "@/app/client";
import { put } from "@vercel/blob";

dotenv.config();

const storage = new ThirdwebStorage({
  clientId: client.clientId,
  secretKey: client.secretKey,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const address = formData.get("address");
    const imageFile = formData.get("image") as unknown as File;

    if (!name || !description || !imageFile || !address) {
      return NextResponse.json({
        message: "Insufficient payload data",
      });
    }

    if (!(imageFile instanceof File)) {
      return NextResponse.json(
        { error: "Uploaded image is not a valid file" },
        { status: 400 }
      );
    }

    // Step 1: Convert image file to blob
    const { url: blob_url } = await put(imageFile.name, imageFile, {
      access: "public",
      token: process.env.mintmatetoken_READ_WRITE_TOKEN,
    });

    // Step 2: Upload image to IPFS
    const uri = await storage.upload(blob_url).catch((err) => {
      console.error("Error uploading to IPFS:", err); // Log any IPFS upload errors
      throw new Error("IPFS upload failed");
    });

    const NFTsMetadata = {
      name: name.toString(),
      description: description.toString(),
      image: uri,
    };

    // Step 3: Upload NFTs Metadata then get the tokenURI
    const tokenURI = await storage.upload(NFTsMetadata);

    return NextResponse.json({
      message: "Image Uploaded to IPFS!",
      tokenURI,
    });
  } catch (error) {
    console.error("Error uploading metadata:", error);
    return NextResponse.json(
      { error: "Failed to upload metadata" },
      { status: 500 }
    );
  }
}
