"use client";

import ConnectWallet from "@/app/components/ConnectWallet";
import { useWindowSize } from "@/app/lib/ui/hooks";
import { useWalletAuth } from "@/app/modules/wallet/hooks/useWalletAuth";
import React, { useState } from "react";

import Confetti from "react-confetti";

import tw from "twin.macro";

export default function App() {
  const { isConnecting, isConnected, connect, connectionError, wallet } =
    useWalletAuth();
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  //const [transactionSuccess, setTransactionSuccess] = useState(false);

  return (
    <>
      <Hidiv>HI</Hidiv>
      <TitleDiv>this is Title</TitleDiv>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* {transactionSuccess && (
          <Confetti width={windowWidth} height={windowHeight} />
        )} */}

        <div className="md:min-h-[70vh] gap-2 flex flex-col justify-center items-center">
          <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              <div className="grid divide-gray-900/5 bg-gray-50">
                <ConnectWallet
                  isConnected={isConnected}
                  isConnecting={isConnecting}
                  connect={connect}
                  connectionError={connectionError}
                  wallet={wallet!}
                />
              </div>

              {/* {isConnected && (
                <Transaction
                  transactionSuccess={transactionSuccess}
                  setTransactionSuccess={setTransactionSuccess}
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Hidiv = tw.div`
  bg-red-500 font-sb-12
`;

const TitleDiv = tw.div`
  bg-gray8 font-b-40
`;
