"use client";

import React, { useEffect, useRef } from "react";
import FooterBar from "../components/footer/footer-bar";
import NfcCardImage from "public/nfc-card.png";
import tw from "twin.macro";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import congratulation from "public/congratulation.json";

interface Props {
  isSuccess: boolean;
}

export const MyCard = ({ isSuccess }: Props) => {
  return (
    <>
      <Wrapper>
        <Title>My Credit Card</Title>
        <CardImage src={NfcCardImage} alt="credit-card-image" />
      </Wrapper>

      <FooterBarBox>
        <FooterBar isBackBoard={false} />
      </FooterBarBox>
    </>
  );
};

const Wrapper = tw.div`
    flex-center flex-col text-gray3
    pt-32 gap-40
    relative
`;

const Title = tw.div`
    font-r-16
    `;

const CardImage = tw(Image)`
    w-350
    `;

const LottieWrapper = tw.div`
  w-full h-full flex-center absolute absolute-center
`;

const FooterBarBox = tw.div`
  absolute bottom-0 w-full
`;
