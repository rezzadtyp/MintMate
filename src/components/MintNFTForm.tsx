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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const MAX_FILE_SIZE = 1024 * 1024 * 20;

const mintNFTSchema = z.object({
  name: z.string().trim().min(2, { message: "Name is required" }),
  description: z
    .string()
    .trim()
    .min(5, { message: "Description must be atleast 5 character" }),
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
  const { mintNFT, isLoading, isDialogOpen, nftData, setIsDialogOpen } =
    useMintNFT();
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
    <>
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
                  <p className="mx-auto text-sm text-gray-500">
                    Please select an Image
                  </p>
                </div>
              )}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Button type="button" className="w-full">
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>NFT Waiting for Approval</DialogTitle>
            <DialogDescription>
              Your NFT is currently waiting for approval. Here are the details:
            </DialogDescription>
          </DialogHeader>
          <div className="items-center flex flex-col justify-center">
            {nftData?.image && (
              <div className="relative w-full h-auto aspect-square">
                <Image
                  src={URL.createObjectURL(nftData.image[0])}
                  alt="NFT Preview"
                  fill
                  objectFit="cover"
                />
              </div>
            )}
            <div className="flex flex-col space-y-2 pt-2">
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-black/40">Name:</p>
                <p>{nftData?.name}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-black/40">
                  Description:
                </p>
                <p className="line-clamp-5 overflow-hidden text-ellipsis">
                  {nftData?.description}
                </p>
              </div>
            </div>
          </div>
          {/* <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
