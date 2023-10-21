import { useState } from "react";

export const useNfc = (nextFunction: () => Promise<void>) => {
  const [nfc, setNfc] = useState<any>(null);
  const [nfcSerialNumber, setNfcSerialNumber] = useState<string | null>(null);
  const [isNfcConnecting, setIsNfcConnecting] = useState(false);

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
        nextFunction();
      });
    } catch (e) {
      console.log((e as Error).message);
    }
  }

  return {
    nfc,
    nfcSerialNumber,
    isNfcConnecting,
    handleNfcReading,
  };
};
