"use client";

import {
  ComethProvider,
  ComethWallet,
  ConnectAdaptor,
  SupportedNetworks,
} from "@cometh/connect-sdk";
import { useState } from "react";
import { useWalletContext } from "./useWalletContext";
import { useNfc } from "./useNfc";
import { ethers } from "ethers";
import { COUNTER_ABI } from "@/abi/counter";
import { TOKEN_ABI } from "@/abi/sample-token";

export function useWalletAuth() {
  const { isNfcConnecting, nfcSerialNumber, handleNfcReading } = useNfc(connect);
  const { wallet, setWallet, setProvider, contract, setContract } = useWalletContext();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_COMETH_API_KEY;
  const COUNTER_CONTRACT_ADDRESS = "0x3633A1bE570fBD902D10aC6ADd65BB11FC914624";
  const MATIC_ADDRESS = "0x0000000000000000000000000000000000001010";

  function displayError(message: string) {
    setConnectionError(message);
  }

  async function connect() {
    if (!apiKey) throw new Error("no apiKey provided");

    try {
      const walletAdaptor = new ConnectAdaptor({
        chainId: SupportedNetworks.MUMBAI,
        apiKey,
      });

      /* const walletScrollAdaptor = new ConnectAdaptor({
        chainId: 534351,
      }); */

      const instance = new ComethWallet({
        authAdapter: walletAdaptor,
        apiKey,
      });

      const localStorageAddress = window.localStorage.getItem("walletAddress");

      if (localStorageAddress) {
        const parsedLocalStorageAddress = JSON.parse(localStorageAddress);
        if (parsedLocalStorageAddress[nfcSerialNumber!]) {
          // if it is in localStorage, connect to it
          await instance.connect(parsedLocalStorageAddress[nfcSerialNumber!]);
        } else {
          // if it is not in localStorage, connect to it and save it to localStorage
          await instance.connect();
          const walletAddress = await instance.getAddress();
          parsedLocalStorageAddress[nfcSerialNumber!] = walletAddress;
          window.localStorage.setItem("walletAddress", JSON.stringify(parsedLocalStorageAddress));
        }
      } else {
        // if there is no localStorage, connect to it and save it to localStorage
        await instance.connect();
        const walletAddress = await instance.getAddress();
        const addressObject = { [nfcSerialNumber!]: walletAddress };
        window.localStorage.setItem("walletAddress", JSON.stringify(addressObject));
      }

      const instanceProvider = new ComethProvider(instance);

      // const contract = new ethers.Contract(MATIC_ADDRESS, TOKEN_ABI, instanceProvider.getSigner());

      const contract = new ethers.Contract(
        COUNTER_CONTRACT_ADDRESS,
        COUNTER_ABI,
        instanceProvider.getSigner()
      );

      setContract(contract);

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
        // setContract(null);
      } catch (e) {
        displayError((e as Error).message);
      }
    }
  }

  return {
    wallet,
    connect,
    disconnect,
    isConnected,
    isConnecting,
    isNfcConnecting,
    nfcSerialNumber,
    handleNfcReading,
    connectionError,
    setConnectionError,
    contract,
    setContract,
  };
}
