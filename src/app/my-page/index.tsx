"use client";

import React, { useEffect, useRef } from "react";
import FooterBar from "../components/footer/footer-bar";
import CreditCardImage from "public/credit-card.png";
import tw, { css, styled } from "twin.macro";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import congratulation from "public/congratulation.json";
import EllipseImage from "public/Ellipse.png";
import EthLogoImage from "public/eth-logo.png";
import UsdtLogoImage from "public/usdt-logo.png";

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
        <TopWrapper>
          <UserSummaryBox>
            <ServiceTitle>NEBULA</ServiceTitle>
            <UserBalance>$1,235 USD</UserBalance>
            <AccountName>Account Name</AccountName>
            <AccountNumber>0x7F3...9901</AccountNumber>
          </UserSummaryBox>
          <TokenWrapper>
            <TokenBox>
              <TokenTopBar1 />
              <TokenBoxTitle>Token Type</TokenBoxTitle>
              <TokenBoxContent>0</TokenBoxContent>
            </TokenBox>
            <TokenBox>
              <TokenTopBar2 />
              <TokenBoxTitle>Highest Token</TokenBoxTitle>
              <TokenBoxContent>0</TokenBoxContent>
            </TokenBox>
            <TokenBox>
              <TokenTopBar3 />
              <TokenBoxTitle>Lowest Token</TokenBoxTitle>
              <TokenBoxContent>0</TokenBoxContent>
            </TokenBox>
          </TokenWrapper>
        </TopWrapper>
        <Ellipse src={EllipseImage} alt="credit-card-image" />
        <LottieWrapper ref={warpperRef} />
        <BottomWrapper>
          <TokenBalanceWrapper>
            <TokenBalanceBox>
              <TokenImage src={EthLogoImage} alt="credit-card-image" />
              <TokenName>Ethereum</TokenName>
              <TokenBalance>0 USD</TokenBalance>
            </TokenBalanceBox>
            <TokenBalanceBox>
              <TokenImage src={UsdtLogoImage} alt="credit-card-image" />
              <TokenName>Tether</TokenName>
              <TokenBalance>0 USD</TokenBalance>
            </TokenBalanceBox>
            <TokenBalanceBox>
              <TokenImage src={EthLogoImage} alt="credit-card-image" />
              <TokenName>Token Name</TokenName>
              <TokenBalance>0 USD</TokenBalance>
            </TokenBalanceBox>
            <TokenBalanceBox>
              <TokenImage src={EthLogoImage} alt="credit-card-image" />
              <TokenName>Token Name</TokenName>
              <TokenBalance>0 USD</TokenBalance>
            </TokenBalanceBox>
          </TokenBalanceWrapper>
        </BottomWrapper>
      </Wrapper>

      <FooterBarBox>
        <FooterBar />
      </FooterBarBox>
    </>
  );
};

const Wrapper = styled.div(() => [
  tw`
    flex items-center flex-col w-full h-full
    overflow-y-auto
`,
]);

const TopWrapper = styled.div(() => [
  tw`
     w-full flex-col bg-gray7 py-25 
    `,
  css`
    border-radius: 0px 0px 24px 24px;
  `,
]);
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
    font-sb-12 text-white px-12 py-8 rounded-16 bg-gray6
`;

const LottieWrapper = tw.div`
  w-full h-full flex-center absolute absolute-center
`;

const FooterBarBox = tw.div`
  absolute bottom-0 w-full
`;

const TokenWrapper = tw.div`
  flex-center gap-8 pt-44
  

  `;

const TokenBox = styled.div(() => [
  tw`
  relative
  flex-center flex-col 
  text-center
  bg-gray8 rounded-10
  py-16 px-18
  w-104 h-68
  `,
  css`
    border-radius: 16px;
    border: 1px solid #cfcffc;
    background: rgba(78, 78, 97, 0.2);
    backdrop-filter: blur(5px);
  `,
]);

const TokenTopBar1 = tw.div`
  absolute w-46 h-1 bg-accent5 rounded-2 top-[-1px]
  `;

const TokenTopBar2 = tw.div`
  absolute w-46 h-1 bg-primary10 rounded-2 top-[-1px]
  `;
const TokenTopBar3 = tw.div`
  absolute w-46 h-1 bg-secondary5 rounded-2 top-[-1px]
  `;
const TokenBoxTitle = tw.div`
  w-104 font-sb-12 text-gray4
  `;
const TokenBoxContent = tw.div`
  font-sb-14 text-white
  `;

const BottomWrapper = styled.div(() => [
  tw`
    flex items-center flex-col w-full
    gap-10
`,
]);

const TokenBalanceWrapper = tw.div`
    flex flex-col items-center w-full 
    py-10 gap-12
    overflow-y-auto h-150
    `;

const TokenBalanceBox = tw.div`
     flex flex-center px-12 py-12 gap-8 border-solid border-gray7 border-1
     rounded-16 w-328 h-64
    `;

const TokenImage = tw(Image)`
    w-40
    `;
const TokenName = tw.div`
    w-120 font-sb-16 text-white text-start
    `;

const TokenBalance = tw.div`
    w-150 font-sb-16 text-white text-end
    `;