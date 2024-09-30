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
import Image from "next/image";

const MAX_FILE_SIZE = 1024 * 1024 * 20;

// Validation schema using zod
const mintNFTSchema = z.object({
  name: z.string().trim().min(2, { message: "Name is required" }),
  description: z.string().trim().min(5, { message: "Description is required" }),
  image: z
    .any()
    .refine(
      (files) => !files || files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 20MB.`
    ),
  address: z.string().min(2, { message: "Address is required" }),
});

type MintNFTFormData = z.infer<typeof mintNFTSchema>;

export default function MintNFTForm() {
  const { mintNFT, isLoading } = useMintNFT();
  // const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;

  const form = useForm<MintNFTFormData>({
    resolver: zodResolver(mintNFTSchema),
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
      address: "",
    },
  });

  if (address) {
    form.setValue("address", address);
  }

  const onSubmit = async (formData: MintNFTFormData) => {
    await mintNFT(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-10 w-full h-full"
      >
        <div className="relative w-[400px] h-[400px]">
          <div className="mb-4 flex flex-col items-center px-20 gap-4 border rounded-lg py-4">
            {selectedImage ? (
              <div className="relative h-96 w-96 overflow-hidden rounded-lg">
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative h-96 w-96 overflow-hidden rounded-lg border border-dashed items-center flex">
                <p className="mx-auto text-sm text-gray-500">Please select an Image</p>
              </div>
            )}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Button
                      type="button"
                      className="w-full"
                    >
                      <input
                        type="file"
                        className="hidden"
                        id="fileInput"
                        accept="image/*"
                        onBlur={field.onBlur}
                        name={field.name}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          setSelectedImage(e.target.files?.[0] || null);
                        }}
                        ref={field.ref}
                      />
                      <label
                        htmlFor="fileInput"
                        className="text-neutral-90 inline-flex cursor-pointer items-center gap-2 rounded-md"
                      >
                        <span className="whitespace-nowrap">
                          Choose your image
                        </span>
                      </label>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full h-full space-y-8">
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
                  <Textarea
                    placeholder="NFT Description"
                    {...field}
                    className="resize-none full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Minting..." : "Mint"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
