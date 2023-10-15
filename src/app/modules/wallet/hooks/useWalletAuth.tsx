"use client";

import {
  ComethProvider,
  ComethWallet,
  ConnectAdaptor,
  SupportedNetworks,
} from "@cometh/connect-sdk";
import { useEffect, useState } from "react";
import { useWalletContext } from "./useWalletContext";
import { ethers } from "ethers";
import countContractAbi from "../../contract/counterABI.json";

export function useWalletAuth() {
  const {
    setWallet,
    setProvider,
    wallet,
    counterContract,
    setCounterContract,
  } = useWalletContext();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isNfcConnecting, setIsNfcConnecting] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_COMETH_API_KEY;
  const COUNTER_CONTRACT_ADDRESS = "0x3633A1bE570fBD902D10aC6ADd65BB11FC914624";

  function displayError(message: string) {
    setConnectionError(message);
  }

  const handleNfcReading = async () => {
    if (typeof NDEFReader === "undefined") {
      console.log("NFC is not supported in this browser.");
      return;
    }

    try {
      console.log("NFC Reading Start");
      const ndef = new NDEFReader();
      await ndef.scan();

      setIsNfcConnecting(true);

      ndef.addEventListener("readingerror", () => {
        console.log(
          "Argh! Cannot read data from the NFC tag. Try another one?"
        );
        setIsNfcConnecting(false);
      });

      ndef.addEventListener("reading", (event: any) => {
        const { serialNumber } = event;
        console.log(`Serial Number: ${serialNumber}`);
        setIsNfcConnecting(false);
        connect();
      });
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  async function connect() {
    if (!apiKey) throw new Error("no apiKey provided");

    setIsConnecting(true);

    try {
      const walletAdaptor = new ConnectAdaptor({
        chainId: SupportedNetworks.MUMBAI,
        apiKey,
      });

      const instance = new ComethWallet({
        authAdapter: walletAdaptor,
        apiKey,
      });

      const localStorageAddress = window.localStorage.getItem("walletAddress");

      if (localStorageAddress) {
        await instance.connect(localStorageAddress);
      } else {
        await instance.connect();
        const walletAddress = await instance.getAddress();
        window.localStorage.setItem("walletAddress", walletAddress);
      }

      const instanceProvider = new ComethProvider(instance);

      const contract = new ethers.Contract(
        COUNTER_CONTRACT_ADDRESS,
        countContractAbi,
        instanceProvider.getSigner()
      );

      setCounterContract(contract);

      setIsConnected(true);
      setWallet(instance as any);
      setProvider(instanceProvider as any);
    } catch (e) {
      displayError((e as Error).message);
    } finally {
      setIsConnecting(false);
    }
  }

  async function disconnect() {
    if (wallet) {
      try {
        await wallet!.logout();
        setIsConnected(false);
        setWallet(null);
        setProvider(null);
        setCounterContract(null);
      } catch (e) {
        displayError((e as Error).message);
      }
    }
  }

  return {
    wallet,
    counterContract,
    connect,
    disconnect,
    isConnected,
    isConnecting,
    isNfcConnecting,
    handleNfcReading,
    connectionError,
    setConnectionError,
  };
}
