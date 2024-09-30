"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import nft1 from "../../public/images/nft1.png";
import nft2 from "../../public/images/nft2.jpg";
import nft3 from "../../public/images/nft3.jpeg";
import nft4 from "../../public/images/nft4.jpg";
import nft5 from "../../public/images/nft5.png";
import nft6 from "../../public/images/nft6.png";
import Footer from "@/components/Footer";

export default function Home() {
  const images = [
    { src: nft1, alt: "NFT 1" },
    { src: nft2, alt: "NFT 2" },
    { src: nft3, alt: "NFT 3" },
    { src: nft4, alt: "NFT 4" },
    { src: nft5, alt: "NFT 5" },
    { src: nft6, alt: "NFT 6" },
  ];

  const imageContainerClass =
    "overflow-hidden w-96 aspect-[3/4] ml-4 rounded-lg relative";

  return (
    <div className="pt-10 flex flex-col items-center">
      <div className="rounded-lg mb-20 w-[90vw] aspect-[4/1.5] overflow-hidden flex items-center relative">
        <div className="flex w-full h-full flex-col gap-2">
          <div className="w-full h-full bg-black/30 z-50 mx-auto items-center justify-center flex flex-col gap-4">
            <p className="text-white text-5xl font-semibold">Find and Collect your Rare Digital Art</p>
            <Button className="w-fit rounded-full">Explore</Button>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1644766464511-3b364cd8a6e8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="cihuy"
            layout="fill"
            objectFit="cover"
            className="z-20"
          />
        </div>
      </div>
      <Marquee gradient={false}>
        {images.map((image, index) => (
          <div key={index} className={imageContainerClass}>
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </Marquee>
      <Footer />
    </div>
  );
}
