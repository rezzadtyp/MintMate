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
import { ArrowUpRight } from "lucide-react";
import heroimg from "../../public/images/new_3d_nft_card_design_by_bharatdhimmar_df6v0iq.png";
import { TextEffect } from "@/components/core/TextEffect";
import { useRouter } from "next/navigation";
import camv from "../../public/images/Group 1.svg";
import mintmateSVG from "../../public/images/mintmate.svg";

export default function Home() {
  const images = [
    { src: nft1, alt: "NFT 1" },
    { src: nft2, alt: "NFT 2" },
    { src: nft3, alt: "NFT 3" },
    { src: nft4, alt: "NFT 4" },
    { src: nft5, alt: "NFT 5" },
    { src: nft6, alt: "NFT 6" },
  ];
  const router = useRouter();

  const imageContainerClass =
    "overflow-hidden w-80 aspect-[4/5] ml-4 rounded-none relative mr-6";

  return (
    <div className="flex flex-col items-center">
      <div className="rounded-none h-[700px] mb-20 w-full px-20 py-8 gap-10 overflow-hidden flex items-center relative">
        <div className="flex w-full justify-center flex-col gap-8">
          <TextEffect
            per="word"
            as="h3"
            preset="blur"
            className="text-7xl font-medium w-[75%]"
          >
            Collect your own digital art
          </TextEffect>
          <TextEffect
            per="word"
            as="h3"
            preset="blur"
            className="text-xl text-black/40 w-[75%]"
          >
            Search among more than 10,000+ unique digital artwork&nbsp;s made by
            various creators
          </TextEffect>
          <Button
            className="w-fit rounded-none flex gap-2 p-6 mt-4 items-center"
            onClick={() => router.push("/gallery")}
          >
            <p className="font-normal">Explore now</p>
            <ArrowUpRight size={14} />
          </Button>
          <div className="flex gap-8 mt-10">
            <div className="flex gap-2 items-center">
              <TextEffect
                per="word"
                as="h3"
                preset="blur"
                className="text-4xl font-semibold"
              >
                42K
              </TextEffect>
              <TextEffect
                per="word"
                as="h3"
                preset="blur"
                className="text-black/40 text-xs w-20"
              >
                Our Active User
              </TextEffect>
            </div>
            <div className="flex gap-2 items-center">
              <TextEffect
                per="word"
                as="h3"
                preset="blur"
                className="text-4xl font-semibold"
              >
                4K
              </TextEffect>
              <TextEffect
                per="word"
                as="h3"
                preset="blur"
                className="text-black/40 text-xs w-20"
              >
                Various Creators
              </TextEffect>
            </div>
            <div className="flex gap-2 items-center">
              <TextEffect
                per="word"
                as="h3"
                preset="blur"
                className="text-4xl font-semibold"
              >
                13K
              </TextEffect>
              <TextEffect
                per="word"
                as="h3"
                preset="blur"
                className="text-black/40 text-sm w-20"
              >
                Beautiful Artworks
              </TextEffect>
            </div>
          </div>
        </div>
        <div className="w-[60%] h-full relative">
          <Image alt="mintmate" src={mintmateSVG} fill objectFit="contain" />
        </div>
      </div>
      <Marquee gradient={false}>
        {images.map((image, index) => (
          <div key={index} className={imageContainerClass}>
            <Image src={image.src} alt={image.alt} fill objectFit="cover" />
          </div>
        ))}
      </Marquee>
      <div className="items-center max-w-xl mt-20 space-y-20">
        <p className="text-center text-2xl font-semibold">
          MintMate is a platform where individuals can buy, sell, and trade
          non-fungible tokens (NFTs). NFTs are unique digital assets that are
          verified on a blockchain network, making them secure and tamper-proof.
        </p>
        <div className="relative w-full h-fit aspect-[10/2]">
          <Image alt="genre" src={camv} fill objectFit="contain" />
        </div>
      </div>
    </div>
  );
}
