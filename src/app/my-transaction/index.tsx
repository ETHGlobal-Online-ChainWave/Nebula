"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FooterBar from "../components/footer/footer-bar";
import QrCodeImage from "public/qr-code.png";
import tw, { css, styled } from "twin.macro";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import congratulation from "public/congratulation.json";
import { Database } from "@tableland/sdk";
import { ConnectAdaptor, SupportedNetworks } from "@cometh/connect-sdk";
import { useWalletContext } from "../modules/wallet/hooks/useWalletContext";
import { useWalletAuth } from "../modules/wallet/hooks/useWalletAuth";

interface Props {
  isSuccess: boolean;
}

interface QrCodeData {
  qrcode: string;
  receiveaddress: string;
  date: string;
  token: string;
  amount: number;
  gaslimit: number;
  validhour: number;
}

export const MyTransaction = ({ isSuccess }: Props) => {
  const [tablelandData, setTablelandData] = useState<QrCodeData[]>([]);
  const warpperRef = useRef<HTMLDivElement>(null);
  const { wallet } = useWalletContext();
  const { nfcSerialNumber } = useWalletAuth();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const localStorageAddress = window.localStorage.getItem("walletAddress");
    const parsedAddress = JSON.parse(localStorageAddress || "{}");
    setWalletAddress(parsedAddress[nfcSerialNumber!] || wallet?.getAddress());
  }, [nfcSerialNumber, wallet]);

  useEffect(() => {
    if (!warpperRef.current) return;
    if (!isSuccess) return;
    lottie.loadAnimation({
      container: warpperRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: congratulation,
    });

    return () => {
      lottie.destroy();
    };
  }, [warpperRef, isSuccess]);

  const tableName: string = "neblula_one_80001_8032";
  const db = new Database();
  const readOnTable = async () => {
    const { results } = await db
      .prepare(`SELECT * FROM ${tableName} WHERE receiveaddress = '${walletAddress}'`)
      .all();
    setTablelandData(results as QrCodeData[]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("No QR code has been created");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    readOnTable();
  }, [tablelandData]);

  return (
    <>
      <Wrapper>
        {/* <button onClick={readOnTable}>read</button> */}
        {tablelandData.length ? (
          tablelandData.map((data, index) => (
            <div key={index}>
              <QrWrapper>
                <QrTitle>Transaction Qr Code</QrTitle>
                <img src={data.qrcode} alt="qr-code-image" width={200} height={200} />
              </QrWrapper>
              <BolderBox>
                <LeftCircle />
                <DotBolder />
                <RightCircle />
              </BolderBox>
              <TransactionWrapper>
                <TransactionBox>
                  <TransactionContentBox>
                    <TransactionTitle>Name</TransactionTitle>
                    <TransactionContent>
                      {data.receiveaddress
                        ? `${data.receiveaddress.slice(0, 7)}...${data.receiveaddress.slice(-6)}`
                        : ""}
                    </TransactionContent>
                  </TransactionContentBox>
                  <TransactionContentBox>
                    <TransactionTitle>Date</TransactionTitle>
                    <TransactionContent>{data.date}</TransactionContent>
                  </TransactionContentBox>
                  <TransactionContentBox>
                    <TransactionTitle>Token</TransactionTitle>
                    <TransactionContent>{data.token}</TransactionContent>
                  </TransactionContentBox>
                  <TransactionContentBox>
                    <TransactionTitle>Amount</TransactionTitle>
                    <TransactionContent>{data.amount / 1e18}</TransactionContent>
                  </TransactionContentBox>
                  <TransactionContentBox>
                    <TransactionTitle>Gas Limit</TransactionTitle>
                    <TransactionContent>{data.gaslimit}</TransactionContent>
                  </TransactionContentBox>
                  <TransactionContentBox>
                    <TransactionTitle>Validity</TransactionTitle>
                    <TransactionContent>{data.validhour}hour</TransactionContent>
                  </TransactionContentBox>
                </TransactionBox>
              </TransactionWrapper>
            </div>
          ))
        ) : (
          <div className="font-r-16 text-white mt-10">{message}</div>
        )}
      </Wrapper>

      <FooterBarBox>
        <FooterBar />
      </FooterBarBox>
    </>
  );
};

const Wrapper = styled.div(() => [
  tw`flex flex-col items-center justify-center h-full mt-24 overflow-y-auto `,
]);

const FooterBarBox = tw.div`
  absolute bottom-0 w-full
`;

const QrWrapper = tw.div`
  flex-center flex-col w-328 h-300 h-1/2 bg-gray7
  rounded-t-20 gap-27 mt-10
`;

const QrTitle = tw.div`
  font-r-16 text-gray3
`;

const QrImage = tw(Image)`
  w-200
`;

const BolderBox = tw.div`
  flex relative
`;

const DotBolder = tw.div`
 flex w-328 border-dotted border-b-2 border-gray7
`;

const LeftCircle = tw.div`
  absolute top-[-6px] left-[-8px] w-16 h-16 rounded-full bg-gray8
`;

const RightCircle = tw.div`
absolute top-[-6px] right-[-8px] w-16 h-16 rounded-full bg-gray8
`;

const TransactionWrapper = tw.div`
  flex-center flex-col  h-1/2 rounded-b-20
  bg-[#282833] w-328 p-24
`;

const TransactionContentBox = tw.div`
  flex-center justify-between  w-full h-full
  gap-20 p-6
`;

const TransactionBox = styled.div(() => [
  tw`flex-col w-full h-full px-20 py-16 flex-center bg-gray2 rounded-20`,
  css`
    border-radius: 16px;
    border: 1px solid #cfcffc5c;
    background: rgba(78, 78, 97, 0.2);
    backdrop-filter: blur(5px);
  `,
]);

const TransactionTitle = tw.div`
  font-sb-14 text-white
`;

const TransactionContent = tw.div`
  font-r-12 text-gray3
`;
