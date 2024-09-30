"use client";

import Image from "next/image";
import { FC, useMemo } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface PreviewImagesProps {
  fileImages?: File[];
  images?: string[];
  onRemoveImage: (index: number) => void;
}

const baseUrl = "http://localhost:3000/api";

const PreviewImage: FC<PreviewImagesProps> = ({
  onRemoveImage,
  fileImages,
  images,
}) => {
  const imageResults = useMemo(() => {
    if (fileImages) {
      return fileImages.map((image) => URL.createObjectURL(image));
    }

    return images;
  }, [fileImages, images]);

  return (
    <div className="flex gap-4">
      {imageResults?.map((image, index) => {
        return (
          <div
            key={index}
            className="relative h-[400px] w-[400px] rounded-md"
          >
            <Image
              src={images ? `${baseUrl}/${image}` : image}
              alt="thumbnail"
              objectFit="cover"
              fill
            />

            <Button
              variant="destructive"
              size="icon"
              className="absolute right-5 top-5"
              type="button" // <-- This is important
              onClick={() => onRemoveImage(index)}
            >
              <Trash2 className="h-6 w-6" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewImage;
