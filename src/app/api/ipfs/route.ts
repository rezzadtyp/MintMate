import { NextResponse } from "next/server";
import * as dotenv from "dotenv";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { client } from "@/app/client";
import cloudinary from "cloudinary";

dotenv.config();

const storage = new ThirdwebStorage({
  clientId: client.clientId,
  secretKey: client.secretKey,
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadToCloudinary = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "mintmate",
        allowed_formats: ["jpeg", "png", "jpg"],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result && result.secure_url) {
          resolve(result.secure_url);
        } else {
          reject(new Error("Cloudinary upload failed: secure_url not found"));
        }
      }
    );
    uploadStream.end(buffer);
  });
};

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
    const cloudinaryUrl = await uploadToCloudinary(buffer);
    console.log(cloudinaryUrl);

    if (!cloudinaryUrl) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    // Step 2: Upload image to IPFS
    const uri = await storage.upload(cloudinaryUrl);

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
