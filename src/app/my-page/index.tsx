"use client";

import React, { useEffect, useRef } from "react";
import FooterBar from "../components/footer/footer-bar";
import CreditCardImage from "public/credit-card.png";
import tw, { css, styled } from "twin.macro";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import congratulation from "public/congratulation.json";
import EllipseImage from "public/Ellipse.png";

interface Props {
  isSuccess: boolean;
}

export const MyPage = ({ isSuccess }: Props) => {
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
        <UserSummaryBox>
          <ServiceTitle>NEBULA</ServiceTitle>
          <UserBalance>$1,235 USD</UserBalance>
          <AccountName>Account Name</AccountName>
          <AccountNumber>0x7F3...9901</AccountNumber>
        </UserSummaryBox>
        <Ellipse src={EllipseImage} alt="credit-card-image" />

        <LottieWrapper ref={warpperRef} />
      </Wrapper>
      <FooterBarBox>
        <FooterBar />
      </FooterBarBox>
    </>
  );
};

const Wrapper = tw.div`
    flex-center flex-col

`;

const UserSummaryBox = tw.div`
    flex-center flex-col relative gap-20 pt-100
    `;

const Ellipse = tw(Image)`
    absolute top-0 w-350
    `;

const ServiceTitle = tw.div`
    font-sb-16 text-white
    `;

const UserBalance = tw.div`
    font-b-32 text-white
    `;

const AccountName = tw.div`
    font-sb-12 text-white
    `;

const AccountNumber = tw.div`
    font-sb-12 text-white
    `;

const LottieWrapper = tw.div`
  w-full h-full flex-center absolute absolute-center
`;

const FooterBarBox = tw.div`
  absolute bottom-0 w-full
`;
