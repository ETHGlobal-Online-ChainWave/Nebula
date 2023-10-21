"use client";

import ConnectWallet from "@/app/components/ConnectWallet";
import { useWindowSize } from "@/app/lib/ui/hooks";
import { useWalletAuth } from "@/app/modules/wallet/hooks/useWalletAuth";
import React, { useState } from "react";

import Confetti from "react-confetti";

import tw, { styled } from "twin.macro";
import { ButtonSmall } from "./components/buttons/button-small";
import { useMediaQuery } from "@/hooks/use-media-query";
import ErrorPage from "./components/error";
import MainPageImage1 from "public/main-page-1.png";
import MainPageImageLeft from "public/main-page-left.png";
import MainPageImageRight from "public/main-page-right.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NebulaLogoImage from "public/nebula-logo.png";

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
  const router = useRouter();

  //const [transactionSuccess, setTransactionSuccess] = useState(false);

  return (
    <>
      {isMD ? (
        <ErrorPage />
      ) : (
        <>
          <LogoBox>
            <LogoImage src={NebulaLogoImage} alt="logo" />
            <LogoTitle>NEBULA</LogoTitle>
          </LogoBox>
          <ImgBox>
            <MainImageLeft src={MainPageImageLeft} alt="main-page-image-left" />
            <MainImage1 src={MainPageImage1} alt="main-page-image-1" />
            <MainImageRight src={MainPageImageRight} alt="main-page-image-right" />
          </ImgBox>
          <TextBox>Create a Wallet Easily and Safely with your Credit Card</TextBox>
          <ButtonBox>
            <ButtonSmall
              text="Get Started"
              isHighlight={true}
              onClick={() => {
                router.push("/sign-up");
              }}
            />
            <ButtonSmall
              text="I Have an Wallet"
              onClick={() => {
                router.push("/log-in");
              }}
            />
          </ButtonBox>
        </>
      )}
    </>
  );
}

const LogoBox = tw.div`
  w-full h-100 flex-center flex gap-16
`;

const LogoImage = tw(Image)`
  w-60
`;

const LogoTitle = tw.div`
  font-b-40 text-white
`;

const ImgBox = tw.div`
  w-full flex-center relative
  max-h-600
`;

const MainImageLeft = tw(Image)`
  absolute top-0 left-0 w-100
`;

const MainImage1 = tw(Image)`
  flex max-w-400
`;

const MainImageRight = tw(Image)`
  absolute bottom-0 right-0 w-100
`;

const TextBox = tw.div`
  flex-center font-r-14 text-white text-center
`;

const ButtonBox = tw.div`
  flex-col flex-center gap-15 m-26
`;
