"use client";
import tw, { css, styled } from "twin.macro";
import FooterBarBackGround from "public/footer-bar-bg.png";
import Image from "next/image";
import { IconCalendar, IconCredit, IconHome, IconMoney, IconPlus } from "../icons";
import QrCodeImage from "public/qr-code.png";
import loading from "public/loading-circle.json";
import lottie from "lottie-web/build/player/lottie_light";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface Props {
  isBackBoard?: boolean;
  isLoading?: boolean;
}

function FooterBar({ isBackBoard, isLoading }: Props) {
  const warpperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    <FooterWrapper isBackBoard={isBackBoard}>
      <StatusBox>
        <LottieWrapper ref={warpperRef} />
      </StatusBox>
      <BarBackground src={FooterBarBackGround} alt="image" />
      <IconButtonBox>
        <LeftIconBox>
          <div onClick={() => router.push("/my-page")}>
            <IconHome />
          </div>
          <div onClick={() => router.push("/read-qr")}>
            <IconMoney />
          </div>
        </LeftIconBox>
        <QrButtonBox>
          <div onClick={() => router.push("/my-transaction")}>
            <Qrcode src={QrCodeImage} alt="qr-code-image" />
          </div>
        </QrButtonBox>
        <RightIconBox>
          <div onClick={() => router.push("/create-qr")}>
            <IconPlus />
          </div>
          <div onClick={() => router.push("/my-card")}>
            <IconCredit />
          </div>
        </RightIconBox>
      </IconButtonBox>
    </FooterWrapper>
  );
}

export default FooterBar;

interface FooterWrapperProps {
  isBackBoard?: boolean;
}

const FooterWrapper = styled.div<FooterWrapperProps>(({ isBackBoard }) => [
  tw`
 
  relative pb-15 flex-center 
`,
  isBackBoard && tw`pt-100 bg-gray7`,
]);

const StatusBox = tw.div`
  absolute top-25 w-240 h-50 bg-gray8 rounded-10
  font-b-24 text-white text-center flex-center
`;

const BarBackground = tw(Image)`
  absolute w-329
`;

const IconButtonBox = tw.div`
  w-330 h-55 relative 
`;

const LeftIconBox = styled.div(() => [
  tw`
  absolute top-18 left-24 flex gap-40
`,
  css`
    svg {
      cursor: pointer;
    }
  `,
]);

const QrButtonBox = styled.div(() => [
  tw`
  absolute top-[-4px] left-143 w-44 h-44 rounded-33 flex-center bg-accent10
`,
  css`
    border-radius: 999px;
    backdrop-filter: blur(3.5px);
  `,
]);

const Qrcode = tw(Image)`
    w-27 h-27 clickable
`;

const RightIconBox = styled.div(() => [
  tw`
  absolute top-18 right-24 flex gap-40
`,
  css`
    svg {
      cursor: pointer;
    }
  `,
]);

const LottieWrapper = tw.div`
  w-20 h-20 flex-center absolute absolute-center
`;
