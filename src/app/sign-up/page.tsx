"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";
import { SignUpPage } from ".";
import ErrorPage from "../components/error";
import { useWalletAuth } from "../modules/wallet/hooks/useWalletAuth";

function Page() {
  const { isMD } = useMediaQuery();
  // const isSuccess = true;
  const {
    isConnecting,
    isConnected,
    isNfcConnecting,
    nfcSerialNumber,
    handleNfcReading,
    connect,
    connectionError,
    wallet,
  } = useWalletAuth();

  return (
    <>
      {isMD ? (
        <ErrorPage />
      ) : (
        <>
          <SignUpPage
            isConnecting={isConnecting}
            isConnected={isConnected}
            isNfcConnecting={isNfcConnecting}
            nfcSerialNumber={nfcSerialNumber}
            handleNfcReading={handleNfcReading}
            connect={connect}
            connectionError={connectionError}
            wallet={wallet}
          />
        </>
      )}
    </>
  );
}

export default Page;
