"use client";

import React, { use, useEffect, useRef } from "react";
import FooterBar from "../components/footer/footer-bar";
import CreditCardImage from "public/credit-card.png";
import tw from "twin.macro";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import congratulation from "public/congratulation.json";
import { useRouter } from "next/navigation";
import { ComethWallet } from "@cometh/connect-sdk";

interface Props {
  connectionError: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  nfcMessage: any;
  nfcSerialNumber: string | null;
  isNfcConnecting: boolean;
  connect: () => Promise<void>;
  handleNfcReading: () => Promise<void>;
  wallet: ComethWallet | null;
}

export const SignUpPage = ({
  connectionError,
  isConnecting,
  isConnected,
  isNfcConnecting,
  nfcMessage,
  nfcSerialNumber,
  handleNfcReading,
  connect,
  wallet,
}: Props) => {
  const router = useRouter();
  const warpperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!warpperRef.current) return;
    if (!isConnected) return;
    lottie.loadAnimation({
      container: warpperRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: congratulation,
    });
    setTimeout(() => {
      router.push("/my-page");
    }, 2000);

    return () => {
      lottie.destroy();
    };
  }, [warpperRef, isConnected]);

  useEffect(() => {
    handleNfcReading();
  }, []);

  return (
    <>
      <Wrapper>
        <Title>Create Wallet</Title>
        {/* <div>{JSON.stringify(nfcMessage?.records)}</div> */}
        <CardImage src={CreditCardImage} alt="credit-card-image" />
        <Content>
          {isNfcConnecting
            ? "Put your card on the back"
            : isConnected
            ? "Success!"
            : "Reading the card information"}
        </Content>
        <LottieWrapper ref={warpperRef} />
      </Wrapper>
      <FooterBarBox>
        <FooterBar isBackBoard={true} isLoading={!isConnected} />
      </FooterBarBox>
    </>
  );
};

const Wrapper = tw.div`
   flex-center flex-col text-gray3
    pt-32 gap-80
    relative
`;

const Title = tw.div`
    font-r-16
`;

const Content = tw.div`
    font-r-14 text-white
`;

const CardImage = tw(Image)`
    max-w-270
`;

const LottieWrapper = tw.div`
  w-full h-full flex-center absolute absolute-center
`;

const FooterBarBox = tw.div`
  absolute bottom-0 w-full
`;
