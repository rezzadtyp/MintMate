import { NextResponse } from "next/server";
import * as dotenv from "dotenv";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { client } from "@/app/client";
import fs from "fs/promises";
import path from "path";
import { contract } from "@/app/client";
import { Engine } from "@thirdweb-dev/engine";

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

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const imagePath = path.join(
      process.cwd(),
      "public/assets/" + Date.now() + imageFile.name
    );

    await fs.writeFile(imagePath, buffer);

    const fileData = await fs.readFile(imagePath);
    const uri = await storage.upload(fileData);

    const engine = new Engine({
      url: process.env.ENGINE_URL!,
      accessToken: process.env.THIRDWEB_ENGINE_ACCESS_TOKEN!,
    });

    const NFTsMetadata = {
      name: name.toString(),
      description: description.toString(),
      image: uri,
    };

    const response = await engine.erc721.mintTo(
      "sepolia",
      contract.address,
      process.env.BACKEND_WALLET!,
      {
        receiver: address.toString(),
        metadata: NFTsMetadata,
      }
    );

    return NextResponse.json({
      message: "NFT Minted Successfully",
      response,
    });
  } catch (error) {
    console.error("Error uploading metadata:", error);
    return NextResponse.json(
      { error: "Failed to upload metadata" },
      { status: 500 }
    );
  }
}
