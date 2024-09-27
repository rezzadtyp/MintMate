"use client";

import { client } from "@/app/client";
import {
  ConnectButton,
  ConnectEmbed,
  lightTheme,
  useActiveAccount,
} from "thirdweb/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const account = useActiveAccount();
  const router = useRouter();

  return (
    <div className="flex justify-between items-center px-10 py-4">
      <div className="flex gap-8 items-center">
        <Link href={"/"}>
          <p className="font-semibold text-xl">MNMT</p>
        </Link>
        <Button
          variant="link"
          onClick={() => router.push("/gallery")}
          className="font-medium text-base text-gray-400"
        >
          <p>Gallery</p>
        </Button>
      </div>
      <div className="flex gap-4 items-center">
        {account ? (
          <>
            <Button variant="link" onClick={() => router.push("/mint/nft")}>
              Mint
            </Button>
            <ConnectButton
              client={client}
              appMetadata={{
                name: "MintMate",
                url: "https://mintmate.com",
              }}
              detailsButton={{
                className: "rounded-full",
                displayBalanceToken: {
                  [client.clientId]: account.address,
                },
              }}
              theme={lightTheme()}
            />
          </>
        ) : (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full h-auto px-8 py-[13px]">
                  Connect
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <ConnectEmbed client={client} theme={lightTheme()} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
