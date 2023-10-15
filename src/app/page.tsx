"use client";

import ConnectWallet from "@/app/components/ConnectWallet";
import { useWindowSize } from "@/app/lib/ui/hooks";
import { useWalletAuth } from "@/app/modules/wallet/hooks/useWalletAuth";
import React, { useState } from "react";

import Confetti from "react-confetti";

import tw from "twin.macro";
import { ButtonSmall } from "./components/buttons/button-small";
import { useMediaQuery } from "@/hooks/use-media-query";
import ErrorPage from "./components/error";

export default function App() {
  const {
    isConnecting,
    isConnected,
    isNfcConnecting,
    handleNfcReading,
    connect,
    connectionError,
    wallet,
  } = useWalletAuth();
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { isMD } = useMediaQuery();

  //const [transactionSuccess, setTransactionSuccess] = useState(false);

  if (isMD) return <ErrorPage />;

  return (
    <>
      {isMD ? (
        <ErrorPage />
      ) : (
        <>
          <ButtonSmall
            text="Get your Wallet"
            isLoading={isConnecting || isConnected}
            onClick={connect}
          />
          <Hidiv>HI</Hidiv>
          <TitleDiv>this is Title</TitleDiv>

          {/* {transactionSuccess && (
          <Confetti width={windowWidth} height={windowHeight} />
        )} */}

          <ConnectWallet
            isConnected={isConnected}
            isConnecting={isConnecting}
            isNfcConnecting={isNfcConnecting}
            handleNfcReading={handleNfcReading}
            connect={connect}
            connectionError={connectionError}
            wallet={wallet!}
          />

          {/* {isConnected && (
                <Transaction
                  transactionSuccess={transactionSuccess}
                  setTransactionSuccess={setTransactionSuccess}
                />
              )} */}
        </>
      )}
    </>
  );
}

const Hidiv = tw.div`
  bg-red-500 font-sb-12
`;

const TitleDiv = tw.div`
  bg-gray8 font-b-40
`;
