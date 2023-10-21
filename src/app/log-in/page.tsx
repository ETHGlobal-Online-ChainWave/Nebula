"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";
import { LogInPage } from ".";
import ErrorPage from "../components/error";
import { useWalletAuth } from "../modules/wallet/hooks/useWalletAuth";

function Page() {
  const { isMD } = useMediaQuery();
  const isSuccess = true;
  const {
    isConnecting,
    isConnected,
    isNfcConnecting,
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
          <LogInPage
            isConnected={isConnected}
            isNfcConnecting={isNfcConnecting}
            handleNfcReading={handleNfcReading}
          />
        </>
      )}
    </>
  );
}

export default Page;
