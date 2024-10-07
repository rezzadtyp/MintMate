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
import { useEffect, useState } from "react";

const Navbar = () => {
  const account = useActiveAccount();
  const router = useRouter();
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  useEffect(() => {
    const savedAddress = localStorage.getItem("address");
    if (savedAddress) {
      setConnectedAddress(savedAddress);
    }
  }, []);

  useEffect(() => {
    if (account) {
      localStorage.setItem("address", account.address);
      setConnectedAddress(account.address);
    }
  }, [account]);

  const handleDisconnect = () => {
    localStorage.removeItem("address");
    setConnectedAddress(null);
  };

  return (
    <div className="flex justify-between items-center px-10 py-4 border-b">
      <div className="flex gap-8 items-center">
        <Link href={"/"}>
          <p className="font-bold text-xl">MNMT</p>
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
        {connectedAddress ? (
          <>
            <Button variant="link" onClick={() => router.push("/mint/nft")}>
              Mint
            </Button>
            <Button variant="link" onClick={() => router.push("/account")}>
              Profile
            </Button>
            <ConnectButton
              client={client}
              appMetadata={{
                name: "MintMate",
                url: "https://mintmate.com",
              }}
              detailsButton={{
                className: "rounded-none",
                displayBalanceToken: {
                  [client.clientId]: connectedAddress,
                },
              }}
              theme={lightTheme()}
              onDisconnect={handleDisconnect}
              autoConnect={true}
            />
          </>
        ) : (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="rounded-none h-auto px-8 py-[13px]"
                  variant="outline"
                >
                  Connect
                </Button>
              </DialogTrigger>
              <DialogContent className="p-2 bg-none border-none w-fit rounded-sm">
                <DialogHeader className="rounded-sm">
                  <ConnectEmbed
                    client={client}
                    theme={lightTheme()}
                    appMetadata={{
                      name: "MintMate",
                      description:
                        "On MintMate, the process is celebrated—every brushstroke, every note, every line of code. It&nbsp;s all part of the journey.",
                    }}
                    className="rounded-sm"
                    autoConnect={true}
                  />
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
