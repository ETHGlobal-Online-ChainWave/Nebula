"use client";

import React, { useEffect, useRef } from "react";
import FooterBar from "../components/footer/footer-bar";
import CreditCardImage from "public/credit-card.png";
import tw from "twin.macro";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import congratulation from "public/congratulation.json";

interface Props {
  isSuccess: boolean;
}

export const SignUpPage = ({ isSuccess }: Props) => {
  const warpperRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <Wrapper>
        <Title>Create Wallet</Title>
        <CardImage src={CreditCardImage} alt="credit-card-image" />
        <LottieWrapper ref={warpperRef} />
      </Wrapper>
      <FooterBarBox>
        <FooterBar isBackBoard={true} />
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

const CardImage = tw(Image)`
    max-w-270
    `;

const LottieWrapper = tw.div`
  w-full h-full flex-center absolute absolute-center
`;

const FooterBarBox = tw.div`
  absolute bottom-0 w-full
`;
