"use client";
import tw, { css, styled } from "twin.macro";
import FooterBarBackGround from "public/footer-bar-bg.png";
import Image from "next/image";
import { IconCalendar, IconCredit, IconHome, IconPlus } from "../icons";
import QrCodeImage from "public/qr-code.png";

function FooterBar() {
  return (
    <FooterWrapper>
      <BarBackground src={FooterBarBackGround} alt="image" />
      <IconButtonBox>
        <LeftIconBox>
          <IconHome />
          <IconCalendar />
        </LeftIconBox>
        <QrButtonBox>
          <Qrcode src={QrCodeImage} alt="qr-code-image" />
        </QrButtonBox>
        <RightIconBox>
          <IconPlus />
          <IconCredit />
        </RightIconBox>
      </IconButtonBox>
    </FooterWrapper>
  );
}

export default FooterBar;

const FooterWrapper = tw.div`
  relative p-40 flex-center
`;

const BarBackground = tw(Image)`
  absolute w-329
`;

const IconButtonBox = tw.div`
  w-330 h-55 relative 
`;

const LeftIconBox = tw.div`
  absolute top-18 left-24 flex gap-40
`;

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
    w-27 h-27 
`;

const RightIconBox = tw.div`
  absolute top-18 right-24 flex gap-40
`;
