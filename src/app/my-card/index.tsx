"use client";

import React, { useEffect, useRef } from "react";
import FooterBar from "../components/footer/footer-bar";
import NfcCardImage from "public/nfc-card.png";
import tw from "twin.macro";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import congratulation from "public/congratulation.json";
import { useWalletContext } from "../modules/wallet/hooks/useWalletContext";
import { useWalletAuth } from "../modules/wallet/hooks/useWalletAuth";

interface Props {
  isSuccess: boolean;
}

export const MyCard = ({ isSuccess }: Props) => {
  const { wallet } = useWalletContext();
  const { nfcSerialNumber } = useWalletAuth();
  const localStorageAddress = window.localStorage.getItem("walletAddress");
  const parsedAddress = JSON.parse(localStorageAddress || "{}");
  const walletAddress = parsedAddress[nfcSerialNumber!] || wallet?.getAddress();

  return (
    <>
      <Wrapper>
        <Title>My Credit Card</Title>
        <CardImageWrapper>
          <CardImage>
            <CardLogo src="/mastercard-logo.svg" alt="mastercard" width={56} height={34} />
            <CardTitle>NEBULA</CardTitle>
            <CardUser>John Doe</CardUser>
            <CardAddress>
              {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-5)}
            </CardAddress>
            <CardDate>12/25</CardDate>
          </CardImage>
          <CardImage2 />
          <CardImage3 />
        </CardImageWrapper>
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

const CardImageWrapper = tw.div`
  w-350 h-450
  relative
  mr-20
`;

const CardImage = tw.div`
  flex flex-col items-center
  bg-[url('/nfc-card.png')] bg-contain bg-center bg-no-repeat
  absolute top-0 left-1/2 transform -translate-x-1/2
  w-232 h-349
  z-3
`;

const CardImage2 = tw.div`
  bg-[url('/nfc-card-2.png')] bg-contain bg-center bg-no-repeat
  absolute top-10 left-1/2 transform -translate-x-1/2
  w-232 h-349 ml-20
  z-2
`;

const CardImage3 = tw.div`
  bg-[url('/nfc-card-3.png')] bg-contain bg-center bg-no-repeat
  absolute top-20 left-1/2 transform -translate-x-1/2
  w-232 h-349 ml-40
  z-1
`;

const CardLogo = tw(Image)`
mt-32
  `;

const CardTitle = tw.div`
  font-r-16 font-semibold mt-16
`;

const CardUser = tw.div`
  font-r-12 font-semibold mt-auto
`;

const CardAddress = tw.div`
  font-r-16 font-semibold my-8
`;

const CardDate = tw.div`
  font-r-14 font-semibold mb-76
`;

const LottieWrapper = tw.div`
  w-full h-full flex-center absolute absolute-center
`;

const FooterBarBox = tw.div`
  absolute bottom-0 w-full
`;
