"use client";

import {
  ComethProvider,
  ComethWallet,
  ConnectAdaptor,
  SupportedNetworks,
} from "@cometh/connect-sdk";
import { useState } from "react";
import { useWalletContext } from "./useWalletContext";
import { ethers } from "ethers";
import countContractAbi from "../../contract/counterABI.json";

export function useWalletAuth() {
  const { setWallet, setProvider, wallet, counterContract, setCounterContract } =
    useWalletContext();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isNfcConnecting, setIsNfcConnecting] = useState(false);

  const [nfc, setNfc] = useState<any>(null);
  const [nfcSerialNumber, setNfcSerialNumber] = useState<string | null>(null);
  const [nfcMessage, setNfcMessage] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_COMETH_API_KEY;
  const COUNTER_CONTRACT_ADDRESS = "0x3633A1bE570fBD902D10aC6ADd65BB11FC914624";

  function displayError(message: string) {
    setConnectionError(message);
  }

  async function handleNfcReading() {
    if (typeof NDEFReader === "undefined") {
      console.log("NFC is not supported in this browser.");
      return;
    }

    try {
      console.log("NFC Reading Start");
      const ndef = new NDEFReader();
      setNfc(ndef);

      await ndef.scan();

      setIsNfcConnecting(true);

      ndef.addEventListener("readingerror", () => {
        console.log("Argh! Cannot read data from the NFC tag. Try another one?");
        setIsNfcConnecting(false);
      });

      ndef.addEventListener("reading", (event: any) => {
        const { message, serialNumber } = event;

        // setNfcMessage(message);
        setNfcSerialNumber(serialNumber);
        setIsNfcConnecting(false);
        connect();
      });
    } catch (e) {
      console.log((e as Error).message);
    }
  }

  async function connect() {
    if (!apiKey) throw new Error("no apiKey provided");

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
        if (!nfcSerialNumber) {
          console.log("NFC is not connected");
          return;
        }
        const parsedLocalStorageAddress = JSON.parse(localStorageAddress);

        if (!parsedLocalStorageAddress[nfcSerialNumber]) {
          await instance.connect();
          parsedLocalStorageAddress[nfcSerialNumber] = await instance.getAddress();
          window.localStorage.setItem("walletAddress", JSON.stringify(parsedLocalStorageAddress));
        } else {
          await instance.connect(parsedLocalStorageAddress[nfcSerialNumber]);
        }
      }
      /* else {
        await instance.connect();
        const walletAddress = await instance.getAddress();
        window.localStorage.setItem("walletAddress", walletAddress);
        // await nfc.write(walletAddress);
      } */

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
    nfcMessage,
    nfcSerialNumber,
    handleNfcReading,
    connectionError,
    setConnectionError,
  };
}
