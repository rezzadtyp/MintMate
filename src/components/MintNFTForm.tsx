"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMintNFT } from "@/app/hooks/useMintNFT";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useActiveAccount } from "thirdweb/react";
import PreviewImage from "./PreviewImage";
import Dropzone from "./Dropzone";

// Validation schema using zod
const mintNFTSchema = z.object({
  name: z.string().trim().min(2, { message: "Name is required" }),
  description: z.string().trim().min(5, { message: "Description is required" }),
  image: z.array(z.any()).min(1, { message: "Please upload image" }),
  address: z.string().min(2, { message: "Address is required" }),
});

type MintNFTFormData = z.infer<typeof mintNFTSchema>;

export default function MintNFTForm() {
  const { mintNFT, isLoading } = useMintNFT();
  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;

  const form = useForm<MintNFTFormData>({
    resolver: zodResolver(mintNFTSchema),
    defaultValues: {
      name: "",
      description: "",
      image: [],
      address: "",
    },
  });

  if (address) {
    form.setValue("address", address);
  }

  const onSubmit = async (formData: MintNFTFormData) => {
    if (activeAccount) {
      await mintNFT({ ...formData, account: activeAccount });
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...selectedImage];
    updatedFiles.splice(index, 1);
    setSelectedImage(updatedFiles);
    form.setValue("image", updatedFiles);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="NFT Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="NFT Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Images</FormLabel> */}
              <FormControl>
                <Dropzone
                  isError={Boolean(form.formState.errors.image)}
                  label="Upload Images"
                  onDrop={(files) => {
                    setSelectedImage([...selectedImage, ...files]);
                    field.onChange([...selectedImage, ...files]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PreviewImage
          fileImages={selectedImage}
          onRemoveImage={handleRemoveImage}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Minting..." : "Mint"}
        </Button>
      </form>
    </Form>
  );
}
