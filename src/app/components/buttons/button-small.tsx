"use client";
import { css } from "@emotion/react";
import lottie from "lottie-web/build/player/lottie_light";
import { ButtonHTMLAttributes, useEffect, useRef } from "react";
import tw, { styled } from "twin.macro";

import loading from "public/loading-circle.json";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  isHighlight?: boolean;
}
export const ButtonSmall = ({ text, isLoading, isHighlight, ...rest }: Props) => {
  const warpperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!warpperRef.current || !isLoading) return;
    lottie.loadAnimation({
      container: warpperRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loading,
    });

    return () => {
      lottie.destroy();
    };
  }, [warpperRef, isLoading]);

  return (
    <Wrapper isLoading={isLoading} isHighlight={isHighlight} {...rest}>
      <TextWrapper isLoading={isLoading}>{text}</TextWrapper>
      <LottieWrapper ref={warpperRef} />
    </Wrapper>
  );
};

interface LoadingProps {
  isLoading?: boolean;
  isHighlight?: boolean;
}
const Wrapper = styled.button<LoadingProps>(({ isLoading, isHighlight }) => [
  tw`
    w-200 h-44 px-24 py-14 flex-center relative
    rounded-24 bg-gray7 clickable
    disabled:(bg-gray2 non-clickable hover:(bg-gray2))
  `,
  css`
    min-width: 160px;
  `,
  isLoading && tw`text-transparent non-clickable`,
  isHighlight &&
    css`
      background: radial-gradient(
          100% 100% at 50% 100%,
          rgba(255, 255, 255, 0) 43.25%,
          rgba(255, 127, 55, 0.5) 100%
        ),
        #ff7966;
      box-shadow: 0px 8px 25px 0px rgba(255, 121, 102, 0.5);
    `,
]);

const TextWrapper = styled.div<LoadingProps>(({ isLoading }) => [
  tw`
    font-sb-20 text-white
    disabled:(text-gray5)
    hover:(text-black)
    max-md:font-sb-12
  `,
  isLoading && tw`opacity-0`,
]);
const LottieWrapper = tw.div`
  w-full h-full flex-center absolute absolute-center
`;
