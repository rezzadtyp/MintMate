import { NextResponse } from "next/server";
import * as dotenv from "dotenv";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { client } from "@/app/client";
import fs from "fs/promises";
import path from "path";

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
    const imageFile = formData.get("image");
    const address = formData.get("address");

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

    // Step 1: Convert image file to path
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const imagePath = path.join(
      process.cwd(),
      "public/assets/" + Date.now() + imageFile.name
    );

    await fs.writeFile(imagePath, buffer);

    const fileData = await fs.readFile(imagePath);
    // Step 2: Upload image to IPFS
    const uri = await storage.upload(fileData);

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
