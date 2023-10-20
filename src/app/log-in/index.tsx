"use client";

import React, { useEffect, useRef } from "react";
import FooterBar from "../components/footer/footer-bar";
import CreditCardImage from "public/credit-card.png";
import tw from "twin.macro";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import congratulation from "public/congratulation.json";
import { useRouter } from "next/navigation";

interface Props {
  isConnected: boolean;
  isNfcConnecting: boolean;
  handleNfcReading: () => Promise<void>;
}

export const LogInPage = ({ isConnected, isNfcConnecting, handleNfcReading }: Props) => {
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
        <Title>Log in by Card</Title>
        <CardImage src={CreditCardImage} alt="credit-card-image" />
        <Content>{isNfcConnecting && "Put your card on the back"}</Content>
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
pt-32 gap-60
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
